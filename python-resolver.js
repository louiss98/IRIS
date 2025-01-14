const fs = require('fs');
const { exec } = require('child_process');

const pythonHeader = `
import asyncio
import logging
import json
import sys
from go2_webrtc_driver.webrtc_driver import Go2WebRTCConnection, WebRTCConnectionMethod
from go2_webrtc_driver.constants import RTC_TOPIC, SPORT_CMD

# Enable logging for debugging
logging.basicConfig(level=logging.FATAL)

async def main():
    try:
        conn = Go2WebRTCConnection(WebRTCConnectionMethod.LocalAP)

         # Connect to the WebRTC service.
        await conn.connect()
`;

const pythonFooter = `
except ValueError as e:
    # Log any value errors that occur during the process.
    logging.error(f"An error occurred: {e}")

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        # Handle Ctrl+C to exit gracefully.
        print("\nProgram interrupted by user")
        sys.exit(0)
`;

let childProcess = null;

function resolvePythonFile(code, filename) {
    const completeCode = pythonHeader + code + pythonFooter;
    const filePath = `../python-scripts/${filename}.py`;

    // Ensure the output directory exists
    fs.mkdirSync('../python-scripts', { recursive: true });

    // Write the complete code to the file
    fs.writeFileSync(filePath, completeCode, 'utf8');

    console.log(`File saved to ${filePath}`);
}

function executePythonFile(filename) {
    const filePath = `../python-scripts/${filename}.py`;
    childProcess = exec(`python ${filePath}`);

    childProcess.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    childProcess.stderr.on('data', (data) => {
        console.error(data.toString());
    });

    childProcess.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
    });

    // Handle Ctrl+C
    process.on('SIGINT', () => {
        if (childProcess) {
            childProcess.kill('SIGINT');
            console.log('Process interrupted by user');
            process.exit();
        }
    });
}

function killPythonProcess() {
    if (childProcess) {
        childProcess.kill('SIGINT');
        console.log('Python process killed');
    } else {
        console.log('No Python process to kill');
    }
}
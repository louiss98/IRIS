class Teleprompter {
    constructor(editorId, speed = 100) {
        this.editor = ace.edit(editorId);
        this.editor.setTheme("ace/theme/cloud_editor_dark");
        this.editor.session.setMode("ace/mode/text");
        this.editor.setReadOnly(true);
        this.editor.setFontSize(20);
        //this.text = "";
        this.index = 0;
        this.speed = speed;
        this.interval = null;
    }

    setText(text) {
        this.text = text;
        this.index = 0;
        this.editor.setValue("");
    }

    start() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.interval = setInterval(() => this.update(), this.speed);
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    update() {
        if (this.index < this.text.length) {
            this.editor.session.insert({ row: this.editor.session.getLength(), column: 0 }, this.text[this.index]);
            this.index++;
        } else {
            this.stop();
        }
    }

    setSpeed(speed) {
        this.speed = speed;
        if (this.interval) {
            this.start();
        }
    }
}

// Initialize teleprompter
const teleprompter = new Teleprompter("editor");

// Example usage
document.addEventListener('DOMContentLoaded', () => {
    const editor = ace.edit('editor');

    const message = `
    async def move_robot():
    print("Performing 'Hello' movement...")
    await conn.datachannel.pub_sub.publish_request_new(
        RTC_TOPIC["SPORT_MOD"], 
        {"api_id": SPORT_CMD["Hello"]}
    )

    def forward(duration=2):
        print("Moving forward for", duration, "seconds")
        time.sleep(duration)

    def backward(duration=2):
        print("Moving backward for", duration, "seconds")
        time.sleep(duration)

    # Example usage
    await move_robot()
    forward()
    backward()
`;

const swiftTutorial = `
/*
Welcome to the Unitree GO2 EDU Robot Interface App!

This tutorial will guide you through the basics of controlling your robot using Swift.
*/

/* Step 1: Import the necessary module */
import Foundation
import time

/* Step 2: Define the Robot class */
class Robot {
    func moveForward() {
        print("The robot is moving forward.")
        // Add your code here to move the robot forward
    }

    func moveBackward() {
        print("The robot is moving backward.")
        // Add your code here to move the robot backward
    }
}

/* Step 3: Create an instance of the Robot class */
let myRobot = Robot()

/* Step 4: Move the robot forward */
myRobot.moveForward()
// The robot should move forward. You can adjust the speed and duration as needed.

/* Step 5: Move the robot backward */
myRobot.moveBackward()
// The robot should move backward. You can adjust the speed and duration as needed.

/*
Congratulations! You've completed the basic tutorial on moving the robot forward and backward.
Feel free to experiment with other movements and commands.
*/
`;
    editor.setValue(message, -1); // -1 moves the cursor to the start

    //teleprompter.setText(message);
    teleprompter.setSpeed(6); // Adjust speed as needed
    //teleprompter.start();
});
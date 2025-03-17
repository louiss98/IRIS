
import asyncio
import logging
import json
import time
import sys
from go2_webrtc_driver.webrtc_driver import Go2WebRTCConnection, WebRTCConnectionMethod
from go2_webrtc_driver.constants import RTC_TOPIC, SPORT_CMD

# Set logging to debug to see more info
logging.basicConfig(level=logging.DEBUG)

def display_data(message):
    # Remove sleep in case it blocks output during debugging
    # time.sleep(1)
    
    print("DEBUG: display_data() called", file=sys.stderr)
    
    # Check and log keys in incoming message
    print("DEBUG: Received keys: " + str(list(message.keys())), file=sys.stderr)
    
    imu_state = message.get('imu_state', {})
    motor_state = message.get('motor_state', [])
    
    if not motor_state:
        print("DEBUG: motor_state is empty or missing", file=sys.stderr)
    else:
        print(f"DEBUG: Found {len(motor_state)} motors", file=sys.stderr)
    
    # Process motor data into a more structured format
    motors = []
    for i, motor in enumerate(motor_state):
        # Log each motor info for debugging
        print(f"DEBUG: Motor {i+1}: q={motor.get('q')}, Temp={motor.get('temperature')}, Lost={motor.get('lost')}", file=sys.stderr)
        motors.append({
            'id': i + 1,
            'q': motor.get('q'),
            'temperature': motor.get('temperature'),
            'lost': motor.get('lost')
        })
    
    data = {
        'mode': message.get('mode'),
        'progress': message.get('progress'),
        'gait_type': message.get('gait_type'),
        'foot_raise_height': message.get('foot_raise_height'),
        'position': message.get('position'),
        'body_height': message.get('body_height'),
        'velocity': message.get('velocity'),
        'yaw_speed': message.get('yaw_speed'),
        'range_obstacle': message.get('range_obstacle'),
        'foot_force': message.get('foot_force'),
        'foot_position_body': message.get('foot_position_body'),
        'foot_speed_body': message.get('foot_speed_body'),
        'motors': motors,  # Add motors array to the JSON
        'imu': {
            'quaternion': imu_state.get('quaternion'),
            'gyroscope': imu_state.get('gyroscope'),
            'accelerometer': imu_state.get('accelerometer'),
            'rpy': imu_state.get('rpy'),
            'temperature': imu_state.get('temperature')
        }
    }

    # Debug print the final JSON data to stderr
    print("DEBUG: JSON data:", json.dumps(data), file=sys.stderr)
    
    # Convert the data to JSON format and output to STDOUT for our node process to capture
    print(json.dumps(data))
    sys.stdout.flush()

async def user_function():
    
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
    
async def main():
    global conn
    try:
        conn = Go2WebRTCConnection(WebRTCConnectionMethod.LocalAP)
        await conn.connect()

        def sportmodestatus_callback(message):
            current_message = message['data']
            display_data(current_message)

        conn.datachannel.pub_sub.subscribe(RTC_TOPIC['LOW_STATE'], sportmodestatus_callback)

        await user_function()
        await asyncio.sleep(60) # 60 seconds

    except ValueError as e:
        logging.error(f"An error occurred: {e}")

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\nProgram interrupted by user")
        sys.exit(0)

import asyncio
import logging
import json
import sys
from go2_webrtc_driver.webrtc_driver import Go2WebRTCConnection, WebRTCConnectionMethod
from go2_webrtc_driver.constants import RTC_TOPIC

# Enable logging for debugging
logging.basicConfig(level=logging.FATAL)

def display_data(message):
    # Extract all the necessary data
    imu_state = message['imu_state']
    data = {
        'mode': message['mode'],
        'progress': message['progress'],
        'gait_type': message['gait_type'],
        'foot_raise_height': message['foot_raise_height'],
        'position': message['position'],
        'body_height': message['body_height'],
        'velocity': message['velocity'],
        'yaw_speed': message['yaw_speed'],
        'range_obstacle': message['range_obstacle'],
        'foot_force': message['foot_force'],
        'foot_position_body': message['foot_position_body'],
        'foot_speed_body': message['foot_speed_body'],
        'imu': {
            'quaternion': imu_state['quaternion'],
            'gyroscope': imu_state['gyroscope'],
            'accelerometer': imu_state['accelerometer'],
            'rpy': imu_state['rpy'],
            'temperature': imu_state['temperature']
        }
    }

    # Convert the data to a JSON format string and print it
    print(json.dumps(data))
    sys.stdout.flush()  # Make sure it's printed immediately

async def main():
    try:
        conn = Go2WebRTCConnection(WebRTCConnectionMethod.LocalSTA, ip="192.168.8.181")
        await conn.connect()

        def sportmodestatus_callback(message):
            current_message = message['data']
            display_data(current_message)

        conn.datachannel.pub_sub.subscribe(RTC_TOPIC['LF_SPORT_MOD_STATE'], sportmodestatus_callback)

        await asyncio.sleep(3600)

    except ValueError as e:
        logging.error(f"An error occurred: {e}")

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\nProgram interrupted by user")
        sys.exit(0)
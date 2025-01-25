# filepath: /path/to/script.py
import time
import json

while True:
    data = {
        "mode": "active",
        "progress": 75,
        "gait_type": "trot",
        "foot_raise_height": 0.1,
        "position": [1.0, 2.0, 3.0],
        "body_height": 0.5,
        "velocity": [0.1, 0.2, 0.3],
        "yaw_speed": 0.05,
        "range_obstacle": 1.5,
        "foot_force": [10, 20, 30, 40],
        "foot_position_body": [0.1, 0.2, 0.3, 0.4],
        "foot_speed_body": [0.01, 0.02, 0.03, 0.04]
    }
    print(json.dumps(data))
    time.sleep(1)
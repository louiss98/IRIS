# IRIS - Interactive Robot Instruction System

This is not production ready.

## Description
This project provides a web-based interface with simulation capabilities and a simple editor to control the Unitree GO2 robot. It leverages the `go2_webrtc_connect` driver by legions1581 to send one-time commands to the robot using WebRTC. This setup allows high-level control of the robot without requiring jailbreak or firmware manipulation, making it compatible with Go2 AIR/PRO/EDU models.

## Features
- **Web-based Interface:** Control and monitor the Unitree GO2 robot through a user-friendly web interface.
- **Simulation Capabilities:** Simulate robot actions in a virtual environment using Three.js.
- **Simple Editor:** Write and generate Python files to send commands to the robot.
- **High-Level Control:** Utilize WebRTC for seamless communication with the robot.
- **Dark Mode:** Toggle dark mode for a better visual experience.

## Supported Firmware Versions
- 1.1.1 - 1.1.2 (latest available)
- 1.0.19 - 1.0.25

## Installation

### Frontend
1. Clone this repository.
2. Navigate to the `frontend` directory.
3. Install the required dependencies:
   ```bash
   npm install
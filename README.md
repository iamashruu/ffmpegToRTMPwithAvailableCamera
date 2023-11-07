# ffmpegToRTMPwithAvailableCamera

ffmpeg To RTMP server with Available Camera List

# Camera Streaming Server

A Node.js server application for streaming video from connected cameras using FFmpeg.

## Overview

This server allows users to select available cameras and start streaming video using FFmpeg. The streaming output can be accessed through a media player that supports RTMP.

## Features

- Select available cameras
- Initiate video streaming
- Stop video streaming

## Prerequisites

- Node.js installed
- FFmpeg pre-installed on the system
- Running RTMP Server

## Installation

1. Clone this repository.
2. Install dependencies with `npm install`.
3. Run the server with `npm start`.

## Usage

1. Start the server with `npm start`.
2. Access the web interface and select a camera from the dropdown.
3. Click "Start Streaming" to begin streaming from the selected camera.
4. To stop the stream, click "Stop Streaming".

## Contributing

We welcome contributions. Please submit bug reports or feature requests through the issues section.

## License

This project is licensed under the [MIT]. For details, see the LICENSE file.

## Roadmap

- Support for additional streaming protocols.
- Improved error handling and logging.

const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");

const app = express();
const port = 4000;
let ffmpegProcess;

app.use(bodyParser.json()); // Add body-parser middleware

app.use(express.static("public"));

app.post("/cameralist", (req, res) => {
  const CameraId = req.body.cameraId; // Assuming data is sent in the POST body
  const CameraLabel = req.body.cameraLabel;
  const CameraNumber = req.body.cameraNumber;

  console.log(CameraId, CameraLabel); // Check the received data

  // Rest of your code for executing the FFmpeg command with selectedCamera

  const ffmpegCommand = `ffmpeg -f dshow -i video="${CameraLabel}" -c:v libx264 -tune zerolatency -preset veryfast -an -f flv rtmp://localhost:1935/live/camera/${CameraNumber}`;

  ffmpegProcess = exec(ffmpegCommand, (error, stdout, stderr) => {
    if (error) {
      console.error("Error starting FFmpeg:", error);
      res.status(500).send("Error starting FFmpeg");
    } else {
      console.log("FFmpeg started");
      res.send("Streaming started");
    }
  });
});

const treeKill = require("tree-kill");

app.post("/stopstream", (req, res) => {
  console.log("Stopping FFmpeg...");

  if (ffmpegProcess) {
    treeKill(ffmpegProcess.pid, "SIGTERM", (err) => {
      if (err) {
        console.error("Error stopping FFmpeg:", err);
        res.status(500).send("Error stopping FFmpeg.");
      } else {
        console.log("FFmpeg process stopped.");
        ffmpegProcess = null;
        res.send("Streaming stopped.");
      }
    });
  } else {
    console.log("No FFmpeg process running.");
    res.status(500).send("No FFmpeg process running.");
  }
});

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

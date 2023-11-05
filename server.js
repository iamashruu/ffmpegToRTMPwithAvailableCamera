const express = require("express");
const { exec } = require("child_process");

const app = express();
const port = 4000;

app.get("/startStream", (req, res) => {
  const selectedCamera = req.query.camera;

  const ffmpegCommand = `ffmpeg -f dshow -i video="${selectedCamera}" -vf 'format=yuv420p' -c:v libx264 -tune zerolatency -preset veryfast -an -f flv rtmp://localhost:1935/live/camera/1`;

  const ffmpegProcess = exec(ffmpegCommand, (error, stdout, stderr) => {
    if (error) {
      console.error("Error starting FFmpeg:", error);
      res.status(500).send("Error starting FFmpeg");
    } else {
      console.log("FFmpeg started");
      res.send("Streaming started");
    }
  });
});

app.use(express.static("public")); // Serving HTML and client-side scripts from the 'public' directory

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

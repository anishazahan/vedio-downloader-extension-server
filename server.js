const express = require("express");
const app = express();
const cors = require("cors");
const ytdl = require("ytdl-core");
const { chain, forEach } = require("lodash");
const ffmpegPath = require("ffmpeg-static");
const { spawn } = require("child_process");
const sanitize = require("sanitize-filename");

const port = 5000;

app.use(express.json());
app.use(cors());

const getResulation = (formats) => {
  let resuArray = [];

  for (let i = 0; i < formats.length; i++) {
    if (formats[i].qualityLabel !== null) {
      resuArray.push(formats[i]); //filter thats resulation value null
    }
  }

  return [...new Set(resuArray.map((v) => v.height))];
};

app.get("/api/get-video-info/:videoId", async (req, res) => {
  // console.log(req.params);
  const { videoId } = req.params;
  const { videoDetails, formats } = await ytdl.getInfo(videoId);
  // console.log(data);

  // const { title, thumbnails } = videoDetails;
  const videoResulation = getResulation(formats);
  console.log(videoResulation);

  // return res.status(200).json({
  //   videoInfo: {
  //     title,
  //     thumbnailUrl: thumbnails[thumbnails.length - 1].url,
  //     videoResu,
  //     lastResu: videoResu[0],
  //   },
  // });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

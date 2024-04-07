import ytdl from "ytdl-core";
const ffmpegPath = require("ffmpeg-static");
const cp = require("child_process");
const stream = require("stream");

const ytmux = (link, options = {}) => {
  const result = new stream.PassThrough({
    highWaterMark: options.highWaterMark || 1024 * 250,
  });
  ytdl.getInfo(link, options).then((info) => {
    audioStream = ytdl.downloadFromInfo(info, {
      ...options,
      quality: "highestaudio",
    });
    videoStream = ytdl.downloadFromInfo(info, { ...options });
    ffmpegProcess = cp.spawn(
      ffmpegPath,
      [
        "-loglevel",
        "8",
        "-hide_banner",
        "-i",
        "pipe:3",
        "-i",
        "pipe:4",
        "-map",
        "0:a",
        "-map",
        "1:v",
        "-c",
        "copy",
        "-f",
        "matroska",
        "pipe:5",
      ],
      {
        windowsHide: true,
        stdio: ["inherit", "inherit", "inherit", "pipe", "pipe", "pipe"],
      },
    );
    audioStream.pipe(ffmpegProcess.stdio[3]);
    videoStream.pipe(ffmpegProcess.stdio[4]);
    ffmpegProcess.stdio[5].pipe(result);
  });
  return result;
};

export default ytmux;

// export other functions, in case you want them
ytmux.download = ytdl;
ytmux.chooseFormat = ytdl.chooseFormat;
ytmux.downloadFromInfo = ytdl.downloadFromInfo;
ytmux.filterFormats = ytdl.filterFormats;
ytmux.getBasicInfo = ytdl.getBasicInfo;
ytmux.getInfo = ytdl.getInfo;
ytmux.getURLVideoID = ytdl.getURLVideoID;
ytmux.getVideoID = ytdl.getVideoID;
ytmux.validateID = ytdl.validateID;
ytmux.validateURL = ytdl.validateURL;

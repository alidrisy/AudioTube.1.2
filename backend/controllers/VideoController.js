import ytmux from "ytdl-core";
import ytdl from "ytdl-core";
import ytsr from "../utils/ytsr";

class VideoController {
  static getDetails = async (req, res) => {
    try {
      console.log("start");
      const url = "IQWkS1GyFRM";
      // const music = await ytdl.getInfo(url);
      const music = await ytsr({ q: "happy" });
      console.log("end");
      console.log(music);
    } catch (error) {
      console.error(error);
    }
  };
}

export default VideoController;

import ytdl from "ytdl-core";
import ytmux from "../utils/ytmux";

class DownloadController {
  static getVideo = (req, res) => {
    try {
      const quality = req.query.quality;
      const url = req.query.url;

      if (!url) {
        return res.status(403).json({ error: "Can't found video id." });
      }

      if (!quality) {
        return res.status(403).json({ error: "Can't found video quality." });
      }

      ytmux(url, {
        quality,
        filtere: "videoonly",
      }).pipe(res);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };

  static getAudio = (req, res) => {
    try {
      const url = req.query.url;

      if (!url) {
        return res.status(403).json({ error: "Can't found audio id." });
      }

      ytdl(url, {
        quality: "highestaudio",
        filter: "audioonly",
      }).pipe(res);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };
}

export default DownloadController;

import YouTube from "youtube-sr";
import ytsr from "ytsr";

const data = [
  { id: 10, q: "Music Videos|فيديو موسيقى واغاني" },
  { id: 24, q: "Podcasts Videos|فيديو بودكاست" },
  { id: 27, q: "Books Videos|فيديو كتب" },
];

class SearchController {
  static getAllVideos = async (req, res) => {
    console.log(req.headers);
    try {
      const music = await ytsr("Music Videos|فيديو موسيقى واغاني");
      console.log(music.items);
      console.log(music.items.length);
      console.log("music.items.length");
      // const podcast = ytsr(data[1].q, { pages: 1 });
      // const book = ytsr(data[2].q, { pages: 1 });
      // const videos = await Promise.all([music, podcast, book]);
      // console.log(videos);
      // res.json(videos.flat());
    } catch (error) {
      console.error(error);
    }
  };

  static getCatagoryVideos = async (req, res) => {
    try {
      const { catagoryId } = req.params;
      console.log(catagoryId);
      const catagory = data.find((cq) => cq.id === parseInt(catagoryId));
      console.log(catagory);
      const videos = await YouTube.search(catagory.q);
      res.json(videos);
    } catch (error) {
      console.error(error);
    }
  };
}

export default SearchController;

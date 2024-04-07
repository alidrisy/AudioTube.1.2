import axios from "axios";

function parseISODuration(duration) {
  const matches = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!matches) {
    return null;
  }

  const hours = matches[1] ? parseInt(matches[1], 10) : 0;
  const minutes = matches[2] ? parseInt(matches[2], 10) : 0;
  const seconds = matches[3] ? parseInt(matches[3], 10) : 0;

  return `${hours ? hours + ":" : ""}${minutes}:${seconds}`;
}

function formatDateRelativeToToday(date) {
  if (!(date instanceof Date)) {
    throw new TypeError("Input must be a Date object");
  }

  const now = new Date();
  const diffInMs = now - date;
  const diffInYears = Math.round(diffInMs / (1000 * 60 * 60 * 24 * 365));

  if (diffInYears === 0) {
    const diffInMonths = Math.round(diffInMs / (1000 * 60 * 60 * 24 * 30));
    if (diffInMonths === 0) {
      const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));
      if (diffInDays === 0) {
        const diffInHours = Math.round(diffInMs / (1000 * 60 * 60));
        if (diffInHours === 0) {
          const diffInMinutes = Math.round(diffInMs / (1000 * 60));
          return diffInMinutes === 0
            ? "just now"
            : `${diffInMinutes} minutes ago`;
        } else {
          return `${diffInHours} hours ago`;
        }
      } else {
        return `${diffInDays} days ago`;
      }
    } else {
      return `${diffInMonths} months ago`;
    }
  } else {
    return `${Math.abs(diffInYears)} years ago`;
  }
}

function formatNumber(number) {
  if (isNaN(number)) {
    throw new TypeError("Input must be a number");
  }

  if (number === 0) {
    return "0";
  }

  const magnitudes = ["", "K", "M", "B", "T"];

  let magnitude = 0;
  let absNumber = Math.abs(number);

  while (absNumber >= 1000) {
    magnitude++;
    absNumber /= 1000;
  }

  const formattedNumber = absNumber.toFixed(1);
  return `${formattedNumber}${magnitudes[magnitude]} views`;
}

export default async function ytsr(options) {
  const params = {
    part: "snippet",
    key: import.meta.env.VITE_API_KEY,
    type: "video",
    ...options,
  };

  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      { params },
    );
    const videos = response.data.items;

    const videoInfo = [];
    for (const video of videos) {
      const videoId = video.id.videoId;
      const channelId = video.snippet.channelId;

      const videoDetails = await getVideoDetails(videoId);

      const channelInfo = await getChannelInfo(channelId);
      videoInfo.push({
        id: videoId,
        title: videoDetails.snippet.title,
        publishedAt: formatDateRelativeToToday(
          new Date(videoDetails.snippet.publishedAt),
        ),
        thumbnail: videoDetails.snippet.thumbnails?.maxres
          ? videoDetails.snippet.thumbnails.maxres.url
          : videoDetails.snippet.thumbnails?.standard
          ? videoDetails.snippet.thumbnails.standard.url
          : videoDetails.snippet.thumbnails?.high
          ? videoDetails.snippet.thumbnails.high.url
          : videoDetails.snippet.thumbnails.default.url,
        duration: parseISODuration(videoDetails.contentDetails.duration),
        viewCount: formatNumber(parseInt(videoDetails.statistics.viewCount)),

        channelTitle: channelInfo.snippet.title,
        channelThumbnail: channelInfo.snippet.thumbnails?.standard
          ? channelInfo.snippet.thumbnails.standard.url
          : channelInfo.snippet.thumbnails?.high
          ? channelInfo.snippet.thumbnails.high.url
          : channelInfo.snippet.thumbnails.default.url,
        channelId: channelId,
        // Add other desired video and channel info from videoDetails and channelInfo
      });
    }

    return videoInfo;
  } catch (error) {
    console.error(error);
    return []; // Handle errors by returning an empty array
  }
}

async function getVideoDetails(videoId) {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${
    import.meta.env.VITE_API_KEY
  }`;
  const response = await axios.get(url);
  return response.data.items[0];
}

async function getChannelInfo(channelId) {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${
    import.meta.env.VITE_API_KEY
  }`;
  const response = await axios.get(url);
  return response.data.items[0];
}

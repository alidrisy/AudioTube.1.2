/* eslint-disable react/prop-types */
import Video from "../video/Video";

const Videos = ({ videos, error, setCurrentIndex }) => {
  return (
    <div className="max-w-full flex justify-center items-center flex-wrap">
        {!videos.length && error ? <h1>{error}</h1> : null}
        { (videos.length && !error.length) ?
            <div className="max-w-full flex justify-center flex-wrap gap-10 py-4 px-2 sm:py-20 sm:px-6">{videos.map((video, index) => (
                <Video onClick={() => setCurrentIndex(index)} key={`${index}-${video.id}`} video={video}/>
            ))}</div> :
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        }
    </div>
  );
};

export default Videos;

/* eslint-disable react/prop-types */
import Video from "../video/Video";

const Videos = ({ videos, error, isLoading, setCurrentIndex }) => {
  return (
    <div className="w-full max-w-full gap-10 flex justify-center flex-wrap p-2">
        {(!isLoading && error) && <h1>{error}</h1>}
        {isLoading && <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
        {(!isLoading && !error && videos) &&
            <>{videos.map((video, index) => (
                <Video onClick={() => setCurrentIndex(index)} key={`${index}-${video.id}`} video={video}/>
            ))}</>
        }
    </div>
  );
};

export default Videos;

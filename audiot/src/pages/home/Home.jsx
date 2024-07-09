/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import Filter from "../../components/filter/Filter";
import Videos from "../../components/videos/Videos";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const data = [
  {tag: 'All', catagoryId: 0},
  {tag: 'Music', catagoryId: 10, q: ""},
  {tag: 'Podcast', catagoryId: 24, q: "podcast|بودكاست"},
  {tag: 'Books', catagoryId: 27, q: "books|كتب"},
]

const Home = ({
    videos,
    setVideos,
    error,
    setError,
    isLoading,
    setIsLoading,
    search,
    setSearch,
    setCurrentIndex,
    onClick,
  }) => {

  const loadRef = useRef(false)
  const [catagoryId, setCatagoryId] = useState(0)

  const getVideos = async () => {
    setVideos([]);
    setError('')
    setSearch('')
    setIsLoading(true)
    try{
        const allVideos = await axios.get(`http://localhost:5000/api/v1/catagory/${catagoryId}`);
        console.log(allVideos.data)
        console.log(allVideos.data.length)
        setVideos(allVideos.data);
    } catch(e) {
      console.log(e)
      setError(e.message)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (loadRef.current) {
      getVideos();
    }
    if (loadRef.current === false) loadRef.current = true;
  }, [catagoryId]);

  return (
    <div className="min-h-[calc(100vh-117px)] w-full max-w-full space-y-10" onClick={onClick}>
        <Filter
          catagoryId={catagoryId}
          setCatagoryId={setCatagoryId}
          data={data}
          search={search}
          setSearch={setSearch}
        />
        <Videos
          videos={videos}
          error={error}
          isLoading={isLoading}
          setCurrentIndex={setCurrentIndex}
        />
    </div>
  );
};

export default Home;

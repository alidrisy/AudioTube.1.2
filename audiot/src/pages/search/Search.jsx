/* eslint-disable react/prop-types */
import Filter from "../../components/filter/Filter";
import Videos from "../../components/videos/Videos";
import { useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Search = ({
    videos,
    setVideos,
    error,
    setError,
    search,
    setSearch,
    setCurrentIndex,
  }) => {

    const loadRef = useRef(false)
    const navigate = useNavigate()


    const getVideos = async () => {
      setVideos([]);
      setError('')
      try{
          const searcedVideos = await axios.get(`http://localhost:5000/api/v1/search/${search}`);
          console.log(searcedVideos.data)
          console.log(searcedVideos.data.length)
          setVideos(searcedVideos.data);
      } catch(e) {
        console.log(e)
        setError(e.message)
      }
    }
  
    useEffect(() => {
      if (loadRef.current) {
        if (search.length < 1) return navigate('/');
        getVideos();
      }
      if (loadRef.current === false) loadRef.current = true;
    }, []);
  
    return (
      <div className="flex flex-col gap-10 justify-evenly">
          <Filter
            search={search}
            setSearch={setSearch}
            getVideos={getVideos}
          />
          <Videos
            videos={videos}
            error={error}
            setCurrentIndex={setCurrentIndex}
          />
      </div>
    );
}

export default Search;
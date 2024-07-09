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
    isLoading,
    setIsLoading,
    search,
    setSearch,
    setCurrentIndex,
    onClick,
  }) => {

    const loadRef = useRef(false)
    const navigate = useNavigate()


    const getVideos = async () => {
      setVideos([]);
      setError('')
      setIsLoading(true)
      try{
          const searcedVideos = await axios.get(`http://localhost:5000/api/v1/search/${search}`);
          console.log(searcedVideos.data)
          console.log(searcedVideos.data.length)
          setVideos(searcedVideos.data);
      } catch(e) {
        console.log(e)
        setError(e.message)
      } finally {
        setIsLoading(false);
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
      <div className="flex flex-col space-y-10" onClick={onClick} >
          <Filter
            search={search}
            setSearch={setSearch}
            getVideos={getVideos}
          />
          <Videos
            videos={videos}
            error={error}
            isLoading={isLoading}
            setCurrentIndex={setCurrentIndex}
          />
      </div>
    );
}

export default Search;
import NavBar from "./components/navBar/NavBar";
import Home from "./pages/home/Home";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Search from "./pages/search/Search";
import MusicPlayer from "./components/MusicPlayer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import About from "./pages/about/About";

function App() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(null);
  const [nav, setNav] = useState(false)

  return (
    <div className='space-y-5 w-full'>
      <NavBar nav={nav} setNav={setNav}/>
      <Routes>
        <Route path="/" element={
          <Home
            videos={videos}
            setVideos={setVideos}
            error={error}
            setError={setError}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            search={search}
            setSearch={setSearch}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            onClick={() => setNav(false)}
          />}
        />
        <Route path="/videos" element={
          <Search
            videos={videos}
            setVideos={setVideos}
            error={error}
            setError={setError}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            search={search}
            setSearch={setSearch}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />}
        />
        <Route path="/about" element={<About onClick={() => setNav(false)} />} />
      </Routes>
      <ToastContainer pauseOnFocusLoss={false} />
      {currentIndex !== null &&
        <div className="player fixed h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-gray-300/15 to-gray-800/90 backdrop-blur-lg rounded-t-3xl z-10 pr-5 sm:pr-10">
          <MusicPlayer
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            currentSongs={videos}
          />
        </div>
      }
    </div>
  )
}

export default App;

import NavBar from "./components/navBar/NavBar";
import Home from "./pages/home/Home";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Search from "./pages/search/Search";
import MusicPlayer from "./components/MusicPlayer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(null);

  return (
    <div className='space-y-5'>
      <NavBar />
      <Routes>
        <Route path="/" element={
          <Home
            videos={videos}
            setVideos={setVideos}
            error={error}
            setError={setError}
            search={search}
            setSearch={setSearch}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />}
        />
        <Route path="/videos" element={
          <Search
            videos={videos}
            setVideos={setVideos}
            error={error}
            setError={setError}
            search={search}
            setSearch={setSearch}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />}
        />
      </Routes>
      <ToastContainer pauseOnFocusLoss={false} />
      {currentIndex !== null &&
        <div className="fixed h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-gray-300/15 to-gray-800/90 backdrop-blur-lg rounded-t-3xl z-10">
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

export default App

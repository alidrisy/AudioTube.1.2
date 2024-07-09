// In App.js in a new project

import { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Videos from "./components/Videos";
import Filter from "./components/Filter";
import axios from "./api/axios";

const data = [
  { tag: "All", catagoryId: 0 },
  { tag: "Music", catagoryId: 10, q: "" },
  { tag: "Podcast", catagoryId: 24, q: "podcast|بودكاست" },
  { tag: "Books", catagoryId: 27, q: "books|كتب" },
];

function App() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [catagoryId, setCatagoryId] = useState(0);

  const getVideos = async () => {
    setVideos([]);
    setSearch("");
    try {
      const response = await axios.get(`/catagory/${catagoryId}`);
      const data = response.data;
      console.log(data);
      setVideos(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getVideos();
  }, [catagoryId]);

  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-1 px-1 pt-2 items-center space-y-5'>
        <Filter
          catagories={data}
          search={search}
          setSearch={setSearch}
          catagoryId={catagoryId}
          setCatagoryId={setCatagoryId}
        />
        <Videos videos={videos} getVideos={getVideos} />
      </View>
    </SafeAreaView>
  );
}

export default App;

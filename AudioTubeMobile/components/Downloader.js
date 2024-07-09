import { useEffect, useState } from "react";
import BottomDrawer from "react-native-animated-bottom-drawer";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Options from "./Options";
import { downloadVideo, downloadAudio } from "./download";

const Downloader = ({ bottomDrawerRef, openDrwer, setOpenDrwer, video }) => {
  const [format, setFormat] = useState(null);

  useEffect(() => {
    if (openDrwer) {
      bottomDrawerRef.current.open();
      getFormat();
    } else {
      bottomDrawerRef.current.close();
    }
  }, [openDrwer]);

  const getFormat = async () => {
    try {
      const response = await fetch(
        `http://192.168.43.39:5000/api/v1/formats/${video.id}`,
      );
      const data = await response.json();
      setFormat(data);
      console.log(data);
    } catch (e) {
      console.log(e);
      setOpenDrwer(false);
    }
  };

  const handleSubmit = (val) => {
    downloadVideo(format, val, bottomDrawerRef);
    return;
    if (val.type === "video") {
      downloadVideo(format, val, bottomDrawerRef);
    } else {
      downloadAudio(format, val, bottomDrawerRef);
    }
  };

  return (
    <BottomDrawer
      enableSnapping
      snapPoints={[500]}
      gestureMode='handle'
      onClose={() => setOpenDrwer(false)}
      ref={bottomDrawerRef}
    >
      <View className='w-[100%] p-1 justify-evenly items-center'>
        <Text className='text-[20px] font-[700]'>Download</Text>
      </View>
      {format ? (
        <Options format={format} handleSubmit={handleSubmit} />
      ) : (
        <View className='h-[500px] w-full p-1 justify-center items-center'>
          <ActivityIndicator size='large' />
        </View>
      )}
    </BottomDrawer>
  );
};

export default Downloader;

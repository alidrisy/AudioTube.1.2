import { useRef, useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Octicons } from "@expo/vector-icons";
import BottomDrawer from "react-native-animated-bottom-drawer";
import Downloader from "./Downloader";

const Video = ({ video }) => {
  const bottomDrawerRef = useRef(null);
  const [openDrwer, setOpenDrwer] = useState(false);

  return (
    <View className='w-[100%]  space-y-1.5 justify-evenly items-center my-2'>
      <Downloader
        openDrwer={openDrwer}
        bottomDrawerRef={bottomDrawerRef}
        setOpenDrwer={setOpenDrwer}
        video={video}
      />

      <View className='relative p-1 flex-row space-x-2'>
        <Image
          source={{
            uri:
              video.thumbnails[video.thumbnails.length - 1].url ||
              "https://i.ytimg.com/vi/3CKGrixtCJU/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLChgOZkGgPQQypAGlllxJFQbMB6LAs",
          }}
          alt={`${video.title.slice(0, 12)}...`}
          style={{
            aspectRatio: 16 / 9,
            width: "90%",
            borderRadius: 10,
            borderEndWidth: 4,
            borderColor: "gray",
          }}
          className='border border-gray-500'
        />
        <Text className='absolute bottom-3 right-3 text-[13px]  bg-gray-300/60  text-center py-1 px-2.5 rounded-3xl border-[1px] border-gray-300/40'>
          {video.duration}
        </Text>
      </View>
      <View className='w-[85%] space-y-1.5 justify-evenly items-center my-2'>
        <Text
          className=' text-center text-[16px] pt-1 font-[700]'
          numberOfLines={1}
        >
          {video.title}
        </Text>

        <View className='w-full p-1 space-x-5 flex-row ml-4'>
          <Text className='text-gray-600 text-[13px]'>
            {video.viewCount.short}
          </Text>
          <Text className='text-gray-600 text-[13px]'>
            {video.publishedTime}
          </Text>
        </View>
        <View className='w-full flex-row space-x-3 items-center'>
          <Image
            source={{
              uri: video.channel.thumbnails[0].url,
            }}
            className='w-12 h-12 rounded-full justify-center items-center'
          />
          <Text className='text-gray-700 text-[15px]' numberOfLines={1}>
            {video.channel.name}
          </Text>
        </View>
        <TouchableOpacity
          className='absolute bottom-[12px] right-4'
          onPress={() => setOpenDrwer(true)}
        >
          <Octicons name='download' size={34} color='black' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Video;

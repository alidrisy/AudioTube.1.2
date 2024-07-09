import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import Video from "./Video";

const Videos = ({ videos, getVideos }) => {
  return (
    <View className='w-full flex-1 h-full'>
      <FlatList
        className='w-full flex-1'
        data={videos}
        renderItem={({ item }) => <Video video={item} />}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View className='flex-1 w-full h-full justify-center items-center'>
            <ActivityIndicator size='large' />
          </View>
        )}
        refreshing={false}
        onRefresh={() => getVideos()}
      />
    </View>
  );
};

export default Videos;

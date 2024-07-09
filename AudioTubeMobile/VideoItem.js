import React, { useRef, useState } from 'react';
import { Video } from 'react-native-video';

const VideoItem = ({ videoData }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <View>
      <Video
        source={{ uri: videoData.url }}
        ref={videoRef}
        paused={!isPlaying}
        style={{ ...styles.video }}
      />
      <View style={styles.videoInfo}>
        <Text>{videoData.title}</Text>
        {/* Other video information */}
      </View>
      <Button title={isPlaying ? 'Pause' : 'Play'} onPress={handlePlayPause} />
    </View>
  );
};

export default VideoItem;

import { StyleSheet } from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import React from 'react';

type VideoPreviewProps = {
  uri: string;
  style?: any;
};

export default function VideoPreview({ uri, style }: VideoPreviewProps) {
  const video = React.useRef(null);

  return (
    <Video
      ref={video}
      style={[styles.video, style]}
      source={{
        uri,
      }}
      useNativeControls
      resizeMode={ResizeMode.COVER}
      isLooping
    />
  );
}

const styles = StyleSheet.create({
  video: {
    flex: 1,
  },
});

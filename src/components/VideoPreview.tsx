import * as React from 'react';
import { View } from 'react-native';
import { ResizeMode } from 'expo-av';
import VideoPlayer from 'expo-video-player';

type VideoPreviewProps = {
  uri: string;
  style?: any;
};

export default function VideoPreview({ uri, style }: VideoPreviewProps) {
  return (
    <View>
      <View>
        <VideoPlayer
          videoProps={{
            shouldPlay: false,
            resizeMode: ResizeMode.COVER,
            source: { uri },
          }}
          style={style}
        />
      </View>
    </View>
  );
}

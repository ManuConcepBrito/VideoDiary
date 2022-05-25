import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import icons, { ICONS } from '../res/icons';
import { COLORS, SPACING } from '../res/theme';

const VIDEO_HEIGHT = 300;
// const VIDEO_WIDTH = VIDEO_HEIGHT * (9 / 16);
const VIDEO_WIDTH = VIDEO_HEIGHT;
const MARGIN_TOP = VIDEO_HEIGHT * 0.2;

export default function VideoPreview({ uri }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <View>
      <View>
        <VideoPlayer
          videoProps={{
            shouldPlay: false,
            resizeMode: ResizeMode.COVER,
            source: { uri },
          }}
          icon={{
            play: <Image source={ICONS.playButton} />,
            pause: <Image source={ICONS.pauseButton} />,
          }}
        />
      </View>
    </View>
  );
}

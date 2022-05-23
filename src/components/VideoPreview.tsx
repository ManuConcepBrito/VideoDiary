import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import icons, { ICONS } from '../res/icons';
import { COLORS } from '../res/theme';

const VIDEO_HEIGHT = 300;
// const VIDEO_WIDTH = VIDEO_HEIGHT * (9 / 16);
const VIDEO_WIDTH = VIDEO_HEIGHT;
const MARGIN_TOP = VIDEO_HEIGHT * 0.2;

export default function VideoPreview({ uri }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <VideoPlayer
          videoProps={{
            shouldPlay: false,
            resizeMode: Video.RESIZE_MODE_CONTAIN,
            source: { uri },
          }}
          icon={{
            play: <Image source={ICONS.playButton} />,
            pause: <Image source={ICONS.pauseButton} />,
          }}
          style={{
            height: VIDEO_HEIGHT,
            width: VIDEO_WIDTH,
            videoBackgroundColor: COLORS.white,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    alignSelf: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // video container for video on top of screen
  videoContainer: {
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
    width: VIDEO_WIDTH + 10,
    height: VIDEO_HEIGHT + 10,
    marginTop: MARGIN_TOP,
    shadowColor: COLORS.grey,
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: { width: 3, height: 3 },
    elevation: 5,
  },
});

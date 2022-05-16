import {
  createBox,
  createText,
  createRestyleComponent,
  createVariant,
  VariantProps,
} from '@shopify/restyle';
import React from 'react';
import { Dimensions, FlatList } from 'react-native';
import { Theme } from '../res/theme';

// See the "Defining Your Theme" readme section below

const Box = createBox<Theme>();
const Text = createText<Theme>();

const Card = createRestyleComponent<
  VariantProps<Theme, 'cardVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({ themeKey: 'cardVariants' })], Box);

const numColumns = 3;
const data = [
  { id: '0', day: 'Sat', date: '30 May' },
  { id: '1', day: 'Sat', date: '30 May' },
  { id: '2', day: 'Sat', date: '30 May' },
  { id: '3', day: 'Sat', date: '30 May' },
  { id: '4', day: 'Sat', date: '30 May' },
  { id: '5', day: 'Sat', date: '30 May' },
  { id: '6', day: 'Sat', date: '30 May' },
  { id: '7', day: 'Sat', date: '30 May' },
  { id: '8', day: 'Sat', date: '30 May' },
  { id: '9', day: 'Sat', date: '30 May' },
  { id: '10', day: 'Sat', date: '30 May' },
  { id: '11', day: 'Sat', date: '30 May' },
  { id: '12', day: 'Sat', date: '30 May' },
  { id: '13', day: 'Sat', date: '30 May' },
  { id: '14', day: 'Sat', date: '30 May' },
  { id: '15', day: 'Sat', date: '30 May' },
];
const cardStyleMap = {
  '0': 'primary',
  '1': 'secondary',
  '2': 'tertiary',
};

const VideoList = () => {
  return (
    <Box
      flex={3}
      backgroundColor="mainBackground"
      paddingVertical="m"
      paddingHorizontal="s"
    >
      <Box backgroundColor="emoji" marginBottom="l" paddingVertical="xl"></Box>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Card variant={cardStyleMap[item.id % 3]}>
            <Text variant="body">{item.day}</Text>
            <Text variant="body">{item.date}</Text>
          </Card>
        )}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
      />
      <Box
        backgroundColor="tertiaryCard"
        marginTop="m"
        marginBottom="xs"
        paddingVertical="xl"
      ></Box>
    </Box>
  );
};

export default VideoList;

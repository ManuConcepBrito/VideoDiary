import {
  ThemeProvider,
  createBox,
  createText,
  createRestyleComponent,
  createVariant,
  VariantProps,
} from '@shopify/restyle';
import { Theme } from '../res/theme';

// See the "Defining Your Theme" readme section below

const Box = createBox<Theme>();
const Text = createText<Theme>();

const Card = createRestyleComponent<
  VariantProps<Theme, 'cardVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({themeKey: 'cardVariants'})], Box);

const VideoList = () => {
  return (
    <Box
      flex={1}
      backgroundColor="mainBackground"
      paddingVertical="xl"
      paddingHorizontal="m">
      <Text variant="header">Welcome</Text>
      <Box
        flexDirection={{
          phone: 'column',
          tablet: 'row',
        }}
      >
        <Card margin="s" variant="regular">
          <Text variant="body">This is a simple example</Text>
        </Card>
        <Card margin="s" variant="elevated">
          <Text variant="body">Displaying how to use Restyle</Text>
        </Card>
      </Box>
    </Box>
  );
};

export default VideoList;
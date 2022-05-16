import * as React from 'react';
import {ActivityIndicator, TouchableOpacity, StyleSheet} from 'react-native';
import {
  VariantProps,
  createRestyleComponent,
  createVariant,
} from '@shopify/restyle';
import {Theme} from '../../res/theme';
import {Box} from './Box';
import Text from './Text';


type Props = VariantProps<Theme, "buttonVariants"> & {
  label: string;
  onPress?: () => void;
  variant?: string;
};

const ButtonContainer = createRestyleComponent<
  VariantProps<Theme, "buttonVariants"> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({ themeKey: "buttonVariants" })], Box);


const Button = ({label, onPress, variant}: Props) => {

  return (
    <ButtonContainer variant={variant}>
      <TouchableOpacity onPress={onPress}>
        <Box>
          <Text variant="buttonPrimary" >{label}</Text>
        </Box>
    </TouchableOpacity>
    </ButtonContainer>
    
  );
};

export default Button;
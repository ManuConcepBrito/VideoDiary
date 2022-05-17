// Text input with input type text and button search in a row
import React from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import {
  VariantProps,
  createRestyleComponent,
  createVariant,
} from "@shopify/restyle";
import { Theme } from "../../res/theme";
import { Box } from "./Box";
import Text from "./Text";
import Button from "./Button";

type Props = VariantProps<Theme, "textInputVariants"> & {
  label: string;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
};

const TextInputContainer = createRestyleComponent<
  VariantProps<Theme, "textInputVariants"> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({ themeKey: "textInputVariants" })], Box);

const TextInputGroup = ({ label, onPress }: Props) => {
  return (
    <TextInputContainer variant="primary">
      <TextInput style={styles.input} />
      <Button variant="search" label="Search" onPress={onPress}></Button>
    </TextInputContainer>
  );
};

export default TextInputGroup;

// stylesheet for two components in a row
const styles = StyleSheet.create({
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 2,
    margin: 5,
    borderColor: "#000",
    height: 44,
    width: 239,
  },
});

import * as React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Text from "./Text";
import TextInputGroup from "./TextInputGroup";
import VideoPreview from "../atoms/VideoPreview";
import { palette } from "../../res/theme";
import Button from "./Button";
import strings from "../../res/strings";
import icons from "../../res/icons";

export default function DescribeModal() {
  // return with a container and VideoPreview inside
  // dummy onPress
  const onPress = () => {
    alert("onPress");
  };

  return (
    <View style={styles.container}>
      <Text variant="body">{strings.whatWasYourMoodToday}</Text>
      <View style={styles.emojiContainer}>
        <TouchableOpacity onPress={() => alert("You feel happy")}>
          <Image source={icons.happyIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("You feel neutral")}>
          <Image source={icons.neutralIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("You feel sad")}>
          <Image source={icons.sadIcon} />
        </TouchableOpacity>
      </View>
      <Text variant="body">{strings.giveItATag}</Text>
      <View style={styles.textInputContainer}>
        <TextInput style={styles.input} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => alert("You want to add a tag")}
        >
          <Image source={icons.arrow} />
        </TouchableOpacity>
      </View>
      <Text variant="body">{strings.notes}</Text>
      <View style={styles.notesContainer}>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.finishButtonContainer}>
        <Button variant="alert" label="Cancel" onPress={onPress}></Button>
        <Button variant="primary" label="Finish" onPress={onPress}></Button>
      </View>
    </View>
  );
}
// stylesheet for container
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: palette.black,
    borderWidth: 5,
    backgroundColor: palette.blue,
    margin: 25,
    padding: 5,
  },
  emojiContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  textInputContainer: {
    flex: 0.5,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#000",
    height: 50,
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: palette.blue,
    borderColor: palette.black,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  notesContainer: {
    flex: 1,
  },
  finishButtonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

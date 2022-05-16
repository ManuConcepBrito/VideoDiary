// create a Text component that uses the Chakra Petch font
import React from 'react';
import {View} from "react-native"
import Text from "./Text";
import Button from "./Button";
// functional component with hello world in the center of the page
export default function HelloWorld() {
    // function that alerts when the button is pressed
    const onPress = () => alert("I am pressed");
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Button label="Fuck you bitches" onPress={onPress}/>
        </View>
    );
}
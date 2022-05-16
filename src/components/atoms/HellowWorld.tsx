// create a Text component that uses the Chakra Petch font
import React from 'react';
import {View} from "react-native"
import Text from "./Text";
// functional component with hello world in the center of the page
export default function HelloWorld() {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text variant="header">Hello World!!</Text>
        </View>
    );
}
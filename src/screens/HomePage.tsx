import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import { commonStyles } from '../commonStyles';

export default function HomePage () : React.JSX.Element {
    return (
        <View>
            <Text style={commonStyles.body}>Home Page Body</Text>
        </View>
    );
}

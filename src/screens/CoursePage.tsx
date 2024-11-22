import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import { commonStyles } from '../commonStyles';

export default function CoursePage () : React.JSX.Element {
    return (
        <View>
            <Text style={commonStyles.body}>Course Page Body</Text>
        </View>
    );
}

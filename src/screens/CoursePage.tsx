import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import { commonStyles } from '../commonStyles';
import Header from '../components/Header';

export default function CoursePage () : React.JSX.Element {
    return (
        <View>
            <Header />
            <Text style={commonStyles.body}>Course Page Body</Text>
        </View>
    );
}

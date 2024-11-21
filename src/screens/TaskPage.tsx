import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import { commonStyles } from '../commonStyles';
import Header from '../components/Header';

export default function TaskPage () : React.JSX.Element {
    return (
        <View>
            <Header />
            <Text style={commonStyles.body}>Task Page Body</Text>
        </View>
    );
}

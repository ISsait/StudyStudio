import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import { commonStyles } from '../commonStyles';
import Header from '../components/Header';

export default function HomePage () : React.JSX.Element {
    return (
        <View>
            <Header />
            <Text style={commonStyles.body}>Home Page Body</Text>
        </View>
    );
}

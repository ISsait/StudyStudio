import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import { commonStyles } from '../commonStyles';
import { Header } from '../components/Header';

export const Home = () => {
    return (
        <View>
            <Header />
            <Text style={commonStyles.body}>Home Page Body</Text>
        </View>
    );
};

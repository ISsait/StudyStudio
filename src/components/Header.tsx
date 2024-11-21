import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import { commonStyles } from '../commonStyles';

export const Header = () => {
    return (
        <View style={commonStyles.headerView}>
            <Text style={commonStyles.headerText}>Study Studio</Text>
        </View>
    );
};

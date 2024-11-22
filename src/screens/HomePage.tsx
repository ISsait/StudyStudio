import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import { commonStyles } from '../commonStyles';
import CalendarComponent from '../components/homeComponents/Calendar';

export default function HomePage () : React.JSX.Element {
    return (
        <View style={commonStyles.body}>
            <Text>Home Page Body</Text>
            <CalendarComponent />
        </View>
    );
}

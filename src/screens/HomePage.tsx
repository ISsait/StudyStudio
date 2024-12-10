import React from 'react';
import {
    View,
} from 'react-native';
import { commonStyles } from '../commonStyles';
import CalendarComponent from '../components/homeComponents/Calendar';
import NotificationList from '../components/homeComponents/NotificationList';
import { useNavigation } from '@react-navigation/native';

export default function HomePage () : React.JSX.Element {
    const navigation = useNavigation();
    return (
        <View style={commonStyles.body}>
            <NotificationList navigation={navigation}/>
            <CalendarComponent />
        </View>
    );
}

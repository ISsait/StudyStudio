import React from 'react';
import {
    View,
    Text,

} from 'react-native';
import { commonStyles } from '../commonStyles';
import CalendarComponent from '../components/homeComponents/Calendar';
import NotificationList from '../components/homeComponents/NotificationList';



export default function HomePage () : React.JSX.Element {
    return (
        <View>
            <Text style={commonStyles.body}>Home Page Body</Text>
            <NotificationList />
            <CalendarComponent />
        </View>
    );
}

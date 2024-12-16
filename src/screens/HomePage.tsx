import React from 'react';
import {View} from 'react-native';
import {commonStyles} from '../commonStyles';
import CalendarComponent from '../components/homeComponents/Calendar';
import NotificationList from '../components/homeComponents/NotificationList';
import {useNavigation} from '@react-navigation/native';

const dueDates = {
  '2024-12-14': [
      { color: '#FF0000', name: 'Math Project', time: '10:00 AM' },
      { color: '#00FF00', name: 'Science Project', time: '2:00 PM' },
  ],
  '2024-12-20': [
      { color: '#0000FF', name: 'English Essay', time: '5:00 PM' },
  ],
};


export default function HomePage(): React.JSX.Element {
  const navigation = useNavigation();
  return (
    <View style={commonStyles.body}>
      <NotificationList navigation={navigation} />
      <CalendarComponent dueDates={dueDates}/>
    </View>
  );
}

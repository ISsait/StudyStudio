import React from 'react';
import {View} from 'react-native';
import {commonStyles} from '../commonStyles';
import CalendarComponent from '../components/homeComponents/Calendar';
import NotificationList from '../components/homeComponents/NotificationList';
import {useNavigation} from '@react-navigation/native';
import MyButton from '../components/commonComponents/MyButton';
import { getSafeCourses } from '../data/storage/safeStorageManager';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const dueDates = {
  '2024-12-14': [
      { color: '#FF0000', name: 'Math Project', time: '10:00 AM' },
      { color: '#00FF00', name: 'Science Project', time: '2:00 PM' },
  ],
  '2024-12-20': [
      { color: '#0000FF', name: 'English Essay', time: '5:00 PM' },
  ],
};

// debugging
async function getCourses() {
  try {
    const courses = await getSafeCourses();
    return courses;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default function HomePage(): React.JSX.Element {
  const navigation = useNavigation();
  const courses = getCourses();
  return (
    <View style={commonStyles.body}>
      <NotificationList navigation={navigation} />
      <MyButton title="print Courses" onPress={() => console.log('Homepage Print Courses!!!!', getCourses())} />
      <CalendarComponent dueDates={dueDates}/>
    </View>
  );
}

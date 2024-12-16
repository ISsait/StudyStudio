import React, { useEffect } from 'react';
import {View} from 'react-native';
import {commonStyles} from '../commonStyles';
import CalendarComponent from '../components/homeComponents/Calendar';
import NotificationList from '../components/homeComponents/NotificationList';
import {useNavigation} from '@react-navigation/native';
import { useRealm } from '../realmContextProvider';



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
  const realm = useRealm();
  const navigation = useNavigation();

  useEffect(() => {
    if (!realm) {
      console.log('Realm not loaded');
      return;
    } else {
      const courses = realm.objects('Course');
      console.log('useEffect HomePage', courses);
    }
    return () => {
      console.log('cleanup HomePage');
    };
  }
  , [realm]);

  return (
    <View style={commonStyles.body}>
      <NotificationList navigation={navigation} />
      <CalendarComponent dueDates={dueDates}/>
    </View>
  );
}

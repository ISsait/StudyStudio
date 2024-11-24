import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import { commonStyles } from '../commonStyles';
import CalendarComponent from '../components/homeComponents/Calendar';
import MyButton from '../components/commonComponents/MyButton';
import {ObjectId} from 'bson';

export default function HomePage () : React.JSX.Element {
    return (
        <View style={commonStyles.body}>
            <Text>Home Page Body</Text>
            <MyButton title="Button" onPress={() => console.log(new ObjectId())} />
            <CalendarComponent />
        </View>
    );
}

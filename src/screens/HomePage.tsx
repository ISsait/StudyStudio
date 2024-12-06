import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import { commonStyles } from '../commonStyles';
import CalendarComponent from '../components/homeComponents/Calendar';
import {
    getRealm,
    getCourses,
    getProjects,
    closeRealm,
 } from '../data/storage/storageManager';
 import MyButton from '../components/commonComponents/MyButton';

 async function testStorage() {
    console.log("Testing Storage");
    const realm = await getRealm();
    const courses = getCourses(realm);
    const projects = getProjects(realm);
    console.log("Courses: ", courses);
    console.log("Projects: ", projects);
    closeRealm(realm);
}

export default function HomePage () : React.JSX.Element {
    return (
        <View style={commonStyles.body}>
            <Text>Home Page Body</Text>
            <MyButton title="Press Me" onPress={() => {
                console.log("Button Pressed");
                testStorage();
                }} />
            <CalendarComponent />
        </View>
    );
}

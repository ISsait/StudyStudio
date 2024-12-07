import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import { commonStyles } from '../commonStyles';
import {
    getRealm,
    closeRealm,
    getCourses,
} from '../data/storage/storageManager';

// async function getCoursesFromStorage() {
//     const realm = await getRealm();
//     const courses = getCourses(realm);
//     courses.forEach((course) => {
//         console.log('Course: ', course.courseName);
//         console.log(' Entire Course: ', course);
//     });
//     closeRealm(realm);
// }

// getCoursesFromStorage();

export default function CoursePage () : React.JSX.Element {
    return (
        <View style={commonStyles.body}>
            <Text>Course Page Body</Text>
        </View>
    );
}

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoursePage from '../screens/CoursePage';
import { commonStyles } from '../commonStyles';

const Stack = createNativeStackNavigator();

function CourseStackNav({route} : {route : any}) : React.JSX.Element {
    const allCourseIds : string[] = route.params.allCourseIds;
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="View Courses"
                component={CoursePage}
                options={{
                    headerTitleStyle: commonStyles.stackHeaderText,
                    headerTransparent: true,
                    contentStyle: commonStyles.stackContent,
                }}
            />
        </Stack.Navigator>
    );
}

export default CourseStackNav;

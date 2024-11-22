import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoursePage from '../screens/CoursePage';
import { commonStyles } from '../commonStyles';

const Stack = createNativeStackNavigator();

function CourseStackNav() : React.JSX.Element {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Course"
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

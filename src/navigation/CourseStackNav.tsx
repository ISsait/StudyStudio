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
                    headerStyle: commonStyles.stackHeaderView,
                    headerTitleStyle: commonStyles.stackHeaderText,
                }}
            />
        </Stack.Navigator>
    );
}

export default CourseStackNav;

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CoursePage from '../screens/CoursePage';
import {commonStyles} from '../commonStyles';
import EditCourseForm from '../components/CoursePageComponents/EditCourseForm';

const Stack = createNativeStackNavigator();

function CourseStackNav({route}: any): React.JSX.Element {
  // console.log('CourseStackNav params:', route.params);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="View Courses"
        component={CoursePage}
        initialParams={route.params}
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

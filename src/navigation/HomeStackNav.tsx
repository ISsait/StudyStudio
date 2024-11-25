import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../screens/HomePage';
import { commonStyles } from '../commonStyles';

const Stack = createNativeStackNavigator();

function HomeStackNav({route, navigation} : {route : any, navigation : any}) : React.JSX.Element {
    for (const key in route.params) {
        console.log('HomeStackNav key: ', key);
    }
    const courses = route.params.courses;
    console.log('HomeStackNav courses: ', courses);
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home Page"
                component={HomePage}
                options={{
                    headerTitleStyle: commonStyles.stackHeaderText,
                    headerTransparent: true,
                    contentStyle: commonStyles.stackContent,
                }}
            />
        </Stack.Navigator>
    );
}

export default HomeStackNav;

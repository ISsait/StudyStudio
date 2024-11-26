import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../screens/HomePage';
import { commonStyles } from '../commonStyles';

const Stack = createNativeStackNavigator();

function HomeStackNav({route} : {route : any}) : React.JSX.Element {
    const allCourseIds : string[] = route.params.allCourseIds;
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

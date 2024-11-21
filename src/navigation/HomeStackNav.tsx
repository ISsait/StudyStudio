import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../screens/HomePage';
import { commonStyles } from '../commonStyles';

const Stack = createNativeStackNavigator();

function HomeStackNav() : React.JSX.Element {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomePage}
                options={{
                    headerStyle: commonStyles.stackHeaderView,
                    headerTitleStyle: commonStyles.stackHeaderText,
                }}
            />
        </Stack.Navigator>
    );
}

export default HomeStackNav;

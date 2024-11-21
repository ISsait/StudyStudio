import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProgramPage from '../screens/ProgramPage';
import { commonStyles } from '../commonStyles';

const Stack = createNativeStackNavigator();

function ProgramStackNav() : React.JSX.Element {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Program"
                component={ProgramPage}
                options={{
                    headerStyle: commonStyles.stackHeaderView,
                    headerTitleStyle: commonStyles.stackHeaderText,
                }}
            />
        </Stack.Navigator>
    );
}

export default ProgramStackNav;

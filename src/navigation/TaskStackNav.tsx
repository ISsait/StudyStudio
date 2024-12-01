import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskPage from '../screens/TaskPage';
import { commonStyles } from '../commonStyles';

const Stack = createNativeStackNavigator();

function TaskStackNav() : React.JSX.Element {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="View Tasks"
                component={TaskPage}
                options={{
                    headerTitleStyle: commonStyles.stackHeaderText,
                    headerTransparent: true,
                    contentStyle: commonStyles.stackContent,
                }}
            />
        </Stack.Navigator>
    );
}

export default TaskStackNav;

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskPage from '../screens/TaskPage';
import { commonStyles } from '../commonStyles';

const Stack = createNativeStackNavigator();

function TaskStackNav() : React.JSX.Element {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Task"
                component={TaskPage}
                options={{
                    headerStyle: commonStyles.stackHeaderView,
                    headerTitleStyle: commonStyles.stackHeaderText,
                }}
            />
        </Stack.Navigator>
    );
}

export default TaskStackNav;

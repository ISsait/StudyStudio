import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProjectPage from '../screens/ProjectPage';
import { commonStyles } from '../commonStyles';

const Stack = createNativeStackNavigator();

function ProjectStackNav() : React.JSX.Element {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="View Projects"
                component={ProjectPage}
                options={{
                    headerTitleStyle: commonStyles.stackHeaderText,
                    headerTransparent: true,
                    contentStyle: commonStyles.stackContent,
                }}
            />
        </Stack.Navigator>
    );
}

export default ProjectStackNav;

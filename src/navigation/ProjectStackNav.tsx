import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProjectPage from '../screens/ProjectPage';
import { commonStyles } from '../commonStyles';

const Stack = createNativeStackNavigator();

function ProjectStackNav({route, navigation} : {route : any, navigation : any}) : React.JSX.Element {
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
                initialParams={{projectId : null}}
            />
        </Stack.Navigator>
    );
}

export default ProjectStackNav;

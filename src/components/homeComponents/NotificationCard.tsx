import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { commonStyles } from '../../commonStyles';
import { Project } from '../../utility';

export default function NotificationCard({project, navigation} : {project : Project, navigation : any}) : React.JSX.Element {
    // parse endDate to a readable format with month and day
    const endDate = new Date(project.endDate).toISOString().split('T')[0];
    return (
        <TouchableOpacity style={[
            commonStyles.notificationCard,
            ]}
            onPress={ () => {
                navigation.navigate('Projects', {projectId: project._id});
                }}
            >
            <Text style={{fontSize: 18}}>{project.projectName}</Text>
            <Text style={{fontSize: 18}}>{endDate}</Text>
        </TouchableOpacity>
    );
}

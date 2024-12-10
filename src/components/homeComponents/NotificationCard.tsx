import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { commonStyles } from '../../commonStyles';
import { Project } from '../../utility';

export default function NotificationCard({project, navigation} : {project : Project, navigation : any}) : React.JSX.Element {

    console.log("Project: ", project);
    // parse endDate to a readable format with month and day
    const endDate = new Date(project.endDate).toISOString().split('T')[0];
    return (
        <TouchableOpacity style={[
            commonStyles.notificationCard,
            ]}
            onPress={ () => {
                navigation.navigate('Project', {projectId: project._id});
                }}
            >
            <View>
                {/* <Text style={{fontSize: 20}}>{course.courseName}</Text> */}
                <Text style={{fontSize: 18}}>{project.projectName}</Text>
            </View>
            <Text style={{fontSize: 18}}>{endDate}</Text>
            {/* <Text style={{fontSize: 18}}>{project.endDate}</Text> */}
        </TouchableOpacity>
    );
}

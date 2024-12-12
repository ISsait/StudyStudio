import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { commonStyles } from '../../commonStyles';

export default function NotificationCard({project, navigation} : {project : any, navigation : any}) : React.JSX.Element {
    // parse endDate to a readable format with month and day
    const endDate = new Date(project.endDate).toISOString().split('T')[0];
    return (
        <TouchableOpacity style={[
            commonStyles.notificationCard,
            {backgroundColor: project.color},
            ]}
            onPress={ () => {
                navigation.navigate('Projects', {projectId: project._id});
                }}
            >
                <View>
                    <Text style={{fontSize: 18, fontWeight: '600'}}>{project.courseName}</Text>
                    <Text style={{fontSize: 18}}>{project.projectName}</Text>
                </View>
            <Text style={{fontSize: 18, textAlignVertical: 'bottom'}}>{endDate}</Text>
        </TouchableOpacity>
    );
}

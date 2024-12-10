import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { commonStyles } from '../../commonStyles';

export default function NotificationCard({project, navigation} : {project : any, navigation : any}) : React.JSX.Element {

   
    return (
        <TouchableOpacity style={[
            commonStyles.notificationCard,
            {backgroundColor: project.bgColor},
            ]}
            onPress={ () => {
                navigation.navigate('Project', {projectId: project.projectId});
                }}
            >
            <View>
                {/* <Text style={{fontSize: 20}}>{course.courseName}</Text> */}
                <Text style={{fontSize: 18}}>{project.projectId}</Text>
            </View>
            {/* <Text style={{fontSize: 18}}>{project.endDate}</Text> */}
        </TouchableOpacity>
    );
}

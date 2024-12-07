import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { commonStyles } from '../../commonStyles';

export default function NotificationCard({projectId, navigation} : {projectId : any, navigation : any}) : React.JSX.Element {

    const bgColor = 'blue';

    return (
        <TouchableOpacity style={[
            commonStyles.notificationCard,
            {backgroundColor: bgColor},
            ]}
            onPress={ () => {
                navigation.navigate('Project', {projectId: projectId});
                }}
            >
            <View>
                {/* <Text style={{fontSize: 20}}>{course.courseName}</Text> */}
                <Text style={{fontSize: 18}}>{projectId}</Text>
            </View>
            {/* <Text style={{fontSize: 18}}>{project.endDate}</Text> */}
        </TouchableOpacity>
    );
}

import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { commonStyles } from '../../commonStyles';
import * as utility from '../../utility';

export default function NotificationCard({task, navigation} : {task : utility.TaskObject, navigation : any}) : React.JSX.Element {

    const bgColor = task.course.color;

    return (
        <TouchableOpacity style={[
            commonStyles.notificationCard,
            {backgroundColor: bgColor},
            ]}
            onPress={ () => {
                navigation.navigate('Tasks', {task: task});
                }}
            >
            <View>
                <Text style={{fontSize: 20}}>{task.course.courseName}</Text>
                <Text style={{fontSize: 18}}>{task.task.taskName}</Text>
            </View>
            <Text style={{fontSize: 18}}>{task.task.dueDate}</Text>
        </TouchableOpacity>
    );
}
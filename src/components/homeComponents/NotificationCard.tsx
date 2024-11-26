import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { commonStyles } from '../../commonStyles';

export default function NotificationCard({ projectName }: { projectName: string }) : React.JSX.Element {

    return (
        <TouchableOpacity style={[
            commonStyles.notificationCard,
            ]}
            >
            <View>
                <Text style={{fontSize: 20}}>{projectName}</Text>
            </View>
        </TouchableOpacity>
    );
}
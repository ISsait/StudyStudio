import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import { commonStyles } from '../commonStyles';

export default function TaskPage () : React.JSX.Element {
    return (
        <View style={commonStyles.body}>
            <Text>Task Page Body</Text>
        </View>
    );
}

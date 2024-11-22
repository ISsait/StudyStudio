import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import { commonStyles } from '../commonStyles';

export default function ProgramPage () : React.JSX.Element {
    return (
        <View>
            <Text style={commonStyles.body}>Program Page Body</Text>
        </View>
    );
}

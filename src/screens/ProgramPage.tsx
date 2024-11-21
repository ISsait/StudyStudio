import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import { commonStyles } from '../commonStyles';
import Header from '../components/Header';

export default function ProgramPage () : React.JSX.Element {
    return (
        <View>
            <Header />
            <Text style={commonStyles.body}>Program Page Body</Text>
        </View>
    );
}

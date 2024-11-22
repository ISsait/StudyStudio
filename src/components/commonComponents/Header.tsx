import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import { commonStyles } from '../../commonStyles';

export default function Header () : React.JSX.Element {
    return (
        <View style={commonStyles.headerView}>
            <Text style={commonStyles.headerText}>Study Studio</Text>
            <TouchableOpacity
                onPress={() => console.log('Profile Icon Pressed')}
            >
                <Image
                    style={commonStyles.profileImage}
                    source={require('../../assets/icons/profileIcon.png')}
                />
            </TouchableOpacity>
        </View>
    );
}

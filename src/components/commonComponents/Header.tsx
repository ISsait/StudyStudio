import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import { commonStyles } from '../../commonStyles';
import {
    clearRealm,
} from '../../data/storage/storageManager';
import {
    writeMockDataToRealm,
} from '../../data/mockData';

async function clearAndWriteMockDataToRealm() {
    await clearRealm();
    // await writeMockDataToRealm();
}

export default function Header () : React.JSX.Element {
    return (
        <View style={commonStyles.headerView}>
            <Text style={commonStyles.headerText}>Study Studio</Text>
            <TouchableOpacity
                onPress={() => {
                    console.log('Profile Icon Pressed');
                    clearAndWriteMockDataToRealm();
                }}
            >
                <Image
                    style={commonStyles.profileImage}
                    source={require('../../assets/icons/profileIcon.png')}
                />
            </TouchableOpacity>
        </View>
    );
}

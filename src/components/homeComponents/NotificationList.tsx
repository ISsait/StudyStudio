import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    ScrollView,
    FlatList,
} from 'react-native';
import { commonStyles } from '../../commonStyles';
import { TEST_DATA_PROJECTS } from '../../utility';
import NotificationCard from './NotificationCard';

    const [studentProjects, setStudentProjects] = useState(TEST_DATA_PROJECTS);

export default function NotificationList () : React.JSX.Element {
    return (
        <View>
            <Text style={commonStyles.body}>Home Page Body</Text>
            {studentProjects.length === 0 ? (
                <Text>No Current Projects Need to be Completed.</Text>
            ) : (
                <FlatList data={studentProjects} keyExtractor={(item) => item.projectID} renderItem={({item}) => (
                    <NotificationCard projectName={item.projectName} />
                )} />
            )}
        </View>
    );
}

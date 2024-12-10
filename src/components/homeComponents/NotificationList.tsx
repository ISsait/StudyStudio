import React from 'react';
import {
    FlatList,
    ScrollView,
} from 'react-native';
import { commonStyles } from '../../commonStyles';
import NotificationCard from './NotificationCard';
import {
    getRealm,
    getProjects,
    closeRealm,
} from '../../data/storage/storageManager';
import { useState, useEffect } from 'react';

async function getAllProjects() {
    const realm = await getRealm();
    let projects = getProjects(realm)?.toJSON();
    if (projects) {
        // Convert Realm objects to array of JSON objects
        const projectsArray = projects.map((project : any) => project.toJSON());
        closeRealm(realm);
        return projectsArray;
    } else {
        closeRealm(realm);
        return [];
    }
}

export default function NotificationList({ navigation }: { navigation: any }): React.JSX.Element {
    const [projects, setProjects] = useState<any[]>([]);

    useEffect(() => {
        async function fetchProjects() {
            const projectsData = await getAllProjects();
            setProjects(projectsData);
        }
        fetchProjects();
    }, []);

    return (
        <ScrollView style={commonStyles.notificationList}>
            <FlatList
                data={projects}
                renderItem={({ item }) => (
                    <NotificationCard project={item} navigation={navigation} />
                )}
                keyExtractor={item => item.projectId}
            />
        </ScrollView>
    );
}
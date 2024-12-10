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
        // console.log("Projects: ", projects);
        const projectsArray = projects.map((project: any) => {
            return {
                projectId: project._id,
                projectName: project.projectName,
                endDate: project.endDate,
        }});
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
            // console.log("Projects: ", projectsData);
            setProjects(projectsData);
        }
        fetchProjects();
    }, []);

    return (
            <FlatList
                data={projects}
                renderItem={({ item }) => (
                    <NotificationCard project={item} navigation={navigation} />
                )}
                keyExtractor={item => item.projectId}
            />
    );
}
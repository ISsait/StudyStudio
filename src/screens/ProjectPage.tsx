import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import { commonStyles } from '../commonStyles';
import { Project } from '../utility';
import { useState, useEffect } from 'react';
import { getProjects } from '../data/storage/storageManager';
import { useRoute } from '@react-navigation/native';

async function getProjectData(projectId: string) {
    let projects = await getProjects();
    if (projects) {
        const projectData = projects?.find((project: Project) => String(project._id) === projectId);
        return projectData;
    } else {
        return null;
    }
}

async function handleSetProject(projectId: string, setProject: any) {
    const projectData = await getProjectData(projectId);
    setProject(projectData);
}

export default function ProjectPage () : React.JSX.Element {
    const [project, setProject] = useState<Project | null>(null);
    const route = useRoute();
    console.log('page params', route);

    useEffect(() => {
        const {projectId} = {...route.params};
        handleSetProject(projectId, setProject);
        return () => {
            console.log('cleanup', projectId);
        };
    }, [route.params]);

    return (
        <View style={commonStyles.body}>
            <Text style={{fontSize: 18}}>Project Page</Text>
        </View>
    );
}

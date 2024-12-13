import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import { commonStyles } from '../commonStyles';
import { Project } from '../utility';
import { useState, useEffect } from 'react';
import { getProjects } from '../data/storage/storageManager';

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
    const project = projectData ? projectData : null;
    setProject(project);
}

export default function ProjectPage ({route, navigation} : {route : any, navigation : any}) : React.JSX.Element {
    const [project, setProject] = useState<Project | null>(null);
    // if (route.params) {console.log('page params', route.params.projectId, {...project});}

    useEffect(() => {
        if (route.params.projectId){
            handleSetProject(route.params.projectId, setProject);
        }
        return () => {
            console.log('cleanup');
            setProject(null);
        };
    }, [route.params]);

    return (
        <View style={commonStyles.body}>
            <Text style={{fontSize: 18}}>Project Page</Text>
            <Text style={{fontSize: 18}}>Project Name: {project?.projectName}</Text>
            <Text style={{fontSize: 18}}>Course Id: {project?.courseId?.toString()}</Text>
        </View>
    );
}

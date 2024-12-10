import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import { commonStyles } from '../commonStyles';
import { Project } from '../utility';
import { useState, useEffect } from 'react';
import { getRealm, getProjects, closeRealm } from '../data/storage/storageManager';

async function getProjectData(projectId: string) {
    const realm = await getRealm();
    let projects = getProjects(realm)?.toJSON();
    if (projects) {
        const project = projects.filter((project: any) => {
            return project._id === projectId;
        });
        closeRealm(realm);
        return project;
    } else {
        closeRealm(realm);
        return [];
    }
}

async function handleSetProject(projectId: string, setProject: any) {
    const projectData = await getProjectData(projectId);
    setProject(projectData);
}

export default function ProjectPage ({route, navigation} : {route : any, navigation: any}) : React.JSX.Element {
    
    const [project, setProject] = useState<Project | null>(null);
    // const { projectId } = route.params;
    // const projectData = getProjectData(projectId);
    return (
        <View style={commonStyles.body}>
            <Text style={{fontSize: 18}}>Project Page</Text>
        </View>
    );
}

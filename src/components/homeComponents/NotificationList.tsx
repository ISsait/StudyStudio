import React from 'react';
import {
    FlatList,
} from 'react-native';
import NotificationCard from './NotificationCard';
import {
    getProjects,
    getCourses,
} from '../../data/storage/storageManager';
import { useState, useEffect } from 'react';
import { useRealm } from '../../realmContextProvider';
import Realm from 'realm';

async function getAllProjects(realm : Realm) {
    let projects = await getProjects(realm);
    let courses = await getCourses(realm);
    if (projects) {
        return [projects, courses];
    } else {
        return [];
    }
}

export default function NotificationList({ navigation }: { navigation: any }): React.JSX.Element {
    const [projects, setProjects] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);

    const realm = useRealm();
    useEffect(() => {
        async function fetchProjects() {
            const data = await getAllProjects(realm);
            const projectData = data[0];
            const courseData = data[1];
            if (projectData) {
                setProjects([...projectData]);
            }
            if (courseData) {
                setCourses([...courseData]);
            }
        }
        fetchProjects();
    }, [realm]);

    const cardData = projects.map((project: any) => {
        const courseId = project.courseId;
        const course = courses?.filter((course: any) => String(course._id) === String(courseId));
        const color = course[0]?.color;
        const courseName = course[0]?.courseName;
        return {
            _id: String(project._id),
            projectName: project.projectName,
            endDate: project.endDate,
            color: color,
            courseName: courseName,
        };
    });

    return (
            <FlatList
                data={cardData}
                renderItem={({ item }) => (
                    <NotificationCard project={item} navigation={navigation} />
                )}
                keyExtractor={(item) => item._id}
            />

    );
}

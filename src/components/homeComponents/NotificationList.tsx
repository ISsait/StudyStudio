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
import { Course, Project } from '../../utility';

// Helper to detach Realm objects
const detachFromRealm = <T extends object>(realmObject: T): T => {
  return JSON.parse(JSON.stringify(realmObject));
};

export default function NotificationList({ navigation }: { navigation: any }): React.JSX.Element {
    const [projects, setProjects] = useState<Project[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);

    const realm = useRealm();
    useEffect(() => {
      if (!realm || realm.isClosed) {
        console.error('Realm not available');
        return;
      }

      const projectsResults = realm.objects('Project');
      const coursesResults = realm.objects('Course');

        const updateProjects = () => {
                 console.log('Projects updated');
                 const detachedProjects = Array.from(projectsResults).map(project => {
                   const detached = detachFromRealm(project) as unknown as Project;
                   return new Project(
                     detached.projectName,
                     detached.estimatedHrs,
                     new Date(detached.startDate),
                     new Date(detached.endDate),
                     detached.completed,
                     detached.notes,
                     detached.courseId
                       ? new Realm.BSON.ObjectId(detached.courseId.toString())
                       : undefined,
                     new Realm.BSON.ObjectId(detached._id.toString()),
                   );
                 });
                 setProjects(detachedProjects);
               };
        
               const updateCourses = () => {
                  console.log('Courses updated');
                  const detachedCourses = Array.from(coursesResults).map(course => {
                    const detached = detachFromRealm(course) as unknown as Course;
                    return new Course(
                      detached.courseName,
                      detached.courseCode,
                      detached.instructor,
                      detached.color,
                      new Date(detached.startDate),
                      new Date(detached.endDate),
                      detached.notes,
                      detached.projectIds,
                      new Realm.BSON.ObjectId(detached._id.toString()),
                    );
                  });
                  setCourses(detachedCourses);
                };
                // Fetch initial projects and attach a listener
        updateProjects();
        updateCourses();
        projectsResults.addListener(updateProjects);
        coursesResults.addListener(updateCourses);

       return () => {
          console.log('Cleaning up projects');
          projectsResults.removeListener(updateProjects);
          coursesResults.removeListener(updateCourses);
          setProjects([]); // Clear local state on cleanup
          setCourses([]); // Clear local state on cleanup
       };
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

import React, { useEffect } from 'react';
import {View} from 'react-native';
import {commonStyles} from '../commonStyles';
import CalendarComponent from '../components/homeComponents/Calendar';
import NotificationList from '../components/homeComponents/NotificationList';
import {useNavigation} from '@react-navigation/native';
import { useRealm } from '../realmContextProvider';
import { useState } from 'react';
import Realm from 'realm';
import { Course, Project } from '../utility';


const dueDates = {
  '2024-12-14': [
      { color: '#FF0000', name: 'Math Project', time: '10:00 AM' },
      { color: '#00FF00', name: 'Science Project', time: '2:00 PM' },
  ],
  '2024-12-20': [
      { color: '#0000FF', name: 'English Essay', time: '5:00 PM' },
  ],
};

// Helper to detach Realm objects
const detachFromRealm = <T extends object>(realmObject: T): T => {
  return JSON.parse(JSON.stringify(realmObject));
};

export default function HomePage(): React.JSX.Element {
  const navigation = useNavigation();
  const [courses, setCourses] = useState<Course[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

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


  return (
    <View style={commonStyles.body}>
      <NotificationList navigation={navigation} />
      <CalendarComponent dueDates={dueDates}/>
    </View>
  );
}

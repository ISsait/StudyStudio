import React, { useEffect, useState, useMemo } from 'react';
import { View } from 'react-native';
import { commonStyles } from '../commonStyles';
import CalendarComponent from '../components/homeComponents/Calendar';
import NotificationList from '../components/homeComponents/NotificationList';
import { useNavigation } from '@react-navigation/native';
import { useRealm } from '../realmContextProvider';
import Realm from 'realm';
import { Course, Project } from '../utility';

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
      const detachedProjects = Array.from(projectsResults).map((project) => {
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
          new Realm.BSON.ObjectId(detached._id.toString())
        );
      });
      setProjects(detachedProjects);
    };

    const updateCourses = () => {
      console.log('Courses updated');
      const detachedCourses = Array.from(coursesResults).map((course) => {
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
          new Realm.BSON.ObjectId(detached._id.toString())
        );
      });
      setCourses(detachedCourses);
    };

    // Fetch initial projects and attach listeners
    updateProjects();
    updateCourses();
    projectsResults.addListener(updateProjects);
    coursesResults.addListener(updateCourses);

    return () => {
      console.log('Cleaning up projects and courses');
      projectsResults.removeListener(updateProjects);
      coursesResults.removeListener(updateCourses);
      setProjects([]); // Clear state on cleanup
      setCourses([]);
    };
  }, [realm]);

  // Memoize dueDates to avoid unnecessary recomputations
  const dueDates = useMemo(() => {
    const courseColorMap = courses.reduce((map, course) => {
      map[course._id.toString()] = course.color;
      return map;
    }, {} as Record<string, string>);

    return projects.reduce((acc, project) => {
      const { endDate, projectName, courseId } = project;
      const dateKey = endDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
      const color = courseColorMap[courseId?.toString() || ''];

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }

      acc[dateKey].push({
        color,
        name: projectName,
      });

      return acc;
    }, {} as Record<string, { color: string; name: string }[]>);
  }, [projects, courses]);

  return (
    <View style={commonStyles.body}>
      <NotificationList navigation={navigation} />
      <CalendarComponent dueDates={dueDates} />
    </View>
  );
}

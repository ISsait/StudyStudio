// ParentTabNav.tsx
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Realm from 'realm';
import HomeStackNav from './HomeStackNav';
import CourseStackNav from './CourseStackNav';
import ProjectStackNav from './ProjectStackNav';
import {Course, Project} from '../utility';
import {
  getRealm,
  closeRealm,
  getCourses,
  getProjects,
} from '../data/storage/storageManager';

const Tab = createMaterialTopTabNavigator();

// Helper to detach Realm objects
const detachFromRealm = <T extends object>(realmObject: T): T => {
  return JSON.parse(JSON.stringify(realmObject));
};

function ParentTabNav(): React.JSX.Element {
  const [courses, setCourses] = useState<Course[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    let realm: Realm | null = null;
    try {
      realm = await getRealm();

      const coursesResults = await getCourses();
      const projectsResults = await getProjects();

      if (coursesResults) {
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
      }

      if (projectsResults) {
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
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      if (realm) {
        closeRealm(realm);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      setCourses([]);
      setProjects([]);
    };
  }, []);

  const params = {
    courses,
    projects,
    refreshData: fetchData,
  };

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeStackNav}
          initialParams={params}
        />
        <Tab.Screen
          name="Courses"
          component={CourseStackNav}
          initialParams={params}
        />
        <Tab.Screen
          name="Projects"
          component={ProjectStackNav}
          initialParams={params}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default ParentTabNav;

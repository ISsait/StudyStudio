import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
// import { useState } from 'react';

import HomeStackNav from './HomeStackNav';
import CourseStackNav from './CourseStackNav';
import ProjectStackNav from './ProjectStackNav';

import { mockData } from '../data/mockData';


const Tab = createMaterialTopTabNavigator();

const courses = mockData.courses;
const projects = mockData.projects;

let allCourseIds : string[] = [];
for (const course of courses) {
    allCourseIds.push(course._id.toString());
}

let allProjectIds : string[] = [];
for (const project of projects) {
    allProjectIds.push(project._id.toString());
}

function ParentTabNav() : React.JSX.Element {
  // const [courseList, setCourses] = useState(courses);
  // const [projectList, setProjects] = useState(projects);


    return (
        <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen
                name="Home"
                component={HomeStackNav}
              />
              <Tab.Screen
                name="Courses"
                component={CourseStackNav}
              />
              <Tab.Screen
                name="Projects"
                component={ProjectStackNav}
              />
            </Tab.Navigator>
        </NavigationContainer>
    );
  }

export default ParentTabNav;

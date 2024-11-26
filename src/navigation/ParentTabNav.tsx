import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
// import { useState } from 'react';

import HomeStackNav from './HomeStackNav';
// import ProgramStackNav from './ProgramStackNav';
import CourseStackNav from './CourseStackNav';
// import TaskStackNav from './TaskStackNav';
import ProjectStackNav from './ProjectStackNav';

import { mockData } from '../data/mockData';


const Tab = createMaterialTopTabNavigator();

// const programs = mockData.programs;
// const semesters = mockData.semesters;
const courses = mockData.courses;
const projects = mockData.projects;
// const tasks = mockData.tasks;

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
                initialParams={{allCourseIds}}
              />
              {/* <Tab.Screen
                name="Program"
                component={ProgramStackNav}
              /> */}
              <Tab.Screen
                name="Courses"
                component={CourseStackNav}
                initialParams={{allCourseIds}}
              />
              <Tab.Screen
                name="Projects"
                component={ProjectStackNav}
                initialParams={{allProjectIds}}
              />
              {/* <Tab.Screen
                name="Tasks"
                component={TaskStackNav}
              /> */}
            </Tab.Navigator>
        </NavigationContainer>
    );
  }

export default ParentTabNav;

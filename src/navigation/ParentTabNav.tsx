import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

import HomeStackNav from './HomeStackNav';
import ProgramStackNav from './ProgramStackNav';
import CourseStackNav from './CourseStackNav';
import TaskStackNav from './TaskStackNav';

import { mockData } from '../data/mockData';

const Tab = createMaterialTopTabNavigator();

const programs = mockData.programs;
const semesters = mockData.semesters;
const courses = mockData.courses;
const projects = mockData.projects;
const tasks = mockData.tasks;

function ParentTabNav() : React.JSX.Element {
    console.log('ParentTabNav courses: ', courses);
    return (
        <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen
                name="Home"
                component={HomeStackNav}
                initialParams={{courses}}
              />
              <Tab.Screen
                name="Program"
                component={ProgramStackNav}
              />
              <Tab.Screen
                name="Courses"
                component={CourseStackNav}
              />
              <Tab.Screen
                name="Tasks"
                component={TaskStackNav}
              />
            </Tab.Navigator>
        </NavigationContainer>
    );
  }

export default ParentTabNav;

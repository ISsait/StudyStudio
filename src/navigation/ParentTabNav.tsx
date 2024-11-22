import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeStackNav from './HomeStackNav';
import ProgramStackNav from './ProgramStackNav';
import CourseStackNav from './CourseStackNav';
import TaskStackNav from './TaskStackNav';

const Tab = createMaterialTopTabNavigator();

function ParentTabNav() : React.JSX.Element {
    return (
        <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name="Home" component={HomeStackNav} />
              <Tab.Screen name="Program" component={ProgramStackNav} />
              <Tab.Screen name="Courses" component={CourseStackNav} />
              <Tab.Screen name="Tasks" component={TaskStackNav} />
            </Tab.Navigator>
        </NavigationContainer>
    );
  }

export default ParentTabNav;

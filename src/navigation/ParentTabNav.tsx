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
              <Tab.Screen name="HomeStack" component={HomeStackNav} />
              <Tab.Screen name="ProgramStack" component={ProgramStackNav} />
              <Tab.Screen name="CourseStack" component={CourseStackNav} />
              <Tab.Screen name="TaskStack" component={TaskStackNav} />
            </Tab.Navigator>
        </NavigationContainer>
    );
  }

export default ParentTabNav;

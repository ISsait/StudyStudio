import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {HomeStackNav} from './HomeStackNav';
import {ProgramStackNav} from './ProgramStackNav';
import {CourseStackNav} from './CourseStackNav';
import {TaskStackNav} from './TaskStackNav';
import {commonStyles} from '../commonStyles';

const Tab = createBottomTabNavigator();


import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    ScrollView,
    FlatList,
} from 'react-native';
import { commonStyles } from '../commonStyles';
import CalendarComponent from '../components/homeComponents/Calendar';

export default function HomePage () : React.JSX.Element {
    const [studentProjects, setStudentProjects] = useState(TEST_DATA_PROJECTS);
    const addExistingClasses = () => {

    }
    const addNewClass = () => {
        
    }
    return (
        <View style={commonStyles.body}>
            <Text>Home Page Body</Text>
            <CalendarComponent />
        </View>
    );
}

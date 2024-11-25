import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    ScrollView,
    FlatList,
} from 'react-native';
import { commonStyles } from '../commonStyles';
import { TEST_DATA_PROJECTS } from '../utilities/utility';
import ProjectCards from '../components/homeComponents/ProjectCards';

export default function HomePage () : React.JSX.Element {
    const [studentProjects, setStudentProjects] = useState(TEST_DATA_PROJECTS);
    const addExistingClasses = () => {

    }
    const addNewClass = () => {
        
    }
    return (
        <View>
            <Text style={commonStyles.body}>Home Page Body</Text>
            {studentProjects.length === 0 ? (
                <Text>No Current Projects Need to be Completed.</Text>
            ) : (
                <FlatList data={studentProjects} keyExtractor={(item) => item.projectID} renderItem={({item}) => (
                    <ProjectCards className={item.className} projectName={item.projectName} dueDate={item.endDate} />                 
                )} />
            )}
        </View>
    );
}

import React from "react";
import {View, StyleSheet, Text,} from "react-native";

type ProjectCardProps = {
    className: string,
    projectName: string,
    dueDate: string,
    
}

function ProjectCards({className, projectName, dueDate} : ProjectCardProps) : React.JSX.Element {
    return(
        <View>
            <Text>{className}</Text>
            <Text>{projectName}</Text>
            <Text>{dueDate}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    cardStyles : {
        flex: 1,
        justifyContent: "space-evenly",
    }
});

export default ProjectCards;
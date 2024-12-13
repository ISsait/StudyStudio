import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import {commonStyles} from '../../commonStyles';

interface NotificationProject {
  _id: string;
  projectName: string;
  endDate: Date;
  color: string;
  courseName: string;
}

interface NotificationCardProps {
  project: NotificationProject;
  navigation: any;
}

export default function NotificationCard({
  project,
  navigation,
}: NotificationCardProps): React.JSX.Element {
  return (
    <TouchableOpacity
      style={[styles.card, {backgroundColor: project.color || '#fff'}]}
      onPress={() => navigation.navigate('Projects', {projectId: project._id})}>
      <View>
        <Text style={styles.courseName}>{project.courseName}</Text>
        <Text style={styles.projectName}>{project.projectName}</Text>
        <Text style={styles.date}>
          Due: {project.endDate.toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 8,
    borderRadius: 8,
    elevation: 2,
  },
  courseName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  projectName: {
    fontSize: 14,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
});

import React from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import NotificationCard from './NotificationCard';
import {Course, Project} from '../../utility';

interface NotificationListProps {
  navigation: any;
  route?: {
    params?: {
      projects: Project[];
      courses: Course[];
    };
  };
}

export default function NotificationList({
  navigation,
  route,
}: NotificationListProps): React.JSX.Element {
  const projects = route?.params?.projects || [];
  const courses = route?.params?.courses || [];

  const cardData = projects.map(project => {
    const course = courses.find(
      c => project.courseId && c._id.equals(project.courseId),
    );
    return {
      _id: project._id.toString(),
      projectName: project.projectName,
      endDate: project.endDate,
      color: course?.color || '#ddd',
      courseName: course?.courseName || 'Unknown Course',
    };
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={cardData}
        renderItem={({item}) => (
          <NotificationCard project={item} navigation={navigation} />
        )}
        keyExtractor={item => item._id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No notifications</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});

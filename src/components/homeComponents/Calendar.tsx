import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    FlatList,
    Button,
} from 'react-native';
import { commonStyles } from '../../commonStyles';

interface Project {
    color: string;
    name: string;
    time: string;
}

interface DueDates {
    [date: string]: Project[];
}

interface CalendarComponentProps {
    dueDates: DueDates;
}

export default function CalendarComponent({ dueDates }: CalendarComponentProps): React.JSX.Element {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedProjects, setSelectedProjects] = useState<Project[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    const handleDayPress = (date: string) => {
        if (dueDates[date]) {
            setSelectedDate(date);
            setSelectedProjects(dueDates[date]);
            setModalVisible(true);
        }
    };

    const renderDay = ({ date, state }: any) => {
        const formattedDate = date.dateString;
        const projects = dueDates[formattedDate] || [];
        const textColor = state === 'disabled' ? '#d9e1e8' : '#2d4150';

        return (
            <TouchableOpacity onPress={() => handleDayPress(formattedDate)}>
                <View style={styles.dayContainer}>
                    <View style={styles.backgroundContainer}>
                        {projects.map((project, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.colorSegment,
                                    { backgroundColor: project.color, width: `${100 / projects.length}%` },
                                ]}
                            />
                        ))}
                    </View>
                    <Text style={[styles.dateText, { color: textColor }]}>{date.day}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <Calendar
                style={commonStyles.calendar}
                current={currentDate.toISOString().split('T')[0]}
                minDate={`${currentYear}-${currentMonth + 1}-1`}
                maxDate={`${currentYear}-${currentMonth + 1}-${lastDay.getDate()}`}
                dayComponent={renderDay}
                onDayPress={(day : any) => {console.log('selected day', day);}}
            />

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            Projects Due on {selectedDate}
                        </Text>
                        <FlatList
                            data={selectedProjects}
                            keyExtractor={(item, index) => `${item.name}-${index}`}
                            renderItem={({ item }) => (
                                <View style={styles.projectItem}>
                                    <View
                                        style={[
                                            styles.projectColorIndicator,
                                            { backgroundColor: item.color },
                                        ]}
                                    />
                                    <Text style={styles.projectText}>
                                        {item.name} - {item.time}
                                    </Text>
                                </View>
                            )}
                        />
                        <Button
                            title="Close"
                            onPress={() => setModalVisible(false)}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    dayContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
    },
    colorSegment: {
        height: '100%',
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    projectItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    projectColorIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    projectText: {
        fontSize: 16,
    },
});

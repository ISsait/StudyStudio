import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DatePicker from '@react-native-community/datetimepicker';
import {commonStyles} from '../commonStyles';
import {createCourse, deleteCourse} from '../data/storage/storageManager';
import {Course, CourseColors} from '../utility';
import Realm from 'realm';

const AddCourseForm = ({onSubmit}: {onSubmit: (course: Course) => void}) => {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [instructor, setInstructor] = useState('');
  const [semester, setSemester] = useState('Fall');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [errors, setErrors] = useState({
    courseName: false,
    courseCode: false,
    instructor: false,
    notes: false,
  });

  const semesters = ['Fall', 'Winter', 'Spring', 'Summer'];

  const validateForm = () => {
    const newErrors = {
      courseName: courseName.trim() === '',
      courseCode: courseCode.trim() === '',
      instructor: instructor.trim() === '',
      notes: notes.trim() === '',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const newCourse = new Course(
        courseName,
        courseCode,
        instructor,
        CourseColors.blue,
        startDate,
        endDate,
        notes,
        [],
        new Realm.BSON.ObjectId(),
      );
      onSubmit(newCourse);
      // Reset form
      setCourseName('');
      setCourseCode('');
      setInstructor('');
      setSemester('Fall');
      setStartDate(new Date());
      setEndDate(new Date());
      setNotes('');
    }
  };

  return (
    <ScrollView style={styles.formContainer}>
      <Text style={styles.formTitle}>Add Course</Text>

      <Text style={styles.label}>Course Name *</Text>
      <TextInput
        style={[styles.input, errors.courseName && styles.inputError]}
        value={courseName}
        onChangeText={setCourseName}
        placeholder="Course Name"
      />
      {errors.courseName && (
        <Text style={styles.errorText}>Course name is required</Text>
      )}

      <Text style={styles.label}>Course Code *</Text>
      <TextInput
        style={[styles.input, errors.courseCode && styles.inputError]}
        value={courseCode}
        onChangeText={setCourseCode}
        placeholder="Course Code"
      />
      {errors.courseCode && (
        <Text style={styles.errorText}>Course code is required</Text>
      )}

      <Text style={styles.label}>Instructor *</Text>
      <TextInput
        style={[styles.input, errors.instructor && styles.inputError]}
        value={instructor}
        onChangeText={setInstructor}
        placeholder="Instructor Name"
      />
      {errors.instructor && (
        <Text style={styles.errorText}>Instructor name is required</Text>
      )}

      <Text style={styles.label}>Semester</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={semester}
          onValueChange={itemValue => setSemester(itemValue)}
          style={styles.picker}>
          {semesters.map(sem => (
            <Picker.Item key={sem} label={sem} value={sem} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Start Date</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowStartDate(true)}>
        <Text>{startDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showStartDate && (
        <DatePicker
          value={startDate}
          onChange={(event, date) => {
            setShowStartDate(Platform.OS === 'android');
            if (date) {
              setStartDate(date);
            }
          }}
          mode="date"
        />
      )}

      <Text style={styles.label}>End Date</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowEndDate(true)}>
        <Text>{endDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showEndDate && (
        <DatePicker
          value={endDate}
          onChange={(event, date) => {
            setShowEndDate(Platform.OS === 'android');
            if (date) {
              setEndDate(date);
            }
          }}
          mode="date"
        />
      )}

      <Text style={styles.label}>Notes *</Text>
      <TextInput
        style={[
          styles.input,
          styles.notesInput,
          errors.notes && styles.inputError,
        ]}
        value={notes}
        onChangeText={setNotes}
        placeholder="Notes"
        multiline
      />
      {errors.notes && <Text style={styles.errorText}>Notes are required</Text>}

      <Button title="Add Course" onPress={handleSubmit} />
    </ScrollView>
  );
};

const ViewCoursesForm = ({
  courses,
  onAddClick,
  onDeleteCourse,
}: {
  courses: Course[];
  onAddClick: () => void;
  onDeleteCourse: (course: Course) => void;
}) => {
  const renderCourseItem = ({item}: {item: Course}) => (
    <View style={[styles.courseCard, {backgroundColor: item.color}]}>
      <View style={styles.courseInfo}>
        <Text style={styles.courseName}>{item.courseName}</Text>
        <Text style={styles.courseDetails}>{item.courseCode}</Text>
        <Text style={styles.courseDetails}>{item.instructor}</Text>
        <Text style={styles.notes}>{item.notes}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          Alert.alert(
            'Delete Course',
            `Are you sure you want to delete ${item.courseName}?`,
            [
              {text: 'Cancel', style: 'cancel'},
              {
                text: 'Delete',
                onPress: () => onDeleteCourse(item),
                style: 'destructive',
              },
            ],
          );
        }}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={commonStyles.body}>
      <FlatList
        data={courses}
        renderItem={renderCourseItem}
        keyExtractor={item => item._id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No courses available</Text>
        }
      />
      <TouchableOpacity style={styles.addButton} onPress={onAddClick}>
        <Text style={styles.buttonText}>Add Course</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function CoursePage({route}: any): React.JSX.Element {
  const {courses = [], refreshData = () => {}} = route?.params || {};
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddCourse = async (course: Course) => {
    try {
      await createCourse(course);
      setShowAddForm(false);
      refreshData();
    } catch (error) {
      console.error('Error creating course:', error);
      Alert.alert('Error', 'Failed to create course');
    }
  };

  const handleDeleteCourse = async (course: Course) => {
    try {
      await deleteCourse(course);
      refreshData();
    } catch (error) {
      console.error('Error deleting course:', error);
      Alert.alert('Error', 'Failed to delete course');
    }
  };

  return (
    <View style={commonStyles.body}>
      {showAddForm ? (
        <AddCourseForm onSubmit={handleAddCourse} />
      ) : (
        <ViewCoursesForm
          courses={courses}
          onAddClick={() => setShowAddForm(true)}
          onDeleteCourse={handleDeleteCourse}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 16,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 16,
  },
  picker: {
    height: 50,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
  },
  courseCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
  },
  courseInfo: {
    flex: 1,
  },
  courseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  courseDetails: {
    fontSize: 14,
    color: '#666',
  },
  notes: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    margin: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});

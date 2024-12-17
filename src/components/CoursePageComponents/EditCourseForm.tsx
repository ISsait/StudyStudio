import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DatePicker from '@react-native-community/datetimepicker';
import {Course, CourseColors} from '../../utility';
import {
  useNavigation,
} from '@react-navigation/native';
import { useRealm } from '../../realmContextProvider';
import Realm from 'realm';

// Add helper function
const detachFromRealm = <T extends any>(realmObject: T): T => {
  return JSON.parse(JSON.stringify(realmObject));
};

export default function EditCourseForm ({
  onSubmit,
  courseId,
  showEditForm,
  setShowEditForm,
}: {
  onSubmit: (course: Course) => void,
  courseId: Realm.BSON.ObjectId,
  showEditForm: boolean,
  setShowEditForm: (showEditForm: boolean) => void,
}) {
  const realm = useRealm();
  const navigation = useNavigation();
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [instructor, setInstructor] = useState('');
  const [semester, setSemester] = useState('Fall');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [selectedColor, setSelectedColor] = useState(CourseColors.blue);
  const [errors, setErrors] = useState({
    courseName: false,
    courseCode: false,
    instructor: false,
    notes: false,
  });

  useEffect(() => {
    function getCourseData() {
      try {
        if (!courseId) {
          return;
        }
      } catch (error) {
        console.error('Error getting course data', error);
      }
      const course = realm.objectForPrimaryKey<Course>('Course', courseId);
      const detachedCourse = detachFromRealm(course) as Course;
      if (detachedCourse) {
        setCourseName(detachedCourse.courseName);
        setCourseCode(detachedCourse.courseCode);
        setInstructor(detachedCourse.instructor);
        setStartDate(new Date(detachedCourse.startDate));
        setEndDate(new Date(detachedCourse.endDate));
        setNotes(detachedCourse.notes);
        setSelectedColor(detachedCourse.color);
      }
    }
    getCourseData();
  }, [courseId, realm]);

    useEffect(() => {
      // Conditionally update the header title
      navigation.setOptions({
        title: showEditForm ? 'Edit Course' : 'View Course',
      });
      return () => {
        navigation.setOptions({
          title: 'View Course',
        });
      };
    }, [navigation, showEditForm]);

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
        selectedColor,
        startDate,
        endDate,
        notes,
        [],
        // new Realm.BSON.ObjectId(),
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

      <Text style={styles.label}>Course Name *</Text>
      <TextInput
        style={[styles.input, errors.courseName && styles.inputError]}
        value={courseName}
        onChangeText={setCourseName}
        placeholder={errors.courseName ? 'Project name is required' : 'Project Name'} // Dynamic placeholder
        placeholderTextColor={errors.courseName ? 'red' : 'gray'} // Set placeholder color to red if there's an error
      />

      <Text style={styles.label}>Course Code *</Text>
      <TextInput
        style={[styles.input, errors.courseCode && styles.inputError]}
        value={courseCode}
        onChangeText={setCourseCode}
        placeholder={errors.courseCode ? 'Course code is required' : 'Course Code'} // Dynamic placeholder
        placeholderTextColor={errors.courseCode ? 'red' : 'gray'} // Set placeholder color to red if there's an error
      />

      <Text style={styles.label}>Instructor *</Text>
      <TextInput
        style={[styles.input, errors.instructor && styles.inputError]}
        value={instructor}
        onChangeText={setInstructor}
        placeholder={errors.instructor ? 'Instructor name is required' : 'Instructor Name'} // Dynamic placeholder
        placeholderTextColor={errors.instructor ? 'red' : 'gray'} // Set placeholder color to red if there's an error
      />

      <View style={styles.dateContainer}>
        <View>
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
        </View>


        <View>
          <Text style={styles.label}>Course Color</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedColor}
              onValueChange={itemValue => setSelectedColor(itemValue)}
              style={styles.picker}>
              {Object.entries(CourseColors).map(([key, value]) => (
                <Picker.Item
                  key={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={value}
                />
              ))}
            </Picker>
          </View>
        </View>
      </View>

      <View style={styles.dateContainer}>
        <View>
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
                setShowStartDate(false); // Always close on Android
                if (date) {
                  setStartDate(date);
                }
              }}
              mode="date"
            />
          )}
        </View>

        <View>
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
                setShowEndDate(false); // Always close on Android
                if (date) {
                  setEndDate(date);
                }
              }}
              mode="date"
            />
          )}
        </View>
      </View>

      <Text style={styles.label}>Notes *</Text>
      <TextInput
        style={[
          styles.input,
          styles.notesInput,
          errors.notes && styles.inputError,
        ]}
        value={notes}
        onChangeText={setNotes}
        placeholder={errors.notes ? 'Notes are required' : 'Notes'} // Dynamic placeholder
        placeholderTextColor={errors.notes ? 'red' : 'gray'} // Set placeholder color to red if there's an error
        multiline
      />

      <View style={styles.buttonContainer}>
              <Button title="Edit Project" onPress={handleSubmit} />
              <Button title="Cancel" onPress={() => setShowEditForm(false)} color = "#666"/>
            </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
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
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    padding: 25,
    width: 150,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    paddingHorizontal: 24,
    width: 150,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
  },
});

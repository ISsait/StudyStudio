import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DatePicker from '@react-native-community/datetimepicker';
import {commonStyles} from '../commonStyles';
import {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourses,
} from '../data/storage/storageManager';
import {Course, CourseColors, Project} from '../utility';
import Realm from 'realm';
import {useRealm} from '../realmContextProvider';
import {
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import EditCourseForm from '../components/CoursePageComponents/EditCourseForm';


const AddCourseForm = ({
  onSubmit,
  courses,
  showAddForm,
  setShowAddForm,
}: {
  onSubmit: (course: Course) => void,
  courses: Course[],
  showAddForm: boolean,
  setShowAddForm: (showAddForm: boolean) => void,
}) => {
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
      // Conditionally update the header title
      navigation.setOptions({
        title: showAddForm ? 'Add Course' : 'View Course',
      });
      return () => {
        navigation.setOptions({
          title: 'View Course',
        });
      };
    }, [navigation, showAddForm]);

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
              <Button title="Add Project" onPress={handleSubmit} />
              <Button title="Cancel" onPress={() => setShowAddForm(false)} color = "#666"/>
            </View>
    </ScrollView>
  );
};

const ViewCoursesForm = ({
  courses,
  onAddClick,
  onDeleteCourse,
  isDeleting,
  setShowEditForm,
  setCourseId,
}: {
  courses: Course[];
  onAddClick: () => void;
  onDeleteCourse: (course: Course) => void;
  isDeleting: boolean;
  setShowEditForm: (showEditForm: boolean) => void;
  setCourseId: (courseId: Realm.BSON.ObjectId) => void;
}) => {
  let courseId = new Realm.BSON.ObjectId();
  const renderCourseItem = ({item}: {item: Course}) => (
    <TouchableOpacity
      style={[styles.courseCard, {backgroundColor: item.color}]}
      onPress={() => {
        setShowEditForm(true);
        courseId = item._id;
        setCourseId(courseId);
      }}>
      <View style={styles.courseInfo}>
        <Text style={styles.courseName}>{item.courseName}</Text>
        <Text style={styles.courseDetails}>{item.courseCode}</Text>
        <Text style={styles.notes}>{item.notes}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        disabled={isDeleting}
        onPress={() => onDeleteCourse(item)}>
        <Text style={styles.deleteButtonText}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
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

export default function CoursePage({
  navigation,
}: {
  route: any;
  navigation: NavigationProp<any>;
}): React.JSX.Element {
  const realm = useRealm();
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [courseId, setCourseId] = useState<Realm.BSON.ObjectId>(() => new Realm.BSON.ObjectId());

  useEffect(() => {
      if (!realm || realm.isClosed) {
        console.error('Realm not available');
        return;
      }

      const projectsResults = realm.objects<
        Realm.Object & {
          projectName: string;
          estimatedHrs: number;
          startDate: Date;
          endDate: Date;
          completed: boolean;
          notes: string;
          courseId?: Realm.BSON.ObjectId;
          _id: Realm.BSON.ObjectId;
        }
      >('Project');

      const coursesResults = realm.objects<
        Realm.Object & {
          courseName: string;
          courseCode: string;
          instructor: string;
          color: string;
          startDate: Date;
          endDate: Date;
          notes: string;
          projectIds: Realm.BSON.ObjectId[];
          _id: Realm.BSON.ObjectId;
        }
      >('Course');

      const updateProjects = () => {
        console.log('Projects updated');
        const detachedProjects = Array.from(projectsResults).map(project => {
          const detached = detachFromRealm(project) as unknown as {
            projectName: string;
            estimatedHrs: number;
            startDate: Date;
            endDate: Date;
            completed: boolean;
            notes: string;
            courseId?: Realm.BSON.ObjectId;
            _id: Realm.BSON.ObjectId;
          };
          return new Project(
            detached.projectName,
            detached.estimatedHrs,
            new Date(detached.startDate),
            new Date(detached.endDate),
            detached.completed,
            detached.notes,
            detached.courseId
              ? new Realm.BSON.ObjectId(detached.courseId.toString())
              : undefined,
            new Realm.BSON.ObjectId(detached._id.toString()),
          );
        });
        setProjects(detachedProjects);
      };

      const updateCourses = () => {
        console.log('Courses updated');
        const detachedCourses = Array.from(coursesResults).map(course => {
          const detached = detachFromRealm(course);
          return new Course(
            detached.courseName,
            detached.courseCode,
            detached.instructor,
            detached.color as CourseColors,
            new Date(detached.startDate),
            new Date(detached.endDate),
            detached.notes,
            detached.projectIds.map(id => new Realm.BSON.ObjectId(id.toString())),
            new Realm.BSON.ObjectId(detached._id.toString()),
          );
        });
        setCourses(detachedCourses);
      };

      // Fetch initial projects and attach listeners
      updateProjects();
      updateCourses();
      projectsResults.addListener(updateProjects);
      coursesResults.addListener(updateCourses);

      return () => {
        console.log('Cleaning up projects and courses');
        projectsResults.removeListener(updateProjects);
        coursesResults.removeListener(updateCourses);
        setProjects([]); // Clear state on cleanup
        setCourses([]);
      };
    }, [realm]);

  const handleAddCourse = async (course: Course) => {
    try {
      await createCourse(course, realm);

      // Update local state optimistically
      setCourses(prevCourses => [...prevCourses, course]);

      setShowAddForm(false);

      // Navigate to refresh state
      navigation.navigate('Home', {
        refresh: Date.now(),
      });
    } catch (error) {
      console.error('Error creating course:', error);
      Alert.alert('Error', 'Failed to create course');

      // Revert on error
      const coursesResults = await getCourses(realm);
      if (coursesResults) {
        const detachedCourses = Array.from(coursesResults).map(eachCourse => {
          const detached = detachFromRealm(eachCourse) as unknown as Course;
          return new Course(
            detached.courseName,
            detached.courseCode,
            detached.instructor,
            detached.color,
            new Date(detached.startDate),
            new Date(detached.endDate),
            detached.notes,
            detached.projectIds,
            detached._id,
          );
        });
        setCourses(detachedCourses);
      }
    }
  };

  const handleDeleteCourse = async (course: Course) => {
    setIsDeleting(true);
    try {
      console.log('Course to delete:', {
        id: course._id.toString(),
        name: course.courseName,
      });

      const objectId =
        typeof course._id === 'string'
          ? new Realm.BSON.ObjectId(course._id)
          : course._id instanceof Realm.BSON.ObjectId
          ? course._id
          : (() => {
              console.error('Invalid _id type:', typeof course._id);
              throw new Error('Invalid course ID format');
            })();

      const courseToDelete = new Course(
        course.courseName,
        course.courseCode,
        course.instructor,
        course.color,
        course.startDate,
        course.endDate,
        course.notes,
        course.projectIds,
        objectId,
      );

      // Update local state optimistically
      setCourses(prevCourses =>
        prevCourses.filter((c: Course) =>
          c._id instanceof Realm.BSON.ObjectId
            ? c._id.toString() !== course._id.toString()
            : c._id !== course._id,
        ),
      );

      await deleteCourse(courseToDelete);
      console.log('Course deleted successfully');

      navigation.navigate('Home', {
        refresh: Date.now(),
      });
    } catch (error) {
      console.error('Error deleting course:', error);
      Alert.alert('Error', 'Failed to delete course');
      // Revert on error
      const coursesResults = await getCourses(realm);
      if (coursesResults) {
        const detachedCourses = Array.from(coursesResults).map(eachCourse => {
          const detached = detachFromRealm(eachCourse) as unknown as Course;
          return new Course(
            detached.courseName,
            detached.courseCode,
            detached.instructor,
            detached.color,
            new Date(detached.startDate),
            new Date(detached.endDate),
            detached.notes,
            detached.projectIds,
            detached._id,
          );
        });
        setCourses(detachedCourses);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  function handleEditCourse(course : Course) {
    const courseById = courses.find(c => c._id === courseId) as Course;
    updateCourse(courseById, course, realm);
    setShowEditForm(false);
  }

  return (
    <View style={commonStyles.body}>
      {showAddForm ? (
        <AddCourseForm
          onSubmit={handleAddCourse}
          courses={courses}
          showAddForm={showAddForm}
          setShowAddForm={setShowAddForm}
      />
      ) : showEditForm ? (
        <EditCourseForm
          onSubmit={handleEditCourse}
          courseId={courseId}
          showEditForm={showEditForm}
          setShowEditForm={setShowEditForm}
        />
      ) : (
        <ViewCoursesForm
          courses={courses}
          onAddClick={() => setShowAddForm(true)}
          onDeleteCourse={handleDeleteCourse}
          isDeleting={isDeleting}
          setShowEditForm={setShowEditForm}
          setCourseId={setCourseId}
        />
      )}
    </View>
  );
}

// Add helper function
const detachFromRealm = <T extends object>(realmObject: T): T => {
  return JSON.parse(JSON.stringify(realmObject));
};

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

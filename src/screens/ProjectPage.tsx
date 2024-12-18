import React, {useEffect, useState} from 'react';
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
import DatePicker from '@react-native-community/datetimepicker';
import {commonStyles} from '../commonStyles';
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from '../data/storage/storageManager';
import {Course, CourseColors, Project} from '../utility';
import Realm from 'realm';
import {useRealm} from '../realmContextProvider';
import {Picker} from '@react-native-picker/picker';
import {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

const AddProjectForm = ({
  onSubmit,
  courses,
  showAddForm,
  setShowAddForm,
}: {
  onSubmit: (project: Project) => void;
  courses: Course[];
  showAddForm: boolean;
  setShowAddForm: (showAddForm: boolean) => void;
}) => {
  const navigation = useNavigation();
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [projectName, setProjectName] = useState('');
  const [estimatedHrs, setEstimatedHrs] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [errors, setErrors] = useState({
    projectName: false,
    estimatedHrs: false,
    notes: false,
  });

  useEffect(() => {
    // Conditionally update the header title
    navigation.setOptions({
      title: showAddForm ? 'Add Project' : 'View Project',
    });
    return () => {
      navigation.setOptions({
        title: 'View Project',
      });
    };
  }, [navigation, showAddForm]);

  const validateForm = () => {
    const newErrors = {
      projectName: projectName.trim() === '',
      estimatedHrs: estimatedHrs.trim() === '' || isNaN(Number(estimatedHrs)),
      notes: notes.trim() === '',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const newProject = new Project(
        projectName,
        Number(estimatedHrs),
        startDate,
        endDate,
        false,
        notes,
        selectedCourseId
          ? new Realm.BSON.ObjectId(selectedCourseId)
          : undefined,
        new Realm.BSON.ObjectId(),
      );
      onSubmit(newProject);
      setProjectName('');
      setEstimatedHrs('');
      setStartDate(new Date());
      setEndDate(new Date());
      setNotes('');
    }
  };

  return (
    <ScrollView style={styles.formContainer}>
      <Text style={styles.label}>Project Name *</Text>
      <TextInput
        style={[styles.input, errors.projectName && styles.inputError]}
        value={projectName}
        onChangeText={setProjectName}
        placeholder={
          errors.projectName ? 'Project name is required' : 'Project Name'
        } // Dynamic placeholder
        placeholderTextColor={errors.projectName ? 'red' : 'gray'} // Set placeholder color to red if there's an error
      />

      <Text style={styles.label}>Estimated Hours *</Text>
      <TextInput
        style={[styles.input, errors.estimatedHrs && styles.inputError]}
        value={estimatedHrs}
        onChangeText={setEstimatedHrs}
        placeholder={
          errors.estimatedHrs
            ? 'Valid number of hours required'
            : 'Estimated Hours'
        } // Dynamic placeholder
        placeholderTextColor={errors.estimatedHrs ? 'red' : 'gray'} // Set placeholder color to red if there's an error
        keyboardType="numeric"
      />

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
            setShowStartDate(Platform.OS === 'ios');
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
            setShowEndDate(Platform.OS === 'ios');
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
        placeholder={errors.notes ? 'Notes are required' : 'Notes'} // Dynamic placeholder
        placeholderTextColor={errors.notes ? 'red' : 'gray'} // Set placeholder color to red if there's an
        multiline
      />

      <Text style={styles.label}>Course</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCourseId}
          onValueChange={itemValue => setSelectedCourseId(itemValue)}
          style={styles.picker}>
          <Picker.Item label="Select a course" value="" />
          {courses.map(course => (
            <Picker.Item
              key={course._id.toString()}
              label={course.courseName}
              value={course._id.toString()}
            />
          ))}
        </Picker>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Add Project" onPress={handleSubmit} />
        <Button
          title="Cancel"
          onPress={() => setShowAddForm(false)}
          color="#666"
        />
      </View>
    </ScrollView>
  );
};

const EditProjectForm = ({
  project,
  onSubmit,
  onCancel,
  courses,
}: {
  project: Project;
  onSubmit: (project: Project) => void;
  onCancel: () => void;
  courses: Course[];
}) => {
  const navigation = useNavigation();
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    project.courseId?.toString() || '',
  );
  const [projectName, setProjectName] = useState(project.projectName);
  const [estimatedHrs, setEstimatedHrs] = useState(
    project.estimatedHrs.toString(),
  );
  const [startDate, setStartDate] = useState(project.startDate);
  const [endDate, setEndDate] = useState(project.endDate);
  const [notes, setNotes] = useState(project.notes);
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [errors, setErrors] = useState({
    projectName: false,
    estimatedHrs: false,
    notes: false,
  });

  useEffect(() => {
    // Conditionally update the header title
    navigation.setOptions({
      title: project ? 'Edit Project' : 'View Project',
    });
    return () => {
      navigation.setOptions({
        title: 'View Project',
      });
    };
  }, [navigation, project]);

  const validateForm = () => {
    const newErrors = {
      projectName: projectName.trim() === '',
      estimatedHrs: estimatedHrs.trim() === '' || isNaN(Number(estimatedHrs)),
      notes: notes.trim() === '',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const updatedProject = new Project(
        projectName,
        Number(estimatedHrs),
        startDate,
        endDate,
        project.completed,
        notes,
        selectedCourseId
          ? new Realm.BSON.ObjectId(selectedCourseId)
          : undefined,
        project._id,
      );
      onSubmit(updatedProject);
    }
  };

  return (
    <ScrollView style={styles.formContainer}>
      <Text style={styles.label}>Project Name *</Text>
      <TextInput
        style={[styles.input, errors.projectName && styles.inputError]}
        value={projectName}
        onChangeText={setProjectName}
        placeholder={
          errors.projectName ? 'Project name is required' : 'Project Name'
        } // Dynamic placeholder
        placeholderTextColor={errors.projectName ? 'red' : 'gray'} // Set placeholder color to red if there's an error
      />

      <Text style={styles.label}>Estimated Hours *</Text>
      <TextInput
        style={[styles.input, errors.estimatedHrs && styles.inputError]}
        value={estimatedHrs}
        onChangeText={setEstimatedHrs}
        placeholder={
          errors.estimatedHrs
            ? 'Valid number of hours required'
            : 'Estimated Hours'
        } // Dynamic placeholder
        placeholderTextColor={errors.estimatedHrs ? 'red' : 'gray'} // Set placeholder color to red if there's an error
        keyboardType="numeric"
      />

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
            setShowStartDate(Platform.OS === 'ios');
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
            setShowEndDate(Platform.OS === 'ios');
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
        placeholder={errors.notes ? 'Notes are required' : 'Notes'} // Dynamic placeholder
        placeholderTextColor={errors.notes ? 'red' : 'gray'} // Set placeholder color to red if there's an
        multiline
      />

      <Text style={styles.label}>Course</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCourseId}
          onValueChange={itemValue => setSelectedCourseId(itemValue)}
          style={styles.picker}>
          <Picker.Item label="Select a course" value="" />
          {courses.map(course => (
            <Picker.Item
              key={course._id.toString()}
              label={course.courseName}
              value={course._id.toString()}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Update Project" onPress={handleSubmit} />
        <Button title="Cancel" onPress={onCancel} color="#666" />
      </View>
    </ScrollView>
  );
};

const ViewProjectsForm = ({
  projects,
  onAddClick,
  onDeleteProject,
  isDeleting,
}: {
  projects: Project[];
  onAddClick: () => void;
  onDeleteProject: (project: Project) => void;
  isDeleting: boolean;
}) => {
  const renderProjectItem = ({item}: {item: Project}) => (
    <View style={styles.projectCard}>
      <View style={styles.projectInfo}>
        <Text style={styles.projectName}>{item.projectName}</Text>
        <Text style={styles.projectDetails}>Hours: {item.estimatedHrs}</Text>
        <Text style={styles.projectDetails}>
          {item.startDate.toLocaleDateString()} -{' '}
          {item.endDate.toLocaleDateString()}
        </Text>
        <Text style={styles.notes}>{item.notes}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        disabled={isDeleting}
        onPress={() => onDeleteProject(item)}>
        <Text style={styles.deleteButtonText}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={commonStyles.body}>
      <FlatList
        data={projects}
        renderItem={renderProjectItem}
        keyExtractor={item => item._id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No projects available</Text>
        }
      />
      <TouchableOpacity style={styles.addButton} onPress={onAddClick}>
        <Text style={styles.buttonText}>Add Project</Text>
      </TouchableOpacity>
    </View>
  );
};

// Helper to detach Realm objects
const detachFromRealm = <T extends object>(realmObject: T): T => {
  return JSON.parse(JSON.stringify(realmObject));
};

interface ProjectPageProps {
  route: any;
  navigation: NavigationProp<any>;
}

export default function ProjectPage({
  route,
  navigation,
}: ProjectPageProps): React.JSX.Element {
  const realm = useRealm();
  const [showAddForm, setShowAddForm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  // projectId passing in as a prop
  const [projectById, setProjectById] = useState<Project | null>(null);

  useEffect(() => {
    if (!realm || realm.isClosed) {
      console.error('Realm not available');
      return;
    }

    // Safely create BSON ObjectId
    const projectIdBSON = new Realm.BSON.ObjectId(route.params.projectId);

    // Fetch the project object by primary key
    const project = realm.objectForPrimaryKey<Project>(
      'Project',
      projectIdBSON,
    );

    // Update the local state with a detached project
    const updateProjectById = () => {
      if (project) {
        const detachedProject = detachFromRealm(project) as Project;

        const projectData = new Project(
          detachedProject.projectName,
          detachedProject.estimatedHrs,
          new Date(detachedProject.startDate),
          new Date(detachedProject.endDate),
          detachedProject.completed,
          detachedProject.notes,
          detachedProject.courseId
            ? new Realm.BSON.ObjectId(detachedProject.courseId.toString())
            : undefined,
          new Realm.BSON.ObjectId(detachedProject._id.toString()),
        );

        setProjectById(projectData);
      } else {
        setProjectById(null);
      }
    };

    // Update state immediately
    updateProjectById();

    // Set up listener for updates to the project
    const listener = () => {
      updateProjectById();
    };
    project?.addListener(listener);

    // Cleanup function
    return () => {
      console.log('ProjectId cleanup');
      project?.removeListener(listener); // Properly remove listener
      route.params.projectId = null; // Reset projectId in route params
      setProjectById(null);
    };
  }, [route.params, realm]);

  // Fetch projects and courses from Realm and listen for changes
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

  const handleAddProject = async (project: Project) => {
    try {
      await createProject(project, realm);
      console.log('Project created successfully', project);
      setShowAddForm(false);
    } catch (error) {
      console.error('Error creating project:', error);
      Alert.alert('Error', 'Failed to create project');
    }
  };

  const handleUpdateProject = async (updatedProject: Project) => {
    try {
      const originalProject = realm.objectForPrimaryKey<Project>(
        'Project',
        updatedProject._id,
      );
      if (!originalProject) {
        throw new Error('Project not found');
      }
      await updateProject(originalProject, updatedProject, realm);

      // Update local state optimistically
      setProjects(prevProjects =>
        prevProjects.map(p =>
          p._id.toString() === updatedProject._id.toString()
            ? updatedProject
            : p,
        ),
      );

      setProjectById(null);

      // Navigate with refresh trigger
      navigation.navigate('Home', {
        refresh: Date.now(),
      });
    } catch (error) {
      console.error('Error updating project:', error);
      Alert.alert('Error', 'Failed to update project');

      // Revert on error
      const projectsResults = await getProjects(realm);
      if (projectsResults) {
        const detachedProjects = Array.from(projectsResults).map(project => {
          const detached = detachFromRealm(project) as unknown as Project;
          return new Project(
            detached.projectName,
            detached.estimatedHrs,
            new Date(detached.startDate),
            new Date(detached.endDate),
            detached.completed,
            detached.notes,
            detached.courseId ?? undefined,
            detached._id,
          );
        });
        setProjects(detachedProjects);
      }
    }
  };

  const handleDeleteProject = async (project: Project) => {
    setIsDeleting(true);
    try {
      console.log('Project to delete:', {
        id: project._id.toString(),
        type: project._id.constructor.name,
        courseId: project.courseId?.toString(),
        name: project.projectName,
      });

      // Create proper ObjectId
      let objectId: Realm.BSON.ObjectId;
      if (project._id instanceof Realm.BSON.ObjectId) {
        objectId = project._id;
      } else if (typeof project._id === 'string') {
        objectId = new Realm.BSON.ObjectId(project._id);
      } else {
        throw new Error('Invalid project ID format');
      }

      const projectToDelete = new Project(
        project.projectName,
        project.estimatedHrs,
        project.startDate,
        project.endDate,
        project.completed,
        project.notes,
        project.courseId ?? undefined,
        objectId,
      );

      await deleteProject(projectToDelete, realm);
      console.log('Project deleted successfully');
    } catch (error) {
      console.error('Error deleting project:', {
        error,
        projectId: project._id.toString(),
      });
      Alert.alert('Error', 'Failed to delete project');
      setProjects(projects);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <View style={commonStyles.body}>
      {showAddForm ? (
        <View>
          <AddProjectForm
            onSubmit={handleAddProject}
            courses={courses}
            showAddForm={showAddForm}
            setShowAddForm={setShowAddForm}
          />
        </View>
      ) : projectById ? (
        <EditProjectForm
          project={projectById}
          courses={courses}
          onSubmit={handleUpdateProject}
          onCancel={() => setProjectById(null)}
        />
      ) : (
        <ViewProjectsForm
          projects={projects}
          onAddClick={() => setShowAddForm(true)}
          onDeleteProject={handleDeleteProject}
          isDeleting={isDeleting}
        />
      )}
    </View>
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
    padding: 6,
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
  dateButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
  },
  projectCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  projectDetails: {
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
  },
});

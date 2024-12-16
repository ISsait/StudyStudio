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
import {createProject, deleteProject} from '../data/storage/storageManager';
import {Course, Project} from '../utility';
import Realm from 'realm';
import MyButton from '../components/commonComponents/MyButton';
import { useRealm } from '../realmContextProvider';

const AddProjectForm = ({onSubmit}: {onSubmit: (project: Project) => void}) => {
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
        undefined,
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
      <Text style={styles.formTitle}>Add Project</Text>

      <Text style={styles.label}>Project Name *</Text>
      <TextInput
        style={[styles.input, errors.projectName && styles.inputError]}
        value={projectName}
        onChangeText={setProjectName}
        placeholder="Project Name"
      />
      {errors.projectName && (
        <Text style={styles.errorText}>Project name is required</Text>
      )}

      <Text style={styles.label}>Estimated Hours *</Text>
      <TextInput
        style={[styles.input, errors.estimatedHrs && styles.inputError]}
        value={estimatedHrs}
        onChangeText={setEstimatedHrs}
        placeholder="Estimated Hours"
        keyboardType="numeric"
      />
      {errors.estimatedHrs && (
        <Text style={styles.errorText}>Valid number of hours required</Text>
      )}

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
        placeholder="Notes"
        multiline
      />
      {errors.notes && <Text style={styles.errorText}>Notes are required</Text>}

      <Button title="Add Project" onPress={handleSubmit} />
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

export default function ProjectPage(): React.JSX.Element {
  // const {projects = [], refreshData = () => {}} = route?.params || {};
  const [showAddForm, setShowAddForm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  const realm = useRealm();
  useEffect(() => {
    if (!realm || realm.isClosed) {
      console.error('Realm not available');
      return;
    }

    const projectsResults = realm.objects('Project');
    const coursesResults = realm.objects('Course');

    const updateProjects = () => {
      console.log('Projects updated');
      const detachedProjects = Array.from(projectsResults).map((project) => {
        const detached = detachFromRealm(project) as unknown as Project;
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
          new Realm.BSON.ObjectId(detached._id.toString())
        );
      });
      setProjects(detachedProjects);
    };

    const updateCourses = () => {
      console.log('Courses updated');
      const detachedCourses = Array.from(coursesResults).map((course) => {
        const detached = detachFromRealm(course) as unknown as Course;
        return new Course(
          detached.courseName,
          detached.courseCode,
          detached.instructor,
          detached.color,
          new Date(detached.startDate),
          new Date(detached.endDate),
          detached.notes,
          detached.projectIds,
          new Realm.BSON.ObjectId(detached._id.toString())
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
            <AddProjectForm onSubmit={handleAddProject} />
            <MyButton title="Cancel" onPress={() => setShowAddForm(false)} />
        </View>
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
});

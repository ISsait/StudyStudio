import Realm from 'realm';
import {Course, Project} from '../../utility';

export async function getRealm() {
  return await Realm.open({
    schema: [Course.courseSchema, Project.projectSchema],
    schemaVersion: 1,
  });
}

export function closeRealm(realm: Realm) {
  if (!realm.isClosed) {
    realm.close();
    console.log('Realm closed from storage manager');
  }
}

export async function getCourses(realm : Realm) {
  try {
    return realm.objects('Course');
  } catch (error) {
    console.error('Error getting courses: ', error);
  }
}

export async function getCourseById(realm : Realm, courseId: Realm.BSON.ObjectId) {
  try {
    return realm.objectForPrimaryKey('Course', courseId);
  } catch (error) {
    console.error('Error getting course by ID: ', error);
  }
}

export async function getProjects(realm : Realm) {
  try {
    return realm.objects('Project');
  } catch (error) {
    console.error('Error getting projects: ', error);
  }
}

export async function getProjectById(realm : Realm, projectId: Realm.BSON.ObjectId) {
  try {
    return realm.objectForPrimaryKey('Project', projectId);
  } catch (error) {
    console.error('Error getting project by ID: ', error);
  }
}

export async function createCourse(course: Course, realm: Realm ) {
  try {
    realm.write(() => {
      realm.create('Course', course);
    });
  } catch (error) {
    console.error('Error creating course: ', error);
    throw error;
  }
}

export async function createProject(project: Project, realm: Realm) {
  try {
    realm.write(() => {
      realm.create('Project', project);
    });
  } catch (error) {
    console.error('Error creating project: ', error);
    throw error;
  }
}

export async function deleteCourse(course: Course) {
  const realm = await getRealm();
  try {
    const courseToDelete = realm.objectForPrimaryKey('Course', course._id);
    if (courseToDelete) {
      realm.write(() => {
        try {
          realm.delete(courseToDelete);
        } catch (error) {
          console.error('Error deleting course: ', error);
          throw error;
        }
      });
    } else {
      console.error('Course not found');
      throw new Error('Course not found');
    }
  } catch (error) {
    console.error('Error in deleteCourse: ', error);
    throw error;
  } finally {
    if (!realm.isClosed) {
      realm.close();
    }
  }
}

export async function deleteProject(project: Project, realm : Realm) {
  try {
    console.log(
      'Attempting to delete project with ID:',
      project._id.toString(),
    );

    const projectToDelete = realm.objectForPrimaryKey('Project', project._id);

    if (!projectToDelete) {
      console.error('Project not found with ID:', project._id.toString());
      throw new Error('Project not found');
    }
    realm.write(() => {
      realm.delete(projectToDelete);
    });
  } catch (error) {
    console.error('Error in deleteProject:', error);
    throw error;
  }
}

export async function updateCourse(course: Course, newCourse: Course, realm : Realm) {
  // console.log('Updating old course:', course);
  // console.log('With new course:', newCourse);
  try {
    realm.write(() => {
      course.courseName = newCourse.courseName;
      course.courseCode = newCourse.courseCode;
      course.instructor = newCourse.instructor;
      course.color = newCourse.color;
      course.startDate = newCourse.startDate;
      course.endDate = newCourse.endDate;
      course.notes = newCourse.notes;
      course.projectIds = newCourse.projectIds;
    });
  } catch (error) {
    console.error('Error updating course: ', error);
  }
}

export async function updateProject(project: Project, newProject: Project, realm : Realm) {
  try {
    realm.write(() => {
      project.projectName = newProject.projectName;
      project.estimatedHrs = newProject.estimatedHrs;
      project.startDate = newProject.startDate;
      project.endDate = newProject.endDate;
      project.completed = newProject.completed;
      project.notes = newProject.notes;
      project.courseId = newProject.courseId;
    });
  } catch (error) {
    console.error('Error updating project: ', error);
  }
}

export async function clearRealm(realm : Realm) {
  try {
    realm.write(() => {
      realm.deleteAll();
    });
    console.log('Realm cleared');
  } catch (error) {
    console.error('Error clearing realm: ', error);
    throw error;
  }
}

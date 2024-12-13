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
  }
}

export async function getCourses() {
  const realm = await getRealm();
  try {
    return realm.objects('Course');
  } catch (error) {
    console.error('Error getting courses: ', error);
  }
  if (!realm.isClosed) {
    realm.close();
  }
}

export async function getProjects() {
  const realm = await getRealm();
  try {
    return realm.objects('Project');
  } catch (error) {
    console.error('Error getting projects: ', error);
  }
  if (!realm.isClosed) {
    realm.close();
  }
}

export async function createCourse(course: Course) {
  const realm = await getRealm();
  realm.write(() => {
    try {
      realm.create('Course', course);
    } catch (error) {
      console.error('Error creating course: ', error);
    }
  });
  if (!realm.isClosed) {
    realm.close();
  }
}

export async function createProject(project: Project) {
  const realm = await getRealm();
  realm.write(() => {
    try {
      realm.create('Project', project);
    } catch (error) {
      console.error('Error creating project: ', error);
    }
  });
  if (!realm.isClosed) {
    realm.close();
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

export async function deleteProject(project: Project) {
  const realm = await getRealm();
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
  } finally {
    if (!realm.isClosed) {
      realm.close();
    }
  }
}

export async function updateCourse(course: Course, newCourse: Course) {
  const realm = await getRealm();
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
  if (!realm.isClosed) {
    realm.close();
  }
}

export async function updateProject(project: Project, newProject: Project) {
  const realm = await getRealm();
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
  if (!realm.isClosed) {
    realm.close();
  }
}

export async function clearRealm() {
  const realm = await getRealm();
  realm.write(() => {
    try {
      realm.deleteAll();
    } catch (error) {
      console.error('Error clearing realm: ', error);
    }
  });
  if (!realm.isClosed) {
    realm.close();
  }
}

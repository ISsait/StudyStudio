import Realm from 'realm';
import { Course, Project } from '../../utility';

export async function getRealm() {
    return await Realm.open({
        schema: [Course.courseSchema, Project.projectSchema],
        schemaVersion: 1,
    });
}

export function getCourses(realm: Realm) {
    try {
        return realm.objects('Course');
    } catch (error) {
        console.error('Error getting courses: ', error);
    }
}

export function getProjects(realm: Realm) {
    try {
        return realm.objects('Project');
    } catch (error) {
        console.error('Error getting projects: ', error);
    }
}

export function createCourse(realm: Realm, course: Course) {
    realm.write(() => {
        try {
            realm.create('Course', course);
        } catch (error) {
            console.error('Error creating course: ', error);
        }
    });
}

export function createProject(realm: Realm, project: Project) {
    realm.write(() => {
        try {
            realm.create('Project', project);
        } catch (error) {
            console.error('Error creating project: ', error);
        }
    });
}

export function deleteCourse(realm: Realm, course: Course) {
    realm.write(() => {
        try {
            realm.delete(course);
        } catch (error) {
            console.error('Error deleting course: ', error);
        }
    });
}

export function deleteProject(realm: Realm, project: Project) {
    realm.write(() => {
        try {
            realm.delete(project);
        } catch (error) {
            console.error('Error deleting project: ', error);
        }
    });
}

export function updateCourse(realm: Realm, course: Course, newCourse: Course) {
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

export function updateProject(realm: Realm, project: Project, newProject: Project) {
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

export function closeRealm(realm: Realm) {
    if (!realm.isClosed) {
        realm.close();
    }
}

export function clearRealm(realm: Realm) {
    realm.write(() => {
        try {
            realm.deleteAll();
        } catch (error) {
            console.error('Error clearing realm: ', error);
        }
    });
}

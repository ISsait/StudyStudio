import Realm from 'realm';
import { Course, Project } from '../../utility';

export function getRealm() {
    return Realm.open({
        schema: [ Course.courseSchema, Project.projectSchema ],
        schemaVersion: 1,
    });
}

export function getCourses(realm: Realm) {
    return realm.objects('Course');
}

export function getProjects(realm: Realm) {
    return realm.objects('Project');
}

export function createCourse(realm: Realm, course: Course) {
    realm.write(() => {
        realm.create('Course', course);
    });
}

export function createProject(realm: Realm, project: Project) {
    realm.write(() => {
        realm.create('Project', project);
    });
}

export function deleteCourse(realm: Realm, course: Course) {
    realm.write(() => {
        realm.delete(course);
    });
}

export function deleteProject(realm: Realm, project: Project) {
    realm.write(() => {
        realm.delete(project);
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
        realm.deleteAll();
    });
}

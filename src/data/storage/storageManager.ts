import Realm from 'realm';
import { Program, Semester, Course, Project, Task } from '../../utility';

export function getRealm() {
    return Realm.open({
        schema: [Program.programSchema, Semester.semesterSchema, Course.courseSchema, Project.projectSchema, Task.taskSchema],
        schemaVersion: 1,
    });
}
export function getPrograms(realm: Realm) {
    return realm.objects('Program');
}

export function getSemesters(realm: Realm) {
    return realm.objects('Semester');
}

export function getCourses(realm: Realm) {
    return realm.objects('Course');
}

export function getProjects(realm: Realm) {
    return realm.objects('Project');
}

export function getTasks(realm: Realm) {
    return realm.objects('Task');
}

export function createProgram(realm: Realm, program: Program) {
    realm.write(() => {
        realm.create('Program', program);
    });
}

export function createSemester(realm: Realm, semester: Semester) {
    realm.write(() => {
        realm.create('Semester', semester);
    });
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

export function createTask(realm: Realm, task: Task) {
    realm.write(() => {
        realm.create('Task', task);
    });
}

export function deleteProgram(realm: Realm, program: Program) {
    realm.write(() => {
        realm.delete(program);
    });
}

export function deleteSemester(realm: Realm, semester: Semester) {
    realm.write(() => {
        realm.delete(semester);
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

export function deleteTask(realm: Realm, task: Task) {
    realm.write(() => {
        realm.delete(task);
    });
}

export function updateProgram(realm: Realm, program: Program, newProgram: Program) {
    try {
        realm.write(() => {
            program.schoolName = newProgram.schoolName;
            program.programName = newProgram.programName;
            program.programLength = newProgram.programLength;
            program.programDescription = newProgram.programDescription;
        });
    } catch (error) {
        console.error('Error updating program: ', error);
    }
}

export function updateSemester(realm: Realm, semester: Semester, newSemester: Semester) {
    try {
        realm.write(() => {
            semester.semesterName = newSemester.semesterName;
            semester.startDate = newSemester.startDate;
            semester.endDate = newSemester.endDate;
            semester.courseIds = newSemester.courseIds;
            semester.programId = newSemester.programId;
        });
    } catch (error) {
        console.error('Error updating semester: ', error);
    }
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
            course.semesterId = newCourse.semesterId;
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
            project.groupName = newProject.groupName;
            project.notes = newProject.notes;
            project.taskIds = newProject.taskIds;
            project.courseId = newProject.courseId;
        });
    } catch (error) {
        console.error('Error updating project: ', error);
    }
}

export function updateTask(realm: Realm, task: Task, newTask: Task) {
    try {
        realm.write(() => {
            task.taskName = newTask.taskName;
            task.estimatedHrs = newTask.estimatedHrs;
            task.startDate = newTask.startDate;
            task.endDate = newTask.endDate;
            task.completed = newTask.completed;
            task.notes = newTask.notes;
            task.projectId = newTask.projectId;
        });
    } catch (error) {
        console.error('Error updating task: ', error);
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

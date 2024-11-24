import {ObjectId} from 'bson';

// List of colors for courses
export enum CourseColors {
    pink='#FFD1DC',
    blue= '#AEC6CF',
    green= '#D5F5E3',
    yellow= '#FFFACD',
    purple= '#D6BDFD',
    peach= '#FFDAB9',
    mint= '#BDFCC9',
    lavender= '#E6E6FA',
}

/*
* Data structure definitions - used to define the structure of the data objects
* BaseEntity: Base object type definition
* ProgramType: Program object type definition
* SemesterType: Semester object type definition
* CourseType: Course object type definition
* ProjectType: Project object type definition
* TaskType: Task object type definition
*/

class BaseEntity {
    id: ObjectId;
    constructor() {
        this.id = new ObjectId();
    }
}

/*
* ProgramType: Program object type definition
*/
// Program type definition
export class Program extends BaseEntity {
    schoolName: string;
    programName: string;
    programLength: number;
    programDescription: string;
    constructor(schoolName: string, programName: string, programLength: number, programDescription: string) {
        super();
        this.schoolName = schoolName;
        this.programName = programName;
        this.programLength = programLength;
        this.programDescription = programDescription;
    }

    // Update program details
    updateProgram(schoolName: string, programName: string, programLength: number, programDescription: string) {
        this.schoolName = schoolName;
        this.programName = programName;
        this.programLength = programLength;
        this.programDescription = programDescription;
    }
}

// Default program object for initialization of program state
export const defaultProgram: Program = new Program('', '', 0, '');

/*
* SemesterType: Semester object type definition
*/
// Semester type definition
export class SemesterType extends BaseEntity {
    semesterName: string;
    startDate: string;
    endDate: string;
    courseIds: string[];
    programID: string;
    constructor(semesterName: string, startDate: string, endDate: string, courseIds: string[], programID: string) {
        super();
        this.semesterName = semesterName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.courseIds = courseIds;
        this.programID = programID;
    }

    // Add course to semester
    addCourse(courseID: string) {
        this.courseIds.push(courseID);
    }

    // Remove course from semester
    removeCourse(courseID: string) {
        this.courseIds = this.courseIds.filter(id => id !== courseID); // Non-mutating filter
    }

    // Assign semester to program
    assignProgram(programID: string) {
        this.programID = programID; // Assign program ID to semester
    }

    // Unassign semester from program
    unassignProgram() {
        this.programID = ''; // Unassign program ID from semester
    }

    // Update semester details
    updateSemester(semesterName: string, startDate: string, endDate: string) {
        this.semesterName = semesterName;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    // Get semester duration
    getDuration() {
        return this.startDate + ' - ' + this.endDate;
    }
}

// Default semester object for initialization of semester state
export const defaultSemester: SemesterType = new SemesterType('', '', '', [], '');

/*
* CourseType: Course object type definition
*/
// Course type definition
export class CourseType extends BaseEntity {
    courseName: string;
    courseCode: string;
    instructor: string;
    color: CourseColors;
    startDate: string;
    endDate: string;
    notes: string;
    projectIds: string[];
    semesterID: string;
    constructor(courseName: string, courseCode: string, instructor: string, color: CourseColors, startDate: string, endDate: string, notes: string, projectIds: string[], semesterID: string) {
        super();
        this.courseName = courseName;
        this.courseCode = courseCode;
        this.instructor = instructor;
        this.color = color;
        this.startDate = startDate;
        this.endDate = endDate;
        this.notes = notes;
        this.projectIds = projectIds;
        this.semesterID = semesterID;
    }

    // Add project to course
    addProject(projectID: string) {
        this.projectIds.push(projectID);
    }

    // Remove project from course
    removeProject(projectID: string) {
        this.projectIds = this.projectIds.filter(id => id !== projectID); // Non-mutating filter
    }

    // Assign course to semester
    assignSemester(semesterID: string) {
        this.semesterID = semesterID; // Assign semester ID to course
    }

    // Unassign course from semester
    unassignSemester() {
        this.semesterID = ''; // Unassign semester ID from course
    }

    // Update course details
    updateCourse(courseName: string, courseCode: string, instructor: string, color: CourseColors, startDate: string, endDate: string, notes: string) {
        this.courseName = courseName;
        this.courseCode = courseCode;
        this.instructor = instructor;
        this.color = color;
        this.startDate = startDate;
        this.endDate = endDate;
        this.notes = notes;
    }
}

// Default course object for initialization of course state
export const defaultCourse: CourseType = new CourseType('', '', '', CourseColors.pink, '', '', '', [], '');

/*
* ProjectType: Project object type definition
*/
// Project type definition
export class ProjectType extends BaseEntity {
    projectName: string;
    estimatedHrs: number;
    startDate: string;
    endDate: string;
    completed: boolean;
    groupName: boolean;
    notes: string;
    taskIds: string[];
    courseID: string;
    constructor(projectName: string, estimatedHrs: number, startDate: string, endDate: string, completed: boolean, groupName: boolean, notes: string, taskIds: string[], courseID: string) {
        super();
        this.projectName = projectName;
        this.estimatedHrs = estimatedHrs;
        this.startDate = startDate;
        this.endDate = endDate;
        this.completed = completed;
        this.groupName = groupName;
        this.notes = notes;
        this.taskIds = taskIds;
        this.courseID = courseID;
    }

    // Add task to project
    addTask(taskID: string) {
        this.taskIds.push(taskID);
    }

    // Remove task from project
    removeTask(taskID: string) {
        this.taskIds = this.taskIds.filter(id => id !== taskID); // Non-mutating filter
    }

    // Mark project as completed
    markCompleted() {
        this.completed = true;
    }

    // Mark project as incomplete
    markIncomplete() {
        this.completed = false;
    }

    // Assign project to course
    assignCourse(courseID: string) {
        this.courseID = courseID; // Assign course ID to project
    }

    // Unassign project from course
    unassignCourse() {
        this.courseID = ''; // Unassign course ID from project
    }

    // Update project details
    updateProject(projectName: string, estimatedHrs: number, startDate: string, endDate: string, groupName: boolean, notes: string) {
        this.projectName = projectName;
        this.estimatedHrs = estimatedHrs;
        this.startDate = startDate;
        this.endDate = endDate;
        this.groupName = groupName;
        this.notes = notes;
    }
}

// Default project object for initialization of project state
export const defaultProject: ProjectType = new ProjectType('', 0, '', '', false, false, '', [], '');

/*
* TaskType: Task object type definition
*/
// Task type definition
export class TaskType extends BaseEntity {
    taskName: string;
    estimatedHrs: number;
    endDate: string;
    completed: boolean;
    notes: string;
    projectID: string;
    constructor(taskName: string, estimatedHrs: number, endDate: string, completed: boolean, notes: string, projectID: string) {
        super();
        this.taskName = taskName;
        this.estimatedHrs = estimatedHrs;
        this.endDate = endDate;
        this.completed = completed;
        this.notes = notes;
        this.projectID = projectID;
    }

    // Mark task as completed
    markCompleted() {
        this.completed = true;
    }

    // Mark task as incomplete
    markIncomplete() {
        this.completed = false;
    }

    // Assign task to project
    assignProject(projectID: string) {
        this.projectID = projectID; // Assign project ID to task
    }

    // Unassign task from project
    unassignProject() {
        this.projectID = ''; // Unassign project ID from task
    }

    // Update task details
    updateTask(taskName: string, estimatedHrs: number, endDate: string, notes: string) {
        this.taskName = taskName;
        this.estimatedHrs = estimatedHrs;
        this.endDate = endDate;
        this.notes = notes;
    }
}

// Default task object for initialization of task state
export const defaultTask: TaskType = new TaskType('', 0, '', false, '', '');


/*
* TaskObject: Task object type definition
* will not use this -- delete later
*/
// // Task object type definition
// export type TaskObject = {
//     task: TaskType,
//     course: CourseType,
//     project: ProjectType,
//     semester: SemesterType,
//     program: ProgramType,
// };

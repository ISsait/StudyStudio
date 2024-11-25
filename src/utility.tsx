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
    constructor(id?: ObjectId) {
        if (id && !ObjectId.isValid(id)) {
            throw new Error('Invalid ID');
        }
        this.id = id ?? new ObjectId();
    }
}

/*
* ProgramType: Program object type definition
*/
// Program type definition
export class Program extends BaseEntity {
    schoolName: string = '';
    programName: string = '';
    programLength: number = 0;
    programDescription: string = '';
    constructor(schoolName: string, programName: string, programLength: number, programDescription: string, id?: ObjectId) {
        super(id);
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

    // REALM schema for Program object
    static programSchema = {
        name: 'Program',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            schoolName: 'string',
            programName: 'string',
            programLength: 'int',
            programDescription: 'string',
        },
    };
}

/*
* SemesterType: Semester object type definition
*/
// Semester type definition
export class Semester extends BaseEntity {
    semesterName: string = '';
    startDate: Date = new Date();
    endDate: Date = new Date();
    courseIds: ObjectId[] = [];
    programID: ObjectId | null = null;
    constructor(semesterName: string, startDate: Date, endDate: Date, courseIds: ObjectId[], programID?: ObjectId, id?: ObjectId) {
        super(id);
        this.semesterName = semesterName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.courseIds = courseIds ?? [];
        this.programID = programID ?? null;
    }

    // Add course to semester
    addCourse(courseID: ObjectId) {
        this.courseIds.push(courseID);
    }

    // Remove course from semester
    removeCourse(courseID: ObjectId) {
        this.courseIds = this.courseIds.filter(id => id !== courseID);
    }

    // Assign semester to program
    assignProgram(programID: ObjectId) {
        this.programID = programID; // Assign program ID to semester
    }

    // Unassign semester from program
    unassignProgram() {
        this.programID = null; // Unassign program ID from semester
    }

    // Update semester details
    updateSemester(semesterName: string, startDate: Date, endDate: Date) {
        this.semesterName = semesterName;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    // Get semester duration
    getDuration() {
        return this.startDate + ' - ' + this.endDate;
    }

    // REALM schema for Semester object
    static semesterSchema = {
        name: 'Semester',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            semesterName: 'string',
            startDate: 'date',
            endDate: 'date',
            courseIds: 'objectId[]',
            programID: 'objectId?',
        },
    };
}

/*
* CourseType: Course object type definition
*/
// Course type definition
export class Course extends BaseEntity {
    courseName: string = '';
    courseCode: string = '';
    instructor: string = '';
    color: CourseColors = CourseColors.pink;
    startDate: Date = new Date();
    endDate: Date = new Date();
    notes: string = '';
    projectIds: ObjectId[] = [];
    semesterID: ObjectId | null = null;
    constructor(courseName: string, courseCode: string, instructor: string, color: CourseColors, startDate: Date, endDate: Date, notes: string, projectIds?: ObjectId[], semesterID?: ObjectId, id?: ObjectId) {
        super(id);
        this.courseName = courseName;
        this.courseCode = courseCode;
        this.instructor = instructor;
        this.color = color;
        this.startDate = startDate;
        this.endDate = endDate;
        this.notes = notes;
        this.projectIds = projectIds ?? [];
        this.semesterID = semesterID ?? null;
    }

    // Add project to course
    addProject(projectID: ObjectId) {
        this.projectIds.push(projectID);
    }

    // Remove project from course
    removeProject(projectID: ObjectId) {
        this.projectIds = this.projectIds.filter(id => id !== projectID);
    }

    // Assign course to semester
    assignSemester(semesterID: ObjectId) {
        this.semesterID = semesterID; // Assign semester ID to course
    }

    // Unassign course from semester
    unassignSemester() {
        this.semesterID = null; // Unassign semester ID from course
    }

    // Update course details
    updateCourse(courseName: string, courseCode: string, instructor: string, color: CourseColors, startDate: Date, endDate: Date, notes: string) {
        this.courseName = courseName;
        this.courseCode = courseCode;
        this.instructor = instructor;
        this.color = color;
        this.startDate = startDate;
        this.endDate = endDate;
        this.notes = notes;
    }

    // REALM schema for Course object
    static courseSchema = {
        name: 'Course',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            courseName: 'string',
            courseCode: 'string',
            instructor: 'string',
            color: 'string',
            startDate: 'date',
            endDate: 'date',
            notes: 'string',
            projectIds: 'objectId[]',
            semesterID: 'objectId?',
        },
    };
}

/*
* ProjectType: Project object type definition
*/
// Project type definition
export class Project extends BaseEntity {
    projectName: string;
    estimatedHrs: number;
    startDate: Date;
    endDate: Date;
    completed: boolean;
    groupName: string;
    notes: string;
    taskIds: ObjectId[];
    courseID: ObjectId | null;
    constructor(projectName: string, estimatedHrs: number, startDate: Date, endDate: Date, completed: boolean, groupName: string, notes: string, taskIds?: ObjectId[], courseID?: ObjectId, id?: ObjectId) {
        super(id);
        this.projectName = projectName;
        this.estimatedHrs = estimatedHrs;
        this.startDate = startDate;
        this.endDate = endDate;
        this.completed = completed;
        this.groupName = groupName;
        this.notes = notes;
        this.taskIds = taskIds ?? [];
        this.courseID = courseID ?? null;
    }

    // Add task to project
    addTask(taskID: ObjectId) {
        this.taskIds.push(taskID);
    }

    // Remove task from project
    removeTask(taskID: ObjectId) {
        this.taskIds = this.taskIds.filter(id => id !== taskID);
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
    assignCourse(courseID: ObjectId) {
        this.courseID = courseID; // Assign course ID to project
    }

    // Unassign project from course
    unassignCourse() {
        this.courseID = null; // Unassign course ID from project
    }

    // Update project details
    updateProject(projectName: string, estimatedHrs: number, startDate: Date, endDate: Date, groupName: string, notes: string) {
        this.projectName = projectName;
        this.estimatedHrs = estimatedHrs;
        this.startDate = startDate;
        this.endDate = endDate;
        this.groupName = groupName;
        this.notes = notes;
    }

    // REALM schema for Project object
    static projectSchema = {
        name: 'Project',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            projectName: 'string',
            estimatedHrs: 'int',
            startDate: 'date',
            endDate: 'date',
            completed: 'bool',
            groupName: 'string',
            notes: 'string',
            taskIds: 'objectId[]',
            courseID: 'objectId?',
        },
    };
}

/*
* TaskType: Task object type definition
*/
// Task type definition
export class Task extends BaseEntity {
    taskName: string = '';
    estimatedHrs: number = 0;
    startDate: Date = new Date();
    endDate: Date = new Date();
    completed: boolean = false;
    notes: string = '';
    projectID: ObjectId | null = null;
    constructor(taskName: string, estimatedHrs: number, startDate: Date, endDate: Date, completed: boolean, notes: string, projectID?: ObjectId, id?: ObjectId) {
        super(id);
        this.taskName = taskName;
        this.estimatedHrs = estimatedHrs;
        this.startDate = startDate;
        this.endDate = endDate;
        this.completed = completed;
        this.notes = notes;
        this.projectID = projectID ?? null;
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
    assignProject(projectID: ObjectId) {
        this.projectID = projectID; // Assign project ID to task
    }

    // Unassign task from project
    unassignProject() {
        this.projectID = null; // Unassign project ID from task
    }

    // Update task details
    updateTask(taskName: string, estimatedHrs: number,startDate: Date, endDate: Date, notes: string) {
        this.taskName = taskName;
        this.estimatedHrs = estimatedHrs;
        this.startDate = startDate;
        this.endDate = endDate;
        this.notes = notes;
    }

    // REALM schema for Task object
    static taskSchema = {
        name: 'Task',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            taskName: 'string',
            estimatedHrs: 'int',
            startDate: 'date',
            endDate: 'date',
            completed: 'bool',
            notes: 'string',
            projectID: 'objectId?',
        },
    };
}

import Realm from 'realm';
// const { ObjectId } = Realm.BSON;


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
    _id: Realm.BSON.ObjectId;
    constructor(_id?: Realm.BSON.ObjectId) {
        if (_id && !Realm.BSON.ObjectId.isValid(_id)) {
            throw new Error('Invalid ID');
        }
        this._id = _id ?? new Realm.BSON.ObjectId();
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
    constructor(schoolName: string, programName: string, programLength: number, programDescription: string, _id?: Realm.BSON.ObjectId) {
        super(_id);
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
    courseIds: Realm.BSON.ObjectId[] | null = null;
    programId: Realm.BSON.ObjectId | null = null;
    constructor(semesterName: string, startDate: Date, endDate: Date, courseIds: Realm.BSON.ObjectId[], programId?: Realm.BSON.ObjectId, _id?: Realm.BSON.ObjectId) {
        super(_id);
        this.semesterName = semesterName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.courseIds = courseIds ?? [];
        this.programId = programId ?? null;
    }

    // Add course to semester
    addCourse(courseIds: Realm.BSON.ObjectId) {
        if (this.courseIds === null) {
            this.courseIds = [];
        }
        this.courseIds.push(courseIds);
    }

    // Remove course from semester
    removeCourse(courseIds: Realm.BSON.ObjectId) {
        if (this.courseIds === null) {
            return;
        }
        this.courseIds = this.courseIds.filter(id => id !== courseIds);
    }

    // Assign semester to program
    assignProgram(programId: Realm.BSON.ObjectId) {
        this.programId = programId; // Assign program ID to semester
    }

    // Unassign semester from program
    unassignProgram() {
        this.programId = null; // Unassign program ID from semester
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
            programId: 'objectId?',
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
    projectIds: Realm.BSON.ObjectId[] = [];
    semesterId: Realm.BSON.ObjectId | null = null;
    constructor(courseName: string, courseCode: string, instructor: string, color: CourseColors, startDate: Date, endDate: Date, notes: string, projectIds?: Realm.BSON.ObjectId[], semesterId?: Realm.BSON.ObjectId, _id?: Realm.BSON.ObjectId) {
        super(_id);
        this.courseName = courseName;
        this.courseCode = courseCode;
        this.instructor = instructor;
        this.color = color;
        this.startDate = startDate;
        this.endDate = endDate;
        this.notes = notes;
        this.projectIds = projectIds ?? [];
        this.semesterId = semesterId ?? null;
    }

    // Add project to course
    addProject(projectId: Realm.BSON.ObjectId) {
        this.projectIds.push(projectId);
    }

    // Remove project from course
    removeProject(projectId: Realm.BSON.ObjectId) {
        this.projectIds = this.projectIds.filter(id => id !== projectId);
    }

    // Assign course to semester
    assignSemester(semesterId: Realm.BSON.ObjectId) {
        this.semesterId = semesterId; // Assign semester ID to course
    }

    // Unassign course from semester
    unassignSemester() {
        this.semesterId = null; // Unassign semester ID from course
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
            semesterId: 'objectId?',
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
    taskIds: Realm.BSON.ObjectId[];
    courseId: Realm.BSON.ObjectId | null;
    constructor(projectName: string, estimatedHrs: number, startDate: Date, endDate: Date, completed: boolean, groupName: string, notes: string, taskIds?: Realm.BSON.ObjectId[], courseId?: Realm.BSON.ObjectId, _id?: Realm.BSON.ObjectId) {
        super(_id);
        this.projectName = projectName;
        this.estimatedHrs = estimatedHrs;
        this.startDate = startDate;
        this.endDate = endDate;
        this.completed = completed;
        this.groupName = groupName;
        this.notes = notes;
        this.taskIds = taskIds ?? [];
        this.courseId = courseId ?? null;
    }

    // Add task to project
    addTask(taskId: Realm.BSON.ObjectId) {
        this.taskIds.push(taskId);
    }

    // Remove task from project
    removeTask(taskId: Realm.BSON.ObjectId) {
        this.taskIds = this.taskIds.filter(id => id !== taskId);
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
    assignCourse(courseId: Realm.BSON.ObjectId) {
        this.courseId = courseId; // Assign course ID to project
    }

    // Unassign project from course
    unassignCourse() {
        this.courseId = null; // Unassign course ID from project
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
            courseId: 'objectId?',
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
    projectId: Realm.BSON.ObjectId | null = null;
    constructor(taskName: string, estimatedHrs: number, startDate: Date, endDate: Date, completed: boolean, notes: string, projectId?: Realm.BSON.ObjectId, _id?: Realm.BSON.ObjectId) {
        super(_id);
        this.taskName = taskName;
        this.estimatedHrs = estimatedHrs;
        this.startDate = startDate;
        this.endDate = endDate;
        this.completed = completed;
        this.notes = notes;
        this.projectId = projectId ?? null;
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
    assignProject(projectId: Realm.BSON.ObjectId) {
        this.projectId = projectId; // Assign project ID to task
    }

    // Unassign task from project
    unassignProject() {
        this.projectId = null; // Unassign project ID from task
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
            projectId: 'objectId?',
        },
    };
}

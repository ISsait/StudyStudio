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
* CourseType: Course object type definition
* ProjectType: Project object type definition
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
    constructor(courseName: string, courseCode: string, instructor: string, color: CourseColors, startDate: Date, endDate: Date, notes: string, projectIds?: Realm.BSON.ObjectId[], _id?: Realm.BSON.ObjectId) {
        super(_id);
        this.courseName = courseName;
        this.courseCode = courseCode;
        this.instructor = instructor;
        this.color = color;
        this.startDate = startDate;
        this.endDate = endDate;
        this.notes = notes;
        this.projectIds = projectIds ?? [];
    }

    // Add project to course
    addProject(projectId: Realm.BSON.ObjectId) {
        this.projectIds.push(projectId);
    }

    // Remove project from course
    removeProject(projectId: Realm.BSON.ObjectId) {
        this.projectIds = this.projectIds.filter(id => id !== projectId);
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
    notes: string;
    courseId: Realm.BSON.ObjectId | null;
    constructor(projectName: string, estimatedHrs: number, startDate: Date, endDate: Date, completed: boolean, notes: string, courseId?: Realm.BSON.ObjectId, _id?: Realm.BSON.ObjectId) {
        super(_id);
        this.projectName = projectName;
        this.estimatedHrs = estimatedHrs;
        this.startDate = startDate;
        this.endDate = endDate;
        this.completed = completed;
        this.notes = notes;
        this.courseId = courseId ?? null;
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
    updateProject(projectName: string, estimatedHrs: number, startDate: Date, endDate: Date, notes: string) {
        this.projectName = projectName;
        this.estimatedHrs = estimatedHrs;
        this.startDate = startDate;
        this.endDate = endDate;
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
            notes: 'string',
            courseId: 'objectId?',
        },
    };
}

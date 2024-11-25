import { ObjectId } from 'bson';
import { Program, Semester, Course, Project, Task, CourseColors } from '../utility';

// Purpose: To provide mock data for testing purposes.

export const mockPrograms = [
    {
        id: new ObjectId('67439c7a2e13f4ae80324f2e'),
        schoolName: 'Southern Alberta Institute of Technology',
        programName: 'Software Development',
        programLength: 4,
        programDescription: 'Full-time Software Development program',
    },
];

export const mockSemesters = [
    {
        id: new ObjectId('67439c7f2e13f4ae80324f2f'),
        semesterName: 'Fall 2024',
        startDate: '2024-09-05',
        endDate: '2024-16-31',
        courseIds: [],
        programId: new ObjectId('67439c7a2e13f4ae80324f2e'),
    },
    {
        id: new ObjectId('67439c832e13f4ae80324f30'),
        semesterName: 'Winter 2025',
        startDate: '2025-01-05',
        endDate: '2025-04-15',
        courseIds: [],
        programId: new ObjectId('67439c7a2e13f4ae80324f2e'),
    },
];

export const mockCourses = [
    {
        id: new ObjectId('67439d532e13f4ae80324f31'),
        courseName: 'Object Oriented Programming',
        courseCode: 'COMP-1234',
        instructor: 'John James',
        color: CourseColors.blue,
        startDate: '2024-09-05',
        endDate: '2024-12-15',
        notes: 'Introduction to Object Oriented Programming',
        projectIds: [],
        semesterId: new ObjectId('67439c7f2e13f4ae80324f2f'),
    },
    {
        id: new ObjectId('67439d542e13f4ae80324f32'),
        courseName: 'Database Management',
        courseCode: 'COMP-2345',
        instructor: 'Sally Smith',
        color: CourseColors.pink,
        startDate: '2024-09-05',
        endDate: '2024-12-15',
        notes: 'Introduction to Database Management',
        projectIds: [],
        semesterId: new ObjectId('67439c7f2e13f4ae80324f2f'),
    },
    {
        id: new ObjectId('67439d552e13f4ae80324f33'),
        courseName: 'Web Development',
        courseCode: 'COMP-3456',
        instructor: 'Mike Michaels',
        color: CourseColors.green,
        startDate: '2024-09-05',
        endDate: '2024-12-15',
        notes: 'Introduction to Web Development',
        projectIds: [],
        semesterId: new ObjectId('67439c7f2e13f4ae80324f2f'),
    },
];

export const mockProjects = [
    {
        id: new ObjectId('67439d562e13f4ae80324f34'),
        projectName: 'OOP Project 1',
        estimatedHrs: 10,
        startDate: '2024-11-05',
        endDate: '2024-11-15',
        completed: false,
        groupName: '',
        notes: 'OOP Project 1 notes',
        taskIds: [],
        courseId: new ObjectId('67439d532e13f4ae80324f31'),
    },
    {
        id: new ObjectId('67439d572e13f4ae80324f35'),
        projectName: 'OOP Project 2',
        estimatedHrs: 20,
        startDate: '2024-11-01',
        endDate: '2024-11-18',
        completed: false,
        groupName: '',
        notes: 'OOP Project 2 notes',
        taskIds: [],
        courseId: new ObjectId('67439d532e13f4ae80324f31'),
    },
    {
        id: new ObjectId('67439d582e13f4ae80324f36'),
        projectName: 'Database Project 1',
        estimatedHrs: 30,
        startDate: '2024-10-20',
        endDate: '2024-11-16',
        completed: false,
        groupName: '',
        notes: 'Database Project 3 notes',
        taskIds: [],
        courseId: new ObjectId('67439d542e13f4ae80324f32'),
    },
    {
        id: new ObjectId('67439d592e13f4ae80324f37'),
        projectName: 'WebDev Project 1',
        estimatedHrs: 6,
        startDate: '2024-11-08',
        endDate: '2024-11-15',
        completed: false,
        groupName: '',
        notes: 'WebDev Project 4 notes',
        taskIds: [],
        courseId: new ObjectId('67439d552e13f4ae80324f33'),
    },
];

export const mockTasks = [
    {
        id: new ObjectId('67439d5a2e13f4ae80324f38'),
        taskName: 'OOP Project 1 - Task 1',
        estimatedHrs: 5,
        startDate: '2024-11-05',
        endDate: '2024-11-10',
        completed: false,
        notes: 'OOP notes',
        projectId: new ObjectId('67439d562e13f4ae80324f34'),
    },
    {
        id: new ObjectId('67439d5b2e13f4ae80324f39'),
        taskName: 'OOP Project 1 - Task 2',
        estimatedHrs: 5,
        startDate: '2024-11-10',
        endDate: '2024-11-15',
        completed: false,
        notes: 'OOP Task 2 notes',
        projectId: new ObjectId('67439d562e13f4ae80324f34'),
    },
    {
        id: new ObjectId('67439d5c2e13f4ae80324f3a'),
        taskName: 'OOP Project 2 - Task 1',
        estimatedHrs: 5,
        startDate: '2024-11-01',
        endDate: '2024-11-05',
        completed: false,
        notes: 'OOP notes',
        projectId: new ObjectId('67439d572e13f4ae80324f35'),
    },
    {
        id: new ObjectId('67439d5d2e13f4ae80324f3b'),
        taskName: 'OOP Project 2 - Task 2',
        estimatedHrs: 5,
        startDate: '2024-11-05',
        endDate: '2024-11-10',
        completed: false,
        notes: 'OOP notes',
        projectId: new ObjectId('67439d572e13f4ae80324f35'),
    },
    {
        id: new ObjectId('67439d5e2e13f4ae80324f3c'),
        taskName: 'Database Project 1- Task 1',
        estimatedHrs: 10,
        startDate: '2024-10-20',
        endDate: '2024-10-30',
        completed: false,
        notes: 'Database notes',
        projectId: new ObjectId('67439d582e13f4ae80324f36'),
    },
    {
        id: new ObjectId('67439d5f2e13f4ae80324f3d'),
        taskName: 'Database Project 1 - Task 2',
        estimatedHrs: 20,
        startDate: '2024-10-30',
        endDate: '2024-11-10',
        completed: false,
        notes: 'Database notes',
        projectId: new ObjectId('67439d582e13f4ae80324f36'),
    },
    {
        id: new ObjectId('67439d602e13f4ae80324f3e'),
        taskName: 'WebDev Project 1 - Task 1',
        estimatedHrs: 3,
        startDate: '2024-11-08',
        endDate: '2024-11-10',
        completed: false,
        notes: 'WebDev notes',
        projectId: new ObjectId('67439d592e13f4ae80324f37'),
    },
    {
        id: new ObjectId('67439d612e13f4ae80324f3f'),
        taskName: 'WebDev Project 1 - Task 2',
        estimatedHrs: 3,
        startDate: '2024-11-10',
        endDate: '2024-11-12',
        completed: false,
        notes: 'WebDev notes',
        projectId: new ObjectId('67439d592e13f4ae80324f37'),
    },
];


// instantiate mock data into variables

function instantiatePrograms() {
    let programs: Program[] = [];
    mockPrograms.forEach((program) => {
        programs.push(new Program(program.schoolName, program.programName, program.programLength, program.programDescription, program.id));
    });
    return programs;
}

function instantiateSemesters() {
    let semesters: Semester[] = [];
    mockSemesters.forEach((semester) => {
        semesters.push(new Semester(semester.semesterName, semester.startDate, semester.endDate, semester.courseIds, semester.programId, semester.id));
    });
    return semesters;
}

function instantiateCourses() {
    let courses: Course[] = [];
    mockCourses.forEach((course) => {
        courses.push(new Course(course.courseName, course.courseCode, course.instructor, course.color, course.startDate, course.endDate, course.notes, course.projectIds, course.semesterId, course.id));
    });
    return courses;
}

function instantiateProjects() {
    let projects: Project[] = [];
    mockProjects.forEach((project) => {
        projects.push(new Project(project.projectName, project.estimatedHrs, project.startDate, project.endDate, project.completed, project.groupName, project.notes, project.taskIds, project.courseId, project.id));
    });
    return projects;
}

function instantiateTasks() {
    let tasks: Task[] = [];
    mockTasks.forEach((task) => {
        tasks.push(new Task(task.taskName, task.estimatedHrs, task.startDate, task.endDate, task.completed, task.notes, task.projectId, task.id));
    });
    return tasks;
}

export const mockData = {
    programs: instantiatePrograms(),
    semesters: instantiateSemesters(),
    courses: instantiateCourses(),
    projects: instantiateProjects(),
    tasks: instantiateTasks(),
};

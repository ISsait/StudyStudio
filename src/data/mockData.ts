import Realm from 'realm';
const {ObjectId} = Realm.BSON;

import {Course, Project, CourseColors} from '../utility';
import {
  createCourse,
  createProject,
} from '../data/storage/storageManager';

const mockCourses = [
  {
    id: new ObjectId('67439d532e13f4ae80324f31'),
    courseName: 'Object Oriented Programming',
    courseCode: 'COMP-1234',
    instructor: 'John James',
    color: CourseColors.blue,
    startDate: new Date('2024-12-05'),
    endDate: new Date('2025-04-15'),
    notes: 'Introduction to Object Oriented Programming',
    projectIds: [],
  },
  {
    id: new ObjectId('67439d542e13f4ae80324f32'),
    courseName: 'Database Management',
    courseCode: 'COMP-2345',
    instructor: 'Sally Smith',
    color: CourseColors.pink,
    startDate: new Date('2024-12-05'),
    endDate: new Date('2025-04-15'),
    notes: 'Introduction to Database Management',
    projectIds: [],
  },
  {
    id: new ObjectId('67439d552e13f4ae80324f33'),
    courseName: 'Web Development',
    courseCode: 'COMP-3456',
    instructor: 'Mike Michaels',
    color: CourseColors.green,
    startDate: new Date('2024-12-05'),
    endDate: new Date('2025-04-15'),
    notes: 'Introduction to Web Development',
    projectIds: [],
  },
];

const mockProjects = [
  {
    id: new ObjectId('67439d562e13f4ae80324f34'),
    projectName: 'OOP Project 1',
    estimatedHrs: 10,
    startDate: new Date('2024-12-05'),
    endDate: new Date('2024-12-28'),
    completed: false,
    notes: 'OOP Project 1 notes',
    courseId: new ObjectId('67439d532e13f4ae80324f31'),
  },
  {
    id: new ObjectId('67439d572e13f4ae80324f35'),
    projectName: 'OOP Project 2',
    estimatedHrs: 20,
    startDate: new Date('2024-12-09'),
    endDate: new Date('2024-12-27'),
    completed: false,
    notes: 'OOP Project 2 notes',
    courseId: new ObjectId('67439d532e13f4ae80324f31'),
  },
  {
    id: new ObjectId('67439d582e13f4ae80324f36'),
    projectName: 'Database Project 1',
    estimatedHrs: 30,
    startDate: new Date('2024-12-14'),
    endDate: new Date('2024-12-28'),
    completed: false,
    notes: 'Database Project 1 notes',
    courseId: new ObjectId('67439d542e13f4ae80324f32'),
  },
  {
    id: new ObjectId('67439d592e13f4ae80324f37'),
    projectName: 'WebDev Project 1',
    estimatedHrs: 6,
    startDate: new Date('2024-12-08'),
    endDate: new Date('2024-12-30'),
    completed: false,
    notes: 'WebDev Project 1 notes',
    courseId: new ObjectId('67439d552e13f4ae80324f33'),
  },
];

// instantiate mock data into variables

function instantiateCourses() {
  let courses: Course[] = [];
  mockCourses.forEach(course => {
    courses.push(
      new Course(
        course.courseName,
        course.courseCode,
        course.instructor,
        course.color,
        course.startDate,
        course.endDate,
        course.notes,
        course.projectIds,
        course.id,
      ),
    );
  });
  return courses;
}

function instantiateProjects() {
  let projects: Project[] = [];
  mockProjects.forEach(project => {
    projects.push(
      new Project(
        project.projectName,
        project.estimatedHrs,
        project.startDate,
        project.endDate,
        project.completed,
        project.notes,
        project.courseId,
        project.id,
      ),
    );
  });
  return projects;
}

const mockData = {
  courses: instantiateCourses(),
  projects: instantiateProjects(),
};

// write mock data to realm
export async function writeMockDataToRealm(realm : Realm) {
  if (
    realm.objects('Course').length > 0 ||
    realm.objects('Project').length > 0
  ) {
    console.log('Data already exists in Realm');
    return;
  }
  mockData.courses.forEach(course =>{
    createCourse(course, realm);
  });
  mockData.projects.forEach(project => {
    createProject(project, realm);
  });
  console.log('Mock data written to Realm');
}


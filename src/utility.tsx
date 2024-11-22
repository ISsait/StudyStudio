// List of colors for courses
export const courseColors =
    {
        pink:'#FFD1DC',
        blue: '#AEC6CF',
        green: '#D5F5E3',
        yellow: '#FFFACD',
        purple: '#D6BDFD',
        peach: '#FFDAB9',
        mint: '#BDFCC9',
        lavender: '#E6E6FA',
    };

// Program type definition
export type ProgramType = {
    id: number,
    schoolName: string,
    programName: string,
    programLength: number,
    programDescription: string,
};

// Semester type definition
export type SemesterType = {
    id: number,
    semesterName: string,
    startDate: string,
    endDate: string,
    courses: CourseType[],
};

// Course type definition
export type CourseType = {
    id: number,
    courseName: string,
    courseCode: string,
    instructor: string,
    color: string,
    semester: string,
    startDate: string,
    endDate: string,
    notes: string,
    projects: ProjectType[],
};

// Project type definition
export type ProjectType = {
    id: number,
    projectName: string,
    estimatedHrs: number,
    startDate: string,
    dueDate: string,
    completed: boolean,
    groupName: boolean,
    notes: string,
    tasks: TaskType[],
};

// Task type definition
export type TaskType = {
    id: number,
    taskName: string,
    estimatedHrs: number,
    dueDate: string,
    completed: boolean,
    notes: string,
};

// Task object type definition
export type TaskObject = {
    task: TaskType,
    course: CourseType,
    project: ProjectType,
    semester: SemesterType,
    program: ProgramType,
};

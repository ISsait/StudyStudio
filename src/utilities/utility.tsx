export interface classes {
    classID : string,
    className: string,
    classCode: string,
    classDescription: string,
    startDate: string,
    endDate: string,
    instructor: string,
    classTimes: string,
    complete: string,
}

export const defaultClassEntry : classes = {
    classID : "",
    className : "",
    classCode : "",
    classDescription : "",
    startDate: "",
    endDate : "",
    instructor : "",
    classTimes: "",
    complete: "no",
}

export const TEST_DATA_CLASSES : Array<classes> = [
    {
        classID: "1",
        className: "Object Oriented Programming 3",
        classCode: "cprg 308",
        classDescription: "Programming using an object oriented structure",
        startDate: "07/26/2024",
        endDate: "12/16/2024",
        instructor: "Joe Bob",
        //the format for class times are day, length in hours, A/P for morning or evening, and the hour it starts
        classTimes: "tue2A8:00|fri3A8:00",
        complete: "no",
    },
    {
        classID: "2",
        className: "Web Dev 2",
        classCode: "cprg 309",
        classDescription: "Creating websites using react",
        startDate: "07/26/2024",
        endDate: "12/16/2024",
        instructor: "Joe Bob",
        classTimes: "mon3P2:00|thu2P3:00",
        complete: "no",
    },
    {
        classID: "3",
        className: "Mobile Development",
        classCode: "crpg 303",
        classDescription: "Creating mobile apps using react native",
        startDate: "07/26/2024",
        endDate: "12/16/2024",
        instructor: "Bob Joe",
        classTimes: "wed2A11:00",
        complete: "no",
    }
]

export interface projects {
    classID: string,
    className: string,
    projectID: string,
    projectName: string,
    estHours: number,
    startDate: string,
    endDate: string,
    groupName: string,
    projectDescription: string,
    complete: string,
}

export const defaultProjectEntry : projects = {
    classID: "",
    className: "",
    projectID: "",
    projectName: "",
    estHours: 0,
    startDate: "",
    endDate: "",
    groupName: "",
    projectDescription: "",
    complete: "no",
}

export const TEST_DATA_PROJECTS : Array<projects> = [
    {
        classID: "1",
        className: "Object Oriented Programming 3",
        projectID: "1",
        projectName: "OOP final",
        estHours: 20,
        startDate: "10/27/2024",
        endDate: "12/16/2024",
        groupName: "The Coders",
        projectDescription: "Final project for OOP class.",
        complete: "no",
    },
    {
        classID: "2",
        className: "Web Dev 2",
        projectID: "2",
        projectName: "Web Dev final",
        estHours: 25,
        startDate: "10/18/2024",
        endDate: "12/16/2024",
        groupName: "Developers",
        projectDescription: "Final project for web dev class.",
        complete: "no",
    },
    {
        classID: "3",
        className: "Mobile Development",
        projectID: "3",
        projectName: "Mobile Dev final",
        estHours: 20,
        startDate: "11/12/2024",
        endDate: "12/16/2024",
        groupName: "Monster Mobile",
        projectDescription: "Creating a final mobile app for our last project.",
        complete: "no",
    }
]

export interface tasks {
    classID: string,
    className: string,
    projectID: string,
    projectName: string,
    taskID: string,
    taskName: string,
    estHours: number,
    dueDate: string,
    taskDescription: string,
    complete: string,
}

export const defaultTaskEntry : tasks = {
    classID: "",
    className: "",
    projectID: "",
    projectName: "",
    taskID: "",
    taskName: "",
    estHours: 0,
    dueDate: "",
    taskDescription: "",
    complete: "no",
}

export const TEST_DATA_TASKS : Array<tasks> = [
    {
        classID: "1",
        className: "Object Oriented Programming 3",
        projectID: "1",
        projectName: "OOP final",
        taskID: "1",
        taskName: "Implementing DLL",
        estHours: 2,
        dueDate: "11/29/2024",
        taskDescription: "Implementing a doubly linked list for my group",
        complete: "no",
    },
    {
        classID: "2",
        className: "Web Dev 2",
        projectID: "2",
        projectName: "Web Dev Final",
        taskID: "2",
        taskName: "Creating landing page",
        estHours: 4,
        dueDate: "12/2/2024",
        taskDescription: "Creating the landing page for our website",
        complete: "no",
    },
    {
        classID: "3",
        className: "Mobile Dev",
        projectID: "3",
        projectName: "Mobile Dev final",
        taskID: "3",
        taskName: "Creating screens",
        estHours: 6,
        dueDate: "12/4/2024",
        taskDescription: "Creating the screens for our mobile app",
        complete: "no",
    }
]
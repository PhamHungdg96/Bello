import { ISection, ITask, IProject } from "../Interfaces/Bello";


const dummyTasks: ITask[] = [
  {
    id: 1,
    title: "Task 1",
    status: "In Progress",
    statusArray: "In Progress",
    dueDate: "2023-06-15",
    subTasks: [],
    content: "",
    fileAttack: "file-1.txt",
    // createdAt: new Date("2023-06-11T08:00:00Z"),
    // updatedAt: new Date("2023-06-11T14:30:00Z"),
    createdBy: "User A",
  },
  {
    id: 2,
    title: "Task 2",
    status: "Completed",
    statusArray:  "Completed",
    dueDate: "2023-06-16",
    subTasks: [],
    content: "",
    fileAttack: "file-2.docx",
    // createdAt: new Date("2023-06-12T09:15:00Z"),
    // updatedAt: new Date("2023-06-12T13:45:00Z"),
    createdBy: "User B",
  },
  {
    id: 3,
    title: "Task 3",
    status: "In Progress",
    statusArray: "In Progress",
    dueDate: "2023-06-17",
    subTasks: [],
    content: "",
    fileAttack: "file-3.pdf",
    // createdAt: new Date("2023-06-13T11:30:00Z"),
    // updatedAt: new Date("2023-06-13T16:15:00Z"),
    createdBy: "User C",
  },
  // Add more dummy tasks as needed
];

export const ApiMockResponse:ISection[] = [
  {
    id: 1,
    name: "Section 1",
    createdBy: "User A",
    tasks: [dummyTasks[0], dummyTasks[1]],
    // createdAt: new Date("2023-06-10T12:00:00Z"),
    // updatedAt: new Date("2023-06-10T14:30:00Z"),
  },
  {
    id: 2,
    name: "Section 2",
    createdBy: "User B",
    tasks: [dummyTasks[2]],
    // createdAt: new Date("2023-06-11T09:30:00Z"),
    // updatedAt: new Date("2023-06-11T11:45:00Z"),
  },
  // Add more dummy sections as needed
];

const dummyProjects: IProject[] = [
  {
    id: 1,
    name: "Project 1",
    createdBy: "User A",
    sectionId: 1,
    // createdAt: new Date("2023-06-10T12:00:00Z"),
    // updatedAt: new Date("2023-06-10T14:30:00Z"),
  },
  {
    id: 2,
    name: "Project 2",
    createdBy: "User B",
    sectionId: 2,
    // createdAt: new Date("2023-06-11T09:30:00Z"),
    // updatedAt: new Date("2023-06-11T11:45:00Z"),
  },
  // Add more dummy projects as needed
];
  
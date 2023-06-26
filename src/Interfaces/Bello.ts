export interface ISubTask {
  id: number;
  completed: boolean;
  text: string;
}
export interface IProject {
  id: number;
  name: string;
  createdBy: string;
  sectionId: number;
  // createdAt: Date;
  // updatedAt: Date;
}
export interface ITask {
  id: number;
  title: string;
  status: string;
  statusArray: string;
  subTasks: ISubTask[];
  dueDate: string;
  content: string;
  fileAttack: string;
  createdBy: string;
  // createdAt: Date;
  // updatedAt: Date;

}
export interface ISection {
  id: number;
  name: string;
  createdBy: string;
  tasks: ITask[];
  // createdAt: Date;
  // updatedAt: Date;
}

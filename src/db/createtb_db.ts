import { InferAttributes, InferCreationAttributes, Model, DataTypes, ForeignKey } from "sequelize"
import sequelize, {prefix_db} from "./db";

export class UserDB extends Model<InferAttributes<UserDB>, InferCreationAttributes<UserDB>>{
  id: string;
  username: string;
  password: string;
  name: string;
  phonenumber: string;
  status: boolean;
  role: string;
}
UserDB.init({
  id:{
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  username: { 
    type: DataTypes.STRING, 
    unique: true,
    allowNull: false
  },
  password: {
    type:DataTypes.STRING,
    allowNull: false
  },
  status:{
    type:DataTypes.BOOLEAN,
    defaultValue: false
  },
  role:{
    type:DataTypes.STRING,
    defaultValue: "NONE"
  },
  name: {
    type:DataTypes.STRING,
    allowNull: true
  },
  phonenumber: {
    type:DataTypes.STRING,
    allowNull: true
  }
}, {
    sequelize,
    modelName: `${prefix_db}_users`
});


export class TaskDB extends Model<InferAttributes<TaskDB>, InferCreationAttributes<TaskDB>>{
    id: string;
    title: string;
    createdBy: ForeignKey<string>;
    status: string;
    statusArray: string;
    dueDate:string;
    content:Buffer
    fileAttack:string
  }
TaskDB.init({
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  title: { 
    type: DataTypes.TEXT,
    allowNull: false
  },
  status:{
    type:DataTypes.STRING,
    allowNull: true
  },
  statusArray:{
    type:DataTypes.TEXT,
    allowNull: true
  },
  dueDate: {
    type:DataTypes.STRING,
    allowNull: true
  },
  content: {
    type:DataTypes.BLOB("long"),
    allowNull: true
  },
  fileAttack:{
    type:DataTypes.TEXT,
    allowNull: true
  }
}, {
    sequelize,
    modelName: `${prefix_db}_tasks`
});

export class TaskADB extends Model<InferAttributes<TaskDB>, InferCreationAttributes<TaskDB>>{
  id: string;
  title: string;
  createdBy: ForeignKey<string>;
  status: string;
  statusArray: string;
  dueDate:string;
  content:Buffer
  fileAttack:string
}
TaskDB.init({
id:{
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement:true
},
title: { 
  type: DataTypes.TEXT,
  allowNull: false
},
status:{
  type:DataTypes.STRING,
  allowNull: true
},
statusArray:{
  type:DataTypes.TEXT,
  allowNull: true
},
dueDate: {
  type:DataTypes.STRING,
  allowNull: true
},
content: {
  type:DataTypes.BLOB("long"),
  allowNull: true
},
fileAttack:{
  type:DataTypes.TEXT,
  allowNull: true
}
}, {
  sequelize,
  modelName: `${prefix_db}_tasks`
});

  //relation
  TaskDB.belongsTo(UserDB,{foreignKey:"createdBy"})
export default {UserDB, TaskDB}
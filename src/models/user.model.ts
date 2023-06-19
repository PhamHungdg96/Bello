import { Sequelize, DataTypes, Op, Model, InferAttributes, InferCreationAttributes } from "sequelize";
import {
    connectDB as connectSequlz,
    close as closeSequlz
} from './index';
import dotenv from 'dotenv'

dotenv.config()
const prefix_db = process.env.DB_PREFIX || "bello"

let sequelize:any;

export interface User{
  id:string
  username:string
  password:string
  name:string
  phonenumber:string
  status:boolean
  role:string
}

export class UserDB extends Model<InferAttributes<UserDB>, InferCreationAttributes<UserDB>> implements User{
  id: string;
  username: string;
  password: string;
  name: string;
  phonenumber: string;
  status: boolean;
  role: string;
}
export async function connectDB(){
  if (sequelize) return sequelize;
  sequelize = await connectSequlz();
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
      modelName: `${prefix_db}_Users`
  });
  await UserDB.sync();
  return sequelize
}
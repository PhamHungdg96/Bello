import { InferAttributes, InferCreationAttributes, Model, DataTypes } from "sequelize"
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

export default UserDB

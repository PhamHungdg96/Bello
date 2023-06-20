import UserDB from "./createtb_db"

const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => {
  // UserDB.sync({ alter: isDev })
}
export default dbInit 
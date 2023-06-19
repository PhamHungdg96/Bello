import {Router, Request, Response, NextFunction} from 'express'
import { body } from 'express-validator'
import {AuthMidleware} from '../middlewares/auth.middleware'
import { UserController } from '../controllers/user.controller'

const router = Router()

router.get("",
  AuthMidleware.verifyJWT,
  AuthMidleware.permission(["ADMIN"]),
  UserController.getAllUser
)

router.get("/:id",
  AuthMidleware.verifyJWT,
  AuthMidleware.permission(["ADMIN", "USER"]),
  UserController.getUser
)

router.post("/:id",
  AuthMidleware.verifyJWT,
  AuthMidleware.permission(["USER"]),
  UserController.updateInfoUser
)

router.post("/change/:id",
  AuthMidleware.verifyJWT,
  AuthMidleware.permission(["ADMIN"]),
  UserController.updateRoleAndStatusUser
)


export const UserRoute={router}
import {Router, Request, Response, NextFunction} from 'express'
import { body } from 'express-validator'
import {AuthMidleware} from '../middlewares/auth.middleware'
import { AuthController } from '../controllers/auth.controller'
import { UserController } from '../controllers/user.controller'

const router = Router()

router.post(
  '/signup',
  body('username').isLength({ min: 8 }).withMessage(
    'username must be at least 8 characters'
  ),
  body('password').isLength({ min: 8 }).withMessage(
    'password must be at least 8 characters'
  ),
  body('confirmPassword').isLength({ min: 8 }).withMessage(
    'confirmPassword must be at least 8 characters'
  ),
  AuthMidleware.validate,
  AuthController.register
)

router.post(
  '/login',
  body('username').isLength({ min: 8 }).withMessage(
    'username must be at least 8 characters'
  ),
  body('password').isLength({ min: 8 }).withMessage(
    'password must be at least 8 characters'
  ),
  AuthMidleware.validate,
  AuthController.login,
  AuthMidleware.generateJWT
)

export const AuthRoute={router}
import { Router } from 'express'
import * as userController from './user.controller'

export const userRouter = new Router()


userRouter.route('/employees')
  .get(userController.getEmployees)
  .post(userController.postEmployee)


userRouter.route('/employees/:employeeId')
  .get(userController.getEmployee)
  .put(userController.putEmployee)
  .delete(userController.deleteEmployee)

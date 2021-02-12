import * as userRepository from './user.repository'
import {respondSuccess} from "../../helpers/response";
import {User} from "./user.model";

export const getEmployees = async (req, res) => {

  const ownerId = req.user.id
  const page = req.query.page
  const perPage = req.query.perPage
  const employees = await userRepository.getEmployees(ownerId, page, perPage)

  return respondSuccess(res, employees, 200)
}

export const postEmployee = async (req, res) => {

  const user = await userRepository.createEmployee({ ...req.body, owner: false, ownerId: req.user.id })

  return respondSuccess(res, user, 201)
}

export const getEmployee = async (req, res) => {

  const employeeId = req.params.employeeId
  const employees = await userRepository.getEmployee(employeeId)

  return respondSuccess(res, employees, 200)
}

export const putEmployee = async (req, res) => {

  const employees = await userRepository.updateEmployees(req.body)

  return respondSuccess(res, employees, 200)
}

export const deleteEmployee = async (req, res) => {

  const employeeId = req.params.employeeId
  const result = await userRepository.deleteEmployee(employeeId)

  return respondSuccess(res, null, 200)
}

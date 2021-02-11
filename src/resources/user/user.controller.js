import * as userRepository from './user.repository'
import {respondSuccess} from "../../helpers/response";

export const getEmployees = async (req, res) => {

  const ownerId = req.user.id;
  const employees = await userRepository.getEmployees(ownerId)
  return respondSuccess(res, employees, 200)
}

export const postEmployee = async (req, res) => {

  const user = await userRepository.createEmployee({ ...req.body, owner: false })
  return respondSuccess(res, user, 201)
}

export const getEmployee = async (req, res) => {

  const employeeId = req.params.employeeId
  const employees = await userRepository.getEmployee(employeeId)
  return respondSuccess(res, employees, 200)
}

export const putEmployee = async (req, res) => {

}

export const deleteEmployee = async (req, res) => {

}

import { User } from './user.model'
import * as userRepository from './user.repository'
import {respondSuccess} from "../../helpers/response";

export const getEmployees = async (req, res) => {

  const ownerId = req.user.id;
  const employees = await userRepository.getEmployees(ownerId)
  return respondSuccess(res, employees, 200)
}

export const postEmployee = async (req, res) => {

}

export const getEmployee = async (req, res) => {

}

export const putEmployee = async (req, res) => {

}

export const deleteEmployee = async (req, res) => {

}

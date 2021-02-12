import {User} from "./user.model";
import mongoose from "mongoose";


export const getEmployees = async (ownerId, page, perPage) => {

  let skip = (page - 1) * perPage;
  return await User.paginate({ ownerId: mongoose.mongo.ObjectId(ownerId)}, { offset: skip, limit: +perPage}).then(employees => {
    return employees
  })
}

export const getEmployee = async (employeeId) => {

  return await User.findById(employeeId).then(employee => {
    return employee
  })
}

export const createEmployee = async (user) => {

  return await User.create(user).then(user => {
    return user
  })
}

export const updateEmployees = async (employee) => {

  return await User.findByIdAndUpdate(employee._id, employee).then(employee => {
    return employee
  })
}

export const deleteEmployee = async (employeeId) => {

  return await User.findByIdAndRemove(employeeId).then(() => {
    return
  })
}

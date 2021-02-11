import {User} from "./user.model";


export const getEmployees = async (ownerId) => {

  return await User.find().where('ownerId', ownerId).then(employees => {
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

export const updateEmployees = async () => {

}

export const deleteEmployee = async (employeeId) => {

  return await User.findByIdAndRemove(employeeId).then(() => {
    return
  })
}

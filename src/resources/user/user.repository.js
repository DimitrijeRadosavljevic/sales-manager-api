import {User} from "./user.model";


export const getEmployees = async (ownerId) => {

  return await User.find().then(employees => {
    return employees
  })
}

export const getEmployee = async (employeeId) => {

  console.log(employeeId)
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

export const deleteEmployee = async () => {

}

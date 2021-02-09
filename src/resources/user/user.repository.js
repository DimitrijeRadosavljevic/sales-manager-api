import {User} from "./user.model";


export const getEmployees = async (ownerId) => {

  return await User.find().then(employees => {
    console.log(employees)
    return employees
  })
}

export const getEmployee = async (employeeId) => {

  return await User.findById(employeeId).then(employee => {
    console.log(employee)
    return employee
  })
}

export const createEmployee = async () => {

}

export const updateEmployees = async () => {

}

export const deleteEmployee = async () => {

}

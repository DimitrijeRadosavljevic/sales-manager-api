import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String
    },
    middleName: {
      type: String
    },
    lastName: {
      type: String
    },
    employeeNumber: {

    },
    role: {
      type: String,
      required: true,
      enum: ['junior', 'medior', 'senior', 'head-seller']
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    promotions: [
      {
        date: {
          type: Date,
          required: true
        },
        role: {
          type: String,
          required: true,
          enum: ['junior', 'medior', 'senior', 'head-seller']
        },
        note: String
      }
    ],
    startedWorking: {

    },
    vacations: {

    },
    contacts: {

    },
    addresses: {

    },
    owner: {
      type: Boolean,
      required: true
    }

  },
  { timestamps: true }
)


export const User = mongoose.model('user', userSchema)

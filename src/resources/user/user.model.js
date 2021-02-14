import mongoose from 'mongoose'
const mongoosePaginate = require('mongoose-paginate');


const userSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user'
    },
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
      type: String,
      required: false
    },
    role: {
      type: String,
      required: false,
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
        newRole: {
          type: String,
          required: true,
          enum: ['junior', 'medior', 'senior', 'head-seller']
        },
        note: String
      }
    ],
    startedWorking: {
      type: Date
    },
    vacations: [
      {
        from: {
          type: Date,
          required: true
        },
        to: {
          type: Date,
          required: true
        },
        note: {
          type: String,
          required: false
        }
      }
    ],
    contacts: [
      {
        type: {
          type: String,
          required: true,
          enum: ['number', 'email']
        },
        value: {
          type: String,
          required: true
        }
      }
    ],
    addresses: [
      {
        street: String,
        city: String,
        country: String,
        postalCode: String,
      }
    ],
    owner: {
      type: Boolean,
      required: true
    }

  },
  { timestamps: true }
)


userSchema.plugin(mongoosePaginate)
export const User = mongoose.model('user', userSchema)

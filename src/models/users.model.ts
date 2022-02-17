import { model, Schema, Document } from 'mongoose';
import validator from 'validator';
import { User } from '@interfaces/users.interface';

const userSchema = new Schema<User>({
  
  name: {
    type: String,
    required: true,
    trim: true,
    default: ''
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    default: '',
    lowercase: true,
    validate(value) {
      if (value && !validator.isEmail(value)) {
        throw new Error('Invalid email');
      }
    }
  },

  password: {
    type: String,
    required: true,
  },

  otp: {
    type: String,
    trim: true,
    default: ''
  },

  isEmailVerified: {
    type: Boolean,
    enum: [true, false],
    default: false
  },

  isActive: {
    type: Boolean,
    enum: [true, false],
    default: true
  },
  
}, {
  timestamps: true
});

const userModel = model<User>('User', userSchema);

export default userModel;

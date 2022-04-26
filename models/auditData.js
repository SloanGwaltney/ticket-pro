import {Schema} from 'mongoose'

export const auditDataSchema = new Schema({
  createdByName: {
	type: String,
	required: true	
  },
  createdBy: {
	type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Number,
    required: true,
  },
  lastUpdatedByName: {
	type: String,
	required: true
  },
  lastUpdatedAt: {
    type: Number,
    required: true,
  },
  lastUpdatedBy: {
	type: Schema.Types.ObjectId,
    ref: 'User'
  }
});
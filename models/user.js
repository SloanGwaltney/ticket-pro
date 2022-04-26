import {Schema, model} from 'mongoose'
import {hash} from 'bcryptjs'
import mongoose from "mongoose";

const userSchema = new Schema({
	username: {
		type: String,
		min: 3,
		max: 32,
		required: true,
		unique: true
	},
	email: {
		type: String,
		max: 256,
		required: true,
		unique: true	
	},
	password: {
		type: String,
		min: 12,
		max: 64,
		required: true
	}
})

userSchema.pre('save', async function() {
	if (this.isNew) {
		this.password = await hash(this.password, 10);
	}
})
export const User = mongoose.models.User || model('User', userSchema)
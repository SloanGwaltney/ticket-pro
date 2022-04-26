import { auditDataSchema } from "./auditData";
import {Schema, model} from 'mongoose'

const organizationSchema = new Schema({
	orgName: {
		type: String,
		min: 3,
		max: 64,
		required: true
	},
	auditData: {
		type: auditDataSchema,
		required: true
	}
})

export const Organization = mongoose.models.Organization || model('Organization', organizationSchema)


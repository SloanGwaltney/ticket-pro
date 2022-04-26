export function createServiceErrorBody() {
	return {_isError: true, error: {message: 'A unexpected error has occurred please try your request again in a few minutes.'}}
}
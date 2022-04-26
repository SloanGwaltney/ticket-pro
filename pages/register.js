import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {createAsyncResult} from '../lib/flowControl'
import { useState } from 'react'
import { useRouter } from 'next/router'

const registerSchema = yup.object({
	username: yup.string().min(3).max(32).required(),
	email: yup.string().email().required(),
	password: yup.string().min(12).max(64).required()
}).required()

export default function Register(props) {
	const { register, handleSubmit, setError, formState: { errors }} = useForm({resolver: yupResolver(registerSchema), initialValues: {username: '', email: '', password: ''}});
	const [topError, setTopError] = useState()
	const router = useRouter()
	async function onSubmit(data) {
		const [res, err] = await createAsyncResult(fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/users/register`, {body: JSON.stringify(data), headers: new Headers({'Content-Type': 'application/json'})}));
		if (err) return setTopError('An unexpected error has occurred. Please try again in a few minutes and make sure you are still connected to the internet')
		if (res.code === 201) return router.push('/registered')
		if (res.code === 500) return setTopError('An unexpected error has occurred. Please try again in a few minutes')
		if (res.code === 409) return setTopError('username or email already in use')
		const [body, parseErr] = await createAsyncResult(res.json())
		if (parseErr) return setTopError('An unexpected error has occurred. Please try again in a few minutes');
		if (res.code === 422) return body.error.validationErrors.forEach((err) => {setError(err.path, {message: err.message})})
		return setTopError('An unexpected error has occurred. Please try again in a few minutes');
	}

	return (
    <div>
      <div className="alert alert-danger" role="alert">
        {topError}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Username:</label>
          <input className="form-control" {...register("username")}></input>
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input className="form-control" {...register("email")}></input>
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input className="form-control" {...register("password")}></input>
        </div>
        <button type="submit" className="btb btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
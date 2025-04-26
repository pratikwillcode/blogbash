import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input } from '../components' // update your imports if needed
import authService from '../appwrite/auth'
import { NavLink, useNavigate } from 'react-router-dom'

function ForgotPassword() {
  const { register, handleSubmit } = useForm()
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    setMessage('')
    setError('')
    if (!data.email) {
      setError('Email is required')
      return
    }

    try {
      setLoading(true)
      await authService.createRecovery(data.email, `${window.location.origin}/reset-password`)
      setMessage('Password reset link sent to your email.')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full h-screen flex justify-center items-center bg-gray-100 dark:bg-[#24272B]'>
      <div className='bg-white dark:bg-black p-8 rounded shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Forgot Password</h2>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
          <Input
            label="Email Address"
            placeholder="Enter your email"
            type="email"
            {...register('email', { required: true })}
          />

          {error && <p className="text-red-500">{error}</p>}
          {message && <p className="text-green-500">{message}</p>}

          <div className='flex items-center justify-center'>
            <Button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </div>

          <div className="text-center mt-4">
            <NavLink to="/login" className="text-blue-500 hover:underline">
              Back to Login
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword

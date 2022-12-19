import { useState } from 'react'

export function Auth() {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userCheckPassword, setUserCheckPassword] = useState('')

  const handleClick = () => {}
  return (
    <div className='flex w-5/6 border rounded-md justify-center items-center m-auto h-full'>
      <div className=' flex-auto'>
        <form className='flex flex-col gap-3 mx-5 w-96'>
          <legend className=' text-4xl font-bold'>Sign Up</legend>

          <label htmlFor='userEmail'>Email</label>
          <input
            type='text'
            id='userEmail'
            className=' border w-72 p-2 rounded-md text-md'
          />

          <label htmlFor='userPasswor'>Password</label>
          <input
            type='password'
            id='userPassword'
            className=' border w-72 p-2 rounded-md text-md'
          />

          <label htmlFor='userCheckPassword'>Retype password</label>
          <input
            type='password'
            id='userCheckPassword'
            className=' border w-72 p-2 rounded-md text-md'
          />

          <button
            type='button'
            className='border w-fit p-3 rounded-md hover:border-slate-300'
          >
            Sign Up
          </button>
        </form>
      </div>
      <div className=' flex-auto'>
        <img src='/vite.svg' alt='groupomania logo' className='' />
      </div>
    </div>
  )
}

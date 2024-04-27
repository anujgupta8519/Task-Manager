import React from 'react'
import { loginWithPasswordService } from '../../service/User.service'

function UserLoginWithPassword() {

 const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')
  const [success, setSuccess] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    loginWithPasswordService({email, password}).then((res) => {

        setError('')
        if (res) {
            setSuccess(res.email)
        }
      
    })
    .catch((err) => {
        setSuccess('')
        setError(err)
    })
    
  }
  return (
    
    <div class="bg-gray-100 flex justify-center items-center h-screen">
       
    <div class="w-1/2 h-screen hidden lg:block">
      <img src="https://img.freepik.com/free-photo/medium-shot-man-holding-post-it_23-2149362900.jpg?t=st=1713411943~exp=1713415543~hmac=419ae8378caf58d7c3733b6530884ac3d1fcfd48840f94e4378582f098bbcf3d&w=996" alt="Placeholder Image" class="object-cover w-full h-full"/>
    </div>
 
    <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      <h1 class="text-2xl font-semibold mb-4 text-center">Employee Login</h1>
      <form onSubmit={handleSubmit}>
        
        <div class="mb-4">
          <label for="Email" class="block text-gray-600">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off"/>
        </div>
      
        <div class="mb-4">
          <label for="password" class="block text-gray-600">Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off"/>
        </div>
       
 
       
        <button onClick={handleSubmit} type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
      </form>
  
      <div class="mt-6 text-blue-500 text-center">
        <a href="#" class="hover:underline">Login with OTP</a>
        {error && <p class="text-red-500">{error}</p>}
        {success && <p class="text-green-500">{success}</p>}
      </div>
    </div>
    </div>
  )
}

export default UserLoginWithPassword
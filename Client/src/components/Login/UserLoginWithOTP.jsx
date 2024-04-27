import React from 'react'
import { generateOTPService, loginWithOTPService } from '../../service/User.service'
import { useNavigate } from 'react-router-dom'

function UserLoginWithOTP() {

  const [email, setEmail] = React.useState('')
  const [isOTPSent, setIsOTPSent] = React.useState(false)
  const [otp, setOtp] = React.useState('')
  const [error, setError] = React.useState('')
  const [success, setSuccess] = React.useState('')
  const navigate = useNavigate();

  const sendOTP = (e) => {
    e.preventDefault();
    
    generateOTPService({email}).then((res) => {
      setSuccess(res.message)
        setIsOTPSent(true)

    }).catch((err) => {
      setSuccess('')

        setError(err)

    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('')

    loginWithOTPService({email, otp}).then((res) => {
      navigate('/showtask')
     
     
        

    })
    .catch((err) => {
        setSuccess('')

        setError(err)

    })
    .finally(() => {
        setOtp('')
        setEmail('')
        setIsOTPSent(false)
    })

  }






  
  return (
    <div class="bg-gray-100 flex justify-center items-center h-screen">
       
    <div class="w-1/2 h-screen hidden lg:block">
      <img src="https://img.freepik.com/free-photo/medium-shot-man-holding-post-it_23-2149362900.jpg?t=st=1713411943~exp=1713415543~hmac=419ae8378caf58d7c3733b6530884ac3d1fcfd48840f94e4378582f098bbcf3d&w=996" alt="Placeholder Image" class="object-cover w-full h-full"/>
    </div>
 
    <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      <h1 class="text-2xl font-semibold mb-4 text-center">Employee Login</h1>
    
        
        <div class="mb-4">
          <label for="Email" class="block text-gray-600">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email " id="Email" name="Email" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off"/>
        </div>
      
        <div class="mb-4" >
          <label for="otp" class="block text-gray-600">OTP</label>
          <input disabled={!isOTPSent}  value={otp} onChange={(e) => setOtp(e.target.value)} type="text" id="otp" name="otp" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="off"/>
        </div>

        <div class="flex justify-between items-center w-full px-5 ">
        <button disabled={isOTPSent} onClick={sendOTP} type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-5/12">Send OTP</button>
       
 
       
       <button disabled={!isOTPSent}  onClick={handleSubmit} type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-5/12">Login</button>
  
 
        </div>

       
      <div class="mt-6 text-blue-500 text-center">
        <a href="#" class="hover:underline">Login with Password</a>
        {error && <p class="text-red-500">{error}</p>}
        {success && <p class="text-green-500">{success}</p>}
      </div>
    </div>
    </div>
  )
}

export default UserLoginWithOTP
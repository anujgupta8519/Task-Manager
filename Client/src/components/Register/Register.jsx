import React from 'react'
import { registerUser } from '../../service/Admin.service'

function Register() {

    const [name, setName] = React.useState('')
    const [role, setRole] = React.useState('')
    const [email, setEmail] = React.useState('')
   const [mobileNumber, setMobileNumber] = React.useState('')
    const [error, setError] = React.useState('')
    const [success, setSuccess] = React.useState('')


    const handleSubmit = (e) => {
        e.preventDefault();

        registerUser({name, role, email, mobileNumber}).then((res) => {
            setError('')
            if (res) {
                setSuccess(res.email)
            }

        }).catch((err) => {
            setSuccess('')

            setError(err)
        })
    }


  return (

        <div className='w-full h-full  flex flex-wrap justify-center items-center'>
                <form onSubmit={handleSubmit}>

                <div class="mb-6 w-96">
    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John"  required />
        </div>  

        <div className='mb-6'>
        <label htmlFor="Role" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name="Role" id="Role">
               <option selected >---Select Role---</option>
                <option value="Developer">Developer</option>
                <option value="Manager">Manager</option>


        </select>

    </div>
    <div class="mb-6">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
    </div> 

    <div class="mb-6 w-96">
    <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
            <input  value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} type="tel" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="6666666666" pattern="[6-9]{3}[0-9]{2}[0-9]{3}" required />
        </div>  
 


    <button onClick={handleSubmit} type="submit" class=" w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    {error && <p className='text-red-500'>{error}</p>}
{success && <p className='text-green-500'>{success}</p>}
</form>

        </div>
    


  )
}

export default Register
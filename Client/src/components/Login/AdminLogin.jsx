import React from 'react'
import { loginServiceofAdmin } from '../../service/Admin.service';


function AdminLogin() {

	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [error, setError] = React.useState('');

	const [success, setSuccess] = React.useState('');


	const handleSubmit = (e) => {
		e.preventDefault();
		if (!username && username.trim()==='') {
			setError('Username is required');
			return;
		}
		if (!password && password.trim()==='') {
			setError('Password is required');
			return;
		}

		loginServiceofAdmin({username, password}).then((res) => {
			setError('')
			if (res) {
				setSuccess(res.UserType)
			}}
		
	).catch((err) => {
		setSuccess('')

		setError(err)
		})



	
		
	}


  return (
    
<div class="min-h-screen flex items-center justify-center w-full dark:bg-gray-950 ">
	<div class="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 w-1/3 h-1/3">
		<h1 class="text-2xl font-bold text-center mb-4 dark:text-gray-200">Welcome Admin</h1>
		<form onSubmit={handleSubmit}>
			<div class="mb-4">
				<label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
				<input type="email" onChange={(e) => setUsername(e.target.value)} id="email" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" required/>
			</div>
			<div class="mb-4">
				<label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
				<input type="password" onChange={(e) => setPassword(e.target.value)} id="password" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" required/>

			</div>
			<div class="flex items-center justify-between mb-4">


			</div>
			<button onClick={handleSubmit}  type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
		</form>

		{error && <p className="text-red-500 mt-4">{error}</p>}
		{success && <p className="text-green-500 mt-4">{success}</p>}
	</div>
</div>
  )
}

export default AdminLogin
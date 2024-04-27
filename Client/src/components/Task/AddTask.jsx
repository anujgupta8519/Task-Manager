import React, { useEffect } from 'react'
import { getAllDevelopersService } from '../../service/User.service'
import { createTaskService } from '../../service/Task.service'

function AddTask() {

  const [developers, setDevelopers] = React.useState([])

  const [title , setTitle] = React.useState("")
  const [description , setDescription] = React.useState("")
  const [assignedTo, setAssignedTo] = React.useState("")
  const [priority, setPriority] = React.useState("")
  const [error, setError] = React.useState("")
  const [success, setSuccess] = React.useState("")


  const handleSubmit = (e) => {
    e.preventDefault();
    createTaskService({title, description, priority, assignedTo}).then((res) => {

      setSuccess(res.data.message)
      console.log(res);
    }).then((err) => {

      setError(err.message)
    })
   
  }


  useEffect(() => {

    getAllDevelopersService().then((res) => {
      setDevelopers(res)
    }).catch((err) => {
      console.log(err);

    })

  }, [])
  return (
    <div className='w-full h-full  flex flex-wrap justify-center items-center'>
    <form onSubmit={handleSubmit}>

    <div className='mb-6'>
<label htmlFor="AssignTo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Assign To</label>
<select onChange={(e) => setAssignedTo(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name="AssignTo" id="AssignTo">
   <option selected >---Select Assignee---</option>
   {
    developers?.map(dev => <option value={dev._id}>{`${dev.email}`}</option>)
   }
   


</select>

</div>

    <div class="mb-6 w-96">
<label for="Title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
<input onChange={(e) => setTitle(e.target.value)}  type="text" id="Title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Title"  required />
</div>  


<div class="mb-6">
<label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
<textarea onChange={(e) => setDescription(e.target.value)} name="description" id=" description" cols="50" rows="10" required className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'/>

</div> 

<div class="mb-6 w-96">
<label for="Priority" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Priority</label>
<select onChange={(e) => setPriority(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name="Priority" id=" Priority">
  <option selected >--Select Priority--</option>
  <option value="High">High</option>
  <option value="Medium">Medium</option>
  <option value="Low">Low</option>
  
</select>


</div> 



<button onClick={handleSubmit}  type="submit" class=" w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
{success && <p>{success}</p>}
{error && <p>{error}</p>}
</form>


</div>


  )
}

export default AddTask
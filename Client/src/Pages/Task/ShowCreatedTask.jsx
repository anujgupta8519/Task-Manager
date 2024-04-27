import React, { useEffect } from 'react'
import ShowTask from '../../components/Task/ShowTask'
import { getcreatedTaskService } from '../../service/User.service'

function ShowCreatedTask() {
    const [tasks, setTasks] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    useEffect(() => {
        getcreatedTaskService().then((res) => {
            setIsLoading(false)
            setTasks(res)
        }).catch((err) => {
            console.log(err);
        })

        
    }, [])

    return(

    isLoading ? <h1 className='text-center text-3xl'>Loading...</h1> :   
        <div className='flex flex-col gap-4 w-full  items-center p-5'>
            {tasks?.map((task) => (
                <ShowTask task={task} key={task._id} />
            ))}
           
        </div>
    )
      

}

export default ShowCreatedTask
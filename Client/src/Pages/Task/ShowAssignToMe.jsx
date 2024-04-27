import React from 'react'
import { getAssigntomeTaskService } from '../../service/User.service'
import ShowTask from '../../components/Task/ShowTask'

function ShowAssignToMe() {
    const [tasks, setTasks] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [error, setError] = React.useState("")

    React.useEffect(() => {
        getAssigntomeTaskService().then((res) => {
            setIsLoading(false)
            setTasks(res)
        }).catch((err) => {
            setError(err)
           
        })

        
    }, [])

    return(

    isLoading ? error ? <h1 className='text-center text-3xl'>{error}</h1> : <h1 className='text-center text-3xl'>Loading...</h1> :
        <div className='flex flex-col gap-4 w-full  items-center p-5'>
            {tasks?.map((task) => (
                <ShowTask task={task} key={task._id} />
            ))}
           
        </div>
    )
      

}
export default ShowAssignToMe
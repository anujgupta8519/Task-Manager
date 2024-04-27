import React from 'react'
import {Link} from 'react-router-dom'

function ShowTask(data) {
  console.log(data.task);
  const task = data.task
  return (

      <article className=" w-6/12 rounded-xl border-2 border-gray-100 bg-white">
  <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
    <Link to={`/userprofile/${task?._id}`} className="block shrink-0">
      <img
        alt=""
        src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
        className="size-14 rounded-lg object-cover"
      />
    </Link>

    <div>
      <h3 className="font-medium sm:text-lg">
        <a href="#" className="hover:underline"> {task.title}</a>
      </h3>

      <p className="line-clamp-2 text-sm text-gray-700">
       {task.description}
      </p>

      <div className="mt-2 sm:flex sm:items-center sm:gap-2">
        <div className="flex items-center gap-1 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
            />
          </svg>

          <p className="text-xs">{task.comments.length}</p>
        </div>

        <span className="hidden sm:block" aria-hidden="true">&middot;</span>

    


      </div>
    </div>
  </div>

  <div className="flex justify-end">
    <strong
      className={`-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl  px-3 py-1.5 text-white ${task.completed ? 'bg-green-500' : 'bg-red-500'}`}
    >

      {
        task.completed ? (
          <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
        ) :
        (
          <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"   
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
        )
        
      }

   


      <span className="text-[10px] font-medium sm:text-xs">{task.priority}</span>
    </strong>
  </div>
</article>


  )
}

export default ShowTask
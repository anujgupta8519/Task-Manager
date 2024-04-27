import { useState } from 'react'

import './App.css'
import Layout from './Layout'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import UserProfile from './components/Profile/UserProfile'
import UserLoginWithOTP from './components/Login/UserLoginWithOTP'
import ShowTask from './components/Task/ShowTask'
import ShowCreatedTask from './Pages/Task/ShowCreatedTask'



function App() {

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Layout/>,
        children: [
          {
            path: "/",
            element: <UserLoginWithOTP/>
          },
          {
            path: "/showtask",
            element: <ShowCreatedTask/>
          },
          {
            path: "/userprofile/:id",
            element: <UserProfile/>
          },
         
        ]
      }
   
    ]

  )

 

  return (
    <RouterProvider router={router}/>
    

  )
}

export default App

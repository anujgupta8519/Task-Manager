import React from 'react'
import { useParams } from 'react-router-dom'

function UserProfile() {

  const { id } = useParams()
  return (
    <div>UserProfile { id }</div>
  )
}

export default UserProfile
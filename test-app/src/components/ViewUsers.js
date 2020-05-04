import React from 'react'
import UserCard from './UserCard'

const ViewUsers = ({users}) => {
   
    return(
    <>
    <h1>View Existing Users</h1>
    {users.map(user => <UserCard  user = {user}/>)}
    </>
        )
}   

export default ViewUsers
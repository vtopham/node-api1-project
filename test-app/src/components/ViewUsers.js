import React from 'react'
import UserCard from './UserCard'

const ViewUsers = ({users, setUsers}) => {
   
    return(
    <>
    <h1>View Existing Users</h1>
    {users.map(user => <UserCard  key = {user.id} user = {user} users = {users} setUsers = {setUsers}/>)}
    </>
        )
}   

export default ViewUsers
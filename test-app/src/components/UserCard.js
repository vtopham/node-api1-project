import React from 'react'
import axios from 'axios'

const UserCard = ({ user, setUsers, users }) => {

    const handleDelete = event => {
        event.preventDefault();
        axios.delete(`http://localhost:8000/api/users/${user.id}`)
        .then(res => {
            console.log(res)
            const newArray = users.filter(item => {
                return item.id.toString() != user.id.toString()
            })
            setUsers(newArray)
            }
        )
        .catch(err => {
            console.log(err)
        })
        

    }
    return(
    <>
    <h3>{user.name}</h3>
    <p>{user.bio}</p>
    <button onClick = {handleDelete}>Delete User</button>
    </>
        )
}   

export default UserCard
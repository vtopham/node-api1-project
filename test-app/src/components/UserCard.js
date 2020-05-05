import React, { useState } from 'react'
import axios from 'axios'

const UserCard = ({ user, setUsers, users }) => {

    const [isEditing, setIsEditing] = useState(false)

    const [formInput, setFormInput] = useState({
        name: user.name,
        bio: user.bio
    })

    const handleInput = event => {
        event.preventDefault();
        setFormInput({
            ...formInput,
            [event.target.name]: event.target.value
        })
    }

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

    const handleEdit = event => {
        event.preventDefault()
        if(isEditing) {
            axios.put(`http://localhost:8000/api/users/${user.id}`,formInput)
            .then(res => {
                console.log(res)
                const newArray = users.map(item => {
                    if (item.id.toString() === user.id.toString()) {
                        return res.data.newUser
                    } else {
                        return item
                    }
                })
                
                setUsers(newArray)
            })
            .catch(err => console.log(err))
        }
        //if we were not editing, this will expose the editing textboxes
        setIsEditing(!isEditing)

        //if we are done editing, we'll submit the changes through a put request
        
       

        
        
    }

    return(
    <>
    {!isEditing ? 
        <> 
            <h3>{user.name}</h3>
            <p>{user.bio}</p>
        </> : 
        <>
            <div>
                <label htmlFor = "name" id = "name">Name: </label>
                <input type = "text" name = "name" onChange = {handleInput} value = {formInput.name}/>
            </div>

            <div>
                <label htmlFor = "bio" id = "bio" >Bio: </label>
                <input type = "text" name = "bio" onChange = {handleInput} value = {formInput.bio}/>
            </div>
        </>
    }
    
    <button onClick = {handleDelete}>Delete User</button>
    <button onClick = {handleEdit}>{isEditing ? "Submit Edit" : "Edit" }</button>
    </>
        )
}   

export default UserCard
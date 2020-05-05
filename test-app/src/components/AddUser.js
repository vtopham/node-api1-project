import React, { useState } from 'react'
import axios from 'axios'

const AddUser = ({users, setUsers}) => {

    const [formInput, setFormInput] = useState({
        name: "",
        bio: ""
    })

    const handleInput = event => {
        event.preventDefault();
        setFormInput({
            ...formInput,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = event => {
        event.preventDefault();

        axios.post(`http://localhost:8000/api/users`,formInput)
            .then(res => {
                console.log(res)
                setUsers(res.data)
            })
            .catch(err => console.log(err))
    }

    return(
    <>
        <h1>Add A User</h1>
        <form onSubmit = {handleSubmit}>
            <div>
                <label htmlFor = "name" id = "name">Name: </label>
                <input type = "text" name = "name" onChange = {handleInput} value = {formInput.name}/>
            </div>

            <div>
                <label htmlFor = "bio" id = "bio" >Bio: </label>
                <input type = "text" name = "bio" onChange = {handleInput} value = {formInput.bio}/>
            </div>
            <div>
                <button>Submit</button>
            </div>

        </form>
    </>
        )
}   

export default AddUser

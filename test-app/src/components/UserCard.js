import React from 'react'

const UserCard = ({ user }) => {

    return(
    <>
    <h3>{user.name}</h3>
    <p>{user.bio}</p>
    </>
        )
}   

export default UserCard
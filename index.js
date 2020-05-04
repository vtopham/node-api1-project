const express = require('express')

const server = express();

server.use(express.json())
const users = [
    {
        id: 1,
        name: "Victoria",
        bio: "My name is victoria"
    }
]



server.get('/', (req, res) => {
    res.send("It worked!")
});

//When a user wants to add a user
server.post('/api/users', (req, res) => {
    
    //if the info is invalid or there is no body, respond with an error message
    if (!req.body || !req.body.name || !req.body.id) {
        res.status(400).json({errorMessage: "Please provide name and bio for the user"})
    } else { 
    //if the information is valid
    users.push({
        id: req.body.id,
        name: req.body.name,
        bio: req.body.bio
    })
    .then(res.status(201).json(users))
    //if there is an error saving, send an error message. Tyler, is this right?
    .catch(res.status(500).json({errorMessage: "There was an error while saving the user to the database"}))

        
    } //end else

})


server.listen(8000, _ => console.log("listening on 8000"))
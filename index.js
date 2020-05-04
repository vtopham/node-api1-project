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

//when a user wants a list of all users
server.get('/api/users',(req, res) => {
    if(!users) {
        //if users doesn't exist, give them an error
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    }
    //if successful then send it on over
    res.status(200).json(users)
})

//when a user wants a specific user by id
server.get('/api/users/:id', (req, res) => {
    
    users.forEach(user => {
        //if it matches, send the response
        if (user.id == req.params.id) {
            res.status(200).json({user})
            .catch(res.status(500).json({ errorMessage: "The user information could not be retrieved." }))
        }
    })

    //if no matches, return no id found
    res.status(404).json({ message: "The user with the specified ID does not exist." })
})


server.listen(8000, _ => console.log("listening on 8000"))
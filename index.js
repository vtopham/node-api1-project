const express = require('express')
const cors = require('cors')
const server = express();

server.use(express.json())
server.use(cors())

let users = [
    {
        id: 1,
        name: "Victoria",
        bio: "My name is victoria"
    }
]

let idCounter = 1;


server.get('/', (req, res) => {
    res.send("It worked!")
});

//When a user wants to add a user
server.post('/api/users', (req, res) => {
    
    //if the info is invalid or there is no body, respond with an error message
    if (!req.body || !req.body.name || !req.body.bio) {
        res.status(400).json({errorMessage: "Please provide name and bio for the user"})
    } else { 
        idCounter++;
    //if the information is valid
        users.push({
            id: idCounter,
            name: req.body.name,
            bio: req.body.bio
        })
        .then(res.status(201).json(users))
    //if there is an error saving, send an error message. Tyler, is this right?
    .catch( _ => {res.status(500).json({errorMessage: "There was an error while saving the user to the database"})})

        
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
            .catch( _ => {
                res.status(500).json({ errorMessage: "The user information could not be retrieved." })
            })
        }
    })

    //if no matches, return no id found
    res.status(404).json({ message: "The user with the specified ID does not exist." })
})

//when a user wants to delete a user by id
server.delete('/api/users/:id', (req, res) => {

    //TODO: add the 500 error if the user couldn't be removed
    const newArray = users.filter(user => {
        return user.id.toString() != req.params.id.toString()
    })

    if (newArray.length === users.length) {
        //if nothing was deleted
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } 
    users = newArray;
    res.status(200).json({message: "User successfully deleted"})
    .catch(_ => {
        res.status(500).json({ errorMessage: "The user could not be removed" })
    })
})

//when a user wants to edit a user by id
server.put('/api/users/:id', (req, res) => {
    if (!req.body || !req.body.name || !req.body.bio) {
        res.status(400).json({errorMessage: "Please provide the new information for the user"})
    } else { 
        let exists = false;
        let newUser = {}
        //if the user matches, return the new data. otherwise, return the original user
        const newArray = users.map(user => {
            if (user.id == req.params.id) {
                exists = true;
                newUser = {
                    id: req.params.id,
                    name: req.body.name,
                    bio: req.body.bio
                }
                console.log(newUser)
                return newUser
            } else {
                return user
            }
        })

        if(exists) {
            //set users to be the new array returned by the map function
            users = newArray;
            res.status(200).json({newUser})
            .catch( _ => {
                res.status(500).json({errorMessage: "The user information could not be modified."})
            })
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    }

})


server.listen(8000, _ => console.log("listening on 8000"))
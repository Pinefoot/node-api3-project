const express = require('express');
const Users = require('./userDb');
const Posts = require('../posts/postDb')
const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!

  
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
 // console.log('Post it, ', req.user.name)
  
  Posts.insert(req.body)
  .then(post =>{
    res.status(201).json(post)
  }).catch(err =>{
    res.status(500).json({
      message: 'Something is broken'
    })
  })
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get(req.query)
  .then(user =>{
    res.status(200).json(user);
  }).catch(err =>{
    res.status(500).json({
      message: 'Error retreiving the users'
    })
  })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!\
  
  Users.getById(req.params.id)
  .then(user =>{
    if(user){
      res.status(200).json(user);
    }else{
      res.status(404).json({
        message: 'User not found'
      })
    }
  }).catch(err => {res.status(500).json({
    message: 'Error getting the user'
  })
})
});



router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id
  Users.getById(id)
  .then(user =>{
    if(user){
      Users.getUserPosts(id)
      .then(success =>{
        res.status(200).json(success)
      })
    }
  })
});

router.delete('/:id', (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
  .then(kill =>{
    if(kill > 0){
      res.status(200).json({message: 'user deletion completed'})
    }else{
      res.status(404).json({message: 'The user could not be found'})
    }
  })
});

router.put('/:id', (req, res) => {
  // do your magic!
  const id = req.params.id;
  const userData = req.body;
  Users.getById(id)
  .then(user =>{
    Users.update(id, {
      name: userData.name,
    }).then((updated) =>{
      Users.getById(id).then((user)=> res.status(200).json(user))
    })
  })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  let userId = req.params.id
  Users.getById(userId)
  .then(user =>{
    if(user){
      req.user = user
      
      next();
    }else{
      res.status(400).json({message: 'invalid user id'})
    }
  }
   
  ).catch(err =>{
    res.status(500).json({error: 'There was a problem finding the user ID'})
  })
  
  
  }
  


function validateUser(req, res, next) {
  // do your magic!

}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;

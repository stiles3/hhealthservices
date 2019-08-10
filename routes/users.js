const express = require('express')
const router = express.Router()
const User = require('../models/user')

// all users
router.get('/', async (req, res) => {
    User.find({}, function(err, users){
        if(err){
            res.send("Something went wrong")
        }
        res.json(users)
    })
  /*   let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
      searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
      const users = await User.find(searchOptions)
      res.render('users/index', {
        users: users,
        searchOptions: req.query
      })
    } catch {
      res.redirect('/')
    } */
   
  })

/* // new user
router.get('/new', (req, res) =>{
    res.render('users/new', {user: new User()})
}) */

// create user
router.post('/create', async(req, res) =>{
    const user = new User({
        name:req.body.name,
        residential_address:req.body.residential_address,
        date_of_birth:req.body.date_of_birth,
        occupation:req.body.occupation,
        marital_status:req.body.marital_status,
        phone_number:req.body.phone_number,
        gender:req.body.gender,
        email:req.body.email,
        cash_check:req.body.cash_check,
        income_monthly:req.body.income_monthly,
    })

    try {
        const newUser = await user.save()
         res.redirect(`/`)
    } catch  {
      /*   res.render('users/new' ,{
            user:user,
            errorMessage:"Error creating User"
        }) */
    }
})
// get user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)   
        res.render('/', {
            user: user,
           
          })
    } catch {
        res.redirect('/') 
    }
   
    res.send(`Show User ${req.params.id}`)
})

// edit user
router.get('/:id/edit', async(req, res) => {
    try {
        const user =await User.findById(req.params.id)
       // res.render('users/edit', {user: user})
    } catch {
      //  res.redirect('/users')
    }
   
})
// update user
router.put('/:id', async (req, res) => {
    let user 
    try {
        user = await User.findById(req.params.id)
        user.name = req.body.name
        await user.save()
        //res.redirect(`/users/${user.id}`)
    } catch  {
        if(user === null) {
           // res.redirect('/')
        }else{
            res.render('users/edit' ,{
                user:user,
                errorMessage:"Error updating User"
            })
        }
        
    }
})

router.delete('/:id', async (req, res) => {
    let user 
    try {
        user = await User.findById(req.params.id)
        await user.remove()
       // res.redirect('/users')
    } catch{
        if(user == null){
            res.redirect('/')
        } else {
          //  res.redirect(`/users/${users.id}`) 
        }
    }
    res.send(`Delete User ${req.params.id}`)
})

module.exports = router
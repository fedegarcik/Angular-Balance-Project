import { Router } from "express";
import User from "../schemas/users.js";

const router = new Router();


router.get("/database", async (req, res) =>{


    const user = await User.findOne({ username: req.session.userid })
    console.log(user);

    if(user)
    {
        res.status(200).json({ success: true, quote: user.quote, username: user.username,});
    }
    else
        res.status(401).json({ success: false, quote: "Unauthorized" });   
})

router.get('/logout', (req, res) => {


    if (req.session) {
        req.session.destroy(err => {
            if (err) {
              res.status(400).send('Unable to log out')
            } else {
              res.send({success: true})
            }
          })
        }
  });


  router.post('/register' , async (req, res) => {
    const {username, password} = req.body;

    const existing = await User.find({username});

    if(existing.length > 0){
      return res.status(200).json({
        success: false,
        message: "Already existing user"
      });
      return;
    }

    const user = new User({
        username,
        password
    })

    await user.save()

    req.session.userid = username;
    req.session.save();
    

    res.status(200).json({
      success: true,
      message: "User created"
    });
      
  });

  router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    req.session.userid = username;
    req.session.save();
    

    
    const response = await User.findOne({username, password});

    if(!response){
        res.status(401).json({ success: false, info: "Try Again" });    
    }
    else{
        res.status(200).json({ success: true, message: "Authorized",});
    }
})

router.put('/updateQuote', async (req, res) => {
  const {quote} = req.body

  if(quote && req.session.userid){
    const user = await User.findOne({username: req.session.userid});
    if(!user){
      res.status(404).json({success: false, info:"Erorr Updating"})
      return
    }
    console.log(user);
    await User.updateOne({username: req.session.userid}, { $set: {quote: quote}})

    res.status(200).json({success: true, info:"Updated Succesfully"})
  }
  
  else
    res.status(404).json({success: false, info:"Erorr Updating"})

})


   


export default router
const express = require('express')
const router = express.Router() 
const Task = require('../models/Factorclimatico')

router.get('/',async(req,res)=>{
       const tasks= await Task.find();
       console.log(tasks);
    res.json({
        tasks
    })
})

router.get('/:id',async(req,res)=>{
    const taskById = await Task.findById(req.params.is);
    res.json(taskById)
})

router.post('/',async(req,res)=>{
    const {title,description}=req.body;
    const tasks = new Task({title,description})
    console.log(tasks)
    await tasks.save()
    res.json({status:'Task saved'})
})

router.put('/:id',async(req,res)=>{
    const {title,description}=req.body;
    const newTask = ({title,description})
    await Task.findByIdAndUpdate(req.params.id,newTask);
    res.json('resived')
})

router.delete('/:id',async(req,res)=>{
    await Task.findByIdAndDelete(req.params.id)
    res.json({status:'task deleted'})
})
module.exports=router;
const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const utils = require('./utils');

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try{
    const userId = parseInt(req.user.id); 
    const result = await prisma.task.findMany({
      where:{
        userId: userId,
      }
    });
    res.json(result);
  }
  catch(error){
    console.error('Error fetching task: ', error)
    res.status(500).json({error: 'Internal Server Error'});
  }
  
})
router.get('/:id', async (req, res) => {
  try{
    const userId = parseInt(req.user.id);
  const result = await prisma.task.findFirst({
    where:{
      userId: userId,
      id: parseInt(req.params.id)
    }
  });
  res.json(result);
  }
  catch(error){
    console.error('Error fetching task: ', error)
    res.status(500).json({error: 'Internal Server Error'});
  }
  
})
// router.get('/', async (req, res) => {
//   const userId = req.user.id;
//   const result = await prisma.task.findMany({
//     where:{
//       board:{
//         userId: userId,
//       },
//     },
//   });
//   if(result){
//     res.json(result);
//   }
// });

router.post('/', async (req, res, next) => {
  const userId = parseInt(req.user.id);

  const payload = {
    title: req.body.title,
    description: req.body.description,
    user: {
      connect:{
        id: userId,
      }
    }
  };
  const createdTask = await prisma.task.create({
    data:payload,
  });
  res.json(
    createdTask);
});

router.put('/:id', async (req, res, next) => {
  const payload = {
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
  }
  if(await utils.isTaskOwnedByUser(req.params.id, req)){
    const result = await prisma.task.update({
      where:{
        id: parseInt(req.params.id),
      },
      data : payload,
    });
    
    res.json(result);
  } else{
    const error = new Error(`This user does not have a task with this id: ${req.params.id}`);
    res.status(422);
    next(error);
  }
});

router.put('/toggle/:id', async (req, res, next) => {
  try{
    if(await utils.isTaskOwnedByUser(req.params.id, req)){
      const toggle = await prisma.task.findUnique({
        where:{
          id: parseInt(req.params.id),
        }
      });
      const result = await prisma.task.update({
        where:{
          id: parseInt(req.params.id),
        },
        data : {
          completed: !toggle.completed
        },
      });
      
      res.json(result);
    }else{
      const error = new Error(`This user does not have a task with this id: ${req.params.id}`);
      res.status(422);
      next(error);
    }
  } 
  catch(error){
    console.error('Error fetching task: ', error)
    res.status(500).json({error: 'Internal Server Error'});
  }
});
  

router.delete('/:id', async (req, res, next) => {
  try{
    const id = parseInt(req.params.id);
    if(await utils.isTaskOwnedByUser(id, req)){
      const deletedTask = await prisma.task.delete({
        where:{
          id: id,
        }
      });
      res.json(
        deletedTask
      )
    }else{
    const error = new Error(`This user does not have a task with this id: ${req.params.id}`);
    res.status(422);
    next(error);
  }
  }catch(error){
    console.error('Error fetching task: ', error)
    res.status(500).json({error: 'Internal Server Error'});
  }
  
})

module.exports = router;
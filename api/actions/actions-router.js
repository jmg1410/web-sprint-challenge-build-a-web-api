// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model')
const router = express.Router();


//GET

router.get('/', async (req, res) => {
  try {
   const actions = await Actions.get();
   if (!actions) {
    return res.status(404).json({
        message: 'Action not found'
    })
   }
   res.status(200).json(actions)
  } catch (err) {
    res.status(500).json({
        message:'Failed to get actions'
    })
  }
})

// GET by id


router.get('/:id', async (req, res) => {
    const { id } =req.params

    try{
         const action = await Actions.get(id)

        if (!action) {
            return res.status(404).json({
                message: 'action not found'
            })
        }
       res.status(200).json(action)
    } catch (err) {
        res.status(500).json({
            message: 'Failed to get action'
        })
    }
})




// POST

router.post('/', async (req, res) => {
    const { project_id, description, notes, completed } = req.body;

    if (!project_id || !description || !notes) {
        return res.status(400).json({
            message: 'Missing required project_id, description, or notes'
        })
    }
    try {
      const newAction = await Actions.insert({project_id,description,notes,completed})
      res.status(201).json(newAction)
    } catch (err) {
        res.status(500).json({
            message: 'failed to create action'
        })
    }
})



// PUT

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { project_id,
         description,
          notes,
           completed } =req.body

           if (project_id === undefined ||
            description === undefined ||
            notes === undefined||
            completed === undefined) {
                return res.status(400).json({
                    message:'Missing required fields: project_id, description, notes, completed'
                })
            }
            try{
                const existingAction = await Actions.get(id);
                if(!existingAction) {
                    res.status(404).json({
                        message: 'action not found'
                    })
                }
                const updatedAction = await Actions.update(id, {project_id,
                    description,notes,completed});
                    res.json(updatedAction)

            }catch (err) {
                res.status(500).json({
                    message:'failed to update action'
                })
            }
})



//DELETE


router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
     const deletedAction = await Actions.remove(id)
     res.status(200).json({
        message: `Action ${id} deleted`
     })
    } catch(err) {
        res.status(500).json({
            message: "Failed to delete action"
        })
    }
})

module.exports = router;
// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const Projects = require('./projects-model')

//GET

router.get('/', async (req, res) => {
    try{
     const projects = await Projects.get();
     res.json(projects)
    }catch (err) {
        console.log('error ->', err)
        res.status(500).json({
            message:'Failed to retrieve project'
        });
    }
})

// GET by id

router.get('/:id', async(req, res) => {
    const { id } = req.params;

    try{
        const project = await Projects.get(id);
        if(!project) {
            res.status(404).json({
                message: 'Project not found'
            })
        } else {
            res.json(project)
        }

    } catch (err) {
        res.status(500).json({
            message:"Failed to retrieve the project"
        })
    }
})

// POST

router.post('/', async (req, res) => {
    const { name, description, completed } = req.body;

    if(!name || !description) {
      return  res.status(400).json({
            message: 'Missing required name or description'
        })
    }
    try {
        const newProject = await Projects.insert({name, description, completed});
        res.status(201).json(newProject)
    } catch (err) {
        res.status(500).json({
            message:'Failed to retrieve the project'
        })
    }
})

// PUT

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { name, description, completed } = req.body;

    if (name === undefined ||
         description === undefined ||
          completed === undefined) {
        return res.status(400).json({
            message: 'Missing requires name or description'
        })
    }
    try {
      const existingProject = await Projects.get(id);
      if (!existingProject) {
        return res.status(404).json({
            message: 'Project not found'
        })
      }
      const updatedProject = await Projects.update(id, {name, description, completed})
      res.json(updatedProject)
    } catch (err) {
      res.status(500).json({
        message: 'Failed to retrieve the project'
      })
    }
})

// DELETE

router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try{
        const deleted = await Projects.remove(id);

        if(!deleted) {
           return res.status(404).json({
                message: 'Project not found'
            })
        }
        res.status(200).json({
            message:`Project ${id} deleted`
        })

    } catch (err) {
        res.status(500).json({
            message:"Failed to delete the project"
        })
    }
})

// GET actions

router.get('/:id/actions', async (req, res) => {
    const { id } = req.params
    try{
     const project = await Projects.get(id);
     if (!project) {
        return res.status(404).json({
            message: 'Project not found'
        })
     }
     const actions = await Projects.getProjectActions(id);
     res.json(actions)
    } catch (err) {
        res.status(500).json({
            message:"Failed to get project actions"
        })
    }
})











module.exports = router;
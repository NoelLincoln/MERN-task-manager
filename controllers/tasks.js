const getAllTasks = (req,res) => {
    res.send('All my items')
}

const createTask = (req,res) => {
    res.json(req.body)
}

const getTask = (req,res) => {
    res.json({id: req.params.id})
}

const updateTask = (req,res) => {
    res.json('task updated')
}

const deleteTask = (req,res) => {
    res.send('Item deleted')
}



module.exports = {
    getAllTasks,createTask,getTask,updateTask,deleteTask
}
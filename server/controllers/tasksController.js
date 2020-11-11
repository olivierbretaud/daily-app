const Task = require('../models/Task');

exports.create = (req , res ) => {
  if (!req.body.title) {
    res.status(400).json({ message: "title can not be empty"})
  }

  const task = new Task({
    title: req.body.title,
    description: req.body.description ? req.body.description : null,
    user: req.body.user,
    isDone: false
  });

  task.save(task)
  .then(data => {
    console.log(data)
    res.status(201).json({
      task: data,
      message: "task created"
    })
  })
  .catch(err => {
    res.status(500).json({
      message: err.message || "Some error occurred while creating the Task."
    });
  });

};

exports.findUserTasks = (req, res) => {
  const user = req.param.user
  Task.find(user)
    .then(data => {
      console.data
      res.status(200).json({
        tasks: data,
        message: "all users task"
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tasks."
      });
    });
};

exports.update = (req , res ) => {
  if (!req.body) {
    res.status(400).json({
      message: "data can't be empty"
    });
  }

  const id = req.params.id;

  Task.findByIdAndUpdate( id , { $set :req.body } , {new: true , useFindAndModify: false})
  .then(data => {
    if (!data) {
      res.status(404).json({
        message: `Cannot update task with id=${id}`
      });
    } else {
      res.status(200).json({
        task: data,
        message: "Tasks updated"
      })
    }
  })
  .catch(err => {
    res.status(500).json({
      message: `Error on update task with id=${id}`
    });
  });

};

exports.delete = (req , res ) => {
  const id =req.params.id;

  Task.findByIdAndRemove(id)
    .then(data => {
      if(!data) {
        res.status(404).json({
          message: `task not found! Cannot delete task with id=${id}`
        });
      } else {
        res.status(200).json({
          message: "task deleted"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: `Error on delete task with id=${id}`
      })
    })

}
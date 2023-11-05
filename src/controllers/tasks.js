const { TasksModel } = require('../models')
const ObjectId = require('mongoose').Types.ObjectId

exports.addTask = async (req, res) => {

    try {
        const task = new TasksModel(req.body);
        await task.save();

        return res.json({ success: true, message: 'Task added Successfully' })

    } catch (e) {
        return res.status(500).json({ success: false, error: e.message })
    }
}

exports.getTask = async (req, res) => {

    try {

        const id = req.params.id

        const task = await TasksModel.findById(id)

        return res.json({ success: true, data: task })

    } catch (e) {

        return res.status(500).json({ success: false, error: e.message })
    }
}

exports.getTasks = async (req, res) => {

    try {

        const page = req.query.pageNumber ? (req.query.pageNumber - 1) : 0

        const limit = req.query.pageSize ? req.query.pageSize : 20

        const filter = (req.query?.filter?.completed === 'true') ? { completed: true } : req.query?.filter?.completed === 'both' ? {} : { completed: false }

        const tasks = await TasksModel.find(filter).skip(page * limit).limit(limit).sort({ createdAt: -1 })

        const count = await TasksModel.countDocuments(filter)

        return res.json({ success: true, data: { tasks, count } })

    } catch (e) {
        return res.status(500).json({ success: false, error: e.message })
    }
}

exports.updateTask = async (req, res) => {

    try {
        if (Object.keys(req.body).length > 0) {

            const formData = await TasksModel.findByIdAndUpdate(new ObjectId(req.params.id), req.body, { new: true })

            res.json({ success: true, data: { formData } });

        } else {
            res.status(500).json({ success: false, error: { message: "Cannot update form data, body cannot be empty" } });
        }
    } catch (error) {

        res.status(500).json({ success: false, error: { message: "Cannot update Tasks data", reason: error.message } });

    }

}

exports.deleteTask = async (req, res) => {

    try {

        const id = req.params.id

        const task = await TasksModel.findByIdAndDelete({ _id: new ObjectId(id) })

        return res.json({ success: true, data: task })

    } catch (e) {

        return res.status(500).json({ success: false, error: e.message })
    }
}
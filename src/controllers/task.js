import Task from '../models/Task';

export async function getTasks(req, res) {
    let tasks = await Task.findAll({
        attributes: ['id', 'projectid', 'name', 'done'],
        order: [
            ['id', 'DESC']
        ]
    });
    res.json({
        data: tasks
    });
}

export async function createTask(req, res) {
    try {
        const { name, done, projectid } = req.body;

        const result = await Task.create({
            name,
            done,
            projectid
        }, {
            fields: ['name', 'done', 'projectid']
        });
        res.json({
            msg: 'New task created',
            result
        });
    } catch (error) {
        console.log(error);
    }
}

export async function updateTask(req, res) {
    try {
        const { id } = req.params;
        const { projectid, name, done } = req.body;
        const task = await Task.findOne({
            where: {
                id
            }
        });

        let result = await task.update({
            name,
            done,
            projectid
        });

        return res.json({
            result
        });
    } catch (error) {
        console.log(error);
    }
}

export async function deleteTask(req, res) {
    const { id } = req.params;
    const result = await Task.destroy({
        where: {
            id
        }
    });

    res.json({
        result
    });
}

export async function getOneTask(req, res) {
    try {
        const { id } = req.params;
        const result = await Task.findOne({
            where: { id }
        });
        res.json({ result });
    } catch (error) {
        console.log(error);
    }
}

export async function getTasksByProject(req, res) {
    try {
        const { projectid } = req.params;
        let result = await Task.findAll({
            where: { projectid }
        });

        res.json({ result });
    } catch (error) {
        console.log(error);
    }
}
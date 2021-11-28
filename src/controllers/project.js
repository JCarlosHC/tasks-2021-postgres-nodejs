import Project from '../models/Project';

export async function getProjects(req, res) {
    try {
        const projects = await Project.findAll();
        res.json({
            data: projects
        })
    } catch (error) {
        console.log(error);
    }
}

export async function createProject(req, res) {
    const { name, priority, description, deliverydate } = req.body;

    try {
        let result = await Project.create({
            name, priority, description, deliverydate
        }, {
            fields: ['name', 'priority', 'description', 'deliverydate']
        });

        if (result) {
            res.json({
                message: 'Project created successfully',
                data: result
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Something goes wrong',
            data: {}
        });
    }
}

export async function getOneProject(req, res) {
    try {
        const { id } = req.params;
        const project = await Project.findOne({
            where: {
                id
            }
        });
        res.json({
            data: project
        });
    } catch (error) {
        console.log(error);
    }
}

export async function deleteProject(req, res) {
    const { id } = req.params;
    try {
        const result = await Project.destroy({
            where: {
                id
            }
        });
        res.json({
            result
        });
    } catch (error) {
        console.log(error);
    }
}

export async function updateProject(req, res) {
    const { id } = req.params;
    const { name, priority, description, deliverydate } = req.body;
    const project = await Project.findOne({
        where: {
            id
        }
    });

    let result = await project.update({
        name,
        priority,
        description,
        deliverydate
    });

    return res.json({
        message: result,
        data: project
    });
}
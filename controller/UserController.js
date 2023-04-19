const roleModel = require("../model/Role");
const UserController = {
    default: async (req, res) =>
    {
        const allUser = await roleModel.find();

        res.status(200).json({
            status: true,
            allUser
        })
    },
    create: async (req, res) =>
    {
        const user = await roleModel.create(req.body);

        res.status(200).json({
            success: true,
            user
        })
    },
    update: async (req, res) =>
    {
        let updatedUser = await roleModel.findById(req.params.id);

        updatedUser = await roleModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            useFindAndModify: false,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            updatedUser
        })
    },
    updateOne: async (req, res) =>
    {
        let updatedUser = await roleModel.findById(req.params.id);

        updatedUser = await roleModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            useFindAndModify: false,
            runValidators: true
        })

        res.status(200).json({
            success: true,
            updatedUser
        })
    },
    delete: async (req, res) =>
    {
        const deleteUser = await roleModel.findById(req.params.id);

        if (!deleteUser)
        {
            return res.status(500).json({
                status: false,
                message: "User not found"
            })
        }

        await deleteUser.deleteOne();

        res.status(200).json({
            success: true,
            message: "User is deleted successfully"
        })
    }
}

module.exports = UserController
const Roles = {
    create: function (req, res, next)
    {

        res.status(200).json({
            code: 200,
            message: "Record Created Successfully",
            status: true,
            error: false,
            data: []
        })
    },
    select: function (req, res, next)
    {

        res.status(200).json({
            code: 200,
            message: "Record Found Successfully",
            status: true,
            error: false,
            data: []
        })
    },
    update: function (req, res, next)
    {

        res.status(200).json({
            code: 200,
            message: "Record Updated Successfully",
            status: true,
            error: false,
            data: []
        })
    },
    delete: function (req, res, next)
    {

        res.status(200).json({
            code: 200,
            message: "Record Deleted Successfully",
            status: true,
            error: false,
            data: []
        })
    },
}

module.exports = Roles;
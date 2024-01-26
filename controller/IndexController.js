import * as path from "path";
const IndexController = {
    default: function (req, res, next)
    {

        let data = {
            "method": "default",
            "controller": "IndexController",
            "Route": "/",
            "method": "GET",
            "endPoint": {
                "/": "/api",
                "user": "/user",
                "admin": "/admin"
            },
            "filename": path.basename
        }

        res.status(200).json({
            code: 200,
            status: true,
            message: "server started successfully.",
            data: data,
            error: false

        });
    }
}

export default IndexController;
const config = {
    "database": {
        "oracle": {},
        "mysql": {},
        "mongodb": {
            "atlas": "",
            "cluster": "",
            "local": "mongodb://0.0.0.0:27017/quiz",
            "confingRules": {
                "useNewUrlParser": true,
                "useUnifiedTopology": true
            }
        }
    }
}

export default config;
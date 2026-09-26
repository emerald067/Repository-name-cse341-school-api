const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "School Management API",
            version: "1.0.0",
            description: "API for managing students and classes"
        },
        servers: [
            {
                url: "https://repository-name-cse341-school-api.onrender.com"
            }
        ]
    },
    apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
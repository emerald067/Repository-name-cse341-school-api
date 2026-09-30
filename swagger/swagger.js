const swaggerJSDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "School Management API",
            version: "1.0.0",
            description: "API for managing students and classes"
        },
        components: {
            securitySchemes: {
                auth0: {
                    type: "openIdConnect",
                    openIdConnectUrl:
                        "https://dev-k66avms0pecf2c31.us.auth0.com/.well-known/openid-configuration"
                }
            }
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
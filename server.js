const dns = require("node:dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const { auth, requiresAuth } = require("express-openid-connect");
const connectDB = require("./db/connection");
const studentRoutes = require("./routes/students");
const classRoutes = require("./routes/classes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");

const app = express();
const PORT = process.env.PORT || 8080;

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    httpTimeout: 30000
};

app.use(express.json());

app.use(auth(config));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/students", studentRoutes);
app.use("/classes", classRoutes);

app.get("/", (req, res) => {
    res.send(
        `School Management API is running. Authentication status: ${
            req.oidc.isAuthenticated() ? "Logged in" : "Logged out"
        }`
    );
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
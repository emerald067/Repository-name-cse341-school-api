const dns = require("node:dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const connectDB = require("./db/connection");
const studentRoutes = require("./routes/students");
const classRoutes = require("./routes/classes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/students", studentRoutes);
app.use("/classes", classRoutes);

app.get("/", (req, res) => {
    res.send("School Management API is running");
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
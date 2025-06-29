import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import swaggerUi from 'swagger-ui-express';
import router from "./routes/routes.js"
import specs from "./config/Swagger-config.js"

const app = express()

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// Swagger documentation route
app.use('/api-docs', 
    swaggerUi.serve, 
    swaggerUi.setup(specs, { 
        explorer: true,
        customSiteTitle: 'HireHaven API Documentation'
    })
);

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// API routes
app.use("/api/v1", router)

export { app }
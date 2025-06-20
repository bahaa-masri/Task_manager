import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import morgan from "morgan"
import { errorHandler, routeNotFound } from "./middlewares/errorMiddleware.js"
import { dbConnection } from "./utils/index.js"
import routes from "./routes/index.js"

dotenv.config()

dbConnection()

const PORT = process.env.PORT || 5000

const app = express()

// app.use(
//     cors({
//         origin: [
//             //"https://task-manager-abhi.netlify.app",
//             "http://38.172.157.9:3000",
//             "http://localhost:3000",
//             "http://localhost:3001"],
//         methods: ["GET", "POST", "DELETE", "PUT"],
//         credentials: true,
//     })
// )

const allowedOrigins = [
    "https://bahaatm.netlify.app",
    "http://localhost:3000",
    "http://38.172.157.9:3000", // IP جهازك أو اسم الشبكة
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }));
  

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use(morgan("dev"))
app.use("/api", routes)

app.use(routeNotFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server listening on ${PORT}`))

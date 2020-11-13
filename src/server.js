require("babel-polyfill")
import express from "express"
import morgan from "morgan"
import cors from "cors"
import bodyParser from "body-parser"
import multer from "multer"

import graphRouter from "./index"
import storage from "./storage"

const { NODE_ENV, PORT = 4000 } = process.env

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './tmp')
    },
    filename(req, file, cb) {
      const [filename, ext] = file.originalname.split(".")
      cb(null, `${filename}-${Date.now()}.${ext}`)
    }
  })
})

var app = express()

if (NODE_ENV !== "test") app.use(morgan("combined"), cors());

const attatchRouter = async () => {
  const db = await storage

  Object.assign(app.locals, { db })
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json('*/*'))
  app.get("/health", (req, res) => res.json({ ok: true, message: "welcome to graph api" }));
  app.use("/", graphRouter)
  // app.use("/upload", authMiddleware, upload.single('file'), uploadFile)
}

attatchRouter()

if(NODE_ENV !== "test"){
  app.listen(PORT, () => console.log(`Project running on port ${PORT}! on ${NODE_ENV} mode.`))
}

export default app

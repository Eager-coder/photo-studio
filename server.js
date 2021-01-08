const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require("dotenv").config()
const path = require("path")

const app = express()

app.use(cookieParser())
app.use(
	cors({
		allowedHeaders: ["sessionId", "Content-Type"],
		exposedHeaders: ["sessionId"],
		origin: "http://localhost:3000",
		credentials: true,
	})
)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true, limit: "3mb" }))
app.use("/api/user/auth", require("./routes/user/auth"))
app.use("/api/user/order", require("./routes/user/order"))
app.use("/api/user/message", require("./routes/user/message"))

app.use("/api/admin/order", require("./routes/admin/order"))
// app.use("/api/user/message", require("./routes/user/message"))

app.use(express.static("./client/build"))
app.get("*", (req, res) =>
	res.sendFile(path.join(__dirname + "/client/build/index.html"))
)

const PORT = process.env.PORT || 80

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))

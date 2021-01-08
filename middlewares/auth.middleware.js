const { verify } = require("jsonwebtoken")
module.exports = (req, res, next) => {
	try {
		const token = req.cookies.auth
		if (!token) return res.status(401).json({ message: "Access denied" })
		const decoded = verify(token, process.env.JWT_SECRET)
		req.user = decoded
		next()
	} catch (e) {
		console.error("VERIFY TOKEN", e)
		res.status(401).json({ message: "Access denied" })
	}
}

const { Router } = require("express")
const pool = require("../../db")
const checkAuth = require("../../middlewares/auth.middleware")
const router = Router()
const mysql = require("mysql2")

router.post("/", checkAuth, async (req, res) => {
	try {
		const { user_id } = req.user
		const { text, order_id } = req.body
		const timestamp = Math.floor(new Date().getTime() / 1000)
		await pool.query(`
      INSERT INTO messages (timestamp, text, order_id, user_id)
      VALUES ('${timestamp}', ${mysql.escape(
			text
		)}, '${order_id}', '${user_id}')
    `)
		return res.json({ message: "Успешно создано" })
	} catch (error) {
		console.error("POST MESSAGE", error)
		return res.status(500).json({ message: "Что-то пошло не так" })
	}
})

router.delete("/", checkAuth, async (req, res) => {
	try {
		// const { user_id } = req.user
		const { message_id } = req.body
		await pool.query(`DELETE FROM messages WHERE id = '${message_id}'`)

		return res.json({ message: "Успешно удалено" })
	} catch (error) {
		console.error("DELETE MESSAGE", error)
		return res.status(500).json({ message: "Что-то пошло не так" })
	}
})

module.exports = router

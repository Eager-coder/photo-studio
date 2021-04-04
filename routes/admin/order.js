const { Router } = require("express")
const pool = require("../../db")
const checkAdminAuth = require("../../middlewares/auth.admin.middleware")
const router = Router()
const mysql = require("mysql2")

router.get("/", checkAdminAuth, async (req, res) => {
	try {
		const [orders] = await pool.query(`
			SELECT orders.id as order_id, tariff, type,
				address, number_of_people, date, time, status,
				img_url, user_id, name, surname, tel_number
			FROM orders, users WHERE orders.user_id = users.id 
			ORDER BY orders.id DESC
		`)

		const [messages] = await pool.query(`
			SELECT * FROM messages ORDER BY timestamp 
		`)

		orders.forEach(order => {
			let orderMessages = []
			messages.forEach(message => {
				if (message.order_id === order.order_id) {
					orderMessages.push(message)
				}
			})
			order.messages = orderMessages
		})

		res.json({ data: orders })
	} catch (error) {
		console.error("GET ADMIN ORDERS", error)
		return res.status(500).json({ message: "Что-то пошло не так" })
	}
})

router.get("/calendar", checkAdminAuth, async (req, res) => {
	try {
		const [orders] = await pool.query(`
		SELECT * FROM orders WHERE status = 'ожидается' ORDER by date
	`)
		res.json({ data: orders })
	} catch (error) {
		console.error("GET CALENDAR", error)
		return res.status(500).json({ message: "Что-то пошло не так" })
	}
})

router.post("/", checkAdminAuth, async (req, res) => {
	try {
		const { tariff, type, address, numOfPeople, date, time } = req.body
		const { user_id } = req.user
		if (!tariff || !type || !address || !numOfPeople || !date || !time)
			return res.status(400).json({ message: "Заполните все поля" })

		await pool.query(`
      INSERT INTO orders (tariff, type, address, number_of_people, date, time, user_id)
      VALUES ('${tariff}', '${type}', ${mysql.escape(address)}, ${numOfPeople}, 
      ${mysql.escape(date)}, ${mysql.escape(time)}, ${user_id})
    `)

		res.json({ message: "Ваш заказ принят!" })
	} catch (error) {
		console.error("POST ORDER", error)
		return res.status(500).json({ message: "Что-то пошло не так" })
	}
})

router.put("/status", checkAdminAuth, async (req, res) => {
	try {
		const { order_id, newStatus } = req.body
		console.log(order_id, newStatus)
		const result = await pool.query(`
			UPDATE orders SET status = '${newStatus}' 
			WHERE id = '${order_id}'
		`)
		console.log(result)
		res.json({ message: "Успешно изменено" })
	} catch (error) {
		console.error("POST ORDER", error)
		return res.status(500).json({ message: "Что-то пошло не так" })
	}
})

router.post("/upload_url", checkAdminAuth, async (req, res) => {
	try {
		const { order_id, imgUrl } = req.body
		if (!imgUrl || !order_id) return res.status(400).json({ message: "Заполните все поля" })
		const result = await pool.query(`
			UPDATE orders SET img_url = ${mysql.escape(imgUrl)}
			WHERE id = '${order_id}'
		`)
		console.log(result)
		res.json({ message: "Успешно изменено" })
	} catch (error) {
		console.error("POST ORDER", error)
		return res.status(500).json({ message: "Что-то пошло не так" })
	}
})

module.exports = router

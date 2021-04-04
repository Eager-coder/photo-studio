const { Router } = require("express")
const pool = require("../../db")
const checkAuth = require("../../middlewares/auth.middleware")
const router = Router()
const mysql = require("mysql2")

router.get("/", checkAuth, async (req, res) => {
	try {
		const { user_id } = req.user
		const [orders] = await pool.query(`
			SELECT * FROM orders WHERE user_id = ${user_id} ORDER BY id DESC
		`)
		const orderIds = orders.map(order => order.id)
		if (orderIds.length) {
			const [messages] = await pool.query(`
			SELECT * FROM messages WHERE order_id IN (${mysql.escape(orderIds)})
			ORDER BY timestamp 
		`)
			orders.forEach(order => {
				let orderMessages = []
				messages.forEach(message => {
					if (message.order_id === order.id) {
						orderMessages.push(message)
					}
				})
				order.messages = orderMessages
			})
		}

		res.json({ data: orders })
	} catch (error) {
		console.error("GET ORDER", error)
		return res.status(500).json({ message: "Что-то пошло не так" })
	}
})

router.post("/", checkAuth, async (req, res) => {
	try {
		const { tariff, type, address, numOfPeople, date, time } = req.body
		const { user_id } = req.user
		console.log(req.body)

		if (!tariff || !type || !address || !numOfPeople || !date || !time)
			return res.status(400).json({ message: "Заполните все поля" })

		await pool.query(`
      INSERT INTO orders (tariff, type, address, number_of_people, date, time, user_id)
      VALUES ('${tariff}', '${type}', ${mysql.escape(address)}, ${numOfPeople}, 
      ${mysql.escape(date)}, ${mysql.escape(time)}, '${user_id}')
    `)

		res.json({ message: "Ваш заказ принят!" })
	} catch (error) {
		console.error("POST ORDER", error)
		return res.status(500).json({ message: "Что-то пошло не так" })
	}
})

router.delete("/:order_id", checkAuth, async (req, res) => {
	try {
		const { order_id } = req.params
		const { user_id } = req.user
		await pool.query(`
      UPDATE orders SET status = 'отменено' WHERE 
      id = '${order_id}' AND user_id = '${user_id}'
    `)
		res.json({ message: "Успешно отменено" })
	} catch (error) {
		console.error("DELETE ORDER", error)
		return res.status(500).json({ message: "Что-то пошло не так" })
	}
})

module.exports = router

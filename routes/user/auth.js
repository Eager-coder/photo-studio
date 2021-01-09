const { Router } = require("express")
const pool = require("../../db")
const { sign } = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const checkAuth = require("../../middlewares/auth.middleware")
const router = Router()
const mysql = require("mysql2")

router.post("/register", async (req, res) => {
	const { name, surname, telNumber, password, password2 } = req.body
	if (!name || !surname || !telNumber || !password || !password2)
		return res.status(400).json({ message: "Заполните все поля" })
	if (password !== password2)
		return res.status(400).json({ message: "Пароли не совпадают" })
	if (password.length < 8)
		return res
			.status(400)
			.json({ message: "Пароль должен содержать минимум 8 символов" })
	const regExp = /[a-zA-Z]/g

	if (regExp.test(telNumber))
		return res.status(400).json({ message: "Некорретный номер" })

	try {
		const [allNumbers] = await pool.query(`SELECT tel_number from users`)

		const hasExist = allNumbers.some(item => item.tel_number == telNumber)

		allNumbers.forEach(item => console.log(item.tel_number))

		if (hasExist)
			return res.status(400).json({ message: "Этот номер уже зарегистрирован" })
		const hashedPassword = bcrypt.hashSync(password, 10)

		const [newUser] = await pool.query(`
			INSERT INTO users (name, surname, tel_number, password)
			VALUES ('${name}', '${surname}',${mysql.escape(telNumber)}, '${hashedPassword}')
		`)
		console.log(newUser.insertId)
		const token = sign(
			{
				user_id: newUser.insertId,
				name,
				surname,
				tel_number: telNumber,
				isAdmin: false,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: "2d",
			}
		)
		res
			.cookie("auth", token, {
				expiresIn: 3600 * 1000 * 48,
				httpOnly: true,
			})
			.status(201)
			.json({
				message: "Добро пожаловать",
				data: {
					name,
					surname,
					tel_number: telNumber,
					isAdmin: false,
				},
			})
	} catch (e) {
		console.log("REGISTER", e)
		return res.status(500).json({ message: "Что-то пошло не так" })
	}
})

router.post("/login", async (req, res) => {
	const { telNumber, password } = req.body

	if (!telNumber || !password)
		return res.status(400).json({ message: "Заполните все поля" })

	try {
		const [users] = await pool.query(`
			SELECT * from users WHERE tel_number = '${telNumber}'
		`)
		if (!users.length)
			return res.status(400).json({ message: "Некорректный номер или пароль" })

		const isMatch = await bcrypt.compare(password, users[0].password)

		if (!isMatch)
			return res.status(400).json({ message: "Некорректный номер или пароль" })

		const { id, name, surname, tel_number, isAdmin } = users[0]
		console.log(users[0])

		const token = sign(
			{
				user_id: id,
				name,
				surname,
				tel_number,
				isAdmin: isAdmin ? true : false,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: "2d",
			}
		)
		res
			.cookie("auth", token, {
				expiresIn: 3600 * 1000 * 48,
				httpOnly: true,
			})
			.status(201)
			.json({
				message: "Добро пожаловать",
				data: {
					user_id: id,
					name,
					surname,
					tel_number: telNumber,
					isAdmin: isAdmin ? true : false,
				},
			})
	} catch (e) {
		console.log("REGISTER", e)
		return res.status(500).json({ message: "Что-то пошло не так" })
	}
})

router.delete("/", checkAuth, async (req, res) => {
	res.clearCookie("auth").json({ message: "Вы вышли из системы" })
})

router.get("/", checkAuth, async (req, res) => {
	res.status(200).json({ data: req.user })
})

module.exports = router

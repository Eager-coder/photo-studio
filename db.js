const mysql = require("mysql2/promise")

const db = mysql.createPool({
	host: "freedb.tech",
	user: "freedbtech_PhotoStudio",
	database: "freedbtech_PhotoStudio",
	password: "Pizda2021",
})

module.exports = db

// const db = mysql.createPool({
// 	host: "soe.petropavl.site",
// 	user: "soe_ertugan",
// 	database: "soe_task1",
// 	password: "pR9hmOEIOAZK",
// })

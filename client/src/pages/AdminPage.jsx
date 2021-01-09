import { useEffect, useState, useContext } from "react"
import { useParams, useHistory } from "react-router-dom"
import { UserContext } from "../App"
import styled from "styled-components"
import Sidebar from "../components/Admin/Sidebar"
import Orders from "../components/Admin/Orders"
import Calendar from "../components/Admin/Calendar"
import { getOrders, getCalendar } from "../api/admin/order"
import Loading from "../components/Loading"

export default function AdminPage() {
	const { user, setUser } = useContext(UserContext)
	const [orders, setOrders] = useState(null)
	const [calendar, setCalendar] = useState(null)
	const { section } = useParams()
	const getAdminData = async () => {
		const { data: allOrders } = await getOrders()
		const { data: calendarData } = await getCalendar()
		setOrders(allOrders)
		setCalendar(calendarData)
	}
	useEffect(() => {
		getAdminData()
	}, [])

	if (user.isAdmin && orders && calendar)
		return (
			<AdminPageEl>
				<Sidebar section={section} />
				{section === "calendar" && <Calendar calendar={calendar} />}
				{section === "orders" && (
					<Orders orders={orders} setOrders={setOrders} />
				)}
			</AdminPageEl>
		)

	return <Loading size={200} />
}

const AdminPageEl = styled.div`
	max-width: 1200px;
	margin: 20px auto;
	display: flex;
	h1 {
		font-size: 3rem;
		font-weight: 500;
		margin-bottom: 30px;
	}
	@media (max-width: 768px) {
		display: block;
	}
`

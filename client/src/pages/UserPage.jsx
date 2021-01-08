import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import styled from "styled-components"
import { UserContext } from "../App"
import { getOrders } from "../api/user/order"
import Order from "../components/User/Order"
import Loading from "../components/Loading"
const UserPageEl = styled.div`
	max-width: 1200px;
	margin: 20px auto;
	h1 {
		font-size: 3rem;
		font-weight: 500;
	}
	h2 {
		font-size: 2.5rem;
		margin: 10px 0;
	}
	h3 {
		font-size: 2rem;
		margin: 10px 0;
	}
	p.no-order {
		font-size: 1.5rem;
	}
`

export default function UserPage() {
	const [orders, setOrders] = useState([])
	const { user, setUser } = useContext(UserContext)
	const history = useHistory()
	const [loading, setLoading] = useState(false)
	const handleOrders = async () => {
		setLoading(true)
		const { data } = await getOrders()
		setOrders(data)
		setLoading(false)
	}

	useEffect(() => {
		if (user.isLoggedIn) {
			handleOrders()
		}
	}, [user])

	if (user.isLoggedIn)
		return (
			<UserPageEl>
				<h1>Здравствуйте, {user.name}</h1>
				<h3>Ваш номер: {user.tel_number}</h3>
				<div className="orders">
					<h2>Мои заказы</h2>

					{loading ? (
						<Loading size={200} />
					) : (
						<div>
							{orders?.length ? (
								orders.map(order => (
									<Order key={order.id} data={order} setOrders={setOrders} />
								))
							) : (
								<p className="no-order">У вас нет заказов</p>
							)}
						</div>
					)}
				</div>
			</UserPageEl>
		)
	return <Loading size={200} />
}

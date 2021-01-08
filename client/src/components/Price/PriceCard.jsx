import { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import Modal from "../../components/Modal"
import { postOrder } from "../../api/user/order"
import { useHistory } from "react-router-dom"
import Loading from "../Loading"
import { UserContext } from "../../App"

export default function PriceCard({ data }) {
	const [modal, setModal] = useState({ tariff: null, isOpen: false })
	const history = useHistory()
	const { user } = useContext(UserContext)

	const handleOrder = tariff => {
		if (!user.isLoggedIn) return history.push("/login")

		setModal({ tariff, isOpen: true })
	}
	// nested looping the two-dimentional array
	const card = data.map(tariff => {
		return (
			<CardEl type={tariff[0]} key={tariff[0]}>
				<div className="card-container">
					<h2>Тариф «{tariff[0]}»</h2>
					<b className="price">Цена: {tariff[2]}</b>
					<ul>
						{tariff[1].map(i => {
							return <li key={i}>&#8212; {i}</li>
						})}
					</ul>
				</div>
				<button onClick={() => handleOrder(tariff[0])}>Заказать</button>
			</CardEl>
		)
	})
	const studio = `ул. Нур – Султана(Мира) 69А, Фотостудия “N”`

	const [type, setType] = useState("индивидуальный")
	const [address, setAddress] = useState(studio)
	const [isOwnAddressOpen, setIsOwnAddressOpen] = useState(false)
	const [numOfPeople, setNumOfPeople] = useState(1)
	const [date, setDate] = useState(null)
	const [time, setTime] = useState(null)
	const [message, setMessage] = useState(null)
	const [loading, setLoading] = useState(false)

	const handleSubmit = async e => {
		setLoading(true)
		e.preventDefault()
		const form = {
			tariff: modal.tariff,
			type,
			address,
			numOfPeople,
			date,
			time,
		}
		const { data, message, isSuccess } = await postOrder(form)
		if (isSuccess) return history.push("/user")

		setMessage(message)
		setLoading(false)
	}
	useEffect(() => {
		if (type === "свадебный") {
		}
	}, [type])
	return (
		<PriceCardEl>
			<div className="container">{card}</div>
			{modal.isOpen && (
				<Modal darken={loading}>
					<div className="modal-wrapper">
						<h2>Вы выбрали тариф «{modal.tariff}»</h2>
						<form onSubmit={handleSubmit}>
							<h3>Тип сьемки</h3>
							<select onChange={e => setType(e.target.value)}>
								<option value="индивидуальный">индивидуальная</option>
								<option value="семейный">семейная</option>
								<option value="свадебный">свадебная</option>
							</select>
							<h3>Адрес</h3>
							<div>
								{type === "свадебный" ? (
									<input
										type="text"
										defaultValue=""
										onChange={e => setAddress(e.target.value)}
									/>
								) : (
									<div>
										<label>
											<input
												type="radio"
												name="studio"
												value={studio}
												checked={address === studio}
												onChange={() => {
													setAddress(studio)
													setIsOwnAddressOpen(false)
												}}
											/>
											<span>{studio}</span>
										</label>
										<label>
											<input
												type="radio"
												name="own"
												value="own"
												checked={address !== studio}
												onChange={() => {
													setAddress("")
													setIsOwnAddressOpen(true)
												}}
											/>
											<span>Свой вариант</span>
											{isOwnAddressOpen && (
												<input
													type="text"
													defaultValue=""
													onChange={e => setAddress(e.target.value)}
													placeholder="Ваш адрес"
												/>
											)}
										</label>
									</div>
								)}
							</div>

							<h3>Количество людей</h3>
							<input
								type="number"
								onChange={e => setNumOfPeople(e.target.value)}
								min={1}
								max={10000}
							/>
							<h3>Дата</h3>
							<input type="date" onChange={e => setDate(e.target.value)} />
							<h3>Время</h3>
							<input type="time" onChange={e => setTime(e.target.value)} />
							<div className="buttons">
								<button
									className="cancel"
									onClick={() => setModal({ tariff: null, isOpen: false })}>
									Отмена
								</button>
								<button type="submit" className="submit">
									Подтвердить
								</button>
							</div>
							{message && <p style={{ color: "red" }}>{message}</p>}
						</form>
						{loading && <Loading size={100} />}
					</div>
				</Modal>
			)}
		</PriceCardEl>
	)
}
const PriceCardEl = styled.div`
	.container {
		display: flex;
		justify-content: space-between;
	}
	@media (max-width: 768px) {
		.container {
			display: block;
		}
	}
`
const CardEl = styled.div`
	width: 30%;
	padding: 20px;
	width: 30%;
	position: relative;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	box-shadow: 0px 0px 4px 5px rgba(0, 0, 0, 0.07);
	border-radius: 7px;
	border-top: ${({ type }) => {
		if (type === "Начальный") return "#9a9a9a 5px solid"
		else if (type === "Классический") return "#66d3cd 5px solid"
		else return "#c886df 5px solid"
	}};
	transition: 0.3s;
	background: white;
	:hover {
		transform: scale(1.05);
	}
	.card-container {
		margin-bottom: 20px;
	}

	h2 {
		font-size: 2rem;
		margin-bottom: 20px;
	}

	ul {
		margin-top: 20px;
		li {
			font-size: 1rem;
			color: #353535;
		}
	}
	b.price {
		font-size: 1.5rem;
	}
	button {
		display: inline-block;
		padding: 15px 36px;
		overflow: hidden;
		transition: border 0.2s ease, background 0.2s ease, color 0.2s ease;
		border-radius: 10px;
		outline: none;
		background: #fff;
		color: #353535;
		font-size: 15px;
		font-weight: bolder;
		text-decoration: none;
		cursor: pointer;
		border: 1px solid rgba(53, 53, 53, 0.25);
		:hover {
			background: #353535;
			color: #fff;
			text-decoration: none;
		}
	}
	@media (max-width: 768px) {
		width: 100%;
		margin-bottom: 40px;
	}
`

import { useState, useEffect } from "react"
import styled from "styled-components"
import { changeStatus, getOrders, uploadUrl } from "../../api/admin/order"
import Modal from "../Modal"
import Messages from "./Messages"

export default function Orders({ orders, setOrders }) {
	return (
		<OrdersEl>
			<h1>Все заказы</h1>
			{orders.map(order => (
				<Order
					key={order.order_id + order.date + order.time}
					order={order}
					setOrders={setOrders}
				/>
			))}
		</OrdersEl>
	)
}

const Order = ({ order, setOrders }) => {
	const [newStatus, setNewStatus] = useState({
		status: order.status,
		isOpen: false,
	})

	const [imgUrl, setImgUrl] = useState({
		url: order.img_url || null,
		isOpen: false,
	})
	const [statusMessage, setStatusMessage] = useState(null)
	const [imgMessage, setImgMessage] = useState(null)

	const handleStatus = async () => {
		if (newStatus.status === order.status) return

		const { message, isSuccess } = await changeStatus(
			order.order_id,
			newStatus.status
		)
		if (isSuccess) {
			getOrders().then(({ data }) => setOrders(data))
			setNewStatus({ status: order.status, isOpen: false })
		} else {
			setNewStatus(message)
		}
	}
	const handleImgUrl = async () => {
		const { message, isSuccess } = await uploadUrl(order.order_id, imgUrl.url)
		if (isSuccess) {
			getOrders().then(({ data }) => setOrders(data))
			setImgUrl({ url: order.img_url, isOpen: false })
		} else {
			setImgMessage(message)
		}
	}
	return (
		<OrderEl>
			<div className="flex">
				<div className="info">
					<span>
						<b>Имя клиента:</b> {order.name} {order.surname}
					</span>
					<span>
						<b>Тел. номер:</b> {order.tel_number}
					</span>
					<span>
						<b>Тариф:</b> {order.tariff}
					</span>
					<span>
						<b>Тип:</b> {order.type}
					</span>
					<span>
						<b>Количество людей:</b> {order.number_of_people}
					</span>
					<span>
						<b>Адрес:</b> {order.address}
					</span>
					<span>
						<b>Дата:</b> {order.date}
					</span>
					<span>
						<b>Время:</b> {order.time}
					</span>
				</div>
				<div className="controllers">
					<span>
						<b>Статус:</b> {order.status}
					</span>
					<button onClick={() => setNewStatus({ ...newStatus, isOpen: true })}>
						Изменить статус
					</button>
					{order.status === "выполнено" && (
						<>
							<button onClick={() => setImgUrl({ ...imgUrl, isOpen: true })}>
								Оправить фотографии
							</button>
						</>
					)}
					{order.img_url ? (
						<a target="_blank" href={order.img_url}>
							Ссылка на фотографии
						</a>
					) : null}
				</div>
			</div>
			<Messages order={order} setOrders={setOrders} />
			{newStatus.isOpen && (
				<Modal>
					<h2 style={{ width: 300, marginBottom: "25px" }}>Изменить статус</h2>
					<select
						defaultValue={order.status}
						onChange={e =>
							setNewStatus({ isOpen: true, status: e.target.value })
						}
						style={{ fontSize: "1.2rem" }}>
						<option value="ожидается">ожидается</option>
						<option value="выполнено">выполнено</option>
						<option value="отменено">отменено</option>
					</select>
					<div className="buttons">
						<button
							onClick={() => setNewStatus({ ...newStatus, isOpen: false })}
							className="cancel">
							Отмена
						</button>
						<button onClick={handleStatus} className="submit">
							Изменить
						</button>
						{statusMessage && <p className="message">{statusMessage}</p>}
					</div>
				</Modal>
			)}
			{imgUrl.isOpen && (
				<Modal>
					<h2 style={{ fontSize: "1.5rem", marginBottom: "25px" }}>
						Отправить фотографии
					</h2>
					<input
						type="text"
						style={{ width: "300px", padding: "5px", fontSize: "1.1rem" }}
						placeholder="Вставьте ссылку"
						value={imgUrl.url}
						onChange={e => setImgUrl({ isOpen: true, url: e.target.value })}
					/>
					{imgMessage && <p className="message">{imgMessage}</p>}
					<div className="buttons">
						<button
							onClick={() => {
								setImgUrl({ isOpen: false, url: "" })
								setImgMessage(null)
							}}
							className="cancel">
							Отмена
						</button>
						<button onClick={handleImgUrl} className="cancel">
							Отправить
						</button>
					</div>
				</Modal>
			)}
		</OrderEl>
	)
}
const OrdersEl = styled.div`
	width: 100%;
`

const OrderEl = styled.div`
	border-radius: 4px;
	box-shadow: rgba(0, 0, 0, 0.7) 0px 0px 1px;
	margin-bottom: 30px;
	padding: 25px;
	background: white;
	.flex {
		display: flex;
		.info {
			width: 100%;
			span {
				display: block;
				font-size: 1.2rem;
				margin: 5px 0;
			}
		}
		.controllers {
			width: 250px;
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			span,
			a {
				margin-bottom: 10px;
				font-size: 1.2rem;
				text-align: right;
			}
			a {
				color: #03b674;
			}
			button {
				padding: 5px;
				margin-bottom: 10px;
				overflow: hidden;
				border-radius: 7px;
				background: #fff;
				color: #353535;
				font-size: 15px;
				font-weight: bolder;
				cursor: pointer;
				border: 1px solid rgba(53, 53, 53, 0.25);
				transition: border 0.2s ease, background 0.2s ease, color 0.2s ease;
				display: inline-block;
				:hover {
					background: #353535;
					color: #fff;
					text-decoration: none;
				}
			}
		}
	}
`

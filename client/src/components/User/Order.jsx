import { useState } from "react"
import styled from "styled-components"
import { cancelOrder, getOrders } from "../../api/user/order"
import Modal from "../Modal"
import Messages from "./Messages"
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
			}
		}
		.controllers {
			width: 300px;
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
				padding: 10px 20px;
				overflow: hidden;
				border-radius: 10px;
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
export default function Order({ data, setOrders }) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [message, setMessage] = useState(null)
	const handleCancel = async order_id => {
		const { message, isSuccess } = await cancelOrder(order_id)
		if (isSuccess) {
			getOrders().then(({ data }) => setOrders(data))
			setIsModalOpen(false)
		} else {
			setMessage(message)
		}
	}
	return (
		<OrderEl>
			<div className="flex">
				<div className="info">
					<span>
						<b>Тариф:</b> {data.tariff}
					</span>
					<span>
						<b>Тип:</b> {data.type}
					</span>
					<span>
						<b>Адрес:</b> {data.address}
					</span>
					<span>
						<b>Дата:</b> {data.date}
					</span>
					<span>
						<b>Время:</b> {data.time}
					</span>
					<span>
						<b>Количество людей:</b> {data.number_of_people}
					</span>
				</div>
				<div className="controllers">
					<span>
						<b>Статус:</b> {data.status}
					</span>
					{data.status === "ожидается" && (
						<button onClick={() => setIsModalOpen(true)}>Отменить</button>
					)}
					{data.img_url && (
						<a target="_blank" href={data.img_url}>
							Ссылка на фотографии
						</a>
					)}
				</div>
			</div>

			{isModalOpen && (
				<Modal>
					<h3>Вы действительно хотите отменить заказ?</h3>
					{message && <p>{message}</p>}
					<div className="buttons">
						<button onClick={() => setIsModalOpen(false)} className="cancel">
							Нет
						</button>
						<button onClick={() => handleCancel(data.id)} className="submit">
							Да
						</button>
					</div>
				</Modal>
			)}
			<Messages
				messages={data.messages}
				order_id={data.id}
				setOrders={setOrders}
			/>
		</OrderEl>
	)
}

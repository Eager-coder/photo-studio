import { useState, useContext } from "react"
import styled from "styled-components"
import { getOrders } from "../../api/admin/order"
import { postMessage } from "../../api/user/message"
import { UserContext } from "../../App"
import { formatDistanceToNow } from "date-fns"
import { ru } from "date-fns/locale"
const MessagesEl = styled.div`
	margin-top: 20px;

	h2 {
		font-size: 2rem;
	}
	h3 {
		font-size: 1.5rem;
	}
	textarea {
		width: 100%;
		min-height: 100px;
		font-size: 1.2rem;
		padding: 10px;
		margin-bottom: 15px;
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
`

export default function Messages({ order, setOrders }) {
	const { messages, order_id } = order
	const [text, setText] = useState("")
	const handleMessage = async () => {
		if (!text.trim().length) return

		const { data, message, isSuccess } = await postMessage(
			text.trim(),
			order_id
		)
		if (isSuccess) {
			setText("")
			const { data } = await getOrders()
			setOrders(data)
		}
	}
	return (
		<MessagesEl>
			<h2>Сообщения</h2>
			<div className="message">
				{messages?.length ? (
					messages.map(message => (
						<Message key={message.id} message={message} name={order.name} />
					))
				) : (
					<p>Нет сообщений</p>
				)}
			</div>
			<div className="write">
				<h3>Написать</h3>
				<textarea
					value={text}
					onChange={e => setText(e.target.value)}></textarea>
				<button onClick={() => handleMessage()} className="send">
					Отправить
				</button>
			</div>
		</MessagesEl>
	)
}
const Message = ({ message, name }) => {
	const { user } = useContext(UserContext)
	return (
		<MessageEl>
			<div className="user">
				<span>{message.user_id === user.user_id ? "Я" : "Клиент " + name}</span>
				<span className="timestamp">
					{formatDistanceToNow(new Date(message.timestamp * 1000), {
						locale: ru,
					})}{" "}
					назад
				</span>
			</div>
			<p className="text">{message.text}</p>
		</MessageEl>
	)
}

const MessageEl = styled.div`
	border-radius: 4px;
	box-shadow: rgba(0, 0, 0, 0.7) 0px 0px 1px;
	margin-bottom: 15px;
	padding: 10px;
	.user {
		.timestamp {
			margin-left: 10px;
		}
		span {
			font-size: 0.8rem;
		}
	}
`

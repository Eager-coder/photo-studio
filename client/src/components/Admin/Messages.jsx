import { useState, useContext } from "react"
import styled from "styled-components"
import { getOrders } from "../../api/admin/order"
import { postMessage, deleteMessage } from "../../api/user/message"
import { UserContext } from "../../App"
import { formatDistanceToNow } from "date-fns"
import { ru } from "date-fns/locale"
import Modal from "../Modal"

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
						<Message
							key={message.id}
							message={message}
							name={order.name}
							setOrders={setOrders}
						/>
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
				<button onClick={handleMessage} className="send">
					Отправить
				</button>
			</div>
		</MessagesEl>
	)
}
const Message = ({ message, name, setOrders }) => {
	const { user } = useContext(UserContext)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

	const handleDelete = async () => {
		const { isSuccess } = await deleteMessage(message.id)
		if (isSuccess) {
			const { data } = await getOrders()
			setOrders(data)
		}
	}

	return (
		<MessageEl>
			<div className="user">
				<div className="info">
					<span>
						{message.user_id === user.user_id ? "Я" : "Клиент " + name}
					</span>

					<span className="timestamp">
						{formatDistanceToNow(new Date(message.timestamp * 1000), {
							locale: ru,
						})}{" "}
						назад
					</span>
				</div>
				<div className="delete">
					<button className="delete" onClick={() => setIsDeleteModalOpen(true)}>
						Удалить
					</button>
				</div>
			</div>
			<p className="text">{message.text}</p>
			{isDeleteModalOpen && (
				<Modal>
					<h2>Удалить сообщение?</h2>
					<p>{message.text}</p>
					<div className="buttons">
						<button
							className="cancel"
							onClick={() => setIsDeleteModalOpen(false)}>
							Отмена
						</button>
						<button className="submit" onClick={handleDelete}>
							Удалить
						</button>
					</div>
				</Modal>
			)}
		</MessageEl>
	)
}
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
	button.send {
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
const MessageEl = styled.div`
	border-radius: 4px;
	box-shadow: rgba(0, 0, 0, 0.7) 0px 0px 1px;
	margin-bottom: 15px;
	padding: 10px;
	.user {
		display: flex;
		justify-content: space-between;
		.timestamp {
			margin-left: 10px;
		}
		span {
			font-size: 0.8rem;
		}
		button.delete {
			border: none;
			background: none;
			color: red;
			cursor: pointer;
		}
	}
`

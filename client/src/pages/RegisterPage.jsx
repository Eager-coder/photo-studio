import { useState, useContext } from "react"
import styled from "styled-components"
import { register } from "../api/user/auth"
import { UserContext } from "../App"
import { useHistory } from "react-router-dom"
import { motion } from "framer-motion"
import { animationOne, transition } from "../animations"

export default function RegisterPage() {
	const [form, setForm] = useState({
		name: "",
		surname: "",
		telNumber: "",
		password: "",
		password2: "",
	})
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState(null)
	const { user, setUser } = useContext(UserContext)
	const history = useHistory()
	const handleSubmit = async e => {
		e.preventDefault()
		console.log(form)
		const { message, data, isSuccess } = await register(form)

		if (isSuccess) {
			setUser({ isLoggedIn: true, ...data })
			history.push("/")
		} else {
			setMessage(message)
		}
	}
	return (
		<motion.div
			initial="out"
			animate="in"
			exit="out"
			variants={animationOne}
			transition={transition}>
			<RegisterEl>
				<div className="flex">
					<div className="image">
						<img
							src="https://petapixel.com/assets/uploads/2014/03/photog1.jpg"
							alt=""
						/>
					</div>
					<form onSubmit={handleSubmit}>
						<h1>Регистрация</h1>
						<input
							type="text"
							value={form.name}
							onChange={e =>
								setForm(prev => ({ ...prev, name: e.target.value }))
							}
							placeholder="Имя"
						/>
						<input
							type="text"
							value={form.surname}
							onChange={e =>
								setForm(prev => ({ ...prev, surname: e.target.value }))
							}
							placeholder="Фамиля"
						/>
						<input
							type="tel"
							value={form.telNumber}
							onChange={e =>
								setForm(prev => ({ ...prev, telNumber: e.target.value }))
							}
							placeholder="Тел. номер"
						/>
						<input
							type="password"
							value={form.password}
							onChange={e =>
								setForm(prev => ({ ...prev, password: e.target.value }))
							}
							placeholder="Пароль"
						/>
						<input
							type="password"
							value={form.password2}
							onChange={e =>
								setForm(prev => ({ ...prev, password2: e.target.value }))
							}
							placeholder="Подтвердите пароль"
						/>
						{message && <p className="message">{message}</p>}

						<button type="submit">Регистрация</button>
					</form>
				</div>
			</RegisterEl>
		</motion.div>
	)
}
const RegisterEl = styled.div`
	max-width: 1200px;
	margin: auto;
	.flex {
		box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.1);
		margin: auto;
		margin-top: 50px;
		display: flex;
		max-width: 900px;
		min-height: 500px;
		border-radius: 8px;
		overflow: hidden;
		background: white;
		.image {
			width: 50%;
			height: inherit;
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
		form {
			width: 50%;
			padding: 50px;
			h1 {
				margin-bottom: 50px;
			}
			input {
				display: block;
				width: 100%;
				margin-bottom: 20px;
				height: 30px;
				font-size: 1.2rem;
				border: none;
				border-bottom: 2px black solid;
			}
			p.message {
				background-color: rgba(248, 215, 218, 1);
				border: rgba(220, 53, 69, 1) 1px solid;
				color: rgba(114, 28, 36, 1);
				padding: 10px;
				border-radius: 4px;
			}
			button {
				margin-top: 50px;
				padding: 10px 20px;
				width: 100%;
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
	@media (max-width: 768px) {
		.flex {
			height: max-content;
			flex-direction: column-reverse;
			overflow: visible;
			.image,
			form {
				width: 100%;
			}
		}
	}
`

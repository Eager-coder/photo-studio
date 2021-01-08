import { useState, useContext } from "react"
import styled from "styled-components"
import { login } from "../api/user/auth"
import { UserContext } from "../App"
import { useHistory } from "react-router-dom"
import Loading from "../components/Loading"
import { motion } from "framer-motion"
import { animationOne, transition } from "../animations"
const LoginEl = styled.div`
	max-width: 1200px;
	margin: auto;
	.flex {
		box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.1);
		margin: auto;
		margin-top: 50px;
		display: flex;
		max-width: 900px;
		height: 500px;
		border-radius: 8px;
		overflow: hidden;
		background: white;
		.image {
			width: 50%;
			height: 100%;
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
				margin-top: 30px;
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
			flex-direction: column;
			overflow: visible;
			.image,
			form {
				width: 100%;
			}
		}
	}
`
export default function LoginPage() {
	const [form, setForm] = useState({
		telNumber: "",
		password: "",
	})
	const { user, setUser } = useContext(UserContext)
	const history = useHistory()
	const [message, setMessage] = useState(null)
	const [loading, setLoading] = useState(false)

	const handleSubmit = async e => {
		e.preventDefault()
		setLoading(true)
		const { data, message, isSuccess } = await login(form)
		if (isSuccess) {
			setUser({ ...data, isLoggedIn: true })
			console.log(data)
			history.push("/user")
		} else {
			setLoading(false)
			setMessage(message)
		}
	}
	return !loading ? (
		<motion.div
			initial="out"
			animate="in"
			exit="out"
			variants={animationOne}
			transition={transition}>
			<LoginEl>
				<div className="flex">
					<form onSubmit={handleSubmit}>
						<h1>Войти</h1>
						<input
							type="tel"
							value={form.telNumber}
							onChange={e =>
								setForm(prev => ({ ...prev, telNumber: e.target.value }))
							}
							placeholder="Номер"
						/>
						<input
							type="password"
							value={form.password}
							onChange={e =>
								setForm(prev => ({ ...prev, password: e.target.value }))
							}
							placeholder="Пароль"
						/>
						{message && <p className="message">{message}</p>}
						<button type="submit">Войти</button>
					</form>
					<div className="image">
						<img src="/assets/images/photo.jpeg" alt="" />
					</div>
				</div>
			</LoginEl>
		</motion.div>
	) : (
		<Loading size={100} bottom={200} />
	)
}

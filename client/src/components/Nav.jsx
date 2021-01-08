import { useState, useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import styled from "styled-components"
import { logout } from "../api/user/auth"
const NavEl = styled.nav`
	width: 100%;
	margin: auto;
	display: flex;
	justify-content: center;
	.nav-container {
		width: 100%;
		max-width: 1300px;
		padding: 0 50px;
		height: 5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		@media (max-width: 768px) {
			margin-top: 0;
			padding: 20px;
			height: max-content;
			display: block;
		}
	}
	.burger-btn {
		cursor: pointer;
		display: none;
		position: absolute;
		top: 30px;
		right: 20px;
		@media (max-width: 768px) {
			display: block;
		}
		img {
			width: 30px;
			height: 30px;
		}
	}
`
const HomeLink = styled.div`
	width: max-content;
	a {
		font-weight: 700;
		font-size: 3rem;
		color: black !important;
	}
`
const NavLinks = styled.ul`
	display: flex;
	align-items: center;
	height: 100%;
	li {
		margin: 0 15px;
		a {
			font-weight: 500;
			color: black;
			padding: 2px 5px;
			font-size: 1rem;
			text-transform: uppercase;
			:hover {
				border-bottom: 2px black solid;
			}
		}
	}
	span.tilde {
		font-size: 2rem;
		position: relative;
		top: -5px;
	}
	.exit {
		display: flex;
		align-items: center;
		font-size: 1rem;
		text-transform: uppercase;
		cursor: pointer;
		:hover {
			border-bottom: 2px black solid;
		}
		img {
			width: 20px;
			margin-left: 10px;
		}
	}
	@media (max-width: 768px) {
		overflow: hidden;
		transition: 0.3s;
		height: ${({ isNavOpen, height }) => (isNavOpen ? height + "px" : 0)};
		flex-direction: column;
		li {
			margin: 15px 0;
		}
		span.tilde {
			display: none;
		}
	}
`
export default function Navbar({ user, setUser }) {
	const [isNavOpen, setIsNavOpen] = useState(false)
	const ref = useRef()
	const history = useHistory()
	const handleLogout = async () => {
		await logout()
		setUser({ isLoggedIn: false })
		history.push("/login")
	}
	return (
		<NavEl>
			<div className="nav-container">
				<HomeLink>
					<Link to="/">Vershinin</Link>
				</HomeLink>
				<NavLinks
					isNavOpen={isNavOpen}
					ref={ref}
					height={ref?.current?.scrollHeight}>
					<li>
						<Link to="/portfolio">Портфолио</Link>
					</li>
					<span className="tilde">~</span>
					<li>
						<Link to="/price">Прайс</Link>
					</li>
					<span className="tilde">~</span>
					{user.isLoggedIn ? (
						<>
							<li>
								<Link to={user.isAdmin ? "/admin/calendar" : "/user"}>
									Аккаунт
								</Link>
							</li>
							<span className="tilde">~</span>
							<li onClick={handleLogout} className="exit">
								Выход
								<img src="/assets/icons/logout.svg" alt="" />
							</li>
						</>
					) : (
						<>
							<li>
								<Link to="/login">Логин</Link>
							</li>
							<span className="tilde">~</span>
							<li>
								<Link to="/register">Регистрация</Link>
							</li>
						</>
					)}
				</NavLinks>
				<div className="burger-btn" onClick={() => setIsNavOpen(!isNavOpen)}>
					<img src="/assets/icons/burger.svg" alt="" />
				</div>
			</div>
		</NavEl>
	)
}

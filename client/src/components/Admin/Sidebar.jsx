import { Link } from "react-router-dom"
import styled from "styled-components"

const SideNav = styled.aside`
	border-radius: 7px;
	margin-right: 100px;
	width: 250px;
	height: max-content;
	* {
		font-family: "Montserrat", sans-serif;
		font-weight: 600;
	}
	.links {
		list-style: none;
		li {
			width: max-content;
			a {
				display: block;
				width: max-content;
				margin: 10px 0;
				font-size: 1.4rem;
				color: black;
			}
		}
	}

	.link-active {
		a {
			border-left: #70c7a7 4px solid;
			padding-left: 20px;
			color: #70c7a7 !important;
		}
	}
	@media (max-width: 1024px) {
		margin-right: 50px;
	}
	@media (max-width: 768px) {
		width: 100%;
		margin-bottom: 20px;
		.links {
			display: flex;
			justify-content: space-between;
			overflow-x: auto;
			> :last-child {
				margin-right: 0 !important;
			}
			li {
				margin-right: 25px;
				a {
					font-size: 1rem;
				}
			}
		}
		.link-active {
			a {
				border-left: none;
				padding-left: 0px;
				color: #70c7a7;
			}
		}
	}
`
export default function Sidebar({ section }) {
	return (
		<SideNav>
			<ul className="links">
				<li className={section === "calendar" ? "link-active" : "link"}>
					<Link to="/admin/calendar">Календарь событий</Link>
				</li>
				<li className={section === "orders" ? "link-active" : "link"}>
					<Link to="/admin/orders">Все заказы</Link>
				</li>
			</ul>
		</SideNav>
	)
}

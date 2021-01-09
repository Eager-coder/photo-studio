import React from "react"
import styled from "styled-components"
const FooterEl = styled.footer`
	padding: 50px 0 20px 0;
	max-width: 1200px;
	margin: auto;
	.media-link {
		display: flex;
		justify-content: center;
		margin-bottom: 5px;
		a {
			color: black;
			font-weight: 600;
			font-size: 1.1rem;
			:hover {
				text-decoration: underline;
			}
		}
	}
	p {
		text-align: center;
		font-size: 1.1rem;
	}
`
export default function Footer() {
	return (
		<FooterEl>
			<div className="media-link">
				<a
					href="https://www.instagram.com/vershininkz87/?hl=en"
					target="_blank">
					©Александр Вершинин 2021
				</a>
			</div>
			<p>Семейная и свадебная съёмка премиального качества.</p>
		</FooterEl>
	)
}

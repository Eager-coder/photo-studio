import ReactDom from "react-dom"
import styled from "styled-components"
const ModalContainer = styled.div`
	position: fixed;
	background: rgba(0, 0, 0, 0.5);
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	justify-content: center;

	.container {
		width: max-content;
		padding: 25px;
		border-radius: 4px;
		background-color: white;
		filter: brightness(${({ darken }) => (darken ? "0.7" : "1")});
		p.message {
			margin-top: 20px;
			font-size: 1.2rem;
			color: red;
			padding: 10px;
			border: #df0000 2px solid;
			border-radius: 7px;
		}
		textarea {
			width: 600px;
			height: 300px;
			font-size: 1.1rem;
		}
	}
	.modal-wrapper {
		h2 {
			font-size: 2.5rem;
		}
		h3 {
			font-size: 2rem;
			margin-top: 20px;
		}
		input[type="text"],
		input[type="number"],
		input[type="date"],
		input[type="time"],
		select {
			border-radius: 4px;
			border: none;
			box-shadow: rgb(224, 224, 224) 0px 0px 0px 1px,
				rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(0, 0, 0, 0.1) 0px 1px 1.5px 0px;
			padding: 0 10px;
		}
		input[type="text"] {
			width: 100%;
			height: 30px;
			font-size: 1.2rem;
		}
		input[type="number"] {
			height: 30px;
			font-size: 1.5rem;
		}
		input[type="date"],
		input[type="time"] {
			height: 30px;
			font-size: 1.5rem;
		}
		select {
			font-size: 1.2rem;
			margin-top: 10px;
		}
		label {
			display: block;
			margin: 10px 0;
		}
		span {
			font-size: 1.2rem;
		}
		input[type="radio"] {
			margin-right: 10px;
		}
	}
	.buttons {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 20px;
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
		}
		button.submit {
			background: #353535;
			color: #fff;
			text-decoration: none;
		}
	}
	@media (max-width: 768px) {
		.container {
			width: calc(100% - 40px);
			textarea {
				width: 100%;
				font-size: 0.95rem;
			}
			input {
				width: 100%;
			}
		}
	}
`
export default function Modal({ children, darken }) {
	return ReactDom.createPortal(
		<ModalContainer darken={darken}>
			<div className="container">
				<div className="content">{children}</div>
			</div>
		</ModalContainer>,
		document.querySelector(".App")
	)
}

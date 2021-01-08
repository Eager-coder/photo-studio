import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { animationOne, transition } from "../animations"

const PortfolioEl = styled.div`
	max-width: 1200px;
	margin: 20px auto;
	h1 {
		font-size: 3rem;
		font-weight: 500;
		margin-bottom: 50px;
	}
	.flex {
		display: flex;
		justify-content: space-between;
		.card {
			width: 30%;
			img {
				width: 100%;
				height: 350px;
				object-fit: cover;
			}
			h2 {
				font-size: 1.5rem;
				font-weight: 400;
				text-align: center;
				color: black;
			}
		}
	}
	@media (max-width: 768px) {
		.flex {
			display: block;
			.card {
				display: block;
				width: 100%;
				margin-bottom: 30px;
			}
		}
	}
`
export default function PortfolioPage() {
	return (
		<motion.div
			initial="out"
			animate="in"
			exit="out"
			variants={animationOne}
			transition={transition}>
			<PortfolioEl>
				<h1>Портфолио</h1>
				<div className="flex">
					<Link to="/portfolio/portrait" className="card">
						<img src="/assets/images/portraits/portrait1.jpg" alt="" />
						<h2>Индивидуальная</h2>
					</Link>
					<Link to="/portfolio/family" className="card">
						<img
							src="https://res.cloudinary.com/turan-cloud/image/upload/v1610120077/photo-studio/family/family7.jpg"
							alt=""
						/>
						<h2>Семейная</h2>
					</Link>
					<Link to="/portfolio/wedding" className="card">
						<img src="/assets/images/wedding/wedding3.jpg" alt="" />
						<h2>Свадебная</h2>
					</Link>
				</div>
			</PortfolioEl>
		</motion.div>
	)
}

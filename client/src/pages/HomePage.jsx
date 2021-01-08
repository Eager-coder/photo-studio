import { motion } from "framer-motion"
import React from "react"
import styled from "styled-components"
import { animationOne, transition } from "../animations"
import EmblaCarousel from "../components/Home/Carousel"

const HomeEl = styled.section``
export default function HomePage() {
	return (
		<motion.div
			initial="out"
			animate="in"
			exit="out"
			variants={animationOne}
			transition={transition}>
			<HomeEl>
				<EmblaCarousel />
			</HomeEl>
		</motion.div>
	)
}

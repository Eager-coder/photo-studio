import { useState, useCallback } from "react"
import styled from "styled-components"
import {
	portraitsUlrs,
	weddingUlrs,
	familyUlrs,
} from "../components/Portfolio/media"
import Gallery from "react-photo-gallery"
import Carousel, { Modal, ModalGateway } from "react-images"
import { motion } from "framer-motion"
import { animationOne, transition } from "../animations"

const PageEl = styled.div`
	max-width: 1200px;
	margin: auto;
	h1 {
		font-size: 3rem;
		font-weight: 500;
		margin-bottom: 50px;
		text-align: center;
	}
`

export default function PorfolioSectionPage({ match }) {
	const { section } = match.params
	let photos = []
	let header = ""
	const [currentImage, setCurrentImage] = useState(0)
	const [viewerIsOpen, setViewerIsOpen] = useState(false)

	const openLightbox = useCallback((event, { photo, index }) => {
		setCurrentImage(index)
		setViewerIsOpen(true)
	}, [])

	const closeLightbox = () => {
		setCurrentImage(0)
		setViewerIsOpen(false)
	}
	switch (section) {
		case "portrait":
			photos = portraitsUlrs
			header = "Индивидуальная"
			break
		case "wedding":
			photos = weddingUlrs
			header = "Свадебная"
			break
		case "family":
			photos = familyUlrs
			header = "Семейная"
			break
	}

	console.log(photos)
	return (
		<motion.div
			initial="out"
			animate="in"
			exit="out"
			variants={animationOne}
			transition={transition}>
			<PageEl>
				<h1>{header}</h1>
				<Gallery photos={photos} onClick={openLightbox} />
				<ModalGateway>
					{viewerIsOpen ? (
						<Modal onClose={closeLightbox}>
							<Carousel
								currentIndex={currentImage}
								views={photos.map(x => ({ ...x, srcSet: x.srcSet }))}
								styles={{
									view: () => ({
										"& > img": {
											height: "100vh",
											width: "99%",
											objectFit: "contain",
										},
									}),
								}}
							/>
						</Modal>
					) : null}
				</ModalGateway>
			</PageEl>
		</motion.div>
	)
}

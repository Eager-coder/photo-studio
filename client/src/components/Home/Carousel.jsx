import React, { useState, useEffect, useCallback } from "react"
import { PrevButton, NextButton } from "./CarouselButtons"
import { useEmblaCarousel } from "embla-carousel/react"
import { media } from "./media"
import styled from "styled-components"

const EmblaCarousel = () => {
	const [viewportRef, embla] = useEmblaCarousel()
	const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
	const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

	const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla])
	const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla])
	const onSelect = useCallback(() => {
		if (!embla) return
		setPrevBtnEnabled(embla.canScrollPrev())
		setNextBtnEnabled(embla.canScrollNext())
	}, [embla])

	useEffect(() => {
		if (!embla) return
		embla.on("select", onSelect)
		onSelect()
	}, [embla, onSelect])

	return (
		<CarouselEl>
			<div className="embla__viewport" ref={viewportRef}>
				<div className="embla__container">
					{media.map((image, index) => (
						<div className="embla__slide" key={index}>
							<div className="embla__slide__inner">
								<img className="embla__slide__img" src={image} alt="" />
							</div>
						</div>
					))}
				</div>
			</div>
			<PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
			<NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
		</CarouselEl>
	)
}

export default EmblaCarousel

const CarouselEl = styled.div`
	position: relative;
	background-color: #f7f7f7;
	max-width: 1200px;
	margin-left: auto;
	margin-right: auto;

	.embla__viewport {
		overflow: hidden;
		width: 100%;
	}

	.embla__viewport.is-draggable {
		cursor: move;
		cursor: grab;
	}

	.embla__viewport.is-dragging {
		cursor: grabbing;
	}

	.embla__container {
		display: flex;
		user-select: none;
		-webkit-touch-callout: none;
		-khtml-user-select: none;
		-webkit-tap-highlight-color: transparent;
		margin-left: -10px;
	}

	.embla__slide {
		position: relative;
		min-width: 100%;
		padding-left: 10px;
	}

	.embla__slide__inner {
		position: relative;
		overflow: hidden;
		height: 800px;
	}

	.embla__slide__img {
		position: absolute;
		display: block;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: 100%;
		width: 100%;
		object-fit: cover;
	}

	.embla__button {
		outline: 0;
		cursor: pointer;
		background-color: transparent;
		touch-action: manipulation;
		position: absolute;
		z-index: 1;
		top: 50%;
		transform: translateY(-50%);
		border: 0;
		width: 40px;
		height: 40px;
		justify-content: center;
		align-items: center;
		fill: #ffffff;
		padding: 0;
	}

	.embla__button:disabled {
		cursor: default;
		opacity: 0.3;
	}

	.embla__button__svg {
		width: 100%;
		height: 100%;
	}

	.embla__button--prev {
		left: 27px;
	}

	.embla__button--next {
		right: 27px;
	}
`

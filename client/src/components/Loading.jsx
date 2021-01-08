import ClipLoader from "react-spinners/ClipLoader"
import styled from "styled-components"

const LoadingEl = styled.div`
	position: fixed;
	top: 0;
	bottom: ${({ bottom }) => bottom}px;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`
export default function Loading({ size, bottom }) {
	return (
		<LoadingEl bottom={bottom || 0}>
			<ClipLoader color="#70c7a7" size={size || 50} />
		</LoadingEl>
	)
}

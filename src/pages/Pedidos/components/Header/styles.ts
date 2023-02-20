import styled from 'styled-components';

export const Container = styled.header`
	background: #2d96ff;
	display: flex;
	justify-content: center;
	height: 198px;
	align-items: center;
`;

export const Content = styled.div`
	width: 100%;
	max-width: 1216px;
	display: flex;
	align-items: center;
	justify-content: space-between;

	.page-details {
		h1 {
			color: #fff;
			font-size: 32px;
		}

		h2 {
			color: #fff;
			font-weight: 400;
			font-size: 16px;
			opacity: 0.9;
			margin-top: 6px;
		}
	}

	.title {
		font-size: 40px;
		color: #fff;
	}

	img {
			max-width: 200px;
			max-height: 200px;
	}

	button {
		margin-right: 8px;
		border:none!important;
    	background-color: transparent!important;
	}
`;

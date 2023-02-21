import styled from 'styled-components';

export const Board = styled.div`
	padding: 16px;
	border: 1px solid rgba(204, 204, 204, 0.4);
	border-radius: 16px;
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;

	header {
		width: 100%;
		max-width: 1216px;
		display: flex;
		align-items: center;
		justify-content: space-between;

		div {
			gap: 8px;
			padding: 8px;
			display: flex;
			align-items: center;
		}

		button {
			all: unset;
			cursor: pointer;
		}
	}
`;

export const ProductsContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: 24px;

	button {
		background: #fff;
		border: 1px solid rgba(204, 204, 204, 0.4);
		height: 128px;
		border-radius: 8px;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		gap: 4px;
		padding: 0 24px;

		strong {
			font-weight: 500;
		}

		span {
			font-size: 14px;
			color: #666;
		}

		& + button {
			margin-top: 24px;
		}
	}
`;

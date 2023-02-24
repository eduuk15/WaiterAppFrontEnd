import styled from 'styled-components';

export const Overlay = styled.div`
	left: 0;
	top: 0;
	background: rgba(0, 0, 0, 0.8);
	backdrop-filter: blur(4.5px);
	width: 100%;
	height: 100%;
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const ModalBody = styled.div`
	width: 480px;
	max-height: 90vh;
	overflow-y: auto;
	border-radius: 8px;
	background-color: #fff;
	padding: 32px;

	&::-webkit-scrollbar {
		width: 10px;
	}

	&::-webkit-scrollbar-track {
  		background-color: #fff;
		border-radius: 8px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: #2d96ff;
		border-radius: 8px;
	}

	header {
		display: flex;
		align-items: center;
		justify-content: space-between;

		strong {
			font-size: 24px;
		}

		button {
			line-height: 0;
			border: 0;
			background: transparent;
		}
	}

	.status-container {
		margin-top: 32px;

		small {
			font-size: 14px;
			opacity: 0.8;
		}

		div {
			margin-top: 8px;
			display: flex;
			align-items: center;
			gap: 8px;
		}
	}

	.info-container {
		margin-top: 32px;

		small {
			font-size: 14px;
			opacity: 0.8;
		}

		div {
			margin-top: 8px;
			display: flex;
			align-items: center;
			gap: 8px;
		}
	}

	.delivery-container {
		margin-top: 32px;

		small {
			font-size: 14px;
			opacity: 0.8;
		}

		div {
			margin-top: 8px;
			display: flex;
			align-items: center;
			gap: 8px;
		}
	}
`;

export const ProductDetails = styled.div`
	margin-top: 32px;

	> strong {
		font-weight: 500;
		font-size: 14px;
		opacity: 0.8;
	}

	.order-items {
		margin-top: 16px;

		.item {
			display: flex;

			& + .item {
				margin-top: 16px;
			}

			img {
				border-radius: 6px;
			}

			.quantity {
				font-size: 14px;
				color: #666;
				display: block;
				min-width: 20px;
				margin-left: 12px;
			}

			.product-details {
				margin-left: 4px;

				strong {
					display: block;
					margin-bottom: 4px;
				}

				span {
					font-size: 14px;
					color: #666;
				}
			}
		}
	}

	.total {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 24px;

		span {
			font-weight: 500;
			font-size: 14px;
			opacity: 0.8;
		}
	}
`;

export const Actions = styled.footer`
	display: flex;
	flex-direction: column;
	margin-top: 32px;

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.primary  {
		background: #333333;
		border-radius: 48px;
		border: 0;
		color: #fff;
		padding: 12px 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
	}

	.secondary {
		padding: 14px 24px;
		color: #2d96ff;
		font-weight: bold;
		border: 0;
		background: transparent;
		margin-top: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
	}
`;

export const Input = styled.input`
	background: #FFFFFF;
	border: 1px solid rgba(204, 204, 204, 0.5);
	border-radius: 8px;
	padding: 16px;
	width: 100%;
`;

export const Select = styled.select`
	background: #FFFFFF;
	border: 1px solid rgba(204, 204, 204, 0.5);
	border-radius: 8px;
	padding: 16px;
	width: 100%;
`;

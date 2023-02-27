import { useEffect } from 'react';
import { Order } from '../../../../types/Order';
import { formatCurrency } from '../../../../utils/formatCurrency';
import closeIcon from '../../../../assets/images/close-icon.svg';

import { Overlay, ModalBody, OrderDetails, Actions } from './styles';

interface OrderModalProps {
	visible: boolean;
	order: Order | null;
	onClose: () => void;
	onCancelOrder: () => Promise<void>;
	isLoading: boolean;
	onChangeOrderStatus: () => void;
}

export function OrderModal({ visible, order, onClose, onCancelOrder, isLoading, onChangeOrderStatus }: OrderModalProps) {
	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key == 'Escape') {
				onClose();
			}
		}
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [onClose]);

	if (!visible || !order) {
		return null;
	}

	const total = order.products.reduce((total, { product }) => {
		return total + (parseFloat(product.price));
	}, 0);

	const ddd = order.infoPedido.phone.slice(0, 2);
	const formatedPhone = `${order.infoPedido.phone.slice(2, 7)}-${order.infoPedido.phone.slice(7, 11)}`;

	return (
		<Overlay>
			<ModalBody>
				<header>
					<strong>Pedido</strong>
					<button type="button" onClick={onClose}>
						<img src={closeIcon} alt="Ícone de fechar" />
					</button>
				</header>

				<div className="status-container">
					<small>Status do pedido</small>
					<div>
						<span>
							{order.status === 'WAITING' && '⌛'}
							{order.status === 'DONE' && '✅'}
						</span>
						<strong>
							{order.status === 'WAITING' && 'Fila de espera'}
							{order.status === 'DONE' && 'Pronto!'}
						</strong>
					</div>
				</div>

				<div className="info-container">
					<small>Informações do cliente</small>
					<div>
						<span>🧑</span>
						<strong>{order.infoPedido.fullName}</strong>
					</div>
					<div>
						<span>📞</span>
						<strong>({ddd}) {formatedPhone}</strong>
					</div>
					<div>
						<span>📍</span>
						<strong>{order.infoPedido.address}</strong>
					</div>
				</div>

				<div className="delivery-container">
					<small>Forma de recebimento</small>
					<div>
						<span>📦</span>
						<strong>{order.entrega ? 'Entrega' : 'Retirada'}</strong>
					</div>
				</div>

				<OrderDetails>
					<strong>Itens</strong>

					<div className="order-items">
						{order.products.map(({_id, product}) => (
							<div className="item" key={_id}>
								<img
									src={`http://localhost:3001/uploads/${product.imagePath}`}
									alt={product.name}
									width="93.22"
									height="47.46"
								/>

								<div className="product-details">
									<strong>{product.name}</strong>
									<strong>{product.flavor}</strong>
									<span>{formatCurrency(parseFloat(product.price))}</span>
								</div>
							</div>
						))}
					</div>

					<div className="total">
						<span>Total</span>
						<strong>{formatCurrency(total)}</strong>
					</div>
				</OrderDetails>

				<Actions>
					{order.status !== 'DONE' && (
						<button type="button" className="primary" disabled={isLoading} onClick={onChangeOrderStatus}>
							<span>
								{order.status === 'WAITING' && '✅'}
							</span>
							<strong>
								{order.status === 'WAITING' && 'Concluir Pedido'}
							</strong>
						</button>
					)}

					<button
						type="button"
						className="secondary"
						onClick={onCancelOrder}
					>
						{order.status === 'WAITING' && 'Cancelar Pedido'}
						{order.status === 'DONE' && 'Remover'}
					</button>
				</Actions>
			</ModalBody>
		</Overlay>
	);
}

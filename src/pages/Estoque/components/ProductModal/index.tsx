import { useEffect, useState } from 'react';
import { formatCurrency } from '../../../../utils/formatCurrency';
import closeIcon from '../../../../assets/images/close-icon.svg';

import { Overlay, ModalBody, Actions } from './styles';
import { Product } from '../../../../types/Product';
import { api } from '../../../../utils/api';
import { toast } from 'react-toastify';
import { Order } from '../../../../types/Order';

interface ProductModalProps {
	visible: boolean;
	product: Product | null;
	onClose: () => void;
	isLoading: boolean;
	category: string;
	resetProducts: () => void;
	onOpenEditProductModal: () => void;
}

export function ProductModal({ visible, product, onClose, isLoading, category, resetProducts, onOpenEditProductModal }: ProductModalProps) {
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

	if (!visible || !product) {
		return null;
	}

	function handleRemoveProduct() {
		api.get('/orders')
			.then(({ data }) => {
				const ordersProducts: Product[] = [];
				data.forEach((order: Order) => {
					order.products.forEach((product) => {
						ordersProducts.push(product.product);
					});
				});
				const ordersWithSelectedProduct = ordersProducts.filter((orderProduct: Product) => orderProduct._id === product?._id);

				if (ordersWithSelectedProduct.length <= 0) {
					api.delete(`/products/${product?._id}`);
					toast.success('Produto removido com sucesso!');
					onClose();
					resetProducts();
				} else {
					toast.error('Esse produto atualmente está vinculado a um pedido! Não é possível removê-lo...');
				}
			});
	}


	return (
		<Overlay>
			<ModalBody>
				<header>
					<strong>{product.name}</strong>
					<button type="button" onClick={onClose}>
						<img src={closeIcon} alt="Ícone de fechar" />
					</button>
				</header>

				<div className="info-container">
					<small>Sabor</small>
					<div>
						<strong>{product.flavor}</strong>
					</div>
				</div>
				<div className="info-container">
					<small>Preço</small>
					<div>
						<strong>{formatCurrency(parseFloat(product.price))}</strong>
					</div>
				</div>
				<div className="info-container">
					<small>Marca</small>
					<div>
						<strong>{product.brand}</strong>
					</div>
				</div>
				<div className="info-container">
					<small>Categoria</small>
					<div>
						<strong>{category}</strong>
					</div>
				</div>

				<Actions>
					<button
						type="button"
						className="primary"
						disabled={isLoading}
						onClick={onOpenEditProductModal}
					>
						<span>✏️</span>
						<strong>Editar produto</strong>
					</button>

					<button
						type="button"
						className="secondary"
						onClick={handleRemoveProduct}
					>
						<span>🗑️</span>
						<strong>Remover produto</strong>
					</button>
				</Actions>
			</ModalBody>
		</Overlay>
	);
}

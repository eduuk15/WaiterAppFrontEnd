import { useEffect } from 'react';
import { formatCurrency } from '../../../../utils/formatCurrency';
import closeIcon from '../../../../assets/images/close-icon.svg';

import { Overlay, ModalBody, ProductDetails, Actions } from './styles';
import { Product } from '../../../../types/Product';

interface ProductModalProps {
	visible: boolean;
	product: Product | null;
	onClose: () => void;
	isLoading: boolean;
}

export function ProductModal({ visible, product, onClose, isLoading }: ProductModalProps) {
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
					<small>Informações do produto</small>
					<div>
						<span>👅</span>
						<strong>{product.flavor}</strong>
					</div>
					<div>
						<span>💸</span>
						<strong>{formatCurrency(product.price)}</strong>
					</div>
					<div>
						<span>🔗</span>
						<strong>{product.brand}</strong>
					</div>
					<div>
						<span>📋</span>
						<strong>{product.category}</strong>
					</div>
				</div>

				<Actions>
					<button
						type="button"
						className="primary"
						disabled={isLoading}
						onClick={() => console.log('')}
					>
						<span>✏️</span>
						<strong>Editar produto</strong>
					</button>

					<button
						type="button"
						className="secondary"
						onClick={() => console.log('')}
					>
						<span>🗑️</span>
						<strong>Remover produto</strong>
					</button>
				</Actions>
			</ModalBody>
		</Overlay>
	);
}

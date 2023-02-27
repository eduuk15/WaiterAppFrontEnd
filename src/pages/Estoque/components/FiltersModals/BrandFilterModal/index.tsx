import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import closeIcon from '../../../../../assets/images/close-icon.svg';

import { Overlay, ModalBody, Actions, Input } from './styles';

interface BrandFilterModalProps {
	visible: boolean;
	onClose: () => void;
	onSave: (name: string) => void;
	closeSidebar: () => void;
}

export function BrandFilterModal({ visible, onClose, onSave, closeSidebar }: BrandFilterModalProps) {
	const [brand, setBrand] = useState('');

	function handleFilter() {
		onSave(brand);
		setBrand('');
		onClose();
		closeSidebar();
		toast.success('Produtos filtrados com sucesso!');
	}

	function handleChange(event: any) {
		setBrand(event.target.value);
	}

	useEffect(() => {
		function handleKeydown(event: KeyboardEvent) {
			if (event.key == 'Escape') {
				onClose();
			}
			if (event.key == 'Enter') {
				handleFilter();
			}
		}
		if (visible) {
			document.addEventListener('keydown', handleKeydown);
		}

		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	}, [onClose, handleFilter]);

	if (!visible) {
		return null;
	}

	return (
		<Overlay>
			<ModalBody>
				<header>
					<strong>Filtrar produtos por marca</strong>
					<button type="button" onClick={onClose}>
						<img src={closeIcon} alt="Ícone de fechar" />
					</button>
				</header>

				<div className="info-container">
					<small>Informe a marca do produto</small>
					<div>
						<span>✏️</span>
						<Input type="text" placeholder='Marca' onChange={handleChange} ></Input>
					</div>
				</div>

				<Actions>
					<button
						type="button"
						className="primary"
						onClick={handleFilter}
					>
						<span>🔄</span>
						<strong>Filtrar</strong>
					</button>
				</Actions>
			</ModalBody>
		</Overlay>
	);
}

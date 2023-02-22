import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import closeIcon from '../../../../../assets/images/close-icon.svg';
import { Price } from '../../../../../types/Price';
import { formatCurrency } from '../../../../../utils/formatCurrency';

import { Overlay, ModalBody, Actions, Input } from './styles';

interface PriceFilterModalProps {
	visible: boolean;
	onClose: () => void;
	onSave: (price: Price) => void;
}

export function PriceFilterModal({ visible, onClose, onSave }: PriceFilterModalProps) {
	const [bigger, setBigger] = useState(0);
	const [smaller, setSmaller] = useState(0);
	const [equal, setEqual] = useState(0);

	function handleFilter() {
		onSave({ bigger, smaller, equal, filter: true });
		setBigger(0);
		setSmaller(0);
		setEqual(0);
		onClose();
	}

	function handleChangeBigger(event: any) {
		setBigger(event.target.value);
	}

	function handleChangeSmaller(event: any) {
		setSmaller(event.target.value);
	}

	function handleChangeEqual(event: any) {
		setEqual(event.target.value);
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
					<strong>Filtrar produtos por preço</strong>
					<button type="button" onClick={onClose}>
						<img src={closeIcon} alt="Ícone de fechar" />
					</button>
				</header>

				<div className="info-container">
					<small>Informe o preço do produto</small>
					<div>
						<strong>{'>'}</strong>
						<Input type="number" placeholder='Maior que' onChange={handleChangeBigger}></Input>
					</div>
					<div>
						<strong>{'<'}</strong>
						<Input type="number" placeholder='Menor que' onChange={handleChangeSmaller} ></Input>
					</div>
					<div>
						<strong>{'='}</strong>
						<Input type="number" placeholder='Igual a' onChange={handleChangeEqual} ></Input>
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

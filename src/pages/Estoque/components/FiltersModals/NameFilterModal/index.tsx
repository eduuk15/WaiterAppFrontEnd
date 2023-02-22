import { useEffect, useState } from 'react';
import closeIcon from '../../../../../assets/images/close-icon.svg';

import { Overlay, ModalBody, Actions, Input } from './styles';

interface NameFilterModalProps {
	visible: boolean;
	onClose: () => void;
	onSave: (name: string) => void;
}

export function NameFilterModal({ visible, onClose, onSave }: NameFilterModalProps) {
	const [name, setName] = useState('');

	function handleFilter() {
		onSave(name);
		setName('');
		onClose();
	}

	function handleChange(event: any) {
		setName(event.target.value);
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
					<strong>Filtrar produtos por nome</strong>
					<button type="button" onClick={onClose}>
						<img src={closeIcon} alt="Ícone de fechar" />
					</button>
				</header>

				<div className="info-container">
					<small>Informe o nome do produto</small>
					<div>
						<span>✏️</span>
						<Input type="text" placeholder='Nome' onChange={handleChange} ></Input>
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

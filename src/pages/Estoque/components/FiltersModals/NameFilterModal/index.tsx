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
		setName('');
		onSave(name);
		onClose();
	}

	function handleChange(event: any) {
		setName(event.target.value);
	}

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

	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key == 'Enter') {
				handleFilter();
			}
		}
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleFilter]);

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

import { useEffect, useState } from 'react';
import closeIcon from '../../../../../assets/images/close-icon.svg';
import { api } from '../../../../../utils/api';

import { Overlay, ModalBody, Actions, Select } from './styles';
import { Category } from '../../../../../types/Category';

interface CategoryFilterModalProps {
	visible: boolean;
	onClose: () => void;
	onSave: (name: string) => void;
	categories: Category[];
}

export function CategoryFilterModal({ visible, onClose, onSave, categories }: CategoryFilterModalProps) {
	const [category, setCategory] = useState(categories[0]._id);

	const options = categories.map((category) => {
		return {
			value: category._id,
			label: `${category.icon} ${category.name}`
		};
	});

	function handleFilter() {
		onSave(category);
		setCategory(categories[0]._id);
		onClose();
	}

	function handleChange(event: any) {
		setCategory(event.target.value);
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
					<strong>Filtrar produtos por categoria</strong>
					<button type="button" onClick={onClose}>
						<img src={closeIcon} alt="Ícone de fechar" />
					</button>
				</header>

				<div className="info-container">
					<small>Informe a categoria do produto</small>
					<div>
						<Select onChange={handleChange}>
							{options.map((option) => (
								<option value={option.value} key={option.value}>{option.label}</option>
							))}
						</Select>
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

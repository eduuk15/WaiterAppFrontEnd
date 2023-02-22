import { useEffect, useState } from 'react';
import closeIcon from '../../../../../assets/images/close-icon.svg';
import { api } from '../../../../../utils/api';

import { Overlay, ModalBody, Actions, Input } from './styles';
import { Category } from '../../../../../types/Category';

interface CategoryFilterModalProps {
	visible: boolean;
	onClose: () => void;
	onSave: (name: string) => void;
}

export function CategoryFilterModal({ visible, onClose, onSave }: CategoryFilterModalProps) {
	const [categories, setCategories] = useState<Category[]>([]);
	const [category, setCategory] = useState('');

	useEffect(() => {
		api.get('/categories')
			.then(({ data }) => {
				setCategories(data);
			});
	});

	const options = categories.map((category) => {
		return {
			value: category._id,
			label: `${category.icon} ${category.name}`
		};
	});


	function handleFilter() {
		onSave(category);
		setCategory('');
		onClose();
	}

	function handleChange(event: any) {
		console.log('value', event.target.value);

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
						<span>✏️</span>
						<select onChange={handleChange}>
							{options.map((option) => (
								<option value={option.value} key={option.value}>{option.label}</option>
							))}
						</select>
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

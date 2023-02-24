import { useEffect, useState } from 'react';
import { formatCurrency } from '../../../../utils/formatCurrency';
import closeIcon from '../../../../assets/images/close-icon.svg';

import { Overlay, ModalBody, ProductDetails, Actions, Input, Select } from './styles';
import { Product } from '../../../../types/Product';
import { api } from '../../../../utils/api';
import axios from 'axios';
import { Category } from '../../../../types/Category';
import { toast } from 'react-toastify';
import { refreshPage } from '../../../../utils/refreshPage';

interface EditProductModalProps {
	visible: boolean;
	onClose: () => void;
	resetProducts: () => void;
	categories: Category[];
	selectedProduct: Product;
}

export function EditProductModal({ visible, onClose, resetProducts, categories, selectedProduct }: EditProductModalProps) {
	if (!selectedProduct) {
		return null;
	}

	const [name, setName] = useState(selectedProduct.name);
	const [description, setDescription] = useState(selectedProduct.description);
	const [flavor, setFlavor] = useState(selectedProduct.flavor);
	const [price, setPrice] = useState(selectedProduct.price);
	const [brand, setBrand] = useState(selectedProduct.brand);
	const [category, setCategory] = useState(selectedProduct.category);
	const [image, setImage] = useState<any>('');

	const selectOptions = categories.map((category) => {
		return {
			value: category._id,
			label: `${category.icon} ${category.name}`
		};
	});


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

	if (!visible) {
		return null;
	}

	function handleChangeName(event: any) {
		setName(event.target.value);
	}
	function handleChangeDescription(event: any) {
		setDescription(event.target.value);
	}
	function handleChangeFlavor(event: any) {
		setFlavor(event.target.value);
	}
	function handleChangePrice(event: any) {
		setPrice(event.target.value);
	}
	function handleChangeBrand(event: any) {
		setBrand(event.target.value);
	}
	function handleChangeCategory(event: any) {
		setCategory(event.target.value);
	}
	function handleChangeImage(event: any) {
		setImage(event.target.value);
	}

	function handleEdit() {
		const form = new FormData();
		if (name === '') {
			toast.error('O nome é obrigatório');
			return;
		}
		form.append('name', name);

		if (description === '') {
			toast.error('A descrição é obrigatória');
			return;
		}
		form.append('description', description);

		if (price === 0) {
			toast.error('O preço é obrigatório e não pode ser igual a 0');
			return;
		}
		form.append('price', `${price}`);

		form.append('category', category);

		if (brand === '') {
			toast.error('A marca é obrigatória');
			return;
		}
		form.append('brand', brand);

		if (flavor === '') {
			toast.error('O sabor é obrigatório');
			toast.info('Caso o produto não possua um sabor preencha o campo com ---');
			return;
		}
		form.append('flavor', flavor);

		if (image === '') {
			toast.info('A imagem é obrigatória');
			return;
		}
		form.append('image', document.querySelector('input[type=file]').files[0]);

		const options = {
			mode: 'no-cors',
			method: 'PATCH',
			url: `http://localhost:3001/products/${selectedProduct._id}`,
			data: form
		};

		axios.request(options).then(function (response) {
			console.log(response.data);
		}).catch(function (error) {
			console.error(error);
			toast.error('Erro ao editar pedido!');
		});

		setName('');
		setDescription('');
		setFlavor('');
		setPrice(0);
		setBrand('');
		setCategory(categories[0]._id);
		setImage('');
		resetProducts();
		toast.success('Pedido editado com sucesso!');
		onClose();
	}


	return (
		<Overlay>
			<ModalBody>
				<header>
					<strong>Editar produto</strong>
					<button type="button" onClick={onClose}>
						<img src={closeIcon} alt="Ícone de fechar" />
					</button>
				</header>

				<div className="info-container">
					<small>Nome</small>
					<div>
						<Input type="text" onChange={handleChangeName} required={true} defaultValue={selectedProduct.name}></Input>
					</div>
				</div>
				<div className="info-container">
					<small>Descrição</small>
					<div>
						<Input type="text" onChange={handleChangeDescription} required={true} defaultValue={selectedProduct.description}></Input>
					</div>
				</div>
				<div className="info-container">
					<small>Sabor</small>
					<div>
						<Input type="text" onChange={handleChangeFlavor} required={true} defaultValue={selectedProduct.flavor}></Input>
					</div>
				</div>
				<div className="info-container">
					<small>Preço</small>
					<div>
						<Input type="number" onChange={handleChangePrice} required={true} onWheel={(e) => e.target.blur()} defaultValue={selectedProduct.price}></Input>
					</div>
				</div>
				<div className="info-container">
					<small>Marca</small>
					<div>
						<Input type="text" onChange={handleChangeBrand} required={true} defaultValue={selectedProduct.brand}></Input>
					</div>
				</div>
				<div className="info-container">
					<small>Categoria</small>
					<div>
						<Select onChange={handleChangeCategory} required={true} defaultValue={selectedProduct.category}>
							{selectOptions.map((option) => (
								<option value={option.value} key={option.value}>{option.label}</option>
							))}
						</Select>
					</div>
				</div>
				<div className="info-container">
					<small>Imagem</small>
					<div>
						<Input type="file" onChange={handleChangeImage} required={true}></Input>
					</div>
				</div>

				<Actions>
					<button
						type="button"
						className="primary"
						onClick={handleEdit}
					>
						<span>✏️</span>
						<strong>Editar produto</strong>
					</button>
				</Actions>
			</ModalBody>
		</Overlay>
	);
}

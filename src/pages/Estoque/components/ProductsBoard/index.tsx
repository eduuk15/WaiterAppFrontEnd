import { faFilter, faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Product } from '../../../../types/Product';
import { api } from '../../../../utils/api';
import { formatCurrency } from '../../../../utils/formatCurrency';
import { ProductModal } from '../ProductModal';
import { Board, ProductsContainer } from './styles';

interface ProductsBoardProps {
	icon: string;
	title: string;
	products: Product[];
}

export function ProductsBoard({ icon, title, products }: ProductsBoardProps) {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);
	const [isLoading, setIsLoading] = useState(false);

	function handleOpenModal(product: Product) {
		setIsModalVisible(true);
		setSelectedProduct(product);
	}

	function handleCloseModal() {
		setIsModalVisible(false);
		setSelectedProduct(null);
	}

	return (
		<Board>
			<ProductModal
				visible={isModalVisible}
				product={selectedProduct}
				onClose={handleCloseModal}
				isLoading={isLoading}
			/>
			<header>
				<div>
					<span>{icon}</span>
					<strong>{title}</strong>
					<span>({products.length})</span>
				</div>
				<div>
					<button type="button" onClick={() => console.log('')}>
						<FontAwesomeIcon
							icon={faFilter}
							color="#333"
							size='lg'
						/>
					</button>
					<button type="button" onClick={() => console.log('')}>
						<FontAwesomeIcon
							icon={faSort}
							color="#333"
							size='lg'
						/>
					</button>
				</div>
			</header>

			{products.length > 0 && (
				<ProductsContainer>
					{products.map((product) => (
						<button type="button" key={product._id} onClick={() => handleOpenModal(product)}>
							<img
								src={`http://localhost:3001/uploads/${product.imagePath}`}
								alt={product.name}
								width='120px'
								height='100px'
							/>
							<strong>{product.name}</strong>
							<strong>{product.flavor}</strong>
							<strong>{formatCurrency(product.price)}</strong>
							<strong>{product.brand}</strong>
							<strong>{product.category}</strong>
						</button>
					))}
				</ProductsContainer>
			)}
		</Board>
	);
}

import { faFilter, faPlus, faSort, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Product } from '../../../../types/Product';
import { api } from '../../../../utils/api';
import { formatCurrency } from '../../../../utils/formatCurrency';
import { ProductModal } from '../ProductModal';
import { Board, FilterButton, ProductsContainer } from './styles';
import closeIcon from '../../../../assets/images/close-icon.svg';
import { Category } from '../../../../types/Category';
import { NewProductModal } from '../NewProductModal';
import { refreshPage } from '../../../../utils/refreshPage';
import { EditProductModal } from '../EditProductModal';

interface ProductsBoardProps {
	icon: string;
	title: string;
	products: Product[];
	openSidebar: () => void;
	filter: string;
	onClearFilters: () => void;
	resetProducts: () => void;
	categories: Category[];
	openSortSidebar: () => void;
	sort: string;
	onClearSort: () => void;
}

export function ProductsBoard({ icon, title, products, openSidebar, filter, onClearFilters, resetProducts, categories, openSortSidebar, sort, onClearSort }: ProductsBoardProps) {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isNewProductModalVisible, setIsNewProductModalVisible] = useState(false);
	const [isEditProductModalVisible, setIsEditProductModalVisible] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);
	const [isLoading, setIsLoading] = useState(false);

	function findCategoryName(categoryId: string) {
		const foundCategory = categories.find((category) => category._id === categoryId);
		if (foundCategory) {
			return `${foundCategory.icon}  ${foundCategory.name}`;
		} else {
			return categoryId;
		}
	}

	function handleOpenModal(product: Product) {
		setIsModalVisible(true);
		setSelectedProduct(product);
	}

	function handleCloseModal() {
		setIsModalVisible(false);
		setSelectedProduct(null);
	}

	function handleOpenNewProductModal() {
		setIsNewProductModalVisible(true);
	}

	function handleCloseNewProductModal() {
		setIsNewProductModalVisible(false);
	}

	function handleOpenEditProductModal() {
		setIsEditProductModalVisible(true);
	}

	function handleCloseEditProductModal() {
		setIsEditProductModalVisible(false);
		handleCloseModal();
	}

	return (
		<Board>
			<ProductModal
				visible={isModalVisible}
				product={selectedProduct}
				onClose={handleCloseModal}
				isLoading={isLoading}
				category={selectedProduct ? findCategoryName(selectedProduct.category) : ''}
				resetProducts={resetProducts}
				onOpenEditProductModal={handleOpenEditProductModal}
			/>
			<NewProductModal
				visible={isNewProductModalVisible}
				onClose={handleCloseNewProductModal}
				resetProducts={resetProducts}
				categories={categories}
			/>
			<EditProductModal
				visible={isEditProductModalVisible}
				onClose={handleCloseEditProductModal}
				resetProducts={resetProducts}
				categories={categories}
				selectedProduct={selectedProduct!}
			/>
			<header>
				<div>
					<span>{icon}</span>
					<strong>{title}</strong>
					<span>({products.length})</span>
				</div>
				<div>
					{filter === 'all' && <strong>TODOS</strong>}
					{filter === 'name' && (
						<FilterButton onClick={onClearFilters}>
							<strong>Filtrado por NOME</strong>
							<FontAwesomeIcon
								icon={faXmark}
								size='lg'
							/>
						</FilterButton>
					)}
					{filter === 'flavor' && (
						<FilterButton onClick={onClearFilters}>
							<strong>Filtrado por SABOR</strong>
							<FontAwesomeIcon
								icon={faXmark}
								size='lg'
							/>
						</FilterButton>
					)}
					{filter === 'price' && (
						<FilterButton onClick={onClearFilters}>
							<strong>Filtrado por PREÇO</strong>
							<FontAwesomeIcon
								icon={faXmark}
								size='lg'
							/>
						</FilterButton>
					)}
					{filter === 'brand' && (
						<FilterButton onClick={onClearFilters}>
							<strong>Filtrado por MARCA</strong>
							<FontAwesomeIcon
								icon={faXmark}
								size='lg'
							/>
						</FilterButton>
					)}
					{filter === 'category' && (
						<FilterButton onClick={onClearFilters}>
							<strong>Filtrado por CATEGORIA</strong>
							<FontAwesomeIcon
								icon={faXmark}
								size='lg'
							/>
						</FilterButton>
					)}
					{sort === 'cheap' && (
						<FilterButton onClick={onClearSort}>
							<strong>Ordenado por MENOR PREÇO</strong>
							<FontAwesomeIcon
								icon={faXmark}
								size='lg'
							/>
						</FilterButton>
					)}
					{sort === 'expensive' && (
						<FilterButton onClick={onClearSort}>
							<strong>Ordenado por MAIOR PREÇO</strong>
							<FontAwesomeIcon
								icon={faXmark}
								size='lg'
							/>
						</FilterButton>
					)}
					{sort === 'az' && (
						<FilterButton onClick={onClearSort}>
							<strong>Ordenado de A a Z</strong>
							<FontAwesomeIcon
								icon={faXmark}
								size='lg'
							/>
						</FilterButton>
					)}
					{sort === 'za' && (
						<FilterButton onClick={onClearSort}>
							<strong>Ordenado de Z a A</strong>
							<FontAwesomeIcon
								icon={faXmark}
								size='lg'
							/>
						</FilterButton>
					)}
				</div>
				<div>
					<button type="button" onClick={handleOpenNewProductModal}>
						<FontAwesomeIcon
							icon={faPlus}
							color="#333"
							size='lg'
						/>
					</button>
					<button type="button" onClick={openSidebar}>
						<FontAwesomeIcon
							icon={faFilter}
							color="#333"
							size='lg'
						/>
					</button>
					<button type="button" onClick={openSortSidebar}>
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
							<strong>{formatCurrency(parseFloat(product.price))}</strong>
							<strong>{product.brand}</strong>
							<strong>{findCategoryName(product.category)}</strong>
						</button>
					))}
				</ProductsContainer>
			)}
		</Board>
	);
}

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Toast } from 'react-toastify/dist/components';
import socketIo from 'socket.io-client';
import { Category } from '../../../../types/Category';
import { Price } from '../../../../types/Price';
import { Product } from '../../../../types/Product';
import { api } from '../../../../utils/api';
import { FilterSidebar } from '../FilterSidebar';
import { BrandFilterModal } from '../FiltersModals/BrandFilterModal';
import { CategoryFilterModal } from '../FiltersModals/CategoryFilterModal';
import { FlavorFilterModal } from '../FiltersModals/FlavorFilterModal';
import { NameFilterModal } from '../FiltersModals/NameFilterModal';
import { PriceFilterModal } from '../FiltersModals/PriceFilterModal';

import { ProductsBoard } from '../ProductsBoard';
import { SortSidebar } from '../SortSidebar';
import { Container } from './styles';

export function Products() {
	const [resetProducts, setResetProducts] = useState(false);
	const [products, setProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [filter, setFilter] = useState('all');
	const [nameFilter, setNameFilter] = useState('');
	const [flavorFilter, setFlavorFilter] = useState('');
	const [priceFilter, setPriceFilter] = useState<Price>({
		bigger: 0,
		smaller: 0,
		equal: 0,
		filter: false
	});
	const [categoryFilter, setCategoryFilter] = useState('');
	const [brandFilter, setBrandFilter] = useState('');
	const [isSidebarVisible, setIsSidebarVisible] = useState(false);
	const [isSortSidebarVisible, setIsSortSidebarVisible] = useState(false);
	const [sidebarClassName, setSidebarClassName] = useState('hide');
	const [sortSidebarClassName, setSortSidebarClassName] = useState('hide');
	const [isNameFilterModalVisible, setIsNameFilterModalVisible] = useState(false);
	const [isFlavorFilterModalVisible, setIsFlavorFilterModalVisible] = useState(false);
	const [isPriceFilterModalVisible, setIsPriceFilterModalVisible] = useState(false);
	const [isBrandFilterModalVisible, setIsBrandFilterModalVisible] = useState(false);
	const [isCategoryFilterModalVisible, setIsCategoryFilterModalVisible] = useState(false);
	const [sort, setSort] = useState('default');

	function handleOpenSidebar() {
		setIsSidebarVisible(!isSidebarVisible);
		setSidebarClassName(sidebarClassName === 'hide' ? 'show' : 'hide');
	}

	function handleOpenSortSidebar() {
		setIsSortSidebarVisible(!isSortSidebarVisible);
		setSortSidebarClassName(sortSidebarClassName === 'hide' ? 'show' : 'hide');
	}

	function handleOpenNameFilterModal() {
		setIsNameFilterModalVisible(true);
	}

	function handleCloseNameFilterModal() {
		setIsNameFilterModalVisible(false);
	}

	function handleOpenFlavorFilterModal() {
		setIsFlavorFilterModalVisible(true);
	}

	function handleCloseFlavorFilterModal() {
		setIsFlavorFilterModalVisible(false);
	}

	function handleOpenPriceFilterModal() {
		setIsPriceFilterModalVisible(true);
	}

	function handleClosePriceFilterModal() {
		setIsPriceFilterModalVisible(false);
	}

	function handleOpenBrandFilterModal() {
		setIsBrandFilterModalVisible(true);
	}

	function handleCloseBrandFilterModal() {
		setIsBrandFilterModalVisible(false);
	}

	function handleOpenCategoryFilterModal() {
		setIsCategoryFilterModalVisible(true);
	}

	function handleCloseCategoryFilterModal() {
		setIsCategoryFilterModalVisible(false);
	}

	function handleSaveNameFilter(name: string) {
		setNameFilter(name);
		setFilter('name');
		setFlavorFilter('');
		setPriceFilter({
			bigger: 0,
			smaller: 0,
			equal: 0,
			filter: false
		});
		setBrandFilter('');
		setCategoryFilter('');
	}

	function handleSaveFlavorFilter(flavor: string) {
		setFlavorFilter(flavor);
		setFilter('flavor');
		setNameFilter('');
		setPriceFilter({
			bigger: 0,
			smaller: 0,
			equal: 0,
			filter: false
		});
		setBrandFilter('');
		setCategoryFilter('');
	}

	function handleSavePriceFilter(price: Price) {
		setPriceFilter(price);
		setFilter('price');
		setNameFilter('');
		setFlavorFilter('');
		setBrandFilter('');
		setCategoryFilter('');
	}

	function handleSaveBrandFilter(brand: string) {
		setBrandFilter(brand);
		setFilter('brand');
		setNameFilter('');
		setFlavorFilter('');
		setPriceFilter({
			bigger: 0,
			smaller: 0,
			equal: 0,
			filter: false
		});
		setCategoryFilter('');
	}

	function handleSaveCategoryFilter(category: string) {
		setCategoryFilter(category);
		setFilter('category');
		setNameFilter('');
		setFlavorFilter('');
		setPriceFilter({
			bigger: 0,
			smaller: 0,
			equal: 0,
			filter: false
		});
		setBrandFilter('');
	}

	function handleClearFilters() {
		setNameFilter('');
		setFlavorFilter('');
		setPriceFilter({
			bigger: 0,
			smaller: 0,
			equal: 0,
			filter: false
		});
		setBrandFilter('');
		setCategoryFilter('');
		setFilter('all');
		setResetProducts(true);
		toast.success('Filtro removido com sucesso!');
	}

	function handleClearSort() {
		setSort('default');
		setResetProducts(true);
		toast.success('Ordenação removida com sucesso!');
	}

	useEffect(() => {
		api.get('/products')
			.then(({ data }) => {
				setProducts(handleSort(data));
				if (nameFilter !== '') {
					const productsFilteredByName = data.filter((product: Product) => {
						return product.name.includes(nameFilter);
					});
					setProducts(productsFilteredByName);
				}
				if (flavorFilter !== '') {
					const productsFilteredByFlavor = data.filter((product: Product) => {
						return product.flavor.includes(flavorFilter);
					});
					setProducts(productsFilteredByFlavor);
				}
				if (priceFilter.filter) {
					const productsFilteredByPrice = data.filter((product: Product) => {
						return parseFloat(product.price) > priceFilter.bigger && parseFloat(product.price) < priceFilter.smaller;
					});
					setProducts(productsFilteredByPrice);
				}
				if (brandFilter !== '') {
					const productsFilteredByBrand = data.filter((product: Product) => {
						return product.brand.includes(brandFilter);
					});
					setProducts(productsFilteredByBrand);
				}
				if (categoryFilter !== '') {
					const productsFilteredByCategory = data.filter((product: Product) => {
						return product.category === categoryFilter;
					});

					setProducts(handleSort(productsFilteredByCategory));
				}
				setResetProducts(false);
			});
	}, [nameFilter, flavorFilter, priceFilter, brandFilter, categoryFilter, resetProducts, handleResetProducts, sort]);

	useEffect(() => {
		api.get('/categories')
			.then(({ data }) => {
				setCategories(data);
			});
	});

	function handleResetProducts() {
		setResetProducts(true);
	}

	function handleSort(products: Product[]) {
		if (sort === 'cheap') {
			return products.sort(function(a, b){
				if (parseFloat(a.price) > parseFloat(b.price)) return 1;
				if (parseFloat(a.price) < parseFloat(b.price)) return -1;
				return 0;
			});
		}
		if (sort === 'expensive') {
			return products.sort(function(a, b){
				if (parseFloat(a.price) > parseFloat(b.price)) return -1;
				if (parseFloat(a.price) < parseFloat(b.price)) return 1;
				return 0;
			});
		}
		if (sort === 'az') {
			return products.sort(function(a, b){
				if (a.name > b.name) return 1;
				if (a.name < b.name) return -1;
				return 0;
			});
		}
		if (sort === 'za') {
			return products.sort(function(a, b){
				if (a.name > b.name) return -1;
				if (a.name < b.name) return 1;
				return 0;
			});
		}

		return products;
	}

	return (
		<Container>
			{categories.length > 0 && (
				<ProductsBoard
					icon="📦"
					title="Produtos"
					products={products}
					openSidebar={handleOpenSidebar}
					openSortSidebar={handleOpenSortSidebar}
					filter={filter}
					sort={sort}
					onClearFilters={handleClearFilters}
					resetProducts={handleResetProducts}
					categories={categories}
					onClearSort={handleClearSort}
				/>
			)}
			<FilterSidebar
				sidebarClassName={sidebarClassName}
				closeSidebar={handleOpenSidebar}
				openNameFilterModal={handleOpenNameFilterModal}
				openFlavorFilterModal={handleOpenFlavorFilterModal}
				openPriceFilterModal={handleOpenPriceFilterModal}
				openBrandFilterModal={handleOpenBrandFilterModal}
				openCategoryFilterModal={handleOpenCategoryFilterModal}
			/>
			<SortSidebar
				sidebarClassName={sortSidebarClassName}
				closeSidebar={handleOpenSortSidebar}
				setSort={setSort}
				// handleSortCheap={handleSort}
				// handleSortExpensive={handleSort}
				// handleSortAZ={handleSort}
				// handleSortZA={handleSort}
			/>
			<NameFilterModal
				visible={isNameFilterModalVisible}
				onClose={handleCloseNameFilterModal}
				onSave={handleSaveNameFilter}
				closeSidebar={handleOpenSidebar}
			/>
			<FlavorFilterModal
				visible={isFlavorFilterModalVisible}
				onClose={handleCloseFlavorFilterModal}
				onSave={handleSaveFlavorFilter}
				closeSidebar={handleOpenSidebar}
			/>
			<PriceFilterModal
				visible={isPriceFilterModalVisible}
				onClose={handleClosePriceFilterModal}
				onSave={handleSavePriceFilter}
				closeSidebar={handleOpenSidebar}
			/>
			<BrandFilterModal
				visible={isBrandFilterModalVisible}
				onClose={handleCloseBrandFilterModal}
				onSave={handleSaveBrandFilter}
				closeSidebar={handleOpenSidebar}
			/>
			{categories.length > 0 && (
				<CategoryFilterModal
					visible={isCategoryFilterModalVisible}
					onClose={handleCloseCategoryFilterModal}
					onSave={handleSaveCategoryFilter}
					categories={categories}
				/>
			)}
		</Container>
	);
}

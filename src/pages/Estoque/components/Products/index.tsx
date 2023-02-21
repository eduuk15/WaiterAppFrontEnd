import { useState, useEffect } from 'react';
import socketIo from 'socket.io-client';
import { Product } from '../../../../types/Product';
import { api } from '../../../../utils/api';
import { FilterSidebar } from '../FilterSidebar';
import { FlavorFilterModal } from '../FiltersModals/FlavorFilterModal';
import { NameFilterModal } from '../FiltersModals/NameFilterModal';

import { ProductsBoard } from '../ProductsBoard';
import { Container } from './styles';

export function Products() {
	const [products, setProducts] = useState<Product[]>([]);
	const [nameFilter, setNameFilter] = useState('');
	const [flavorFilter, setFlavorFilter] = useState('');
	const [isSidebarVisible, setIsSidebarVisible] = useState(false);
	const [sidebarClassName, setSidebarClassName] = useState('hide');
	const [isNameFilterModalVisible, setIsNameFilterModalVisible] = useState(false);
	const [isFlavorFilterModalVisible, setIsFlavorFilterModalVisible] = useState(false);

	function handleOpenSidebar() {
		setIsSidebarVisible(!isSidebarVisible);
		setSidebarClassName(sidebarClassName === 'hide' ? 'show' : 'hide');
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

	useEffect(() => {
		const socket = socketIo('http://localhost:3001', {
			transports: ['websocket']
		});

		socket.on('products@new', (product) => {
			setProducts(prevState => prevState.concat(product));
		});
	}, []);

	function handleSaveNameFilter(name: string) {
		setNameFilter(name);
	}

	function handleSaveFlavorFilter(flavor: string) {
		setFlavorFilter(flavor);
	}

	useEffect(() => {
		api.get('/products')
			.then(({ data }) => {
				setProducts(data);
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
			});
	}, [nameFilter, flavorFilter]);

	return (
		<Container>
			<ProductsBoard
				icon="📦"
				title="Produtos"
				products={products}
				openSidebar={handleOpenSidebar}
			/>
			<FilterSidebar
				sidebarClassName={sidebarClassName}
				closeSidebar={handleOpenSidebar}
				openNameFilterModal={handleOpenNameFilterModal}
				openFlavorFilterModal={handleOpenFlavorFilterModal}
			/>
			<NameFilterModal
				visible={isNameFilterModalVisible}
				onClose={handleCloseNameFilterModal}
				onSave={handleSaveNameFilter}
			/>
			<FlavorFilterModal
				visible={isFlavorFilterModalVisible}
				onClose={handleCloseFlavorFilterModal}
				onSave={handleSaveFlavorFilter}
			/>
		</Container>
	);
}

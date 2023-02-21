import { useState, useEffect } from 'react';
import socketIo from 'socket.io-client';
import { Product } from '../../../../types/Product';
import { api } from '../../../../utils/api';
import { FilterSidebar } from '../FilterSidebar';
import { NameFilterModal } from '../FiltersModals/NameFilterModal';

import { ProductsBoard } from '../ProductsBoard';
import { Container } from './styles';

export function Products() {
	const [products, setProducts] = useState<Product[]>([]);
	const [nameFilter, setNameFilter] = useState('');
	const [isSidebarVisible, setIsSidebarVisible] = useState(false);
	const [sidebarClassName, setSidebarClassName] = useState('hide');
	const [isNameFilterModalVisible, setIsNameFilterModalVisible] = useState(false);

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
			});
	}, [nameFilter]);

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
			/>
			<NameFilterModal
				visible={isNameFilterModalVisible}
				onClose={handleCloseNameFilterModal}
				onSave={handleSaveNameFilter}
			/>
		</Container>
	);
}

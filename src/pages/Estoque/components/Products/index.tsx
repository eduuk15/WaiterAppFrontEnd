import { useState, useEffect } from 'react';
import socketIo from 'socket.io-client';
import { Product } from '../../../../types/Product';
import { api } from '../../../../utils/api';
import { FilterSidebar } from '../FilterSidebar';

import { ProductsBoard } from '../ProductsBoard';
import { Container } from './styles';

export function Products() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isSidebarVisible, setIsSidebarVisible] = useState(false);
	const [sidebarClassName, setSidebarClassName] = useState('hide');

	function handleOpenSidebar() {
		setIsSidebarVisible(!isSidebarVisible);
		setSidebarClassName(sidebarClassName === 'hide' ? 'show' : 'hide');
	}

	useEffect(() => {
		const socket = socketIo('http://localhost:3001', {
			transports: ['websocket']
		});

		socket.on('products@new', (product) => {
			setProducts(prevState => prevState.concat(product));
		});
	}, []);

	useEffect(() => {
		api.get('/products')
			.then(({ data }) => {
				setProducts(data);
			});
	}, []);

	return (
		<Container>
			<ProductsBoard
				icon="📦"
				title="Produtos"
				products={products}
				openSidebar={handleOpenSidebar}
			/>
			<FilterSidebar sidebarClassName={sidebarClassName} closeSidebar={handleOpenSidebar} />
		</Container>
	);
}

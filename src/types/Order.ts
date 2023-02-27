export interface Order {
	_id: string;
	status: 'WAITING' | 'DONE';
	products: {
		_id: string;
		product: {
			_id: string;
			description: string;
			name: string;
			imagePath: string;
			price: string;
			flavor: string;
			brand: string;
			category: string;
		};
	}[];
	entrega: boolean;
	infoPedido: {
		fullName: string;
		phone: string;
		address: string;
	}
}

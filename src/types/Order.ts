export interface Order {
	_id: string;
	status: 'WAITING' | 'DONE';
	products: {
		_id: string;
		quantity: number;
		product: {
			name: string;
			imagePath: string;
			price: number;
			flavor: string;
			brand: string;
		};
	}[];
	entrega: boolean;
	infoPedido: {
		fullName: string;
		phone: string;
		address: string;
	}
}

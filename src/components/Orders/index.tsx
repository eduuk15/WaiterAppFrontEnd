import { Order } from '../../types/Order';
import { OrdersBoard } from '../OrdersBoard';
import { Container } from './styles';

const orders: Order[] = [
	{
		'_id': '6372e48cbcd195b0d3d0f7f3',
		'table': '123',
		'status': 'IN_PRODUCTION',
		'products': [
			{
				product: {
					'name': 'Pizza Quatro Queijos',
					'imagePath': '1668719117563-quatro-queijos.png',
					'price': 40,
				},
				quantity: 3,
				'_id': '6372e48cbcd195b0d3d0f7f4'
			}
		],
	}
];

export function Orders() {
	return (
		<Container>
			<OrdersBoard
				icon="⌛"
				title="Fila de espera"
				orders={orders}
			/>
			<OrdersBoard
				icon="🧑‍🍳"
				title="Em preparação"
				orders={[]}
			/>
			<OrdersBoard
				icon="✅"
				title="Pronto!"
				orders={[]}
			/>
		</Container>
	);
}

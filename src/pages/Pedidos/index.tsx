import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import { Header } from './components/Header';
import { Orders } from './components/Orders';

export function Pedidos() {
	return (
		<>
			<Header />
			<Orders />
			<ToastContainer position='bottom-center' />
		</>
	);
}

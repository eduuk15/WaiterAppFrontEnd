import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import { Header } from './components/Header';
import { Products } from './components/Products';

export function Estoque() {
	return (
		<>
			<Header />
			<Products />
			<ToastContainer position='bottom-center' />
		</>
	);
}

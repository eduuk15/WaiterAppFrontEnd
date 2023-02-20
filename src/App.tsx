import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyles } from './styles/GlobalStyles';
import { Pedidos } from './pages/Pedidos';

export function App() {

	return (
		<>
			<GlobalStyles />
			<Router>
				<Routes>
					<Route path='/' element={<Pedidos />}/>
					<Route path='/pedidos' element={<Pedidos />}/>
				</Routes>
			</Router>
		</>
	);
}

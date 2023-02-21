
import panda from '../../../../assets/images/pandaPng.png';

import { Container } from './styles';
import { Content } from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import { Sidebar } from '../Sidebar';

export function Header() {
	const [isSidebarVisible, setIsSidebarVisible] = useState(false);
	const [sidebarClassName, setSidebarClassName] = useState('hide');

	function handleOpenSidebar() {
		setIsSidebarVisible(true);
		setSidebarClassName('show');
	}

	function handleCloseSidebar() {
		setIsSidebarVisible(false);
		setSidebarClassName('hide');
	}

	return (
		<Container>
			<Content>
				<div className="page-details">
					<h1>
						<button onClick={handleOpenSidebar}>
							<FontAwesomeIcon
								icon={faBars}
								color="#FFF"
								size='2x'
							/>
						</button>
						Estoque
					</h1>
					<h2>Acompanhe o seu estoque</h2>
				</div>

				<h1 className='title'>PANDAPODS</h1>

				<img src={panda} alt="PANDAPODS" />

				<Sidebar sidebarClassName={sidebarClassName} closeSidebar={handleCloseSidebar}/>
			</Content>
		</Container>
	);
}

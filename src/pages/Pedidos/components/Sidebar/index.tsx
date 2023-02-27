import { SidebarItem } from '../SidebarItem';
import { Container, Content } from './styles';

import { faXmark, faDolly, faBox } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SidebarProps {
	sidebarClassName: string;
	closeSidebar: () => void;
}

export function Sidebar({ sidebarClassName, closeSidebar }: SidebarProps) {

	return (
		<Container visibility={sidebarClassName}>
			<button type="button" onClick={closeSidebar} >
				<div className='titleSidebar'>
					<h1>Menu</h1>
					<FontAwesomeIcon
						icon={faXmark}
						color="#FFF"
						size='2x'
					/>
				</div>
			</button>
			<Content>
				<SidebarItem icon={faDolly} text='Pedidos' route='pedidos' />
				<SidebarItem icon={faBox} text='Estoque' route='estoque'/>
			</Content>
		</Container>
	);
}

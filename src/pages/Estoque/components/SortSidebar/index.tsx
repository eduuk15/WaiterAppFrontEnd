import { FilterSidebarItem } from '../FilterSidebarItem';
import { Container, Content } from './styles';

import { faShapes, faCopyright, faXmark, faDollarSign, faSignature, faGrinTongueSquint, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SortSidebarItem } from '../SortSidebarItem';

interface SortSidebarProps {
	sidebarClassName: string;
	closeSidebar: () => void;
	// handleSortCheap: () => void;
	// handleSortExpensive: () => void;
	// handleSortAZ: () => void;
	// handleSortZA: () => void;
	setSort: (sort: string) => void
}

export function SortSidebar({ sidebarClassName, closeSidebar, setSort  }: SortSidebarProps) {

	return (
		<Container visibility={sidebarClassName}>
			<button type="button" onClick={closeSidebar} >
				<div className='filtros'>
					<h1>Ordenar por</h1>
					<FontAwesomeIcon
						icon={faXmark}
						color="#FFF"
						size='2x'
					/>
				</div>
			</button>
			<Content>
				<SortSidebarItem icon={faMoneyBill} text='Menor preço'  setSort={setSort} sort='cheap'/>
				<SortSidebarItem icon={faMoneyBill} text='Maior preço'  setSort={setSort} sort='expensive' />
				<SortSidebarItem icon={faDollarSign} text='Ordem Alfabética (A - Z)' setSort={setSort} sort='az' />
				<SortSidebarItem icon={faCopyright} text='Ordem Alfabética (Z - A)' setSort={setSort} sort='za' />
			</Content>
		</Container>
	);
}

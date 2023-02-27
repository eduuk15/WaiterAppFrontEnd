import { FilterSidebarItem } from '../FilterSidebarItem';
import { Container, Content } from './styles';

import { faShapes, faCopyright, faXmark, faDollarSign, faSignature, faGrinTongueSquint, faMoneyBill, faA, faZ } from '@fortawesome/free-solid-svg-icons';
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
				<div className='title'>
					<h1>Ordenar por</h1>
					<FontAwesomeIcon
						icon={faXmark}
						color="#FFF"
						size='2x'
					/>
				</div>
			</button>
			<Content>
				<SortSidebarItem icon={faMoneyBill} text='Menor preço'  setSort={setSort} sort='cheap' closeSidebar={closeSidebar}/>
				<SortSidebarItem icon={faMoneyBill} text='Maior preço'  setSort={setSort} sort='expensive' closeSidebar={closeSidebar} />
				<SortSidebarItem icon={faA} text='Ordem Alfabética (A - Z)' setSort={setSort} sort='az' closeSidebar={closeSidebar} />
				<SortSidebarItem icon={faZ} text='Ordem Alfabética (Z - A)' setSort={setSort} sort='za' closeSidebar={closeSidebar} />
			</Content>
		</Container>
	);
}

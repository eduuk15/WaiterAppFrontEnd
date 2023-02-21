import { FilterSidebarItem } from '../FilterSidebarItem';
import { Container, Content } from './styles';

import { faShapes, faCopyright, faXmark, faDollarSign, faSignature, faGrinTongueSquint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface FilterSidebarProps {
	sidebarClassName: string;
	closeSidebar: () => void;
	openNameFilterModal: () => void;
	openFlavorFilterModal: () => void;
}

export function FilterSidebar({ sidebarClassName, closeSidebar, openNameFilterModal, openFlavorFilterModal }: FilterSidebarProps) {

	return (
		<Container visibility={sidebarClassName}>
			<button type="button" onClick={closeSidebar} >
				<div className='filtros'>
					<h1>Filtros</h1>
					<FontAwesomeIcon
						icon={faXmark}
						color="#FFF"
						size='2x'
					/>
				</div>
			</button>
			<Content>
				<FilterSidebarItem icon={faSignature} text='Nome' handleOpenFilterModal={openNameFilterModal}/>
				<FilterSidebarItem icon={faGrinTongueSquint} text='Sabor' handleOpenFilterModal={openFlavorFilterModal} />
				{/* <FilterSidebarItem icon={faDollarSign} text='Preço' />
				<FilterSidebarItem icon={faCopyright} text='Marca' />
				<FilterSidebarItem icon={faShapes} text='Categoria' /> */}
			</Content>
		</Container>
	);
}

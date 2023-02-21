import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container } from './styles';

interface FilterSidebarItemProps {
	icon: any;
	text: string;
	handleOpenFilterModal: () => void;
}

export function FilterSidebarItem({ icon, text, handleOpenFilterModal }: FilterSidebarItemProps) {
	return (
		<Container onClick={handleOpenFilterModal}>
			<button>
				<FontAwesomeIcon
					icon={icon}
					size='2x'
				/>
			</button>
			<span>{text}</span>
		</Container>
	);
}

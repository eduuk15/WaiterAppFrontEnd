import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Container } from './styles';

interface FilterSidebarItemProps {
	icon: any;
	text: string;
}

export function FilterSidebarItem({ icon, text }: FilterSidebarItemProps) {
	return (
		<Container>
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

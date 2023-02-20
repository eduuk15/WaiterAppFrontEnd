import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Container } from './styles';

interface SidebarItemProps {
	icon: any;
	text: string;
	route: string;
}

export function SidebarItem({ icon, text, route }: SidebarItemProps) {
	return (
		<Link to={`/${route}`} style={{ textDecoration: 'none' }}>
			<Container>
				<button>
					<FontAwesomeIcon
						icon={icon}
						size='2x'
					/>
				</button>
				<span>{text}</span>
			</Container>
		</Link>
	);
}

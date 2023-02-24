import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { Container } from './styles';

interface SortSidebarItemProps {
	icon: any;
	text: string;
	setSort: (sort: string) => void;
	sort: string;
}

export function SortSidebarItem({ icon, text, sort, setSort }: SortSidebarItemProps) {
	return (
		<Container onClick={() => {
			setSort(sort);
			toast.success('Produtos ordenados com sucesso!');
		}}>
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

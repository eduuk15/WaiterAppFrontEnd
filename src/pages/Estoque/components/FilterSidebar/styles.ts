import styled from 'styled-components';

interface Props {
	visibility: string;
}

export const Container = styled.div`
	background-color: #2d96ff;
	position: fixed;
	height: 100%;
	top: 0px;
	right: 0px;
	width: 350px;

	animation: ${(props: Props) => props.visibility === 'hide' ? 'hideAnimation 0s ease-in 0.5s' : ''};
  	animation-fill-mode: forwards;
	@keyframes hideAnimation {
  		to 	{
    		visibility: hidden;
  		}
	}
  	opacity: ${(props: Props) => props.visibility === 'hide' ? 0 : 1};
  	transition: ${(props: Props) => props.visibility === 'hide' ? 'opacity 0.5s linear' : 'opacity 0.5s linear'};
  	-webkit-transition: ${(props: Props) => props.visibility === 'hide' ? 'opacity 0.5s linear' : 'opacity 0.5s linear'};
  	-moz-transition: ${(props: Props) => props.visibility === 'hide' ? 'opacity 0.5s linear' : 'opacity 0.5s linear'};
  	-o-transition: ${(props: Props) => props.visibility === 'hide' ? 'opacity 0.5s linear' : 'opacity 0.5s linear'};

	.filtros {
		padding: 10px 10px 0px 10px;
		width: 350px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		float: right;
		color: #FFF;
	}

	button {
		all: unset;
		cursor: pointer;
	}
`;

export const Content = styled.div`
 	margin-top: 30px;

	button {
		margin: 10px 10px;
	}
`;

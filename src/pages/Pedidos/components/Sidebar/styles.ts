import styled from 'styled-components';

interface Props {
	visibility: string;
}

export const Container = styled.div`
	background-color: #2d96ff;
	position: fixed;
	height: 100%;
	top: 0px;
	left: 0px;
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

	button {
		margin: 10px 10px;
		float: left;
	}
`;

export const Content = styled.div`
 	margin-top: 80px;
`;

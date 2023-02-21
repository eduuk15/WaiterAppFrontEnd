import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #FFF;
  font-size: 20px;
  color: #2d96ff;
  font-weight: 600;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  margin: 0 15px 20px;
  button {
	color: #2d96ff;
  }
  &:hover {
    background-color: #5d5d75;
	color: #FFF;
	button {
	color: #FFF;
  }
  }
`;

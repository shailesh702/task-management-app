
import styled, { css } from "styled-components";

export const Avatar = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;
`;

export const CardHeader = styled.div`
  font-weight: 500;
  text-align: start;
`;

export const CardBody = styled.div`
  width: 100%;
  display: flex;
  text-align: start;
`;

export const Author = styled.div`
  display: flex;
  align-items: center;
`;

export const CardFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const DragItem = styled.div`
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: white;
  margin: 0 0 8px 0;
  display: grid;
  grid-gap: 20px;
  flex-direction: column;
`;


export const DragDropContextContainer = styled.div`
  padding: 20px;
  border: 4px solid indianred;
  border-radius: 6px;
`;

export const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8px;
`;

export const ColumnHeader = styled.div`
  text-transform: uppercase;
  margin-bottom: 20px;
`;

export const DroppableStyles = styled.div`
  padding: 10px;
  border-radius: 6px;
  background: #d4d4d4;
`;


export default {
  Avatar,
  CardHeader,
  CardBody,
  Author,
  CardFooter,
  DragItem,
  DragDropContextContainer,
  ListGrid,
  ColumnHeader,
  DroppableStyles
}
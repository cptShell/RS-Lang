import React from 'react';
import { useNavigate } from 'react-router-dom';



const ListGames: React.FC<{pageState: {group: number, page: number}}> = (props) => {
  const navigate = useNavigate();
  const { group, page } = props.pageState;

  const onStartSprint = async () => {
    navigate(`/sprint?group=${group}&page=${page}`);
  }

  return (
    <ul className='btn-group d-flex justify-content-center gap-2'>
      <li><button className='btn btn-success' onClick={onStartSprint}>Спринт</button></li>
      <li><button className='btn btn-success'>Аудиовызов</button></li>
    </ul>
  )
}

export default ListGames;
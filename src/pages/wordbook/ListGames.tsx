import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageState } from '../../utils/interfaces/interfaces';



const ListGames: React.FC<{pageState: PageState}> = (props) => {
  const navigate = useNavigate();
  const { group, page } = props.pageState;

  const onStartSprint = async () => {
    navigate(`/sprint?group=${group}&page=${page}`);
  }

  return (
    <div className='btn-group d-flex justify-content-center align-items-center gap-2'>
      Проверьте себя в
      <button className='btn btn-success' onClick={onStartSprint}>Спринте</button>
      или
      <button className='btn btn-success'>Аудиовызове</button>
    </div>
  )
}

export default ListGames;
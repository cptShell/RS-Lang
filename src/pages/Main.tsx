import React from 'react';
import { NavLink } from 'react-router-dom';

const Main: React.FC = () => {
  return (
    <div className='container-fluid d-flex flex-column gap-3 py-2'>
      <div>
        <h1>Что такое RSlang?</h1>
      </div>
      <div className='d-flex flex-column gap-2 shadow p-2'>
        <h4>Для пользователей это возможность изучать английские слова в менее скучной форме с элементами геймификации</h4>
        <ul className='d-flex flex-column gap-2'>
          <li className='d-flex justify-content-between'>
            <p>Проверяйте и прокачивайте свою скорость узнавания слов в миниигре</p>
            <NavLink to='/sprint' className='btn btn-success'>Спринт</NavLink>
          </li>
          <li className='d-flex justify-content-between'>
            <p>Так же вы можете совершенствовать навыки распознавания речи на слух в миниигре</p>
            <NavLink to='/audiocall' className='btn btn-success'>Аудиовызов</NavLink>
          </li>
          <li>
            Изучайте новые слова с помощью специального учебника, в котором все слова поделены на 6 категорий, от простых к сложным.
            Для авторизованных пользователей доступно гораздо больше функций, напимер:
            <ul className='list-group'>
              <li className='list-group-item'>Запуск миниигр прямо со страниц учебника, чтобы повторить изученный материал</li>
              <li className='list-group-item'>Прогрессия изучения каждого слова, возможность отметить слово как особо "сложное"</li>
              <li className='list-group-item'>Более глобальная прогрессия в рамках всей страницы, вы сможете легко понять, что изучили все слова на текущей странице и смело перейти в следующей</li>
              <li className='list-group-item'>Возможность просмотреть подрубную статиску не только по каждому слову, но и по каждой миниигре и процессу обучения в целом в персональной статистике</li>
              <li className='list-group-item'>Слова, которые помечены как особо сложные будут доступны все авторизованным пользователям в бонусной секции "сложные слова"</li>
            </ul>
          </li>
        </ul>
      </div>
      <div className='d-flex flex-column gap-2 shadow p-2'>
        <h4>Для нас же, авторов, это был очень интересный опыт, который буквально проверил нас на прочность, давайте познакомимся</h4>
        <div className='d-flex flex-row gap-2'>
          <img src="https://avatars.githubusercontent.com/u/67701905?v=4" alt="zhenya" width={180} height={180}/>
          <div>
            <p><a href="https://github.com/cptShell">cptShell</a> - в жизни просто Женя, начинаниющий веб разработчик</p>
            <div>
              <h5>Ответственен за:</h5>
              <ul>
                <li>Главная страница</li>
                <li>Работа с бэкэндом</li>
                <li>Интерактичный учебник</li>
                <li>Работа с общей прогрессией слов</li>
              </ul>
            </div>
          </div>
        </div>
        <div className='d-flex flex-row gap-2'>
          <img src="https://avatars.githubusercontent.com/u/83715626?v=4" alt="andrew" width={180} height={180}/>
          <div>
            <p><a href="https://github.com/andreypesh">andreyPesh</a> - в жизни просто Андрей, начинающий веб разработчик</p>
            <div>
              <h5>Ответственен за:</h5>
              <ul>
                <li>Миниигра "Спринт"</li>
                <li>Миниигра "Аудиовызов"</li>
                <li>Страница статистики</li>
                <li>Навигация по приложению</li>
                <li>Авторизация/Регистрация</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main;

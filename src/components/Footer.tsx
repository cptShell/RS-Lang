import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className='d-flex justify-content-between p-2'>
      <ul className='authors d-flex flex-row gap-2'>
        <li><a href="https://github.com/AndreyPesh">AndreyPesh</a></li>
        <li><a href="https://github.com/cptShell">cptShell</a></li>
      </ul>
      <div>
        <span>{new Date().getFullYear()}</span>
        <a href="">
          <img src="https://rs.school/images/rs_school.svg" alt="" width={120} height={40}/>
        </a>
      </div>
    </footer>
  );
};

export default Footer;

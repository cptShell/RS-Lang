import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className='d-flex justify-content-between p-2 bg-success'>
      <ul className='authors d-flex flex-column gap-2'>
        <li>
          <a className='text-light align-items-center d-flex' href="https://github.com/AndreyPesh">{'> AndreyPesh'}</a>
        </li>
        <li>
          <a className='text-light align-items-center d-flex' href="https://github.com/cptShell">{'> cptShell'}</a>
        </li>
      </ul>
      <div className='d-flex flex-column gap-2'>
        <span className='text-light align-items-center  d-flex'>{`RS Lang, ${new Date().getFullYear()}`}</span>
        <a className='text-light align-items-center d-flex justify-content-end' href="https://rs.school/">
          <img src="https://rs.school/images/rs_school.svg" alt="logo" width={60} height={20}/>
        </a>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <ul>
        <li>author 1</li>
        <li>author 2</li>
      </ul>
      <span>{new Date().getFullYear()}</span>
      <span className='logo'>logo RSS</span>
    </footer>
  );
};

export default Footer;

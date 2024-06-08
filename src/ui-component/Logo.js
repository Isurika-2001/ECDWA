import React from 'react';
import logo from 'assets/images/app-logo.png';

const Logo = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={logo}
        alt="Logo"
        style={{
          // Adjust height for desired size, width will adjust automatically to maintain aspect ratio
          height: 50,
          width: 'auto',
        }}
      />
    </div>
  );
};

export default Logo;

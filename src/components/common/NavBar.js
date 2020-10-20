import React from 'react';
import '../../styles/index.css';
import { Button, Typography } from 'antd';

const { Title } = Typography;

const NavBar = () => {
  return (
    <div className="logo-pane">
      <div className="company-info">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Ubuntu_logo_copyleft_1.svg/1200px-Ubuntu_logo_copyleft_1.svg.png"
          alt="Human Rights First logo"
        />
        <h2>Human Rights Considered</h2>
      </div>
      <div className="user-nav">
        <Button>Sign In</Button>
        <Button>Sign Up</Button>
      </div>
    </div>
  );
};
export default NavBar;

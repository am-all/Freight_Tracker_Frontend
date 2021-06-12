import React, { FC, ReactElement } from 'react';
import logo from '../../logo.svg';
import HeaderLinks from '../../components/headerLinks/headerLinks';

import { Container } from '@material-ui/core';

const Homepage: FC = (): ReactElement => {
    
  return (
    <Container maxWidth={'lg'}>
    <div className="App">
      <header className="App-header">
        <HeaderLinks/>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
    </Container>
  );
}

export default Homepage;

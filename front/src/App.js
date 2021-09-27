import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './modules/common/Header';
import { AppRouter } from './router';
import './main.css';

export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
};

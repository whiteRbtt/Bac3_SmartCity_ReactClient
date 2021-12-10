import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

ReactDOM.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={DateAdapter}>
      <App />
    </LocalizationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

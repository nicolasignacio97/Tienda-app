import React from 'react'

import { BrowserRouter } from "react-router-dom";
import { MainRouter } from './routes/MainRouter';

const App = () => {
  return (
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  )
}

export default App;
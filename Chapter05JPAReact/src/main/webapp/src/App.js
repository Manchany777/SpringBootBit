import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Index from './main/Index';
import WriteForm from './user/WriteForm';

function App() {
  return (
    <BrowserRouter>
      <>

        {/* 화면에 보이는 영역 */}
        <Routes>
          <Route path='/' element={ <Index /> } />
          <Route path='user/writeForm' element={ <WriteForm />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
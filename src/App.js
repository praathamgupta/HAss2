// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FetchNews from './components/FetchNews';
import PostDetail from './components/PostDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/" element={<FetchNews />} />
      </Routes>
    </Router>
  );
};

export default App;

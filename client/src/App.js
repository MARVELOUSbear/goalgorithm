import './App.css';
import React, { useEffect, useState } from 'react';
import TestConnection from './components/TestConnection';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ArticleLists from './components/ArticleLists';
import ArticleDetail from './components/ArticleDetail';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/testConnection">
          <TestConnection />
        </Route>
        <Route path="/allArticles">
          <ArticleLists />
        </Route>
        <Route path="/articles">
          <ArticleDetail />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

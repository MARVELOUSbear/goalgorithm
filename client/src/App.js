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
import NewArticle from './components/NewArticle';

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
          <ArticleLists perPage={2} domain="all" />
        </Route>
        <Route path="/myArticles">
          <ArticleLists perPage={2} domain="personal" />
        </Route>
        <Route path="/articles">
          <ArticleDetail />
        </Route>
        <Route path="/newArticle">
          <NewArticle />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

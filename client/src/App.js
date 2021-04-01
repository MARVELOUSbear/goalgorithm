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
import EditArticle from './components/EditArticle';

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
        <Route path="/Articles">
          <ArticleLists perPage={2} domain="all" />
        </Route>
        <Route path="/AllMyArticles">
          <ArticleLists perPage={2} domain="personal" />
        </Route>
        <Route path="/articleDetails">
          <ArticleDetail />
        </Route>
        <Route path="/newArticle">
          <NewArticle />
        </Route>
        <Route path="/editArticle">
          <EditArticle />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

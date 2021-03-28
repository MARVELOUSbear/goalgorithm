import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory, Redirect } from 'react-router';
import Swal from 'sweetalert2';

import Article from './Article';
import Navigation from './Navigation';

function ArticleLists() {
  const [articles, setArticles] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const getAllArticles = async () => {
      const resRaw = await fetch('/allArticles');
      const res = await resRaw.json();
      setArticles(res);
    };
    getAllArticles();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('current_user');
    if (token) {
      setCurrentUser(token);
    } else {
      history.push('/login');
    }
  }, []);

  const viewArticle = (id) => {
    history.push('/articles/' + id, id);
  };

  const renderArticle = (article) => {
    return (
      <Article
        tags={article.tags}
        title={article.title}
        description={article.description}
        onView={() => {
          console.log(article._id);
          viewArticle(article._id);
        }}
      />
    );
  };
  const renderArticles = () => {
    return articles.map((article) => {
      return renderArticle(article);
    });
  };

  return (
    <>
      <Navigation />
      <div className="container">
        <h1>All Articles</h1>
        {renderArticles()}
      </div>
    </>
  );
}

export default ArticleLists;

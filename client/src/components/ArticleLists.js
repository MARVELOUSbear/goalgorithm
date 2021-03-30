import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory, Redirect } from 'react-router';
import Swal from 'sweetalert2';
import Pagination from 'react-js-pagination';
import Article from './Article';
import Navigation from './Navigation';
import './ArticleLists.css';

function ArticleLists({ perPage }) {
  const [articles, setArticles] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const [activePage, setActivePage] = useState(1);
  const [articlesCount, setArticlesCount] = useState(0);

  const history = useHistory();
  const getAllArticles = async (start, itemPerPage) => {
    const resRaw = await fetch(
      '/allArticles?start=' + start + '&itemPerPage=' + itemPerPage
    );
    const res = await resRaw.json();
    setArticles(res);
  };

  const getArticleCount = async () => {
    const resRaw = await fetch('/articlesCount');
    const count = await resRaw.json();
    setArticlesCount(count);
  };

  useEffect(() => {
    getAllArticles(0, perPage);
    getArticleCount();
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

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    const start = perPage * (pageNumber - 1);
    getAllArticles(start, perPage);
  };

  return (
    <>
      <Navigation />
      <div className="articlelists-container">
        <h1>All Articles</h1>
        {renderArticles()}
      </div>
      <div className="container mt-5">
        <div className="row justify-content-center ">
          <div className="col-lg-3 "></div>
          <div className="col-lg-3">
            <Pagination
              activePage={activePage}
              itemsCountPerPage={perPage}
              totalItemsCount={articlesCount}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
              hideDisabled
              hideFirstLastPages
            />
          </div>
          <div className="col-lg-3"></div>
        </div>
      </div>
    </>
  );
}

export default ArticleLists;

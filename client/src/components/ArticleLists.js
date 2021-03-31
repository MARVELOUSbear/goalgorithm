import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory, Redirect } from 'react-router';
import Swal from 'sweetalert2';
import Pagination from 'react-js-pagination';
import Article from './Article';
import Navigation from './Navigation';
import './ArticleLists.css';

function ArticleLists({ perPage, domain }) {
  const [articles, setArticles] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [tagFilter, setTagFilter] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [articlesCount, setArticlesCount] = useState(0);

  const history = useHistory();
  const getAllArticles = async (start, itemPerPage, tagFilter) => {
    const resRaw = await fetch(
      '/allArticles?start=' +
        start +
        '&itemPerPage=' +
        itemPerPage +
        '&tagFilter=' +
        tagFilter
    );
    const res = await resRaw.json();
    setArticles(res);
  };

  const getMyArticles = async (start, itemPerPage, tagFilter) => {
    const resRaw = await fetch(
      '/myArticles?start=' +
        start +
        '&itemPerPage=' +
        itemPerPage +
        '&userId=' +
        currentUser +
        '&tagFilter=' +
        tagFilter
    );
    const res = await resRaw.json();
    setArticles(res);
  };

  const getArticleCount = async (tagFilter) => {
    const resRaw = await fetch('/articlesCount?tagFilter=' + tagFilter);
    const count = await resRaw.json();
    setArticlesCount(count);
  };

  const getMyArticleCount = async (tagFilter) => {
    const resRaw = await fetch(
      '/myArticlesCount?userId=' + currentUser + '&tagFilter=' + tagFilter
    );
    const count = await resRaw.json();
    console.log('my articlr coutn ', count);
    setArticlesCount(count);
  };
  useEffect(() => {
    console.log('set token');
    const token = localStorage.getItem('current_user');
    if (token) {
      setCurrentUser(token);
    } else {
      history.push('/login');
    }
  }, []);

  useEffect(() => {
    console.log('set domain');
    if (domain === 'personal') {
      getMyArticles(0, perPage, tagFilter);
      getMyArticleCount(tagFilter);
    } else {
      getAllArticles(0, perPage, tagFilter);
      getArticleCount(tagFilter);
    }
  }, [currentUser, tagFilter]);

  const viewArticle = (id) => {
    history.push('/articleDetails/', id);
  };

  const renderArticle = (article) => {
    return (
      <Article
        tags={article.tags}
        title={article.title}
        description={article.description}
        onView={() => {
          viewArticle(article._id);
        }}
        onClickTag={(tag) => {
          return () => {
            setTagFilter(tag.name);
          };
        }}
        editable={article.user_id === currentUser}
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
    if (domain === 'personal') {
      getMyArticles(start, perPage, tagFilter);
    } else {
      getAllArticles(start, perPage, tagFilter);
    }
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

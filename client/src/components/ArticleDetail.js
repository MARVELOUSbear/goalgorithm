import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useLocation, useHistory, Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navigation from './Navigation';
import Tag from './Tag';
import ReactMarkdown from 'react-markdown';
import './ArticleDetail.css';

function ArticleDetail(props) {
  const location = useLocation();

  const articleID = location.state;
  const [article, setArticle] = useState({
    title: '',
    tags: [],
    description: '',
    content: '',
  });
  useEffect(() => {
    const getArticle = async () => {
      const resRaw = await fetch('/articles/' + articleID);
      const res = await resRaw.json();
      console.log(res);
      setArticle(res);
    };
    getArticle();
  }, []);

  const renderTags = () => {
    const tags = article.tags;
    return tags.map((tag) => {
      return renderTag(tag.color, tag.name);
    });
  };
  const renderTag = (color, name) => <Tag color={color} tag={name} />;

  return (
    <>
      <Navigation />
      <div className="container ">
        <Card>
          <Card.Header>{article.title}</Card.Header>
          <Card.Body>
            {renderTags()}
            <blockquote className="blockquote mb-0">
              <ReactMarkdown>{article.content}</ReactMarkdown>
              <footer className="blockquote-footer">
                Created by <cite title="Source Title">{article.user_name}</cite>
              </footer>
            </blockquote>
          </Card.Body>
          <Card.Footer className="text-muted">
            Created at{' '}
            <cite title="Source Title">
              {' '}
              {new Date(article.created_at).toString().substring(0, 21)}
            </cite>
          </Card.Footer>
        </Card>
        <h1></h1>
      </div>
    </>
  );
}

export default ArticleDetail;

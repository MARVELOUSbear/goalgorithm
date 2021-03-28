import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useLocation, useHistory, Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Tag.css';

function ArticleDetail(props) {
  const location = useLocation();

  const articleID = location.state;
  const [article, setArticle] = useState(null);
  useEffect(() => {
    const getArticle = async () => {
      const resRaw = await fetch('/articles/' + articleID);
      const res = await resRaw.json();
      console.log(res);
      setArticle(res);
    };
    getArticle();
  }, []);

  return <h1>123</h1>;
}

export default ArticleDetail;

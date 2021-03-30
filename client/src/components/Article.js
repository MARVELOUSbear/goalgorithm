import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory, Redirect } from 'react-router';
import Swal from 'sweetalert2';
import './Article.css';
import Tag from './Tag';
import Description from './Description';

function Article({ tags, title, description, onView, onClickTag }) {
  const renderTag = (color, name, onClick) => (
    <Tag color={color} tag={name} onClick={onClick} />
  );
  const renderTags = () => {
    return tags.map((tag) => {
      return renderTag(tag.color, tag.name, onClickTag(tag));
    });
  };

  return (
    <>
      <div className="column">
        <article className="article">
          {renderTags()}
          <h2 className="article__title">{title}</h2>
          <Description description={description} />
          <Button variant="outline-dark" onClick={onView}>
            View More
          </Button>
        </article>
      </div>
    </>
  );
}

export default Article;

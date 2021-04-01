import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory, Redirect } from 'react-router';
import Swal from 'sweetalert2';
import './Article.css';
import Tag from './Tag';
import Description from './Description';

function Article({
  tags,
  title,
  description,
  onView,
  onClickTag,
  editable,
  onClickEdit,
  onClickDelete,
}) {
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

          <div className="row">
            <div className="col-3">
              <Button variant="outline-dark" onClick={onView}>
                View More
              </Button>
            </div>
            <div className="col-6"></div>

            {editable ? (
              <div className="col-3">
                <Button variant="outline-info me-2" onClick={onClickEdit}>
                  Edit
                </Button>
                <Button variant="outline-danger" onClick={onClickDelete}>
                  Delete
                </Button>
              </div>
            ) : (
              <div className="col-3"></div>
            )}
          </div>
        </article>
      </div>
    </>
  );
}

export default Article;

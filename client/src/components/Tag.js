import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory, Redirect } from 'react-router';
import Swal from 'sweetalert2';
import './Tag.css';

function Tag({ color, tag }) {
  const style = {
    backgroundColor: color,
  };
  return (
    <button className="tags me-1" style={style}>
      {tag}
    </button>
  );
}

export default Tag;

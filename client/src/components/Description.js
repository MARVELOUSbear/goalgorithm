import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory, Redirect } from 'react-router';
import Swal from 'sweetalert2';
import './Description.css';

function Description({ description }) {
  return <p className="description">{description}</p>;
}

export default Description;

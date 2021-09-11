import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { httpRequest } from '../helpers/http.helper';

export default function Superhero() {
  const { request } = httpRequest();

  const [superhero, setSuperhero] = useState();
  const {id} = useParams();

  const getOneSuperhero = async () => {
    const data = await request(`http://localhost:5000/${id}`);

    setSuperhero(data);
  };

  useEffect(() => {
    getOneSuperhero();
  }, [id]);

  return (
    <div>
      <h1>Superhero</h1>

      {superhero && (
        <h2>{superhero.nickname} - {superhero.real_name}</h2>
      )}
    </div>
  )
};

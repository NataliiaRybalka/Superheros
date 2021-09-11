import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { httpRequest } from '../helpers/http.helper';

export default function SuperheroesList() {
  const { request } = httpRequest();

  const [allSuperheroes, setAllSuperheroes] = useState();

  const getAllSuperheroes = async () => {
    const data = await request('http://localhost:5000/');
    setAllSuperheroes(data);
  };

  useEffect(() => {
    getAllSuperheroes();
  }, []);

  return (
    <div>
      <h1>Superheroes</h1>

      {allSuperheroes && allSuperheroes.map(superhero => (
        <Link to={`/superhero/${superhero.id}`} key={superhero.id}>
          <div>
            <h3>{superhero.nickname}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
};


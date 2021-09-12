import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { httpRequest } from '../helpers/http.helper';

export default function SuperheroesList() {
  const { request } = httpRequest();

  const [allSuperheroes, setAllSuperheroes] = useState();
  const [pages, setPages] = useState(1);
  const [selectedPage, setSelectedPage] = useState(1);

  const getAllSuperheroes = async () => {
    const data = await request(`http://localhost:5000/?page=${selectedPage}`);
    setAllSuperheroes(data.superheroesForOnePage);
    setPages(data.totalPages);
  };

  useEffect(() => {
    getAllSuperheroes();
  }, [selectedPage]);
  
  const arrayForPages = [];
  for (let i = 0; i < pages; i++) {
    arrayForPages.push(i + 1);
  };

  const setPage = (page) => {
    setSelectedPage(page);
  };

  return (
    <div>
      <h1>Superheroes</h1>

      {allSuperheroes && allSuperheroes.map(superhero => (
        <Link to={`/superhero/${superhero.id}`} key={superhero.id}>
          <div>
            <h3>{superhero.nickname}</h3>
            <img src={`http://localhost:5000/${superhero.avatar}`} alt={superhero.nickname} />
          </div>
        </Link>
      ))}
      <br />

      {arrayForPages.map(page => (
        <button onClick={() => setPage(page)} key={page}>{page}</button>
      ))}
    </div>
  )
};


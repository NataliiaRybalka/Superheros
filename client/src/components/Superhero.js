import React, { useState } from 'react';

import { httpRequest } from '../helpers/http.helper';

export default function Superhero() {
  const { request } = httpRequest();

  const [superhero, setSuperhero] = useState();

  const getOneSuperhero = async () => {
    const data = await request('http://localhost:5000/:id');
    console.log(data);
  };

  return (
    <div>
      <h1>Superhero</h1>
    </div>
  )
}

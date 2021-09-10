import React from 'react';

import { httpRequest } from '../helpers/http.helper';

export default function SuperheroesList() {
  const { request } = httpRequest();

  return (
    <div>
      <h1>Superheroes</h1>
    </div>
  )
};


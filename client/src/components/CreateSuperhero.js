import React, { useState } from 'react';

import { httpRequest } from '../helpers/http.helper';

export default function CreateSuperhero() {
  const { request } = httpRequest();

  const [state, setState] = useState({
    nickname: '',
    real_name: '',
    origin_description: '',
    superpowers: '',
    catch_phrase: ''
  });

  const changeInput = (e) => {
    const {target: { name, value }} = e;
    setState({
      ...state,
      [name]: value
    })
  };

  const addNewHero = async () => {
    const data = await request('http://localhost:5000/create', 'POST', {superheroesData: state});

    setState({
      nickname: '',
      real_name: '',
      origin_description: '',
      superpowers: '',
      catch_phrase: ''
    });
  };

  return (
    <div>
      <label>nickname</label>
      <input value={state.nickname} onChange={changeInput} type={'text'} name={'nickname'} />
      <br />
      <label>real_name</label>
      <input value={state.real_name} onChange={changeInput} type={'text'} name={'real_name'} />
      <br />
      <label>origin_description</label>
      <textarea value={state.origin_description} onChange={changeInput} name={'origin_description'} />
      <br />
      <label>superpowers</label>
      <input value={state.superpowers} onChange={changeInput} type={'text'} name={'superpowers'} />
      <br />
      <label>catch_phrase</label>
      <input value={state.catch_phrase} onChange={changeInput} type={'text'} name={'catch_phrase'} />
      <br />
      <button onClick={addNewHero}>add new hero</button>
    </div>
  )
};

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

export default function CreateSuperhero() {
  const [state, setState] = useState({
    nickname: '',
    real_name: '',
    origin_description: '',
    superpowers: '',
    catch_phrase: ''
  });
  const [images, setImages] = useState([]);
  const [newSuperhero, setNewSuperhero] = useState();

  const changeInput = (e) => {
    const {target: { name, value }} = e;
    setState({
      ...state,
      [name]: value
    });
  };

  const changeFileInput = (e) => {
    setImages([...e.target.files]);
  };

  const addNewHero = async () => {
    const formData = new FormData();
    images.forEach(image => {
      formData.append(image.name, image);
    });

    Object.entries(state).map(([key, value]) => {
      formData.append(key, value);
    });

    const res = await axios.post('http://localhost:5000/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    setNewSuperhero(res.data);

    setState({
      nickname: '',
      real_name: '',
      origin_description: '',
      superpowers: '',
      catch_phrase: ''
    });
  };

  useEffect(() => {
    return () => false;
  }, []);

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
      <label>images</label>
      <input multiple={true} onChange={changeFileInput} type={'file'} name={'image'} />
      <br />
      <button onClick={addNewHero}>add new hero</button>

      {newSuperhero && (
        <Redirect to={`/superhero/${newSuperhero.id}`} />
      )}
    </div>
  )
};
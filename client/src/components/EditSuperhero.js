import React, { useState } from 'react';
import axios from 'axios';
import './EditSuperhero.css';

export default function EditSuperhero(props) {
  const { state, setState, setStartEdit, superhero, setSuperhero } = props;
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(false);

  const changeInput = (e) => {
    const {target: { name, value }} = e;
    setState({
      ...state,
      [name]: value
    });
    if (name === 'deleteImages') {
      setState({
        ...state,
        deleteImages: [...state.deleteImages, value]
      });
    }
  };

  const changeFileInput = (e) => {
    setImages([...e.target.files]);
  };

  const selectAvatar = (image) => {
    setState({...state, avatar: image});
    setSelected(!selected);
  };

  const updateHero = async () => {
    const formData = new FormData();
    images.map(image => formData.append(image.name, image));

    Object.entries(state).map(([key, value]) => formData.append(key, value));

    const {data} = await axios.put(`http://localhost:5000/${superhero.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    setSuperhero(data);

    setState({
      nickname: superhero.nickname,
      real_name: superhero.real_name,
      origin_description: superhero.origin_description,
      superpowers: superhero.superpowers,
      catch_phrase: superhero.catch_phrase
    });

    setStartEdit(false);
  };

  return (
    <div className={'form editForm'}>
      <label>Nickname</label>
      <input value={state.nickname} onChange={changeInput} type={'text'} name={'nickname'} />
      <br />
      <label>Real Name</label>
      <input value={state.real_name} onChange={changeInput} type={'text'} name={'real_name'} />
      <br />
      <label>Origin Description</label>
      <textarea value={state.origin_description} onChange={changeInput} name={'origin_description'} rows={'5'} cols={'30'} />
      <br />
      <label>Superpowers</label>
      <input value={state.superpowers} onChange={changeInput} type={'text'} name={'superpowers'} />
      <br />
      <label>Catch Phrase</label>
      <input value={state.catch_phrase} onChange={changeInput} type={'text'} name={'catch_phrase'} />
      <br />
      <label>Images</label>
      <input multiple={true} onChange={changeFileInput} type={'file'} name={'image'} />
      <br />
      <div className={'editImages'}>
        <label>avatar</label>
        {superhero.images && superhero.images.map(image => <img
          src={`http://localhost:5000/${image}`}
          alt={superhero.nickname}
          key={image}
          onClick={() => selectAvatar(image)}
          className={`editImage ${(state.avatar === image) ? 'selected' : ''}`}
        />)}
      </div>

      <div className={'editImages'}>
        <label>delete image</label>
        {superhero.images && superhero.images.map(image => (
          <span key={image}>
            <input value={image} type={'checkbox'} name={'deleteImages'} onChange={changeInput} /> 
            <label>
              <img src={`http://localhost:5000/${image}`} alt={superhero.nickname} className={'editImage'} />
            </label>
          </span>
        ))}
      </div>

      <button onClick={updateHero}>update superhero</button>
    </div>
  )
}

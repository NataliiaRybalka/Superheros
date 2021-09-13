import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';

import { httpRequest } from '../helpers/http.helper';
import { EditSuperhero } from '.';

export default function Superhero() {
  const { request } = httpRequest();

  const [superhero, setSuperhero] = useState();
  const [superpowers, setSuperpowers] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [startEdit, setStartEdit] = useState(false);
  const [state, setState] = useState({
    nickname: '',
    real_name: '',
    origin_description: '',
    superpowers: '',
    catch_phrase: '',
    avatar: null,
    deleteImages: []
  });

  const {id} = useParams();

  const getOneSuperhero = async () => {
    const data = await request(`http://localhost:5000/${id}`);

    setSuperhero(data);
  };

  const getArraySuperpowers = () => {
    setSuperpowers(superhero && superhero.superpowers.split(','));
  };

  const fillInputsValues = () => {
    setState({
      nickname: superhero &&superhero.nickname,
      real_name: superhero && superhero.real_name,
      origin_description: superhero && superhero.origin_description,
      superpowers: superhero && superhero.superpowers,
      catch_phrase: superhero && superhero.catch_phrase,
      deleteImages: []
    });
  }

  useEffect(() => {
    getOneSuperhero();
  }, [id]);

  useEffect(() => {
    getArraySuperpowers();
    fillInputsValues();
  }, [superhero]);

  const deleteSuperhero = async () => {
    const data = await request(`http://localhost:5000/${id}`, 'DELETE');

    if (data === 'DELETED') {
      setIsDeleted(true);
    }
  };

  const editSuperhero = () => {
    setStartEdit(!startEdit);
  };

  return (
    <div>
      {startEdit && <EditSuperhero state={state} setState={setState} setStartEdit={setStartEdit} superhero={superhero} setSuperhero={setSuperhero} />}

      {superhero && (
        <div>
          <div>
            <div>
            <h1>{superhero.nickname} - {superhero.real_name}</h1>
            <h3>{superhero.catch_phrase}</h3>
            </div>

            <div>
              <button onClick={editSuperhero}>edit</button>
              <button onClick={deleteSuperhero}>delete</button>
            </div>
          </div>
          {superhero.avatar && <img src={`http://localhost:5000/${superhero.avatar}`} alt={superhero.nickname} />}
          <p>{superhero.origin_description}</p>
          <h3>{superhero.nickname} has such superpowers:</h3>
          <ul>
            {superpowers && superpowers.map(power => <li key={power}>{power}</li>)}
          </ul>
          {superhero.images && superhero.images.map(image => (
            <img src={`http://localhost:5000/${image}`} alt={superhero.nickname} key={image} />
          ))}
        </div>
      )}

      {isDeleted && <Redirect to={'/'} />}
    </div>
  )
};

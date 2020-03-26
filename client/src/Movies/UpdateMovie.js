import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Axios from 'axios';

function UpdateMovie (props) {

  const [movie, setMovie] = useState({title: '', director: '', metascore: '', stars: []});

  const history = useHistory();

  const params = useParams();  
  console.log("props: ", props, "params: ", params);
    
  useEffect(() =>{
      const result = props.movies.find(object =>{
        return object.id === parseInt(params.id);
      });
    if(result){
      setMovie(result);
    }
  }, [props.movies, params.id])


    function handleChange(event){
        setMovie({...movie, [event.target.name]: event.target.value})
        console.log(movie);
    }

    function handleSubmit(event){
        event.preventDefault();

        Axios
          .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
          .then(res => {
            console.log(`${movie.title} was successfully updated!: `, res)
            props.setChange(res)
          })
          .catch(err => console.log("Error!: ", err))

        setMovie({title: '', director: '', metascore: '', stars: []})
        history.push('/');
    }

  return (
    <div className="movie-card">
        <form>
      <h2>
          <input type='text' name='title' value={movie.title} onChange={handleChange}/>
      </h2>
      <div className="movie-director">
        Director: <em>    
          <input type='text' name='director' value={movie.director} onChange={handleChange}/>
          </em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>
          <input type='text' name='metascore' value={movie.metascore} onChange={handleChange}/>
          </strong>
      </div>
      <h3>Actors</h3>

      {movie.stars.map(star => (
        <div key={star} className="movie-star">
          <input type='text' name={star} value={star} onChange={handleChange}/>
        </div>
      ))}
      </form>
      
      <div className='update-complete' onClick={handleSubmit}>
        Save Changes
      </div>

    </div>
  );
};

export default UpdateMovie; 
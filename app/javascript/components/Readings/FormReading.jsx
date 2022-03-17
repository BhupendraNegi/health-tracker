import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Rails from '@rails/ujs';
import PropTypes from 'prop-types';
import axios from 'axios';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';


export default function FormReading (
  {
    formFor,
    formMethod,
    actionPath,
    renderPath,
  },
) {

	const { id } = useParams();
  let navigate = useNavigate();
  const [redirectNow, setRedirectNow] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [reading, setReading] = useState({ level: 0 });

  const changeReadingState = (valuesToChange) => {
    setReading({ ...reading, ...valuesToChange });
  };

  useEffect(() => {
  	if(id) {
  		setApiLoading(true);
	    axios.get(renderPath)
	    .then((resp) => {
	    	setReading(resp.data.data.attributes);
	    	setApiLoading(false);
	    })
	    .catch((data) => {
	    	console.log('error', data);
	    	setApiLoading(false);
	    })
  	}
  }, []);


  const handleSubmit = (event, errors, data) => {
    event.persist();
    if (errors.length === 0) {
      setApiLoading(true);
      fetch(
        actionPath,
        {
          method: formMethod,
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': Rails.csrfToken(),
          },
          credentials: 'include',
          body: JSON.stringify(data),
        },
      ).then((resp) => resp.json())
        .then((response) => {
        	if (response.error) {
            setMessage(response.error.value);
            setMessageType('danger');
          } else {
            setMessage(`Your Sugar Reading ${formFor}ed Sucessfully`);
            setMessageType('success');
            setTimeout(() => {
              console.log('Hello, World!')
              navigate('/readings');
            }, 800);
          }
          setDisplayMessage(true);
          setApiLoading(false);
        })
        .catch((error) => {
          setDisplayMessage(true);
          setApiLoading(false);
          setMessage(error);
          setMessageType('danger');
        });
    }
  };


  return (
    <>
      { !apiLoading && (
      	<>
	        <AvForm action={actionPath} id="alias_college_form" className="w-25" onSubmit={handleSubmit}>
	          <AvField
	            name="reading[level]"
	            id="level"
	            label="Glucose Level"
	            type="number"
	            onChange={(e) => changeReadingState({ level: e.target.value })}
	            value={reading.level}
	            validate={{ min: { value: 0 }, required: { value: true, errorMessage: 'Glucose level can\'t be blank' }, }}

	          />
	          <Button
	            className="btn btn-elitmus-blue mx-2"
	            type="submit"
	          >
	            {formFor}
	          </Button>
	        </AvForm>
          { displayMessage && (
            <div className="container d-flex justify-content-center mt-2">
              <div className={`alert alert-${messageType}`} role="alert">
                {message}
              </div>
            </div>
          )}
	      </>
      )}
    </>
  );
}

FormReading.propTypes = {
  formFor: PropTypes.string.isRequired,
  formMethod: PropTypes.string.isRequired,
  actionPath: PropTypes.string.isRequired,
  renderPath: PropTypes.string.isRequired,
};

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
  const [apiLoading, setApiLoading] = useState(false);
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
	    	// console.log(resp.data.data)
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
          if (response.success) {
            history.goBack();
            navigate(-1);
            // dispathPageAlert(dispatch, response.message, 'flashnotice alert alert-success');
          } else {
            // dispathPageAlert(dispatch, response.message, 'flasherror alert alert-danger');
          }
          setApiLoading(false);
        })
        .catch(() => {
          // dispathPageAlert(
          //   dispatch,
          //   'An error occured while submitting form. Please try again.',
          //   'flasherror alert alert-danger',
          // );
          setApiLoading(false);
        });
    }
  };


  return (
    <>
      { !apiLoading && (
        <AvForm action={actionPath} id="alias_college_form" className="w-25" onSubmit={handleSubmit}>
          <AvField
            name="reading[level]"
            id="level"
            label="Level"
            type="number"
            onChange={(e) => changeReadingState({ level: e.target.value })}
            value={reading.level}
            validate={{ min: { value: 0 } }}
          />
          <Button
            className="btn btn-elitmus-blue mx-2"
            type="submit"
          >
            {formFor}
          </Button>
        </AvForm>
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

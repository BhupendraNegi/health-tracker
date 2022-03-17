import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import SingleReading from './SingleReading';

const Reading = () => {
	const { id } = useParams();
	const [level, setLevel] = useState(0)
	const [created_at, setDateTime] = useState('')
	const [apiResponse, setApiResponse] = useState(false);

  useEffect(() => {
    axios.get(`/api/v1/readings/${id}`)
    .then((resp) => {
    	setLevel(resp.data.data.attributes.level)
    	setDateTime(resp.data.data.attributes.created_at)
    	setApiResponse(true);
    })
    .catch((data) => {
    	console.log('error', data);
    	setApiResponse(false);
    })
  }, [])

	return (
		<div>
			<div className="my-2">
        <Link replace to="/readings" className="btn btn-sm btn-outline-dark">
        	<i className="fa fa-arrow-left mx-1"></i>
        	Back
        </Link>
      </div>
			<div className="container my-4">
        <Link replace to="/readings/new" className="btn btn-sm btn-primary">
        	<i className="fa fa-plus-circle mx-1"></i>
        	Add New Reading
        </Link>
      </div>
			{ apiResponse && (
				<div className="container">
					<h4>
						Glucose Reading
					</h4>
					<SingleReading
						id={id}
    				level={level}
    				created_at={created_at}
    				key={id}
    			/>
				</div>
			)}
		</div>
	)

}

export default Reading;
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import FormReading from './FormReading';

const EditReading = () => {
	const { id } = useParams();
	return (
		<div className="container">
			<div className="my-2">
        <Link replace to="/readings" className="btn btn-sm btn-outline-dark">
        	<i className="fa fa-arrow-left mx-1"></i>
        	Back
        </Link>
      </div>
      <div className="py-2">
	     	<h4>
					Edit Reading
				</h4>
      </div>
      <FormReading
        formFor="Update"
        formMethod="PUT"
        renderPath={`/api/v1/readings/${id}/edit`}
        actionPath={`/api/v1/readings/${id}`}
      />
		</div>
	)

}

export default EditReading;
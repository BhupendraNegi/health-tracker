import React from 'react';
import { Link } from "react-router-dom";
import FormReading from './FormReading';



const NewReading = () => {
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
					Enter Your Reading
				</h4>
      </div>
      <FormReading
        formFor="Create"
        formMethod="POST"
        renderPath="/api/v1/readings/new"
        actionPath="/api/v1/readings"
      />
		</div>
	)

}

export default NewReading;
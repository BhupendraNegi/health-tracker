import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";


export default function SingleReading (
  {
  	id,
    level,
    created_at,
  },
) {

	return (
		<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 ">
			<div className="border rounded p-2 m-2">
  		  <span>
    			{created_at}
  				<Link replace to={`/readings/${id}/edit`} className="mx-2">
	        	<i className="fa fa-edit mx-1"></i>
	        </Link>
    		</span>
  			<h2>
  				{level} 
  				<small class="text-muted"> mg/dl </small>
        </h2>
    	</div>
  	</div>
  )
}

SingleReading.propTypes = {
	id: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
  created_at: PropTypes.string.isRequired,
};

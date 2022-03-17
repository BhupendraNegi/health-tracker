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
		<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 px-0">
			<div className="border rounded p-2 m-2 bg-light">
				<div className="row">
		    	<div className="col-3 mx-2">
		  			<h5>
		  				{level} 
		  				<small className="text-muted"> mg/dl </small>
		        </h5>
		      </div>
					<div className="col-6">
		  		  <span>
		    			{created_at}
		    		</span>
		    	</div>
		    	<div className="col-2 p-0">
	  				<Link replace to={`/readings/${id}/edit`} className="mx-2">
		        	<i className="fa fa-edit mx-1"></i>
		        </Link>
		    	</div>
	      </div>
    	</div>
  	</div>
  )
}

SingleReading.propTypes = {
	id: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
  created_at: PropTypes.string.isRequired,
};

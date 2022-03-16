import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
// import AddReading from './AddReading';
// import EditReading from './EditReading';
import Reports from './Reports';


const Readings = () => {
	const [readings, setReadings] = useState([])
	const [apiResponse, setApiResponse] = useState(false);

  useEffect(() => {
    axios.get('/api/v1/readings.json')
    .then((resp) => {
    	setReadings(resp.data.data);
    	setApiResponse(true);
    })
    .catch((data) => {
    	console.log('error', data);
    	setApiResponse(false);
    })
  }, [])

  const data = readings.map( (reading, index) => {
    const { id, level, created_at } = reading.attributes
    return (
  		<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 " key={id}>
  			<div className="border rounded p-3 m-2">
	  		  <span>
	    			{created_at}
	  				<Link replace to={`/readings/${id}/edit`} className="mx-2">
		        	<i className="fa fa-edit mx-1"></i>
		        </Link>
	    		</span>
    			<h2>
    				{level} 

	        </h2>
	    	</div>
    	</div>
    )
  })

	return (
		<div>
			<div className="container my-4">
        <Link replace to="/readings/new" className="btn btn-sm btn-primary">
        	<i className="fa fa-plus-circle mx-1"></i>
        	Add New Reading
        </Link>
      </div>
			{ apiResponse && (
				<div className="container">
					<h4>
						Daily Data
					</h4>
					<div className="row">
						{data}
					</div>
				</div>
			)}
			<Reports />
		</div>
	)

}

export default Readings;
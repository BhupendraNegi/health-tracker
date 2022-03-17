import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
// import AddReading from './AddReading';
// import EditReading from './EditReading';


const Readings = () => {
	const [readings, setReadings] = useState([])
	const [minimum, setMinimum] = useState(0)
	const [maximum, setMaximum] = useState(0)
	const [average, setAverage] = useState(0)
	const [apiResponse, setApiResponse] = useState(false);


  useEffect(() => {
    axios.get('/api/v1/readings.json')
    .then((resp) => {
    	setReadings(resp.data.data);
    	console.log(resp.data);
    	setAverage(resp.data.average);
    	setMinimum(resp.data.minimum);
    	setMaximum(resp.data.maximum);
    	setApiResponse(true);
    })
    .catch((data) => {
    	console.log('error', data);
    	setApiResponse(false);
    })
  }, [])

  const reading_levels = readings.map( (reading, index) => {
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
    				<small class="text-muted"> mg/dl </small>
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
						<div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
  						<div className="border rounded p-3 m-2">
								<table class="table table-borderless">
								  <tbody>
								    <tr>
								      <td>
								      	Minimum Reading :
								      </td>
								      <td>
								      	<h6 class="mt-1">
			    								{minimum}
			    								<small class="text-muted"> mg/dl </small>
			    							</h6>
								      </td>
								    </tr>
								    <tr>
								      <td>
								      	Maximum Reading :
								      </td>
								      <td>
								      	<h6 class="mt-1">
			    								{maximum}
			    								<small class="text-muted"> mg/dl </small>
			    							</h6>
								      </td>
								    </tr>
								    <tr>
								      <td>
								      	Average Reading :
								      </td>
								      <td>
								      	<h6 class="mt-1">
				    							{average}
				    							<small class="text-muted"> mg/dl </small>
			    							</h6>
								      </td>
								    </tr>
								  </tbody>
								</table>
				      </div>
				    </div>
					</div>
					<div className="row">
						{reading_levels}
					</div>
				</div>
			)}
		</div>
	)

}

export default Readings;
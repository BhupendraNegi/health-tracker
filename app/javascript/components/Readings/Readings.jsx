import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddReading from './AddReading';
import EditReading from './EditReading';
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
    const { level, created_at } = reading.attributes
    return (
  		<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
    		<p>
    			{level}
    		</p>
    		 <p>
    			{created_at}
    		</p>
    	</div>
    )
  })

	return (
		<div>
			<AddReading />
			{ apiResponse && (
				<div className="container">
					<h4>
						Daily Data
					</h4>
					<div className="row p-2 border rounded">
						{data}
					</div>
				</div>
			)}
			<Reports />
		</div>
	)

}

export default Readings;
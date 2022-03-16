import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddReading from './AddReading';
import EditReading from './EditReading';
import Reports from './Reports';


const Readings = () => {
	const [readings, setReadings] = useState([])

  useEffect(() => {
    axios.get('/api/v1/readings.json')
    .then( resp => setReadings(resp.data.data))
    .catch( data => console.log('error', data))
  }, [])

  const data = readings.map( (reading, index) => {
    const { level, created_at } = reading.attributes

    return (
    	<div>
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
			<div className="container">
				<h2>
					Daily Data
				</h2>
				{data}
			</div>
			<Reports />
		</div>
	)

}

export default Readings;
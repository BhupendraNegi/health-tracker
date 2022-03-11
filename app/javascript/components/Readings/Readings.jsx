import React, { useState, useEffect } from 'react';
import axios from 'axios'

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
			<div className="card">
				{data}
			</div>
		</div>
	)

}

export default Readings;
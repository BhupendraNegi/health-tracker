import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { DateRangePicker } from 'react-date-range';
import AverageReading from './AverageReading';
import SingleReading from './SingleReading';

const Readings = () => {
	const [readings, setReadings] = useState([])
	const [minimum, setMinimum] = useState(0)
	const [maximum, setMaximum] = useState(0)
	const [average, setAverage] = useState(0)
	const [apiResponse, setApiResponse] = useState(false);
	const [state, setState] = useState([
	  {
	    startDate: new Date(),
	    endDate: new Date(),
	    key: 'selection'
	  }
	]);


  useEffect(() => {
    axios.get('/api/v1/readings.json')
    .then((resp) => {
    	setReadings(resp.data.data);
    	setAverage(resp.data.average);
    	setMinimum(resp.data.minimum);
    	setMaximum(resp.data.maximum);
    	setApiResponse(true);
    	console.log(state);
    })
    .catch((data) => {
    	console.log('error', data);
    	setApiResponse(false);
    })
  }, []);


  const reading_levels = readings.map( (reading, index) => {
    const { id, level, created_at } = reading.attributes
    return (
    	<SingleReading
    		id={id}
    		level={level}
    		created_at={created_at}
    		key={id}
    	/>
    )
  })

	return (
		<div>
			<div className="container">
				<div className="row">
					<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 d-flex justify-content-start">
						<h4>
							Glucose Reading Analysis
						</h4>
					</div>
					<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 d-flex justify-content-end">
		        <Link replace to="/readings/new" className="btn btn-sm btn-primary">
		        	<i className="fa fa-plus-circle mx-1"></i>
		        	Add New Reading
		        </Link>
		      </div>
       	</div>
      </div>
      <hr />
      <div className="row">
				<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
		      <DateRangePicker
					  onChange={item => setState([item.selection])}
					  showSelectionPreview={true}
					  moveRangeOnFirstSelection={false}
					  months={1}
					  ranges={state}
					  direction="horizontal"
					  preventSnapRefocus={true}
					  calendarFocus="backwards"
					/>
				</div>
				{ apiResponse && (
					<div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
						<AverageReading
						  minimum={minimum}
	  					maximum={maximum}
	  					average={average}
	  				/>
	  			</div>
	  		)}
			</div>
			{ apiResponse && (
				<div className="container">
					<div className="row mb-4">
						{reading_levels}
					</div>
				</div>
			)}
		</div>
	)

}

export default Readings;
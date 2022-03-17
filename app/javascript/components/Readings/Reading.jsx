import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

const Reading = () => {
	const { id } = useParams();
	const [level, setLevel] = useState(0)
	const [created_at, setDateTime] = useState('')
	const [apiResponse, setApiResponse] = useState(false);

  useEffect(() => {
    axios.get(`/api/v1/readings/${id}`)
    .then((resp) => {
    	setLevel(resp.data.data.attributes.level)
    	setDateTime(resp.data.data.attributes.created_at)
    	setApiResponse(true);
    })
    .catch((data) => {
    	console.log('error', data);
    	setApiResponse(false);
    })
  }, [])

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
						Glucose Reading
					</h4>
					<div className="row">
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
					</div>
				</div>
			)}
		</div>
	)

}

export default Reading;
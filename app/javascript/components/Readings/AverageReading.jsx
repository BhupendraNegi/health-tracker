import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function AverageReading (
  {
    minimum,
    maximum,
    average,
  },
) {

	return (
		<div className="border rounded p-1 m-2 bg-light">
			<table className="table table-borderless m-0">
			  <tbody>
			    <tr>
			      <td>
			      	Minimum Reading :
			      </td>
			      <td>
			      	<h6 className="mt-1">
								{minimum}
								<small className="text-muted"> mg/dl </small>
							</h6>
			      </td>
			    </tr>
			    <tr>
			      <td>
			      	Maximum Reading :
			      </td>
			      <td>
			      	<h6 className="mt-1">
								{maximum}
								<small className="text-muted"> mg/dl </small>
							</h6>
			      </td>
			    </tr>
			    <tr>
			      <td>
			      	Average Reading :
			      </td>
			      <td>
			      	<h6 className="mt-1">
  							{average}
  							<small className="text-muted"> mg/dl </small>
							</h6>
			      </td>
			    </tr>
			  </tbody>
			</table>
	  </div>
	)
}

AverageReading.propTypes = {
  minimum: PropTypes.number.isRequired,
  maximum: PropTypes.number.isRequired,
  average: PropTypes.string.isRequired,
};

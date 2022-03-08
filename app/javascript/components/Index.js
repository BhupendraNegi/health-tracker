import React from 'react'
import { Route, Switch } from 'react-router-dom'


const Index = () => {
	return (
		<Switch>
			<Route exact path="/" component="GlucoseReadings" />
			<Route exact path="/glucose_readings/:id" component="GlucoseReadings" />
		</Switch>
	)
}

export default Index
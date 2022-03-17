module Api
	module V1
		class ReadingsController < ApplicationController
			before_action :authenticate_user!

		  def index
		    readings = current_user.readings

		    render json: details_of_readings(readings)
		  end

		  def show
		    reading = Reading.find_by(id: params[:id])

		    render json: ReadingSerializer.new(reading).serialized_json
		  end

		  def new
		  end

		  def create
		  	reading = Reading.new(reading_params.merge(user_id: current_user.id))
		  	if reading.save
		  		render json: ReadingSerializer.new(reading).serialized_json
		  	else
		  		render json: { error: reading.errors.messages }, status: 422
		  	end
		  end

		  def edit
		  	reading = Reading.find_by(id: params[:id])
		  	render json: ReadingSerializer.new(reading).serialized_json
		  end

		  def update
		  	reading = Reading.find_by(id: params[:id])
		  	if reading.update(reading_params)
		  		render json: ReadingSerializer.new(reading).serialized_json
		  	else
		  		render json: { error: reading.errors.messages }, status: 422
		  	end
		  end

		  def destroy
		  	reading = Reading.find_by(id: params[:id])
		  	if reading.destroy
		  		head :no_content
		  	else
		  		render json: { error: reading.errors.messages }, status: 422
		  	end
		  end

		  private

	  		def reading_params
	  			params.fetch(:reading, {}).permit(:level)
	  		end

	  		def details_of_readings(readings)
		  		serialized_readings = ReadingSerializer.new(readings).as_json
			    reading_details = {
			    	maximum: readings&.maximum(:level),
			    	minimum: readings&.minimum(:level),
			    	average: readings&.average(:level)&.round(2)
			    }
			    serialized_readings.merge(reading_details)
	  		end

		end
	end
end

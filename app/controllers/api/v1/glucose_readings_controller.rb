module api
	module v1
		class GlucoseReadingsController < ApplicationController
		  def index
		    glucose_readings = current_user.glucose_readings

		    render json: GlucoseReadingSerializer.new(glucose_readings).serialized_json
		  end

		  def show
		    glucose_reading = GlucoseReading.find_by(id: params[:id])

		    render json: GlucoseReadingSerializer.new(glucose_reading).serialized_json
		  end

		  def create
		  	glucose_reading = GlucoseReading.new(glucose_reading_params)
		  	if glucose_reading.save
		  		render json: GlucoseReadingSerializer.new(glucose_reading).serialized_json
		  	else
		  		render json: { error: glucose_reading.errors.messages }, status: 422
		  	end
		  end

		  def update
		  	glucose_reading = GlucoseReading.find_by(id: params[:id])
		  	if glucose_reading.update(glucose_reading_params)
		  		render json: GlucoseReadingSerializer.new(glucose_reading).serialized_json
		  	else
		  		render json: { error: glucose_reading.errors.messages }, status: 422
		  	end
		  end

		  def destroy
		  	glucose_reading = GlucoseReading.find_by(id: params[:id])
		  	if glucose_reading.destroy
		  		head :no_content
		  	else
		  		render json: { error: glucose_reading.errors.messages }, status: 422
		  	end
		  end

		  private

	  		def glucose_reading_params
	  			params.requires(:glucose_reading).permit(:level)
	  		end

		end
	end
end

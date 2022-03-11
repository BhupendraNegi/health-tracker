module Api
	module V1
		class ReadingsController < ApplicationController
			before_action :authenticate_user!

		  def index
		    readings = current_user.readings
		    a = ReadingSerializer.new(readings).serialized_json
		    puts a
		    render json: a
		  end

		  def show
		    reading = Reading.find_by(id: params[:id])

		    render json: ReadingSerializer.new(reading).serialized_json
		  end

		  def create
		  	reading = Reading.new(reading_params)
		  	if reading.save
		  		render json: ReadingSerializer.new(reading).serialized_json
		  	else
		  		render json: { error: reading.errors.messages }, status: 422
		  	end
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
	  			params.requires(:reading).permit(:level)
	  		end

		end
	end
end

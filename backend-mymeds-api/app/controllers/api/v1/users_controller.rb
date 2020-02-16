class Api::V1::UsersController < ApplicationController

    def index 
        @users = User.all 
        render json: @users, status: 200
    end 
    
    
    def new 
        @user = User.new
        render json: UserSerializer.new(user)
    end 
    
    def create
        user = User.new(user_params)
        if user.save
            session[:user_id] = user.id
            render json: UserSerializer.new(user)
        else 
            render :new 
        end
    end

    def show 
        @user = User.find(params[:id])
        render json: @user 
    end 

    def destroy 
        @user = User.find(params[:id])
        @user.delete 

        render json: {user_id: @user.id}
    end 

    private
        def user_params
            params.require(:user).permit(:name, :email, :password)
        end
end
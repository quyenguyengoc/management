Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do

      resources :date_cells
    end
  end
end

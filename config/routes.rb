Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do

      resources :month_infos, only: :update

      resources :date_cells

    end
  end
end

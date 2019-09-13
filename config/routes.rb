Rails.application.routes.draw do
  mount APIS::API::Base, at: '/'
end

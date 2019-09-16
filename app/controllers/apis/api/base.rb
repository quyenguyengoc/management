class APIS::API::Base < Grape::API
  format :json
  default_format :json

  prefix 'api'
  version 'v1', using: :path

  mount APIS::API::V1::Dashboard
end

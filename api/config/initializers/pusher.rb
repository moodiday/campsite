# frozen_string_literal: true

# Pusher.app_id = Rails.application.credentials.dig(:pusher, :app_id)
# Pusher.key = Rails.application.credentials.dig(:pusher, :key)
# Pusher.secret = Rails.application.credentials.dig(:pusher, :secret)
# Pusher.cluster = Rails.application.credentials.dig(:pusher, :cluster)

Pusher.app_id = ENV.fetch('PUSHER_APP_ID')
Pusher.key = ENV.fetch('PUSHER_KEY')
Pusher.secret = ENV.fetch('PUSHER_SECRET')
Pusher.cluster = ENV.fetch('PUSHER_CLUSTER')
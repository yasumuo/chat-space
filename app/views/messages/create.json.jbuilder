json.id @message.id
json.user_name @message.user.name
json.content @message.content
json.image @message.image.to_s
json.created_at @message.created_at.to_s

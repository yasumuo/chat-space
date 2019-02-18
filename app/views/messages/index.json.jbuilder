if @new_message.present?    # 中身があるか判定
  json.array! @new_message do |message|
    json.id message.id
    json.user_name message.user.name
    json.content message.content
    json.image message.image
    json.created_at message.created_at.to_s
  end
end

class MessagesController < ApplicationController
  before_action :set_group
  before_action :set_members

  def index
    @message = Message.new
   # @members = @group.users
    @messages = @group.messages.includes(:user)

    respond_to do |format|
      format.html
      format.json { @new_message = @group.messages.where('id > ?', params[:lastID]).includes(:user) }
    end
  end

  def create
    @message = @group.messages.new(message_params)
    respond_to do |format|
      if @message.save
        format.html { redirect_to group_messages_path(@group), notice: 'メッセージが送信されました' }
        format.json
      else
        format.html { @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
        render :index}
      end
    end
  end

  private
  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

  def set_members
    @members = set_group.users
  end
end

$(function() {

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`;
    $('#user-search-result').append(html);
  }

  function appendNoUser(text) {
    var html = `<div class="chat-group-user clearfix">
                  ${text}
                </div>`;
    $('#user-search-result').append(html);
  }

  // チャットメンバーに追加するHTMLを作成
  function buildHTML(id, name) {
    var html = `<div class="chat-group-user clearfix js-chat-member" id="group-user-${id}">
                  <input name="group[user_ids][]" type="hidden" value="${id}">
                  <p class="chat-group-user__name">${name}</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}">削除</a>
                </div>`;
    return html;
  }

  // チャットメンバー一覧に表示された「削除」ボタンクリック時のイベント
  $('#chat-group-users').on('click', '.user-search-remove', function() {
    var userId = $(this).attr('data-user-id');

    // ユーザー一覧から除外
    $('#group-user-' + userId).remove();
  })

  // 検索結果で表示された「追加」ボタンクリック時のイベント
  $('#user-search-result').on('click', '.user-search-add', function() {
    $('#user-search-field').val('');
    var userId = $(this).attr('data-user-id');
    var userName = $(this).attr('data-user-name');
    $('#chat-group-users').append(buildHTML(userId, userName));
    $(this).parent().remove();
  });

  $('#user-search-field').on('change keyup', function() {
    var input = $(this).val();
    if (input.length > 0) {
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { name: input },
        dataType: 'json'
      })
      .done(function(users) {
        $('#user-search-result').empty();
        if (users.length !== 0) {
          users.forEach(function(user) {
            appendUser(user);
          });
        } else {
          appendNoUser("該当するユーザーはいません");
        }
      })
      .fail(function() {
        alert('ユーザーの検索に失敗しました');
      });
    } else {
      $('#user-search-result').empty();
    }
  });
});

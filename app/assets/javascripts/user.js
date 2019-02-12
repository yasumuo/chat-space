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

  $('#user-search-field').on('keyup', function() {
    console.log($(this).val());
    var input = $(this).val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { name: input },
      dataType: 'json'
    })
    .done(function(users) {
      console.log('ok');
      console.log(users);
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
  });
});

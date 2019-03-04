$(function() {
  function buildHTML(message) {
    let content = message.content ? `<div class="main__message__text">${message.content}</div>` : "";
    let img = message.image ? `<div class="main__message__image">
                                <img src="${message.image}">
                                </div>` : "";
    let html = `<div class="main__message" data-id="${message.id}">
                  <div class="main__message__name">${message.user_name}</div>
                  <div class="main__message__time">${message.created_at}</div>
                  ${content}
                  ${img}
                </div>`;
    return html;
  }

  // クライアント側に表示されているものと、DBに追加されたメッセージの
  // 差分を取得する。更新がある場合は更新分を返して表示させる
  function update() {
    var messageId = $('.main__message:last').data('id');   // 表示されている最新のメッセージIDを取得
    var url = $('#new_message').attr('action');

    $.ajax({
      url: url,
      type: 'GET',
      data: { lastID: messageId },
      dataType: 'json'
    })
    .done(function(data) {
      $.each(data, function(i, data) {   // 配列内の要素からHTMLを作成
        var html = buildHTML(data);
        $('.main__message-list').append(html);
      });
      scroll();
    })
    .fail(function() {
      alert('通信エラー！');
    });
  }

  // 最新メッセージが表示されている箇所にスクロール
  function scroll() {
    $('.main').animate({scrollTop: $('.main')[0].scrollHeight}, 'fast');
  }


  // チャット画面を表示した場合の処理
  var locationArray = location.pathname.split('/');
  if ($.inArray('groups', locationArray) >= 0 && $.inArray('messages', locationArray) >= 0) {
    // 最新メッセージまでスクロールして表示
    scroll();
    // 5秒に1回チャットを更新して、最新メッセージを取得して表示
    setInterval(update, 5*1000);
  }


  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var data = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: 'POST',
      data: data,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      let html = buildHTML(data);
      console.log('返ってきたデータ', data);
      $('.main__message-list').append(html);
      // messageがある箇所をスクロール
      scroll();
      //$('.main').animate({scrollTop: $('.main')[0].scrollHeight}, 'fast');
    })
    .fail(function(e) {
      alert('投稿に失敗しました');
    });
    $(this)[0].reset();

    return false;
  });
});

$(function() {
  function buildHTML(message) {
    let content = message.content ? `<div class="main__message__text">${message.content}</div>` : "";
    let img = message.image ? `<div class="main__message__image">
                                <img src="${message.image}">
                                </div>` : "";
    let html = `<div class="main__message">
                  <div class="main__message__name">${message.user_name}</div>
                  <div class="main__message__time">${message.created_at}</div>
                  ${content}
                  ${img}
                </div>`;
    return html;
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
      $('.main__message-list').append(html);
      // messageがある箇所をスクロール
      $('.main').animate({scrollTop: $('.main')[0].scrollHeight}, 'fast');
    })
    .fail(function(e) {
      alert('投稿に失敗しました');
    });
    $(this)[0].reset();

    return false;
  });
});

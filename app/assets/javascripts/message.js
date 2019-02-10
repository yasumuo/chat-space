$(function() {
  function getFormatDate(date) {
    var timestamp = Date.parse(date);
    var d = new Date(timestamp);
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var hours = "0" + d.getHours();
    var formattedHours = hours.slice(-2);
    var minutes = d.getMinutes();
    //var seconds = d.getSeconds();

    return `${year}-${month}-${day}　${formattedHours}:${minutes}　`;
  }
  function buildHTML(message) {
    let content = message.content ? `<div class="main__message__text">${message.content}</div>` : "";
    let img = message.image ? `<div class="main__message__image">
                                <img src="${message.image}">
                                </div>` : "";
    let html = `<div class="main__message">
                  <div class="main__message__name">${message.user_name}</div>
                  <div class="main__message__time">${getFormatDate(message.created_at)}</div>
                  ${content}
                  ${img}
                </div>`;
    return html;
  }
  //console.log("read!!");
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
      //console.log('posted ok!');
      let html = buildHTML(data);
      $('.main__message-list').append(html);
      // messageがある箇所をスクロール
      $('.main').animate({scrollTop: $('.main')[0].scrollHeight}, 'fast');
    })
    .fail(function(e) {
      alert('投稿に失敗しました');
    });
    $('.message').val('');
    $('#message_image').val('');

    return false;
  });
});

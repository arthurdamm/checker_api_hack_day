$(function () {
  console.log('CheckerBuddy Loading...');

  $('button[type=submit]').click(function() {
    console.log("clicked submit!");
    const email = $('input[name=email]').val();
    const password = $('input[name=password]').val();
    console.log('EMAIL:', email);

    json = {};
    json.api_key = '96a4134e30845c1fe3ed6e016f19e423';
    json.email = email;
    json.password = password;
    json.scope = "checker";
 
    /* TRY THIS */
    $.ajax('https://intranet.hbtn.io/users/auth_token.json', {
      data: JSON.stringify({json}),
      contentType: 'application/json',
      type: 'POST',
      success: function (data) {
        console.log("DATA:", data);
      }
    });

    /* OR TRY THIS */
    const settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://intranet.hbtn.io/users/auth_token.json",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "User-Agent": "CheckerBuddy/0.0.1",
        "Accept": "*/*",
        "Cache-Control": "no-cache",
        "Host": "intranet.hbtn.io",
        "Accept-Encoding": "gzip, deflate",
        "Connection": "keep-alive",
        "cache-control": "no-cache"
      },
      "processData": false,
      "data": JSON.stringify({json}),
    }
    $.ajax(settings).done(function (data) {
        console.log("DATA:", data);
    });

  });

});
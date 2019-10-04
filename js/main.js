$(function () {
  const session = {};

  console.log('CheckerBuddy Loading...');

  $('button[type=submit]').click(function() {
    console.log("clicked submit!");
    const email = $('input[name=email]').val();
    const password = $('input[name=password]').val() || '650@holbertonschool.com';
    console.log('EMAIL:', email);

    json = {};
    json.api_key = '96a4134e30845c1fe3ed6e016f19e423';
    json.email = email;
    json.password = password;
    json.scope = "checker";
 
    let request = {
      "async": true,
      "crossDomain": true,
      "url": "https://cors-anywhere.herokuapp.com/https://intranet.hbtn.io/users/auth_token.json",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
      },
      "data": JSON.stringify(json)
    }
    $.ajax(request).done(function (response) {
      console.log(response);
      session.auth_token = response.auth_token;
      console.log("SESSION:", session);
    });
  });

});
$(function () {
  const session = {};
  session.tasks = [];

  console.log('CheckerBuddy Loading...');

  $('button#login_button').click(function() {
    console.log("LOGIN");
    const email = $('input[name=email]').val();
    const password = $('input[name=password]').val();
    const json = {};
    json.api_key = '96a4134e30845c1fe3ed6e016f19e423';
    json.email = email;
    json.password = password;
    json.scope = "checker";
 
    let authenticationRequest = {
      "async": true,
      "crossDomain": true,
      "url": "https://cors-anywhere.herokuapp.com/https://intranet.hbtn.io/users/auth_token.json",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
      },
      "data": JSON.stringify(json)
    }
    $.ajax(authenticationRequest).done(function (response) {
      console.log(response);
      session.auth_token = response.auth_token;
      console.log("SESSION:", session);
    });
  });

  $('button#project_button').click(function() {
    const pid = $('input[name=project]').val() || "300";
    console.log("PROJECT:", pid);

    let projectRequest = {
      "async": true,
      "crossDomain": true,
      "url": `https://cors-anywhere.herokuapp.com/https://intranet.hbtn.io/projects/${pid}.json?auth_token=${session.auth_token}`,
      "method": "GET",
    }
    $.ajax(projectRequest).done(function (data) {
      console.log("PROJECT:", data);
      $('#task_header').html(data.name);
      for (const task of data.tasks) {
        $('#task_list').append(`<li class="task" task-id="${task.id}"">${task.title}</li>`);
      }
    });
  });

  $(document).on('click', 'li.task', function () {
    const taskId = $(this).attr("task-id");
    console.log("TASK:", taskId);

    let correctionRequest = {
      "async": true,
      "crossDomain": true,
      "url": `https://cors-anywhere.herokuapp.com/https://intranet.hbtn.io/tasks/${taskId}/start_correction.json?auth_token=${session.auth_token}`,
      "method": "POST",
    }
    $.ajax(correctionRequest).done(function (data) {
      console.log("CORRECTION:", data);
      session.tasks[taskId] = data.id;
  
      let resultRequest = {
      "async": true,
      "crossDomain": true,
      "url": `https://cors-anywhere.herokuapp.com/https://intranet.hbtn.io/correction_requests/${data.id}.json?auth_token=${session.auth_token}`,
      "method": "GET",
      }
      $.ajax(resultRequest).done(function (data) {
        console.log("RESULT:", data);

      });
    });
  });

});

import * as apis from "./apis.js"
import { pollResult, populateTasks } from "./helpers.js"

let authToken = ""
const tasks = []

$(function() {
  $(
    ".sign-in-fail, .project-search-box, .invalid-project, .project-container"
  ).hide()

  // On-click handler for next button
  $(document).on("click", "input[value=Next]", () => {
    $(".validating-spinner").fadeOut(300, () =>
      $(".validating-spinner").fadeOut(300)
    )

    const request_json = {
      api_key: $("input[name=api]").val(),
      email: $("input[name=email]").val(),
      password: $("input[name=password]").val(),
      scope: "checker"
    }

    // Authenticate and log in user
    $.ajax(apis.authenticationRequest(request_json))
      .done(({ auth_token }) => {
        authToken = auth_token
        setTimeout(() => $(".project-search-box").show(), 200)
        $("input[name=next]").val("Check")
      })
      .fail(() => {
        $(".project-search-box").hide()
        setTimeout(() => $(".sign-in-fail").show(), 500)
      })
  })

  // On-click handler for check button
  $(document).on("click", "input[value=Check]", () => {
    $(".project-container, .invalid-project").hide()
    const projectId = $("input[name=project]").val()

    // Request project number
    $.ajax(apis.projectRequest(projectId, authToken))
      .done(data => populateTasks(data))
      .fail(() => {
        setTimeout(() => $(".invalid-project").show(), 500)
      })
  })

  // On-click handler for individual tasks
  $(document).on("click", ".task-button", function() {
    correctTask($(this).attr("task-id"))
  })

  // On-click handler for all tasks
  $(document).on("click", "#task-header", () => {
    $(".task-button").each((i, e) => correctTask(e.getAttribute("task-id")))
  })

  const correctTask = taskId => {
    $.ajax(apis.correctionRequest(taskId, authToken)).done(data => {
      tasks[taskId] = data.id

      $(`.task-button[task-id=${taskId}]`)
        .find(".lds-heart")
        .show()
      pollResult(data.id, authToken)
    })
  }
})

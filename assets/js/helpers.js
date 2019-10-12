import * as apis from "./apis.js";

// returns output message based on given score
export const getOutputMessage = score => {
  const { req, output } = score;
  if (!req.total && !output.total) return "No checks on this assignment.";
  if (req.pass === req.total && output.pass === output.total)
    return "You have all green checks!";
  if (!req.pass && !output.pass) return "You have all red checks.";
  if (req.pass === 1 && !output.pass) return "Only the first check is green.";
  if (req.pass === req.total && !output.pass)
    return "All the output checks are red, but all the requirement checks are green.";
  if (req.pass < req.total && output.pass === output.total)
    return "You have one or more requirement red checks.";
  if (req.pass === req.total && output.pass < output.total)
    return "You have one or more output red checks.";
};

// calculates score based on given data set
export const getScore = data => {
  return data.result_display.checks.reduce(
    (obj, el) => {
      if (el.check_label === "requirement") {
        obj.req.total++;
        el.passed ? obj.req.pass++ : null;
      } else if (el.check_label === "code") {
        obj.output.total++;
        el.passed ? obj.output.pass++ : null;
      }
      return obj;
    },
    { req: { total: 0, pass: 0 }, output: { total: 0, pass: 0 } }
  );
};

export const populateTasks = data => {
  $(".project-container").show();
  $(".invalid-project").hide();
  $(".tasks-container")
    .empty()
    .append(
      `<button class="list-group-item list-group-item-action active" type="button" id="task-header"><h3>${data.name}</h3></button>`
    );
  data.tasks.forEach(({ id, title }, i) => {
    $(".tasks-container").append(
      `<button type="button" class="list-group-item list-group-item-action task-button" task-id='${id}'><h4><u>${i++}. ${title}</u></h4><div style="float: right; display: none;" class="lds-heart"><div></div></div></button>`
    );
  });
};

export const collectData = data => {
  const requirements = [];
  const outputs = [];
  data.result_display.checks.forEach(({ check_label, passed }) => {
    check_label === "requirement"
      ? requirements.push(passed)
      : outputs.push(passed);
  });
  return {
    reqStr: requirements.map(x => (x ? "✅" : "❌")).join(""),
    outStr: outputs.map(x => (x ? "✅" : "❌")).join("")
  };
};

export const pollResult = function(dataId, authToken) {
  $.ajax(apis.resultRequest(dataId, authToken)).done(function(data) {
    const { status, task_id } = data;
    if (status !== "Done") {
      setTimeout(() => pollResult(dataId, authToken), 2000);
    } else {
      $(".task-button").each(function() {
        if ($(this).attr("task-id") === task_id.toString()) {
          clearContainer(task_id);
          populateResults(data, $(this));
        }
      });
    }
  });
};

const clearContainer = taskId => {
  $(`.task-button[task-id=${taskId}]`)
    .find(".lds-heart")
    .hide()
    .children(".results")
    .remove()
    .children(".msg")
    .remove();
};

const populateResults = (data, ele) => {
  const msgStr = getOutputMessage(getScore(data));
  const { reqStr, outStr } = collectData(data);
  ele
    .append(`<div class="results"><i>Requirements:</i> ${reqStr}</div>`)
    .append(`<div class="results"><i>Outputs:</i> ${outStr}</div>`)
    .append(`<h4 class="msg">${msgStr}</h4>`);
  if (msgStr === "You have all green checks!") {
    const randInt = Math.floor(Math.random() * messages[msgStr].length);
    ele.append(`<p class="msg">\t${messages[msgStr][randInt]}</p>`);
  } else {
    messages[msgStr].forEach(elem => {
      ele.append(`<p class="msg">\t${elem}</p>`);
    });
  }
};

const messages = {
  "You have all green checks!": [
    "Congratulations :)",
    "Good work buddy!",
    "Wow, that hard work really paid off!",
    "Nice job! Now go help your peers ;)"
  ],
  "You have all red checks.": [
    "Is your GitHub repo set up with the correct name? The checker might not find it.",
    "Is the file pushed to the master branch? The checker clones your repo from master.",
    "Is the file for this task named correctly? Do you have a README that is not empty?"
  ],
  "Only the first check is green.": [
    "Does your program compile locally with no errors or warning? Make sure to run gcc with the flags -Wall -Werror -pedantic -Wextra.",
    "Do you have the same gcc (or python) version as the project requirements? Your program might compile and run locally but not on the checker side.",
    "Is there a segmentation fault, or timeout?"
  ],
  "All the output checks are red, but all the requirement checks are green.": [
    'Try piping your program in the command "cat -e" to make sure there is not trailing whitespace: "./a.out | cat -e". You can also use "diff" on your output and the example output.',
    'Is your file executable? Did you run "chmod u+x" on your file?',
    "Did you think of all the edge cases? You can collaborate with your peers and change the main file provided as an example."
  ],
  "You have one or more requirement red checks.": [
    "Do you have comments/documentation? Are your header files include-guarded (if applicable)?",
    "Are your files betty compliant, even the header files? (or pep8, shellcheck etc...)",
    "Do you have a shebang (Python/Shell)? Do you have a new line at the end of your file?"
  ],
  "You have one or more output red checks.": [
    "Did you think about all the edge cases? You can collaborate with your peers and change the main file provided as an example.",
    "Did you check if Valgrind passes with no memory leaks or errors (if applicable)?",
    "Did you test your code in a container (if you have access to one, it is a great way of reproducing the checker environment)?"
  ],
  "No checks on this assignment.": ["On to the next one!"]
};

export default messages;

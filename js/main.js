if ('serviceWorker' in navigator) {
    // register service worker
    navigator.serviceWorker.register('/service-worker.js');
}
$(function() {
    const session = {}
    session.tasks = []

    console.log('CheckerBuddy Loading...')

    $('div#failing').hide()
    $('div#showing').hide()
    $('div#failing-project').hide()
    $('div.project-container').hide()

    const correctionFunc = function(taskId) {
        console.log('correctionFunc() taskId:', taskId)
        const correctionRequest = {
            async: true,
            crossDomain: true,
            url: `https://intranet.hbtn.io/tasks/${taskId}/start_correction.json?auth_token=${session.auth_token}`,
            method: 'POST'
        }
        $.ajax(correctionRequest).done(function(data) {
            console.log('CORRECTION:', data)
            session.tasks[taskId] = data.id

            console.log('SHOWING...')
            $(`.task_button[task-id=${taskId}]`)
                .find('.lds-heart')
                .show()
            const pollResult = function() {
                console.log('POLLING:', data.id)
                const resultRequest = {
                    async: true,
                    crossDomain: true,
                    url: `https://intranet.hbtn.io/correction_requests/${data.id}.json?auth_token=${session.auth_token}`,
                    method: 'GET'
                }
                $.ajax(resultRequest).done(function(data) {
                    console.log('POLL RESULT:', data)
                    if (data.status !== 'Done') {
                        setTimeout(pollResult, 2000)
                    } else {
                        /* collect checker data */
                        const requirements = []
                        const outputs = []
                        for (const check of data.result_display.checks) {
                            if (check.check_label === 'requirement') {
                                requirements.push(check.passed)
                            } else if (check.check_label === 'code') {
                                outputs.push(check.passed)
                            }
                        }
                        const requirementsStr = requirements
                              .map(x => (x ? '✅' : '❌'))
                              .join('')
                        const outputsStr = outputs.map(x => (x ? '✅' : '❌')).join('')

                        /* Append data to task list element */
                        $('.task_button').each(function(index) {
                            if ($(this).attr('task-id') === data.task_id.toString()) {
                                const msgStr = whatMessage(data)
                                $(`.task_button[task-id=${taskId}]`)
                                    .find('.lds-heart')
                                    .hide()
                                $(this)
                                    .children('.results')
                                    .remove()
                                $(this)
                                    .children('.msg')
                                    .remove()
                                $(this).append(
                                    `<div class="results"><i>Requirements: ${requirementsStr}</i></div>`
                                )
                                $(this).append(
                                    `<div class="results"><i>Outputs: ${outputsStr}</i></div>`
                                )
                                $(this).append(`<h4 class="msg">${msgStr}</h4>`)
                                if (msgStr === 'You have all green checks!') {
                                    const elem =
                                          messageDict[msgStr][
                                              Math.floor(Math.random() * messageDict[msgStr].length)
                                          ]
                                    $(this).append(`<p class="msg">    ${elem}</p>`)
                                } else {
                                    messageDict[msgStr].forEach(elem => {
                                        $(this).append(`<p class="msg">    ${elem}</p>`)
                                    })
                                }
                            }
                        })
                    }
                })
            }
            pollResult()
        })
    }

    $(document).on('click', 'input[value=Next]', function() {
        console.log('LOGIN')
        $('div#failing').hide()
        $('div#showing').hide()
        $('#validating').fadeOut(300, function() {
            $('#validating').fadeOut(300)
        })
        const json = {
            api_key: $('input[name=api]').val(),
            email: $('input[name=email]').val(),
            password: $('input[name=password]').val(),
            scope: 'checker'
        }

        const authenticationRequest = {
            async: true,
            crossDomain: true,
            url: 'https://intranet.hbtn.io/users/auth_token.json',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(json)
        }
        $.ajax(authenticationRequest)
            .done(function(data) {
                console.log('AUTH:', data)
                if (data.auth_token) {
                    session.auth_token = data.auth_token
                    setTimeout(() => $('div#showing').show(), 200)
                    $('input[name=next]').val('Play')
                }
            })
            .fail(() => {
                $('div#showing').hide()
                setTimeout(() => $('div#failing').show(), 500)
            })
    })

    $(document).on('click', 'input[value=Play]', function() {
        const projectId = $('input[name=project]').val()
        console.log('Play:', projectId)
        $('div.project-container').hide()
        $('div#failing-project').hide()

        const projectRequest = {
            async: true,
            crossDomain: true,
            url: `https://intranet.hbtn.io/projects/${projectId}.json?auth_token=${session.auth_token}`,
            method: 'GET'
        }
        $.ajax(projectRequest)
            .done(function(data) {
                console.log('PROJECT:', data)
                $('div.project-container').show()
                $('div#failing-project').hide()
                $('.tasks_container').empty()
                $('.tasks_container').append(
                    `<button class="list-group-item list-group-item-action active" id="task_header" type="button"><h3>${data.name}</h3></button>`
                )
                let i = 0;
                for (const task of data.tasks) {
                    $('.tasks_container').append(
                        `<button type="button" class="list-group-item list-group-item-action task_button" task-id='${task.id}'><h4><u>${i++}. ${task.title}</u></h4><div style="float: right; display: none;" class="lds-heart"><div></div></div></button>`
                    )
                }
            })
            .fail(() => {
                console.log('FAIL!')
                $('div.project-container').hide()
                setTimeout(() => $('div#failing-project').show(), 500)
            })
    })

    $(document).on('click', '.task_button', function() {
        correctionFunc($(this).attr('task-id'))
    })

    $(document).on('click', '#task_header', function() {
        $('.task_button').each((i, e) => correctionFunc(e.getAttribute('task-id')))
    })
})

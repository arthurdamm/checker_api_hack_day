const messageDict = {
    'You have all red checks.': [
        'Is your GitHub repo set up with the correct name? The checker might not find it.',
        'Is the file pushed to the master branch? The checker clones your repo from master.',
        'Is the file for this task named correctly? Do you have a README that is not empty?'
    ],
    'Only the first check is green.': [
        'Does your program compile locally with no errors or warning? Make sure to run gcc with the flags -Wall -Werror -pedantic -Wextra.',
        'Do you have the same gcc (or python) version as the project requirements? Your program might compile and run locally but not on the checker side.',
        'Is there a segmentation fault, or timeout?'
    ],
    'All the output checks are red, but all the requirement checks are green.': [
        'Try piping your program in the command "cat -e" to make sure there is not trailing whitespace: "./a.out | cat -e". You can also use "diff" on your output and the example output.',
        'Is your file executable? Did you run "chmod u+x" on your file?',
        'Did you think of all the edge cases? You can collaborate with your peers and change the main file provided as an example.'
    ],
    'You have one or more requirement red checks.': [
        'Do you have comments/documentation? Are your header files include-guarded (if applicable)?',
        'Are your files betty compliant, even the header files? (or pep8, shellcheck etc...)',
        'Do you have a shebang (Python/Shell)? Do you have a new line at the end of your file?'
    ],
    'You have one or more output red checks.': [
        'Did you think about all the edge cases? You can collaborate with your peers and change the main file provided as an example.',
        'Did you check if Valgrind passes with no memory leaks or errors (if applicable)?',
        'Did you test your code in a container (if you have access to one, it is a great way of reproducing the checker environment)?'
    ]
}

// Returns the correct case depending on number of red vs green checks
const whatMessage = (data) => {
    const checksList = data.result_display.checks;
    const reqList = checksList.filter((check) => {
        if (check.check_label === 'requirement')
            return check;
    });
    const outList = checksList.filter((check) => {
        if (check.check_label === 'code')
            return check;
    });
    const passedReq = reqList.reduce((acc, check) => {
        if (check.passed === true) {
            acc += 1;
        }
        return acc;
    }, 0);
    const passedOut = outList.reduce((acc, check) => {
        if (check.passed === true) {
            acc += 1;
        }
        return acc;
    }, 0);

    if (passedReq === 0 && passedOut === 0) {
        return 'You have all red checks.';
    } else if (passedReq === 1 && passedOut === 0) {
        return 'Only the first check is green.';
    } else if (passedReq === reqList.length && passedOut === 0) {
        return 'All the output checks are red, but all the requirement checks are green.';
    } else if (passedReq < reqList.length && passedOut === outList.length) {
        return 'You have one or more requirement red checks.';
    } else if (passedReq === reqList.length && passedOut < outList.length) {
        return 'You have one or more output red checks.';
    }
}

// This for testing, no need to copy-paste it
const mydata = {
    "id": 1408957,
    "user_id": 1,
    "task_id": 1007,
    "request_type":" Test review",
    "status":"Done",
    "result_display": {
        "error": null,
        "info": null,
        "delay": 0,
        "info_message": null,
        "checks": [
            {
                "id": 5690,
                "passed": true,
                "title": "Check 0",
                "check_label": "requirement",
                "commands": [
                    {
                        "id": "3371",
                        "success": true
                    }
                ]
            },
            {
                "id": 5302,
                "passed": false,
                "title": "Check 1",
                "check_label": "requirement",
                "commands": [
                    {
                        "id": "3370",
                        "success": false
                    }
                ]
            },
            {
                "id": 5692,
                "passed": false,
                "title": "Check 2",
                "check_label": "requirement",
                "commands": []
            },
            {
                "id": 5691,
                "passed": false,
                "title": "Check 3",
                "check_label": "requirement",
                "commands": []
            },
            {
                "id": 5693,
                "passed": false,
                "title":"Check 4",
                "check_label": "code",
                "commands": []
            }
        ]
    },
    "created_at":"2019-10-02T23:45:59.000Z",
    "updated_at":"2019-10-02T23:46:01.000Z"
}

console.log(whatMessage(mydata));
console.log(messageDict[whatMessage(mydata)]);
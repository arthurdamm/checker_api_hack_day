# Checker API hack day
Hack Day #2. Building an app using Holberton school API
## The project
By team of ~8, you are free to build what you want, it just needs to be related to Holberton and the Checker. You are starting now until tomorrow night.

You can build a web app, a desktop app, a game, a webhook, a SDK, a Git hook, etc. the only limit is your creativity (and our API limits!) You can also integrate other API like Github or Twitter for example.

Example of projects:

* Check your code when you push it to Github
* Reward user when all checks are passing for the first time with a message in Slack
* Post in Twitter the user usage of the Checker (statistic of checks passed)
etc.

# The API
## Authentication
All endpoints below are accessible only with authentication. The authentication on our API is done by requesting an auth_token and use it in every request.

To get a auth_token, you should use this endpoint:

URL: `POST /users/auth_token.json`
Parameters:
* api_key: available in My Tools
* email: your Holberton’s email
* password: your Holberton’s password
* scope: scope of your API usage. In your case it will be checker
* Rate limit: 100 requests per hour
* Result:
* Hash:
* user_id: your user ID
* full_name: your name
* auth_token: the auth_token to use for future requests
* expiration_date: when this token will be expired (in UTC) - 12 hours from the request
Example:
```
$ curl -XPOST https://intranet.hbtn.io/users/auth_token.json -H "Content-Type: application/json" -d '{"api_key": "1234567890", "email": "guillaume@holbertonschool.com", "password": "HolbertonForever", "scope": "checker"}'
{
    "user_id": 1,
    "full_name": "Guillaume Salva",
    "auth_token": "0123456789abcdef",
    "expiration_date": "11/11/2019 10:49:00"
}
$
```
Get my profile
URL: `GET /users/me.json`
Parameters:
*auth_token: from the authentication request
* Rate limit: 100 requests per hour
* Result:
* Hash:
* id: user ID
* email: user email
* full_name: user name
* first_name: user first name
* last_name: user last name
* linkedin_url: LinkedIn url
* twitter_username: Twitter username
* github_username: Github username
* profile_pic: signed profile picture
Example:
```
$ curl -XGET https://intranet.hbtn.io/users/me.json?auth_token=0123456789abcdef -H "Content-Type: application/json"
{
    "id": 1,
    "email": "guillaume@holbertonschool.com",
    "full_name": "Guillaume Salva",
    "first_name": "Guillaume",
    "last_name": "Salva",
    "linkedin_url": "https://www.linkedin.com/in/guillaume-salva-35320314/",
    "twitter_username": "guillaumesalva",
    "github_username":"papamuziko",
    "profile_pic":"https://..."
}
$
```
## Authors

---
* [Arthur Damm](https://github.com/arthurdamm)
* [Laura Roudge](https://github.com/lroudge)
* [Tu Vo](https://github.com/tuvo1106)
* [Hongtu Huang](https://github.com/billhong6981)
* [Farrukh Akhrarov](https://github.com/narnat)

---

## License

MIT License

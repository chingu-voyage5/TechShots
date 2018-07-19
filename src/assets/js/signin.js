const d = document;
const http = new XMLHttpRequest();

const authorize = d.getElementById('authorize-btn');

const logIn = () => {
    const authData = {
        username: d.getElementById('auth-username').value,
        password: d.getElementById('auth-password').value
    };
    fetch(
        'signin', 
        {
            method: 'POST',
            body: JSON.stringify(authData),
            headers: {
                'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then((body) => {
        setCookie(body.token);
        window.location.replace('/')
    })
    .catch(console.log);
};

const setCookie = (token) => {
    cookieAge = 60*60*24*365;
    d.cookie = `token=${token}; max-age=${cookieAge}; path=/`
}

const d = document;

const logout = () => {
    d.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
    window.location.replace('/');
}

d.getElementById('logout-btn').addEventListener('click', logout, false);
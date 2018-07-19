const logout = () => {
    fetch(
      'logout',
      {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then(() => {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
      window.location.replace('/');
    })
    .catch(console.log)
  }
  document.getElementById('logout-btn').addEventListener('click', logout, false);
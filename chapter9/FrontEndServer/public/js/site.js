if (!localStorage.getItem('accessToken')) {
    window.location.assign('/login.html')
}

function logout() {
    localStorage.removeItem('accessToken')
    window.location.assign('/login.html')
}

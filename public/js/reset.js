var currentUrl;
var parts;
var token;

document.getElementById("reset").addEventListener("submit", (e) => {
    e.preventDefault();
    var password = document.getElementById('inputNewPassword').value;

    data = {password};
    options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        },
        body: JSON.stringify(data)
    }

    currentUrl = window.location.href;
    parts = currentUrl.split('/');
    token = parts[parts.length - 1];

    fetch(`/auth/reset/${token}`, options)
        .then((response) => {
            console.log(response);
            if (response.ok) {
                alert('Password has been changed!')   
            }

        }).then((data) => {

        }).catch(error => {
            console.log(error);
        });
});
var jwt;

document.getElementById("login").addEventListener("submit", (e) => {
    e.preventDefault();
    var email = document.getElementById('loginInputEmail').value;
    var password = document.getElementById('loginInputPassword').value;

    data = {email, password};

    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch('/auth/', options)
        .then((response) => {
            console.log(response);
            if (response.ok) {
                console.log('OK');
            }
            return response.json();

        }).then((data) => {
            localStorage.setItem('accessToken', data['accessToken']);
            console.log(localStorage.getItem('accessToken'));
        })
        .catch(error => {
            console.log(error);
        });
});
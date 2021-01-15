document.getElementById("login").addEventListener("submit", (e) => {
    e.preventDefault();
    var email = document.getElementById('loginInputEmail').value;
    var password = document.getElementById('loginInputPassword').value;

    data = {email, password};

    options = {
        method: 'POST',
        credentials: 'include',
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
                console.log('Logged in!');
            }
            
            return response.json();

        }).then((data) => {

        })
        .catch(error => {
            console.log(error);
        });
});
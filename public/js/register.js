console.log("loaded!")
document.getElementById("registration").addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("registration!")
    var username = document.getElementById('registrationInputUsername').value;
    var email = document.getElementById('registrationInputEmail').value;
    var password = document.getElementById('registrationInputPassword').value;

    data = {username, email, password};

    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        },
        body: JSON.stringify(data)
    }

    console.log(options);

    fetch('/user/', options)
        .then((response) => {
            console.log(response);
            if (response.ok) {
                console.log("OK");
            }
            return response.json();
        }).catch(error => {
            console.log(error);
        });
});
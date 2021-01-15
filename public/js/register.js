document.getElementById("registration").addEventListener("submit", (e) => {
    e.preventDefault();

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
            window.location.href = window.location.href.substring(0, window.location.href.length - 13);
            return response.json();
        }).catch(error => {
            console.log(error);
        });
});
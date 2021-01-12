document.getElementById("login").addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("login!")
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
                console.log(response.body);
                //var jwt = response.GetHeaderValue("X-BB-SESSION");

            }
            return response.json();
        }).catch(error => {
            console.log(error);
        });
});
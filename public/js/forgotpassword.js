document.getElementById("forgotpassword").addEventListener("submit", (e) => {
    e.preventDefault();
    var email = document.getElementById('inputEmail').value;

    data = {email};

    options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch('/auth/forgotpassword/', options)
        .then((response) => {
            console.log(response);
            if (response.ok) {
                alert('Email has been sent!')
            }
            window.location.href = window.location.href.substring(0, window.location.href.length - 21);

        }).then((data) => {

        })
        .catch(error => {
            console.log(error);
        });
});
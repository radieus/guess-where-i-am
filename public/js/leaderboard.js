async function getData(url) {
    const response = await fetch(url);
    return response.json();
}

async function getRows() {
    const data = await getData("/game/scores/");
    var count = 0;
    var color = '';
    document.getElementById("tb").innerHTML = '';
    data.forEach(item => {
        count++;

        if (count == 1) {
            color = `class="table-warning"`
        } else if (count == 2) {
            color = `class="table-secondary"`
        } else if (count == 3) {
            color = `class="table-third"`
        }
        else color = "";

        var template = `
        <tr ${color}>
            <th scope="row">${count}</th>
            <td>${item.username}</td>
            <td>${item.score}</td>
        </tr>`;

        document.getElementById("tb").innerHTML += template;
    });

    console.log(data);
}

window.onload = async function() {
    getRows();
}
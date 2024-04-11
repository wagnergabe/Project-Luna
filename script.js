btn = document.getElementById('btn')

function printMessage() {
    document.getElementById('output').innerHTML="test working"
}

btn.addEventListener("click", printMessage)
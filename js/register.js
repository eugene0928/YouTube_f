const form = document.querySelector('#form')
const usernameInput = document.querySelector('#usernameInput')
const passwordInput = document.querySelector('#passwordInput')
const uploadInput = document.querySelector('#uploadInput')
const showButton = document.querySelector('#showButton')
let count = 0
showButton.onclick = () => {
    if ( !count ) {
        showButton.className = 'zmdi zmdi-eye-off'
        passwordInput.type = 'text'
        ++count
    } else {
        showButton.className = 'zmdi zmdi-eye'
        passwordInput.type = 'password'
        --count
    }
}

form.onsubmit = async(event) => {
    event.preventDefault()

    if(  !uploadInput.files ) {
        errorText.textContent = 'File is required'
        errorText.style.color = 'red'
        return
    }
    let formData = new FormData()
    formData.append('username', usernameInput.value)
    formData.append('password', passwordInput.value)
    formData.append('file', uploadInput.files[0])
    
    let res = await request(`/register`, 'POST', formData)
    window.localStorage.setItem( 'token', res.token )
    window.localStorage.setItem( 'id', res.id )
    window.location = './index.html'

    console.log(res)
}


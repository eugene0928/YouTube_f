const usernameInput = document.querySelector('#usernameInput')
const passwordInput = document.querySelector('#passwordInput')
const showButton = document.querySelector('#showButton')
const form = document.querySelector('#form')

form.onsubmit = async ( event ) => {
    event.preventDefault()
    
    let res = await request( '/login', 'POST', { username: usernameInput.value, password: passwordInput.value } )
    console.log(res)

    if(res.status == 200) {
        window.localStorage.setItem( 'token', res.token )
        window.localStorage.setItem( 'id', res.id )
        window.location = './index.html'
    }
}
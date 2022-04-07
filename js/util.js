const API = 'http://localhost:5000'

async function request(route, method, body) {
    try {
        let headers = {}
        if( !(body instanceof FormData) ) {
            headers['Content-Type'] = 'application/json'
        }
        
        if( [ '/addvideo', '/deletevideo', '/editname', '/logout' ].includes( route ) ) {
            headers.token = window.localStorage.getItem( 'token' )
        }

        let response = await fetch(API + route, {
            method,
            headers,
            body:(body instanceof FormData) ? body : JSON.stringify(body)
        })

        if (response.status == 401) {
            window.localStorage.removeItem('token')
            errorText.textContent = response.message
            errorText.style.color = 'red'
            // window.location = './index.html'
            return
        }

        if (![200, 201].includes(response.status)) {
            response = await response.json()

            errorText.textContent = response.message
            errorText.style.color = 'red'
            return
        }

        return await response.json()
    } catch (error) {
        console.log(error)
        alert( error.message )
        // errorText.textContent = error.message
        // errorText.style.color = 'red'
    }
}

function createELements( ...eles ) {
    return eles.map( el => document.createElement(el) )
}
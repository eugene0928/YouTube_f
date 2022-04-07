let ul = document.querySelector('#ul')
let videoUl = document.querySelector('#video-ul')
const datalist = document.querySelector( '#datalist' )

window.addEventListener( 'load', async () => {
    let users = await request( `/users`, 'GET' )
    let videos = await request( `/videos`, 'GET' )

    for(let user of users) {
        renderUser(user)
    }

    videoUl.innerHTML = null
    datalist.innerHTML = null
    for(let video of videos) {
        renderVideo(video)
        datalistFunc( video )
    }
} )

function renderUser( user ) {
    const [ li, a, img, span ] = createELements( 'li', 'a', 'img', 'span' )
    li.classList.add('channel')
    li.setAttribute('data-id', user.userId)
    a.href = '#'
    img.src = `${API}${user.profileImg}`
    img.setAttribute('alt', 'channel-icon')
    img.style.width = '30px'
    img.style.height = '30px'
    span.textContent = user.username

    li.addEventListener( 'click', async () => {
        const id = li.getAttribute( 'data-id' )
        let videos = await request( `/videos/${id}`, 'GET' )
        
        videoUl.innerHTML = null
        for(let video of videos) {
            renderVideo( video )
        }
    } )

    a.append( img, span )
    li.append( a )
    ul.append( li )
}

async function renderVideo( video ) {
    let users = await fetch( `${API}/users` )
    users = await users.json()
    let [ li, video1, div1, img, div2, h2, h3, time, a, span, img2 ] = createELements( 'li', 'video', 'div', 'img', 'div', 'h2', 'h3', 'time', 'a', 'span', 'img' )
    let neededUser = users.find( user => user.userId == video.userId )
    li.classList.add('iframe')
    video1.setAttribute('src', `${API}${video.videoUrl}`)
    video1.setAttribute( 'controls', '' )
    video1.setAttribute( 'data-id', video.videoId )
    div1.classList.add("iframe-footer")
    img.src = API + neededUser.profileImg
    div2.classList.add("iframe-footer-text")
    h2.classList.add("channel-name")
    h2.textContent = neededUser.username
    h3.classList.add("iframe-title")
    h3.textContent = video.videoTitle
    time.classList.add( "uploaded-time" )
    time.textContent = video.videoCreatedAt
    a.classList.add( "download" )
    a.setAttribute( 'href', '#' )
    span.textContent = Math.floor((+video.videoSize / 1024 / 1024)).toFixed(1) + 'MB'
    img2.src = "./img/download.png"

    a.append( span, img2 )
    div2.append( h2, h3, time, a )
    div1.append( img, div2 )
    li.append( video1, div1 )
    videoUl.append(li)
}

function datalistFunc( video ) {
    const [ option ] = createELements( 'option' )
    option.setAttribute( 'value', video.videoTitle )
    datalist.append( option )
}
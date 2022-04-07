const videoInputText = document.querySelector( '#videoInput' )
const uploadInput = document.querySelector( '#uploadInput' )
const videoList = document.querySelector( '#videoList' )
const form = document.querySelector( '#form' )

window.onload = async () => {
    let res = await request( `/videos/${window.localStorage.getItem( 'id' )}`, 'GET' )
    
    videoList.innerHTML = null
    for( let video of res ) {
        renderVideos( video )
    }
}

form.onsubmit = async ( event ) => {
    event.preventDefault()
    
    let formData = new FormData()
    formData.append( 'videoTitle', videoInputText.value )
    formData.append( 'file', uploadInput.files[0] )

    let res = await request( '/addvideo', 'POST', formData )
    console.log(res)

    if( res.status == 200 ) {
        let { videos } = res
        videoList.innerHTML = null
        for( let video of videos ) {
            renderVideos( video )
        }
    }
}

function renderVideos( video ) {
    let [ li, video1, p, img ] = createELements( 'li', 'video', 'p', 'img' )
    
    li.classList.add( 'video-item' )
    video1.src = `${API}${video.videoUrl}`
    video1.setAttribute( 'controls', '' )
    video1.setAttribute( 'data-id', video.videoId )
    p.classList.add( 'content' )
    p.setAttribute( 'data-id', video.videoId )
    p.setAttribute( 'contenteditable', true )
    p.textContent = video.videoTitle
    img.classList.add( 'delete-icon' )
    img.src = "./img/delete.png"
    img.style.width = "25px"
    img.setAttribute( 'data-id', video.videoId )

    img.onclick = async () => {
        const id = img.getAttribute( 'data-id' )
        let res = await request( '/deletevideo', 'POST', {videoId: id} ) 

        if( res.status == 200 ) {
            videoList.removeChild( li )
        }
    }

    p.onkeyup = async ( event ) => {
        if( event.key == 'Enter' ) {
            const id = img.getAttribute( 'data-id' )
            let res = await request( '/editname', 'POST', { videoId: id, videoTitle: p.textContent } )

            console.log(res)
        }
    }
    
    li.append( video1, p, img )
    videoList.append( li )
}
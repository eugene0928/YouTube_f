
const searchField = document.querySelector( '#searchField' )
const formSearch = document.querySelector( '#formSearch' )
const lupa = document.querySelector( '#lupa' )
const mic = document.querySelector( '#mic' )

formSearch.onsubmit = ( event ) => {
    event.preventDefault()
}

searchField.onkeyup = ( KeyboardEvent ) => {
    if(KeyboardEvent.key == 'Enter') {
        searchVideo( searchField.value )
    }
}

lupa.onclick = (  ) => {
    searchVideo( searchField.value )
}

mic.onclick = () => {
    const voice = new webkitSpeechRecognition()
    voice.lang = 'uz-Uz'
    voice.continious = false

    voice.start() 

    voice.onresult = event => {
        searchField.value = event.results[0][0].transcript
        searchVideo( searchField.value )
    }
}

async function searchVideo( videoName ) {
    let res = await request( '/videos', 'GET' ) 
    if( res.length ) {
        let regExp = new RegExp( videoName, 'gi' )
        let videos = res.filter( video => video.videoTitle.match( regExp ) )
        
        videoUl.innerHTML = null
        for( let video of videos ) {
            renderVideo( video )
        }
    }
} 


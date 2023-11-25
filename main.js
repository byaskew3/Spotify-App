// spotify API creds
clientId = '11d60321b3074d7193d30cce11316941'
clientSecret = '7396113c51314bbf9dc9fa2f90771825'


// getToken function
const getToken = async () => {
    // create POST Request
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers: {
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
            'Content-Type': 'application/x-www-form-urlencoded' 
        }
    })
    const data = await response.json()
    const token = data.access_token
    return token
}

// verify that we get our token
getToken()

// use getToken function, to get a song
// getSong Function
const getSong = async (track, artist) => {
    const token = await getToken()
    const response = await fetch(`https://api.spotify.com/v1/search?q=${track},${artist}&type=track,artist`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await response.json()
    const song = data.tracks.items[0].preview_url
    return song
}

// getSong('moonlight', 'chris brown')
// verify that we get the song data


// clickedSong function
const clickedSong = async (divId) => {
    const allTracks = document.querySelectorAll('.title-text')
    const track = allTracks[divId.slice(-1)].innerText
    
    const allArtists = document.querySelectorAll('.artist-text')
    const artist = allArtists[divId.slice(-1)].innerText

    const songUrl = await getSong(track, artist)
    
    playSong(songUrl)
}


// handles playing the audio
let audio = ''
const playSong = (song) => {
    if (audio) {
        audio.pause()
        audio = ''
    }
    audio = new Audio(song)
    audio.play()
}


// handles pausing the audio
const stopBtn = document.querySelector('#stopBtn')
stopBtn.addEventListener('click', () => {
    if (audio){
        audio.pause()
    }
})
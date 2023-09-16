// const button 
const button = document.getElementById('button');
const audioElement = document.getElementById('audio')


// Disable/ Enable Button
function toggleButton() {
  button.disabled = !button.disabled;

}

// Passing Joke to VoiceRss API
function tellMe(joke) {
  VoiceRSS.speech({
    key: "cefeb2b66cc740fd8d5c86ff6a6524fb",
    src: `${joke}`,
    hl: "en-gb",
    v: "Alice",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get Jokes from Joke API
async function getJokes() {
  let joke = '';
  const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,explicit'
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`; 
    } else {
      joke = `${data.joke}`
    }
    // Text-to-speech
    tellMe(joke);
    // Disable buttion
    toggleButton();
  } catch(error) {
    alert(error);
  }
}
// Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener('ended', toggleButton);

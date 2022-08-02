var speechRecognition = window.webkitSpeechRecognition;

var recognition = new speechRecognition();

const transcription = document.getElementById("transcription");

var content = "";

recognition.continuous = true;

recognition.onresult = function(event){
    var current = event.resultIndex;

    var transcript = event.results[current][0].transcript

    content+=transcript

    transcription.innerText = content
}

function transcribe(){
    if (content.length> 15){
        content = ''
    }

    requestAnimationFrame(transcribe);
}


recognition.start();
transcribe();

// Frequency picker


//frequency and chord array - linked 

let chord = ["E","A","D","G","B","E"];
let frequency = [82.41,110.0,146.83,196.0,246.94,329.63];

//getting center button

let center_butt = document.getElementById("current_chord");


//getting canvas element

let canvas = document.getElementById('output');

//setting up audio context

const context = new AudioContext();
const analyser = new AnalyserNode(context, {fftSize: 256});

//canvas context
const canvasContext = canvas.getContext('2d');

let x;
let barHeight;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

//getting microphone input
async function setContext(){
   const mic = await getMicrophone();
   if (context.state === 'suspended'){
      await context.resume()
   }  
   const source = context.createMediaStreamSource(mic);
   //creating a filter to remove noise

   compressor = context.createDynamicsCompressor();
   compressor.threshold.value = -50;
   compressor.knee.value = 40;
   compressor.ratio.value = 12;
   compressor.reduction.value = -20;
   compressor.attack.value = 0;
   compressor.release.value = 0.25;

   filter = context.createBiquadFilter();
   filter.Q.value = 8.30;
   filter.frequency.value = 355;
   filter.gain.value = 3.0;
   filter.type = 'bandpass';
   filter.connect(compressor);

   source.connect(filter).connect(analyser).connect(context.destination); 
}

function getMicrophone(){
   return navigator.mediaDevices.getUserMedia({
      audio: true,
      noise: false
   })
}

//visualizer
function animate(){
   x=0;
   
   const width = canvas.width;
   const height = canvas.height;

   const barWidth = width/bufferLength;

   canvasContext.clearRect(0,0,width,height);
   
   analyser.getByteFrequencyData(dataArray);
   console.log(dataArray);
   drawVisualizer(bufferLength, x ,barWidth, barHeight, dataArray);
   requestAnimationFrame(animate);
   
}

function drawVisualizer(bufferLength, x ,barWidth, barHeight, dataArray){
   
   //find index of maximum element in dataArray

   const index_of_max = max(dataArray);

   //find the current frequency = indexOfMaxElement * sampleRate/FFTSize

   const curr_freq = index_of_max * 44100/256;

   console.log(curr_freq);


   //sets the inner text of center button with the guessed chord
   //guessChord is a helper function
   if (guessChord(curr_freq) == undefined){center_butt.innerText = ''}
   else {center_butt.innerText = guessChord(curr_freq);}
   
   for (let i =0; i<bufferLength; i++){
      barHeight = dataArray[i]* 1;
      canvasContext.save();
      canvasContext.translate(canvas.width/2,canvas.height/2);
      canvasContext.rotate(i* Math.PI * 10 / bufferLength);
      

      canvasContext.fillStyle = "#FF6700";
      canvasContext.fillRect(0,0,barWidth,barHeight);

      x+=barWidth;
      canvasContext.restore();
   }
}






//HELPER FUNCTIONS



//finding index of maximum element, helper function

function max(array){
   let max = 0;
   let max_index = 0;

   array.forEach((element,index) => {
      if (element > max){
         max = element;
         max_index = index;
      }
   })
   return max_index;
}

function guessChord(x){
   let i;
   for (i=0 ; i < 6; i++){
      if (x<frequency[i]){break;}
   }

   return chord[i]
}


//Firing functions

setContext(); //connects mic
animate();//used to draw visuals based on analysers results



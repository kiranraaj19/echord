import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1 , 1000);

const canvas = document.getElementById('random');

const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('random')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
scene.background = new THREE.Color( 0xffffff );
camera.position.z = 30;


function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
}

//animating the music icons spawning randomnly

const playButton = document.querySelector('#playButton');

playButton.addEventListener("mouseover",scrollDown);
playButton.addEventListener("mouseout",scrollUp);

function scrollDown(){
    var tween1 = createjs.Tween.get(camera.position).to({y:-1*canvas.height},1500,createjs.Ease.getPowInOut(3));
    console.log("tween1");
}

function scrollUp(){
    var tween2 = createjs.Tween.get(camera.position).to({y:0},1500,createjs.Ease.getPowInOut(3));
    console.log("tween2");
}

function addIcons(){
    const geometry = new THREE.CircleGeometry( 2, 32 );
    const orange_colour = new THREE.MeshBasicMaterial({color: '#FF6700'});

    const music_icon = new THREE.Mesh(geometry,orange_colour);

    const [x,y] = Array(2).fill().map(()=> THREE.MathUtils.randFloatSpread(100));

    music_icon.position.set(x,(-1*canvas.height) + y,0);
    scene.add(music_icon);
}

//add 50 icons to Scene

Array(50).fill().map(()=>addIcons());

//update canvas when document is Resized
window.addEventListener('resize',()=>{
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth,window.innerHeight);
})

animate();


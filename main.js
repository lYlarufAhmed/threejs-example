import './style.css'
import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene() // The container of everything

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// human eye mimic

const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('bg')
})
// which render the 3d object in target element

renderer.setPixelRatio(window.devicePixelRatio)
// specify the pixel ratio in this case same as the browser

renderer.setSize(window.innerWidth, window.innerHeight)
// renderer will take the whole window

camera.position.setZ(30)

// camera will get some z index to position it away from object

renderer.render(scene, camera)
// renderer takes the container and the camera to render

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
// shape that will be rendered
// const torusTexture = new THREE.TextureLoader().load('/assets/Plane.035__0_metallicRoughness.png')
// const material = new THREE.MeshStandardMaterial({map: torusTexture})
const material = new THREE.MeshStandardMaterial({color: 0xFFF647})
// skin of the object

const torus = new THREE.Mesh(geometry, material)
// create the 3d object

scene.add(torus)
// the the object to scene

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)
scene.add(pointLight)


const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight)


// const lightHelper = new THREE.PointLightHelper(pointLight)
// lightHelper.position.set(200, 30, 5)
// scene.add(lightHelper)


// const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(gridHelper)

const orbitControl = new OrbitControls(camera, renderer.domElement)


function addStar() {
    const geometry = new THREE.SphereGeometry(.25, 24, 24)
    const material = new THREE.MeshStandardMaterial({color: 0xffffff})
    const star = new THREE.Mesh(geometry, material)

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

    star.position.set(x, y, z)
    scene.add(star)
}

Array(200).fill().forEach(addStar)


// const spaceTexture = new THREE.TextureLoader().load('/assets/milky_way_starry_sky_stars_128523_1920x1080.jpg')
// scene.background = spaceTexture


function animate() {
    requestAnimationFrame(animate)
    // torus.rotation.x += 0.01
    // torus.rotation.y += 0.005
    // torus.rotation.z += 0.01
    renderer.render(scene, camera)

    orbitControl.update()
    // lightHelper.update()
}

animate()
// infinite animate whenever something is changed
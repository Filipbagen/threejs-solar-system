let container
let camera, scene, renderer
let mouseX = 0, mouseY = 0
let windowHalfX = window.innerWidth / 2
let windowHalfY = window.innerHeight / 2

// Object3D ("Group") nodes and Mesh nodes
let sceneRoot = new THREE.Group()

let sunSpin = new THREE.Group()

let mercuryOrbit = new THREE.Group()
let mercurySpin = new THREE.Group()
let mercuryTrans = new THREE.Group()

let venusOrbit = new THREE.Group()
let venusSpin = new THREE.Group()
let venusTrans = new THREE.Group()

let earthOrbit = new THREE.Group()
let earthSpin = new THREE.Group()
let earthTrans = new THREE.Group()
let earthTilt = new THREE.Group()

let moonOrbit = new THREE.Group()
let moonSpin = new THREE.Group()
let moonTrans = new THREE.Group()
let moonTilt = new THREE.Group()

let marsOrbit = new THREE.Group()
let marsSpin = new THREE.Group()
let marsTrans = new THREE.Group()

let jupiterOrbit = new THREE.Group()
let jupiterSpin = new THREE.Group()
let jupiterTrans = new THREE.Group()

let saturnOrbit = new THREE.Group()
let saturnSpin = new THREE.Group()
let saturnTrans = new THREE.Group()

let ringRotation = new THREE.Group()

let sunMesh, mercuryMesh, venusMesh, earthMesh, moonMesh, marshMesh, jupiterMesh, saturnMesh, ringMesh

const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
const pointLight = new THREE.PointLight(0xffffff, 0.4, 100)
pointLight.position.set(0, 0, 0)
pointLight.castShadow = true

let animation = true

function onWindowResize() {
    windowHalfX = window.innerWidth / 2
    windowHalfY = window.innerHeight / 2
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

function onDocumentMouseMove(event) {
    // mouseX, mouseY are in the range [-1, 1]
    mouseX = (event.clientX - windowHalfX) / windowHalfX
    mouseY = (event.clientY - windowHalfY) / windowHalfY
}

// Stars
const getRandomParticelPos = (particleCount) => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        arr[i] = (Math.random() - 0.5) * 10;
    }
    return arr;
};

function createSceneGraph() {
    scene = new THREE.Scene()

    // top-level node
    scene.add(sceneRoot)

    // lights
    sceneRoot.add(ambientLight)
    sceneRoot.add(pointLight)

    // sun branch
    sceneRoot.add(sunSpin)
    sunSpin.add(sunMesh)

    // mercury branch
    sceneRoot.add(mercuryOrbit)
    mercuryOrbit.add(mercuryTrans)
    mercuryTrans.add(mercurySpin)
    mercurySpin.add(mercuryMesh)

    // venus branch
    sceneRoot.add(venusOrbit)
    venusOrbit.add(venusTrans)
    venusTrans.add(venusSpin)
    venusSpin.add(venusMesh)

    // earth branch
    sceneRoot.add(earthOrbit)
    earthOrbit.add(earthTrans)
    earthTrans.add(earthTilt)
    earthTilt.add(earthSpin)
    earthSpin.add(earthMesh)

    // moon branch
    earthTrans.add(moonOrbit)
    moonOrbit.add(moonTrans)
    moonTrans.add(moonTilt)
    moonTilt.add(moonSpin)
    moonSpin.add(moonMesh)

    // mars branch
    sceneRoot.add(marsOrbit)
    marsOrbit.add(marsTrans)
    marsTrans.add(marsSpin)
    marsSpin.add(marsMesh)

    // jupiter branch
    sceneRoot.add(jupiterOrbit)
    jupiterOrbit.add(jupiterTrans)
    jupiterTrans.add(jupiterSpin)
    jupiterSpin.add(jupiterMesh)

    // saturn branch
    sceneRoot.add(saturnOrbit)
    saturnOrbit.add(saturnTrans)
    saturnTrans.add(saturnSpin)
    saturnSpin.add(saturnMesh)

    // ring branch
    saturnTrans.add(ringRotation)
    ringRotation.add(ringMesh)
}


function init() {
    // Look up the canvas
    container = document.getElementById('container')
    // Create a WebGLRenderer
    // const renderer = new THREE.WebGLRenderer({ container })
    // renderer.setClearColor(new THREE.Color("#1c1624"))


    camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 100)  // fov, aspect, near, far
    camera.position.z = 40
    let texloader = new THREE.TextureLoader()


    // const boxWidth = 1, boxHeight = 1, boxDepth = 1;
    // const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    // const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
    // const cube = new THREE.Mesh(geometry, material);
    // sceneRoot.add(cube);




    // Sun mesh
    const geometrySun = new THREE.SphereGeometry(3, 32, 32)
    const materialSun = new THREE.MeshBasicMaterial()
    const sunTexture = texloader.load('tex/2k_sun.jpg')
    materialSun.map = sunTexture

    // Mercury mesh
    let geometryMercury = new THREE.SphereGeometry(0.16, 32, 32)
    let materialMercury = new THREE.MeshLambertMaterial()
    const mercuryTexture = texloader.load('tex/mercury.jpg')
    materialMercury.map = mercuryTexture

    // Venus mesh
    let geometryVenus = new THREE.SphereGeometry(0.5, 32, 32)
    let materialVenus = new THREE.MeshLambertMaterial()
    const venusTexture = texloader.load('tex/venus.jpg')
    materialVenus.map = venusTexture

    // Earth mesh
    let geometryEarth = new THREE.SphereGeometry(0.5, 32, 32)
    let materialEarth = new THREE.MeshLambertMaterial()
    const earthTexture = texloader.load('tex/2k_earth_daymap.jpg')
    materialEarth.map = earthTexture

    // Moon mesh
    let geometryMoon = new THREE.SphereGeometry(0.125, 32, 32)
    let materialMoon = new THREE.MeshLambertMaterial()
    const moonTexture = texloader.load('tex/2k_moon.jpg')
    materialMoon.map = moonTexture

    // Mars mesh
    let geometryMars = new THREE.SphereGeometry(0.25, 32, 32)
    let materialMars = new THREE.MeshLambertMaterial()
    const marsTexture = texloader.load('tex/2k_mars.jpg')
    materialMars.map = marsTexture

    // Jupiter mesh
    let geometryJupiter = new THREE.SphereGeometry(5.5, 32, 32)
    let materialJupiter = new THREE.MeshLambertMaterial()
    const jupiterTexture = texloader.load('tex/2k_jupiter.jpg')
    materialJupiter.map = jupiterTexture

    // saturn mesh
    let geometrySaturn = new THREE.SphereGeometry(4.5, 32, 32)
    let materialSaturn = new THREE.MeshLambertMaterial()
    const saturnTexture = texloader.load('tex/2k_saturn.jpg')
    materialSaturn.map = saturnTexture

    // ring mesh
    let geometryRing = new THREE.RingGeometry(6, 8, 32)
    let materialRing = new THREE.MeshBasicMaterial({ color: 0x9C9679, side: THREE.DoubleSide })





    // **************************************

    document.addEventListener("DOMContentLoaded", () => {
        container.style.opacity = 1;
    });



    // **************************************







    let uniforms = THREE.UniformsUtils.merge([
        {
            colorTexture: { value: new THREE.Texture() },
            specularMap: { value: new THREE.Texture() }
        },
        THREE.UniformsLib["lights"]
    ]);

    const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('vertexShader').textContent.trim(),
        fragmentShader: document.getElementById('fragmentShader').textContent.trim(),
        lights: true
    });
    shaderMaterial.uniforms.colorTexture.value = earthTexture

    const specularMap = texloader.load('tex/2k_earth_specular_map.jpg')
    shaderMaterial.uniforms.specularMap.value = specularMap

    // mesh
    sunMesh = new THREE.Mesh(geometrySun, materialSun)

    mercuryMesh = new THREE.Mesh(geometryMercury, materialMercury)
    mercuryMesh.castShadow = true
    mercuryMesh.receiveShadow = true

    venusMesh = new THREE.Mesh(geometryVenus, materialVenus)
    venusMesh.castShadow = true
    venusMesh.receiveShadow = true

    earthMesh = new THREE.Mesh(geometryEarth, shaderMaterial)
    earthMesh.castShadow = true
    earthMesh.receiveShadow = true

    moonMesh = new THREE.Mesh(geometryMoon, materialMoon)
    moonMesh.castShadow = true
    moonMesh.receiveShadow = true

    marsMesh = new THREE.Mesh(geometryMars, materialMars)
    marsMesh.castShadow = true
    marsMesh.receiveShadow = true

    jupiterMesh = new THREE.Mesh(geometryJupiter, materialJupiter)
    jupiterMesh.castShadow = true
    jupiterMesh.receiveShadow = true

    saturnMesh = new THREE.Mesh(geometrySaturn, materialSaturn)
    saturnMesh.castShadow = true
    saturnMesh.receiveShadow = true

    ringMesh = new THREE.Mesh(geometryRing, materialRing)
    ringMesh.castShadow = true
    ringMesh.receiveShadow = true

    createSceneGraph();




    // Should delete
    renderer = new THREE.WebGLRenderer()
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap // default THREE.PCFShadowMap
    renderer.setClearColor(0x000000)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    container.appendChild(renderer.domElement)
    //************* */

    document.addEventListener('mousemove', onDocumentMouseMove, false)
    window.addEventListener('resize', onWindowResize, false)
}

function rotSpeed(days) {
    let speed = document.querySelector('#slider').value
    return 2 * Math.PI / 60 / days * speed
}

function tilt(degree) {
    return degree * Math.PI / 180
}

function render() {
    // Set up the camera
    camera.position.x = -mouseX * 50
    camera.position.y = mouseY * 50
    camera.lookAt(scene.position)

    // Perform animations
    if (animation) {
        sunSpin.rotation.y += rotSpeed(30)

        mercurySpin.rotation.y += rotSpeed(58.7)    // axis rotation
        mercuryOrbit.rotation.y += rotSpeed(88)     // orbit
        mercuryTrans.position.x = 4                 // translate

        venusSpin.rotation.y += rotSpeed(116.75)    // axis rotation
        venusOrbit.rotation.y += rotSpeed(225)      // orbit
        venusTrans.position.x = 6                   // translate

        earthSpin.rotation.y += rotSpeed(1)         // axis rotation
        earthTilt.rotation.z = rotSpeed(23.44)      // tilt
        earthOrbit.rotation.y += rotSpeed(365)      // orbit
        earthTrans.position.x = 10                  // translate

        moonSpin.rotation.y += rotSpeed(27.3)       // axis rotation
        moonTilt.rotation.z = tilt(5.15)            // tilt
        moonOrbit.rotation.y += rotSpeed(25)        // orbit
        moonTrans.position.x = -2                   // translate

        marsSpin.rotation.y += rotSpeed(1.03)       // axis rotation
        marsOrbit.rotation.y += rotSpeed(687)       // orbit
        marsTrans.position.x = 7                    // translate

        jupiterSpin.rotation.y += rotSpeed(0.41)    // axis rotation
        jupiterOrbit.rotation.y += rotSpeed(4333)   // orbit
        jupiterTrans.position.x = 22                // translate

        saturnSpin.rotation.y += rotSpeed(0.45)     // axis rotation
        saturnOrbit.rotation.y += rotSpeed(10759)   // orbit
        saturnTrans.position.x = 45                 // translate

        // ringRotation.rotation.x += rotSpeed(0.2)
        // ringRotation.rotation.y += rotSpeed(0.2)
    }

    // Render the scene
    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate); // Request to be called again for next frame
    render();
}

init(); // Set up the scene
animate(); // Enter an infinite loop

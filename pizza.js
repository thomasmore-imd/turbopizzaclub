/**
 * Base
 */


// Canvas
const canvas = document.querySelector('.myCanvas')
const receptuur = document.querySelector(".receptuur")
let receptuurWidth = receptuur.offsetWidth

// Scene
const scene = new THREE.Scene()

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new THREE.DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new THREE.GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Textures
 */
const bakedColorTexture = textureLoader.load('Three.js/baked.jpg')

/**
 * Materials
 */
//baked material
const bakedMaterial = new THREE.MeshBasicMaterial({
    map: bakedColorTexture
})
bakedColorTexture.flipY = false
bakedColorTexture.encoding = THREE.sRGBEncoding


/**
 * Model
 */


/**
 * File load 
 */

gltfLoader.load(
    'Three.js/pizza.glb',
    gltf => {
        gltf.scene.traverse((child) => {
            child.material = bakedMaterial
        })
        let model = gltf.scene
        //centering the model
      
        scene.add(model)

       const animatePizza = () => {
            requestAnimationFrame(animatePizza)
            model.rotation.x += 0.01 * Math.PI / 2
        
        }
        animatePizza()

        window.addEventListener("scroll", () => {
           model.rotation.y = 
              window.scrollY / window.innerHeight *  Math.PI * 2
             
        })
    })


/**
 * Sizes
 */
const sizes = {
    width: receptuurWidth - 16,
    height: 800
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = receptuur.offsetWidth - 16
    sizes.height = sizes.height

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    

   setCamera()
})


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)

const setCamera= ()=>{
    if(document.body.clientWidth < 800){
        camera.position.x = 12
        camera.position.y = 8
        camera.position.z = 40

       
        
    }else{
        camera.position.x = 12
        camera.position.y = 8
        camera.position.z = 22
    }
    

}
setCamera()

scene.add(camera)

// Controls
/*const controls = new THREE.OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableZoom = false

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding

// Cursor
const cursor = {
    x: 0,
    y: 0
}


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()



    // Update controls
   // controls.update()

   camera.lookAt(scene.position)
    // Go through all points

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
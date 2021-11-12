import './style.css';
import * as THREE from 'three';
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls';
import {
    VertexNormalsHelper
} from 'three/examples/jsm/helpers/VertexNormalsHelper';

import {
    Lensflare,
    LensflareElement
} from 'three/examples/jsm/objects/Lensflare.js'


import vertex from './shaders/vertex.glsl';
import fragment from './shaders/fragment.glsl';

import boxVert from './shaders/lighting/vertex.glsl';
import boxFrag from './shaders/lighting/fragment.glsl';

import testVert from './shaders/test/vertex.glsl';
import testFrag from './shaders/test/fragment.glsl';

import sunVertex from './shaders/sun/vertex.glsl';
import sunFragment from './shaders/sun/fragment.glsl';

import palette from './img/pallete6.png';
import flareTexture from './img/lens.png';



function main() {
    const canvas = document.querySelector('#canvas');
    const renderer = new THREE.WebGLRenderer({
        canvas
    });

    const fov = 60;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 25;
    camera.position.y = -70;
    // camera.position.x = 5;
    // camera.lookAt(0, -100, 0);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);

    const boxD = 100;
    const boxS = 400;
    // const boxGeom = new THREE.BoxGeometry(boxD, boxD, boxD, boxS, boxS, boxS);
    const boxGeom = new THREE.PlaneGeometry(boxD, boxD, boxS, boxS);


    const axis = new THREE.AxesHelper(10);
    scene.add(axis);

    const uniforms = {
        uTime: {
            value: 0
        },
        vLight: {
            value: new THREE.Vector3(0, 5, 5)
        },
        uMouse: {
            type: "vec2",
            value: new THREE.Vector3(-10, -10)
        },
        pallete: {
            type: "t",
            value: null
        },
        distortCenter: {
            type: "f",
            value: 0.1
        },
        roadWidth: {
            type: "f",
            value: 0.5
        },
        speed: {
            type: "f",
            value: 0.5
        },
        maxHeight: {
            type: "f",
            value: 10.0
        },
    }

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-10, -10);

    function onMouseMove(event) {

        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    }

    const planeMaterial = new THREE.ShaderMaterial({
        wireframe: true,
        transparent: true,
        side: THREE.DoubleSide,
        uniforms,
        vertexShader: vertex,
        fragmentShader: fragment
    })

    const boxMat = new THREE.ShaderMaterial({
        extensions: {
            derivatives: true,
        },
        wireframe: false,
        transparent: false,
        side: THREE.DoubleSide,
        uniforms,
        vertexShader: testVert,
        fragmentShader: testFrag,
    })

    const sunMaterial = new THREE.ShaderMaterial({
        wireframe: false,
        transparent: true,
        side: THREE.DoubleSide,
        uniforms,
        vertexShader: sunVertex,
        fragmentShader: sunFragment
    })

    const box = new THREE.Mesh(boxGeom, boxMat);
    scene.add(box);


    const vertices = [
        // front
        {
            pos: [-1, -1, 0],
            norm: [0, 0, 1],
            uv: [0.25, 0.25],
        },
        {
            pos: [1, -1, 0],
            norm: [0, 0, 1],
            uv: [0.75, 0.25],
        },
        {
            pos: [-1, 1, 0],
            norm: [0, 0, 1],
            uv: [0.25, 0.75],
        },

        {
            pos: [-1, 1, 0],
            norm: [0, 0, 1],
            uv: [0.25, 0.75],
        },
        {
            pos: [1, -1, 0],
            norm: [0, 0, 1],
            uv: [0.75, 0.25],
        },
        {
            pos: [1, 1, 0],
            norm: [0, 0, 1],
            uv: [0.75, 0.75],
        },

        // top
        {
            pos: [-1, 1, 0],
            norm: [0, 0, 1],
            uv: [0.25, 0.75],
        },
        {
            pos: [1, 1, 0],
            norm: [0, 0, 1],
            uv: [0.75, 0.75],
        },
        {
            pos: [0, 2, 0],
            norm: [0, 0, 1],
            uv: [0.5, 1],
        },

        // right
        {
            pos: [1, -1, 0],
            norm: [0, 0, 1],
            uv: [0.75, 0.25],
        },
        {
            pos: [2, 0, 0],
            norm: [0, 0, 1],
            uv: [1, 0.5],
        },
        {
            pos: [1, 1, 0],
            norm: [0, 0, 1],
            uv: [0.75, 0.75],
        },

        // bot
        {
            pos: [-1, -1, 0],
            norm: [0, 0, 1],
            uv: [0.25, 0.25],
        },
        {
            pos: [0, -2, 0],
            norm: [0, 0, 1],
            uv: [0.5, 0],
        },
        {
            pos: [1, -1, 0],
            norm: [0, 0, 1],
            uv: [0.75, 0.25],
        },

        // left
        {
            pos: [-2, 0, 0],
            norm: [0, 0, 1],
            uv: [0, 0.5],
        },
        {
            pos: [-1, -1, 0],
            norm: [0, 0, 1],
            uv: [0.25, 0.25],
        },
        {
            pos: [-1, 1, 0],
            norm: [0, 0, 1],
            uv: [0.25, 0.75],
        },
    ];

    const positions = [];
    const normals = [];
    const uvs = [];
    for (const vertex of vertices) {
        positions.push(...vertex.pos);
        normals.push(...vertex.norm);
        uvs.push(...vertex.uv);
    }

    const geometry = new THREE.BufferGeometry();
    const positionNumComponents = 3;
    const normalNumComponents = 3;
    const uvNumComponents = 2;
    geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(positions), positionNumComponents));
    geometry.setAttribute(
        'normal',
        new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents));
    geometry.setAttribute(
        'uv',
        new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents));

    // const material = new THREE.MeshPhongMaterial({
    //     color: 0x222222
    // });

    // const cube = new THREE.Mesh(geometry, planeMaterial);

    // scene.add(cube);

    // cube.updateMatrixWorld();


    // const helper = new VertexNormalsHelper( cube, 2, 0x00ff00, 1 );
    // helper.matrixAutoUpdate = true;
    // scene.add( helper );

    // const box = new THREE.Mesh(boxGeom, boxMat);

    new THREE.TextureLoader().load(palette, function (texture) {
        box.material.uniforms.pallete.value = texture;
        box.material.needsUpdate = true;
    });

    const lensLight = new THREE.PointLight(0xffffff, 1.5, 2000);
    const textureFlare = new THREE.TextureLoader().load(flareTexture);
    const lensflare = new Lensflare();
    lensflare.addElement(new LensflareElement(textureFlare, 512, 0));
    lensLight.add(lensflare);
    scene.add(lensLight);

    lensLight.position.z = 10.0;
    lensLight.position.y = 120.0;


    const sunColor = 0x6a66a3;

    const sunGeometry = new THREE.CircleGeometry(50, 35);
    // const sunMaterial = new THREE.MeshBasicMaterial( { color: sunColor, wireframe: true } );
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);
    sun.rotation.x = Math.PI / 2;
    sun.position.y = 100;

    // scene.add(box);

    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 0, 10);
    scene.add(light);



    /* start */

    const starsMaterial = new THREE.PointsMaterial({
        size: 1.0,
        color: 0xffffff // remove it if you want white points.
    });

    const getRandomParticelPos = (particleCount) => {
        const arr = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            arr[i] = (Math.random() - 0.5) * 400;
        }
        return arr;
    };

    const starsGeometry = new THREE.BufferGeometry();
    starsGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(getRandomParticelPos(1000), 3)
    );

    

    const star = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(star);
    star.position.y = 300;



    renderer.render(scene, camera);

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio;
        const width = canvas.clientWidth * pixelRatio | 0;
        const height = canvas.clientHeight * pixelRatio | 0;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    const controls = new OrbitControls(camera, renderer.domElement);

    function render(time) {
        time *= 0.0005; // convert time to seconds

        // if(!cube) return
        // box.material.uniforms.uMouse.value = mouse;
        box.material.uniforms.uTime.value = time;


        // box.rotation.x = time;

        // raycaster.setFromCamera(mouse, camera);

        // calculate objects intersecting the picking ray

        // const intersects = raycaster.intersectObject(cube);


        // for (let i = 0; i < intersects.length; i++) {
        // intersects[i].object.material.color.set(0xff0000);
        // }

        // helper.update();
        // cube.geometry.attributes.position.needsUpdate = true


        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        controls.update();

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    window.addEventListener('mousemove', onMouseMove, false);
}

main();
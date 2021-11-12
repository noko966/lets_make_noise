import './style.css';
import * as THREE from 'three';
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'

import vertex from './shaders/vertex.glsl';
import fragment from './shaders/fragment.glsl';

import boxVert from './shaders/lighting/vertex.glsl';
import boxFrag from './shaders/lighting/fragment.glsl';


function main() {
    const canvas = document.querySelector('#canvas');
    const renderer = new THREE.WebGLRenderer({
        canvas
    });

    const fov = 90;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 5;
    camera.position.y = -10;
    camera.lookAt(0, 0, 0);

    const scene = new THREE.Scene();

    const planeWidth = 10;
    const planeHeight = 10;
    const planeWidthSegments = 100;
    const planeHeightegments = 100;
    const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight, planeWidthSegments, planeHeightegments);

    const axis = new THREE.AxesHelper(10);
    scene.add(axis);

    const uniforms = {
        uTime: {
            value: 0
        },
        vLight: {
            value: new THREE.Vector3(0,5,5)
        },
    }

    const planeMaterial = new THREE.ShaderMaterial({
        wireframe: false,
        transparent: true,
        side: THREE.DoubleSide,
        uniforms,
        vertexShader: vertex,
        fragmentShader: fragment
    })

    const boxMaterial = new THREE.ShaderMaterial({
        wireframe: false,
        transparent: true,
        side: THREE.DoubleSide,
        uniforms,
        vertexShader: boxVert,
        fragmentShader: boxFrag
    })

    const planes = [];
    const planesGroup = new THREE.Group();

    const gridSize = 6;
    const planeGap = 0.314;
    let comsSizeHalf = gridSize * (planeWidth + planeGap);
    const gridCellSize = planeGap + planeWidth;



    for (let i = 0; i < gridSize; i++) {
        let row = [];
        for (let j = 0; j < gridSize; j++) {
            let el = new THREE.Mesh(planeGeometry, planeMaterial)
            row.push(el);
            planesGroup.add(el);
        }
        planes.push(row);
    }


    for (let i = 0; i < planes.length; i++) {
        let plane;
        for (let j = 0; j < planes[i].length; j++) {
            plane = planes[i][j];
            plane.position.x = j * gridCellSize + (planeWidth / 2);
            plane.position.y += i * gridCellSize + (planeWidth / 2);

            // plane.material.uniforms.vLight.value = new THREE.Vector3(
            //     j * gridCellSize + (planeWidth / 2),
            //     i * gridCellSize + (planeWidth / 2),
            //     5);
            console.log(plane.material.uniforms.vLight.value);
        }


    }


    scene.add(planesGroup);
    comsSizeHalf = (comsSizeHalf / 2) - (planeGap / 2);
    planesGroup.position.x -= comsSizeHalf;
    planesGroup.position.y -= comsSizeHalf;

    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

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

        for (let i = 0; i < planes.length; i++) {
            for (let j = 0; j < planes[i].length; j++) {
                let plane = planes[i][j];
                plane.material.uniforms.uTime.value = time;
            }
        }

        // plane.material.uniforms.uTime.value = time;

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
}

main();
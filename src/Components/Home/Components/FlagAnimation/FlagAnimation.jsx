import React, { useEffect, useRef } from 'react';
import * as THREE from 'three'; // Import THREE.js

const FlagAnimation = ({ flagUrls, index }) => {
  const flagWrap = useRef(null); // Ref to access the container div

  useEffect(() => {
    let scene, camera, renderer, loader, geometry, material, flag, clock;

    // Initialize the 3D scene
    function init() {
      scene = new THREE.Scene();

      // Set up camera with dynamic aspect ratio
      camera = new THREE.PerspectiveCamera(
        75,
        flagWrap.current.clientWidth / flagWrap.current.clientHeight,
        0.1,
        1000
      );

      // Only create the renderer once and attach it to the DOM
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(flagWrap.current.clientWidth, flagWrap.current.clientHeight);
      
      // If there is an existing canvas, do not append a new one
      if (!flagWrap.current.querySelector('canvas')) {
        flagWrap.current.appendChild(renderer.domElement);
      }

      loader = new THREE.TextureLoader();
      geometry = new THREE.PlaneGeometry(5, 7, 100, 50);
      material = new THREE.MeshBasicMaterial({
        map: loader.load(flagUrls[index]), // Load the flag image based on the index
      });

      flag = new THREE.Mesh(geometry, material);
      scene.add(flag);

      camera.position.z = 5;
      clock = new THREE.Clock();

      animate(); // Start the animation loop
    }

    // Animation loop to create waving effect
    function animate() {
      let position = geometry.getAttribute('position');
      let vertex = new THREE.Vector3();

      for (let i = 0; i < position.count; i++) {
        vertex.fromBufferAttribute(position, i);

        let time = clock.getElapsedTime();
        let waveX1 = 0.15 * Math.sin(vertex.x * 2 + time);
        let waveX2 = 0.25 * Math.sin(vertex.x * 3 + time * 2);
        let waveY1 = 0.1 * Math.sin(vertex.y + time);
        let multi = (vertex.x + 2.5) / 5; // Using the width of the plane geometry
        let flagWave = (waveX1 + waveX2) * multi;

        position.setZ(i, waveX1 + waveY1);
      }
      position.needsUpdate = true;

      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    // Handle window resizing
    function onResize() {
      camera.aspect = flagWrap.current.clientWidth / flagWrap.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(flagWrap.current.clientWidth, flagWrap.current.clientHeight);
    }

    // Initialize the animation on component mount
    init();

    // Event listener to handle window resizing
    window.addEventListener('resize', onResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', onResize);
      renderer.dispose(); // Dispose of the renderer

      if (flag) {
        scene.remove(flag); // Remove the flag mesh from the scene
        flag.geometry.dispose(); // Dispose of geometry
        flag.material.dispose(); // Dispose of material
        if (flag.material.map) {
          flag.material.map.dispose(); // Dispose of the texture
        }
      }

      // Dispose of any existing canvases (should only be one)
      const canvas = flagWrap.current.querySelector('canvas');
      if (canvas) {
        flagWrap.current.removeChild(canvas);
      }
    };
  }, [flagUrls, index]); // Re-run the effect if flagUrls or index change

  return <div ref={flagWrap} style={{ width: '100%', height: '100%' }} />;
};

export default FlagAnimation;

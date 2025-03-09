import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TweenMax, Expo } from 'gsap';

const LiquidDistortion = () => ({ image1, image2, displacementImage, intensity = 0.2, video = false }) => {
    const containerRef = useRef(null);
  
    useEffect(() => {
      const container = containerRef.current;
      
      if (!container || !image1 || !image2 || !displacementImage) {
        console.warn('One or more images are missing');
        return;
      }
  
      // Set up the scene and renderer
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(
        container.offsetWidth / -2,
        container.offsetWidth / 2,
        container.offsetHeight / 2,
        container.offsetHeight / -2,
        1,
        1000
      );
      camera.position.z = 1;
      const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
      renderer.setPixelRatio(2);
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      container.appendChild(renderer.domElement);
  
      // Function to render the scene
      const renderScene = () => {
        renderer.render(scene, camera);
      };
  
      // Load textures
      const textureLoader = new THREE.TextureLoader();
      textureLoader.crossOrigin = '';
  
      let displacementTexture, texture1, texture2;
  
      displacementTexture = textureLoader.load(displacementImage, renderScene);
  
      displacementTexture.magFilter = displacementTexture.minFilter = THREE.LinearFilter;
  
      if (video) {
        // Handle video textures
        const videoElement1 = document.createElement('video');
        videoElement1.autoplay = true;
        videoElement1.loop = true;
        videoElement1.src = image1;
        videoElement1.load();
  
        const videoElement2 = document.createElement('video');
        videoElement2.autoplay = true;
        videoElement2.loop = true;
        videoElement2.src = image2;
        videoElement2.load();
  
        texture1 = new THREE.VideoTexture(videoElement1);
        texture2 = new THREE.VideoTexture(videoElement2);
  
        texture1.magFilter = texture2.magFilter = THREE.LinearFilter;
        texture1.minFilter = texture2.minFilter = THREE.LinearFilter;
      } else {
        // Handle image textures
        texture1 = textureLoader.load(image1, renderScene);
        texture2 = textureLoader.load(image2, renderScene);
  
        texture1.magFilter = texture2.magFilter = THREE.LinearFilter;
        texture1.minFilter = texture2.minFilter = THREE.LinearFilter;
      }
  
      // Set up the shader material
      const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
          intensity1: { type: 'f', value: intensity },
          intensity2: { type: 'f', value: intensity },
          dispFactor: { type: 'f', value: 0 },
          texture1: { type: 't', value: texture1 },
          texture2: { type: 't', value: texture2 },
          disp: { type: 't', value: displacementTexture },
          res: { type: 'vec4', value: new THREE.Vector4(container.offsetWidth, container.offsetHeight, 1, 1) },
          dpr: { type: 'f', value: window.devicePixelRatio },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          uniform float dispFactor;
          uniform sampler2D texture1;
          uniform sampler2D texture2;
          uniform sampler2D disp;
  
          mat2 getRotM(float angle) {
            float s = sin(angle);
            float c = cos(angle);
            return mat2(c, -s, s, c);
          }
  
          void main() {
            vec4 disp = texture2D(disp, vUv);
            vec2 dispVec = vec2(disp.r, disp.g);
  
            vec2 uv = 0.5 * gl_FragCoord.xy / vec2(res.x, res.y);
            vec2 myUV = (uv - vec2(0.5)) * vec2(res.z, res.w) + vec2(0.5);
  
            vec2 distortedPosition1 = myUV + getRotM(3.14) * dispVec * intensity1 * dispFactor;
            vec2 distortedPosition2 = myUV + getRotM(-3.14) * dispVec * intensity2 * (1.0 - dispFactor);
  
            vec4 _texture1 = texture2D(texture1, distortedPosition1);
            vec4 _texture2 = texture2D(texture2, distortedPosition2);
  
            gl_FragColor = mix(_texture1, _texture2, dispFactor);
          }
        `,
        transparent: true,
        opacity: 1,
      });
  
      const geometry = new THREE.PlaneBufferGeometry(container.offsetWidth, container.offsetHeight, 1);
      const mesh = new THREE.Mesh(geometry, shaderMaterial);
      scene.add(mesh);
  
      // Handle mouse interaction
      const handleMouseEnter = () => {
        TweenMax.to(shaderMaterial.uniforms.dispFactor, 1.6, { value: 1, ease: Expo.easeOut, onUpdate: renderScene });
      };
  
      const handleMouseLeave = () => {
        TweenMax.to(shaderMaterial.uniforms.dispFactor, 1.2, { value: 0, ease: Expo.easeOut, onUpdate: renderScene });
      };
  
      if (container) {
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);
      }
  
      // Handle window resizing
      const handleResize = () => {
        const width = container.offsetWidth;
        const height = container.offsetHeight;
  
        shaderMaterial.uniforms.res.value.set(width, height, 1, 1);
        renderer.setSize(width, height);
        renderScene();
      };
  
      window.addEventListener('resize', handleResize);
  
      // Cleanup on unmount
      return () => {
        window.removeEventListener('resize', handleResize);
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, [image1, image2, displacementImage, intensity, video]);
  
    return <div className="distortion" ref={containerRef}></div>;
  };

export default LiquidDistortion
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const PodcastModel: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f8f8);

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 1.5, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(300, 300);
    mountRef.current.appendChild(renderer.domElement);

    // Orbit Controls for Mouse Rotation
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Microphone stand
    const stand = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.2, 4, 32),
      new THREE.MeshPhongMaterial({ color: 0x333333 })
    );
    stand.position.y = -1;
    scene.add(stand);

    // More realistic mic (Capsule shape)
    const micBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.6, 0.6, 1.5, 32),
      new THREE.MeshPhongMaterial({ color: 0x8844ff, emissive: 0x5522aa })
    );
    micBody.position.y = 1.8;
    scene.add(micBody);

    const micTop = new THREE.Mesh(
      new THREE.SphereGeometry(0.6, 32, 32),
      new THREE.MeshPhongMaterial({ color: 0x8844ff, emissive: 0x5522aa })
    );
    micTop.position.y = 2.55;
    scene.add(micTop);

    // Grill (Wireframe effect)
    const grill = new THREE.Mesh(
      new THREE.CylinderGeometry(0.58, 0.58, 0.3, 32),
      new THREE.MeshPhongMaterial({ color: 0x222222, wireframe: true, transparent: true, opacity: 0.7 })
    );
    grill.position.y = 2.55;
    scene.add(grill);

    // Animated Sound Waves (3 rings)
    const waves: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const wave = new THREE.Mesh(
        new THREE.TorusGeometry(1.2 + i * 0.4, 0.05, 16, 100),
        new THREE.MeshPhongMaterial({ color: 0x9966ff, emissive: 0x8844ff, transparent: true, opacity: 0.6 - i * 0.2 })
      );
      wave.position.y = 2.55;
      wave.rotation.x = Math.PI / 2;
      scene.add(wave);
      waves.push(wave);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 3, 2);
    scene.add(directionalLight);

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);

      controls.update();
      time += 0.03;

      // Mic glow effect
      micBody.material.emissiveIntensity = 0.3 + 0.2 * Math.sin(time);
      micTop.material.emissiveIntensity = 0.3 + 0.2 * Math.sin(time);

      // Sound Wave Animation (expanding waves)
      waves.forEach((wave, i) => {
        wave.scale.x = 1 + 0.2 * Math.sin(time * 2 - i * 1.5);
        wave.scale.z = 1 + 0.2 * Math.sin(time * 2 - i * 1.5);
        // wave.material.opacity = 0.6 - i * 0.2 + 0.1 * Math.sin(time * 2 - i * 1.5);
      });

      // Gentle mic swinging effect
      micBody.rotation.z = 0.02 * Math.sin(time);
      micTop.rotation.z = 0.02 * Math.sin(time);
      grill.rotation.z = 0.02 * Math.sin(time);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full rounded-xl overflow-hidden" />;
};

export default PodcastModel;

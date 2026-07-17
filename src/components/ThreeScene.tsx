"use client";

/* eslint-disable react-hooks/immutability */
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";

function CameraParallax() {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      target.current.x = (event.clientX / window.innerWidth - 0.5) * 0.65;
      target.current.y = (event.clientY / window.innerHeight - 0.5) * 0.4;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, target.current.x, 0.025);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, -target.current.y, 0.025);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function AccentObject() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = clock.getElapsedTime() * 0.12;
    mesh.current.rotation.y = clock.getElapsedTime() * 0.2;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.65}>
      <mesh ref={mesh} scale={1.8}>
        <torusKnotGeometry args={[1, 0.28, 128, 24, 2, 3]} />
        <MeshDistortMaterial
          color="#ff2d55"
          emissive="#7d102d"
          emissiveIntensity={0.8}
          roughness={0.18}
          metalness={0.72}
          distort={0.23}
          speed={1.7}
        />
      </mesh>
    </Float>
  );
}

function SceneContent({ starCount }: { starCount: number }) {
  return (
    <>
      <CameraParallax />
      <ambientLight intensity={0.35} />
      <pointLight color="#ff2d55" intensity={20} distance={10} position={[3, 2, 4]} />
      <pointLight color="#8b5cf6" intensity={16} distance={12} position={[-4, -2, 2]} />
      <AccentObject />
      <Stars
        radius={32}
        depth={22}
        count={starCount}
        factor={1.4}
        saturation={0}
        fade
        speed={0.35}
      />
    </>
  );
}

export default function ThreeScene() {
  const [starCount, setStarCount] = useState(900);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)");
    const updateStarCount = () => setStarCount(media.matches ? 350 : 900);
    updateStarCount();
    media.addEventListener("change", updateStarCount);
    return () => media.removeEventListener("change", updateStarCount);
  }, []);

  return (
    <div className="three-scene" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 48 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        fallback={null}
      >
        <SceneContent starCount={starCount} />
      </Canvas>
    </div>
  );
}

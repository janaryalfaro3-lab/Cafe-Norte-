import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Environment, MeshDistortMaterial, Float } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function RigidShape({ position, color, radius, factor = 1 }: { position: [number, number, number], color: string, radius: number, factor?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPosition = useMemo(() => new THREE.Vector3(...position), [position]);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const mouse = state.mouse;
      
      // Smooth parallax
      const targetX = initialPosition.x + mouse.x * factor;
      const targetY = initialPosition.y + mouse.y * factor;
      
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);
      
      // Subtle oscillation
      meshRef.current.position.y += Math.sin(time * 0.5) * 0.2;
      
      // Rotation influenced by mouse
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, mouse.y * 0.5, 0.1);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouse.x * 0.5, 0.1);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[radius, 64, 64]} />
      <MeshDistortMaterial
        color={color}
        speed={1.5}
        distort={0.4}
        radius={1}
        roughness={0.4}
        metalness={0.2}
        transparent
        opacity={0.08}
      />
    </mesh>
  );
}

function FloatingBean({ position, scale, rotationSpeed }: { position: [number, number, number], scale: number, rotationSpeed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPosition = useMemo(() => new THREE.Vector3(...position), [position]);
  
  useFrame((state) => {
    if (meshRef.current) {
      const mouse = state.mouse;
      
      // Parallax effect - further elements move less
      const parallaxFactor = Math.abs(position[2]) * 0.25;
      const targetX = initialPosition.x + mouse.x * parallaxFactor;
      const targetY = initialPosition.y + mouse.y * parallaxFactor;
      
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.03);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.03);
    }
  });

  return (
    <Float speed={rotationSpeed} rotationIntensity={1} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial 
          color="#3d2b1f" 
          roughness={0.3} 
          metalness={0.1} 
          transparent 
          opacity={0.15} 
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  const { viewport } = useThree();
  
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={50} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
      <spotLight position={[-10, 20, 10]} angle={0.3} penumbra={1} intensity={1} color="#d4e9e2" />

      {/* Large Background Bio-shapes */}
      <RigidShape position={[12, 6, -10]} color="#1e3932" radius={12} factor={4} />
      <RigidShape position={[-15, -8, -15]} color="#006241" radius={15} factor={6} />
      <RigidShape position={[0, 12, -20]} color="#d4e9e2" radius={20} factor={3} />

      {/* Floating "Bean" particles for texture */}
      {Array.from({ length: 30 }).map((_, i) => (
        <FloatingBean 
          key={i}
          position={[
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 20 - 5
          ]}
          scale={0.2 + Math.random() * 0.4}
          rotationSpeed={1 + Math.random()}
        />
      ))}

      <Environment preset="city" />
    </>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none bg-[#faf9f6]">
      <Canvas dpr={[1, 2]}>
        <Scene />
      </Canvas>
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-white/40 to-cafe-dark/5" />
    </div>
  );
}


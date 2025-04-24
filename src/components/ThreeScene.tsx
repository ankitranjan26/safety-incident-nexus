import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

function SpinningTorusKnot({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh position={position} ref={meshRef}>
      <torusKnotGeometry args={[0.6, 0.2, 128, 32]} />
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
    </mesh>
  );
}

function FloatingParticles({ count = 100 }: { count?: number }) {
  const particles = useRef<THREE.Points>(null!);
  
  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.y += 0.001;
      particles.current.rotation.x += 0.0005;
    }
  });

  const particlePositions = React.useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#9b87f5" sizeAttenuation />
    </points>
  );
}

const ThreeScene: React.FC = () => {
  return (
    <div className="h-64 w-full bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg overflow-hidden backdrop-blur-sm border border-primary/20">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <color attach="background" args={['transparent']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <SpinningTorusKnot position={[-1.5, 0, 0]} color="#9b87f5" />
        <SpinningTorusKnot position={[1.5, 0, 0]} color="#7E69AB" />
        <FloatingParticles count={150} />
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default ThreeScene;

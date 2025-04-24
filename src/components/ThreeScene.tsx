
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/components/ui/theme-provider';

// Spinning Torus Knot component
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

// Spinning Octahedron component
function SpinningOctahedron({ position, color, speed = 1 }: { position: [number, number, number]; color: string; speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3 * speed;
      meshRef.current.rotation.y += delta * 0.2 * speed;
      meshRef.current.rotation.z += delta * 0.1 * speed;
    }
  });

  return (
    <mesh position={position} ref={meshRef}>
      <octahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
    </mesh>
  );
}

// Floating dodecahedron component
function FloatingDodecahedron({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const initialY = position[1];
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.z = clock.getElapsedTime() * 0.2;
      // Add floating motion
      meshRef.current.position.y = initialY + Math.sin(clock.getElapsedTime()) * 0.2;
    }
  });

  return (
    <mesh position={position} ref={meshRef}>
      <dodecahedronGeometry args={[0.4, 0]} />
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.1} />
    </mesh>
  );
}

// Floating particles component
function FloatingParticles({ count = 100, color }: { count?: number; color: string }) {
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
      <pointsMaterial size={0.1} color={color} sizeAttenuation />
    </points>
  );
}

const ThreeScene: React.FC = () => {
  const { theme } = useTheme();
  
  // Theme-dependent colors
  const primaryColor = theme === 'dark' ? '#9b87f5' : '#7E69AB';
  const secondaryColor = theme === 'dark' ? '#7E69AB' : '#6E59A5';
  const accentColor = theme === 'dark' ? '#6E59A5' : '#9b87f5';
  const particlesColor = theme === 'dark' ? '#9b87f5' : '#7E69AB';
  
  return (
    <div className="h-64 w-full bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg overflow-hidden backdrop-blur-sm border border-primary/20">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <color attach="background" args={['transparent']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        
        {/* Original torus knots */}
        <SpinningTorusKnot position={[-1.5, 0, 0]} color={primaryColor} />
        <SpinningTorusKnot position={[1.5, 0, 0]} color={secondaryColor} />
        
        {/* New 3D objects */}
        <SpinningOctahedron position={[0, 1.2, 0]} color={accentColor} speed={1.5} />
        <SpinningOctahedron position={[-2.2, -1.0, 0]} color={secondaryColor} speed={0.8} />
        <FloatingDodecahedron position={[2.2, -1.0, 0]} color={primaryColor} />
        
        <FloatingParticles count={150} color={particlesColor} />
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default ThreeScene;

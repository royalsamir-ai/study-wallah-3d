import { useRef, useMemo, useEffect, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

/** Tracks normalized pointer position (-1..1) across the whole viewport. */
function usePointerTarget() {
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  return target;
}

/** Wraps the whole scene and gently tilts/rotates it toward the cursor (parallax). */
function TiltRig({ children }: { children: ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const pointer = usePointerTarget();

  useFrame(() => {
    if (!groupRef.current) return;
    const targetRotY = pointer.current.x * 0.35;
    const targetRotX = -pointer.current.y * 0.2;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.06);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.06);
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, pointer.current.x * 0.3, 0.06);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -pointer.current.y * 0.2, 0.06);
  });

  return <group ref={groupRef}>{children}</group>;
}

/** The hero centerpiece: a stylized kawaii bunny that reacts strongly to the cursor. */
function KawaiiBunny({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const earLeftRef = useRef<THREE.Mesh>(null);
  const earRightRef = useRef<THREE.Mesh>(null);
  const pointer = usePointerTarget();

  useFrame((state) => {
    if (groupRef.current) {
      const targetRotY = pointer.current.x * 0.6;
      const targetRotX = -pointer.current.y * 0.35;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.08);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.08);
    }
    const t = state.clock.getElapsedTime();
    if (earLeftRef.current) earLeftRef.current.rotation.z = 0.35 + Math.sin(t * 1.3) * 0.08;
    if (earRightRef.current) earRightRef.current.rotation.z = -0.35 - Math.sin(t * 1.3 + 0.4) * 0.08;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.15} floatIntensity={1.2}>
      <group ref={groupRef} position={position} scale={1.35}>
        {/* Body */}
        <mesh position={[0, -0.45, 0]}>
          <sphereGeometry args={[0.62, 48, 48]} />
          <meshStandardMaterial color="#FFFDF9" roughness={0.4} metalness={0.05} emissive="#FF8FB3" emissiveIntensity={0.05} />
        </mesh>
        {/* Head */}
        <mesh position={[0, 0.28, 0]}>
          <sphereGeometry args={[0.5, 48, 48]} />
          <meshStandardMaterial color="#FFFDF9" roughness={0.35} metalness={0.05} emissive="#FF8FB3" emissiveIntensity={0.06} />
        </mesh>
        {/* Ears */}
        <mesh ref={earLeftRef} position={[-0.24, 0.85, 0]} rotation={[0, 0, 0.35]}>
          <capsuleGeometry args={[0.1, 0.55, 8, 16]} />
          <meshStandardMaterial color="#ffe4ef" roughness={0.4} metalness={0.05} />
        </mesh>
        <mesh ref={earRightRef} position={[0.24, 0.85, 0]} rotation={[0, 0, -0.35]}>
          <capsuleGeometry args={[0.1, 0.55, 8, 16]} />
          <meshStandardMaterial color="#ffe4ef" roughness={0.4} metalness={0.05} />
        </mesh>
        {/* Inner ears (glow accents) */}
        <mesh position={[-0.24, 0.9, 0.06]} rotation={[0, 0, 0.35]}>
          <capsuleGeometry args={[0.045, 0.35, 8, 16]} />
          <meshStandardMaterial color="#FF8FB3" emissive="#FF8FB3" emissiveIntensity={0.4} />
        </mesh>
        <mesh position={[0.24, 0.9, 0.06]} rotation={[0, 0, -0.35]}>
          <capsuleGeometry args={[0.045, 0.35, 8, 16]} />
          <meshStandardMaterial color="#FF8FB3" emissive="#FF8FB3" emissiveIntensity={0.4} />
        </mesh>
        {/* Eyes */}
        <mesh position={[-0.16, 0.3, 0.44]}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial color="#2E2A4A" roughness={0.2} />
        </mesh>
        <mesh position={[0.16, 0.3, 0.44]}>
          <sphereGeometry args={[0.055, 16, 16]} />
          <meshStandardMaterial color="#2E2A4A" roughness={0.2} />
        </mesh>
        {/* Blush */}
        <mesh position={[-0.28, 0.14, 0.4]}>
          <circleGeometry args={[0.07, 24]} />
          <meshStandardMaterial color="#FF8FB3" transparent opacity={0.5} />
        </mesh>
        <mesh position={[0.28, 0.14, 0.4]}>
          <circleGeometry args={[0.07, 24]} />
          <meshStandardMaterial color="#FF8FB3" transparent opacity={0.5} />
        </mesh>
        {/* Nose */}
        <mesh position={[0, 0.2, 0.48]}>
          <sphereGeometry args={[0.03, 12, 12]} />
          <meshStandardMaterial color="#e88aa8" roughness={0.3} />
        </mesh>
        {/* Little glowing sparkle above head */}
        <mesh position={[0.45, 1.05, 0.1]}>
          <octahedronGeometry args={[0.09, 0]} />
          <meshStandardMaterial color="#c8b6ff" emissive="#c8b6ff" emissiveIntensity={0.6} metalness={0.3} roughness={0.15} />
        </mesh>
      </group>
    </Float>
  );
}

function CuteHeart({
  position,
  scale = 1,
  color,
  speed,
  pulse,
}: {
  position: [number, number, number];
  scale?: number;
  color: string;
  speed: number;
  pulse?: boolean;
}) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * speed;
      meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
      if (pulse) {
        const s = scale * (1 + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.12);
        meshRef.current.scale.setScalar(s);
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <group ref={meshRef} position={position} scale={scale}>
        <mesh position={[-0.25, 0.15, 0]}>
          <sphereGeometry args={[0.28, 32, 32]} />
          <meshStandardMaterial color={color} metalness={0.2} roughness={0.25} emissive={color} emissiveIntensity={0.15} />
        </mesh>
        <mesh position={[0.25, 0.15, 0]}>
          <sphereGeometry args={[0.28, 32, 32]} />
          <meshStandardMaterial color={color} metalness={0.2} roughness={0.25} emissive={color} emissiveIntensity={0.15} />
        </mesh>
        <mesh position={[0, -0.2, 0]} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[0.5, 0.6, 32]} />
          <meshStandardMaterial color={color} metalness={0.2} roughness={0.25} emissive={color} emissiveIntensity={0.15} />
        </mesh>
      </group>
    </Float>
  );
}

function GlowingOrb({
  position,
  scale = 1,
  color,
  speed,
}: {
  position: [number, number, number];
  scale?: number;
  color: string;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const s = scale * (1 + Math.sin(state.clock.getElapsedTime() * speed) * 0.15);
      meshRef.current.scale.setScalar(s);
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.25}
          emissive={color}
          emissiveIntensity={0.3}
          roughness={0.1}
          metalness={0}
        />
      </mesh>
    </Float>
  );
}

function CuteStar({
  position,
  scale = 1,
  color,
  speed,
}: {
  position: [number, number, number];
  scale?: number;
  color: string;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * speed;
      meshRef.current.rotation.x = state.clock.getElapsedTime() * speed * 0.5;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.15}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

function CuteMug({
  position,
  scale = 1,
  speed,
}: {
  position: [number, number, number];
  scale?: number;
  speed: number;
}) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * speed * 0.5;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
      <group ref={meshRef} position={position} scale={scale}>
        <mesh>
          <cylinderGeometry args={[0.4, 0.35, 0.6, 32]} />
          <meshStandardMaterial color="#ffd6e5" metalness={0.15} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.35, 0.3, 0.1, 32]} />
          <meshStandardMaterial color="#8b6f5a" metalness={0.05} roughness={0.8} />
        </mesh>
        <mesh position={[0.45, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.15, 0.05, 16, 32]} />
          <meshStandardMaterial color="#ffd6e5" metalness={0.15} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
        </mesh>
        <mesh position={[0.1, 0.65, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

function CuteBook({
  position,
  scale = 1,
  color,
  speed,
}: {
  position: [number, number, number];
  scale?: number;
  color: string;
  speed: number;
}) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * speed;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
      <group ref={meshRef} position={position} scale={scale}>
        <mesh>
          <boxGeometry args={[1.2, 0.12, 0.9]} />
          <meshStandardMaterial color={color} metalness={0.15} roughness={0.45} />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[1.1, 0.08, 0.82]} />
          <meshStandardMaterial color="#fffaf5" metalness={0.05} roughness={0.7} />
        </mesh>
        <mesh position={[0.35, -0.15, 0.1]}>
          <boxGeometry args={[0.12, 0.35, 0.02]} />
          <meshStandardMaterial color="#FF8FB3" emissive="#FF8FB3" emissiveIntensity={0.25} />
        </mesh>
      </group>
    </Float>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 200;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffb5d0"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function Hero3DScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={0.9} color="#ffd6e5" />
      <directionalLight position={[-5, -3, 3]} intensity={0.5} color="#c8b6ff" />
      <pointLight position={[0, 0, 3]} intensity={0.6} color="#ffb5d0" />
      <pointLight position={[-3, 2, 2]} intensity={0.4} color="#c8b6ff" />

      <TiltRig>
        {/* Hero centerpiece — interactive kawaii bunny, tracks the cursor */}
        <KawaiiBunny position={[0, -0.2, 0.5]} />

        {/* Large soft glowing orbs */}
        <GlowingOrb position={[-3.5, 1.5, -3]} scale={1.2} color="#ffb5d0" speed={0.8} />
        <GlowingOrb position={[3.5, -1, -3]} scale={1} color="#c8b6ff" speed={1} />
        <GlowingOrb position={[0, 2.5, -4]} scale={0.8} color="#ffd6e5" speed={0.6} />
        <GlowingOrb position={[-2, -2.5, -3]} scale={0.9} color="#e0d4ff" speed={0.9} />
        <GlowingOrb position={[2.5, 2, -4]} scale={0.7} color="#b8e6d4" speed={1.1} />

        {/* Pulsing hearts */}
        <CuteHeart position={[-2.8, 1.2, -1]} scale={0.8} color="#FF8FB3" speed={0.4} pulse />
        <CuteHeart position={[2.5, -1.2, -1.5]} scale={0.6} color="#ffb5d0" speed={0.5} pulse />
        <CuteHeart position={[0, 2.2, -2]} scale={0.5} color="#ffd6e5" speed={0.3} pulse />

        {/* Floating stars */}
        <CuteStar position={[-3, -0.5, -2]} scale={0.8} color="#e0d4ff" speed={0.6} />
        <CuteStar position={[3, 0.5, -2]} scale={0.6} color="#ffb5d0" speed={0.5} />
        <CuteStar position={[0.5, 1.8, -1.5]} scale={0.5} color="#b8e6d4" speed={0.7} />
        <CuteStar position={[-1.8, -1.8, -2]} scale={0.5} color="#ffd6e5" speed={0.55} />
        <CuteStar position={[1.5, -2, -1.5]} scale={0.4} color="#c8b6ff" speed={0.65} />

        {/* Cute mugs */}
        <CuteMug position={[2.2, 1.5, -1]} scale={1} speed={0.3} />
        <CuteMug position={[-2.5, -1.5, -0.5]} scale={0.7} speed={0.4} />

        {/* Cute books */}
        <CuteBook position={[-1.5, 0.5, -2]} scale={1} color="#c8b6ff" speed={0.25} />
        <CuteBook position={[1.8, 0.8, -2.5]} scale={0.8} color="#b8e6d4" speed={0.35} />
        <CuteBook position={[0, -2, -1.5]} scale={0.7} color="#ffd9b8" speed={0.3} />

        <ParticleField />
      </TiltRig>

      <Environment preset="sunset" />
    </Canvas>
  );
}

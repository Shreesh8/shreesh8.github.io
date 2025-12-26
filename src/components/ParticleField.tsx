import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 2000 }) {
  const mesh = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const { viewport } = useThree();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 30;
      positions[i3 + 1] = (Math.random() - 0.5) * 30;
      positions[i3 + 2] = (Math.random() - 0.5) * 15;

      // Cyan color with slight variations
      colors[i3] = 0;
      colors[i3 + 1] = 0.8 + Math.random() * 0.2;
      colors[i3 + 2] = 0.8 + Math.random() * 0.2;

      sizes[i] = Math.random() * 2 + 0.5;
    }

    return { positions, colors, sizes };
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;

    const time = state.clock.getElapsedTime();
    const positions = mesh.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Gentle floating motion
      positions[i3 + 1] += Math.sin(time * 0.5 + i * 0.01) * 0.002;
      positions[i3] += Math.cos(time * 0.3 + i * 0.02) * 0.001;

      // Mouse interaction
      const dx = (mouse.current.x * viewport.width) / 2 - positions[i3];
      const dy = (mouse.current.y * viewport.height) / 2 - positions[i3 + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 3) {
        positions[i3] -= dx * 0.02;
        positions[i3 + 1] -= dy * 0.02;
      }
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y = time * 0.02;
  });

  // Track mouse position
  const handlePointerMove = (e: { clientX: number; clientY: number }) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  if (typeof window !== "undefined") {
    window.addEventListener("mousemove", handlePointerMove);
  }

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ConnectionLines({ count = 150 }) {
  const linesRef = useRef<THREE.LineSegments>(null);

  const linePositions = useMemo(() => {
    const positions = new Float32Array(count * 6);

    for (let i = 0; i < count; i++) {
      const i6 = i * 6;
      const x1 = (Math.random() - 0.5) * 25;
      const y1 = (Math.random() - 0.5) * 25;
      const z1 = (Math.random() - 0.5) * 10;

      positions[i6] = x1;
      positions[i6 + 1] = y1;
      positions[i6 + 2] = z1;
      positions[i6 + 3] = x1 + (Math.random() - 0.5) * 3;
      positions[i6 + 4] = y1 + (Math.random() - 0.5) * 3;
      positions[i6 + 5] = z1 + (Math.random() - 0.5) * 2;
    }

    return positions;
  }, [count]);

  useFrame((state) => {
    if (!linesRef.current) return;
    const time = state.clock.getElapsedTime();
    linesRef.current.rotation.y = time * 0.01;
    linesRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count * 2}
          array={linePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#00ffff" transparent opacity={0.15} />
    </lineSegments>
  );
}

export default function ParticleField() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        className="pointer-events-none"
      >
        <ambientLight intensity={0.5} />
        <Particles count={1500} />
        <ConnectionLines count={100} />
      </Canvas>
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
    </div>
  );
}

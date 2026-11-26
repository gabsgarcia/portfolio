"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * Side profile of a brilliant cut, from the bottom point (culet) to the flat top (table).
 * LatheGeometry spins these points around the Y axis; with 8 segments the gem gets 8 sides.
 */
const PROFILE = [
  [0, -1.05],
  [0.55, -0.45],
  [1, 0],
  [1, 0.08],
  [0.78, 0.32],
  [0.56, 0.46],
  [0, 0.46],
].map(([x, y]) => new THREE.Vector2(x, y));

/** A studio light setup generated in the browser, so there is no .hdr file to download. */
function Studio() {
  const gl = useThree((s) => s.gl);
  const env = useMemo(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const texture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();
    return texture;
  }, [gl]);
  useEffect(() => () => env.dispose(), [env]);
  // attach="environment" sets it on the parent, which is the scene.
  return <primitive object={env} attach="environment" />;
}

type Props = { still: boolean; progress: React.RefObject<number> };

function Gem({ still, progress }: Props) {
  const group = useRef<THREE.Group>(null);
  const spin = useRef(0);
  const geometry = useMemo(() => new THREE.LatheGeometry(PROFILE, 8), []);
  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g || still) return;
    spin.current += delta * 0.35;
    const p = progress.current ?? 0;
    // Damping: move a fraction of the way to the target every frame, so the gem eases instead of snapping.
    const k = 1 - Math.exp(-delta * 4);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, spin.current + state.pointer.x * 0.8 + p * Math.PI, k);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0.18 - state.pointer.y * 0.4 + p * 0.5, k);
    g.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.05;
  });

  return (
    <group ref={group} rotation={[0.18, 0.4, 0.12]}>
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          color="#9e0f22"
          emissive="#3d0410"
          flatShading
          roughness={0.12}
          metalness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.04}
          envMapIntensity={0.9}
          iridescence={0.35}
        />
      </mesh>
      {/* A thin wireframe shell shows the cut, like a drawing on top of the stone. */}
      <mesh geometry={geometry} scale={1.06}>
        <meshBasicMaterial color="#b9a3f0" wireframe transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

/** A slow ring of peach dust around the gem, for depth. */
function Dust({ still }: { still: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const count = 160;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Deterministic pseudo-random positions keep the render the same on every visit.
      const a = (i / count) * Math.PI * 2;
      const r = 1.7 + ((i * 37) % 11) / 11;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = (((i * 53) % 17) / 17 - 0.5) * 1.2;
      pos[i * 3 + 2] = Math.sin(a) * r;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  useFrame((_, delta) => {
    if (ref.current && !still) ref.current.rotation.y -= delta * 0.08;
  });
  return (
    <points ref={ref} geometry={geometry} rotation={[0.25, 0, 0]}>
      <pointsMaterial color="#fadfcf" size={0.025} sizeAttenuation transparent opacity={0.8} />
    </points>
  );
}

type SceneProps = Props & { active: boolean; source: React.RefObject<HTMLElement | null> };

export default function GemScene({ active, still, progress, source }: SceneProps) {
  return (
    <Canvas
      // Reduced motion: draw on demand (one frame). Off screen: stop the loop entirely.
      frameloop={still ? "demand" : active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.2, 5.4], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      // Listen for the pointer on the whole section, so the text on top does not block it.
      eventSource={source as React.RefObject<HTMLElement>}
      eventPrefix="client"
      style={{ touchAction: "pan-y" }}
    >
      <Studio />
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 4, 2]} intensity={2.2} />
      <pointLight position={[-3, 1, 2]} intensity={14} color="#b9a3f0" />
      <pointLight position={[2, -2, 3]} intensity={10} color="#fadfcf" />
      <Gem still={still} progress={progress} />
      <Dust still={still} />
    </Canvas>
  );
}

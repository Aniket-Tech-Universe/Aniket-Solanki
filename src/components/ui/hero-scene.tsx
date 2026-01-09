"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField({ count = 1500 }: { count?: number }) {
    const ref = useRef<THREE.Points>(null);

    const positions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return positions;
    }, [count]);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.x = state.clock.getElapsedTime() * 0.05;
            ref.current.rotation.y = state.clock.getElapsedTime() * 0.08;
        }
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled>
            <PointMaterial
                transparent
                color="#7c3aed"
                size={0.02}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

function FloatingGeometry() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
            meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
        }
    });

    return (
        <mesh ref={meshRef} position={[2, 0, -2]}>
            <icosahedronGeometry args={[1, 1]} />
            <meshBasicMaterial
                color="#7c3aed"
                wireframe
                transparent
                opacity={0.3}
            />
        </mesh>
    );
}

function TorusKnot() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
        }
    });

    return (
        <mesh ref={meshRef} position={[-2.5, 0.5, -3]}>
            {/* Restored to original complexity */}
            <torusKnotGeometry args={[0.6, 0.2, 100, 16]} />
            <meshBasicMaterial
                color="#06b6d4"
                wireframe
                transparent
                opacity={0.2}
            />
        </mesh>
    );
}

export function HeroScene() {
    const [particleCount, setParticleCount] = useState(1500);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const checkDevice = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            setParticleCount(mobile ? 350 : 1500);
        };

        checkDevice();
        window.addEventListener("resize", checkDevice);
        return () => window.removeEventListener("resize", checkDevice);
    }, []);

    return (
        <div className="absolute inset-0 -z-10 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 60 }}
                style={{ background: "transparent" }}
                gl={{
                    alpha: true,
                    antialias: !isMobile,
                    powerPreference: "default",
                }}
                dpr={[1, isMobile ? 1 : 1.5]}
            >
                <ParticleField count={particleCount} />
                <FloatingGeometry />
                <TorusKnot />
            </Canvas>
        </div>
    );
}

export default HeroScene;

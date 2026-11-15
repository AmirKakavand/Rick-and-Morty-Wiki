"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export const StarfieldBackground = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 8;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        container.appendChild(renderer.domElement);

        const starCount = 1600;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const velocities = new Float32Array(starCount);
        const colors = new Float32Array(starCount * 3);

        const palette = [
            new THREE.Color("#F9F4DA"), // Warm Cream
            new THREE.Color("#FF6B00"), // Pop Orange
            new THREE.Color("#38BDF8"), // Cosmic Sky Blue
            new THREE.Color("#00E676"), // Portal Green
        ];

        for (let i = 0; i < starCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 35;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 35;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
            velocities[i] = 0.02 + Math.random() * 0.04;

            const color = palette[Math.floor(Math.random() * palette.length)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.11,
            vertexColors: true,
            transparent: true,
            opacity: 0.95,
        });

        const stars = new THREE.Points(geometry, material);
        scene.add(stars);

        let pointerX = 0;
        let pointerY = 0;
        let warpSpeed = 0.03;
        let isWarping = false;
        let warpTimeoutId: ReturnType<typeof setTimeout>;

        // Randomly trigger warp bursts every 6-12 seconds for 2.5-4 seconds
        const scheduleNextWarp = () => {
            const calmDuration = 6000 + Math.random() * 6000;
            warpTimeoutId = setTimeout(() => {
                isWarping = true;
                const warpDuration = 2500 + Math.random() * 1500;
                warpTimeoutId = setTimeout(() => {
                    isWarping = false;
                    scheduleNextWarp();
                }, warpDuration);
            }, calmDuration);
        };

        scheduleNextWarp();

        const handleMouseMove = (e: MouseEvent) => {
            pointerX = (e.clientX / window.innerWidth - 0.5) * 2;
            pointerY = -(e.clientY / window.innerHeight - 0.5) * 2;
        };

        // Mobile touch & device tilt parallax so mobile feels alive too
        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                pointerX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
                pointerY = -(e.touches[0].clientY / window.innerHeight - 0.5) * 2;
            }
        };

        const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
            if (e.gamma !== null && e.beta !== null) {
                pointerX = Math.max(-1, Math.min(1, e.gamma / 30));
                pointerY = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
            }
        };

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: true });
        window.addEventListener("deviceorientation", handleDeviceOrientation, {
            passive: true,
        });
        window.addEventListener("resize", handleResize);

        let animationFrameId: number;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            const targetWarp = isWarping ? 0.42 : 0.03;
            warpSpeed += (targetWarp - warpSpeed) * 0.04;

            const targetSize = isWarping ? 0.17 : 0.11;
            material.size += (targetSize - material.size) * 0.05;

            const posAttr = geometry.attributes.position as THREE.BufferAttribute;
            const posArray = posAttr.array as Float32Array;

            for (let i = 0; i < starCount; i++) {
                const idx = i * 3;
                posArray[idx + 2] += velocities[i] + warpSpeed;

                // Subtle pointer vortex
                const dx = posArray[idx] - pointerX * 8;
                const dy = posArray[idx + 1] - pointerY * 8;
                const distSq = dx * dx + dy * dy;
                if (distSq < 9 && distSq > 0.01) {
                    const force = (9 - distSq) * 0.0025;
                    posArray[idx] += dx * force;
                    posArray[idx + 1] += dy * force;
                }

                // Loop stars back into deep space
                if (posArray[idx + 2] > 10) {
                    posArray[idx + 2] = -20;
                    posArray[idx] = (Math.random() - 0.5) * 35;
                    posArray[idx + 1] = (Math.random() - 0.5) * 35;
                }
            }

            posAttr.needsUpdate = true;
            stars.rotation.z += isWarping ? 0.006 : 0.0008;

            camera.position.x += (pointerX * 1.2 - camera.position.x) * 0.05;
            camera.position.y += (pointerY * 1.2 - camera.position.y) * 0.05;

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            clearTimeout(warpTimeoutId);
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("deviceorientation", handleDeviceOrientation);
            window.removeEventListener("resize", handleResize);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" />;
};
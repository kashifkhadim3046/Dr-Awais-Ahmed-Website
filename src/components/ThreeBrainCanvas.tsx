import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Activity, RotateCcw, Zap, Sparkles } from 'lucide-react';

interface ThreeBrainCanvasProps {
  className?: string;
  isReducedMotion?: boolean;
}

export const ThreeBrainCanvas: React.FC<ThreeBrainCanvasProps> = ({
  className = '',
  isReducedMotion = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeRhythm, setActiveRhythm] = useState<'Alpha' | 'Beta' | 'Theta' | 'Delta'>('Alpha');
  const [pulseCount, setPulseCount] = useState<number>(78);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [isRotating, setIsRotating] = useState<boolean>(!isReducedMotion);

  const sceneState = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    brainGroup?: THREE.Group;
    pulseSignals?: THREE.Points;
    animationFrameId?: number;
    mouseX: number;
    mouseY: number;
    targetRotationX: number;
    targetRotationY: number;
  }>({
    mouseX: 0,
    mouseY: 0,
    targetRotationX: 0,
    targetRotationY: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Check WebGL availability
    try {
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 460;

    // Create Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 240;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const brainGroup = new THREE.Group();
    scene.add(brainGroup);

    // Generate Procedural Brain Point Cloud
    // Dual ellipsoid lobes with cortical fold perturbations
    const pointCount = 1800;
    const positions = new Float32Array(pointCount * 3);
    const colors = new Float32Array(pointCount * 3);
    const sizes = new Float32Array(pointCount);

    const baseColorCyan = new THREE.Color('#0D9488'); // Medical teal
    const baseColorNavy = new THREE.Color('#1E293B'); // Deep slate
    const pulseHighlight = new THREE.Color('#38BDF8'); // Cyan glow

    for (let i = 0; i < pointCount; i++) {
      const isRightHemisphere = Math.random() > 0.5;
      const hemiOffset = isRightHemisphere ? 18 : -18;

      // Spherical coordinates
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);

      // Anatomical scaling (elongated front-to-back, curved cortical folds)
      const rx = 44 + Math.sin(phi * 4.0) * 4.0 + Math.cos(theta * 6.0) * 3.0;
      const ry = 52 + Math.sin(theta * 3.0) * 4.0;
      const rz = 62 + Math.cos(phi * 3.0) * 5.0;

      const r = Math.cbrt(Math.random()) * 0.9 + 0.1; // Distribution towards cortex surface

      let x = r * rx * Math.sin(phi) * Math.cos(theta);
      let y = r * ry * Math.sin(phi) * Math.sin(theta);
      let z = r * rz * Math.cos(phi);

      // Offset hemispheres with central longitudinal fissure
      x += (isRightHemisphere ? 1 : -1) * (14 + Math.abs(x) * 0.25);

      // Slight frontal elevation and occipital depression
      y += (z > 0 ? 6 : -4);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color gradient: higher electrical density at front & temporal
      const mixRatio = Math.min(1, Math.max(0, (y + 50) / 100));
      const ptColor = baseColorNavy.clone().lerp(baseColorCyan, mixRatio * 0.85);

      if (Math.random() > 0.88) {
        ptColor.lerp(pulseHighlight, 0.7);
      }

      colors[i * 3] = ptColor.r;
      colors[i * 3 + 1] = ptColor.g;
      colors[i * 3 + 2] = ptColor.b;

      sizes[i] = Math.random() * 2.5 + 1.2;
    }

    const brainGeometry = new THREE.BufferGeometry();
    brainGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    brainGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Circle texture for smooth particles
    const createCircleTexture = () => {
      const pCanvas = document.createElement('canvas');
      pCanvas.width = 64;
      pCanvas.height = 64;
      const ctx = pCanvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(13, 148, 136, 0.8)');
        gradient.addColorStop(0.8, 'rgba(13, 148, 136, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(pCanvas);
    };

    const pointMaterial = new THREE.PointsMaterial({
      size: 2.8,
      vertexColors: true,
      map: createCircleTexture(),
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const brainPoints = new THREE.Points(brainGeometry, pointMaterial);
    brainGroup.add(brainPoints);

    // Neural Synaptic Axon Connections
    // Connect proximate nodes with faint glowing lines
    const linePositions: number[] = [];
    const lineColors: number[] = [];
    const connectionDistance = 24;

    for (let i = 0; i < 350; i += 2) {
      const p1 = new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      for (let j = i + 1; j < Math.min(i + 35, pointCount); j++) {
        const p2 = new THREE.Vector3(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
        const dist = p1.distanceTo(p2);
        if (dist < connectionDistance) {
          linePositions.push(p1.x, p1.y, p1.z);
          linePositions.push(p2.x, p2.y, p2.z);

          lineColors.push(0.05, 0.58, 0.53, 0.05, 0.58, 0.53);
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x0d9488,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });
    const neuralLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    brainGroup.add(neuralLines);

    // Action Potential Traveling Pulse Particles
    const pulseCountInternal = 60;
    const pulseGeo = new THREE.BufferGeometry();
    const pulsePos = new Float32Array(pulseCountInternal * 3);
    const pulseIndices = new Int32Array(pulseCountInternal);

    for (let p = 0; p < pulseCountInternal; p++) {
      const randIdx = Math.floor(Math.random() * (pointCount - 1));
      pulseIndices[p] = randIdx;
      pulsePos[p * 3] = positions[randIdx * 3];
      pulsePos[p * 3 + 1] = positions[randIdx * 3 + 1];
      pulsePos[p * 3 + 2] = positions[randIdx * 3 + 2];
    }

    pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePos, 3));
    const pulseMat = new THREE.PointsMaterial({
      size: 4.5,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.95,
      map: createCircleTexture(),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pulseMesh = new THREE.Points(pulseGeo, pulseMat);
    brainGroup.add(pulseMesh);

    // Initial slight angle
    brainGroup.rotation.x = 0.2;
    brainGroup.rotation.y = -0.4;

    sceneState.current = {
      renderer,
      scene,
      camera,
      brainGroup,
      pulseSignals: pulseMesh,
      mouseX: 0,
      mouseY: 0,
      targetRotationX: 0.2,
      targetRotationY: -0.4,
    };

    // Mouse Interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      sceneState.current.mouseX = x;
      sceneState.current.mouseY = y;
      sceneState.current.targetRotationY = x * 0.7 - 0.3;
      sceneState.current.targetRotationX = -y * 0.4 + 0.2;
    };

    const handleMouseLeave = () => {
      sceneState.current.targetRotationX = 0.2;
      sceneState.current.targetRotationY = -0.4;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth || 500;
      const newHeight = container.clientHeight || 460;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Render Animation Loop
    let clock = new THREE.Clock();
    let pulseUpdateTimer = 0;

    const animate = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      if (isRotating && !isReducedMotion) {
        // Continuous subtle rotation + responsive mouse parallax
        brainGroup.rotation.y += (sceneState.current.targetRotationY - brainGroup.rotation.y) * 0.05 + 0.002;
        brainGroup.rotation.x += (sceneState.current.targetRotationX - brainGroup.rotation.x) * 0.05;
      }

      // Action Potential travel simulation
      pulseUpdateTimer += delta;
      if (pulseMesh && pulseUpdateTimer > 0.08) {
        pulseUpdateTimer = 0;
        const currentPos = pulseMesh.geometry.attributes.position.array as Float32Array;
        for (let p = 0; p < pulseCountInternal; p++) {
          let currIdx = pulseIndices[p];
          // Step to a nearby node
          const nextIdx = (currIdx + 11) % pointCount;
          pulseIndices[p] = nextIdx;
          currentPos[p * 3] = positions[nextIdx * 3];
          currentPos[p * 3 + 1] = positions[nextIdx * 3 + 1];
          currentPos[p * 3 + 2] = positions[nextIdx * 3 + 2];
        }
        pulseMesh.geometry.attributes.position.needsUpdate = true;
      }

      // Breathing scale effect
      const breath = Math.sin(elapsedTime * 1.5) * 0.015 + 1.0;
      brainPoints.scale.set(breath, breath, breath);

      renderer.render(scene, camera);
      sceneState.current.animationFrameId = requestAnimationFrame(animate);
    };

    sceneState.current.animationFrameId = requestAnimationFrame(animate);

    // Periodic pulse count update for live telemetry display
    const telemetryInterval = setInterval(() => {
      setPulseCount((prev) => 72 + Math.floor(Math.sin(Date.now() / 1000) * 12));
    }, 1500);

    return () => {
      clearInterval(telemetryInterval);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);

      if (sceneState.current.animationFrameId) {
        cancelAnimationFrame(sceneState.current.animationFrameId);
      }

      brainGeometry.dispose();
      pointMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      pulseGeo.dispose();
      pulseMat.dispose();
      renderer.dispose();
    };
  }, [isReducedMotion, isRotating]);

  const resetView = () => {
    if (sceneState.current.brainGroup) {
      sceneState.current.brainGroup.rotation.x = 0.2;
      sceneState.current.brainGroup.rotation.y = -0.4;
      sceneState.current.targetRotationX = 0.2;
      sceneState.current.targetRotationY = -0.4;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[400px] md:h-[480px] lg:h-[520px] rounded-3xl overflow-hidden bg-radial from-slate-900 via-slate-950 to-[#070D1B] border border-slate-800/80 shadow-2xl flex flex-col justify-between ${className}`}
      aria-label="Interactive 3D Neurophysiology Brain Model"
    >
      {/* Subtle top telemetry header */}
      <div className="relative z-10 flex items-center justify-between p-4 md:p-5 border-b border-slate-800/60 bg-slate-950/40 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping" />
          <span className="text-xs font-semibold tracking-wider uppercase text-teal-300">
            Neuro-Visualizer 3D
          </span>
          <span className="text-slate-500 text-xs">|</span>
          <span className="text-xs text-slate-300 font-mono tabular-nums">
            {activeRhythm} Rhythm ({activeRhythm === 'Alpha' ? '8–13 Hz' : activeRhythm === 'Beta' ? '14–30 Hz' : activeRhythm === 'Theta' ? '4–7 Hz' : '0.5–3 Hz'})
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`p-1.5 rounded-lg border transition-all ${
              isRotating
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
            title={isRotating ? 'Pause Rotation' : 'Resume Rotation'}
            aria-label={isRotating ? 'Pause 3D rotation' : 'Resume 3D rotation'}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={resetView}
            className="px-2.5 py-1 rounded-lg border border-slate-700 bg-slate-800/60 text-slate-300 hover:bg-slate-800 text-[11px] font-medium transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main 3D Canvas or Fallback */}
      {webglSupported ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-0"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center z-0">
          <div className="max-w-xs space-y-3">
            <Activity className="w-12 h-12 mx-auto text-teal-400 animate-pulse" />
            <p className="text-sm text-slate-300 font-medium">
              Real-time High-Precision Neurophysiological Brain Simulation
            </p>
            <p className="text-xs text-slate-500">
              Cerebral Cortex · Synaptic Pathways · Action Potentials
            </p>
          </div>
        </div>
      )}

      {/* Real-time Oscilloscope EEG traces overlay on bottom */}
      <div className="relative z-10 p-4 md:p-5 border-t border-slate-800/70 bg-slate-950/60 backdrop-blur-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
          {/* Animated SVG EEG Waveform */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 font-mono text-teal-400">
                <Zap className="w-3 h-3" />
                CH-1 FP1-F3 (10-20 SYSTEM)
              </span>
              <span className="font-mono text-slate-400 tabular-nums">
                50 μV / 7 mm/s
              </span>
            </div>

            {/* SVG Live Waveform */}
            <div className="h-8 w-full overflow-hidden bg-slate-900/80 rounded border border-slate-800 flex items-center px-1">
              <svg className="w-full h-6" viewBox="0 0 300 24" preserveAspectRatio="none">
                <path
                  d="M0,12 L20,12 L25,5 L30,19 L35,10 L40,14 L55,12 L60,3 L65,21 L70,8 L80,12 L100,12 L105,4 L110,20 L115,11 L130,12 L145,7 L150,17 L160,12 L180,12 L185,2 L190,22 L195,9 L210,12 L230,12 L235,6 L240,18 L250,12 L275,12 L280,4 L285,20 L300,12"
                  fill="none"
                  stroke="#14B8A6"
                  strokeWidth="1.5"
                  className="eeg-trace-animated"
                />
              </svg>
            </div>
          </div>

          {/* Interactive Rhythm Selector */}
          <div className="flex items-center justify-between md:justify-end gap-1.5">
            {(['Alpha', 'Beta', 'Theta', 'Delta'] as const).map((rhythm) => (
              <button
                key={rhythm}
                onClick={() => setActiveRhythm(rhythm)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                  activeRhythm === rhythm
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/50 shadow-sm shadow-teal-500/10'
                    : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {rhythm}
              </button>
            ))}
          </div>
        </div>

        {/* Legend footnotes */}
        <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Interactive 3D model: drag to rotate view</span>
          </span>
          <span className="font-mono text-slate-400 tabular-nums">
            Estimated Action Potentials: ~{pulseCount} bpm
          </span>
        </div>
      </div>
    </div>
  );
};

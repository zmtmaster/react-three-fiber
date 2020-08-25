import React, { createContext, useState, useEffect } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import * as CANNON from 'cannon';
import * as THREE from 'three';

// Inject cannon-debugger
import '../js/debugCannon';

// Cannon-world context provider
export const Context = createContext();
export function Physics({ children, debugCannon = false }) {
	// Set up physics
	const [world] = useState(() => new CANNON.World());
	const { scene } = useThree();
	const [cannonDebugRenderer] = useState(() =>
		debugCannon ? new THREE.CannonDebugRenderer(scene, world) : null
	);

	useEffect(() => {
		world.broadphase = new CANNON.NaiveBroadphase();
		world.solver.iterations = 10;
		world.gravity.set(0, -10, 0);
	}, [world]);

	// Run world stepper every frame
	useFrame((/* canvasProps, delta */) => {
		world.step(1 / 60);
		if (debugCannon) {
			cannonDebugRenderer?.update();
		}
	});
	// Distribute world via context
	return <Context.Provider value={world} children={children} />;
}

import * as CANNON from 'cannon';
import { useState, useEffect, useContext, useRef } from 'react';
import { useFrame } from 'react-three-fiber';

import { Context } from '../context/cannon';

// Custom hook to maintain a world physics body
export function useBody({ ...props }, fn, deps = []) {
	const ref = useRef();
	// Get cannon world object
	const world = useContext(Context);

	// Instantiate a physics body
	const [body] = useState(() => new CANNON.Body(props));

	useEffect(() => {
		// Call function so the user can add shapes
		fn(body);
		// Add body to world on mount
		world.addBody(body);
		// Remove body on unmount
		return () => world.removeBody(body);
	}, deps);

	useFrame(() => {
		if (ref.current) {
			// Transport cannon physics into the referenced threejs object
			ref.current.position.copy(body.position);
			ref.current.quaternion.copy(body.quaternion);
		}
	});

	return ref;
}

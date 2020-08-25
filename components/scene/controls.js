import React, { useRef } from 'react';
import { extend, useFrame, useThree } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

export default function Controls() {
	const orbitRef = useRef();
	const { camera, gl } = useThree();
	useFrame(() => {
		orbitRef.current.update();
	});

	return (
		<>
			<orbitControls autoRotate ref={orbitRef} args={[camera, gl.domElement]} />
		</>
	);
}

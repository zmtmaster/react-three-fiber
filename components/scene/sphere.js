import React from 'react';
import { animated } from '@react-spring/three';
import { Sphere as CannonSphere } from 'cannon';

import { useBody } from '../../hooks/useCannon';

export default function Sphere(props) {
	const ref = useBody({ mass: props.mass }, (body) => {
		body.addShape(new CannonSphere(props.size));
		body.position.set(...props.position);
	});

	return (
		<animated.mesh ref={ref}>
			<sphereGeometry attach="geometry" args={[props.size]} />
			<meshPhysicalMaterial attach="material" color="gray" />
		</animated.mesh>
	);
}

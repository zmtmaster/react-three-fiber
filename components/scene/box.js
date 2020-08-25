import React, { Suspense } from 'react';
import { animated } from '@react-spring/three';
import { Box as CannonBox, Vec3 } from 'cannon';
import { TextureLoader } from 'three';
import { useLoader } from 'react-three-fiber';
import { useBody } from '../../hooks/useCannon';

function toRadians(degrees) {
	return (degrees * Math.PI) / 180;
}

export default function Box(props) {
	const texture = useLoader(
		TextureLoader,
		require('../../assets/textures/crate.gif')
	);
	const ref = useBody({ mass: props.mass }, (body) => {
		body.addShape(
			new CannonBox(
				new Vec3(props.sizes[0] / 2, props.sizes[1] / 2, props.sizes[2] / 2)
			)
		);
		if (props.rotateY ?? props.rotateY > 0) {
			body.quaternion.setFromAxisAngle(
				new Vec3(0, 1, 0),
				toRadians(props.rotateY)
			);
		}
		body.position.set(...props.position);
	});

	return (
		<animated.mesh ref={ref}>
			<boxBufferGeometry
				attach="geometry"
				args={[props.sizes[0], props.sizes[1], props.sizes[2]]}
			/>
			<meshPhysicalMaterial attach="material" color="gray">
				<primitive attach="map" object={texture} />
			</meshPhysicalMaterial>
		</animated.mesh>
	);
}

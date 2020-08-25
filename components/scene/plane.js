import React from 'react';
import { Plane, Vec3 } from 'cannon';
import { useLoader } from 'react-three-fiber';
import { DoubleSide, TextureLoader } from 'three';
import { useBody } from '../../hooks/useCannon';

export default function Ground(props) {
	const texture = useLoader(
		TextureLoader,
		require('../../assets/textures/sand.jpg')
	);

	const ref = useBody({ mass: 0 }, (body) => {
		body.addShape(new Plane());
		body.quaternion.setFromAxisAngle(new Vec3(1, 0, 0), -Math.PI / 2);
		body.position.set(...props.position);
	});
	return (
		<mesh ref={ref}>
			<planeBufferGeometry attach="geometry" args={[20, 20]} />
			<meshPhongMaterial side={DoubleSide} attach="material" color="white">
				<primitive attach="map" object={texture} />
			</meshPhongMaterial>
		</mesh>
	);
}

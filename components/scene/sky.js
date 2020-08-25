import React, { Suspense } from 'react';
import { animated } from '@react-spring/three';
import { TextureLoader } from 'three';
import { useLoader } from 'react-three-fiber';
import { BackSide } from 'three';

export default function Sky() {
	const texture = useLoader(
		TextureLoader,
		require('../../assets/textures/sky.jpg')
	);
	return (
		<Suspense fallback={null}>
			<animated.mesh>
				<spotLight
					intensity={0.5}
					color={0xffffff}
					position={[2, 8, 2]}
					angle={0.5}
					penumbra={0.2}
				/>
				<directionalLight color={0xffffff} intensity={1} position={[2, 8, 2]} />
				<sphereGeometry center={[0, 0, 0]} attach="geometry" args={[8, 500]} />
				<meshPhongMaterial side={BackSide} attach="material" color="gray">
					<primitive attach="map" object={texture} />
				</meshPhongMaterial>
			</animated.mesh>
		</Suspense>
	);
}

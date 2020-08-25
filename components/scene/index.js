import React, { Suspense, lazy } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Canvas } from 'react-three-fiber';
import { GLView } from 'expo-gl';

import * as THREE from 'three';
import { Physics } from '../../context/cannon';

const Controls = lazy(() => import('./controls'));
const Plane = lazy(() => import('./plane'));
const Box = lazy(() => import('./box'));
const Sphere = lazy(() => import('./sphere'));
const Sky = lazy(() => import('./sky'));

if (Platform.OS === 'ios' || Platform.OS === 'android') {
	window.performance.clearMeasures = () => {};
	window.performance.clearMarks = () => {};
	window.performance.measure = () => {};
	window.performance.mark = () => {};
}

export default function Scene() {
	return (
		<GLView style={styles.container}>
			<Canvas
				onCreated={({ gl }) => {
					gl.shadowMap.type = THREE.PCFSoftShadowMap;
					gl.shadowMap.enabled = true;
				}}
				camera={{ position: [3, 3, 3] }}
			>
				<Suspense fallback={null}>
					<Controls />
					<ambientLight intensity={0.8} />
					<Physics>
						<Box
							position={[-1, 5, 0]}
							rotateY={35}
							sizes={[0.5, 0.5, 0.5]}
							mass={5}
						/>
						<Box
							position={[-1, 0, 0]}
							rotateY={60}
							sizes={[1, 1, 1]}
							mass={1}
						/>
						<Sphere position={[0.1, 10, 0]} size={0.2} mass={1} />
						<Sphere position={[0.5, 9, 0]} size={0.2} mass={1} />
						<Box position={[1, 5, 1]} sizes={[0.5, 0.5, 0.5]} mass={5} />
						<Box position={[1, 0, 1]} rotateY={45} sizes={[1, 1, 1]} mass={1} />
						<Sky />
						<Plane position={[0, -1, 0]} />
					</Physics>
				</Suspense>
			</Canvas>
		</GLView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
	},
});

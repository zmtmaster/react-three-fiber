const {
	assetExts: defaultAssetExts,
} = require('metro-config/src/defaults/defaults');

module.exports = {
	resolver: {
		assetExts: [...defaultAssetExts, 'glb', 'gltf', '3mf', 'bin'],
	},
};

module.exports = {
	images: {
		files: [{
			expand: true,
			cwd: 'client/img',
			src: '*',
			dest: 'build/img/',
		}]
	}
};
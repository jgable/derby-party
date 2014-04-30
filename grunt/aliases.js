module.exports = {
    'styles': ['less'],
    'scripts': ['transpile:app', 'concat_sourcemap'],
    'images': ['copy:images'],
    'templates': ['emberTemplates:debug'],
    'server': ['clean:build', 'styles', 'images', 'scripts', 'templates', 'express:dev', 'watch'],
    'default': ['server']
};
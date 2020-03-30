module.exports = image => image.public
    && image.regions.length > 0
    && ['new', 'available'].includes(image.status.toLowerCase());

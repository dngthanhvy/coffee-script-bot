const formatResultToArray = (result) => {
    let urlRes = [];
    result.forEach(elem => {
        urlRes.push(elem.media[0].gif.url);
    });
    return urlRes;
};

const getRandomIndex = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

export {
    formatResultToArray,
    getRandomIndex
}
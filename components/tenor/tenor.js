import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const getRandomIndex = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

const randomGifSearch = async(searchTerm) => {
    const api_key = process.env.TENOR_KEY;
    const limit = 20;

    try {
        let randomURL = `https://g.tenor.com/v1/trending?key=${api_key}&limit=${limit}`;
        const randomGif = await axios.get(randomURL);

        if (randomGif.data.results !== []) {
            return getRandomIndex(formatTenorResultToArray(randomGif.data.results));
        } else {
            return 'Cannot find what you were looking for, maybe enter a valid search query?';
        }
    } catch (e) {
        console.log(e.message);
        return null;
    }
};

const gifSearch = async(searchTerm) => {
    const api_key = process.env.TENOR_KEY;
    const limit = 20;
    try {
        const gifSearchData = await axios.get(`https://g.tenor.com/v1/search?q=${searchTerm}&key=${api_key}&limit=${limit}`);
        const gifSearchRes = gifSearchData.data.results;
        if (gifSearchRes) {
            return getRandomIndex(formatTenorResultToArray(gifSearchRes));
        } else {
            return 'Cannot find what you were looking for, maybe enter a valid search query?';
        }
    } catch (e) {
        console.log(e.message);
        return null;
    }
};

export {
    randomGifSearch,
    gifSearch
}
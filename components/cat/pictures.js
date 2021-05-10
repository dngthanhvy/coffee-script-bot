import axios from 'axios';

const getRandomCatPic = async() => {
    try {
        const catPicture = await axios.get('https://thatcopy.pw/catapi/rest/');
        return catPicture.data.url;
    } catch (e) {
        console.log(e.message);
        return null;
    }
};

export { getRandomCatPic }
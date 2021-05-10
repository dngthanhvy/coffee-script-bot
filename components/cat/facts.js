import axios from 'axios';

const getCatFact = async() => {
    try {
        const catFacts = await axios.get('https://cat-fact.herokuapp.com/facts');
        const randomIndex = Math.floor(Math.random() * catFacts.data.length);
        return catFacts.data[randomIndex].text;
    } catch (e) {
        console.log(e.message);
        return null;
    }
};

export { getCatFact }
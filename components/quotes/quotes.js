import axios from 'axios';
import { formatQuote } from './utils.js'

const baseURL = 'http://api.quotable.io/';



const getRandomQuote = async() => {
    
    try {
        const randomQuote = await axios.get(`${baseURL}random`);
        if (!randomQuote) {
            return 'Cannot fetch quote.';
        }
        else {
            const quoteObject = {
                content: randomQuote.data.content,
                author: randomQuote.data.author
            };
            return formatQuote(quoteObject);
        }
    } catch(e) {
        console.log(e.message);
    }
}

export default {
    getRandomQuote
}
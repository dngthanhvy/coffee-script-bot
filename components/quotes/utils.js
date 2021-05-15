const formatQuote = (quoteObject) => {
    let res = `*${quoteObject.content}*\n**-${quoteObject.author}**`;
    return res;
}

export {
    formatQuote
}
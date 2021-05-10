const formatJSON = (JSONres) => {
    return JSON.stringify(JSONres, null, 2);
};

const markdownJSON = (string) => {
    return " ```json\n"+string+"\n```";
};

export {
    formatJSON,
    markdownJSON
}
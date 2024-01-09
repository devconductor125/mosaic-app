export const extractVideoID = (url) => {
    let regex = /https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/;
    let match = url?.match(regex);
    let vId = match ? match[1] : null;
    if (vId == null) {
        regex = /https:\/\/www\.youtube-nocookie\.com\/embed\/([a-zA-Z0-9_-]{11})/;
        match = url?.match(regex);
        vId = match ? match[1] : null;
    }
    return vId
}

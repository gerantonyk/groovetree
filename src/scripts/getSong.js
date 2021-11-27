async function getSong(sc, songId) {
    const song = sc.getToken(songId);
    return song;
}

export default getSong;
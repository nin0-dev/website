let shouldLog = false;
function log(content) {
    if (shouldLog) console.log(content);
}
function onUpdate(data) {
    // set status
    log(data)
    const pfp = document.getElementById("pfp");
    switch(data["discord_status"]) {
        case "online":
            pfp.style.borderColor = "var(--online-color)";
            break;
        case "idle":
            pfp.style.borderColor = "var(--idle-color)";
            break;
        case "dnd":
            pfp.style.borderColor = "var(--dnd-color)";
            break;
        case "offline":
            pfp.style.borderColor = "var(--offline-color)";
            break;
    }
    // set presence
    log(data["activities"])
    let listening = false
    let content = ""
    data["activities"].forEach(presence => {
        if(presence["application_id"] == "463151177836658699" && presence["assets"]["small_text"] != "Paused") { // premid
            listening = true
            artist = presence["state"].substring(0, presence["state"].indexOf(" -"))
            if (artist == "") {
                artist = presence["state"]
            }
            content = `Listening to ${presence["details"]} - ${artist}`
        }
        if(presence["application_id"] == "1108588077900898414") { // vencord lastfm
            listening = true
            content = `Listening to ${presence["details"]} - ${presence["state"]}`
        }
        if(presence["type"] == 0 && presence["application_id"] != "463151177836658699" && presence["application_id"] != "1108588077900898414") { // generic playing status that isn't vencord lastfm or premid
            listening = false
            content = `Playing ${presence["name"]}`
        }
    });
    document.getElementById("presence").style.display = content == "" ? "none": "flex"
    document.getElementById("presence-content").innerText = content
    document.getElementById("presence-icon").src = listening ? "music.png" : "game.png"
}
LanyardWrapper.connectWebSocket("886685857560539176", onUpdate)
.catch(err => {
    console.error(err);
});

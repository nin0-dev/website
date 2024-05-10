function onUpdate(data) {
    console.log(data)
    // set status
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
}
LanyardWrapper.connectWebSocket("886685857560539176", onUpdate)
.catch(err => {
    console.error(err);
});
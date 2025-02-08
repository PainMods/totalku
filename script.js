const rawUrl = "https://raw.githubusercontent.com/PainMods/count/refs/heads/main/Database.json";
const updateUrl = "https://api.github.com/repos/PainMods/count/contents/Database.json";
const token = "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"; 

async function fetchCount() {
    try {
        const response = await fetch(rawUrl);
        const data = await response.json();

        let today = data.today;
        let allTime = data.allTime;

     
        today += 1;
        allTime += 1;

        document.getElementById("todayCount").innerText = today;
        document.getElementById("allTimeCount").innerText = allTime;

        await updateCount(today, allTime);
    } catch (error) {
        console.error("Error fetching count:", error);
    }
}

async function updateCount(today, allTime) {
    const updatedContent = JSON.stringify({ today, allTime }, null, 2);
    const base64Content = btoa(unescape(encodeURIComponent(updatedContent)));

    const getShaResponse = await fetch(updateUrl, { headers: { Authorization: `token ${token}` } });
    const getShaData = await getShaResponse.json();

    const updateData = {
        message: "Update count",
        content: base64Content,
        sha: getShaData.sha
    };

    await fetch(updateUrl, {
        method: "PUT",
        headers: {
            Authorization: `token ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
    });
}


fetchCount();

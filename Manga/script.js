
document.addEventListener("DOMContentLoaded", function () {
    let submit = document.getElementById("passera");
    submit.addEventListener("click", function () {
        const limit = document.getElementById("limit").value;
        const offset = document.getElementById("offset").value;
        var xml = new XMLHttpRequest();
        xml.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const data = JSON.parse(this.responseText);
                const details = document.getElementById("mangaloid");
                details.innerHTML = '';
                data.data.forEach((info) => {
                    try {
                        var mangaXml = new XMLHttpRequest();
                        mangaXml.onreadystatechange = function () {
                            if (this.readyState === 4 && this.status === 200) {
                                const mangaData = JSON.parse(this.responseText);
                                const mangaDescription = mangaData.data.attributes.description.en;
                                const mangaTitle = mangaData.data.attributes.title.en;
                                const mangaContent = document.createElement("div");
                                mangaContent.className = "mangaContent";
                                details.appendChild(mangaContent);
                                const imgCon = document.createElement('div');
                                imgCon.className = "imgCon";
                                mangaContent.appendChild(imgCon);
                                const contain = document.createElement('div');
                                contain.className = "Text";
                                mangaContent.appendChild(contain);
                                const coverImg = document.createElement('img');
                                const coverFileName = info.attributes.fileName;
                                const mangaId = info.relationships[0].id;
                                coverImg.src = `https://uploads.mangadex.org/covers/${mangaId}/${coverFileName}`;
                                imgCon.appendChild(coverImg);
                                const title = document.createElement('h3');
                                title.textContent = mangaTitle;
                                contain.appendChild(title);
                                const description = document.createElement('p');
                                description.textContent = mangaDescription;
                                contain.appendChild(description);
                            }
                        };
                        mangaXml.open("GET", `https://api.mangadex.org/manga/${info.relationships[0].id}?includes[]=manga`, true);
                        mangaXml.send();
                    } catch (error) {
                        console.error("Error fetching manga data:", error);
                    }
                });
            }
        };
        xml.open("GET", `https://api.mangadex.org/cover?limit=${limit}&offset=${offset}`, true);
        xml.send();
    });
});
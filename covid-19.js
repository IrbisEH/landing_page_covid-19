const countryIds = [
    "us",
    "it",
    "cn",
    "es",
    "de",
    "ir"

]

window.addEventListener("load", () => {

    const virusImg1 = document.getElementById('img_virus_1');
    const virusImg2 = document.getElementById('img_virus_2');
    const virusImg3 = document.getElementById('img_virus_3');
    window.addEventListener('scroll', () => {
        virusImg1.style.transform = `translate(${Math.random()*4-2}px, ${Math.random()*4-2}px)`;
        virusImg2.style.transform = `translate(${Math.random()*4-3}px, ${Math.random()*4-2}px)`;
        virusImg3.style.transform = `translate(${Math.random()*4-1}px, ${Math.random()*4-2}px)`;
    });

    const worldMapObj = document.getElementById("map_svg");
    const worldMapDoc = worldMapObj.contentDocument;

    let countriesData = [];

    for (let id of countryIds) {
        countriesData.push({
            "id":id,
            "panel_row": document.getElementById(id),
            "map_parts": getMapPathEl(id, worldMapDoc)
        })
    }

    for (let countryObj of countriesData) {
        countryObj.panel_row.style.transition = "background-color 0.2s ease-in-out";
        countryObj.panel_row.addEventListener("mouseover", ()=> {
            changeObjStyleActive(countryObj);
        });
        countryObj.panel_row.addEventListener("mouseleave", ()=> {
            changeObjStyleDeActive(countryObj);
        });
        for (let item of countryObj.map_parts) {
            item.style.transition = "fill 0.2s ease-in-out";
            item.addEventListener("mouseover", () => {
                changeObjStyleActive(countryObj);
            })
            item.addEventListener("mouseleave", () => {
                changeObjStyleDeActive(countryObj);
            })
        }
    }
    console.log(countriesData[0].panel_row.getElementsByTagName("div"));
})

function scrollToBlock (block_name) {
    let targetBlock = document.getElementById(block_name);
    targetBlock.scrollIntoView({behavior: "smooth"})
}

function getMapPathEl (id, parentEl) {
    let data = [];
    let mapObj = parentEl.getElementById(id);
    if (mapObj.tagName === "g") {
        let childEls = Array.from(mapObj.getElementsByTagName("path"));
        for (let childEl of childEls) {
            data.push(childEl);
        }
    } else {
        data.push(mapObj);
    }
    return data;
}

function changeObjStyleActive (obj) {
    obj.panel_row.style.background = "#E5DDDD";
    for (let item of obj.map_parts) {
        item.style.fill = "#FB4C47";
    }
}

function changeObjStyleDeActive (obj) {
    obj.panel_row.style.background = "none";
    for (let item of obj.map_parts) {
        item.style.fill = "#167C51";
    }
}
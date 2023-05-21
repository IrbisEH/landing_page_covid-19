const countryIds = [
    "us",
    "it",
    "cn",
    "es",
    "de",
    "ir"

]

$(document).ready(function () {
    $("#send-email-btn").click(function () {
        const email = $("#email").val();
        $.ajax({
            type: "POST",
            url: "/send_covid_email",
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify({
                email: email
            }),
            success: function(response) {
                console.log("email send to server")
            },
            error: function(error) {
                console.error(error);
            }
        })
    })
})

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

    const buttonNext = document.getElementById("button_next")
    const buttonPrevious = document.getElementById("button_previous")

    let countryIdx;
    let countriesData = [];

    for (let id of countryIds) {
        countriesData.push({
            "id":id,
            "panel_row": document.getElementById(id),
        })
    }
    if (worldMapDoc) {
        for (let countryObj of countriesData) {
            countryObj.map_parts = getMapPathEl(countryObj.id, worldMapDoc)
        }
    }
    for (let countryObj of countriesData) {
        countryObj.panel_row.style.transition = "background-color 0.2s ease-in-out";
        countryObj.panel_row.addEventListener("mouseover", ()=> {
            clearAll(countriesData);
            changeObjStyleActive(countryObj);
        });
        countryObj.panel_row.addEventListener("mouseleave", ()=> {
            changeObjStyleDeActive(countryObj);
        });
        if (worldMapDoc) {
            for (let item of countryObj.map_parts) {
                item.style.transition = "fill 0.2s ease-in-out";
                item.addEventListener("mouseover", () => {
                    clearAll(countriesData);
                    changeObjStyleActive(countryObj);
                })
                item.addEventListener("mouseleave", () => {
                    clearAll(countriesData);
                    changeObjStyleDeActive(countryObj);
                })
            }
        }
    }

    buttonNext.addEventListener("click", () => {
        if (!countryIdx && countryIdx !== 0 ) {
            countryIdx = 0;
            changeObjStyleActive(countriesData[countryIdx]);
        } else if (countryIdx < countriesData.length - 1) {
            changeObjStyleDeActive(countriesData[countryIdx]);
            countryIdx += 1;
            changeObjStyleActive(countriesData[countryIdx]);
        } else {
            changeObjStyleDeActive(countriesData[countryIdx]);
            countryIdx = 0
            changeObjStyleActive(countriesData[countryIdx]);
        }
    })
    buttonPrevious.addEventListener("click", () => {
        if (!countryIdx && countryIdx !== 0) {
            countryIdx = countriesData.length - 1;
            changeObjStyleActive(countriesData[countryIdx]);
        } else if (countryIdx > 0 && countryIdx < countriesData.length) {
            changeObjStyleDeActive(countriesData[countryIdx]);
            countryIdx -= 1;
            changeObjStyleActive(countriesData[countryIdx]);
        } else {
            changeObjStyleDeActive(countriesData[countryIdx]);
            countryIdx = countriesData.length - 1
            changeObjStyleActive(countriesData[countryIdx]);
        }
    })

    const popup = document.getElementById("popup");
    const popupCloseButton = document.getElementById("popup_close_button");
    const form = document.getElementById("input_email");
    const emailValidationMessage = document.getElementById("emailValidationMessage");

    function submitForm(event) {
        event.preventDefault();

        if (form.checkValidity() === false) {
            emailValidationMessage.style.display = "inline-block";
        } else {
            emailValidationMessage.style.display = "none";
            popup.style.display = "flex";
            form.reset();
        }
    }

    document.querySelector('form').addEventListener('submit', submitForm);

    popupCloseButton.addEventListener("click", () => {
        popup.style.display = "none"
    })
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
    obj.panel_row.style.background = "#FFE1E2";
    if (obj.hasOwnProperty("map_parts")) {
        for (let item of obj.map_parts) {
            item.style.fill = "#FB4C47";
        }
    }
}

function changeObjStyleDeActive (obj) {
    obj.panel_row.style.background = "none";
    if (obj.hasOwnProperty("map_parts")) {
        for (let item of obj.map_parts) {
            item.style.fill = "#167C51";
        }
    }
}

function clearAll (data) {
    for (let item of data) {
        changeObjStyleDeActive(item);
    }
}

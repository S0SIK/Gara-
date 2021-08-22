const Game_id = `1073747782`
const API_id = `10a871f6fab9f5647fdb2d0a433a0910`

const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

fetch('tanks.json')
    .then(response => response.json())
    .then(data => {

        let mySelectedData = [];
        const keys = Object.keys(data)

        for (let i = 0; i < Object.keys(data).length; i++) {
            const inner = data[keys[i]];
            const innerKeys = Object.keys(inner);

            for (let j = 0; j < Object.keys(inner).length; j++) {
                const inner2 = inner[innerKeys[j]];
                if (Object.keys(inner2).length !== 0) {

                    for (const [key, value] of Object.entries(inner2)) {
                        mySelectedData[key] = value;
                    }
                }
            }
        }
        for (const [key, value] of Object.entries(mySelectedData)) {
            const API_tanks = `https://api-console.worldoftanks.com/wotx/encyclopedia/vehicles/?application_id=${API_id}&tank_id=${key}`
            fetch(API_tanks)
                .then(response => response.json())
                .then(data => {
                    const short_name = data.data[key].short_name
                    const big_icon = data.data[key].images.big_icon
                    const tier = data.data[key].tier
                    const premium = data.data[key].is_premium
                    const nacja = data.data[key].nation
                    const klasa = data.data[key].type
                    const API_player = `https://api-console.worldoftanks.com/wotx/tanks/stats/?application_id=${API_id}&account_id=${Game_id}&tank_id=${key}`
                    fetch(API_player)
                        .then(response => response.json())
                        .then(data => {
                            const getFixedLenStrFromNumber = (num, expectedLen) => {
                                const inputLen = Math.ceil(Math.log(num + 1) / Math.LN10);

                                let output = num.toString().substring(0, expectedLen);

                                for (let i = 0; i < expectedLen - inputLen; i++) {
                                    output += "\ ";
                                }

                                return output;
                            }
                            const getCenteredString = (string, fieldLength) => {
                                const cleanedText = string.replace(/(\r\n|\n|\r|\ )/gm, "");
                                const spaces = "\ ".repeat((fieldLength - cleanedText.length) / 2);

                                if (cleanedText.length % 2 == 1 && fieldLength % 2 != 1) {
                                    return spaces + cleanedText + spaces + "\ ";
                                }
                                return spaces + cleanedText + spaces;
                            }

                            const spotted = data.data[Game_id][0].all.spotted
                            const capture_points = data.data[Game_id][0].all.capture_points
                            const dropped_capture_points = data.data[Game_id][0].all.dropped_capture_points
                            const damage_dealt = data.data[Game_id][0].all.damage_dealt
                            const frags = data.data[Game_id][0].all.frags
                            const battles = data.data[Game_id][0].all.battles
                            const damage_assisted_radio = data.data[Game_id][0].all.damage_assisted_radio
                            const shots = data.data[Game_id][0].all.shots
                            const hits = data.data[Game_id][0].all.hits
                            const damage_assisted_track = data.data[Game_id][0].all.damage_assisted_track
                            const wins = data.data[Game_id][0].all.wins
                            const survived_battles = data.data[Game_id][0].all.survived_battles
                            const mark_of_mastery = data.data[Game_id][0].mark_of_mastery
                            const All_assisted = damage_assisted_radio + damage_assisted_track

                            const Kd = (frags / battles).toFixed(2)
                            const DMG = (damage_dealt / battles).toFixed(0)
                            const Sb = (spotted / battles).toFixed(2)
                            const Survived = (survived_battles * 100 / battles).toFixed(2) + '%'
                            const HitAll = (hits * 100 / shots).toFixed(2) + '%'
                            const Sassisted = (All_assisted / battles).toFixed(2)
                            const Wins = (wins * 100 / battles).toFixed(2) + '%'
                            const Cap = (capture_points / battles).toFixed(2)
                            const DeCap = (dropped_capture_points / battles).toFixed(2)

                            const htm = `<div type='button' class="siatka" data-modal-target="modal-${key}" id="info" value="${key}"><div class="${premium}"><h1 class="logo2">${short_name}</h1><img src="${big_icon}" width="272" height="152
                            "></img></br><div class="logo3">     <img src="img/T_${tier}.png" width="40" height="40">    <img src="img/filter_flag_${nacja}.png" width="40" height="40"></img>     <img src="img/${klasa}.gif" width="56" height="40"></img></div></div></div></div>`;



                            const htm2 = `<button data-close-button class="close-button">&times;</button>
                            <div class="box">
                            <div>
                            <div class="siatka" id="info" value="${key}">
                            <div class="${premium}">
                            <h1 class="logo2">${short_name}</h1>
                            <img src="${big_icon}" width="272" height="152"></img></br>
                            <div class="logo3"><img src="img/T_${tier}.png" width="40" height="40"> <img src="img/filter_flag_${nacja}.png"
                            width="40" height="40"></img> <img src="img/${klasa}.gif" width="56" height="40"></img> <img src="img/M_${mark_of_mastery}.png" width="56" height="40"></img>
                            </div>
                            </div>
                            </div>
                            
                            <div class="box_2">
                            <h1 class="logo">Statystyki:</h1>
                            <div class="box_3">
                            <h1 class="stats">K/D: </br>
                            ${getCenteredString(getFixedLenStrFromNumber(Kd, 6), 6)}</h1>
                            <h1 class="stats">Av.DMG: </br>
                            ${getCenteredString(getFixedLenStrFromNumber(DMG, 6), 6)}</h1>
                            <h1 class="stats">S/B: </br>
                            ${getCenteredString(getFixedLenStrFromNumber(Sb, 6), 6)}</h1>
                            </div>
                            <div class="box_3">
                            <h1 class="stats">Surv.%: </br>
                            ${getCenteredString(getFixedLenStrFromNumber(Survived, 6), 6)}</h1>
                            <h1 class="stats">Hit%: </br>
                            ${getCenteredString(getFixedLenStrFromNumber(HitAll, 6), 6)}</h1>
                            <h1 class="stats">Assists: </br>
                            ${getCenteredString(getFixedLenStrFromNumber(Sassisted, 6), 6)}</h1>
                            </div>
                            <div class="box_3">
                            <h1 class="stats">Win%: </br>
                            ${getCenteredString(getFixedLenStrFromNumber(Wins, 6), 6)}</h1>
                            <h1 class="stats">Av.Cap: </br>
                            ${getCenteredString(getFixedLenStrFromNumber(Cap, 6), 6)}</h1>
                           <h3 class="stats">AvDeCap: </br>
                            ${getCenteredString(getFixedLenStrFromNumber(DeCap, 6), 6)}</h1>
                            </div>
                            <div class="box_3">
                            <h1 class="stats">Effi: </br>
                            ${getCenteredString(getFixedLenStrFromNumber("?????", 6), 6)}</h1>
                            <h1 class="stats">WN7: </br>
                            ${getCenteredString(getFixedLenStrFromNumber("?????", 6), 6)}</h1>
                           <h3 class="stats">WN8: </br>
                            ${getCenteredString(getFixedLenStrFromNumber("?????", 6), 6)}</h1>
                            </div>
                            
                            </div>
                            </div>

                            <div>
                            <div class="box_4">
                            <h1 class="logo2">     Wyposażenie:     </h1>
                            <img class="E_" src="img/E_${value.eq.E_1}.png">
                            <img class="E_" src="img/E_${value.eq.E_2}.png">
                            <img class="E_" src="img/E_${value.eq.E_3}.png"> </br>
                            <img class="V" src="img/E_${value.eq.E_4}.png">
                            </div>
                            
                            
                            <div class="box_5">
                            <h1 class="logo">     Perki:     </h1>
                            <img class="P_" src="img/P_${value.perks.P_1}.png">
                            <img class="P_" src="img/P_${value.perks.P_2}.png">
                            <img class="P_" src="img/P_${value.perks.P_3}.png"> </br>
                            <img class="P_" src="img/P_${value.perks.P_4}.png">
                            <img class="P_" src="img/P_${value.perks.P_5}.png">
                            <img class="P_" src="img/P_${value.perks.P_6}.png"></br>
                            <img class="P_" src="img/P_${value.perks.P_7}.png">
                            <img class="P_" src="img/P_${value.perks.P_8}.png">
                            <img class="P_" src="img/P_${value.perks.P_9}.png">           
                            </div>
                            </div>
                            </div>
                            <div>
                            <h1 class="logo">Opis:</h1>
                            ${value.description}
                            </div>
                            `;

                            document
                                .getElementById("tank")
                                .insertAdjacentHTML("beforeend", htm);

                            document
                                .getElementById("modal-body")
                                .insertAdjacentHTML("beforeend", htm2);

                            console.log("loop");


                            document.querySelectorAll(`[data-modal-target]`).forEach(element => {

                                if (element.dataset.modalTarget == `modal-${key}`) {

                                    element.addEventListener('click', (tes) => {
                                        /// Zmień zawartość modalu w zależności od czołgu. 
                                        document.getElementsByClassName("modal-body")[0].innerHTML = htm2;

                                        openModal(document.getElementById("modal"));
                                    });


                                }
                            });

                            closeModalButtons.forEach(button => {
                                button.addEventListener('click', () => {
                                    const modal = button.closest(`.modal`)
                                    closeModal(modal)
                                })
                            })

                        })
                })
        }
    });


$(document).ready(function () {
    const NavY = $('.filtr').offset().top;

    const stickyNav = function () {
        const ScrollY = $(window).scrollTop();

        if (ScrollY > NavY) {
            $('.filtr').addClass('sticky');
        } else {
            $('.filtr').removeClass('sticky');
        }
    };

    stickyNav();

    $(window).scroll(function () {
        stickyNav();
    });
});


let base = document.getElementById('bgBuilding8');
let elem = document.createElement("span");
elem.className = "digData";
elem.innerHTML = "Cost for next multiple of";
base.insertBefore(elem, base.childNodes[1]);
elem = document.createElement("span");
elem.className = "digData";
elem.innerHTML = "12: ";
let elem2 = document.createElement("span");
elem2.id = "next12";
elem.appendChild(elem2);
base.insertBefore(elem, base.childNodes[5]);
elem = document.createElement("span");
elem.className = "digData";
elem.innerHTML = "60: ";
elem2 = document.createElement("span");
elem2.id = "next60";
elem.appendChild(elem2);
base.insertBefore(elem, base.childNodes[9]);



function garboChecker(){
    let sum12 = 0;
    let next12 = Math.floor((buildings[7].amount + 12) / 12) * 12;
    let sum60 = 0;
    let next60 = Math.floor((buildings[7].amount+60)/60)*60;
    for (let i = buildings[7].amount; i < next12; i++) sum12 += Math.round(buildings[7].baseCost * Math.pow(buildings[7].exp, i));
    for (let i = buildings[7].amount; i < next60; i++) sum60 += Math.round(buildings[7].baseCost * Math.pow(buildings[7].exp, i));
    document.getElementById("next12").innerHTML = shortenLargeNumber(sum12);
    document.getElementById("next60").innerHTML = shortenLargeNumber(sum60);

}

setInterval(garboChecker, 100);

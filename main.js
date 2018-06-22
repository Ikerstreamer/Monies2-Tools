const itemList = ['player','buildings', 'upg1','upg2','upg3','upg4','upg5','upg6','upg7','upg8', 'upgProgress','upgSeen1','upgSeen2','upgSeen3','upgSeen4','upgSeen5','upgSeen6','upgSeen7','upgSeen8', 'manaDump','mannaDump','moanaDump', 'versionNum','worthMult','totalTick','totalMon','rocketFuel','manaShown', 'showAvaBTN','monPerBuild', 'avaUpgrades','selectedAvaSave','selectedUpgSave','showingInfinite','infDuration']
var js = document.createElement("script");
js.type = "text/javascript";
js.src = "https://cdn.rawgit.com/pieroxy/lz-string/master/libs/lz-string.min.js";
document.body.appendChild(js);

let base = document.getElementById('bgBuilding8');
let elem = document.createElement("span");
elem.className = "digData";
elem.textContent = "Cost for next multiple of";
base.insertBefore(elem, base.childNodes[1]);
elem = document.createElement("span");
elem.className = "digData";
elem.textContent = "12: ";
let elem2 = document.createElement("span");
elem2.id = "next12";
elem.appendChild(elem2);
base.insertBefore(elem, base.childNodes[5]);
elem = document.createElement("span");
elem.className = "digData";
elem.textContent = "60: ";
elem2 = document.createElement("span");
elem2.id = "next60";
elem.appendChild(elem2);
base.insertBefore(elem, base.childNodes[9]);
sacValue = document.createElement("span");
sacValue.id = "sacValue";
document.getElementById("wholeDocument").appendChild(sacValue);
document.getElementById("sacValue").style.position = "absolute";
document.getElementById("sacValue").style.left = "255px";
document.getElementById("sacValue").style.top = "98px";
document.getElementById("sacValue").style.backgroundColor = "#8664BA";
document.getElementById("sacValue").style.zIndex = "-1";

importBtn = document.createElement("button");
importBtn.id = "import";
importBtn.textContent = "Import";
importBtn.setAttribute("onclick", "importSave()");
document.getElementById("wholeDocument").appendChild(importBtn);
document.getElementById("import").style.position = "absolute";
document.getElementById("import").style.left = "16%";
document.getElementById("import").style.top = "90%";

exportBtn = document.createElement("button");
exportBtn.id = "export";
exportBtn.textContent = "Export";
exportBtn.setAttribute("onclick", "exportSave()");
document.getElementById("wholeDocument").appendChild(exportBtn)
document.getElementById("export").style.position = "absolute";
document.getElementById("export").style.left = "24%";
document.getElementById("export").style.top = "90%";

var exportOutput = document.createElement("textarea");
exportOutput.type = "text";
exportOutput.id = "exportOutput";
document.getElementById("wholeDocument").appendChild(exportOutput)
document.getElementById("exportOutput").style.position = "absolute";
document.getElementById("exportOutput").style.left = "-9999px";

let tradeValue = document.createElement("span");
tradeValue.id = "tradeValue";
tradeValue.className = "digData";
tradeValue.textContent = "Trade Bonus: ";
document.getElementById('bgBuilding11').insertBefore(tradeValue, document.getElementById('bgBuilding11').childNodes[9]);
document.getElementById("tradeValue").style.whiteSpace = "nowrap"

function shortenSmallNumber(number){
    var SI_PREFIXES = ["Thousand", "Million", "Billion", "Trillion", "Quadrillion", "Quintillion", "Sextillion", "Septillion", "Octillion"];
    var tier = Math.floor(Math.log10(number) / 3) | 0;
    if (tier < 1) return number
    var prefix = SI_PREFIXES[tier-1];
    var scale = Math.pow(10, tier * 3);
    var scaled = number / scale;
    return scaled.toFixed(2) + " "+prefix;
}

function garboChecker(){
    let sum12 = 0;
    let next12 = Math.floor((buildings[7].amount + 12) / 12) * 12;
    let sum60 = 0;
    let next60 = Math.floor((buildings[7].amount+60)/60)*60;
    for (let i = buildings[7].amount; i < next12; i++) sum12 += Math.round(buildings[7].baseCost * Math.pow(buildings[7].exp, i));
    for (let i = buildings[7].amount; i < next60; i++) sum60 += Math.round(buildings[7].baseCost * Math.pow(buildings[7].exp, i));
    document.getElementById("next12").textContent = "$" + shortenLargeNumber(sum12);
    document.getElementById("next60").textContent = "$" + shortenLargeNumber(sum60);

}

function sacrificeChecker() {
    if (player.money_5 > 0 || player.money_6 > 0 || parseInt(localStorage.getItem("moanaDump")) > 0) document.getElementById("sacValue").textContent = "+"+((player.money * .000000000000000035) + (player.money_2 * .00000015) + (player.money_3 * .000025) + (player.money_4 * .00000002)).toFixed(2);
    else document.getElementById("sacValue").textContent = ""
}

function exportSave() {
    save()
    var str = ""
    for (let i=0;i<itemList.length;i++) str += localStorage.getItem(itemList[i]) +'|';
    str = LZString.compressToEncodedURIComponent(JSON.stringify(str))
    document.getElementById("exportOutput").textContent = str;
    document.getElementById("exportOutput").focus();
    document.getElementById("exportOutput").select();
    document.execCommand('copy');
    document.getElementById("exportOutput").textContent = "";
}

function importSave(str) {
    str = prompt("Input your save.")
    str = JSON.parse(LZString.decompressFromEncodedURIComponent(str));
    const list = str.split('|')
    for (let i=0;i<itemList.length;i++) localStorage.setItem(itemList[i],list[i]);
    manaDump = 0;
    mannaDump = 0;
    moanaDump = 0;
    load()
}

function winChecker() {
    if (document.getElementById("discoBGID").style.display === "block") {
        document.getElementById("discoWinner").textContent = "YOU WIN! "+totalTicks.toString().replace( /\d{1,3}(?=(\d{3})+(?!\d))/g , "$&,")+" Ticks!"
    }
}

function tradeChecker() {
    if (player.rpcTradeActive) document.getElementById("tradeValue").textContent = "Trade bonus: $"+shortenSmallNumber(getRPCValTrade()-getRPCVal())
    else document.getElementById("tradeValue").textContent = "Trade Bonus: $0"
}

setInterval(garboChecker, 100);
setInterval(sacrificeChecker, 100);
setInterval(winChecker, 100);
setInterval(tradeChecker, 100);
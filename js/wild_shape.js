var elLevel;
var elResults;
var elProfile;
var level = 2;
var moon = false;

elLevel = document.getElementById("level");
elMoon = document.getElementById("moon");
elResults = document.getElementById("results");
elProfile = document.getElementById("profile");


function getLevel(){
	level = this.options[this.selectedIndex].value;
	level = Number(level);
	printList();
}

function getMoon(){
	moon = elMoon.checked;
	printList();
}

function printList(){
	var CRCap;
	var mmBeastNames = Object.keys(mmBeasts);
	var shapes = {0:[],0.125:[],0.25:[],0.5:[],1:[],2:[],3:[],4:[],5:[],6:[]};
	if (moon && level==2) {	
		CRCap = 1;
	} else if (moon) {
		CRCap = level / 3;
	} else if (level >= 8) {
		CRCap = 1;
	} else if (level >= 4) {
		CRCap = 0.5;
	} else if (level >= 2) {
		CRCap = 0.25;
	}
	if (level < 4) {
		for (var i=0;i<mmBeastNames.length;i++) {
			if (mmBeasts[mmBeastNames[i]]["cr"] <= CRCap 
				&& ! mmBeasts[mmBeastNames[i]]["flying"]
				&& ! mmBeasts[mmBeastNames[i]]["swimming"]) {
				shapes[mmBeasts[mmBeastNames[i]]["cr"]].push(mmBeastNames[i]);
			}
		}
	} else if (level < 8) {
		for (var i=0;i<mmBeastNames.length;i++) {
			if (mmBeasts[mmBeastNames[i]]["cr"] <= CRCap 
				&& ! mmBeasts[mmBeastNames[i]]["flying"]) {
				shapes[mmBeasts[mmBeastNames[i]]["cr"]].push(mmBeastNames[i]);
			}
		}
	} else {
		for (var i=0;i<mmBeastNames.length;i++) {
			if (mmBeasts[mmBeastNames[i]]["cr"] <= CRCap) {
				shapes[mmBeasts[mmBeastNames[i]]["cr"]].push(mmBeastNames[i]);
			}
		}
	}
	if (level >= 10 && moon) {
		shapes[5].push("air elemental");
		shapes[5].push("earth elemental");
		shapes[5].push("fire elemental");
		shapes[5].push("water elemental");
	}
	var message;
	message = "<label for='data'><h3>Wild Shapes</h3></label>";
	message += "<table id='data'>";
	message += "<thead><tr>";
	message += "<th>CR</th><th>Beast</th></thead><tbody>";
	CRs = [0,0.125,0.25,0.5,1,2,3,4,5,6]
	for (var i=CRs.length - 1;i>=0;i+= -1){
		for (var j=0;j<shapes[CRs[i]].length;j++){
			message += "<tr><td>" + CRs[i] + "</td>";
			message += "<td id='" + shapes[CRs[i]][j] + "' class='animal'";
			message += "onclick='printStats(\"" + shapes[CRs[i]][j] + "\")'>";
			message += shapes[CRs[i]][j] + "</td></tr>";
		}
	}
	message += "</tbody></table>";
	elResults.innerHTML = message;
}

function printStats(beast) {
	var b = mdata[beast];
	var message;
	var skills = ["acrobatics","animal_handling","arcana","athletics","deception","history",
		"insight","intimidation","investigation","medicine","nature","perception","performance",
		"persuasion","religion","sleight_of_hand","stealth","survival"];
	var saves = ["strength","dexterity","constitution","intelligence","wisdom","charisma"]
	
	message = "<h2>" + b["name"] + "</h2><hr/>";
	message += "<i>" + b["size"] + " " + b["type"] + ", " + b["alignment"] + "</i></br>";
	message += "<b>Armour class </b>" + b["armor_class"] + "</br>";
	message += "<b>Hit Points </b>" + b["hit_points"] + "</br>";
	message += "<b>Speed </b>" + b["speed"] + "</br>";
	message += "<table id='base_stats'><tr><th>STR</th><th>DEX</th><th>CON</th>";
	message += "<th>INT</th><th>WIS</th><th>CHA</th></tr>";
	message += "<tr><td>" + b['strength'] + " (" + Math.floor((b['strength'] - 10)/2) + ")" + "</td>";
	message += "<td>" + b['dexterity'] + " (" + Math.floor((b['dexterity'] - 10)/2) + ")" + "</td>";
	message += "<td>" + b['constitution'] + " (" + Math.floor((b['constitution'] - 10)/2) + ")" + "</td>";
	message += "<td>" + b['intelligence'] + " (" + Math.floor((b['intelligence'] - 10)/2) + ")" + "</td>";
	message += "<td>" + b['wisdom'] + " (" + Math.floor((b['wisdom'] - 10)/2) + ")" + "</td>";
	message += "<td>" + b['charisma'] + " (" + Math.floor((b['charisma'] - 10)/2) + ")" + "</td>";
	message += "</tr></table>";
	var tempSkills = []
	for (var i=0;i<skills.length;i++){
		if (b[skills[i]] != undefined) {
			tempSkills.push(skills[i]);
		}
	}
	if (tempSkills.length > 0) {
		message += "<b>Skills </b> ";
		for (var i=0;i<tempSkills.length;i++){
			message += tempSkills[i] + " +" + b[tempSkills[i]] + " ";
		}
		message += "</br>";
	}
	if (b["damage_vulnerabilities"].length != 0 && b["damage_vulnerabilities"][-1] != ""){
		message += "<b>Damage Vulnerabilities </b>" + b["damage_vulnerabilities"] + "</br>";
	}
	if (b["damage_resistances"].length != 0 && b["damage_resistances"][-1] != ""){
		message += "<b>Damage Resistances </b>" + b["damage_resistances"] + "</br>";
	}
	if (b["damage_immunities"].length != 0 && b["damage_immunities"][-1] != ""){
		message += "<b>Damage Immunities </b>" + b["damage_immunities"] + "</br>";
	}
	if (b["condition_immunities"].length != 0 && b["condition_immunities"][-1] != ""){
		message += "<b>Condition Immunities </b>" + b["condition_immunities"] + "</br>";
	}
	message += "<b>Senses </b>" + b["senses"] + "</br>";
	message += "<b>Languages </b>";
	if (b["languages"] == ""){
		message += "-- </br>";
	} else {
		message += b["languages"] + "</br>";
	}
	message += "<b>Challenge </b>" + b["challenge_rating"] + "</br><hr/>";
	if (b["special_abilities"] != undefined){
		if (b["special_abilities"].length != 0){
			for (var i=0;i < b["special_abilities"].length;i++){
				message += "<b>" + b["special_abilities"][i]["name"] + "</b> ";
				message += b["special_abilities"][i]["desc"] + "</br>";
			}
		}
	}
	message += "<hr/><h4>ACTIONS</h4>";
	if (b["actions"] != undefined){
		if (b["actions"].length != 0){
			for (var i=0;i < b["actions"].length;i++){
				message += "<b>" + b["actions"][i]["name"] + "</b> ";
				message += b["actions"][i]["desc"] + "</br>";
			}
		}
	}
	message += "<hr/>"
	elProfile.innerHTML = message;
}

printList();
elLevel.addEventListener("change",getLevel,false);
elMoon.addEventListener("change",getMoon,false);
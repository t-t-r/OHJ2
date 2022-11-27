function serialize_form(form) {
	return JSON.stringify(
		Array.from(new FormData(form).entries())
			.reduce((m, [ key, value ]) => Object.assign(m, { [key]: value }), {})
			);
}

function haeAsiakkaat(){
	let url = "asiakkaat?hakusana=" + document.getElementById("hakusana").value; 
	let requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }       
    };    
    fetch(url, requestOptions)
    .then(response => response.json())//Muutetaan vastausteksti JSON-objektiksi 
   	.then(response => printItems(response)) 
   	.catch(errorText => console.error("Fetch failed: " + errorText));
}

//Kirjoitetaan tiedot taulukkoon JSON-objektilistasta
function printItems(respObjList){
	//console.log(respObjList);
	let htmlStr="";
	for(let item of respObjList){//yksi kokoelmalooppeista		
    	htmlStr+="<tr id='rivi_"+item.asiakas_id+"'>";
    	htmlStr+="<td>"+item.asiakas_id+"</td>";
    	htmlStr+="<td>"+item.etunimi+"</td>";
    	htmlStr+="<td>"+item.sukunimi+"</td>";
    	htmlStr+="<td>"+item.puhelin+"</td>";
    	htmlStr+="<td>"+item.sposti+"</td>";     	
    	htmlStr+="</tr>";    	
	}	
	document.getElementById("tbody").innerHTML = htmlStr;	
}


function lisaanyt() {
	if(tarkastaTiedot()) {
		lisaaTiedot();
	}
	
}
function tarkastaTiedot() {
	let ilmo="";
	if(document.getElementById("etunimi").value.length<2) {
			ilmo="Etunimi liian lyhyt";
			document.getElementById("etunimi").focus();
	
	} else if (/\D/.test(document.getElementById("puhelin").value)) {
			ilmo="Väärä puhelinumero!"; // jos on jokin muu kuin numero ei kelpaa
			document.getElementById("puhelin").focus();
	} else if (/[^@]/.test(document.getElementById("sposti").value)) {
			ilmo="Väärä sähköposti!"; // täytyy olla @ merkki
			document.getElementById("sposti").focus();
	}
	//näitä voisi tehdä lisääkin
	
	if(ilmo!="") {
		document.getElementById("ilmo").innerHTML=ilmo;
		setTimeout(function() { document.getElementById("ilmo").innerHTML=""; }, 3000);
		return false;
	}else {
		document.getElementById("etunimi").value=siivoa(document.getElementById("etunimi").value);
		document.getElementById("sukunimi").value=siivoa(document.getElementById("sukunimi").value);
		document.getElementById("puhelin").value=siivoa(document.getElementById("puhelin").value);
		document.getElementById("sposti").value=siivoa(document.getElementById("sposti").value);	
		return true;
	}
	
}
function siivoa(teksti) {
	teksti=teksti.replace(/</g, "");
	teksti=teksti.replace(/>/g, "");
	teksti=teksti.replace(/'/g, "''");
	return teksti;
	
}
function lisaaTiedot() {
	let formData = serialize_form(lisaa);
	console.log(formData);
	let url = "asiakkaat";
	let requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: formData
	};
	fetch(url, requestOptions)
	.then(response => response.json())
	.then(responseObj => { 
		if(responseObj.response==0) {
			document.getElementById("ilmo").innerHTML ="Lisääminen epäonnistui";
			}else if(responseObj.response==1) {
				document.getElementById("ilmo").innerHTML ="Lisääminen onnistui";
				document.lisaa.reset();
			}
	})
	.catch(errorText => console.error("Fetch failed: " + errorText));
	
}
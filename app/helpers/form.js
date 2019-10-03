export function formValidierung() {
    var birthdate = document.getElementsByName('Birthdate');
    formDanger(birthdate[0], dateNotGreaterNow(birthdate[0].value));

}
  
function formDanger(element,valid) {
    if (valid) {
        element.classList.remove("uk-form-danger");
      } else {
        element.classList.add("uk-form-danger");
      }
}

function dateNotGreaterNow(date){
    return Date.parse(date) > Date.now() ? false : true;
}


export function helperSocialSecurityNumber(){
    var that = document.getElementsByName('SocialSecurityNumber');
    that = that[0];
    formDanger(that,false);
    var number = that.value;

    //set delimiter "."
    if(number.length === 3) {
      that.value = number + '.';
    } else if (number.length === 8) {
      that.value = number + '.';
    } else if (number.length === 13) {
      that.value = number + '.';
    } 
    
    //Check is digit 0-9
    var lastCharacter = number.slice(-1);
    if(number.length === 4 || number.length === 9 || number.length === 14) {
     lastCharacter = '.'; 
     that.value = number.substr(0,number.length-1) + lastCharacter;
    }
    else if(lastCharacter.match(/[0-9]/) === null) 
    {
      that.value = number.substr(0,number.length-1);
    }
    
    //final Check format correct nnn.nnnn.nnnn.nn
    if (number.length >= 16) {
        that.value = number.substr(0,16);
        that.value.match(/[0-9]{3}\.[0-9]{4}\.[0-9]{4}\.[0-9]{2}/) ? formDanger(that,true) : formDanger(that,false);
    } 
}

export function getLocationFromZip(){

    let locationCodes = 'locationCodes';
    if(document.getElementById(locationCodes) !== null) {
        document.getElementById(locationCodes).remove();
    }
    var y = document.createElement("datalist");
    y.setAttribute("id", locationCodes);
    document.getElementById("datalists").appendChild(y);


    let zips = document.getElementsByName('Zip');
    zips.forEach(function(zip) { 

        let locations = zipLocation();
        locations.forEach(function(element){    

            if (element.Zip === parseInt(zip.value)){
        
                    var z = document.createElement('option');
                    z.setAttribute('value', element.Location);
                    z.setAttribute('label',element.Zip +' '+ element.Location);
                    document.getElementById(locationCodes).appendChild(z);
            }
        });
    }); 
    
    }


export function zipLocation () {

    let zipLocation = [
        {
            "Zip": 1000,
            "Location": "Lausanne"
        },
        {
            "Zip": 1000,
            "Location": "Lausanne 1 Dépôt"
        },
        {
            "Zip": 1000,
            "Location": "Lausanne 10"
        },
        {
            "Zip": 1000,
            "Location": "Lausanne 12"
        },
        {
            "Zip": 1000,
            "Location": "Lausanne 14"
        },
        {
            "Zip": 1000,
            "Location": "Lausanne 16"
        },
        {
            "Zip": 1000,
            "Location": "Lausanne 17"
        },
        {
            "Zip": 1000,
            "Location": "Lausanne 18"
        },
        {
            "Zip": 1000,
            "Location": "Lausanne 19"
        },
        {
            "Zip": 1000,
            "Location": "Lausanne 2"
        },
        {
            "Zip": 1000,
            "Location": "Lausanne 20"
        },
        {
            "Zip": 1000,
            "Location": "Lausanne 22"
        },
        {
            "Zip": 1000,
            "Location": "Lausanne 23"
        },
        {
            "Zip": 1000,
            "Location": "Lausanne 24 Vennes"
        },
        {
            "Zip": 1000,
            "Location": "Lausanne 25"
        },
        {
            "Zip": 1000,
            "Location": "Lausanne 26"
        },
        {
            "Zip": 1000,
            "Location": "Lausanne 27"
        },
        {
            "Zip": 1000,
            "Location": "Lausanne 3"
        },
        {
            "Zip": 1000,
            "Location": "Lausanne 7"
        },
        {
            "Zip": 1000,
            "Location": "Lausanne 8"
        },
        {
            "Zip": 1000,
            "Location": "Lausanne Distribution"
        },
        {
            "Zip": 1000,
            "Location": "Lausanne Grangette"
        },
        {
            "Zip": 1000,
            "Location": "Lausanne Ouchy"
        },
        {
            "Zip": 1000,
            "Location": "Lausanne SPS"
        },
        {
            "Zip": 1001,
            "Location": "Lausanne"
        },
        {
            "Zip": 1001,
            "Location": "Lausanne Arc Jurassien"
        },
        {
            "Zip": 1001,
            "Location": "Lausanne PF 331-120"
        },
        {
            "Zip": 1001,
            "Location": "Lausanne PF 331-140"
        },
        {
            "Zip": 1001,
            "Location": "Lausanne Sozialberatung"
        },
        {
            "Zip": 1002,
            "Location": "Lausanne"
        },
        {
            "Zip": 1003,
            "Location": "Lausanne"
        },
        {
            "Zip": 1003,
            "Location": "Lausanne Terreaux PF"
        },
        {
            "Zip": 1004,
            "Location": "Lausanne"
        },
        {
            "Zip": 1005,
            "Location": "Lausanne"
        },
        {
            "Zip": 1006,
            "Location": "Lausanne"
        },
        {
            "Zip": 1007,
            "Location": "Lausanne"
        },
        {
            "Zip": 1008,
            "Location": "Jouxtens-Mézery"
        },
        {
            "Zip": 1008,
            "Location": "Prilly"
        },
        {
            "Zip": 1009,
            "Location": "Pully"
        },
        {
            "Zip": 1010,
            "Location": "Lausanne"
        },
        {
            "Zip": 1011,
            "Location": "Lausanne"
        },
        {
            "Zip": 1012,
            "Location": "Lausanne"
        },
        {
            "Zip": 1014,
            "Location": "Lausanne Adm cant VD"
        },
        {
            "Zip": 1015,
            "Location": "Lausanne"
        },
        {
            "Zip": 1018,
            "Location": "Lausanne"
        },
        {
            "Zip": 1019,
            "Location": "Lausanne Services spéciaux"
        },
        {
            "Zip": 1020,
            "Location": "Renens VD"
        },
        {
            "Zip": 1020,
            "Location": "Renens VD 1"
        },
        {
            "Zip": 1020,
            "Location": "Renens VD 1 Distribution"
        },
        {
            "Zip": 1020,
            "Location": "Renens VD 2"
        },
        {
            "Zip": 1022,
            "Location": "Chavannes-près-Renens"
        },
        {
            "Zip": 1023,
            "Location": "Crissier"
        },
        {
            "Zip": 1023,
            "Location": "Crissier 1"
        },
        {
            "Zip": 1023,
            "Location": "Crissier 2"
        },
        {
            "Zip": 1023,
            "Location": "Crissier Distribution"
        },
        {
            "Zip": 1024,
            "Location": "Ecublens VD"
        },
        {
            "Zip": 1025,
            "Location": "St-Sulpice VD"
        },
        {
            "Zip": 1026,
            "Location": "Denges"
        },
        {
            "Zip": 1026,
            "Location": "Echandens"
        },
        {
            "Zip": 1026,
            "Location": "Echandens-Denges"
        },
        {
            "Zip": 1027,
            "Location": "Lonay"
        },
        {
            "Zip": 1028,
            "Location": "Préverenges"
        },
        {
            "Zip": 1029,
            "Location": "Villars-Ste-Croix"
        },
        {
            "Zip": 1030,
            "Location": "Bussigny"
        },
        {
            "Zip": 1030,
            "Location": "Bussigny Distribution"
        },
        {
            "Zip": 1031,
            "Location": "Mex VD"
        },
        {
            "Zip": 1032,
            "Location": "Romanel-sur-Lausanne"
        },
        {
            "Zip": 1033,
            "Location": "Cheseaux-Laus Distribution"
        },
        {
            "Zip": 1033,
            "Location": "Cheseaux-sur-Lausanne"
        },
        {
            "Zip": 1034,
            "Location": "Boussens"
        },
        {
            "Zip": 1035,
            "Location": "Bournens"
        },
        {
            "Zip": 1036,
            "Location": "Sullens"
        },
        {
            "Zip": 1037,
            "Location": "Etagnières"
        },
        {
            "Zip": 1038,
            "Location": "Bercher"
        },
        {
            "Zip": 1039,
            "Location": "Cheseaux Polyval"
        },
        {
            "Zip": 1040,
            "Location": "Echallens"
        },
        {
            "Zip": 1040,
            "Location": "Echallens Distribution"
        },
        {
            "Zip": 1040,
            "Location": "St-Barthélemy VD"
        },
        {
            "Zip": 1040,
            "Location": "Villars-le-Terroir"
        },
        {
            "Zip": 1041,
            "Location": "Bottens"
        },
        {
            "Zip": 1041,
            "Location": "Dommartin"
        },
        {
            "Zip": 1041,
            "Location": "Montaubion-Chardonney"
        },
        {
            "Zip": 1041,
            "Location": "Naz"
        },
        {
            "Zip": 1041,
            "Location": "Poliez-le-Grand"
        },
        {
            "Zip": 1041,
            "Location": "Poliez-Pittet"
        },
        {
            "Zip": 1042,
            "Location": "Assens"
        },
        {
            "Zip": 1042,
            "Location": "Bettens"
        },
        {
            "Zip": 1042,
            "Location": "Bioley-Orjulaz"
        },
        {
            "Zip": 1043,
            "Location": "Sugnens"
        },
        {
            "Zip": 1044,
            "Location": "Fey"
        },
        {
            "Zip": 1045,
            "Location": "Ogens"
        },
        {
            "Zip": 1046,
            "Location": "Rueyres"
        },
        {
            "Zip": 1047,
            "Location": "Oppens"
        },
        {
            "Zip": 1052,
            "Location": "Le Mont-sur-Lausanne"
        },
        {
            "Zip": 1052,
            "Location": "Le Mont-sur-Lausanne Dist"
        },
        {
            "Zip": 1053,
            "Location": "Bretigny-sur-Morrens"
        },
        {
            "Zip": 1053,
            "Location": "Cugy VD"
        },
        {
            "Zip": 1054,
            "Location": "Morrens VD"
        },
        {
            "Zip": 1055,
            "Location": "Froideville"
        },
        {
            "Zip": 1058,
            "Location": "Villars-Tiercelin"
        },
        {
            "Zip": 1059,
            "Location": "Peney-le-Jorat"
        },
        {
            "Zip": 1061,
            "Location": "Villars-Mendraz"
        },
        {
            "Zip": 1062,
            "Location": "Sottens"
        },
        {
            "Zip": 1063,
            "Location": "Boulens"
        },
        {
            "Zip": 1063,
            "Location": "Chapelle-sur-Moudon"
        },
        {
            "Zip": 1063,
            "Location": "Martherenges"
        },
        {
            "Zip": 1063,
            "Location": "Peyres-Possens"
        },
        {
            "Zip": 1066,
            "Location": "Epalinges"
        },
        {
            "Zip": 1066,
            "Location": "Epalinges Distribution"
        },
        {
            "Zip": 1068,
            "Location": "Les Monts-de-Pully"
        },
        {
            "Zip": 1070,
            "Location": "Puidoux"
        },
        {
            "Zip": 1071,
            "Location": "Chexbres"
        },
        {
            "Zip": 1071,
            "Location": "Chexbres Distribution"
        },
        {
            "Zip": 1071,
            "Location": "Rivaz"
        },
        {
            "Zip": 1071,
            "Location": "St-Saphorin (Lavaux)"
        },
        {
            "Zip": 1072,
            "Location": "Forel (Lavaux)"
        },
        {
            "Zip": 1073,
            "Location": "Mollie-Margot"
        },
        {
            "Zip": 1073,
            "Location": "Savigny"
        },
        {
            "Zip": 1076,
            "Location": "Ferlens VD"
        },
        {
            "Zip": 1077,
            "Location": "Servion"
        },
        {
            "Zip": 1078,
            "Location": "Essertes"
        },
        {
            "Zip": 1080,
            "Location": "Les Cullayes"
        },
        {
            "Zip": 1081,
            "Location": "Montpreveyres"
        },
        {
            "Zip": 1082,
            "Location": "Corcelles-le-Jorat"
        },
        {
            "Zip": 1083,
            "Location": "Mézières VD"
        },
        {
            "Zip": 1084,
            "Location": "Carrouge VD"
        },
        {
            "Zip": 1085,
            "Location": "Vulliens"
        },
        {
            "Zip": 1088,
            "Location": "Ropraz"
        },
        {
            "Zip": 1090,
            "Location": "La Croix (Lutry)"
        },
        {
            "Zip": 1091,
            "Location": "Aran"
        },
        {
            "Zip": 1091,
            "Location": "Chenaux"
        },
        {
            "Zip": 1091,
            "Location": "Grandvaux"
        },
        {
            "Zip": 1092,
            "Location": "Belmont-sur-Lausanne"
        },
        {
            "Zip": 1093,
            "Location": "La Conversion"
        },
        {
            "Zip": 1094,
            "Location": "Paudex"
        },
        {
            "Zip": 1095,
            "Location": "Lutry"
        },
        {
            "Zip": 1095,
            "Location": "Lutry Distribution"
        },
        {
            "Zip": 1096,
            "Location": "Cully"
        },
        {
            "Zip": 1096,
            "Location": "Villette (Lavaux)"
        },
        {
            "Zip": 1097,
            "Location": "Riex"
        },
        {
            "Zip": 1098,
            "Location": "Epesses"
        },
        {
            "Zip": 1110,
            "Location": "Morges"
        },
        {
            "Zip": 1110,
            "Location": "Morges 1"
        },
        {
            "Zip": 1110,
            "Location": "Morges 2"
        },
        {
            "Zip": 1110,
            "Location": "Morges Distribution"
        },
        {
            "Zip": 1110,
            "Location": "Morges Grosse Pierre"
        },
        {
            "Zip": 1112,
            "Location": "Echichens"
        },
        {
            "Zip": 1113,
            "Location": "St-Saphorin-sur-Morges"
        },
        {
            "Zip": 1114,
            "Location": "Colombier VD"
        },
        {
            "Zip": 1115,
            "Location": "Vullierens"
        },
        {
            "Zip": 1116,
            "Location": "Cottens VD"
        },
        {
            "Zip": 1117,
            "Location": "Grancy"
        },
        {
            "Zip": 1121,
            "Location": "Bremblens"
        },
        {
            "Zip": 1122,
            "Location": "Romanel-sur-Morges"
        },
        {
            "Zip": 1123,
            "Location": "Aclens"
        },
        {
            "Zip": 1124,
            "Location": "Gollion"
        },
        {
            "Zip": 1125,
            "Location": "Monnaz"
        },
        {
            "Zip": 1126,
            "Location": "Vaux-sur-Morges"
        },
        {
            "Zip": 1127,
            "Location": "Clarmont"
        },
        {
            "Zip": 1128,
            "Location": "Reverolle"
        },
        {
            "Zip": 1131,
            "Location": "Tolochenaz"
        },
        {
            "Zip": 1132,
            "Location": "Lully VD"
        },
        {
            "Zip": 1134,
            "Location": "Chigny"
        },
        {
            "Zip": 1134,
            "Location": "Vufflens-le-Château"
        },
        {
            "Zip": 1135,
            "Location": "Denens"
        },
        {
            "Zip": 1136,
            "Location": "Bussy-Chardonney"
        },
        {
            "Zip": 1141,
            "Location": "Sévery"
        },
        {
            "Zip": 1142,
            "Location": "Pampigny"
        },
        {
            "Zip": 1143,
            "Location": "Apples"
        },
        {
            "Zip": 1144,
            "Location": "Ballens"
        },
        {
            "Zip": 1145,
            "Location": "Bière"
        },
        {
            "Zip": 1145,
            "Location": "Bière Caserne"
        },
        {
            "Zip": 1146,
            "Location": "Mollens VD"
        },
        {
            "Zip": 1147,
            "Location": "Montricher"
        },
        {
            "Zip": 1148,
            "Location": "Chavannes-le-Veyron"
        },
        {
            "Zip": 1148,
            "Location": "Cuarnens"
        },
        {
            "Zip": 1148,
            "Location": "La Coudre"
        },
        {
            "Zip": 1148,
            "Location": "La Praz"
        },
        {
            "Zip": 1148,
            "Location": "L'Isle"
        },
        {
            "Zip": 1148,
            "Location": "Mauraz"
        },
        {
            "Zip": 1148,
            "Location": "Moiry VD"
        },
        {
            "Zip": 1148,
            "Location": "Mont-la-Ville"
        },
        {
            "Zip": 1148,
            "Location": "Villars-Bozon"
        },
        {
            "Zip": 1149,
            "Location": "Berolle"
        },
        {
            "Zip": 1162,
            "Location": "St-Prex"
        },
        {
            "Zip": 1162,
            "Location": "St-Prex Distribution"
        },
        {
            "Zip": 1163,
            "Location": "Etoy"
        },
        {
            "Zip": 1164,
            "Location": "Buchillon"
        },
        {
            "Zip": 1165,
            "Location": "Allaman"
        },
        {
            "Zip": 1166,
            "Location": "Perroy"
        },
        {
            "Zip": 1167,
            "Location": "Lussy-sur-Morges"
        },
        {
            "Zip": 1168,
            "Location": "Villars-sous-Yens"
        },
        {
            "Zip": 1169,
            "Location": "Yens"
        },
        {
            "Zip": 1170,
            "Location": "Aubonne"
        },
        {
            "Zip": 1172,
            "Location": "Bougy-Villars"
        },
        {
            "Zip": 1173,
            "Location": "Féchy"
        },
        {
            "Zip": 1174,
            "Location": "Montherod"
        },
        {
            "Zip": 1174,
            "Location": "Pizy"
        },
        {
            "Zip": 1175,
            "Location": "Lavigny"
        },
        {
            "Zip": 1176,
            "Location": "St-Livres"
        },
        {
            "Zip": 1180,
            "Location": "Rolle"
        },
        {
            "Zip": 1180,
            "Location": "Rolle Distribution"
        },
        {
            "Zip": 1180,
            "Location": "Tartegnin"
        },
        {
            "Zip": 1182,
            "Location": "Gilly"
        },
        {
            "Zip": 1183,
            "Location": "Bursins"
        },
        {
            "Zip": 1184,
            "Location": "Luins"
        },
        {
            "Zip": 1184,
            "Location": "Vinzel"
        },
        {
            "Zip": 1185,
            "Location": "Mont-sur-Rolle"
        },
        {
            "Zip": 1186,
            "Location": "Essertines-sur-Rolle"
        },
        {
            "Zip": 1187,
            "Location": "St-Oyens"
        },
        {
            "Zip": 1188,
            "Location": "Gimel"
        },
        {
            "Zip": 1188,
            "Location": "St-George"
        },
        {
            "Zip": 1189,
            "Location": "Saubraz"
        },
        {
            "Zip": 1195,
            "Location": "Bursinel"
        },
        {
            "Zip": 1195,
            "Location": "Dully"
        },
        {
            "Zip": 1195,
            "Location": "Dully-Bursinel"
        },
        {
            "Zip": 1196,
            "Location": "Gland"
        },
        {
            "Zip": 1196,
            "Location": "Gland Dist Fil"
        },
        {
            "Zip": 1196,
            "Location": "Gland Distribution"
        },
        {
            "Zip": 1197,
            "Location": "Prangins"
        },
        {
            "Zip": 1200,
            "Location": "Genève"
        },
        {
            "Zip": 1200,
            "Location": "Genève 1"
        },
        {
            "Zip": 1200,
            "Location": "Genève 11"
        },
        {
            "Zip": 1200,
            "Location": "Genève 12"
        },
        {
            "Zip": 1200,
            "Location": "Genève 13"
        },
        {
            "Zip": 1200,
            "Location": "Genève 17"
        },
        {
            "Zip": 1200,
            "Location": "Genève 18"
        },
        {
            "Zip": 1200,
            "Location": "Genève 19"
        },
        {
            "Zip": 1200,
            "Location": "Genève 2 Cornavin Dépôt"
        },
        {
            "Zip": 1200,
            "Location": "Genève 2 Distribution"
        },
        {
            "Zip": 1200,
            "Location": "Genève 2 Transit"
        },
        {
            "Zip": 1200,
            "Location": "Genève 20"
        },
        {
            "Zip": 1200,
            "Location": "Genève 21"
        },
        {
            "Zip": 1200,
            "Location": "Genève 26"
        },
        {
            "Zip": 1200,
            "Location": "Genève 28 Balexert"
        },
        {
            "Zip": 1200,
            "Location": "Genève 3"
        },
        {
            "Zip": 1200,
            "Location": "Genève 4"
        },
        {
            "Zip": 1200,
            "Location": "Genève 6"
        },
        {
            "Zip": 1200,
            "Location": "Genève 7"
        },
        {
            "Zip": 1200,
            "Location": "Genève 8"
        },
        {
            "Zip": 1200,
            "Location": "Genève Centre logistique"
        },
        {
            "Zip": 1200,
            "Location": "Genève Dist Ba"
        },
        {
            "Zip": 1200,
            "Location": "Genève Les Acacias"
        },
        {
            "Zip": 1201,
            "Location": "Genève"
        },
        {
            "Zip": 1202,
            "Location": "Genève"
        },
        {
            "Zip": 1203,
            "Location": "Genève"
        },
        {
            "Zip": 1204,
            "Location": "Genève"
        },
        {
            "Zip": 1205,
            "Location": "Genève"
        },
        {
            "Zip": 1206,
            "Location": "Genève"
        },
        {
            "Zip": 1207,
            "Location": "Genève"
        },
        {
            "Zip": 1208,
            "Location": "Genève"
        },
        {
            "Zip": 1209,
            "Location": "Genève"
        },
        {
            "Zip": 1211,
            "Location": "Genève 1"
        },
        {
            "Zip": 1211,
            "Location": "Genève 10"
        },
        {
            "Zip": 1211,
            "Location": "Genève 11"
        },
        {
            "Zip": 1211,
            "Location": "Genève 12"
        },
        {
            "Zip": 1211,
            "Location": "Genève 13"
        },
        {
            "Zip": 1211,
            "Location": "Genève 14"
        },
        {
            "Zip": 1211,
            "Location": "Genève 19"
        },
        {
            "Zip": 1211,
            "Location": "Genève 2"
        },
        {
            "Zip": 1211,
            "Location": "Genève 20"
        },
        {
            "Zip": 1211,
            "Location": "Genève 22"
        },
        {
            "Zip": 1211,
            "Location": "Genève 23"
        },
        {
            "Zip": 1211,
            "Location": "Genève 26"
        },
        {
            "Zip": 1211,
            "Location": "Genève 26 Caserne"
        },
        {
            "Zip": 1211,
            "Location": "Genève 27"
        },
        {
            "Zip": 1211,
            "Location": "Genève 28"
        },
        {
            "Zip": 1211,
            "Location": "Genève 3"
        },
        {
            "Zip": 1211,
            "Location": "Genève 4"
        },
        {
            "Zip": 1211,
            "Location": "Genève 5"
        },
        {
            "Zip": 1211,
            "Location": "Genève 5 Dépôt"
        },
        {
            "Zip": 1211,
            "Location": "Genève 6"
        },
        {
            "Zip": 1211,
            "Location": "Genève 70"
        },
        {
            "Zip": 1211,
            "Location": "Genève 71 CS CP"
        },
        {
            "Zip": 1211,
            "Location": "Genève 73"
        },
        {
            "Zip": 1211,
            "Location": "Genève 8"
        },
        {
            "Zip": 1211,
            "Location": "Genève 84 Votations"
        },
        {
            "Zip": 1211,
            "Location": "Genf SPS"
        },
        {
            "Zip": 1212,
            "Location": "Grand-Lancy"
        },
        {
            "Zip": 1212,
            "Location": "Grand-Lancy 1"
        },
        {
            "Zip": 1212,
            "Location": "Grand-Lancy 1 Distribution"
        },
        {
            "Zip": 1213,
            "Location": "Onex"
        },
        {
            "Zip": 1213,
            "Location": "Petit-Lancy"
        },
        {
            "Zip": 1213,
            "Location": "Petit-Lancy 1"
        },
        {
            "Zip": 1213,
            "Location": "Petit-Lancy 2"
        },
        {
            "Zip": 1213,
            "Location": "Petit-Lancy Distribution"
        },
        {
            "Zip": 1214,
            "Location": "Vernier"
        },
        {
            "Zip": 1214,
            "Location": "Vernier Distribution"
        },
        {
            "Zip": 1215,
            "Location": "Genève 15 Aéroport"
        },
        {
            "Zip": 1215,
            "Location": "Genève 15 Aéroport Dépôt"
        },
        {
            "Zip": 1215,
            "Location": "Genève ICC OLS"
        },
        {
            "Zip": 1216,
            "Location": "Cointrin"
        },
        {
            "Zip": 1217,
            "Location": "Meyrin"
        },
        {
            "Zip": 1217,
            "Location": "Meyrin 1"
        },
        {
            "Zip": 1217,
            "Location": "Meyrin 2"
        },
        {
            "Zip": 1217,
            "Location": "Meyrin Distribution"
        },
        {
            "Zip": 1218,
            "Location": "Grand-Saconnex Distribution"
        },
        {
            "Zip": 1218,
            "Location": "Le Grand-Saconnex"
        },
        {
            "Zip": 1219,
            "Location": "Aïre"
        },
        {
            "Zip": 1219,
            "Location": "Châtelaine"
        },
        {
            "Zip": 1219,
            "Location": "Le Lignon"
        },
        {
            "Zip": 1219,
            "Location": "Le Lignon Distribution"
        },
        {
            "Zip": 1219,
            "Location": "Lignon B&V GK"
        },
        {
            "Zip": 1219,
            "Location": "Lignon B&V GK 2"
        },
        {
            "Zip": 1220,
            "Location": "Les Avanchets"
        },
        {
            "Zip": 1222,
            "Location": "Vésenaz"
        },
        {
            "Zip": 1222,
            "Location": "Vésenaz Distribution"
        },
        {
            "Zip": 1223,
            "Location": "Cologny"
        },
        {
            "Zip": 1223,
            "Location": "Cologny Distribution"
        },
        {
            "Zip": 1224,
            "Location": "Chêne-Bougeries"
        },
        {
            "Zip": 1225,
            "Location": "Chêne-Bourg"
        },
        {
            "Zip": 1225,
            "Location": "Chêne-Bourg Distribution"
        },
        {
            "Zip": 1226,
            "Location": "Thônex"
        },
        {
            "Zip": 1227,
            "Location": "Carouge GE"
        },
        {
            "Zip": 1227,
            "Location": "Carouge GE Distribution"
        },
        {
            "Zip": 1227,
            "Location": "Genève PF Fil Carouge"
        },
        {
            "Zip": 1227,
            "Location": "Les Acacias"
        },
        {
            "Zip": 1228,
            "Location": "Plan-les-Ouates"
        },
        {
            "Zip": 1231,
            "Location": "Conches"
        },
        {
            "Zip": 1232,
            "Location": "Confignon"
        },
        {
            "Zip": 1232,
            "Location": "Confignon Cressy"
        },
        {
            "Zip": 1233,
            "Location": "Bernex"
        },
        {
            "Zip": 1233,
            "Location": "Bernex Distribution"
        },
        {
            "Zip": 1234,
            "Location": "Vessy"
        },
        {
            "Zip": 1236,
            "Location": "Cartigny"
        },
        {
            "Zip": 1237,
            "Location": "Avully"
        },
        {
            "Zip": 1239,
            "Location": "Collex"
        },
        {
            "Zip": 1240,
            "Location": "Genève"
        },
        {
            "Zip": 1241,
            "Location": "Puplinge"
        },
        {
            "Zip": 1242,
            "Location": "Satigny"
        },
        {
            "Zip": 1243,
            "Location": "Presinge"
        },
        {
            "Zip": 1244,
            "Location": "Choulex"
        },
        {
            "Zip": 1245,
            "Location": "Collonge-Bellerive"
        },
        {
            "Zip": 1246,
            "Location": "Corsier GE"
        },
        {
            "Zip": 1247,
            "Location": "Anières"
        },
        {
            "Zip": 1248,
            "Location": "Hermance"
        },
        {
            "Zip": 1251,
            "Location": "Gy"
        },
        {
            "Zip": 1252,
            "Location": "Meinier"
        },
        {
            "Zip": 1253,
            "Location": "Vandoeuvres"
        },
        {
            "Zip": 1254,
            "Location": "Jussy"
        },
        {
            "Zip": 1255,
            "Location": "Veyrier"
        },
        {
            "Zip": 1256,
            "Location": "Troinex"
        },
        {
            "Zip": 1257,
            "Location": "La Croix-de-Rozon"
        },
        {
            "Zip": 1258,
            "Location": "Perly"
        },
        {
            "Zip": 1260,
            "Location": "Nyon"
        },
        {
            "Zip": 1260,
            "Location": "Nyon 1"
        },
        {
            "Zip": 1260,
            "Location": "Nyon 1 Distribution"
        },
        {
            "Zip": 1260,
            "Location": "Nyon 2"
        },
        {
            "Zip": 1260,
            "Location": "Nyon car postal La Côte-Ju"
        },
        {
            "Zip": 1261,
            "Location": "Le Vaud"
        },
        {
            "Zip": 1261,
            "Location": "Longirod"
        },
        {
            "Zip": 1261,
            "Location": "Marchissy"
        },
        {
            "Zip": 1262,
            "Location": "Eysins"
        },
        {
            "Zip": 1263,
            "Location": "Crassier"
        },
        {
            "Zip": 1264,
            "Location": "St-Cergue"
        },
        {
            "Zip": 1265,
            "Location": "La Cure"
        },
        {
            "Zip": 1266,
            "Location": "Duillier"
        },
        {
            "Zip": 1267,
            "Location": "Coinsins"
        },
        {
            "Zip": 1267,
            "Location": "Vich"
        },
        {
            "Zip": 1268,
            "Location": "Begnins"
        },
        {
            "Zip": 1268,
            "Location": "Burtigny"
        },
        {
            "Zip": 1269,
            "Location": "Bassins"
        },
        {
            "Zip": 1270,
            "Location": "Trélex"
        },
        {
            "Zip": 1271,
            "Location": "Givrins"
        },
        {
            "Zip": 1272,
            "Location": "Genolier"
        },
        {
            "Zip": 1273,
            "Location": "Arzier-Le Muids"
        },
        {
            "Zip": 1274,
            "Location": "Grens"
        },
        {
            "Zip": 1274,
            "Location": "Signy"
        },
        {
            "Zip": 1274,
            "Location": "Signy-Centre"
        },
        {
            "Zip": 1275,
            "Location": "Chéserex"
        },
        {
            "Zip": 1276,
            "Location": "Gingins"
        },
        {
            "Zip": 1277,
            "Location": "Arnex-sur-Nyon"
        },
        {
            "Zip": 1277,
            "Location": "Borex"
        },
        {
            "Zip": 1278,
            "Location": "La Rippe"
        },
        {
            "Zip": 1279,
            "Location": "Bogis-Bossey"
        },
        {
            "Zip": 1279,
            "Location": "Chavannes-de-Bogis"
        },
        {
            "Zip": 1279,
            "Location": "Chavannes-de-Bogis OLS"
        },
        {
            "Zip": 1281,
            "Location": "Russin"
        },
        {
            "Zip": 1283,
            "Location": "Dardagny"
        },
        {
            "Zip": 1283,
            "Location": "La Plaine"
        },
        {
            "Zip": 1284,
            "Location": "Chancy"
        },
        {
            "Zip": 1285,
            "Location": "Athenaz (Avusy)"
        },
        {
            "Zip": 1286,
            "Location": "Soral"
        },
        {
            "Zip": 1287,
            "Location": "Laconnex"
        },
        {
            "Zip": 1288,
            "Location": "Aire-la-Ville"
        },
        {
            "Zip": 1290,
            "Location": "Chavannes-des-Bois"
        },
        {
            "Zip": 1290,
            "Location": "Versoix"
        },
        {
            "Zip": 1290,
            "Location": "Versoix Distribution"
        },
        {
            "Zip": 1291,
            "Location": "Commugny"
        },
        {
            "Zip": 1292,
            "Location": "Chambésy"
        },
        {
            "Zip": 1293,
            "Location": "Bellevue"
        },
        {
            "Zip": 1294,
            "Location": "Genthod"
        },
        {
            "Zip": 1295,
            "Location": "Mies"
        },
        {
            "Zip": 1295,
            "Location": "Tannay"
        },
        {
            "Zip": 1296,
            "Location": "Coppet"
        },
        {
            "Zip": 1296,
            "Location": "Coppet Distribution"
        },
        {
            "Zip": 1297,
            "Location": "Founex"
        },
        {
            "Zip": 1298,
            "Location": "Céligny"
        },
        {
            "Zip": 1299,
            "Location": "Crans-près-Céligny"
        },
        {
            "Zip": 1300,
            "Location": "Eclépens AVJ"
        },
        {
            "Zip": 1300,
            "Location": "Eclépens CC AP"
        },
        {
            "Zip": 1300,
            "Location": "Eclépens CC Dépôt"
        },
        {
            "Zip": 1300,
            "Location": "Eclépens Centre Courrier"
        },
        {
            "Zip": 1300,
            "Location": "Eclépens Clinique"
        },
        {
            "Zip": 1300,
            "Location": "Eclépens SAB"
        },
        {
            "Zip": 1302,
            "Location": "Vufflens-la-Ville"
        },
        {
            "Zip": 1303,
            "Location": "Penthaz"
        },
        {
            "Zip": 1304,
            "Location": "Allens"
        },
        {
            "Zip": 1304,
            "Location": "Cossonay-Ville"
        },
        {
            "Zip": 1304,
            "Location": "Dizy"
        },
        {
            "Zip": 1304,
            "Location": "Senarclens"
        },
        {
            "Zip": 1305,
            "Location": "Penthalaz"
        },
        {
            "Zip": 1305,
            "Location": "Penthalaz Distribution"
        },
        {
            "Zip": 1306,
            "Location": "Daillens"
        },
        {
            "Zip": 1307,
            "Location": "Lussery-Villars"
        },
        {
            "Zip": 1308,
            "Location": "La Chaux (Cossonay)"
        },
        {
            "Zip": 1310,
            "Location": "Daillens Centre Colis"
        },
        {
            "Zip": 1310,
            "Location": "Daillens Dist Ba"
        },
        {
            "Zip": 1310,
            "Location": "Daillens PL3"
        },
        {
            "Zip": 1311,
            "Location": "Eclépens Scanning-Center"
        },
        {
            "Zip": 1312,
            "Location": "Eclépens"
        },
        {
            "Zip": 1313,
            "Location": "Ferreyres"
        },
        {
            "Zip": 1315,
            "Location": "La Sarraz"
        },
        {
            "Zip": 1316,
            "Location": "Chevilly"
        },
        {
            "Zip": 1317,
            "Location": "Orny"
        },
        {
            "Zip": 1318,
            "Location": "Pompaples"
        },
        {
            "Zip": 1320,
            "Location": "Daillens ST PP 1"
        },
        {
            "Zip": 1321,
            "Location": "Arnex-sur-Orbe"
        },
        {
            "Zip": 1322,
            "Location": "Croy"
        },
        {
            "Zip": 1323,
            "Location": "Romainmôtier"
        },
        {
            "Zip": 1324,
            "Location": "Premier"
        },
        {
            "Zip": 1325,
            "Location": "Vaulion"
        },
        {
            "Zip": 1326,
            "Location": "Juriens"
        },
        {
            "Zip": 1329,
            "Location": "Bretonnières"
        },
        {
            "Zip": 1330,
            "Location": "Daillens CALL"
        },
        {
            "Zip": 1337,
            "Location": "Vallorbe"
        },
        {
            "Zip": 1338,
            "Location": "Ballaigues"
        },
        {
            "Zip": 1341,
            "Location": "L'Orient"
        },
        {
            "Zip": 1342,
            "Location": "Le Pont"
        },
        {
            "Zip": 1343,
            "Location": "Les Charbonnières"
        },
        {
            "Zip": 1344,
            "Location": "L'Abbaye"
        },
        {
            "Zip": 1345,
            "Location": "Le Lieu"
        },
        {
            "Zip": 1345,
            "Location": "Le Séchey"
        },
        {
            "Zip": 1346,
            "Location": "Les Bioux"
        },
        {
            "Zip": 1347,
            "Location": "Le Sentier"
        },
        {
            "Zip": 1347,
            "Location": "Le Sentier Distribution"
        },
        {
            "Zip": 1347,
            "Location": "Le Solliat"
        },
        {
            "Zip": 1348,
            "Location": "Le Brassus"
        },
        {
            "Zip": 1350,
            "Location": "Orbe"
        },
        {
            "Zip": 1350,
            "Location": "Orbe Distribution"
        },
        {
            "Zip": 1352,
            "Location": "Agiez"
        },
        {
            "Zip": 1353,
            "Location": "Bofflens"
        },
        {
            "Zip": 1354,
            "Location": "Montcherand"
        },
        {
            "Zip": 1355,
            "Location": "L'Abergement"
        },
        {
            "Zip": 1355,
            "Location": "Sergey"
        },
        {
            "Zip": 1356,
            "Location": "La Russille"
        },
        {
            "Zip": 1356,
            "Location": "Les Clées"
        },
        {
            "Zip": 1357,
            "Location": "Lignerolle"
        },
        {
            "Zip": 1358,
            "Location": "Valeyres-sous-Rances"
        },
        {
            "Zip": 1372,
            "Location": "Bavois"
        },
        {
            "Zip": 1373,
            "Location": "Chavornay"
        },
        {
            "Zip": 1374,
            "Location": "Corcelles-sur-Chavornay"
        },
        {
            "Zip": 1375,
            "Location": "Penthéréaz"
        },
        {
            "Zip": 1376,
            "Location": "Eclagnens"
        },
        {
            "Zip": 1376,
            "Location": "Goumoens-la-Ville"
        },
        {
            "Zip": 1376,
            "Location": "Goumoens-le-Jux"
        },
        {
            "Zip": 1377,
            "Location": "Oulens-sous-Echallens"
        },
        {
            "Zip": 1400,
            "Location": "Cheseaux-Noréaz"
        },
        {
            "Zip": 1400,
            "Location": "Yverdon 2"
        },
        {
            "Zip": 1400,
            "Location": "Yverdon car postal VD-Broye"
        },
        {
            "Zip": 1400,
            "Location": "Yverdon Caserne"
        },
        {
            "Zip": 1400,
            "Location": "Yverdon Distribution"
        },
        {
            "Zip": 1400,
            "Location": "Yverdon La Villette"
        },
        {
            "Zip": 1400,
            "Location": "Yverdon-les-Bains"
        },
        {
            "Zip": 1400,
            "Location": "Yverdon-les-Bains 1"
        },
        {
            "Zip": 1401,
            "Location": "Yverdon Conseil et vente"
        },
        {
            "Zip": 1401,
            "Location": "Yverdon-les-Bains"
        },
        {
            "Zip": 1404,
            "Location": "Cuarny"
        },
        {
            "Zip": 1404,
            "Location": "Villars-Epeney"
        },
        {
            "Zip": 1405,
            "Location": "Pomy"
        },
        {
            "Zip": 1406,
            "Location": "Cronay"
        },
        {
            "Zip": 1407,
            "Location": "Bioley-Magnoux"
        },
        {
            "Zip": 1407,
            "Location": "Donneloye"
        },
        {
            "Zip": 1407,
            "Location": "Gossens"
        },
        {
            "Zip": 1407,
            "Location": "Mézery-près-Donneloye"
        },
        {
            "Zip": 1408,
            "Location": "Prahins"
        },
        {
            "Zip": 1409,
            "Location": "Chanéaz"
        },
        {
            "Zip": 1410,
            "Location": "Correvon"
        },
        {
            "Zip": 1410,
            "Location": "Denezy"
        },
        {
            "Zip": 1410,
            "Location": "Prévondavaux"
        },
        {
            "Zip": 1410,
            "Location": "St-Cierges"
        },
        {
            "Zip": 1410,
            "Location": "Thierrens"
        },
        {
            "Zip": 1412,
            "Location": "Ursins"
        },
        {
            "Zip": 1412,
            "Location": "Valeyres-sous-Ursins"
        },
        {
            "Zip": 1413,
            "Location": "Orzens"
        },
        {
            "Zip": 1415,
            "Location": "Démoret"
        },
        {
            "Zip": 1415,
            "Location": "Molondin"
        },
        {
            "Zip": 1416,
            "Location": "Pailly"
        },
        {
            "Zip": 1417,
            "Location": "Epautheyres"
        },
        {
            "Zip": 1417,
            "Location": "Essertines-sur-Yverdon"
        },
        {
            "Zip": 1418,
            "Location": "Vuarrens"
        },
        {
            "Zip": 1420,
            "Location": "Fiez"
        },
        {
            "Zip": 1421,
            "Location": "Fontaines-sur-Grandson"
        },
        {
            "Zip": 1421,
            "Location": "Grandevent"
        },
        {
            "Zip": 1422,
            "Location": "Grandson"
        },
        {
            "Zip": 1423,
            "Location": "Fontanezier"
        },
        {
            "Zip": 1423,
            "Location": "Romairon"
        },
        {
            "Zip": 1423,
            "Location": "Vaugondry"
        },
        {
            "Zip": 1423,
            "Location": "Villars-Burquin"
        },
        {
            "Zip": 1424,
            "Location": "Champagne"
        },
        {
            "Zip": 1425,
            "Location": "Onnens VD"
        },
        {
            "Zip": 1426,
            "Location": "Concise"
        },
        {
            "Zip": 1426,
            "Location": "Corcelles-près-Concise"
        },
        {
            "Zip": 1427,
            "Location": "Bonvillars"
        },
        {
            "Zip": 1428,
            "Location": "Mutrux"
        },
        {
            "Zip": 1428,
            "Location": "Provence"
        },
        {
            "Zip": 1429,
            "Location": "Giez"
        },
        {
            "Zip": 1430,
            "Location": "Orges"
        },
        {
            "Zip": 1431,
            "Location": "Novalles"
        },
        {
            "Zip": 1431,
            "Location": "Vugelles-La Mothe"
        },
        {
            "Zip": 1432,
            "Location": "Belmont-sur-Yverdon"
        },
        {
            "Zip": 1432,
            "Location": "Gressy"
        },
        {
            "Zip": 1433,
            "Location": "Suchy"
        },
        {
            "Zip": 1434,
            "Location": "Ependes VD"
        },
        {
            "Zip": 1435,
            "Location": "Essert-Pittet"
        },
        {
            "Zip": 1436,
            "Location": "Chamblon"
        },
        {
            "Zip": 1436,
            "Location": "Treycovagnes"
        },
        {
            "Zip": 1437,
            "Location": "Suscévaz"
        },
        {
            "Zip": 1438,
            "Location": "Mathod"
        },
        {
            "Zip": 1439,
            "Location": "Rances"
        },
        {
            "Zip": 1440,
            "Location": "Montagny-Chamard"
        },
        {
            "Zip": 1441,
            "Location": "Valeyres-sous-Montagny"
        },
        {
            "Zip": 1442,
            "Location": "Montagny-près-Yverdon"
        },
        {
            "Zip": 1443,
            "Location": "Champvent"
        },
        {
            "Zip": 1443,
            "Location": "Essert-sous-Champvent"
        },
        {
            "Zip": 1443,
            "Location": "Villars-sous-Champvent"
        },
        {
            "Zip": 1445,
            "Location": "Vuiteboeuf"
        },
        {
            "Zip": 1446,
            "Location": "Baulmes"
        },
        {
            "Zip": 1450,
            "Location": "La Sagne (Ste-Croix)"
        },
        {
            "Zip": 1450,
            "Location": "Le Château-de-Ste-Croix"
        },
        {
            "Zip": 1450,
            "Location": "Ste-Croix"
        },
        {
            "Zip": 1450,
            "Location": "Ste-Croix Distribution"
        },
        {
            "Zip": 1452,
            "Location": "Les Rasses"
        },
        {
            "Zip": 1453,
            "Location": "Bullet"
        },
        {
            "Zip": 1453,
            "Location": "Mauborget"
        },
        {
            "Zip": 1454,
            "Location": "La Vraconnaz"
        },
        {
            "Zip": 1454,
            "Location": "L'Auberson"
        },
        {
            "Zip": 1462,
            "Location": "Yvonand"
        },
        {
            "Zip": 1463,
            "Location": "Rovray"
        },
        {
            "Zip": 1464,
            "Location": "Chavannes-le-Chêne"
        },
        {
            "Zip": 1464,
            "Location": "Chêne-Pâquier"
        },
        {
            "Zip": 1468,
            "Location": "Cheyres"
        },
        {
            "Zip": 1470,
            "Location": "Bollion"
        },
        {
            "Zip": 1470,
            "Location": "Estavayer-le-Lac"
        },
        {
            "Zip": 1470,
            "Location": "Lully FR"
        },
        {
            "Zip": 1470,
            "Location": "Seiry"
        },
        {
            "Zip": 1473,
            "Location": "Châtillon FR"
        },
        {
            "Zip": 1473,
            "Location": "Font"
        },
        {
            "Zip": 1474,
            "Location": "Châbles FR"
        },
        {
            "Zip": 1475,
            "Location": "Autavaux"
        },
        {
            "Zip": 1475,
            "Location": "Forel FR"
        },
        {
            "Zip": 1475,
            "Location": "Montbrelloz"
        },
        {
            "Zip": 1482,
            "Location": "Cugy FR"
        },
        {
            "Zip": 1483,
            "Location": "Frasses"
        },
        {
            "Zip": 1483,
            "Location": "Montet (Broye)"
        },
        {
            "Zip": 1483,
            "Location": "Vesin"
        },
        {
            "Zip": 1484,
            "Location": "Aumont"
        },
        {
            "Zip": 1484,
            "Location": "Granges-de-Vesin"
        },
        {
            "Zip": 1485,
            "Location": "Nuvilly"
        },
        {
            "Zip": 1486,
            "Location": "Vuissens"
        },
        {
            "Zip": 1489,
            "Location": "Murist"
        },
        {
            "Zip": 1509,
            "Location": "Vucherens"
        },
        {
            "Zip": 1510,
            "Location": "Moudon"
        },
        {
            "Zip": 1510,
            "Location": "Moudon Caserne"
        },
        {
            "Zip": 1510,
            "Location": "Moudon Distribution"
        },
        {
            "Zip": 1510,
            "Location": "Syens"
        },
        {
            "Zip": 1512,
            "Location": "Chavannes-sur-Moudon"
        },
        {
            "Zip": 1513,
            "Location": "Hermenches"
        },
        {
            "Zip": 1513,
            "Location": "Rossenges"
        },
        {
            "Zip": 1514,
            "Location": "Bussy-sur-Moudon"
        },
        {
            "Zip": 1515,
            "Location": "Neyruz-sur-Moudon"
        },
        {
            "Zip": 1515,
            "Location": "Villars-le-Comte"
        },
        {
            "Zip": 1521,
            "Location": "Curtilles"
        },
        {
            "Zip": 1522,
            "Location": "Lucens"
        },
        {
            "Zip": 1522,
            "Location": "Oulens-sur-Lucens"
        },
        {
            "Zip": 1523,
            "Location": "Granges-près-Marnand"
        },
        {
            "Zip": 1524,
            "Location": "Marnand"
        },
        {
            "Zip": 1525,
            "Location": "Henniez"
        },
        {
            "Zip": 1525,
            "Location": "Seigneux"
        },
        {
            "Zip": 1526,
            "Location": "Cremin"
        },
        {
            "Zip": 1526,
            "Location": "Forel-sur-Lucens"
        },
        {
            "Zip": 1527,
            "Location": "Villeneuve FR"
        },
        {
            "Zip": 1528,
            "Location": "Praratoud"
        },
        {
            "Zip": 1528,
            "Location": "Surpierre"
        },
        {
            "Zip": 1529,
            "Location": "Cheiry"
        },
        {
            "Zip": 1530,
            "Location": "Payerne"
        },
        {
            "Zip": 1530,
            "Location": "Payerne Caserne"
        },
        {
            "Zip": 1530,
            "Location": "Payerne Distribution"
        },
        {
            "Zip": 1532,
            "Location": "Fétigny"
        },
        {
            "Zip": 1532,
            "Location": "Fétigny Dist Fil"
        },
        {
            "Zip": 1532,
            "Location": "Fétigny PL3"
        },
        {
            "Zip": 1533,
            "Location": "Ménières"
        },
        {
            "Zip": 1534,
            "Location": "Chapelle (Broye)"
        },
        {
            "Zip": 1534,
            "Location": "Sassel"
        },
        {
            "Zip": 1535,
            "Location": "Combremont-le-Grand"
        },
        {
            "Zip": 1536,
            "Location": "Combremont-le-Petit"
        },
        {
            "Zip": 1537,
            "Location": "Champtauroz"
        },
        {
            "Zip": 1538,
            "Location": "Treytorrens (Payerne)"
        },
        {
            "Zip": 1541,
            "Location": "Bussy FR"
        },
        {
            "Zip": 1541,
            "Location": "Morens FR"
        },
        {
            "Zip": 1541,
            "Location": "Sévaz"
        },
        {
            "Zip": 1542,
            "Location": "Rueyres-les-Prés"
        },
        {
            "Zip": 1543,
            "Location": "Grandcour"
        },
        {
            "Zip": 1544,
            "Location": "Gletterens"
        },
        {
            "Zip": 1545,
            "Location": "Chevroux"
        },
        {
            "Zip": 1551,
            "Location": "Vers-chez-Perrin"
        },
        {
            "Zip": 1552,
            "Location": "Trey"
        },
        {
            "Zip": 1553,
            "Location": "Châtonnaye"
        },
        {
            "Zip": 1554,
            "Location": "Rossens VD"
        },
        {
            "Zip": 1554,
            "Location": "Sédeilles"
        },
        {
            "Zip": 1555,
            "Location": "Villarzel"
        },
        {
            "Zip": 1562,
            "Location": "Corcelles-près-Payerne"
        },
        {
            "Zip": 1563,
            "Location": "Dompierre FR"
        },
        {
            "Zip": 1564,
            "Location": "Domdidier"
        },
        {
            "Zip": 1565,
            "Location": "Missy"
        },
        {
            "Zip": 1565,
            "Location": "Vallon"
        },
        {
            "Zip": 1566,
            "Location": "Les Friques"
        },
        {
            "Zip": 1566,
            "Location": "St-Aubin FR"
        },
        {
            "Zip": 1567,
            "Location": "Delley"
        },
        {
            "Zip": 1568,
            "Location": "Portalban"
        },
        {
            "Zip": 1580,
            "Location": "Avenches"
        },
        {
            "Zip": 1580,
            "Location": "Avenches Distribution"
        },
        {
            "Zip": 1580,
            "Location": "Donatyre"
        },
        {
            "Zip": 1580,
            "Location": "Oleyres"
        },
        {
            "Zip": 1583,
            "Location": "Villarepos"
        },
        {
            "Zip": 1584,
            "Location": "Villars-le-Grand"
        },
        {
            "Zip": 1585,
            "Location": "Bellerive VD"
        },
        {
            "Zip": 1585,
            "Location": "Cotterd"
        },
        {
            "Zip": 1585,
            "Location": "Salavaux"
        },
        {
            "Zip": 1586,
            "Location": "Vallamand"
        },
        {
            "Zip": 1587,
            "Location": "Constantine"
        },
        {
            "Zip": 1587,
            "Location": "Montmagny"
        },
        {
            "Zip": 1588,
            "Location": "Cudrefin"
        },
        {
            "Zip": 1589,
            "Location": "Chabrey"
        },
        {
            "Zip": 1595,
            "Location": "Clavaleyres"
        },
        {
            "Zip": 1595,
            "Location": "Faoug"
        },
        {
            "Zip": 1607,
            "Location": "Les Tavernes"
        },
        {
            "Zip": 1607,
            "Location": "Les Thioleyres"
        },
        {
            "Zip": 1607,
            "Location": "Palézieux"
        },
        {
            "Zip": 1607,
            "Location": "Palézieux Distribution"
        },
        {
            "Zip": 1607,
            "Location": "Palézieux-Village"
        },
        {
            "Zip": 1608,
            "Location": "Bussigny-sur-Oron"
        },
        {
            "Zip": 1608,
            "Location": "Chapelle (Glâne)"
        },
        {
            "Zip": 1608,
            "Location": "Chesalles-sur-Oron"
        },
        {
            "Zip": 1608,
            "Location": "Oron-le-Châtel"
        },
        {
            "Zip": 1609,
            "Location": "Besencens"
        },
        {
            "Zip": 1609,
            "Location": "Fiaugères"
        },
        {
            "Zip": 1609,
            "Location": "St-Martin FR"
        },
        {
            "Zip": 1610,
            "Location": "Châtillens"
        },
        {
            "Zip": 1610,
            "Location": "Oron-la-Ville"
        },
        {
            "Zip": 1610,
            "Location": "Vuibroye"
        },
        {
            "Zip": 1611,
            "Location": "Le Crêt-près-Semsales"
        },
        {
            "Zip": 1612,
            "Location": "Ecoteaux"
        },
        {
            "Zip": 1613,
            "Location": "Maracon"
        },
        {
            "Zip": 1614,
            "Location": "Granges (Veveyse)"
        },
        {
            "Zip": 1615,
            "Location": "Bossonnens"
        },
        {
            "Zip": 1616,
            "Location": "Attalens"
        },
        {
            "Zip": 1617,
            "Location": "Remaufens"
        },
        {
            "Zip": 1617,
            "Location": "Tatroz"
        },
        {
            "Zip": 1618,
            "Location": "Châtel-St-Denis"
        },
        {
            "Zip": 1618,
            "Location": "Châtel-St-Denis Dist"
        },
        {
            "Zip": 1619,
            "Location": "Les Paccots"
        },
        {
            "Zip": 1623,
            "Location": "Semsales"
        },
        {
            "Zip": 1624,
            "Location": "Grattavache"
        },
        {
            "Zip": 1624,
            "Location": "La Verrerie"
        },
        {
            "Zip": 1624,
            "Location": "Progens"
        },
        {
            "Zip": 1625,
            "Location": "Maules"
        },
        {
            "Zip": 1625,
            "Location": "Sâles (Gruyère)"
        },
        {
            "Zip": 1626,
            "Location": "Romanens"
        },
        {
            "Zip": 1626,
            "Location": "Rueyres-Treyfayes"
        },
        {
            "Zip": 1626,
            "Location": "Treyfayes"
        },
        {
            "Zip": 1627,
            "Location": "Vaulruz"
        },
        {
            "Zip": 1628,
            "Location": "Vuadens"
        },
        {
            "Zip": 1630,
            "Location": "Bulle"
        },
        {
            "Zip": 1630,
            "Location": "Bulle 1"
        },
        {
            "Zip": 1630,
            "Location": "Bulle 1 Distribution"
        },
        {
            "Zip": 1630,
            "Location": "Bulle 2"
        },
        {
            "Zip": 1630,
            "Location": "Bulle Dist Fil"
        },
        {
            "Zip": 1630,
            "Location": "Bulle rue du Moulin"
        },
        {
            "Zip": 1631,
            "Location": "Bulle centre de traitement"
        },
        {
            "Zip": 1632,
            "Location": "Riaz"
        },
        {
            "Zip": 1633,
            "Location": "Marsens"
        },
        {
            "Zip": 1633,
            "Location": "Vuippens"
        },
        {
            "Zip": 1634,
            "Location": "La Roche FR"
        },
        {
            "Zip": 1635,
            "Location": "La Tour-de-Trême"
        },
        {
            "Zip": 1636,
            "Location": "Broc"
        },
        {
            "Zip": 1637,
            "Location": "Charmey (Gruyère)"
        },
        {
            "Zip": 1638,
            "Location": "Morlon"
        },
        {
            "Zip": 1642,
            "Location": "Sorens"
        },
        {
            "Zip": 1643,
            "Location": "Gumefens"
        },
        {
            "Zip": 1644,
            "Location": "Avry-devant-Pont"
        },
        {
            "Zip": 1645,
            "Location": "Le Bry"
        },
        {
            "Zip": 1646,
            "Location": "Echarlens"
        },
        {
            "Zip": 1647,
            "Location": "Corbières"
        },
        {
            "Zip": 1648,
            "Location": "Hauteville"
        },
        {
            "Zip": 1649,
            "Location": "Pont-la-Ville"
        },
        {
            "Zip": 1651,
            "Location": "Villarvolard"
        },
        {
            "Zip": 1652,
            "Location": "Botterens"
        },
        {
            "Zip": 1652,
            "Location": "Villarbeney"
        },
        {
            "Zip": 1653,
            "Location": "Châtel-sur-Montsalvens"
        },
        {
            "Zip": 1653,
            "Location": "Crésuz"
        },
        {
            "Zip": 1654,
            "Location": "Cerniat FR"
        },
        {
            "Zip": 1656,
            "Location": "Im Fang"
        },
        {
            "Zip": 1656,
            "Location": "Jaun"
        },
        {
            "Zip": 1657,
            "Location": "Abländschen"
        },
        {
            "Zip": 1658,
            "Location": "La Tine"
        },
        {
            "Zip": 1658,
            "Location": "Rossinière"
        },
        {
            "Zip": 1659,
            "Location": "Flendruz"
        },
        {
            "Zip": 1659,
            "Location": "Rougemont"
        },
        {
            "Zip": 1660,
            "Location": "Château-d'Oex"
        },
        {
            "Zip": 1660,
            "Location": "La Lécherette"
        },
        {
            "Zip": 1660,
            "Location": "Les Moulins"
        },
        {
            "Zip": 1660,
            "Location": "L'Etivaz"
        },
        {
            "Zip": 1661,
            "Location": "Le Pâquier-Montbarry"
        },
        {
            "Zip": 1663,
            "Location": "Epagny"
        },
        {
            "Zip": 1663,
            "Location": "Gruyères"
        },
        {
            "Zip": 1663,
            "Location": "Gruyères Vieille Ville"
        },
        {
            "Zip": 1663,
            "Location": "Moléson-sur-Gruyères"
        },
        {
            "Zip": 1663,
            "Location": "Pringy"
        },
        {
            "Zip": 1665,
            "Location": "Estavannens"
        },
        {
            "Zip": 1666,
            "Location": "Grandvillard"
        },
        {
            "Zip": 1666,
            "Location": "Villars-sous-Mont"
        },
        {
            "Zip": 1667,
            "Location": "Enney"
        },
        {
            "Zip": 1669,
            "Location": "Albeuve"
        },
        {
            "Zip": 1669,
            "Location": "Les Sciernes-d'Albeuve"
        },
        {
            "Zip": 1669,
            "Location": "Lessoc"
        },
        {
            "Zip": 1669,
            "Location": "Montbovon"
        },
        {
            "Zip": 1669,
            "Location": "Neirivue"
        },
        {
            "Zip": 1670,
            "Location": "Bionnens"
        },
        {
            "Zip": 1670,
            "Location": "Esmonts"
        },
        {
            "Zip": 1670,
            "Location": "Ursy"
        },
        {
            "Zip": 1673,
            "Location": "Auboranges"
        },
        {
            "Zip": 1673,
            "Location": "Ecublens FR"
        },
        {
            "Zip": 1673,
            "Location": "Gillarens"
        },
        {
            "Zip": 1673,
            "Location": "Promasens"
        },
        {
            "Zip": 1673,
            "Location": "Rue"
        },
        {
            "Zip": 1674,
            "Location": "Montet (Glâne)"
        },
        {
            "Zip": 1674,
            "Location": "Morlens"
        },
        {
            "Zip": 1674,
            "Location": "Vuarmarens"
        },
        {
            "Zip": 1675,
            "Location": "Blessens"
        },
        {
            "Zip": 1675,
            "Location": "Mossel"
        },
        {
            "Zip": 1675,
            "Location": "Vauderens"
        },
        {
            "Zip": 1676,
            "Location": "Chavannes-les-Forts"
        },
        {
            "Zip": 1677,
            "Location": "Prez-vers-Siviriez"
        },
        {
            "Zip": 1678,
            "Location": "Siviriez"
        },
        {
            "Zip": 1679,
            "Location": "Villaraboud"
        },
        {
            "Zip": 1680,
            "Location": "Berlens"
        },
        {
            "Zip": 1680,
            "Location": "Romont Caserne"
        },
        {
            "Zip": 1680,
            "Location": "Romont FR"
        },
        {
            "Zip": 1680,
            "Location": "Romont FR Distribution"
        },
        {
            "Zip": 1681,
            "Location": "Billens"
        },
        {
            "Zip": 1681,
            "Location": "Hennens"
        },
        {
            "Zip": 1682,
            "Location": "Cerniaz VD"
        },
        {
            "Zip": 1682,
            "Location": "Dompierre VD"
        },
        {
            "Zip": 1682,
            "Location": "Lovatens"
        },
        {
            "Zip": 1682,
            "Location": "Prévonloup"
        },
        {
            "Zip": 1682,
            "Location": "Villars-Bramard"
        },
        {
            "Zip": 1683,
            "Location": "Brenles"
        },
        {
            "Zip": 1683,
            "Location": "Chesalles-sur-Moudon"
        },
        {
            "Zip": 1683,
            "Location": "Sarzens"
        },
        {
            "Zip": 1684,
            "Location": "Mézières FR"
        },
        {
            "Zip": 1685,
            "Location": "Villariaz"
        },
        {
            "Zip": 1686,
            "Location": "Grangettes-près-Romont"
        },
        {
            "Zip": 1686,
            "Location": "La Neirigue"
        },
        {
            "Zip": 1687,
            "Location": "Estévenens"
        },
        {
            "Zip": 1687,
            "Location": "La Magne"
        },
        {
            "Zip": 1687,
            "Location": "Vuisternens-devant-Romont"
        },
        {
            "Zip": 1688,
            "Location": "Lieffrens"
        },
        {
            "Zip": 1688,
            "Location": "Sommentier"
        },
        {
            "Zip": 1689,
            "Location": "Le Châtelard-près-Romont"
        },
        {
            "Zip": 1690,
            "Location": "Lussy FR"
        },
        {
            "Zip": 1690,
            "Location": "Villaz-St-Pierre"
        },
        {
            "Zip": 1691,
            "Location": "Villarimboud"
        },
        {
            "Zip": 1692,
            "Location": "Massonnens"
        },
        {
            "Zip": 1694,
            "Location": "Chavannes-sous-Orsonnens"
        },
        {
            "Zip": 1694,
            "Location": "Orsonnens"
        },
        {
            "Zip": 1694,
            "Location": "Villargiroud"
        },
        {
            "Zip": 1694,
            "Location": "Villarsiviriaux"
        },
        {
            "Zip": 1695,
            "Location": "Estavayer-le-Gibloux"
        },
        {
            "Zip": 1695,
            "Location": "Rueyres-St-Laurent"
        },
        {
            "Zip": 1695,
            "Location": "Villarlod"
        },
        {
            "Zip": 1695,
            "Location": "Villarsel-le-Gibloux"
        },
        {
            "Zip": 1696,
            "Location": "Vuisternens-en-Ogoz"
        },
        {
            "Zip": 1697,
            "Location": "La Joux FR"
        },
        {
            "Zip": 1697,
            "Location": "Les Ecasseys"
        },
        {
            "Zip": 1699,
            "Location": "Bouloz"
        },
        {
            "Zip": 1699,
            "Location": "Pont (Veveyse)"
        },
        {
            "Zip": 1699,
            "Location": "Porsel"
        },
        {
            "Zip": 1700,
            "Location": "Fribourg"
        },
        {
            "Zip": 1700,
            "Location": "Fribourg 1"
        },
        {
            "Zip": 1700,
            "Location": "Fribourg 1 Dépôt"
        },
        {
            "Zip": 1700,
            "Location": "Fribourg 1 Distribution"
        },
        {
            "Zip": 1700,
            "Location": "Fribourg 5 Pérolles"
        },
        {
            "Zip": 1700,
            "Location": "Fribourg Caserne"
        },
        {
            "Zip": 1700,
            "Location": "Fribourg PostFinance Fil."
        },
        {
            "Zip": 1701,
            "Location": "Fribourg"
        },
        {
            "Zip": 1702,
            "Location": "Fribourg"
        },
        {
            "Zip": 1704,
            "Location": "Fribourg"
        },
        {
            "Zip": 1707,
            "Location": "Fribourg"
        },
        {
            "Zip": 1708,
            "Location": "Fribourg"
        },
        {
            "Zip": 1709,
            "Location": "Fribourg Beaumont"
        },
        {
            "Zip": 1712,
            "Location": "Tafers"
        },
        {
            "Zip": 1713,
            "Location": "St. Antoni"
        },
        {
            "Zip": 1714,
            "Location": "Heitenried"
        },
        {
            "Zip": 1715,
            "Location": "Alterswil FR"
        },
        {
            "Zip": 1716,
            "Location": "Oberschrot"
        },
        {
            "Zip": 1716,
            "Location": "Plaffeien"
        },
        {
            "Zip": 1716,
            "Location": "Schwarzsee"
        },
        {
            "Zip": 1717,
            "Location": "St. Ursen"
        },
        {
            "Zip": 1718,
            "Location": "Rechthalten"
        },
        {
            "Zip": 1719,
            "Location": "Brünisried"
        },
        {
            "Zip": 1719,
            "Location": "Zumholz"
        },
        {
            "Zip": 1720,
            "Location": "Chésopelloz"
        },
        {
            "Zip": 1720,
            "Location": "Corminboeuf"
        },
        {
            "Zip": 1721,
            "Location": "Cormérod"
        },
        {
            "Zip": 1721,
            "Location": "Cournillens"
        },
        {
            "Zip": 1721,
            "Location": "Courtion"
        },
        {
            "Zip": 1721,
            "Location": "Misery"
        },
        {
            "Zip": 1721,
            "Location": "Misery-Courtion"
        },
        {
            "Zip": 1722,
            "Location": "Bourguillon"
        },
        {
            "Zip": 1723,
            "Location": "Marly"
        },
        {
            "Zip": 1723,
            "Location": "Marly 1"
        },
        {
            "Zip": 1723,
            "Location": "Marly Grand Pré"
        },
        {
            "Zip": 1723,
            "Location": "Pierrafortscha"
        },
        {
            "Zip": 1723,
            "Location": "Villarsel-sur-Marly"
        },
        {
            "Zip": 1724,
            "Location": "Bonnefontaine"
        },
        {
            "Zip": 1724,
            "Location": "Essert FR"
        },
        {
            "Zip": 1724,
            "Location": "Ferpicloz"
        },
        {
            "Zip": 1724,
            "Location": "Le Mouret"
        },
        {
            "Zip": 1724,
            "Location": "Montévraz"
        },
        {
            "Zip": 1724,
            "Location": "Oberried FR"
        },
        {
            "Zip": 1724,
            "Location": "Senèdes"
        },
        {
            "Zip": 1724,
            "Location": "Zénauva"
        },
        {
            "Zip": 1725,
            "Location": "Posieux"
        },
        {
            "Zip": 1726,
            "Location": "Farvagny-le-Grand"
        },
        {
            "Zip": 1726,
            "Location": "Farvagny-le-Petit"
        },
        {
            "Zip": 1726,
            "Location": "Grenilles"
        },
        {
            "Zip": 1726,
            "Location": "Posat"
        },
        {
            "Zip": 1727,
            "Location": "Corpataux"
        },
        {
            "Zip": 1727,
            "Location": "Magnedens"
        },
        {
            "Zip": 1728,
            "Location": "Rossens FR"
        },
        {
            "Zip": 1730,
            "Location": "Ecuvillens"
        },
        {
            "Zip": 1731,
            "Location": "Ependes FR"
        },
        {
            "Zip": 1732,
            "Location": "Arconciel"
        },
        {
            "Zip": 1733,
            "Location": "Treyvaux"
        },
        {
            "Zip": 1734,
            "Location": "Tentlingen"
        },
        {
            "Zip": 1735,
            "Location": "Giffers"
        },
        {
            "Zip": 1736,
            "Location": "St. Silvester"
        },
        {
            "Zip": 1737,
            "Location": "Plasselb"
        },
        {
            "Zip": 1738,
            "Location": "Sangernboden"
        },
        {
            "Zip": 1740,
            "Location": "Neyruz FR"
        },
        {
            "Zip": 1741,
            "Location": "Cottens FR"
        },
        {
            "Zip": 1742,
            "Location": "Autigny"
        },
        {
            "Zip": 1744,
            "Location": "Chénens"
        },
        {
            "Zip": 1745,
            "Location": "Lentigny"
        },
        {
            "Zip": 1746,
            "Location": "Prez-vers-Noréaz"
        },
        {
            "Zip": 1747,
            "Location": "Corserey"
        },
        {
            "Zip": 1748,
            "Location": "Torny-le-Grand"
        },
        {
            "Zip": 1749,
            "Location": "Middes"
        },
        {
            "Zip": 1752,
            "Location": "Villars-sur-Glâne"
        },
        {
            "Zip": 1752,
            "Location": "Villars-sur-Glâne 1"
        },
        {
            "Zip": 1752,
            "Location": "Villars-sur-Glâne Dailles"
        },
        {
            "Zip": 1753,
            "Location": "Matran"
        },
        {
            "Zip": 1754,
            "Location": "Avry-Centre FR"
        },
        {
            "Zip": 1754,
            "Location": "Avry-sur-Matran"
        },
        {
            "Zip": 1754,
            "Location": "Corjolens"
        },
        {
            "Zip": 1756,
            "Location": "Lovens"
        },
        {
            "Zip": 1756,
            "Location": "Onnens FR"
        },
        {
            "Zip": 1757,
            "Location": "Noréaz"
        },
        {
            "Zip": 1762,
            "Location": "Givisiez"
        },
        {
            "Zip": 1762,
            "Location": "Givisiez DB AFP"
        },
        {
            "Zip": 1762,
            "Location": "Givisiez Dist Ba"
        },
        {
            "Zip": 1763,
            "Location": "Granges-Paccot"
        },
        {
            "Zip": 1772,
            "Location": "Grolley"
        },
        {
            "Zip": 1772,
            "Location": "Nierlet-les-Bois"
        },
        {
            "Zip": 1772,
            "Location": "Ponthaux"
        },
        {
            "Zip": 1773,
            "Location": "Chandon"
        },
        {
            "Zip": 1773,
            "Location": "Léchelles"
        },
        {
            "Zip": 1773,
            "Location": "Russy"
        },
        {
            "Zip": 1774,
            "Location": "Cousset"
        },
        {
            "Zip": 1774,
            "Location": "Montagny-les-Monts"
        },
        {
            "Zip": 1775,
            "Location": "Grandsivaz"
        },
        {
            "Zip": 1775,
            "Location": "Mannens"
        },
        {
            "Zip": 1776,
            "Location": "Montagny-la-Ville"
        },
        {
            "Zip": 1782,
            "Location": "Autafond"
        },
        {
            "Zip": 1782,
            "Location": "Belfaux"
        },
        {
            "Zip": 1782,
            "Location": "Cormagens"
        },
        {
            "Zip": 1782,
            "Location": "Formangueires"
        },
        {
            "Zip": 1782,
            "Location": "La Corbaz"
        },
        {
            "Zip": 1782,
            "Location": "Lossy"
        },
        {
            "Zip": 1783,
            "Location": "Barberêche"
        },
        {
            "Zip": 1783,
            "Location": "Pensier"
        },
        {
            "Zip": 1784,
            "Location": "Courtepin"
        },
        {
            "Zip": 1784,
            "Location": "Wallenried"
        },
        {
            "Zip": 1785,
            "Location": "Cressier FR"
        },
        {
            "Zip": 1786,
            "Location": "Sugiez"
        },
        {
            "Zip": 1787,
            "Location": "Môtier (Vully)"
        },
        {
            "Zip": 1787,
            "Location": "Mur (Vully) FR"
        },
        {
            "Zip": 1787,
            "Location": "Mur (Vully) VD"
        },
        {
            "Zip": 1788,
            "Location": "Praz (Vully)"
        },
        {
            "Zip": 1789,
            "Location": "Lugnorre"
        },
        {
            "Zip": 1791,
            "Location": "Courtaman"
        },
        {
            "Zip": 1792,
            "Location": "Cordast"
        },
        {
            "Zip": 1792,
            "Location": "Guschelmuth"
        },
        {
            "Zip": 1793,
            "Location": "Jeuss"
        },
        {
            "Zip": 1794,
            "Location": "Salvenach"
        },
        {
            "Zip": 1795,
            "Location": "Courlevon"
        },
        {
            "Zip": 1796,
            "Location": "Courgevaux"
        },
        {
            "Zip": 1797,
            "Location": "Münchenwiler"
        },
        {
            "Zip": 1800,
            "Location": "Vevey"
        },
        {
            "Zip": 1800,
            "Location": "Vevey 1"
        },
        {
            "Zip": 1800,
            "Location": "Vevey 1 Distribution"
        },
        {
            "Zip": 1800,
            "Location": "Vevey Orient"
        },
        {
            "Zip": 1801,
            "Location": "Le Mont-Pèlerin"
        },
        {
            "Zip": 1802,
            "Location": "Corseaux"
        },
        {
            "Zip": 1803,
            "Location": "Chardonne"
        },
        {
            "Zip": 1804,
            "Location": "Corsier-sur-Vevey"
        },
        {
            "Zip": 1805,
            "Location": "Jongny"
        },
        {
            "Zip": 1806,
            "Location": "St-Légier\\Blonay Dist"
        },
        {
            "Zip": 1806,
            "Location": "St-Légier-La Chiésaz"
        },
        {
            "Zip": 1807,
            "Location": "Blonay"
        },
        {
            "Zip": 1808,
            "Location": "Les Monts-de-Corsier"
        },
        {
            "Zip": 1809,
            "Location": "Fenil-sur-Corsier"
        },
        {
            "Zip": 1811,
            "Location": "Vevey Services spéciaux"
        },
        {
            "Zip": 1814,
            "Location": "La Tour-de-Peilz"
        },
        {
            "Zip": 1815,
            "Location": "Clarens"
        },
        {
            "Zip": 1816,
            "Location": "Chailly-Montreux"
        },
        {
            "Zip": 1816,
            "Location": "Chailly-Montreux Dist"
        },
        {
            "Zip": 1817,
            "Location": "Brent"
        },
        {
            "Zip": 1818,
            "Location": "Montreux La Redoute"
        },
        {
            "Zip": 1820,
            "Location": "Montreux"
        },
        {
            "Zip": 1820,
            "Location": "Montreux 1"
        },
        {
            "Zip": 1820,
            "Location": "Montreux 1 Distribution"
        },
        {
            "Zip": 1820,
            "Location": "Montreux 2"
        },
        {
            "Zip": 1820,
            "Location": "Territet"
        },
        {
            "Zip": 1820,
            "Location": "Veytaux"
        },
        {
            "Zip": 1822,
            "Location": "Chernex"
        },
        {
            "Zip": 1823,
            "Location": "Glion"
        },
        {
            "Zip": 1824,
            "Location": "Caux"
        },
        {
            "Zip": 1832,
            "Location": "Chamby"
        },
        {
            "Zip": 1832,
            "Location": "Villard-sur-Chamby"
        },
        {
            "Zip": 1833,
            "Location": "Les Avants"
        },
        {
            "Zip": 1844,
            "Location": "Villeneuve VD"
        },
        {
            "Zip": 1845,
            "Location": "Noville"
        },
        {
            "Zip": 1846,
            "Location": "Chessel"
        },
        {
            "Zip": 1847,
            "Location": "Rennaz"
        },
        {
            "Zip": 1852,
            "Location": "Roche VD"
        },
        {
            "Zip": 1853,
            "Location": "Yvorne"
        },
        {
            "Zip": 1854,
            "Location": "Leysin"
        },
        {
            "Zip": 1854,
            "Location": "Leysin Distribution"
        },
        {
            "Zip": 1856,
            "Location": "Corbeyrier"
        },
        {
            "Zip": 1860,
            "Location": "Aigle"
        },
        {
            "Zip": 1860,
            "Location": "Aigle Distribution"
        },
        {
            "Zip": 1862,
            "Location": "La Comballaz"
        },
        {
            "Zip": 1862,
            "Location": "Les Mosses"
        },
        {
            "Zip": 1863,
            "Location": "Le Sépey"
        },
        {
            "Zip": 1864,
            "Location": "Vers-l'Eglise"
        },
        {
            "Zip": 1865,
            "Location": "Les Diablerets"
        },
        {
            "Zip": 1866,
            "Location": "La Forclaz VD"
        },
        {
            "Zip": 1867,
            "Location": "Ollon VD"
        },
        {
            "Zip": 1867,
            "Location": "Panex"
        },
        {
            "Zip": 1867,
            "Location": "St-Triphon"
        },
        {
            "Zip": 1868,
            "Location": "Collombey"
        },
        {
            "Zip": 1869,
            "Location": "Massongex"
        },
        {
            "Zip": 1870,
            "Location": "Monthey"
        },
        {
            "Zip": 1870,
            "Location": "Monthey 1"
        },
        {
            "Zip": 1870,
            "Location": "Monthey 1 Distribution"
        },
        {
            "Zip": 1870,
            "Location": "Monthey 2"
        },
        {
            "Zip": 1870,
            "Location": "Monthey Avenue de la gare"
        },
        {
            "Zip": 1871,
            "Location": "Choëx"
        },
        {
            "Zip": 1871,
            "Location": "Les Giettes"
        },
        {
            "Zip": 1872,
            "Location": "Troistorrents"
        },
        {
            "Zip": 1873,
            "Location": "Champoussin"
        },
        {
            "Zip": 1873,
            "Location": "Les Crosets"
        },
        {
            "Zip": 1873,
            "Location": "Val-d'Illiez"
        },
        {
            "Zip": 1874,
            "Location": "Champéry"
        },
        {
            "Zip": 1875,
            "Location": "Morgins"
        },
        {
            "Zip": 1880,
            "Location": "Bex"
        },
        {
            "Zip": 1880,
            "Location": "Bex Dist Fil"
        },
        {
            "Zip": 1880,
            "Location": "Bex Distribution"
        },
        {
            "Zip": 1880,
            "Location": "Fenalet-sur-Bex"
        },
        {
            "Zip": 1880,
            "Location": "Frenières-sur-Bex"
        },
        {
            "Zip": 1880,
            "Location": "Les Plans-sur-Bex"
        },
        {
            "Zip": 1880,
            "Location": "Les Posses-sur-Bex"
        },
        {
            "Zip": 1882,
            "Location": "Gryon"
        },
        {
            "Zip": 1884,
            "Location": "Arveyes"
        },
        {
            "Zip": 1884,
            "Location": "Huémoz"
        },
        {
            "Zip": 1884,
            "Location": "Villars-sur-Ollon"
        },
        {
            "Zip": 1885,
            "Location": "Chesières"
        },
        {
            "Zip": 1890,
            "Location": "Mex VS"
        },
        {
            "Zip": 1890,
            "Location": "St-Maurice"
        },
        {
            "Zip": 1890,
            "Location": "St-Maurice Caserne"
        },
        {
            "Zip": 1891,
            "Location": "Vérossaz"
        },
        {
            "Zip": 1892,
            "Location": "Lavey-les-Bains"
        },
        {
            "Zip": 1892,
            "Location": "Lavey-Village"
        },
        {
            "Zip": 1892,
            "Location": "Morcles"
        },
        {
            "Zip": 1893,
            "Location": "Muraz (Collombey)"
        },
        {
            "Zip": 1895,
            "Location": "Vionnaz"
        },
        {
            "Zip": 1896,
            "Location": "Miex"
        },
        {
            "Zip": 1896,
            "Location": "Vouvry"
        },
        {
            "Zip": 1897,
            "Location": "Bouveret"
        },
        {
            "Zip": 1897,
            "Location": "Les Evouettes"
        },
        {
            "Zip": 1898,
            "Location": "St-Gingolph"
        },
        {
            "Zip": 1899,
            "Location": "Torgon"
        },
        {
            "Zip": 1902,
            "Location": "Evionnaz"
        },
        {
            "Zip": 1903,
            "Location": "Collonges"
        },
        {
            "Zip": 1904,
            "Location": "Vernayaz"
        },
        {
            "Zip": 1905,
            "Location": "Dorénaz"
        },
        {
            "Zip": 1905,
            "Location": "Dorénaz PostAuto AG Schweiz"
        },
        {
            "Zip": 1906,
            "Location": "Charrat"
        },
        {
            "Zip": 1907,
            "Location": "Saxon"
        },
        {
            "Zip": 1908,
            "Location": "Riddes"
        },
        {
            "Zip": 1911,
            "Location": "Mayens-de-Chamoson"
        },
        {
            "Zip": 1911,
            "Location": "Ovronnaz"
        },
        {
            "Zip": 1912,
            "Location": "Dugny (Leytron)"
        },
        {
            "Zip": 1912,
            "Location": "Leytron"
        },
        {
            "Zip": 1912,
            "Location": "Montagnon (Leytron)"
        },
        {
            "Zip": 1912,
            "Location": "Produit (Leytron)"
        },
        {
            "Zip": 1913,
            "Location": "Saillon"
        },
        {
            "Zip": 1914,
            "Location": "Auddes-sur-Riddes"
        },
        {
            "Zip": 1914,
            "Location": "Isérables"
        },
        {
            "Zip": 1918,
            "Location": "La Tzoumaz"
        },
        {
            "Zip": 1919,
            "Location": "Martigny Groupe Mutuel"
        },
        {
            "Zip": 1920,
            "Location": "Martigny"
        },
        {
            "Zip": 1920,
            "Location": "Martigny 1"
        },
        {
            "Zip": 1920,
            "Location": "Martigny 1 Distribution"
        },
        {
            "Zip": 1920,
            "Location": "Martigny 2"
        },
        {
            "Zip": 1920,
            "Location": "Martigny PF 331-130"
        },
        {
            "Zip": 1920,
            "Location": "Martigny PostFinance"
        },
        {
            "Zip": 1921,
            "Location": "Martigny-Croix"
        },
        {
            "Zip": 1922,
            "Location": "Les Granges (Salvan)"
        },
        {
            "Zip": 1922,
            "Location": "Salvan"
        },
        {
            "Zip": 1923,
            "Location": "Le Trétien"
        },
        {
            "Zip": 1923,
            "Location": "Les Marécottes"
        },
        {
            "Zip": 1925,
            "Location": "Finhaut"
        },
        {
            "Zip": 1925,
            "Location": "Le Châtelard VS"
        },
        {
            "Zip": 1926,
            "Location": "Fully"
        },
        {
            "Zip": 1926,
            "Location": "Fully Distribution"
        },
        {
            "Zip": 1927,
            "Location": "Chemin"
        },
        {
            "Zip": 1928,
            "Location": "Ravoire"
        },
        {
            "Zip": 1929,
            "Location": "Trient"
        },
        {
            "Zip": 1930,
            "Location": "Vétroz CALL"
        },
        {
            "Zip": 1932,
            "Location": "Bovernier"
        },
        {
            "Zip": 1932,
            "Location": "Les Valettes (Bovernier)"
        },
        {
            "Zip": 1933,
            "Location": "Chamoille (Sembrancher)"
        },
        {
            "Zip": 1933,
            "Location": "La Garde (Sembrancher)"
        },
        {
            "Zip": 1933,
            "Location": "Sembrancher"
        },
        {
            "Zip": 1933,
            "Location": "Vens (Sembrancher)"
        },
        {
            "Zip": 1934,
            "Location": "Bruson"
        },
        {
            "Zip": 1934,
            "Location": "Le Châble VS"
        },
        {
            "Zip": 1934,
            "Location": "Le Châble VS Distribution"
        },
        {
            "Zip": 1936,
            "Location": "Verbier"
        },
        {
            "Zip": 1937,
            "Location": "Orsières"
        },
        {
            "Zip": 1938,
            "Location": "Champex-Lac"
        },
        {
            "Zip": 1940,
            "Location": "Vétroz CIRCLE"
        },
        {
            "Zip": 1941,
            "Location": "Cries (Vollèges)"
        },
        {
            "Zip": 1941,
            "Location": "Vollèges"
        },
        {
            "Zip": 1942,
            "Location": "Levron"
        },
        {
            "Zip": 1943,
            "Location": "Praz-de-Fort"
        },
        {
            "Zip": 1944,
            "Location": "La Fouly VS"
        },
        {
            "Zip": 1945,
            "Location": "Chandonne (Liddes)"
        },
        {
            "Zip": 1945,
            "Location": "Chez Petit (Liddes)"
        },
        {
            "Zip": 1945,
            "Location": "Dranse (Liddes)"
        },
        {
            "Zip": 1945,
            "Location": "Fontaine Dessous (Liddes)"
        },
        {
            "Zip": 1945,
            "Location": "Fontaine Dessus (Liddes)"
        },
        {
            "Zip": 1945,
            "Location": "Fornex (Liddes)"
        },
        {
            "Zip": 1945,
            "Location": "Les Moulins VS (Liddes)"
        },
        {
            "Zip": 1945,
            "Location": "Liddes"
        },
        {
            "Zip": 1945,
            "Location": "Palasuit (Liddes)"
        },
        {
            "Zip": 1945,
            "Location": "Petit Vichères (Liddes)"
        },
        {
            "Zip": 1945,
            "Location": "Rive Haute (Liddes)"
        },
        {
            "Zip": 1945,
            "Location": "Vichères (Liddes)"
        },
        {
            "Zip": 1946,
            "Location": "Bourg-St-Pierre"
        },
        {
            "Zip": 1947,
            "Location": "Champsec"
        },
        {
            "Zip": 1947,
            "Location": "Versegères"
        },
        {
            "Zip": 1948,
            "Location": "Fionnay"
        },
        {
            "Zip": 1948,
            "Location": "Lourtier"
        },
        {
            "Zip": 1948,
            "Location": "Sarreyer"
        },
        {
            "Zip": 1950,
            "Location": "Sion"
        },
        {
            "Zip": 1950,
            "Location": "Sion 1"
        },
        {
            "Zip": 1950,
            "Location": "Sion 1 Distribution"
        },
        {
            "Zip": 1950,
            "Location": "Sion 2"
        },
        {
            "Zip": 1950,
            "Location": "Sion 4"
        },
        {
            "Zip": 1950,
            "Location": "Sion Base de distribution"
        },
        {
            "Zip": 1950,
            "Location": "Sion Caserne"
        },
        {
            "Zip": 1951,
            "Location": "Sion"
        },
        {
            "Zip": 1951,
            "Location": "Sion car postal VS-Léman"
        },
        {
            "Zip": 1951,
            "Location": "Sion Centre logistique"
        },
        {
            "Zip": 1953,
            "Location": "Sion RZ"
        },
        {
            "Zip": 1955,
            "Location": "Chamoson"
        },
        {
            "Zip": 1955,
            "Location": "Grugnay (Chamoson)"
        },
        {
            "Zip": 1955,
            "Location": "Les Vérines (Chamoson)"
        },
        {
            "Zip": 1955,
            "Location": "Némiaz (Chamoson)"
        },
        {
            "Zip": 1955,
            "Location": "St-Pierre-de-Clages"
        },
        {
            "Zip": 1957,
            "Location": "Ardon"
        },
        {
            "Zip": 1958,
            "Location": "St-Léonard"
        },
        {
            "Zip": 1958,
            "Location": "Uvrier"
        },
        {
            "Zip": 1960,
            "Location": "Vétroz CCR"
        },
        {
            "Zip": 1960,
            "Location": "Vétroz Tri"
        },
        {
            "Zip": 1961,
            "Location": "Vernamiège"
        },
        {
            "Zip": 1962,
            "Location": "Pont-de-la-Morge (Sion)"
        },
        {
            "Zip": 1963,
            "Location": "Vétroz"
        },
        {
            "Zip": 1964,
            "Location": "Conthey"
        },
        {
            "Zip": 1964,
            "Location": "Conthey Distribution"
        },
        {
            "Zip": 1965,
            "Location": "Savièse"
        },
        {
            "Zip": 1965,
            "Location": "Savièse Distribution"
        },
        {
            "Zip": 1966,
            "Location": "Argnou (Ayent)"
        },
        {
            "Zip": 1966,
            "Location": "Ayent"
        },
        {
            "Zip": 1966,
            "Location": "Blignou (Ayent)"
        },
        {
            "Zip": 1966,
            "Location": "Botyre (Ayent)"
        },
        {
            "Zip": 1966,
            "Location": "Fortunau (Ayent)"
        },
        {
            "Zip": 1966,
            "Location": "La Place (Ayent)"
        },
        {
            "Zip": 1966,
            "Location": "Luc (Ayent)"
        },
        {
            "Zip": 1966,
            "Location": "Saxonne (Ayent)"
        },
        {
            "Zip": 1966,
            "Location": "Signèse (Ayent)"
        },
        {
            "Zip": 1966,
            "Location": "St-Romain (Ayent)"
        },
        {
            "Zip": 1966,
            "Location": "Villa (Ayent)"
        },
        {
            "Zip": 1967,
            "Location": "Bramois"
        },
        {
            "Zip": 1968,
            "Location": "Mase"
        },
        {
            "Zip": 1969,
            "Location": "Eison (St-Martin)"
        },
        {
            "Zip": 1969,
            "Location": "Liez (St-Martin)"
        },
        {
            "Zip": 1969,
            "Location": "St-Martin VS"
        },
        {
            "Zip": 1969,
            "Location": "Suen (St-Martin)"
        },
        {
            "Zip": 1969,
            "Location": "Trogne (St-Martin)"
        },
        {
            "Zip": 1971,
            "Location": "Champlan (Grimisuat)"
        },
        {
            "Zip": 1971,
            "Location": "Grimisuat"
        },
        {
            "Zip": 1972,
            "Location": "Anzère"
        },
        {
            "Zip": 1973,
            "Location": "Nax"
        },
        {
            "Zip": 1974,
            "Location": "Arbaz"
        },
        {
            "Zip": 1975,
            "Location": "St-Séverin"
        },
        {
            "Zip": 1976,
            "Location": "Aven"
        },
        {
            "Zip": 1976,
            "Location": "Daillon"
        },
        {
            "Zip": 1976,
            "Location": "Erde"
        },
        {
            "Zip": 1977,
            "Location": "Icogne"
        },
        {
            "Zip": 1978,
            "Location": "Lens"
        },
        {
            "Zip": 1981,
            "Location": "Vex"
        },
        {
            "Zip": 1982,
            "Location": "Euseigne"
        },
        {
            "Zip": 1983,
            "Location": "Evolène"
        },
        {
            "Zip": 1983,
            "Location": "Lanna"
        },
        {
            "Zip": 1984,
            "Location": "La Tour VS"
        },
        {
            "Zip": 1984,
            "Location": "Les Haudères"
        },
        {
            "Zip": 1985,
            "Location": "La Forclaz VS"
        },
        {
            "Zip": 1985,
            "Location": "La Sage"
        },
        {
            "Zip": 1985,
            "Location": "Villa (Evolène)"
        },
        {
            "Zip": 1986,
            "Location": "Arolla"
        },
        {
            "Zip": 1987,
            "Location": "Hérémence"
        },
        {
            "Zip": 1988,
            "Location": "Les Collons"
        },
        {
            "Zip": 1988,
            "Location": "Thyon"
        },
        {
            "Zip": 1988,
            "Location": "Thyon-Les Collons"
        },
        {
            "Zip": 1991,
            "Location": "Arvillard (Salins)"
        },
        {
            "Zip": 1991,
            "Location": "Misériez (Salins)"
        },
        {
            "Zip": 1991,
            "Location": "Pravidondaz (Salins)"
        },
        {
            "Zip": 1991,
            "Location": "Salins"
        },
        {
            "Zip": 1991,
            "Location": "Turin (Salins)"
        },
        {
            "Zip": 1992,
            "Location": "Crête-à-l'Oeil(Les Agettes)"
        },
        {
            "Zip": 1992,
            "Location": "La Vernaz (Les Agettes)"
        },
        {
            "Zip": 1992,
            "Location": "Les Agettes"
        },
        {
            "Zip": 1992,
            "Location": "Les Mayens-de-Sion"
        },
        {
            "Zip": 1993,
            "Location": "Clèbes (Nendaz)"
        },
        {
            "Zip": 1993,
            "Location": "Veysonnaz"
        },
        {
            "Zip": 1994,
            "Location": "Aproz (Nendaz)"
        },
        {
            "Zip": 1996,
            "Location": "Baar (Nendaz)"
        },
        {
            "Zip": 1996,
            "Location": "Basse-Nendaz"
        },
        {
            "Zip": 1996,
            "Location": "Beuson (Nendaz)"
        },
        {
            "Zip": 1996,
            "Location": "Bieudron (Nendaz)"
        },
        {
            "Zip": 1996,
            "Location": "Brignon (Nendaz)"
        },
        {
            "Zip": 1996,
            "Location": "Condémines (Nendaz)"
        },
        {
            "Zip": 1996,
            "Location": "Fey (Nendaz)"
        },
        {
            "Zip": 1996,
            "Location": "Saclentse"
        },
        {
            "Zip": 1997,
            "Location": "Haute-Nendaz"
        },
        {
            "Zip": 1997,
            "Location": "Siviez (Nendaz)"
        },
        {
            "Zip": 1997,
            "Location": "Sornard (Nendaz)"
        },
        {
            "Zip": 2000,
            "Location": "Neuchâtel"
        },
        {
            "Zip": 2000,
            "Location": "Neuchâtel 2"
        },
        {
            "Zip": 2000,
            "Location": "Neuchâtel 2 Distribution"
        },
        {
            "Zip": 2001,
            "Location": "Neuchâtel 1"
        },
        {
            "Zip": 2001,
            "Location": "Neuchâtel 1 Dépôt"
        },
        {
            "Zip": 2002,
            "Location": "Neuchâtel 2"
        },
        {
            "Zip": 2003,
            "Location": "Neuchâtel 3"
        },
        {
            "Zip": 2004,
            "Location": "Neuchâtel 4"
        },
        {
            "Zip": 2006,
            "Location": "Neuchâtel 6"
        },
        {
            "Zip": 2007,
            "Location": "Neuchâtel 7"
        },
        {
            "Zip": 2009,
            "Location": "Neuchâtel La Coudre"
        },
        {
            "Zip": 2010,
            "Location": "Neuchâtel OFS"
        },
        {
            "Zip": 2012,
            "Location": "Auvernier"
        },
        {
            "Zip": 2013,
            "Location": "Boudry Dist Ba"
        },
        {
            "Zip": 2013,
            "Location": "Colombier NE"
        },
        {
            "Zip": 2013,
            "Location": "Colombier NE Caserne"
        },
        {
            "Zip": 2013,
            "Location": "Colombier NE Distribution"
        },
        {
            "Zip": 2014,
            "Location": "Bôle"
        },
        {
            "Zip": 2015,
            "Location": "Areuse"
        },
        {
            "Zip": 2016,
            "Location": "Cortaillod"
        },
        {
            "Zip": 2017,
            "Location": "Boudry"
        },
        {
            "Zip": 2019,
            "Location": "Chambrelien"
        },
        {
            "Zip": 2019,
            "Location": "Rochefort"
        },
        {
            "Zip": 2022,
            "Location": "Bevaix"
        },
        {
            "Zip": 2023,
            "Location": "Gorgier"
        },
        {
            "Zip": 2024,
            "Location": "St-Aubin-Sauges"
        },
        {
            "Zip": 2025,
            "Location": "Chez-le-Bart"
        },
        {
            "Zip": 2027,
            "Location": "Fresens"
        },
        {
            "Zip": 2027,
            "Location": "Montalchez"
        },
        {
            "Zip": 2028,
            "Location": "Vaumarcus"
        },
        {
            "Zip": 2034,
            "Location": "Peseux"
        },
        {
            "Zip": 2035,
            "Location": "Corcelles NE"
        },
        {
            "Zip": 2035,
            "Location": "Corcelles NE Distribution"
        },
        {
            "Zip": 2036,
            "Location": "Cormondrèche"
        },
        {
            "Zip": 2037,
            "Location": "Montezillon"
        },
        {
            "Zip": 2037,
            "Location": "Montmollin"
        },
        {
            "Zip": 2042,
            "Location": "Valangin"
        },
        {
            "Zip": 2043,
            "Location": "Boudevilliers"
        },
        {
            "Zip": 2046,
            "Location": "Fontaines NE"
        },
        {
            "Zip": 2052,
            "Location": "Fontainemelon"
        },
        {
            "Zip": 2052,
            "Location": "La Vue-des-Alpes"
        },
        {
            "Zip": 2053,
            "Location": "Cernier"
        },
        {
            "Zip": 2054,
            "Location": "Chézard-St-Martin"
        },
        {
            "Zip": 2054,
            "Location": "Les Vieux-Prés"
        },
        {
            "Zip": 2056,
            "Location": "Dombresson"
        },
        {
            "Zip": 2057,
            "Location": "Villiers"
        },
        {
            "Zip": 2058,
            "Location": "Le Pâquier NE"
        },
        {
            "Zip": 2063,
            "Location": "Engollon"
        },
        {
            "Zip": 2063,
            "Location": "Fenin"
        },
        {
            "Zip": 2063,
            "Location": "Saules"
        },
        {
            "Zip": 2063,
            "Location": "Vilars NE"
        },
        {
            "Zip": 2065,
            "Location": "Savagnier"
        },
        {
            "Zip": 2067,
            "Location": "Chaumont"
        },
        {
            "Zip": 2068,
            "Location": "Hauterive NE"
        },
        {
            "Zip": 2072,
            "Location": "St-Blaise"
        },
        {
            "Zip": 2073,
            "Location": "Enges"
        },
        {
            "Zip": 2074,
            "Location": "Marin-Centre"
        },
        {
            "Zip": 2074,
            "Location": "Marin-Epagnier"
        },
        {
            "Zip": 2074,
            "Location": "Marin-Epagnier Distribution"
        },
        {
            "Zip": 2074,
            "Location": "Marin-Epagnier Fleur de Lys"
        },
        {
            "Zip": 2075,
            "Location": "Thielle"
        },
        {
            "Zip": 2075,
            "Location": "Wavre"
        },
        {
            "Zip": 2087,
            "Location": "Cornaux NE"
        },
        {
            "Zip": 2088,
            "Location": "Cressier NE"
        },
        {
            "Zip": 2103,
            "Location": "Noiraigue"
        },
        {
            "Zip": 2105,
            "Location": "Travers"
        },
        {
            "Zip": 2108,
            "Location": "Couvet"
        },
        {
            "Zip": 2112,
            "Location": "Môtiers NE"
        },
        {
            "Zip": 2113,
            "Location": "Boveresse"
        },
        {
            "Zip": 2114,
            "Location": "Fleurier"
        },
        {
            "Zip": 2115,
            "Location": "Buttes"
        },
        {
            "Zip": 2116,
            "Location": "Mont-de-Buttes"
        },
        {
            "Zip": 2117,
            "Location": "La Côte-aux-Fées"
        },
        {
            "Zip": 2123,
            "Location": "St-Sulpice NE"
        },
        {
            "Zip": 2124,
            "Location": "Les Sagnettes"
        },
        {
            "Zip": 2126,
            "Location": "Les Verrières"
        },
        {
            "Zip": 2127,
            "Location": "Les Bayards"
        },
        {
            "Zip": 2149,
            "Location": "Brot-Dessous"
        },
        {
            "Zip": 2149,
            "Location": "Champ-du-Moulin"
        },
        {
            "Zip": 2149,
            "Location": "Fretereules"
        },
        {
            "Zip": 2206,
            "Location": "Les Geneveys-sur-Coffrane"
        },
        {
            "Zip": 2207,
            "Location": "Coffrane"
        },
        {
            "Zip": 2208,
            "Location": "Les Hauts-Geneveys"
        },
        {
            "Zip": 2300,
            "Location": "La Chaux-de-Fonds"
        },
        {
            "Zip": 2300,
            "Location": "La Chaux-de-Fonds 1"
        },
        {
            "Zip": 2300,
            "Location": "La Chaux-de-Fonds 1 Dist"
        },
        {
            "Zip": 2300,
            "Location": "La Cibourg"
        },
        {
            "Zip": 2301,
            "Location": "La Chaux-de-Fonds"
        },
        {
            "Zip": 2301,
            "Location": "La Chaux-de-Fonds 1 Dépôt"
        },
        {
            "Zip": 2301,
            "Location": "La Chx-de-F. Combe-à-l'Ours"
        },
        {
            "Zip": 2302,
            "Location": "La Chaux-de-Fonds"
        },
        {
            "Zip": 2303,
            "Location": "La Chaux-de-Fonds"
        },
        {
            "Zip": 2304,
            "Location": "La Chaux-de-Fonds"
        },
        {
            "Zip": 2305,
            "Location": "La Chaux-de-Fonds"
        },
        {
            "Zip": 2314,
            "Location": "La Sagne NE"
        },
        {
            "Zip": 2316,
            "Location": "Les Ponts-de-Martel"
        },
        {
            "Zip": 2316,
            "Location": "Petit-Martel"
        },
        {
            "Zip": 2318,
            "Location": "Brot-Plamboz"
        },
        {
            "Zip": 2322,
            "Location": "Le Crêt-du-Locle"
        },
        {
            "Zip": 2325,
            "Location": "Les Planchettes"
        },
        {
            "Zip": 2333,
            "Location": "La Cibourg"
        },
        {
            "Zip": 2333,
            "Location": "La Ferrière"
        },
        {
            "Zip": 2336,
            "Location": "Les Bois"
        },
        {
            "Zip": 2338,
            "Location": "Les Emibois"
        },
        {
            "Zip": 2338,
            "Location": "Muriaux"
        },
        {
            "Zip": 2340,
            "Location": "Le Noirmont"
        },
        {
            "Zip": 2340,
            "Location": "Le Noirmont Distribution"
        },
        {
            "Zip": 2345,
            "Location": "La Chaux-des-Breuleux"
        },
        {
            "Zip": 2345,
            "Location": "Le Cerneux-Veusil"
        },
        {
            "Zip": 2345,
            "Location": "Les Breuleux"
        },
        {
            "Zip": 2350,
            "Location": "Saignelégier"
        },
        {
            "Zip": 2353,
            "Location": "Les Pommerats"
        },
        {
            "Zip": 2354,
            "Location": "Goumois"
        },
        {
            "Zip": 2360,
            "Location": "Le Bémont JU"
        },
        {
            "Zip": 2362,
            "Location": "Montfaucon"
        },
        {
            "Zip": 2362,
            "Location": "Montfavergier"
        },
        {
            "Zip": 2363,
            "Location": "Les Enfers"
        },
        {
            "Zip": 2364,
            "Location": "St-Brais"
        },
        {
            "Zip": 2400,
            "Location": "Le Locle"
        },
        {
            "Zip": 2400,
            "Location": "Le Locle Distribution"
        },
        {
            "Zip": 2400,
            "Location": "Le Prévoux"
        },
        {
            "Zip": 2405,
            "Location": "La Chaux-du-Milieu"
        },
        {
            "Zip": 2406,
            "Location": "La Brévine"
        },
        {
            "Zip": 2406,
            "Location": "La Châtagne"
        },
        {
            "Zip": 2406,
            "Location": "Le Brouillet"
        },
        {
            "Zip": 2406,
            "Location": "Les Taillères"
        },
        {
            "Zip": 2414,
            "Location": "Le Cerneux-Péquignot"
        },
        {
            "Zip": 2416,
            "Location": "Les Brenets"
        },
        {
            "Zip": 2500,
            "Location": "Biel\\Bienne"
        },
        {
            "Zip": 2500,
            "Location": "Biel\\Bienne 1"
        },
        {
            "Zip": 2500,
            "Location": "Biel\\Bienne 1 Annahme"
        },
        {
            "Zip": 2500,
            "Location": "Biel\\Bienne 10"
        },
        {
            "Zip": 2500,
            "Location": "Biel\\Bienne 3"
        },
        {
            "Zip": 2500,
            "Location": "Biel\\Bienne 4"
        },
        {
            "Zip": 2500,
            "Location": "Biel\\Bienne 6"
        },
        {
            "Zip": 2500,
            "Location": "Biel\\Bienne 7"
        },
        {
            "Zip": 2500,
            "Location": "Biel\\Bienne 8"
        },
        {
            "Zip": 2500,
            "Location": "Biel\\Bienne Bahnhof\\Gare GK"
        },
        {
            "Zip": 2500,
            "Location": "Biel\\Bienne Zustellung"
        },
        {
            "Zip": 2501,
            "Location": "Biel\\Bienne"
        },
        {
            "Zip": 2502,
            "Location": "Biel\\Bienne"
        },
        {
            "Zip": 2503,
            "Location": "Biel\\Bienne"
        },
        {
            "Zip": 2504,
            "Location": "Biel\\Bienne"
        },
        {
            "Zip": 2505,
            "Location": "Biel\\Bienne"
        },
        {
            "Zip": 2510,
            "Location": "Biel\\Bienne Dist Ba"
        },
        {
            "Zip": 2512,
            "Location": "Tüscherz-Alfermée"
        },
        {
            "Zip": 2513,
            "Location": "Twann"
        },
        {
            "Zip": 2514,
            "Location": "Ligerz"
        },
        {
            "Zip": 2515,
            "Location": "Prêles"
        },
        {
            "Zip": 2516,
            "Location": "Lamboing"
        },
        {
            "Zip": 2517,
            "Location": "Diesse"
        },
        {
            "Zip": 2518,
            "Location": "Nods"
        },
        {
            "Zip": 2520,
            "Location": "La Neuveville"
        },
        {
            "Zip": 2520,
            "Location": "La Neuveville Distribution"
        },
        {
            "Zip": 2523,
            "Location": "Lignières"
        },
        {
            "Zip": 2525,
            "Location": "Le Landeron"
        },
        {
            "Zip": 2532,
            "Location": "Magglingen\\Macolin"
        },
        {
            "Zip": 2533,
            "Location": "Evilard"
        },
        {
            "Zip": 2534,
            "Location": "Les Prés-d'Orvin"
        },
        {
            "Zip": 2534,
            "Location": "Orvin"
        },
        {
            "Zip": 2535,
            "Location": "Frinvillier"
        },
        {
            "Zip": 2536,
            "Location": "Plagne"
        },
        {
            "Zip": 2537,
            "Location": "Vauffelin"
        },
        {
            "Zip": 2538,
            "Location": "Romont BE"
        },
        {
            "Zip": 2540,
            "Location": "Grenchen"
        },
        {
            "Zip": 2540,
            "Location": "Grenchen 1"
        },
        {
            "Zip": 2540,
            "Location": "Grenchen 1 Zustellung"
        },
        {
            "Zip": 2540,
            "Location": "Grenchen Schmelzi"
        },
        {
            "Zip": 2542,
            "Location": "Pieterlen"
        },
        {
            "Zip": 2543,
            "Location": "Lengnau BE"
        },
        {
            "Zip": 2544,
            "Location": "Bettlach"
        },
        {
            "Zip": 2545,
            "Location": "Selzach"
        },
        {
            "Zip": 2552,
            "Location": "Orpund"
        },
        {
            "Zip": 2553,
            "Location": "Safnern"
        },
        {
            "Zip": 2554,
            "Location": "Meinisberg"
        },
        {
            "Zip": 2555,
            "Location": "Brügg BE"
        },
        {
            "Zip": 2556,
            "Location": "Scheuren"
        },
        {
            "Zip": 2556,
            "Location": "Schwadernau"
        },
        {
            "Zip": 2557,
            "Location": "Studen BE"
        },
        {
            "Zip": 2558,
            "Location": "Aegerten"
        },
        {
            "Zip": 2560,
            "Location": "Nidau"
        },
        {
            "Zip": 2560,
            "Location": "Nidau Weyermattstrasse"
        },
        {
            "Zip": 2562,
            "Location": "Port"
        },
        {
            "Zip": 2563,
            "Location": "Ipsach"
        },
        {
            "Zip": 2564,
            "Location": "Bellmund"
        },
        {
            "Zip": 2565,
            "Location": "Jens"
        },
        {
            "Zip": 2572,
            "Location": "Mörigen"
        },
        {
            "Zip": 2572,
            "Location": "Sutz"
        },
        {
            "Zip": 2575,
            "Location": "Gerolfingen"
        },
        {
            "Zip": 2575,
            "Location": "Hagneck"
        },
        {
            "Zip": 2575,
            "Location": "Täuffelen"
        },
        {
            "Zip": 2576,
            "Location": "Lüscherz"
        },
        {
            "Zip": 2577,
            "Location": "Finsterhennen"
        },
        {
            "Zip": 2577,
            "Location": "Siselen BE"
        },
        {
            "Zip": 2603,
            "Location": "Péry"
        },
        {
            "Zip": 2604,
            "Location": "La Heutte"
        },
        {
            "Zip": 2605,
            "Location": "Sonceboz-Sombeval"
        },
        {
            "Zip": 2606,
            "Location": "Corgémont"
        },
        {
            "Zip": 2607,
            "Location": "Cortébert"
        },
        {
            "Zip": 2608,
            "Location": "Courtelary"
        },
        {
            "Zip": 2608,
            "Location": "Montagne-de-Courtelary"
        },
        {
            "Zip": 2610,
            "Location": "Les Pontins"
        },
        {
            "Zip": 2610,
            "Location": "Mont-Crosin"
        },
        {
            "Zip": 2610,
            "Location": "Mont-Soleil"
        },
        {
            "Zip": 2610,
            "Location": "St-Imier"
        },
        {
            "Zip": 2610,
            "Location": "St-Imier Distribution"
        },
        {
            "Zip": 2612,
            "Location": "Cormoret"
        },
        {
            "Zip": 2613,
            "Location": "Villeret"
        },
        {
            "Zip": 2615,
            "Location": "Montagne-de-Sonvilier"
        },
        {
            "Zip": 2615,
            "Location": "Sonvilier"
        },
        {
            "Zip": 2616,
            "Location": "La Cibourg"
        },
        {
            "Zip": 2616,
            "Location": "Renan BE"
        },
        {
            "Zip": 2710,
            "Location": "Tavannes"
        },
        {
            "Zip": 2712,
            "Location": "Le Fuet"
        },
        {
            "Zip": 2713,
            "Location": "Bellelay"
        },
        {
            "Zip": 2714,
            "Location": "Le Prédame"
        },
        {
            "Zip": 2714,
            "Location": "Les Genevez JU"
        },
        {
            "Zip": 2715,
            "Location": "Châtelat"
        },
        {
            "Zip": 2715,
            "Location": "Châtelat-Monible"
        },
        {
            "Zip": 2715,
            "Location": "Monible"
        },
        {
            "Zip": 2716,
            "Location": "Sornetan"
        },
        {
            "Zip": 2717,
            "Location": "Fornet-Dessous"
        },
        {
            "Zip": 2717,
            "Location": "Rebévelier"
        },
        {
            "Zip": 2718,
            "Location": "Fornet-Dessus"
        },
        {
            "Zip": 2718,
            "Location": "Lajoux JU"
        },
        {
            "Zip": 2720,
            "Location": "La Tanne"
        },
        {
            "Zip": 2720,
            "Location": "Tramelan"
        },
        {
            "Zip": 2720,
            "Location": "Tramelan Distribution"
        },
        {
            "Zip": 2722,
            "Location": "Les Reussilles"
        },
        {
            "Zip": 2723,
            "Location": "Mont-Tramelan"
        },
        {
            "Zip": 2732,
            "Location": "Loveresse"
        },
        {
            "Zip": 2732,
            "Location": "Reconvilier"
        },
        {
            "Zip": 2732,
            "Location": "Saicourt"
        },
        {
            "Zip": 2732,
            "Location": "Saules BE"
        },
        {
            "Zip": 2733,
            "Location": "Pontenet"
        },
        {
            "Zip": 2735,
            "Location": "Bévilard"
        },
        {
            "Zip": 2735,
            "Location": "Champoz"
        },
        {
            "Zip": 2735,
            "Location": "Malleray"
        },
        {
            "Zip": 2735,
            "Location": "Malleray-Bévilard"
        },
        {
            "Zip": 2736,
            "Location": "Sorvilier"
        },
        {
            "Zip": 2738,
            "Location": "Court"
        },
        {
            "Zip": 2740,
            "Location": "Moutier"
        },
        {
            "Zip": 2740,
            "Location": "Moutier 1 Distribution"
        },
        {
            "Zip": 2742,
            "Location": "Perrefitte"
        },
        {
            "Zip": 2743,
            "Location": "Eschert"
        },
        {
            "Zip": 2744,
            "Location": "Belprahon"
        },
        {
            "Zip": 2745,
            "Location": "Grandval"
        },
        {
            "Zip": 2746,
            "Location": "Crémines"
        },
        {
            "Zip": 2747,
            "Location": "Corcelles BE"
        },
        {
            "Zip": 2747,
            "Location": "Seehof"
        },
        {
            "Zip": 2748,
            "Location": "Les Ecorcheresses"
        },
        {
            "Zip": 2748,
            "Location": "Souboz"
        },
        {
            "Zip": 2762,
            "Location": "Roches BE"
        },
        {
            "Zip": 2800,
            "Location": "Delémont"
        },
        {
            "Zip": 2800,
            "Location": "Delémont 1"
        },
        {
            "Zip": 2800,
            "Location": "Delémont 1 Distribution"
        },
        {
            "Zip": 2800,
            "Location": "Delémont 2"
        },
        {
            "Zip": 2800,
            "Location": "Delémont car postal JU-NE"
        },
        {
            "Zip": 2800,
            "Location": "Delémont Dist Ba"
        },
        {
            "Zip": 2802,
            "Location": "Develier"
        },
        {
            "Zip": 2802,
            "Location": "Develier PostAuto AG"
        },
        {
            "Zip": 2803,
            "Location": "Bourrignon"
        },
        {
            "Zip": 2805,
            "Location": "Soyhières"
        },
        {
            "Zip": 2806,
            "Location": "Mettembert"
        },
        {
            "Zip": 2807,
            "Location": "Lucelle"
        },
        {
            "Zip": 2807,
            "Location": "Pleigne"
        },
        {
            "Zip": 2812,
            "Location": "Movelier"
        },
        {
            "Zip": 2813,
            "Location": "Ederswiler"
        },
        {
            "Zip": 2814,
            "Location": "Roggenburg"
        },
        {
            "Zip": 2822,
            "Location": "Courroux"
        },
        {
            "Zip": 2823,
            "Location": "Courcelon"
        },
        {
            "Zip": 2824,
            "Location": "Vicques"
        },
        {
            "Zip": 2825,
            "Location": "Courchapoix"
        },
        {
            "Zip": 2826,
            "Location": "Corban"
        },
        {
            "Zip": 2827,
            "Location": "Mervelier"
        },
        {
            "Zip": 2827,
            "Location": "Schelten"
        },
        {
            "Zip": 2828,
            "Location": "Montsevelier"
        },
        {
            "Zip": 2829,
            "Location": "Vermes"
        },
        {
            "Zip": 2830,
            "Location": "Courrendlin"
        },
        {
            "Zip": 2830,
            "Location": "Vellerat"
        },
        {
            "Zip": 2832,
            "Location": "Rebeuvelier"
        },
        {
            "Zip": 2842,
            "Location": "Rossemaison"
        },
        {
            "Zip": 2843,
            "Location": "Châtillon JU"
        },
        {
            "Zip": 2852,
            "Location": "Courtételle"
        },
        {
            "Zip": 2853,
            "Location": "Courfaivre"
        },
        {
            "Zip": 2854,
            "Location": "Bassecourt"
        },
        {
            "Zip": 2855,
            "Location": "Glovelier"
        },
        {
            "Zip": 2856,
            "Location": "Boécourt"
        },
        {
            "Zip": 2857,
            "Location": "Montavon"
        },
        {
            "Zip": 2863,
            "Location": "Undervelier"
        },
        {
            "Zip": 2864,
            "Location": "Soulce"
        },
        {
            "Zip": 2873,
            "Location": "Saulcy"
        },
        {
            "Zip": 2882,
            "Location": "St-Ursanne"
        },
        {
            "Zip": 2883,
            "Location": "Montmelon"
        },
        {
            "Zip": 2884,
            "Location": "Montenol"
        },
        {
            "Zip": 2885,
            "Location": "Epauvillers"
        },
        {
            "Zip": 2886,
            "Location": "Epiquerez"
        },
        {
            "Zip": 2887,
            "Location": "Soubey"
        },
        {
            "Zip": 2888,
            "Location": "Seleute"
        },
        {
            "Zip": 2889,
            "Location": "Ocourt"
        },
        {
            "Zip": 2900,
            "Location": "Porrentruy"
        },
        {
            "Zip": 2900,
            "Location": "Porrentruy 1"
        },
        {
            "Zip": 2900,
            "Location": "Porrentruy 1 Distribution"
        },
        {
            "Zip": 2900,
            "Location": "Porrentruy 2"
        },
        {
            "Zip": 2900,
            "Location": "Porrentruy Caserne"
        },
        {
            "Zip": 2902,
            "Location": "Fontenais"
        },
        {
            "Zip": 2903,
            "Location": "Villars-sur-Fontenais"
        },
        {
            "Zip": 2904,
            "Location": "Bressaucourt"
        },
        {
            "Zip": 2905,
            "Location": "Courtedoux"
        },
        {
            "Zip": 2906,
            "Location": "Chevenez"
        },
        {
            "Zip": 2907,
            "Location": "Rocourt"
        },
        {
            "Zip": 2908,
            "Location": "Grandfontaine"
        },
        {
            "Zip": 2912,
            "Location": "Réclère"
        },
        {
            "Zip": 2912,
            "Location": "Roche-d'Or"
        },
        {
            "Zip": 2914,
            "Location": "Damvant"
        },
        {
            "Zip": 2915,
            "Location": "Bure"
        },
        {
            "Zip": 2916,
            "Location": "Fahy"
        },
        {
            "Zip": 2922,
            "Location": "Courchavon"
        },
        {
            "Zip": 2923,
            "Location": "Courtemaîche"
        },
        {
            "Zip": 2924,
            "Location": "Montignez"
        },
        {
            "Zip": 2925,
            "Location": "Buix"
        },
        {
            "Zip": 2926,
            "Location": "Boncourt"
        },
        {
            "Zip": 2932,
            "Location": "Coeuve"
        },
        {
            "Zip": 2933,
            "Location": "Damphreux"
        },
        {
            "Zip": 2933,
            "Location": "Lugnez"
        },
        {
            "Zip": 2935,
            "Location": "Beurnevésin"
        },
        {
            "Zip": 2942,
            "Location": "Alle"
        },
        {
            "Zip": 2943,
            "Location": "Vendlincourt"
        },
        {
            "Zip": 2944,
            "Location": "Bonfol"
        },
        {
            "Zip": 2946,
            "Location": "Miécourt"
        },
        {
            "Zip": 2947,
            "Location": "Charmoille"
        },
        {
            "Zip": 2950,
            "Location": "Courgenay"
        },
        {
            "Zip": 2950,
            "Location": "Courtemautruy"
        },
        {
            "Zip": 2952,
            "Location": "Cornol"
        },
        {
            "Zip": 2953,
            "Location": "Fregiécourt"
        },
        {
            "Zip": 2953,
            "Location": "Fregiécourt-Pleujouse"
        },
        {
            "Zip": 2953,
            "Location": "Pleujouse"
        },
        {
            "Zip": 2954,
            "Location": "Asuel"
        },
        {
            "Zip": 3000,
            "Location": "Bern"
        },
        {
            "Zip": 3000,
            "Location": "Bern 1 PostParc"
        },
        {
            "Zip": 3000,
            "Location": "Bern 13"
        },
        {
            "Zip": 3000,
            "Location": "Bern 14"
        },
        {
            "Zip": 3000,
            "Location": "Bern 15"
        },
        {
            "Zip": 3000,
            "Location": "Bern 21"
        },
        {
            "Zip": 3000,
            "Location": "Bern 22"
        },
        {
            "Zip": 3000,
            "Location": "Bern 22 Kaserne"
        },
        {
            "Zip": 3000,
            "Location": "Bern 31"
        },
        {
            "Zip": 3000,
            "Location": "Bern 5"
        },
        {
            "Zip": 3000,
            "Location": "Bern 6"
        },
        {
            "Zip": 3000,
            "Location": "Bern 60 UPD"
        },
        {
            "Zip": 3000,
            "Location": "Bern 65 SBB"
        },
        {
            "Zip": 3000,
            "Location": "Bern 77 SBV"
        },
        {
            "Zip": 3000,
            "Location": "Bern 8"
        },
        {
            "Zip": 3000,
            "Location": "Bern 9"
        },
        {
            "Zip": 3000,
            "Location": "Bern Brünnen"
        },
        {
            "Zip": 3000,
            "Location": "Bern Lorraine"
        },
        {
            "Zip": 3000,
            "Location": "Bern Postauto BE-FB-SO"
        },
        {
            "Zip": 3000,
            "Location": "Bern Radio Schweiz"
        },
        {
            "Zip": 3000,
            "Location": "Bern Spitalacker"
        },
        {
            "Zip": 3000,
            "Location": "Bern Sulgenbach"
        },
        {
            "Zip": 3000,
            "Location": "Bern Weissenbühl"
        },
        {
            "Zip": 3001,
            "Location": "Bern"
        },
        {
            "Zip": 3001,
            "Location": "Bern SPS"
        },
        {
            "Zip": 3002,
            "Location": "Bern PostFinance"
        },
        {
            "Zip": 3003,
            "Location": "Bern"
        },
        {
            "Zip": 3004,
            "Location": "Bern"
        },
        {
            "Zip": 3005,
            "Location": "Bern"
        },
        {
            "Zip": 3006,
            "Location": "Bern"
        },
        {
            "Zip": 3007,
            "Location": "Bern"
        },
        {
            "Zip": 3008,
            "Location": "Bern"
        },
        {
            "Zip": 3010,
            "Location": "Bern"
        },
        {
            "Zip": 3011,
            "Location": "Bern"
        },
        {
            "Zip": 3012,
            "Location": "Bern"
        },
        {
            "Zip": 3013,
            "Location": "Bern"
        },
        {
            "Zip": 3014,
            "Location": "Bern"
        },
        {
            "Zip": 3015,
            "Location": "Bern"
        },
        {
            "Zip": 3017,
            "Location": "Bern Grosskunden"
        },
        {
            "Zip": 3017,
            "Location": "Bern Zustellung"
        },
        {
            "Zip": 3018,
            "Location": "Bern"
        },
        {
            "Zip": 3019,
            "Location": "Bern"
        },
        {
            "Zip": 3020,
            "Location": "Bern"
        },
        {
            "Zip": 3024,
            "Location": "Bern"
        },
        {
            "Zip": 3027,
            "Location": "Bern"
        },
        {
            "Zip": 3029,
            "Location": "Bern"
        },
        {
            "Zip": 3030,
            "Location": "Bern"
        },
        {
            "Zip": 3030,
            "Location": "Bern Finform"
        },
        {
            "Zip": 3030,
            "Location": "Bern KC PK 4"
        },
        {
            "Zip": 3030,
            "Location": "Bern KC PK 5"
        },
        {
            "Zip": 3030,
            "Location": "Bern PAS"
        },
        {
            "Zip": 3030,
            "Location": "Bern PL3"
        },
        {
            "Zip": 3032,
            "Location": "Hinterkappelen"
        },
        {
            "Zip": 3033,
            "Location": "Wohlen b. Bern"
        },
        {
            "Zip": 3034,
            "Location": "Murzelen"
        },
        {
            "Zip": 3035,
            "Location": "Frieswil"
        },
        {
            "Zip": 3036,
            "Location": "Detligen"
        },
        {
            "Zip": 3037,
            "Location": "Herrenschwanden"
        },
        {
            "Zip": 3038,
            "Location": "Kirchlindach"
        },
        {
            "Zip": 3039,
            "Location": "Bern PF Operations Center"
        },
        {
            "Zip": 3040,
            "Location": "Bern Verarbeitungszentrum"
        },
        {
            "Zip": 3041,
            "Location": "Bern UBS"
        },
        {
            "Zip": 3042,
            "Location": "Ortschwaben"
        },
        {
            "Zip": 3043,
            "Location": "Uettligen"
        },
        {
            "Zip": 3044,
            "Location": "Innerberg"
        },
        {
            "Zip": 3045,
            "Location": "Meikirch"
        },
        {
            "Zip": 3046,
            "Location": "Wahlendorf"
        },
        {
            "Zip": 3047,
            "Location": "Bremgarten b. Bern"
        },
        {
            "Zip": 3048,
            "Location": "Worblaufen"
        },
        {
            "Zip": 3049,
            "Location": "Säriswil"
        },
        {
            "Zip": 3050,
            "Location": "Bern DocumentServices"
        },
        {
            "Zip": 3050,
            "Location": "Bern Swisscom"
        },
        {
            "Zip": 3052,
            "Location": "Zollikofen"
        },
        {
            "Zip": 3052,
            "Location": "Zollikofen Bernstrasse"
        },
        {
            "Zip": 3053,
            "Location": "Deisswil b. Münchenbuchsee"
        },
        {
            "Zip": 3053,
            "Location": "Diemerswil"
        },
        {
            "Zip": 3053,
            "Location": "Lätti"
        },
        {
            "Zip": 3053,
            "Location": "Münchenbuchsee"
        },
        {
            "Zip": 3053,
            "Location": "Münchenbuchsee Zustellung"
        },
        {
            "Zip": 3053,
            "Location": "Wiggiswil"
        },
        {
            "Zip": 3054,
            "Location": "Schüpfen"
        },
        {
            "Zip": 3063,
            "Location": "Ittigen"
        },
        {
            "Zip": 3065,
            "Location": "Bolligen"
        },
        {
            "Zip": 3065,
            "Location": "Bolligen Dorf"
        },
        {
            "Zip": 3066,
            "Location": "Stettlen"
        },
        {
            "Zip": 3067,
            "Location": "Boll"
        },
        {
            "Zip": 3068,
            "Location": "Utzigen"
        },
        {
            "Zip": 3071,
            "Location": "Ostermundigen Dist Ba"
        },
        {
            "Zip": 3071,
            "Location": "Ostermundigen KATA"
        },
        {
            "Zip": 3071,
            "Location": "Ostermundigen Zustellung"
        },
        {
            "Zip": 3072,
            "Location": "Ostermundigen"
        },
        {
            "Zip": 3072,
            "Location": "Ostermundigen 1"
        },
        {
            "Zip": 3072,
            "Location": "Ostermundigen Oberdorf"
        },
        {
            "Zip": 3073,
            "Location": "Gümligen"
        },
        {
            "Zip": 3073,
            "Location": "Gümligen Zustellung"
        },
        {
            "Zip": 3074,
            "Location": "Muri b. Bern"
        },
        {
            "Zip": 3075,
            "Location": "Rüfenacht BE"
        },
        {
            "Zip": 3075,
            "Location": "Vielbringen b. Worb"
        },
        {
            "Zip": 3076,
            "Location": "Worb"
        },
        {
            "Zip": 3076,
            "Location": "Worb Zustellung"
        },
        {
            "Zip": 3077,
            "Location": "Enggistein"
        },
        {
            "Zip": 3078,
            "Location": "Richigen"
        },
        {
            "Zip": 3080,
            "Location": "Ostermundigen CIRCLE"
        },
        {
            "Zip": 3082,
            "Location": "Schlosswil"
        },
        {
            "Zip": 3083,
            "Location": "Trimstein"
        },
        {
            "Zip": 3084,
            "Location": "Wabern"
        },
        {
            "Zip": 3085,
            "Location": "Wabern 2 x Weihnachten"
        },
        {
            "Zip": 3086,
            "Location": "Englisberg"
        },
        {
            "Zip": 3086,
            "Location": "Zimmerwald"
        },
        {
            "Zip": 3087,
            "Location": "Niedermuhlern"
        },
        {
            "Zip": 3088,
            "Location": "Oberbütschel"
        },
        {
            "Zip": 3088,
            "Location": "Rüeggisberg"
        },
        {
            "Zip": 3089,
            "Location": "Hinterfultigen"
        },
        {
            "Zip": 3090,
            "Location": "Ostermundigen CALL"
        },
        {
            "Zip": 3095,
            "Location": "Spiegel b. Bern"
        },
        {
            "Zip": 3096,
            "Location": "Oberbalm"
        },
        {
            "Zip": 3097,
            "Location": "Liebefeld"
        },
        {
            "Zip": 3098,
            "Location": "Köniz"
        },
        {
            "Zip": 3098,
            "Location": "Schliern b. Köniz"
        },
        {
            "Zip": 3099,
            "Location": "Rüti b. Riggisberg"
        },
        {
            "Zip": 3110,
            "Location": "Münsingen"
        },
        {
            "Zip": 3110,
            "Location": "Münsingen Zustellung"
        },
        {
            "Zip": 3111,
            "Location": "Tägertschi"
        },
        {
            "Zip": 3112,
            "Location": "Allmendingen b. Bern"
        },
        {
            "Zip": 3113,
            "Location": "Rubigen"
        },
        {
            "Zip": 3114,
            "Location": "Wichtrach"
        },
        {
            "Zip": 3115,
            "Location": "Gerzensee"
        },
        {
            "Zip": 3116,
            "Location": "Kirchdorf BE"
        },
        {
            "Zip": 3116,
            "Location": "Mühledorf BE"
        },
        {
            "Zip": 3116,
            "Location": "Noflen BE"
        },
        {
            "Zip": 3122,
            "Location": "Kehrsatz"
        },
        {
            "Zip": 3123,
            "Location": "Belp"
        },
        {
            "Zip": 3123,
            "Location": "Belp Zustellung"
        },
        {
            "Zip": 3124,
            "Location": "Belpberg"
        },
        {
            "Zip": 3125,
            "Location": "Toffen"
        },
        {
            "Zip": 3126,
            "Location": "Gelterfingen"
        },
        {
            "Zip": 3126,
            "Location": "Kaufdorf"
        },
        {
            "Zip": 3127,
            "Location": "Lohnstorf"
        },
        {
            "Zip": 3127,
            "Location": "Mühlethurnen"
        },
        {
            "Zip": 3128,
            "Location": "Kirchenthurnen"
        },
        {
            "Zip": 3128,
            "Location": "Rümligen"
        },
        {
            "Zip": 3132,
            "Location": "Riggisberg"
        },
        {
            "Zip": 3144,
            "Location": "Gasel"
        },
        {
            "Zip": 3145,
            "Location": "Niederscherli"
        },
        {
            "Zip": 3147,
            "Location": "Mittelhäusern"
        },
        {
            "Zip": 3148,
            "Location": "Lanzenhäusern"
        },
        {
            "Zip": 3150,
            "Location": "Schwarzenburg"
        },
        {
            "Zip": 3150,
            "Location": "Schwarzenburg Zustellung"
        },
        {
            "Zip": 3152,
            "Location": "Mamishaus"
        },
        {
            "Zip": 3153,
            "Location": "Rüschegg Gambach"
        },
        {
            "Zip": 3154,
            "Location": "Rüschegg Heubach"
        },
        {
            "Zip": 3155,
            "Location": "Helgisried-Rohrbach"
        },
        {
            "Zip": 3156,
            "Location": "Riffenmatt"
        },
        {
            "Zip": 3157,
            "Location": "Milken"
        },
        {
            "Zip": 3158,
            "Location": "Guggisberg"
        },
        {
            "Zip": 3159,
            "Location": "Riedstätt"
        },
        {
            "Zip": 3172,
            "Location": "Niederwangen b. Bern"
        },
        {
            "Zip": 3173,
            "Location": "Oberwangen b. Bern"
        },
        {
            "Zip": 3174,
            "Location": "Thörishaus"
        },
        {
            "Zip": 3175,
            "Location": "Flamatt"
        },
        {
            "Zip": 3175,
            "Location": "Flamatt Zustellung"
        },
        {
            "Zip": 3176,
            "Location": "Neuenegg"
        },
        {
            "Zip": 3177,
            "Location": "Laupen BE"
        },
        {
            "Zip": 3178,
            "Location": "Bösingen"
        },
        {
            "Zip": 3179,
            "Location": "Kriechenwil"
        },
        {
            "Zip": 3182,
            "Location": "Ueberstorf"
        },
        {
            "Zip": 3183,
            "Location": "Albligen"
        },
        {
            "Zip": 3184,
            "Location": "Wünnewil"
        },
        {
            "Zip": 3185,
            "Location": "Schmitten FR"
        },
        {
            "Zip": 3186,
            "Location": "Düdingen"
        },
        {
            "Zip": 3186,
            "Location": "Düdingen Zustellung"
        },
        {
            "Zip": 3202,
            "Location": "Frauenkappelen"
        },
        {
            "Zip": 3203,
            "Location": "Mühleberg"
        },
        {
            "Zip": 3204,
            "Location": "Rosshäusern"
        },
        {
            "Zip": 3205,
            "Location": "Gümmenen"
        },
        {
            "Zip": 3206,
            "Location": "Biberen"
        },
        {
            "Zip": 3206,
            "Location": "Ferenbalm"
        },
        {
            "Zip": 3206,
            "Location": "Gammen"
        },
        {
            "Zip": 3206,
            "Location": "Rizenbach"
        },
        {
            "Zip": 3206,
            "Location": "Wallenbuch"
        },
        {
            "Zip": 3207,
            "Location": "Golaten"
        },
        {
            "Zip": 3207,
            "Location": "Wileroltigen"
        },
        {
            "Zip": 3208,
            "Location": "Gurbrü"
        },
        {
            "Zip": 3210,
            "Location": "Kerzers"
        },
        {
            "Zip": 3210,
            "Location": "Kerzers Zustellung"
        },
        {
            "Zip": 3212,
            "Location": "Gurmels"
        },
        {
            "Zip": 3212,
            "Location": "Kleingurmels"
        },
        {
            "Zip": 3213,
            "Location": "Kleinbösingen"
        },
        {
            "Zip": 3213,
            "Location": "Liebistorf"
        },
        {
            "Zip": 3214,
            "Location": "Ulmiz"
        },
        {
            "Zip": 3215,
            "Location": "Büchslen"
        },
        {
            "Zip": 3215,
            "Location": "Gempenach"
        },
        {
            "Zip": 3215,
            "Location": "Lurtigen"
        },
        {
            "Zip": 3216,
            "Location": "Agriswil"
        },
        {
            "Zip": 3216,
            "Location": "Ried b. Kerzers"
        },
        {
            "Zip": 3225,
            "Location": "Müntschemier"
        },
        {
            "Zip": 3226,
            "Location": "Treiten"
        },
        {
            "Zip": 3232,
            "Location": "Ins"
        },
        {
            "Zip": 3233,
            "Location": "Tschugg"
        },
        {
            "Zip": 3234,
            "Location": "Vinelz"
        },
        {
            "Zip": 3235,
            "Location": "Erlach"
        },
        {
            "Zip": 3236,
            "Location": "Gampelen"
        },
        {
            "Zip": 3237,
            "Location": "Brüttelen"
        },
        {
            "Zip": 3238,
            "Location": "Gals"
        },
        {
            "Zip": 3250,
            "Location": "Lyss"
        },
        {
            "Zip": 3250,
            "Location": "Lyss Kaserne"
        },
        {
            "Zip": 3250,
            "Location": "Lyss Werkstrasse"
        },
        {
            "Zip": 3250,
            "Location": "Lyss Zustellung"
        },
        {
            "Zip": 3251,
            "Location": "Ruppoldsried"
        },
        {
            "Zip": 3251,
            "Location": "Wengi b. Büren"
        },
        {
            "Zip": 3252,
            "Location": "Worben"
        },
        {
            "Zip": 3253,
            "Location": "Schnottwil"
        },
        {
            "Zip": 3254,
            "Location": "Balm b. Messen"
        },
        {
            "Zip": 3254,
            "Location": "Messen"
        },
        {
            "Zip": 3255,
            "Location": "Rapperswil BE"
        },
        {
            "Zip": 3256,
            "Location": "Bangerten b. Dieterswil"
        },
        {
            "Zip": 3256,
            "Location": "Dieterswil"
        },
        {
            "Zip": 3256,
            "Location": "Seewil"
        },
        {
            "Zip": 3257,
            "Location": "Ammerzwil BE"
        },
        {
            "Zip": 3257,
            "Location": "Grossaffoltern"
        },
        {
            "Zip": 3262,
            "Location": "Suberg"
        },
        {
            "Zip": 3263,
            "Location": "Büetigen"
        },
        {
            "Zip": 3264,
            "Location": "Diessbach b. Büren"
        },
        {
            "Zip": 3266,
            "Location": "Wiler b. Seedorf"
        },
        {
            "Zip": 3267,
            "Location": "Seedorf BE"
        },
        {
            "Zip": 3268,
            "Location": "Lobsigen"
        },
        {
            "Zip": 3270,
            "Location": "Aarberg"
        },
        {
            "Zip": 3271,
            "Location": "Radelfingen b. Aarberg"
        },
        {
            "Zip": 3272,
            "Location": "Epsach"
        },
        {
            "Zip": 3272,
            "Location": "Walperswil"
        },
        {
            "Zip": 3273,
            "Location": "Kappelen"
        },
        {
            "Zip": 3274,
            "Location": "Bühl b. Aarberg"
        },
        {
            "Zip": 3274,
            "Location": "Hermrigen"
        },
        {
            "Zip": 3274,
            "Location": "Merzligen"
        },
        {
            "Zip": 3280,
            "Location": "Greng"
        },
        {
            "Zip": 3280,
            "Location": "Meyriez"
        },
        {
            "Zip": 3280,
            "Location": "Murten"
        },
        {
            "Zip": 3280,
            "Location": "Murten Zustellung"
        },
        {
            "Zip": 3282,
            "Location": "Bargen BE"
        },
        {
            "Zip": 3283,
            "Location": "Kallnach"
        },
        {
            "Zip": 3283,
            "Location": "Niederried b. Kallnach"
        },
        {
            "Zip": 3284,
            "Location": "Fräschels"
        },
        {
            "Zip": 3285,
            "Location": "Galmiz"
        },
        {
            "Zip": 3286,
            "Location": "Muntelier"
        },
        {
            "Zip": 3292,
            "Location": "Busswil BE"
        },
        {
            "Zip": 3293,
            "Location": "Dotzigen"
        },
        {
            "Zip": 3294,
            "Location": "Büren an der Aare"
        },
        {
            "Zip": 3294,
            "Location": "Büren an der Aare Zust"
        },
        {
            "Zip": 3294,
            "Location": "Meienried"
        },
        {
            "Zip": 3295,
            "Location": "Rüti b. Büren"
        },
        {
            "Zip": 3296,
            "Location": "Arch"
        },
        {
            "Zip": 3297,
            "Location": "Leuzigen"
        },
        {
            "Zip": 3298,
            "Location": "Oberwil b. Büren"
        },
        {
            "Zip": 3302,
            "Location": "Moosseedorf"
        },
        {
            "Zip": 3303,
            "Location": "Ballmoos"
        },
        {
            "Zip": 3303,
            "Location": "Jegenstorf"
        },
        {
            "Zip": 3303,
            "Location": "Münchringen"
        },
        {
            "Zip": 3303,
            "Location": "Zuzwil BE"
        },
        {
            "Zip": 3305,
            "Location": "Iffwil"
        },
        {
            "Zip": 3305,
            "Location": "Scheunen"
        },
        {
            "Zip": 3306,
            "Location": "Etzelkofen"
        },
        {
            "Zip": 3307,
            "Location": "Brunnenthal"
        },
        {
            "Zip": 3308,
            "Location": "Grafenried"
        },
        {
            "Zip": 3309,
            "Location": "Kernenried"
        },
        {
            "Zip": 3309,
            "Location": "Zauggenried"
        },
        {
            "Zip": 3312,
            "Location": "Fraubrunnen"
        },
        {
            "Zip": 3313,
            "Location": "Büren zum Hof"
        },
        {
            "Zip": 3314,
            "Location": "Schalunen"
        },
        {
            "Zip": 3315,
            "Location": "Bätterkinden"
        },
        {
            "Zip": 3315,
            "Location": "Kräiligen"
        },
        {
            "Zip": 3317,
            "Location": "Limpach"
        },
        {
            "Zip": 3317,
            "Location": "Mülchi"
        },
        {
            "Zip": 3321,
            "Location": "Schönbühl Einkaufszentrum"
        },
        {
            "Zip": 3322,
            "Location": "Mattstetten"
        },
        {
            "Zip": 3322,
            "Location": "Urtenen-Schönbühl"
        },
        {
            "Zip": 3322,
            "Location": "Urtenen-Schönbühl Zust"
        },
        {
            "Zip": 3323,
            "Location": "Bäriswil BE"
        },
        {
            "Zip": 3324,
            "Location": "Hindelbank"
        },
        {
            "Zip": 3324,
            "Location": "Mötschwil"
        },
        {
            "Zip": 3325,
            "Location": "Hettiswil b. Hindelbank"
        },
        {
            "Zip": 3326,
            "Location": "Krauchthal"
        },
        {
            "Zip": 3360,
            "Location": "Herzogenbuchsee"
        },
        {
            "Zip": 3360,
            "Location": "Herzogenbuchsee Zustellung"
        },
        {
            "Zip": 3362,
            "Location": "Niederönz"
        },
        {
            "Zip": 3363,
            "Location": "Oberönz"
        },
        {
            "Zip": 3365,
            "Location": "Grasswil"
        },
        {
            "Zip": 3365,
            "Location": "Seeberg"
        },
        {
            "Zip": 3366,
            "Location": "Bettenhausen"
        },
        {
            "Zip": 3366,
            "Location": "Bollodingen"
        },
        {
            "Zip": 3367,
            "Location": "Ochlenberg"
        },
        {
            "Zip": 3367,
            "Location": "Thörigen"
        },
        {
            "Zip": 3368,
            "Location": "Bleienbach"
        },
        {
            "Zip": 3372,
            "Location": "Wanzwil"
        },
        {
            "Zip": 3373,
            "Location": "Heimenhausen"
        },
        {
            "Zip": 3373,
            "Location": "Röthenbach Herzogenbuchsee"
        },
        {
            "Zip": 3374,
            "Location": "Wangenried"
        },
        {
            "Zip": 3375,
            "Location": "Inkwil"
        },
        {
            "Zip": 3376,
            "Location": "Berken"
        },
        {
            "Zip": 3376,
            "Location": "Graben"
        },
        {
            "Zip": 3377,
            "Location": "Walliswil b. Wangen"
        },
        {
            "Zip": 3380,
            "Location": "Walliswil b. Niederbipp"
        },
        {
            "Zip": 3380,
            "Location": "Wangen a. A. Kaserne"
        },
        {
            "Zip": 3380,
            "Location": "Wangen an der Aare"
        },
        {
            "Zip": 3400,
            "Location": "Burgdorf"
        },
        {
            "Zip": 3400,
            "Location": "Burgdorf 1"
        },
        {
            "Zip": 3400,
            "Location": "Burgdorf Bahnhofstrasse"
        },
        {
            "Zip": 3400,
            "Location": "Burgdorf Dist Fil"
        },
        {
            "Zip": 3400,
            "Location": "Burgdorf Filiale"
        },
        {
            "Zip": 3400,
            "Location": "Burgdorf PostFinance mob"
        },
        {
            "Zip": 3400,
            "Location": "Burgdorf Zustellung"
        },
        {
            "Zip": 3401,
            "Location": "Burgdorf"
        },
        {
            "Zip": 3402,
            "Location": "Burgdorf"
        },
        {
            "Zip": 3412,
            "Location": "Heimiswil"
        },
        {
            "Zip": 3413,
            "Location": "Kaltacker"
        },
        {
            "Zip": 3414,
            "Location": "Oberburg"
        },
        {
            "Zip": 3415,
            "Location": "Hasle b. Burgdorf"
        },
        {
            "Zip": 3415,
            "Location": "Hasle-Rüegsau"
        },
        {
            "Zip": 3415,
            "Location": "Hasle-Rüegsau Zustellung"
        },
        {
            "Zip": 3415,
            "Location": "Rüegsauschachen"
        },
        {
            "Zip": 3415,
            "Location": "Schafhausen im Emmental"
        },
        {
            "Zip": 3416,
            "Location": "Affoltern im Emmental"
        },
        {
            "Zip": 3417,
            "Location": "Rüegsau"
        },
        {
            "Zip": 3418,
            "Location": "Rüegsbach"
        },
        {
            "Zip": 3419,
            "Location": "Biembach im Emmental"
        },
        {
            "Zip": 3421,
            "Location": "Lyssach"
        },
        {
            "Zip": 3421,
            "Location": "Rüti b. Lyssach"
        },
        {
            "Zip": 3422,
            "Location": "Alchenflüh"
        },
        {
            "Zip": 3422,
            "Location": "Kirchberg BE"
        },
        {
            "Zip": 3422,
            "Location": "Kirchberg BE Zustellung"
        },
        {
            "Zip": 3422,
            "Location": "Rüdtligen"
        },
        {
            "Zip": 3423,
            "Location": "Ersigen"
        },
        {
            "Zip": 3424,
            "Location": "Niederösch"
        },
        {
            "Zip": 3424,
            "Location": "Oberösch"
        },
        {
            "Zip": 3425,
            "Location": "Koppigen"
        },
        {
            "Zip": 3425,
            "Location": "Willadingen"
        },
        {
            "Zip": 3426,
            "Location": "Aefligen"
        },
        {
            "Zip": 3427,
            "Location": "Utzenstorf"
        },
        {
            "Zip": 3428,
            "Location": "Wiler b. Utzenstorf"
        },
        {
            "Zip": 3429,
            "Location": "Hellsau"
        },
        {
            "Zip": 3429,
            "Location": "Höchstetten"
        },
        {
            "Zip": 3429,
            "Location": "Höchstetten-Hellsau"
        },
        {
            "Zip": 3432,
            "Location": "Lützelflüh-Goldbach"
        },
        {
            "Zip": 3433,
            "Location": "Schwanden im Emmental"
        },
        {
            "Zip": 3434,
            "Location": "Landiswil"
        },
        {
            "Zip": 3434,
            "Location": "Obergoldbach"
        },
        {
            "Zip": 3435,
            "Location": "Ramsei"
        },
        {
            "Zip": 3436,
            "Location": "Zollbrück"
        },
        {
            "Zip": 3437,
            "Location": "Rüderswil"
        },
        {
            "Zip": 3438,
            "Location": "Lauperswil"
        },
        {
            "Zip": 3439,
            "Location": "Ranflüh"
        },
        {
            "Zip": 3452,
            "Location": "Grünenmatt"
        },
        {
            "Zip": 3453,
            "Location": "Heimisbach"
        },
        {
            "Zip": 3454,
            "Location": "Sumiswald"
        },
        {
            "Zip": 3454,
            "Location": "Sumiswald Zustellung"
        },
        {
            "Zip": 3455,
            "Location": "Grünen"
        },
        {
            "Zip": 3456,
            "Location": "Trachselwald"
        },
        {
            "Zip": 3457,
            "Location": "Wasen im Emmental"
        },
        {
            "Zip": 3462,
            "Location": "Weier im Emmental"
        },
        {
            "Zip": 3463,
            "Location": "Häusernmoos im Emmental"
        },
        {
            "Zip": 3464,
            "Location": "Schmidigen-Mühleweg"
        },
        {
            "Zip": 3465,
            "Location": "Dürrenroth"
        },
        {
            "Zip": 3472,
            "Location": "Rumendingen"
        },
        {
            "Zip": 3472,
            "Location": "Wynigen"
        },
        {
            "Zip": 3473,
            "Location": "Alchenstorf"
        },
        {
            "Zip": 3474,
            "Location": "Rüedisbach"
        },
        {
            "Zip": 3475,
            "Location": "Hermiswil"
        },
        {
            "Zip": 3475,
            "Location": "Riedtwil"
        },
        {
            "Zip": 3476,
            "Location": "Oschwand"
        },
        {
            "Zip": 3503,
            "Location": "Gysenstein"
        },
        {
            "Zip": 3504,
            "Location": "Niederhünigen"
        },
        {
            "Zip": 3504,
            "Location": "Oberhünigen"
        },
        {
            "Zip": 3506,
            "Location": "Grosshöchstetten"
        },
        {
            "Zip": 3507,
            "Location": "Biglen"
        },
        {
            "Zip": 3508,
            "Location": "Arni BE"
        },
        {
            "Zip": 3510,
            "Location": "Freimettigen"
        },
        {
            "Zip": 3510,
            "Location": "Häutligen"
        },
        {
            "Zip": 3510,
            "Location": "Konolfingen"
        },
        {
            "Zip": 3512,
            "Location": "Walkringen"
        },
        {
            "Zip": 3513,
            "Location": "Bigenthal"
        },
        {
            "Zip": 3531,
            "Location": "Oberthal"
        },
        {
            "Zip": 3532,
            "Location": "Mirchel"
        },
        {
            "Zip": 3532,
            "Location": "Zäziwil"
        },
        {
            "Zip": 3533,
            "Location": "Bowil"
        },
        {
            "Zip": 3534,
            "Location": "Signau"
        },
        {
            "Zip": 3535,
            "Location": "Schüpbach"
        },
        {
            "Zip": 3536,
            "Location": "Aeschau"
        },
        {
            "Zip": 3537,
            "Location": "Eggiwil"
        },
        {
            "Zip": 3537,
            "Location": "Eggiwil Zustellung"
        },
        {
            "Zip": 3538,
            "Location": "Röthenbach im Emmental"
        },
        {
            "Zip": 3543,
            "Location": "Emmenmatt"
        },
        {
            "Zip": 3550,
            "Location": "Langnau i. E. Zustellung"
        },
        {
            "Zip": 3550,
            "Location": "Langnau im Emmental"
        },
        {
            "Zip": 3551,
            "Location": "Oberfrittenbach"
        },
        {
            "Zip": 3552,
            "Location": "Bärau"
        },
        {
            "Zip": 3553,
            "Location": "Gohl"
        },
        {
            "Zip": 3555,
            "Location": "Trubschachen"
        },
        {
            "Zip": 3556,
            "Location": "Trub"
        },
        {
            "Zip": 3557,
            "Location": "Fankhaus (Trub)"
        },
        {
            "Zip": 3600,
            "Location": "Thun"
        },
        {
            "Zip": 3600,
            "Location": "Thun 2 Zustellung"
        },
        {
            "Zip": 3600,
            "Location": "Thun Dist Ba"
        },
        {
            "Zip": 3600,
            "Location": "Thun Güterbahnhof"
        },
        {
            "Zip": 3601,
            "Location": "Thun"
        },
        {
            "Zip": 3602,
            "Location": "Thun"
        },
        {
            "Zip": 3603,
            "Location": "Thun"
        },
        {
            "Zip": 3604,
            "Location": "Thun"
        },
        {
            "Zip": 3605,
            "Location": "Thun"
        },
        {
            "Zip": 3607,
            "Location": "Thun"
        },
        {
            "Zip": 3608,
            "Location": "Thun"
        },
        {
            "Zip": 3609,
            "Location": "Thun"
        },
        {
            "Zip": 3612,
            "Location": "Steffisburg"
        },
        {
            "Zip": 3612,
            "Location": "Steffisburg 1 Zustellung"
        },
        {
            "Zip": 3613,
            "Location": "Steffisburg"
        },
        {
            "Zip": 3613,
            "Location": "Steffisburg alte Bernstr"
        },
        {
            "Zip": 3614,
            "Location": "Unterlangenegg"
        },
        {
            "Zip": 3615,
            "Location": "Heimenschwand"
        },
        {
            "Zip": 3616,
            "Location": "Schwarzenegg"
        },
        {
            "Zip": 3617,
            "Location": "Fahrni b. Thun"
        },
        {
            "Zip": 3618,
            "Location": "Süderen"
        },
        {
            "Zip": 3619,
            "Location": "Eriz"
        },
        {
            "Zip": 3619,
            "Location": "Innereriz"
        },
        {
            "Zip": 3622,
            "Location": "Homberg b. Thun"
        },
        {
            "Zip": 3623,
            "Location": "Buchen BE"
        },
        {
            "Zip": 3623,
            "Location": "Horrenbach"
        },
        {
            "Zip": 3623,
            "Location": "Teuffenthal b. Thun"
        },
        {
            "Zip": 3624,
            "Location": "Goldiwil (Thun)"
        },
        {
            "Zip": 3624,
            "Location": "Schwendibach"
        },
        {
            "Zip": 3625,
            "Location": "Heiligenschwendi"
        },
        {
            "Zip": 3626,
            "Location": "Hünibach"
        },
        {
            "Zip": 3627,
            "Location": "Heimberg"
        },
        {
            "Zip": 3628,
            "Location": "Uttigen"
        },
        {
            "Zip": 3629,
            "Location": "Jaberg"
        },
        {
            "Zip": 3629,
            "Location": "Kiesen"
        },
        {
            "Zip": 3629,
            "Location": "Oppligen"
        },
        {
            "Zip": 3631,
            "Location": "Höfen b. Thun"
        },
        {
            "Zip": 3632,
            "Location": "Niederstocken"
        },
        {
            "Zip": 3632,
            "Location": "Oberstocken"
        },
        {
            "Zip": 3633,
            "Location": "Amsoldingen"
        },
        {
            "Zip": 3634,
            "Location": "Thierachern"
        },
        {
            "Zip": 3635,
            "Location": "Uebeschi"
        },
        {
            "Zip": 3636,
            "Location": "Forst b. Längenbühl"
        },
        {
            "Zip": 3636,
            "Location": "Längenbühl"
        },
        {
            "Zip": 3638,
            "Location": "Blumenstein"
        },
        {
            "Zip": 3638,
            "Location": "Pohlern"
        },
        {
            "Zip": 3645,
            "Location": "Gwatt (Thun)"
        },
        {
            "Zip": 3645,
            "Location": "Gwatt (Thun) Lohnerstrasse"
        },
        {
            "Zip": 3645,
            "Location": "Zwieselberg"
        },
        {
            "Zip": 3646,
            "Location": "Einigen"
        },
        {
            "Zip": 3647,
            "Location": "Reutigen"
        },
        {
            "Zip": 3652,
            "Location": "Hilterfingen"
        },
        {
            "Zip": 3653,
            "Location": "Oberhofen am Thunersee"
        },
        {
            "Zip": 3654,
            "Location": "Gunten"
        },
        {
            "Zip": 3655,
            "Location": "Sigriswil"
        },
        {
            "Zip": 3656,
            "Location": "Aeschlen ob Gunten"
        },
        {
            "Zip": 3656,
            "Location": "Ringoldswil"
        },
        {
            "Zip": 3656,
            "Location": "Tschingel ob Gunten"
        },
        {
            "Zip": 3657,
            "Location": "Schwanden (Sigriswil)"
        },
        {
            "Zip": 3658,
            "Location": "Merligen"
        },
        {
            "Zip": 3661,
            "Location": "Uetendorf"
        },
        {
            "Zip": 3661,
            "Location": "Uetendorf Zustellung"
        },
        {
            "Zip": 3662,
            "Location": "Seftigen"
        },
        {
            "Zip": 3663,
            "Location": "Gurzelen"
        },
        {
            "Zip": 3664,
            "Location": "Burgistein"
        },
        {
            "Zip": 3665,
            "Location": "Wattenwil"
        },
        {
            "Zip": 3671,
            "Location": "Brenzikofen"
        },
        {
            "Zip": 3671,
            "Location": "Herbligen"
        },
        {
            "Zip": 3672,
            "Location": "Aeschlen b. Oberdiessbach"
        },
        {
            "Zip": 3672,
            "Location": "Oberdiessbach"
        },
        {
            "Zip": 3673,
            "Location": "Linden"
        },
        {
            "Zip": 3674,
            "Location": "Bleiken b. Oberdiessbach"
        },
        {
            "Zip": 3700,
            "Location": "Spiez"
        },
        {
            "Zip": 3700,
            "Location": "Spiez Zustellung"
        },
        {
            "Zip": 3700,
            "Location": "Spiezwiler"
        },
        {
            "Zip": 3702,
            "Location": "Hondrich"
        },
        {
            "Zip": 3703,
            "Location": "Aeschi b. Spiez"
        },
        {
            "Zip": 3703,
            "Location": "Aeschiried"
        },
        {
            "Zip": 3704,
            "Location": "Krattigen"
        },
        {
            "Zip": 3705,
            "Location": "Faulensee"
        },
        {
            "Zip": 3706,
            "Location": "Leissigen"
        },
        {
            "Zip": 3707,
            "Location": "Därligen"
        },
        {
            "Zip": 3711,
            "Location": "Emdthal"
        },
        {
            "Zip": 3711,
            "Location": "Mülenen"
        },
        {
            "Zip": 3713,
            "Location": "Reichenbach im Kandertal"
        },
        {
            "Zip": 3714,
            "Location": "Frutigen"
        },
        {
            "Zip": 3714,
            "Location": "Frutigen Zustellung"
        },
        {
            "Zip": 3714,
            "Location": "Wengi b. Frutigen"
        },
        {
            "Zip": 3715,
            "Location": "Adelboden"
        },
        {
            "Zip": 3715,
            "Location": "Adelboden Zustellung"
        },
        {
            "Zip": 3716,
            "Location": "Kandergrund"
        },
        {
            "Zip": 3717,
            "Location": "Blausee-Mitholz"
        },
        {
            "Zip": 3718,
            "Location": "Kandersteg"
        },
        {
            "Zip": 3722,
            "Location": "Scharnachtal"
        },
        {
            "Zip": 3723,
            "Location": "Kiental"
        },
        {
            "Zip": 3724,
            "Location": "Ried (Frutigen)"
        },
        {
            "Zip": 3725,
            "Location": "Achseten"
        },
        {
            "Zip": 3752,
            "Location": "Wimmis"
        },
        {
            "Zip": 3753,
            "Location": "Oey"
        },
        {
            "Zip": 3754,
            "Location": "Diemtigen"
        },
        {
            "Zip": 3755,
            "Location": "Horboden"
        },
        {
            "Zip": 3756,
            "Location": "Zwischenflüh"
        },
        {
            "Zip": 3757,
            "Location": "Schwenden im Diemtigtal"
        },
        {
            "Zip": 3758,
            "Location": "Latterbach"
        },
        {
            "Zip": 3762,
            "Location": "Erlenbach im Simmental"
        },
        {
            "Zip": 3763,
            "Location": "Därstetten"
        },
        {
            "Zip": 3764,
            "Location": "Weissenburg"
        },
        {
            "Zip": 3765,
            "Location": "Oberwil im Simmental"
        },
        {
            "Zip": 3766,
            "Location": "Boltigen"
        },
        {
            "Zip": 3770,
            "Location": "Zweisimmen"
        },
        {
            "Zip": 3770,
            "Location": "Zweisimmen Zustellung"
        },
        {
            "Zip": 3771,
            "Location": "Blankenburg"
        },
        {
            "Zip": 3772,
            "Location": "St. Stephan"
        },
        {
            "Zip": 3773,
            "Location": "Matten (St. Stephan)"
        },
        {
            "Zip": 3775,
            "Location": "Lenk i. S. Zustellung"
        },
        {
            "Zip": 3775,
            "Location": "Lenk im Simmental"
        },
        {
            "Zip": 3776,
            "Location": "Oeschseite"
        },
        {
            "Zip": 3777,
            "Location": "Saanenmöser"
        },
        {
            "Zip": 3778,
            "Location": "Schönried"
        },
        {
            "Zip": 3780,
            "Location": "Gstaad"
        },
        {
            "Zip": 3780,
            "Location": "Gstaad Zustellung"
        },
        {
            "Zip": 3781,
            "Location": "Turbach"
        },
        {
            "Zip": 3782,
            "Location": "Lauenen b. Gstaad"
        },
        {
            "Zip": 3783,
            "Location": "Grund b. Gstaad"
        },
        {
            "Zip": 3784,
            "Location": "Feutersoey"
        },
        {
            "Zip": 3785,
            "Location": "Gsteig b. Gstaad"
        },
        {
            "Zip": 3792,
            "Location": "Saanen"
        },
        {
            "Zip": 3800,
            "Location": "Interlaken"
        },
        {
            "Zip": 3800,
            "Location": "Interlaken Bönigstrasse"
        },
        {
            "Zip": 3800,
            "Location": "Interlaken Postauto BE Ober"
        },
        {
            "Zip": 3800,
            "Location": "Interlaken Zustellung"
        },
        {
            "Zip": 3800,
            "Location": "Matten b. Interlaken"
        },
        {
            "Zip": 3800,
            "Location": "Sundlauenen"
        },
        {
            "Zip": 3800,
            "Location": "Unterseen"
        },
        {
            "Zip": 3801,
            "Location": "Jungfraujoch"
        },
        {
            "Zip": 3802,
            "Location": "Interlaken Ost"
        },
        {
            "Zip": 3803,
            "Location": "Beatenberg"
        },
        {
            "Zip": 3804,
            "Location": "Habkern"
        },
        {
            "Zip": 3805,
            "Location": "Goldswil b. Interlaken"
        },
        {
            "Zip": 3806,
            "Location": "Bönigen b. Interlaken"
        },
        {
            "Zip": 3807,
            "Location": "Iseltwald"
        },
        {
            "Zip": 3812,
            "Location": "Wilderswil"
        },
        {
            "Zip": 3813,
            "Location": "Saxeten"
        },
        {
            "Zip": 3814,
            "Location": "Gsteigwiler"
        },
        {
            "Zip": 3815,
            "Location": "Gündlischwand"
        },
        {
            "Zip": 3815,
            "Location": "Zweilütschinen"
        },
        {
            "Zip": 3816,
            "Location": "Burglauenen"
        },
        {
            "Zip": 3816,
            "Location": "Lütschental"
        },
        {
            "Zip": 3818,
            "Location": "Grindelwald"
        },
        {
            "Zip": 3818,
            "Location": "Grindelwald Zustellung"
        },
        {
            "Zip": 3822,
            "Location": "Isenfluh"
        },
        {
            "Zip": 3822,
            "Location": "Lauterbrunnen"
        },
        {
            "Zip": 3823,
            "Location": "Eigergletscher"
        },
        {
            "Zip": 3823,
            "Location": "Kleine Scheidegg"
        },
        {
            "Zip": 3823,
            "Location": "Wengen"
        },
        {
            "Zip": 3824,
            "Location": "Stechelberg"
        },
        {
            "Zip": 3825,
            "Location": "Mürren"
        },
        {
            "Zip": 3826,
            "Location": "Gimmelwald"
        },
        {
            "Zip": 3852,
            "Location": "Ringgenberg BE"
        },
        {
            "Zip": 3853,
            "Location": "Niederried b. Interlaken"
        },
        {
            "Zip": 3854,
            "Location": "Oberried am Brienzersee"
        },
        {
            "Zip": 3855,
            "Location": "Axalp"
        },
        {
            "Zip": 3855,
            "Location": "Brienz BE"
        },
        {
            "Zip": 3855,
            "Location": "Brienz BE Zustellung"
        },
        {
            "Zip": 3855,
            "Location": "Schwanden b. Brienz"
        },
        {
            "Zip": 3856,
            "Location": "Brienzwiler"
        },
        {
            "Zip": 3857,
            "Location": "Unterbach BE"
        },
        {
            "Zip": 3858,
            "Location": "Hofstetten b. Brienz"
        },
        {
            "Zip": 3860,
            "Location": "Brünig"
        },
        {
            "Zip": 3860,
            "Location": "Meiringen"
        },
        {
            "Zip": 3860,
            "Location": "Meiringen Zustellung"
        },
        {
            "Zip": 3860,
            "Location": "Rosenlaui"
        },
        {
            "Zip": 3860,
            "Location": "Schattenhalb"
        },
        {
            "Zip": 3862,
            "Location": "Innertkirchen"
        },
        {
            "Zip": 3863,
            "Location": "Gadmen"
        },
        {
            "Zip": 3864,
            "Location": "Guttannen"
        },
        {
            "Zip": 3900,
            "Location": "Brig"
        },
        {
            "Zip": 3900,
            "Location": "Brig Distributionsbasis"
        },
        {
            "Zip": 3900,
            "Location": "Brig Postauto Oberwallis"
        },
        {
            "Zip": 3900,
            "Location": "Brig Zustellung"
        },
        {
            "Zip": 3900,
            "Location": "Brigerbad"
        },
        {
            "Zip": 3900,
            "Location": "Gamsen"
        },
        {
            "Zip": 3901,
            "Location": "Rothwald"
        },
        {
            "Zip": 3902,
            "Location": "Glis"
        },
        {
            "Zip": 3903,
            "Location": "Birgisch"
        },
        {
            "Zip": 3903,
            "Location": "Mund"
        },
        {
            "Zip": 3904,
            "Location": "Naters"
        },
        {
            "Zip": 3905,
            "Location": "Saas-Almagell"
        },
        {
            "Zip": 3906,
            "Location": "Saas-Fee"
        },
        {
            "Zip": 3907,
            "Location": "Gabi (Simplon)"
        },
        {
            "Zip": 3907,
            "Location": "Gondo"
        },
        {
            "Zip": 3907,
            "Location": "Simplon Dorf"
        },
        {
            "Zip": 3907,
            "Location": "Simplon Hospiz"
        },
        {
            "Zip": 3908,
            "Location": "Saas-Balen"
        },
        {
            "Zip": 3910,
            "Location": "Saas-Grund"
        },
        {
            "Zip": 3911,
            "Location": "Ried-Brig"
        },
        {
            "Zip": 3912,
            "Location": "Termen"
        },
        {
            "Zip": 3913,
            "Location": "Rosswald"
        },
        {
            "Zip": 3914,
            "Location": "Belalp"
        },
        {
            "Zip": 3914,
            "Location": "Blatten b. Naters"
        },
        {
            "Zip": 3916,
            "Location": "Ferden"
        },
        {
            "Zip": 3917,
            "Location": "Goppenstein"
        },
        {
            "Zip": 3917,
            "Location": "Kippel"
        },
        {
            "Zip": 3918,
            "Location": "Wiler (Lötschen)"
        },
        {
            "Zip": 3919,
            "Location": "Blatten (Lötschen)"
        },
        {
            "Zip": 3920,
            "Location": "Zermatt"
        },
        {
            "Zip": 3920,
            "Location": "Zermatt Zustellung"
        },
        {
            "Zip": 3922,
            "Location": "Eisten"
        },
        {
            "Zip": 3922,
            "Location": "Kalpetran"
        },
        {
            "Zip": 3922,
            "Location": "Stalden VS"
        },
        {
            "Zip": 3923,
            "Location": "Törbel"
        },
        {
            "Zip": 3924,
            "Location": "St. Niklaus VS"
        },
        {
            "Zip": 3925,
            "Location": "Grächen"
        },
        {
            "Zip": 3926,
            "Location": "Embd"
        },
        {
            "Zip": 3927,
            "Location": "Herbriggen"
        },
        {
            "Zip": 3928,
            "Location": "Randa"
        },
        {
            "Zip": 3929,
            "Location": "Täsch"
        },
        {
            "Zip": 3930,
            "Location": "Eyholz"
        },
        {
            "Zip": 3930,
            "Location": "Visp"
        },
        {
            "Zip": 3930,
            "Location": "Visp Verkaufssupport"
        },
        {
            "Zip": 3931,
            "Location": "Lalden"
        },
        {
            "Zip": 3932,
            "Location": "Visperterminen"
        },
        {
            "Zip": 3933,
            "Location": "Staldenried"
        },
        {
            "Zip": 3934,
            "Location": "Zeneggen"
        },
        {
            "Zip": 3935,
            "Location": "Bürchen"
        },
        {
            "Zip": 3937,
            "Location": "Baltschieder"
        },
        {
            "Zip": 3938,
            "Location": "Ausserberg"
        },
        {
            "Zip": 3939,
            "Location": "Eggerberg"
        },
        {
            "Zip": 3940,
            "Location": "Steg VS"
        },
        {
            "Zip": 3940,
            "Location": "Steg-Gampel"
        },
        {
            "Zip": 3942,
            "Location": "Niedergesteln"
        },
        {
            "Zip": 3942,
            "Location": "Raron"
        },
        {
            "Zip": 3942,
            "Location": "St. German"
        },
        {
            "Zip": 3943,
            "Location": "Eischoll"
        },
        {
            "Zip": 3944,
            "Location": "Unterbäch VS"
        },
        {
            "Zip": 3945,
            "Location": "Gampel"
        },
        {
            "Zip": 3945,
            "Location": "Niedergampel"
        },
        {
            "Zip": 3946,
            "Location": "Gruben"
        },
        {
            "Zip": 3946,
            "Location": "Turtmann"
        },
        {
            "Zip": 3947,
            "Location": "Ergisch"
        },
        {
            "Zip": 3948,
            "Location": "Oberems"
        },
        {
            "Zip": 3948,
            "Location": "Unterems"
        },
        {
            "Zip": 3949,
            "Location": "Hohtenn"
        },
        {
            "Zip": 3951,
            "Location": "Agarn"
        },
        {
            "Zip": 3952,
            "Location": "Susten"
        },
        {
            "Zip": 3953,
            "Location": "Inden"
        },
        {
            "Zip": 3953,
            "Location": "Leuk Stadt"
        },
        {
            "Zip": 3953,
            "Location": "Varen"
        },
        {
            "Zip": 3954,
            "Location": "Leukerbad"
        },
        {
            "Zip": 3955,
            "Location": "Albinen"
        },
        {
            "Zip": 3956,
            "Location": "Guttet-Feschel"
        },
        {
            "Zip": 3957,
            "Location": "Bratsch"
        },
        {
            "Zip": 3957,
            "Location": "Erschmatt"
        },
        {
            "Zip": 3960,
            "Location": "Corin-de-la-Crête"
        },
        {
            "Zip": 3960,
            "Location": "Loc"
        },
        {
            "Zip": 3960,
            "Location": "Muraz (Sierre)"
        },
        {
            "Zip": 3960,
            "Location": "Niouc"
        },
        {
            "Zip": 3960,
            "Location": "Sierre"
        },
        {
            "Zip": 3960,
            "Location": "Sierre Distribution"
        },
        {
            "Zip": 3960,
            "Location": "Sierre Hub de distribution"
        },
        {
            "Zip": 3961,
            "Location": "Ayer"
        },
        {
            "Zip": 3961,
            "Location": "Chandolin"
        },
        {
            "Zip": 3961,
            "Location": "Grimentz"
        },
        {
            "Zip": 3961,
            "Location": "Mission"
        },
        {
            "Zip": 3961,
            "Location": "St-Jean VS"
        },
        {
            "Zip": 3961,
            "Location": "St-Luc"
        },
        {
            "Zip": 3961,
            "Location": "Vissoie"
        },
        {
            "Zip": 3961,
            "Location": "Zinal"
        },
        {
            "Zip": 3963,
            "Location": "Aminona"
        },
        {
            "Zip": 3963,
            "Location": "Crans-Montana"
        },
        {
            "Zip": 3963,
            "Location": "Crans-Montana 1"
        },
        {
            "Zip": 3963,
            "Location": "Crans-Montana 1 Dist"
        },
        {
            "Zip": 3963,
            "Location": "Crans-Montana 2"
        },
        {
            "Zip": 3963,
            "Location": "Crans-sur-Sierre"
        },
        {
            "Zip": 3963,
            "Location": "Montana"
        },
        {
            "Zip": 3965,
            "Location": "Chippis"
        },
        {
            "Zip": 3966,
            "Location": "Chalais"
        },
        {
            "Zip": 3966,
            "Location": "Réchy"
        },
        {
            "Zip": 3967,
            "Location": "Vercorin"
        },
        {
            "Zip": 3968,
            "Location": "Veyras"
        },
        {
            "Zip": 3970,
            "Location": "Salgesch"
        },
        {
            "Zip": 3971,
            "Location": "Chermignon"
        },
        {
            "Zip": 3971,
            "Location": "Chermignon-d'en-Bas"
        },
        {
            "Zip": 3971,
            "Location": "Ollon VS"
        },
        {
            "Zip": 3972,
            "Location": "Miège"
        },
        {
            "Zip": 3973,
            "Location": "Venthône"
        },
        {
            "Zip": 3974,
            "Location": "Mollens VS"
        },
        {
            "Zip": 3975,
            "Location": "Randogne"
        },
        {
            "Zip": 3976,
            "Location": "Champzabé"
        },
        {
            "Zip": 3976,
            "Location": "Noës"
        },
        {
            "Zip": 3977,
            "Location": "Granges VS"
        },
        {
            "Zip": 3977,
            "Location": "Granges VS Distribution"
        },
        {
            "Zip": 3978,
            "Location": "Flanthey"
        },
        {
            "Zip": 3979,
            "Location": "Grône"
        },
        {
            "Zip": 3982,
            "Location": "Bitsch"
        },
        {
            "Zip": 3983,
            "Location": "Bister"
        },
        {
            "Zip": 3983,
            "Location": "Filet"
        },
        {
            "Zip": 3983,
            "Location": "Goppisberg"
        },
        {
            "Zip": 3983,
            "Location": "Greich"
        },
        {
            "Zip": 3983,
            "Location": "Mörel"
        },
        {
            "Zip": 3984,
            "Location": "Fiesch"
        },
        {
            "Zip": 3984,
            "Location": "Fieschertal"
        },
        {
            "Zip": 3985,
            "Location": "Geschinen"
        },
        {
            "Zip": 3985,
            "Location": "Münster VS"
        },
        {
            "Zip": 3986,
            "Location": "Ried-Mörel"
        },
        {
            "Zip": 3987,
            "Location": "Riederalp"
        },
        {
            "Zip": 3988,
            "Location": "Obergesteln"
        },
        {
            "Zip": 3988,
            "Location": "Ulrichen"
        },
        {
            "Zip": 3989,
            "Location": "Biel VS"
        },
        {
            "Zip": 3989,
            "Location": "Blitzingen"
        },
        {
            "Zip": 3989,
            "Location": "Grafschaft"
        },
        {
            "Zip": 3989,
            "Location": "Niederwald"
        },
        {
            "Zip": 3989,
            "Location": "Ritzingen"
        },
        {
            "Zip": 3989,
            "Location": "Selkingen"
        },
        {
            "Zip": 3991,
            "Location": "Betten"
        },
        {
            "Zip": 3992,
            "Location": "Bettmeralp"
        },
        {
            "Zip": 3993,
            "Location": "Grengiols"
        },
        {
            "Zip": 3994,
            "Location": "Lax"
        },
        {
            "Zip": 3994,
            "Location": "Martisberg"
        },
        {
            "Zip": 3995,
            "Location": "Ausserbinn"
        },
        {
            "Zip": 3995,
            "Location": "Ernen"
        },
        {
            "Zip": 3995,
            "Location": "Mühlebach (Goms)"
        },
        {
            "Zip": 3995,
            "Location": "Steinhaus"
        },
        {
            "Zip": 3996,
            "Location": "Binn"
        },
        {
            "Zip": 3997,
            "Location": "Bellwald"
        },
        {
            "Zip": 3998,
            "Location": "Gluringen"
        },
        {
            "Zip": 3998,
            "Location": "Reckingen VS"
        },
        {
            "Zip": 3999,
            "Location": "Oberwald"
        },
        {
            "Zip": 4000,
            "Location": "Basel"
        },
        {
            "Zip": 4000,
            "Location": "Basel 2 Zustellung"
        },
        {
            "Zip": 4000,
            "Location": "Basel Dist Ba"
        },
        {
            "Zip": 4000,
            "Location": "Basel Postauto Nordwestschw"
        },
        {
            "Zip": 4001,
            "Location": "Basel"
        },
        {
            "Zip": 4002,
            "Location": "Basel"
        },
        {
            "Zip": 4002,
            "Location": "Basel 2 Annahme"
        },
        {
            "Zip": 4002,
            "Location": "Basel Logistikzentrum"
        },
        {
            "Zip": 4002,
            "Location": "Basel SPS"
        },
        {
            "Zip": 4003,
            "Location": "Basel"
        },
        {
            "Zip": 4004,
            "Location": "Basel"
        },
        {
            "Zip": 4005,
            "Location": "Basel"
        },
        {
            "Zip": 4007,
            "Location": "Basel"
        },
        {
            "Zip": 4009,
            "Location": "Basel"
        },
        {
            "Zip": 4010,
            "Location": "Basel"
        },
        {
            "Zip": 4011,
            "Location": "Basel"
        },
        {
            "Zip": 4012,
            "Location": "Basel"
        },
        {
            "Zip": 4013,
            "Location": "Basel"
        },
        {
            "Zip": 4015,
            "Location": "Basel"
        },
        {
            "Zip": 4016,
            "Location": "Basel"
        },
        {
            "Zip": 4017,
            "Location": "Basel"
        },
        {
            "Zip": 4018,
            "Location": "Basel"
        },
        {
            "Zip": 4019,
            "Location": "Basel"
        },
        {
            "Zip": 4020,
            "Location": "Basel"
        },
        {
            "Zip": 4024,
            "Location": "Basel"
        },
        {
            "Zip": 4025,
            "Location": "Basel"
        },
        {
            "Zip": 4028,
            "Location": "Basel"
        },
        {
            "Zip": 4030,
            "Location": "Basel"
        },
        {
            "Zip": 4031,
            "Location": "Basel"
        },
        {
            "Zip": 4032,
            "Location": "Basel"
        },
        {
            "Zip": 4033,
            "Location": "Basel 33 Novartis"
        },
        {
            "Zip": 4034,
            "Location": "Basel 34 Breite"
        },
        {
            "Zip": 4035,
            "Location": "Basel 35 Bäumlihof"
        },
        {
            "Zip": 4039,
            "Location": "Basel"
        },
        {
            "Zip": 4040,
            "Location": "Basel"
        },
        {
            "Zip": 4041,
            "Location": "Basel UBS"
        },
        {
            "Zip": 4042,
            "Location": "Basel PF Operations Center"
        },
        {
            "Zip": 4051,
            "Location": "Basel"
        },
        {
            "Zip": 4052,
            "Location": "Basel"
        },
        {
            "Zip": 4053,
            "Location": "Basel"
        },
        {
            "Zip": 4054,
            "Location": "Basel"
        },
        {
            "Zip": 4055,
            "Location": "Basel"
        },
        {
            "Zip": 4056,
            "Location": "Basel"
        },
        {
            "Zip": 4057,
            "Location": "Basel"
        },
        {
            "Zip": 4058,
            "Location": "Basel"
        },
        {
            "Zip": 4059,
            "Location": "Basel"
        },
        {
            "Zip": 4070,
            "Location": "Basel"
        },
        {
            "Zip": 4075,
            "Location": "Basel"
        },
        {
            "Zip": 4089,
            "Location": "Basel SPI GLS Retour"
        },
        {
            "Zip": 4089,
            "Location": "Basel SPILOG"
        },
        {
            "Zip": 4091,
            "Location": "Basel"
        },
        {
            "Zip": 4101,
            "Location": "Bruderholz"
        },
        {
            "Zip": 4102,
            "Location": "Binningen"
        },
        {
            "Zip": 4102,
            "Location": "Binningen 1"
        },
        {
            "Zip": 4102,
            "Location": "Binningen Gorenmatt"
        },
        {
            "Zip": 4103,
            "Location": "Bottmingen"
        },
        {
            "Zip": 4104,
            "Location": "Oberwil BL"
        },
        {
            "Zip": 4104,
            "Location": "Oberwil BL Zustellung"
        },
        {
            "Zip": 4105,
            "Location": "Biel-Benken BL"
        },
        {
            "Zip": 4106,
            "Location": "Therwil"
        },
        {
            "Zip": 4106,
            "Location": "Therwil Zustellung"
        },
        {
            "Zip": 4107,
            "Location": "Ettingen"
        },
        {
            "Zip": 4108,
            "Location": "Witterswil"
        },
        {
            "Zip": 4112,
            "Location": "Bättwil"
        },
        {
            "Zip": 4112,
            "Location": "Bättwil-Flüh"
        },
        {
            "Zip": 4112,
            "Location": "Flüh"
        },
        {
            "Zip": 4114,
            "Location": "Hofstetten SO"
        },
        {
            "Zip": 4115,
            "Location": "Mariastein"
        },
        {
            "Zip": 4116,
            "Location": "Metzerlen"
        },
        {
            "Zip": 4117,
            "Location": "Burg im Leimental"
        },
        {
            "Zip": 4118,
            "Location": "Rodersdorf"
        },
        {
            "Zip": 4123,
            "Location": "Allschwil"
        },
        {
            "Zip": 4123,
            "Location": "Allschwil 1"
        },
        {
            "Zip": 4123,
            "Location": "Allschwil Dorf"
        },
        {
            "Zip": 4123,
            "Location": "Allschwil Lindenplatz"
        },
        {
            "Zip": 4123,
            "Location": "Allschwil Zustellung"
        },
        {
            "Zip": 4124,
            "Location": "Schönenbuch"
        },
        {
            "Zip": 4125,
            "Location": "Riehen"
        },
        {
            "Zip": 4125,
            "Location": "Riehen 1"
        },
        {
            "Zip": 4125,
            "Location": "Riehen 1 Zustellung"
        },
        {
            "Zip": 4125,
            "Location": "Riehen Rauracher"
        },
        {
            "Zip": 4126,
            "Location": "Bettingen"
        },
        {
            "Zip": 4127,
            "Location": "Birsfelden"
        },
        {
            "Zip": 4127,
            "Location": "Birsfelden Hauptstrasse"
        },
        {
            "Zip": 4132,
            "Location": "Muttenz"
        },
        {
            "Zip": 4132,
            "Location": "Muttenz 1"
        },
        {
            "Zip": 4132,
            "Location": "Muttenz 1 Zustellung"
        },
        {
            "Zip": 4132,
            "Location": "Muttenz Lutzert"
        },
        {
            "Zip": 4133,
            "Location": "Pratteln"
        },
        {
            "Zip": 4133,
            "Location": "Pratteln 1"
        },
        {
            "Zip": 4133,
            "Location": "Pratteln 1 Zustellung"
        },
        {
            "Zip": 4133,
            "Location": "Pratteln PL3"
        },
        {
            "Zip": 4133,
            "Location": "Pratteln SPI Logistics"
        },
        {
            "Zip": 4142,
            "Location": "Münchenstein"
        },
        {
            "Zip": 4142,
            "Location": "Münchenstein 1"
        },
        {
            "Zip": 4142,
            "Location": "Münchenstein 1 Zustellung"
        },
        {
            "Zip": 4142,
            "Location": "Münchenstein Zollweiden"
        },
        {
            "Zip": 4143,
            "Location": "Dornach"
        },
        {
            "Zip": 4144,
            "Location": "Arlesheim"
        },
        {
            "Zip": 4144,
            "Location": "Arlesheim Postlogistics Hub"
        },
        {
            "Zip": 4144,
            "Location": "Arlesheim Postplatz"
        },
        {
            "Zip": 4145,
            "Location": "Gempen"
        },
        {
            "Zip": 4146,
            "Location": "Hochwald"
        },
        {
            "Zip": 4147,
            "Location": "Aesch BL"
        },
        {
            "Zip": 4148,
            "Location": "Pfeffingen"
        },
        {
            "Zip": 4153,
            "Location": "Reinach BL"
        },
        {
            "Zip": 4153,
            "Location": "Reinach BL 1"
        },
        {
            "Zip": 4153,
            "Location": "Reinach BL Surbaum"
        },
        {
            "Zip": 4153,
            "Location": "Reinach BL Zustellung"
        },
        {
            "Zip": 4202,
            "Location": "Duggingen"
        },
        {
            "Zip": 4203,
            "Location": "Grellingen"
        },
        {
            "Zip": 4204,
            "Location": "Himmelried"
        },
        {
            "Zip": 4206,
            "Location": "Seewen SO"
        },
        {
            "Zip": 4207,
            "Location": "Bretzwil"
        },
        {
            "Zip": 4208,
            "Location": "Nunningen"
        },
        {
            "Zip": 4222,
            "Location": "Zwingen"
        },
        {
            "Zip": 4223,
            "Location": "Blauen"
        },
        {
            "Zip": 4224,
            "Location": "Nenzlingen"
        },
        {
            "Zip": 4225,
            "Location": "Brislach"
        },
        {
            "Zip": 4226,
            "Location": "Breitenbach"
        },
        {
            "Zip": 4227,
            "Location": "Büsserach"
        },
        {
            "Zip": 4228,
            "Location": "Erschwil"
        },
        {
            "Zip": 4229,
            "Location": "Beinwil SO"
        },
        {
            "Zip": 4232,
            "Location": "Fehren"
        },
        {
            "Zip": 4233,
            "Location": "Meltingen"
        },
        {
            "Zip": 4234,
            "Location": "Zullwil"
        },
        {
            "Zip": 4242,
            "Location": "Laufen"
        },
        {
            "Zip": 4242,
            "Location": "Laufen Zustellung"
        },
        {
            "Zip": 4243,
            "Location": "Dittingen"
        },
        {
            "Zip": 4244,
            "Location": "Röschenz"
        },
        {
            "Zip": 4245,
            "Location": "Kleinlützel"
        },
        {
            "Zip": 4246,
            "Location": "Wahlen b. Laufen"
        },
        {
            "Zip": 4247,
            "Location": "Grindel"
        },
        {
            "Zip": 4252,
            "Location": "Bärschwil"
        },
        {
            "Zip": 4252,
            "Location": "Bärschwil Dorf"
        },
        {
            "Zip": 4253,
            "Location": "Liesberg"
        },
        {
            "Zip": 4254,
            "Location": "Liesberg Dorf"
        },
        {
            "Zip": 4302,
            "Location": "Augst BL"
        },
        {
            "Zip": 4303,
            "Location": "Kaiseraugst"
        },
        {
            "Zip": 4303,
            "Location": "Kaiseraugst Liebrüti"
        },
        {
            "Zip": 4304,
            "Location": "Giebenach"
        },
        {
            "Zip": 4305,
            "Location": "Olsberg"
        },
        {
            "Zip": 4310,
            "Location": "Rheinfelden"
        },
        {
            "Zip": 4310,
            "Location": "Rheinfelden 1"
        },
        {
            "Zip": 4310,
            "Location": "Rheinfelden 1 Zustellung"
        },
        {
            "Zip": 4310,
            "Location": "Rheinfelden 2"
        },
        {
            "Zip": 4310,
            "Location": "Rheinfelden PostAuto AG"
        },
        {
            "Zip": 4310,
            "Location": "Rheinfelden SPI Logistics A"
        },
        {
            "Zip": 4312,
            "Location": "Magden"
        },
        {
            "Zip": 4313,
            "Location": "Möhlin"
        },
        {
            "Zip": 4313,
            "Location": "Möhlin Zustellung"
        },
        {
            "Zip": 4314,
            "Location": "Zeiningen"
        },
        {
            "Zip": 4315,
            "Location": "Zuzgen"
        },
        {
            "Zip": 4316,
            "Location": "Hellikon"
        },
        {
            "Zip": 4317,
            "Location": "Wegenstetten"
        },
        {
            "Zip": 4322,
            "Location": "Mumpf"
        },
        {
            "Zip": 4323,
            "Location": "Wallbach"
        },
        {
            "Zip": 4324,
            "Location": "Obermumpf"
        },
        {
            "Zip": 4325,
            "Location": "Schupfart"
        },
        {
            "Zip": 4332,
            "Location": "Stein AG"
        },
        {
            "Zip": 4333,
            "Location": "Münchwilen AG"
        },
        {
            "Zip": 4334,
            "Location": "Sisseln AG"
        },
        {
            "Zip": 4402,
            "Location": "Frenkendorf"
        },
        {
            "Zip": 4410,
            "Location": "Liestal"
        },
        {
            "Zip": 4410,
            "Location": "Liestal Dist Ba"
        },
        {
            "Zip": 4410,
            "Location": "Liestal Kaserne"
        },
        {
            "Zip": 4410,
            "Location": "Liestal Zustellung"
        },
        {
            "Zip": 4411,
            "Location": "Seltisberg"
        },
        {
            "Zip": 4412,
            "Location": "Nuglar"
        },
        {
            "Zip": 4413,
            "Location": "Büren SO"
        },
        {
            "Zip": 4414,
            "Location": "Füllinsdorf"
        },
        {
            "Zip": 4414,
            "Location": "Füllinsdorf Zustellung"
        },
        {
            "Zip": 4415,
            "Location": "Lausen"
        },
        {
            "Zip": 4416,
            "Location": "Bubendorf"
        },
        {
            "Zip": 4416,
            "Location": "Bubendorf Zustellung"
        },
        {
            "Zip": 4417,
            "Location": "Ziefen"
        },
        {
            "Zip": 4418,
            "Location": "Reigoldswil"
        },
        {
            "Zip": 4419,
            "Location": "Lupsingen"
        },
        {
            "Zip": 4421,
            "Location": "St. Pantaleon"
        },
        {
            "Zip": 4422,
            "Location": "Arisdorf"
        },
        {
            "Zip": 4423,
            "Location": "Hersberg"
        },
        {
            "Zip": 4424,
            "Location": "Arboldswil"
        },
        {
            "Zip": 4425,
            "Location": "Titterten"
        },
        {
            "Zip": 4426,
            "Location": "Lauwil"
        },
        {
            "Zip": 4431,
            "Location": "Bennwil"
        },
        {
            "Zip": 4432,
            "Location": "Lampenberg"
        },
        {
            "Zip": 4433,
            "Location": "Ramlinsburg"
        },
        {
            "Zip": 4434,
            "Location": "Hölstein"
        },
        {
            "Zip": 4435,
            "Location": "Niederdorf"
        },
        {
            "Zip": 4436,
            "Location": "Liedertswil"
        },
        {
            "Zip": 4436,
            "Location": "Oberdorf BL"
        },
        {
            "Zip": 4437,
            "Location": "Waldenburg"
        },
        {
            "Zip": 4438,
            "Location": "Langenbruck"
        },
        {
            "Zip": 4441,
            "Location": "Thürnen"
        },
        {
            "Zip": 4442,
            "Location": "Diepflingen"
        },
        {
            "Zip": 4443,
            "Location": "Wittinsburg"
        },
        {
            "Zip": 4444,
            "Location": "Rümlingen"
        },
        {
            "Zip": 4445,
            "Location": "Häfelfingen"
        },
        {
            "Zip": 4446,
            "Location": "Buckten"
        },
        {
            "Zip": 4447,
            "Location": "Känerkinden"
        },
        {
            "Zip": 4448,
            "Location": "Läufelfingen"
        },
        {
            "Zip": 4450,
            "Location": "Sissach"
        },
        {
            "Zip": 4450,
            "Location": "Sissach Postgasse"
        },
        {
            "Zip": 4450,
            "Location": "Sissach Zustellung"
        },
        {
            "Zip": 4451,
            "Location": "Wintersingen"
        },
        {
            "Zip": 4452,
            "Location": "Itingen"
        },
        {
            "Zip": 4453,
            "Location": "Nusshof"
        },
        {
            "Zip": 4455,
            "Location": "Zunzgen"
        },
        {
            "Zip": 4456,
            "Location": "Tenniken"
        },
        {
            "Zip": 4457,
            "Location": "Diegten"
        },
        {
            "Zip": 4458,
            "Location": "Eptingen"
        },
        {
            "Zip": 4460,
            "Location": "Gelterkinden"
        },
        {
            "Zip": 4460,
            "Location": "Gelterkinden Zustellung"
        },
        {
            "Zip": 4461,
            "Location": "Böckten"
        },
        {
            "Zip": 4462,
            "Location": "Rickenbach BL"
        },
        {
            "Zip": 4463,
            "Location": "Buus"
        },
        {
            "Zip": 4464,
            "Location": "Maisprach"
        },
        {
            "Zip": 4465,
            "Location": "Hemmiken"
        },
        {
            "Zip": 4466,
            "Location": "Ormalingen"
        },
        {
            "Zip": 4467,
            "Location": "Rothenfluh"
        },
        {
            "Zip": 4468,
            "Location": "Kienberg"
        },
        {
            "Zip": 4469,
            "Location": "Anwil"
        },
        {
            "Zip": 4492,
            "Location": "Tecknau"
        },
        {
            "Zip": 4493,
            "Location": "Wenslingen"
        },
        {
            "Zip": 4494,
            "Location": "Oltingen"
        },
        {
            "Zip": 4495,
            "Location": "Zeglingen"
        },
        {
            "Zip": 4496,
            "Location": "Kilchberg BL"
        },
        {
            "Zip": 4497,
            "Location": "Rünenberg"
        },
        {
            "Zip": 4500,
            "Location": "Solothurn"
        },
        {
            "Zip": 4500,
            "Location": "Solothurn 1"
        },
        {
            "Zip": 4500,
            "Location": "Solothurn 1 Zustellung"
        },
        {
            "Zip": 4501,
            "Location": "Solothurn Bahnhof"
        },
        {
            "Zip": 4502,
            "Location": "Solothurn"
        },
        {
            "Zip": 4503,
            "Location": "Solothurn"
        },
        {
            "Zip": 4504,
            "Location": "Solothurn"
        },
        {
            "Zip": 4509,
            "Location": "Solothurn"
        },
        {
            "Zip": 4512,
            "Location": "Bellach"
        },
        {
            "Zip": 4512,
            "Location": "Bellach Zustellung"
        },
        {
            "Zip": 4513,
            "Location": "Langendorf"
        },
        {
            "Zip": 4514,
            "Location": "Lommiswil"
        },
        {
            "Zip": 4515,
            "Location": "Oberdorf SO"
        },
        {
            "Zip": 4515,
            "Location": "Weissenstein b. Solothurn"
        },
        {
            "Zip": 4522,
            "Location": "Rüttenen"
        },
        {
            "Zip": 4523,
            "Location": "Niederwil SO"
        },
        {
            "Zip": 4524,
            "Location": "Balmberg"
        },
        {
            "Zip": 4524,
            "Location": "Günsberg"
        },
        {
            "Zip": 4524,
            "Location": "Oberbalmberg"
        },
        {
            "Zip": 4525,
            "Location": "Balm b. Günsberg"
        },
        {
            "Zip": 4528,
            "Location": "Zuchwil"
        },
        {
            "Zip": 4532,
            "Location": "Feldbrunnen"
        },
        {
            "Zip": 4533,
            "Location": "Riedholz"
        },
        {
            "Zip": 4534,
            "Location": "Flumenthal"
        },
        {
            "Zip": 4535,
            "Location": "Hubersdorf"
        },
        {
            "Zip": 4535,
            "Location": "Kammersrohr"
        },
        {
            "Zip": 4536,
            "Location": "Attiswil"
        },
        {
            "Zip": 4537,
            "Location": "Wiedlisbach"
        },
        {
            "Zip": 4538,
            "Location": "Oberbipp"
        },
        {
            "Zip": 4539,
            "Location": "Farnern"
        },
        {
            "Zip": 4539,
            "Location": "Rumisberg"
        },
        {
            "Zip": 4542,
            "Location": "Luterbach"
        },
        {
            "Zip": 4543,
            "Location": "Deitingen"
        },
        {
            "Zip": 4552,
            "Location": "Derendingen"
        },
        {
            "Zip": 4553,
            "Location": "Subingen"
        },
        {
            "Zip": 4554,
            "Location": "Etziken"
        },
        {
            "Zip": 4554,
            "Location": "Hüniken"
        },
        {
            "Zip": 4556,
            "Location": "Aeschi SO"
        },
        {
            "Zip": 4556,
            "Location": "Bolken"
        },
        {
            "Zip": 4556,
            "Location": "Burgäschi"
        },
        {
            "Zip": 4556,
            "Location": "Steinhof SO"
        },
        {
            "Zip": 4557,
            "Location": "Horriwil"
        },
        {
            "Zip": 4558,
            "Location": "Heinrichswil"
        },
        {
            "Zip": 4558,
            "Location": "Hersiwil"
        },
        {
            "Zip": 4558,
            "Location": "Winistorf"
        },
        {
            "Zip": 4562,
            "Location": "Biberist"
        },
        {
            "Zip": 4563,
            "Location": "Gerlafingen"
        },
        {
            "Zip": 4563,
            "Location": "Gerlafingen Zustellung"
        },
        {
            "Zip": 4564,
            "Location": "Obergerlafingen"
        },
        {
            "Zip": 4564,
            "Location": "Zielebach"
        },
        {
            "Zip": 4565,
            "Location": "Recherswil"
        },
        {
            "Zip": 4566,
            "Location": "Halten"
        },
        {
            "Zip": 4566,
            "Location": "Kriegstetten"
        },
        {
            "Zip": 4566,
            "Location": "Oekingen"
        },
        {
            "Zip": 4571,
            "Location": "Ichertswil"
        },
        {
            "Zip": 4571,
            "Location": "Lüterkofen"
        },
        {
            "Zip": 4571,
            "Location": "Lüterkofen-Ichertswil"
        },
        {
            "Zip": 4573,
            "Location": "Lohn-Ammannsegg"
        },
        {
            "Zip": 4574,
            "Location": "Lüsslingen"
        },
        {
            "Zip": 4574,
            "Location": "Nennigkofen"
        },
        {
            "Zip": 4576,
            "Location": "Tscheppach"
        },
        {
            "Zip": 4577,
            "Location": "Hessigkofen"
        },
        {
            "Zip": 4578,
            "Location": "Bibern SO"
        },
        {
            "Zip": 4579,
            "Location": "Gossliwil"
        },
        {
            "Zip": 4581,
            "Location": "Küttigkofen"
        },
        {
            "Zip": 4582,
            "Location": "Brügglen"
        },
        {
            "Zip": 4583,
            "Location": "Aetigkofen"
        },
        {
            "Zip": 4583,
            "Location": "Mühledorf SO"
        },
        {
            "Zip": 4584,
            "Location": "Gächliwil"
        },
        {
            "Zip": 4584,
            "Location": "Lüterswil"
        },
        {
            "Zip": 4585,
            "Location": "Biezwil"
        },
        {
            "Zip": 4586,
            "Location": "Kyburg-Buchegg"
        },
        {
            "Zip": 4587,
            "Location": "Aetingen"
        },
        {
            "Zip": 4588,
            "Location": "Brittern"
        },
        {
            "Zip": 4588,
            "Location": "Oberramsern"
        },
        {
            "Zip": 4588,
            "Location": "Unterramsern"
        },
        {
            "Zip": 4600,
            "Location": "Olten"
        },
        {
            "Zip": 4600,
            "Location": "Olten 1"
        },
        {
            "Zip": 4600,
            "Location": "Olten 2 Zustellung"
        },
        {
            "Zip": 4600,
            "Location": "Olten Personal"
        },
        {
            "Zip": 4601,
            "Location": "Olten 1 Fächer"
        },
        {
            "Zip": 4604,
            "Location": "Olten 4 Hammer"
        },
        {
            "Zip": 4605,
            "Location": "Olten"
        },
        {
            "Zip": 4609,
            "Location": "Olten Sonderdienste"
        },
        {
            "Zip": 4611,
            "Location": "Härkingen Scanning-Center"
        },
        {
            "Zip": 4612,
            "Location": "Wangen b. Olten"
        },
        {
            "Zip": 4613,
            "Location": "Rickenbach SO"
        },
        {
            "Zip": 4614,
            "Location": "Hägendorf"
        },
        {
            "Zip": 4614,
            "Location": "Hägendorf Zustellung"
        },
        {
            "Zip": 4615,
            "Location": "Allerheiligenberg"
        },
        {
            "Zip": 4616,
            "Location": "Kappel SO"
        },
        {
            "Zip": 4617,
            "Location": "Gunzgen"
        },
        {
            "Zip": 4618,
            "Location": "Boningen"
        },
        {
            "Zip": 4620,
            "Location": "Härkingen Dist Ba"
        },
        {
            "Zip": 4620,
            "Location": "Härkingen Paketzentrum"
        },
        {
            "Zip": 4621,
            "Location": "Härkingen Briefzentrum"
        },
        {
            "Zip": 4621,
            "Location": "Härkingen BZ Briefklinik"
        },
        {
            "Zip": 4621,
            "Location": "Härkingen BZ FP"
        },
        {
            "Zip": 4621,
            "Location": "Härkingen SPS AG"
        },
        {
            "Zip": 4622,
            "Location": "Egerkingen"
        },
        {
            "Zip": 4623,
            "Location": "Neuendorf"
        },
        {
            "Zip": 4624,
            "Location": "Härkingen"
        },
        {
            "Zip": 4625,
            "Location": "Oberbuchsiten"
        },
        {
            "Zip": 4626,
            "Location": "Niederbuchsiten"
        },
        {
            "Zip": 4628,
            "Location": "Wolfwil"
        },
        {
            "Zip": 4629,
            "Location": "Fulenbach"
        },
        {
            "Zip": 4630,
            "Location": "Härkingen CALL"
        },
        {
            "Zip": 4632,
            "Location": "Trimbach"
        },
        {
            "Zip": 4633,
            "Location": "Hauenstein"
        },
        {
            "Zip": 4634,
            "Location": "Wisen SO"
        },
        {
            "Zip": 4640,
            "Location": "Härkingen ST PP 1"
        },
        {
            "Zip": 4652,
            "Location": "Winznau"
        },
        {
            "Zip": 4653,
            "Location": "Obergösgen"
        },
        {
            "Zip": 4654,
            "Location": "Lostorf"
        },
        {
            "Zip": 4655,
            "Location": "Rohr b. Olten"
        },
        {
            "Zip": 4655,
            "Location": "Stüsslingen"
        },
        {
            "Zip": 4656,
            "Location": "Starrkirch-Wil"
        },
        {
            "Zip": 4657,
            "Location": "Dulliken"
        },
        {
            "Zip": 4658,
            "Location": "Däniken SO"
        },
        {
            "Zip": 4663,
            "Location": "Aarburg"
        },
        {
            "Zip": 4663,
            "Location": "Aarburg Zustellung"
        },
        {
            "Zip": 4665,
            "Location": "Oftringen"
        },
        {
            "Zip": 4665,
            "Location": "Oftringen 1"
        },
        {
            "Zip": 4665,
            "Location": "Oftringen 1 Zustellung"
        },
        {
            "Zip": 4665,
            "Location": "Oftringen 2"
        },
        {
            "Zip": 4665,
            "Location": "Oftringen PL ThermoCare"
        },
        {
            "Zip": 4665,
            "Location": "Oftringen PL3"
        },
        {
            "Zip": 4665,
            "Location": "Oftringen SPN"
        },
        {
            "Zip": 4702,
            "Location": "Oensingen"
        },
        {
            "Zip": 4702,
            "Location": "Oensingen Hub SecurePost"
        },
        {
            "Zip": 4702,
            "Location": "Oensingen Solothurnstrasse"
        },
        {
            "Zip": 4702,
            "Location": "Oensingen Zustellung"
        },
        {
            "Zip": 4703,
            "Location": "Kestenholz"
        },
        {
            "Zip": 4704,
            "Location": "Niederbipp"
        },
        {
            "Zip": 4704,
            "Location": "Niederbipp PL3"
        },
        {
            "Zip": 4704,
            "Location": "Wolfisberg"
        },
        {
            "Zip": 4710,
            "Location": "Balsthal"
        },
        {
            "Zip": 4710,
            "Location": "Balsthal Postauto Thal-Gäu"
        },
        {
            "Zip": 4710,
            "Location": "Balsthal Zustellung"
        },
        {
            "Zip": 4712,
            "Location": "Laupersdorf"
        },
        {
            "Zip": 4713,
            "Location": "Matzendorf"
        },
        {
            "Zip": 4714,
            "Location": "Aedermannsdorf"
        },
        {
            "Zip": 4715,
            "Location": "Herbetswil"
        },
        {
            "Zip": 4716,
            "Location": "Gänsbrunnen"
        },
        {
            "Zip": 4716,
            "Location": "Welschenrohr"
        },
        {
            "Zip": 4717,
            "Location": "Mümliswil"
        },
        {
            "Zip": 4718,
            "Location": "Holderbank SO"
        },
        {
            "Zip": 4719,
            "Location": "Ramiswil"
        },
        {
            "Zip": 4800,
            "Location": "Zofingen"
        },
        {
            "Zip": 4800,
            "Location": "Zofingen Abg. St"
        },
        {
            "Zip": 4800,
            "Location": "Zofingen B&V GK"
        },
        {
            "Zip": 4800,
            "Location": "Zofingen KC PK 2"
        },
        {
            "Zip": 4800,
            "Location": "Zofingen KC PK\\GK 3"
        },
        {
            "Zip": 4800,
            "Location": "Zofingen KC PK\\GK 4"
        },
        {
            "Zip": 4800,
            "Location": "Zofingen KC PK\\GK 5"
        },
        {
            "Zip": 4800,
            "Location": "Zofingen PostFinance"
        },
        {
            "Zip": 4800,
            "Location": "Zofingen Zustellung"
        },
        {
            "Zip": 4801,
            "Location": "Zofingen Ringier AG"
        },
        {
            "Zip": 4802,
            "Location": "Strengelbach"
        },
        {
            "Zip": 4803,
            "Location": "Vordemwald"
        },
        {
            "Zip": 4805,
            "Location": "Brittnau"
        },
        {
            "Zip": 4806,
            "Location": "Wikon"
        },
        {
            "Zip": 4807,
            "Location": "Zofingen PostFinance"
        },
        {
            "Zip": 4808,
            "Location": "Zofingen PostFinance"
        },
        {
            "Zip": 4809,
            "Location": "Zofingen PF UBS Verarb."
        },
        {
            "Zip": 4809,
            "Location": "Zofingen Postfinance UBS"
        },
        {
            "Zip": 4812,
            "Location": "Mühlethal"
        },
        {
            "Zip": 4813,
            "Location": "Uerkheim"
        },
        {
            "Zip": 4814,
            "Location": "Bottenwil"
        },
        {
            "Zip": 4852,
            "Location": "Rothrist"
        },
        {
            "Zip": 4852,
            "Location": "Rothrist Bernstrasse"
        },
        {
            "Zip": 4853,
            "Location": "Murgenthal"
        },
        {
            "Zip": 4853,
            "Location": "Riken AG"
        },
        {
            "Zip": 4856,
            "Location": "Glashütten"
        },
        {
            "Zip": 4900,
            "Location": "Langenthal"
        },
        {
            "Zip": 4900,
            "Location": "Langenthal 1"
        },
        {
            "Zip": 4900,
            "Location": "Langenthal 1 Zustellung"
        },
        {
            "Zip": 4901,
            "Location": "Langenthal"
        },
        {
            "Zip": 4911,
            "Location": "Schwarzhäusern"
        },
        {
            "Zip": 4912,
            "Location": "Aarwangen"
        },
        {
            "Zip": 4913,
            "Location": "Bannwil"
        },
        {
            "Zip": 4914,
            "Location": "Roggwil BE"
        },
        {
            "Zip": 4915,
            "Location": "St. Urban"
        },
        {
            "Zip": 4916,
            "Location": "Untersteckholz"
        },
        {
            "Zip": 4917,
            "Location": "Busswil b. Melchnau"
        },
        {
            "Zip": 4917,
            "Location": "Melchnau"
        },
        {
            "Zip": 4919,
            "Location": "Reisiswil"
        },
        {
            "Zip": 4922,
            "Location": "Bützberg"
        },
        {
            "Zip": 4922,
            "Location": "Thunstetten"
        },
        {
            "Zip": 4923,
            "Location": "Wynau"
        },
        {
            "Zip": 4924,
            "Location": "Obersteckholz"
        },
        {
            "Zip": 4932,
            "Location": "Gutenburg"
        },
        {
            "Zip": 4932,
            "Location": "Lotzwil"
        },
        {
            "Zip": 4933,
            "Location": "Rütschelen"
        },
        {
            "Zip": 4934,
            "Location": "Madiswil"
        },
        {
            "Zip": 4935,
            "Location": "Leimiswil"
        },
        {
            "Zip": 4936,
            "Location": "Kleindietwil"
        },
        {
            "Zip": 4937,
            "Location": "Ursenbach"
        },
        {
            "Zip": 4938,
            "Location": "Rohrbach"
        },
        {
            "Zip": 4938,
            "Location": "Rohrbachgraben"
        },
        {
            "Zip": 4942,
            "Location": "Walterswil BE"
        },
        {
            "Zip": 4943,
            "Location": "Oeschenbach"
        },
        {
            "Zip": 4944,
            "Location": "Auswil"
        },
        {
            "Zip": 4950,
            "Location": "Huttwil"
        },
        {
            "Zip": 4950,
            "Location": "Huttwil Zustellung"
        },
        {
            "Zip": 4952,
            "Location": "Eriswil"
        },
        {
            "Zip": 4953,
            "Location": "Schwarzenbach (Huttwil)"
        },
        {
            "Zip": 4954,
            "Location": "Wyssachen"
        },
        {
            "Zip": 4955,
            "Location": "Gondiswil"
        },
        {
            "Zip": 5000,
            "Location": "Aarau"
        },
        {
            "Zip": 5000,
            "Location": "Aarau 1"
        },
        {
            "Zip": 5000,
            "Location": "Aarau 1 Zustellung"
        },
        {
            "Zip": 5000,
            "Location": "Aarau Altstadt"
        },
        {
            "Zip": 5000,
            "Location": "Aarau Kaserne"
        },
        {
            "Zip": 5000,
            "Location": "Aarau Postauto Aargau"
        },
        {
            "Zip": 5001,
            "Location": "Aarau 1"
        },
        {
            "Zip": 5001,
            "Location": "Aarau SPS"
        },
        {
            "Zip": 5004,
            "Location": "Aarau"
        },
        {
            "Zip": 5004,
            "Location": "Aarau Tellistrasse"
        },
        {
            "Zip": 5012,
            "Location": "Eppenberg"
        },
        {
            "Zip": 5012,
            "Location": "Schönenwerd"
        },
        {
            "Zip": 5012,
            "Location": "Schönenwerd Zustellung"
        },
        {
            "Zip": 5012,
            "Location": "Wöschnau"
        },
        {
            "Zip": 5013,
            "Location": "Niedergösgen"
        },
        {
            "Zip": 5014,
            "Location": "Gretzenbach"
        },
        {
            "Zip": 5015,
            "Location": "Erlinsbach SO"
        },
        {
            "Zip": 5017,
            "Location": "Barmelweid"
        },
        {
            "Zip": 5018,
            "Location": "Erlinsbach"
        },
        {
            "Zip": 5022,
            "Location": "Rombach"
        },
        {
            "Zip": 5023,
            "Location": "Biberstein"
        },
        {
            "Zip": 5024,
            "Location": "Küttigen"
        },
        {
            "Zip": 5025,
            "Location": "Asp"
        },
        {
            "Zip": 5026,
            "Location": "Densbüren"
        },
        {
            "Zip": 5027,
            "Location": "Herznach"
        },
        {
            "Zip": 5028,
            "Location": "Ueken"
        },
        {
            "Zip": 5032,
            "Location": "Aarau Rohr"
        },
        {
            "Zip": 5033,
            "Location": "Buchs AG"
        },
        {
            "Zip": 5034,
            "Location": "Suhr"
        },
        {
            "Zip": 5035,
            "Location": "Unterentfelden"
        },
        {
            "Zip": 5036,
            "Location": "Oberentfelden"
        },
        {
            "Zip": 5036,
            "Location": "Oberentfelden Zustellung"
        },
        {
            "Zip": 5037,
            "Location": "Muhen"
        },
        {
            "Zip": 5040,
            "Location": "Schöftland"
        },
        {
            "Zip": 5042,
            "Location": "Hirschthal"
        },
        {
            "Zip": 5043,
            "Location": "Holziken"
        },
        {
            "Zip": 5044,
            "Location": "Schlossrued"
        },
        {
            "Zip": 5046,
            "Location": "Schmiedrued"
        },
        {
            "Zip": 5046,
            "Location": "Schmiedrued-Walde"
        },
        {
            "Zip": 5046,
            "Location": "Walde AG"
        },
        {
            "Zip": 5053,
            "Location": "Staffelbach"
        },
        {
            "Zip": 5053,
            "Location": "Wittwil"
        },
        {
            "Zip": 5054,
            "Location": "Kirchleerau"
        },
        {
            "Zip": 5054,
            "Location": "Kirchleerau-Moosleerau"
        },
        {
            "Zip": 5054,
            "Location": "Moosleerau"
        },
        {
            "Zip": 5056,
            "Location": "Attelwil"
        },
        {
            "Zip": 5057,
            "Location": "Reitnau"
        },
        {
            "Zip": 5058,
            "Location": "Wiliberg"
        },
        {
            "Zip": 5062,
            "Location": "Oberhof"
        },
        {
            "Zip": 5063,
            "Location": "Wölflinswil"
        },
        {
            "Zip": 5064,
            "Location": "Wittnau"
        },
        {
            "Zip": 5070,
            "Location": "Frick"
        },
        {
            "Zip": 5070,
            "Location": "Frick Zustellung"
        },
        {
            "Zip": 5072,
            "Location": "Oeschgen"
        },
        {
            "Zip": 5073,
            "Location": "Gipf-Oberfrick"
        },
        {
            "Zip": 5074,
            "Location": "Eiken"
        },
        {
            "Zip": 5075,
            "Location": "Hornussen"
        },
        {
            "Zip": 5076,
            "Location": "Bözen"
        },
        {
            "Zip": 5077,
            "Location": "Elfingen"
        },
        {
            "Zip": 5078,
            "Location": "Effingen"
        },
        {
            "Zip": 5079,
            "Location": "Zeihen"
        },
        {
            "Zip": 5080,
            "Location": "Laufenburg"
        },
        {
            "Zip": 5082,
            "Location": "Kaisten"
        },
        {
            "Zip": 5083,
            "Location": "Ittenthal"
        },
        {
            "Zip": 5084,
            "Location": "Rheinsulz"
        },
        {
            "Zip": 5085,
            "Location": "Sulz AG"
        },
        {
            "Zip": 5102,
            "Location": "Rupperswil"
        },
        {
            "Zip": 5103,
            "Location": "Möriken AG"
        },
        {
            "Zip": 5103,
            "Location": "Wildegg"
        },
        {
            "Zip": 5105,
            "Location": "Auenstein"
        },
        {
            "Zip": 5106,
            "Location": "Veltheim AG"
        },
        {
            "Zip": 5107,
            "Location": "Schinznach Dorf"
        },
        {
            "Zip": 5108,
            "Location": "Oberflachs"
        },
        {
            "Zip": 5112,
            "Location": "Thalheim AG"
        },
        {
            "Zip": 5113,
            "Location": "Holderbank AG"
        },
        {
            "Zip": 5116,
            "Location": "Schinznach Bad"
        },
        {
            "Zip": 5200,
            "Location": "Brugg AG"
        },
        {
            "Zip": 5200,
            "Location": "Brugg AG 1"
        },
        {
            "Zip": 5200,
            "Location": "Brugg AG 1 Zustellung"
        },
        {
            "Zip": 5200,
            "Location": "Brugg AG Bahnhofstrasse"
        },
        {
            "Zip": 5200,
            "Location": "Brugg AG Kaserne"
        },
        {
            "Zip": 5201,
            "Location": "Brugg AG"
        },
        {
            "Zip": 5201,
            "Location": "Brugg SPS"
        },
        {
            "Zip": 5210,
            "Location": "Windisch"
        },
        {
            "Zip": 5212,
            "Location": "Hausen AG"
        },
        {
            "Zip": 5213,
            "Location": "Villnachern"
        },
        {
            "Zip": 5222,
            "Location": "Umiken"
        },
        {
            "Zip": 5223,
            "Location": "Riniken"
        },
        {
            "Zip": 5225,
            "Location": "Bözberg"
        },
        {
            "Zip": 5232,
            "Location": "Villigen PSI"
        },
        {
            "Zip": 5233,
            "Location": "Stilli"
        },
        {
            "Zip": 5234,
            "Location": "Villigen"
        },
        {
            "Zip": 5235,
            "Location": "Rüfenach AG"
        },
        {
            "Zip": 5236,
            "Location": "Remigen"
        },
        {
            "Zip": 5237,
            "Location": "Mönthal"
        },
        {
            "Zip": 5242,
            "Location": "Birr"
        },
        {
            "Zip": 5242,
            "Location": "Birr-Lupfig"
        },
        {
            "Zip": 5242,
            "Location": "Birr-Lupfig Zustellung"
        },
        {
            "Zip": 5242,
            "Location": "Lupfig"
        },
        {
            "Zip": 5243,
            "Location": "Mülligen"
        },
        {
            "Zip": 5244,
            "Location": "Birrhard"
        },
        {
            "Zip": 5245,
            "Location": "Habsburg"
        },
        {
            "Zip": 5246,
            "Location": "Scherz"
        },
        {
            "Zip": 5272,
            "Location": "Gansingen"
        },
        {
            "Zip": 5273,
            "Location": "Oberhofen AG"
        },
        {
            "Zip": 5274,
            "Location": "Mettau"
        },
        {
            "Zip": 5275,
            "Location": "Etzgen"
        },
        {
            "Zip": 5276,
            "Location": "Wil AG"
        },
        {
            "Zip": 5277,
            "Location": "Hottwil"
        },
        {
            "Zip": 5300,
            "Location": "Turgi"
        },
        {
            "Zip": 5301,
            "Location": "Siggenthal Station"
        },
        {
            "Zip": 5303,
            "Location": "Würenlingen"
        },
        {
            "Zip": 5303,
            "Location": "Würenlingen Dorfstrasse"
        },
        {
            "Zip": 5304,
            "Location": "Endingen"
        },
        {
            "Zip": 5305,
            "Location": "Unterendingen"
        },
        {
            "Zip": 5306,
            "Location": "Tegerfelden"
        },
        {
            "Zip": 5312,
            "Location": "Döttingen"
        },
        {
            "Zip": 5312,
            "Location": "Döttingen-Klingnau"
        },
        {
            "Zip": 5313,
            "Location": "Klingnau"
        },
        {
            "Zip": 5313,
            "Location": "Klingnau Wiesenweg"
        },
        {
            "Zip": 5314,
            "Location": "Kleindöttingen"
        },
        {
            "Zip": 5315,
            "Location": "Böttstein"
        },
        {
            "Zip": 5316,
            "Location": "Leuggern"
        },
        {
            "Zip": 5317,
            "Location": "Hettenschwil"
        },
        {
            "Zip": 5318,
            "Location": "Mandach"
        },
        {
            "Zip": 5322,
            "Location": "Koblenz"
        },
        {
            "Zip": 5323,
            "Location": "Rietheim"
        },
        {
            "Zip": 5324,
            "Location": "Full-Reuenthal"
        },
        {
            "Zip": 5325,
            "Location": "Leibstadt"
        },
        {
            "Zip": 5326,
            "Location": "Schwaderloch"
        },
        {
            "Zip": 5330,
            "Location": "Bad Zurzach"
        },
        {
            "Zip": 5330,
            "Location": "Bad Zurzach Hauptstrasse"
        },
        {
            "Zip": 5332,
            "Location": "Rekingen AG"
        },
        {
            "Zip": 5333,
            "Location": "Baldingen"
        },
        {
            "Zip": 5334,
            "Location": "Böbikon"
        },
        {
            "Zip": 5400,
            "Location": "Baden"
        },
        {
            "Zip": 5400,
            "Location": "Baden 1"
        },
        {
            "Zip": 5400,
            "Location": "Baden 1 Postautodienst"
        },
        {
            "Zip": 5401,
            "Location": "Baden"
        },
        {
            "Zip": 5402,
            "Location": "Baden"
        },
        {
            "Zip": 5404,
            "Location": "Baden"
        },
        {
            "Zip": 5405,
            "Location": "Baden"
        },
        {
            "Zip": 5405,
            "Location": "Baden B&V GK"
        },
        {
            "Zip": 5405,
            "Location": "Baden Täfern Gewerbe"
        },
        {
            "Zip": 5405,
            "Location": "Dättwil AG"
        },
        {
            "Zip": 5406,
            "Location": "Baden"
        },
        {
            "Zip": 5406,
            "Location": "Rütihof"
        },
        {
            "Zip": 5408,
            "Location": "Ennetbaden"
        },
        {
            "Zip": 5412,
            "Location": "Gebenstorf"
        },
        {
            "Zip": 5412,
            "Location": "Vogelsang AG"
        },
        {
            "Zip": 5413,
            "Location": "Birmenstorf AG"
        },
        {
            "Zip": 5415,
            "Location": "Hertenstein AG"
        },
        {
            "Zip": 5415,
            "Location": "Nussbaumen AG"
        },
        {
            "Zip": 5415,
            "Location": "Nussbaumen AG Zustellung"
        },
        {
            "Zip": 5415,
            "Location": "Rieden AG"
        },
        {
            "Zip": 5416,
            "Location": "Kirchdorf AG"
        },
        {
            "Zip": 5417,
            "Location": "Untersiggenthal"
        },
        {
            "Zip": 5420,
            "Location": "Ehrendingen"
        },
        {
            "Zip": 5423,
            "Location": "Freienwil"
        },
        {
            "Zip": 5425,
            "Location": "Schneisingen"
        },
        {
            "Zip": 5426,
            "Location": "Lengnau AG"
        },
        {
            "Zip": 5430,
            "Location": "Wettingen"
        },
        {
            "Zip": 5430,
            "Location": "Wettingen 1"
        },
        {
            "Zip": 5430,
            "Location": "Wettingen 1 Zustellung"
        },
        {
            "Zip": 5430,
            "Location": "Wettingen 2"
        },
        {
            "Zip": 5430,
            "Location": "Wettingen 3"
        },
        {
            "Zip": 5432,
            "Location": "Neuenhof"
        },
        {
            "Zip": 5436,
            "Location": "Würenlos"
        },
        {
            "Zip": 5442,
            "Location": "Fislisbach"
        },
        {
            "Zip": 5443,
            "Location": "Niederrohrdorf"
        },
        {
            "Zip": 5444,
            "Location": "Künten"
        },
        {
            "Zip": 5445,
            "Location": "Eggenwil"
        },
        {
            "Zip": 5452,
            "Location": "Oberrohrdorf"
        },
        {
            "Zip": 5453,
            "Location": "Remetschwil"
        },
        {
            "Zip": 5454,
            "Location": "Bellikon"
        },
        {
            "Zip": 5462,
            "Location": "Siglistorf"
        },
        {
            "Zip": 5463,
            "Location": "Wislikofen"
        },
        {
            "Zip": 5463,
            "Location": "Wislikofen Probsteiweg"
        },
        {
            "Zip": 5464,
            "Location": "Rümikon AG"
        },
        {
            "Zip": 5465,
            "Location": "Mellikon"
        },
        {
            "Zip": 5466,
            "Location": "Kaiserstuhl AG"
        },
        {
            "Zip": 5467,
            "Location": "Fisibach"
        },
        {
            "Zip": 5502,
            "Location": "Hunzenschwil"
        },
        {
            "Zip": 5503,
            "Location": "Schafisheim"
        },
        {
            "Zip": 5504,
            "Location": "Othmarsingen"
        },
        {
            "Zip": 5505,
            "Location": "Brunegg"
        },
        {
            "Zip": 5506,
            "Location": "Mägenwil"
        },
        {
            "Zip": 5506,
            "Location": "Mägenwil Dist Ba"
        },
        {
            "Zip": 5506,
            "Location": "Mägenwil GKA"
        },
        {
            "Zip": 5506,
            "Location": "Mägenwil HUB"
        },
        {
            "Zip": 5506,
            "Location": "Mägenwil PL Hub SK Blitz"
        },
        {
            "Zip": 5506,
            "Location": "Mägenwil PL3i"
        },
        {
            "Zip": 5507,
            "Location": "Mellingen"
        },
        {
            "Zip": 5512,
            "Location": "Wohlenschwil"
        },
        {
            "Zip": 5522,
            "Location": "Tägerig"
        },
        {
            "Zip": 5524,
            "Location": "Nesselnbach"
        },
        {
            "Zip": 5524,
            "Location": "Niederwil AG"
        },
        {
            "Zip": 5525,
            "Location": "Fischbach-Göslikon"
        },
        {
            "Zip": 5600,
            "Location": "Ammerswil AG"
        },
        {
            "Zip": 5600,
            "Location": "Lenzburg"
        },
        {
            "Zip": 5600,
            "Location": "Lenzburg 1"
        },
        {
            "Zip": 5600,
            "Location": "Lenzburg Stadt"
        },
        {
            "Zip": 5600,
            "Location": "Lenzburg Zustellung"
        },
        {
            "Zip": 5603,
            "Location": "Staufen"
        },
        {
            "Zip": 5604,
            "Location": "Hendschiken"
        },
        {
            "Zip": 5605,
            "Location": "Dottikon"
        },
        {
            "Zip": 5605,
            "Location": "Dottikon Zustellung"
        },
        {
            "Zip": 5606,
            "Location": "Dintikon"
        },
        {
            "Zip": 5606,
            "Location": "Dintikon PL3"
        },
        {
            "Zip": 5607,
            "Location": "Hägglingen"
        },
        {
            "Zip": 5608,
            "Location": "Stetten AG"
        },
        {
            "Zip": 5610,
            "Location": "Wohlen AG"
        },
        {
            "Zip": 5610,
            "Location": "Wohlen AG 1"
        },
        {
            "Zip": 5610,
            "Location": "Wohlen AG 1 Zustellung"
        },
        {
            "Zip": 5610,
            "Location": "Wohlen AG Jurastrasse"
        },
        {
            "Zip": 5611,
            "Location": "Anglikon"
        },
        {
            "Zip": 5612,
            "Location": "Villmergen"
        },
        {
            "Zip": 5612,
            "Location": "Villmergen PL3"
        },
        {
            "Zip": 5613,
            "Location": "Hilfikon"
        },
        {
            "Zip": 5614,
            "Location": "Sarmenstorf"
        },
        {
            "Zip": 5615,
            "Location": "Fahrwangen"
        },
        {
            "Zip": 5616,
            "Location": "Meisterschwanden"
        },
        {
            "Zip": 5617,
            "Location": "Tennwil"
        },
        {
            "Zip": 5618,
            "Location": "Bettwil"
        },
        {
            "Zip": 5619,
            "Location": "Büttikon AG"
        },
        {
            "Zip": 5619,
            "Location": "Uezwil"
        },
        {
            "Zip": 5620,
            "Location": "Bremgarten AG"
        },
        {
            "Zip": 5620,
            "Location": "Bremgarten AG 1"
        },
        {
            "Zip": 5620,
            "Location": "Bremgarten AG 1 Zustellung"
        },
        {
            "Zip": 5620,
            "Location": "Bremgarten AG Kaserne"
        },
        {
            "Zip": 5620,
            "Location": "Bremgarten AG West"
        },
        {
            "Zip": 5621,
            "Location": "Zufikon"
        },
        {
            "Zip": 5622,
            "Location": "Waltenschwil"
        },
        {
            "Zip": 5623,
            "Location": "Boswil"
        },
        {
            "Zip": 5624,
            "Location": "Bünzen"
        },
        {
            "Zip": 5624,
            "Location": "Waldhäusern AG"
        },
        {
            "Zip": 5625,
            "Location": "Kallern"
        },
        {
            "Zip": 5626,
            "Location": "Hermetschwil-Staffeln"
        },
        {
            "Zip": 5627,
            "Location": "Besenbüren"
        },
        {
            "Zip": 5628,
            "Location": "Aristau"
        },
        {
            "Zip": 5630,
            "Location": "Muri AG"
        },
        {
            "Zip": 5630,
            "Location": "Muri AG Zustellung"
        },
        {
            "Zip": 5632,
            "Location": "Buttwil"
        },
        {
            "Zip": 5634,
            "Location": "Merenschwand"
        },
        {
            "Zip": 5636,
            "Location": "Benzenschwil"
        },
        {
            "Zip": 5637,
            "Location": "Beinwil (Freiamt)"
        },
        {
            "Zip": 5637,
            "Location": "Geltwil"
        },
        {
            "Zip": 5642,
            "Location": "Mühlau"
        },
        {
            "Zip": 5643,
            "Location": "Alikon"
        },
        {
            "Zip": 5643,
            "Location": "Meienberg"
        },
        {
            "Zip": 5643,
            "Location": "Sins"
        },
        {
            "Zip": 5644,
            "Location": "Auw"
        },
        {
            "Zip": 5645,
            "Location": "Aettenschwil"
        },
        {
            "Zip": 5645,
            "Location": "Fenkrieden"
        },
        {
            "Zip": 5646,
            "Location": "Abtwil AG"
        },
        {
            "Zip": 5647,
            "Location": "Oberrüti"
        },
        {
            "Zip": 5702,
            "Location": "Niederlenz"
        },
        {
            "Zip": 5703,
            "Location": "Seon"
        },
        {
            "Zip": 5703,
            "Location": "Seon Zustellung"
        },
        {
            "Zip": 5704,
            "Location": "Egliswil"
        },
        {
            "Zip": 5705,
            "Location": "Hallwil"
        },
        {
            "Zip": 5706,
            "Location": "Boniswil"
        },
        {
            "Zip": 5707,
            "Location": "Seengen"
        },
        {
            "Zip": 5708,
            "Location": "Birrwil"
        },
        {
            "Zip": 5712,
            "Location": "Beinwil am See"
        },
        {
            "Zip": 5722,
            "Location": "Gränichen"
        },
        {
            "Zip": 5722,
            "Location": "Gränichen Zustellung"
        },
        {
            "Zip": 5723,
            "Location": "Teufenthal AG"
        },
        {
            "Zip": 5724,
            "Location": "Dürrenäsch"
        },
        {
            "Zip": 5725,
            "Location": "Leutwil"
        },
        {
            "Zip": 5726,
            "Location": "Unterkulm"
        },
        {
            "Zip": 5726,
            "Location": "Unterkulm Zustellung"
        },
        {
            "Zip": 5727,
            "Location": "Oberkulm"
        },
        {
            "Zip": 5728,
            "Location": "Gontenschwil"
        },
        {
            "Zip": 5732,
            "Location": "Zetzwil"
        },
        {
            "Zip": 5733,
            "Location": "Leimbach AG"
        },
        {
            "Zip": 5734,
            "Location": "Reinach AG"
        },
        {
            "Zip": 5734,
            "Location": "Reinach AG Postplatz"
        },
        {
            "Zip": 5734,
            "Location": "Reinach AG Zustellung"
        },
        {
            "Zip": 5735,
            "Location": "Pfeffikon LU"
        },
        {
            "Zip": 5736,
            "Location": "Burg AG"
        },
        {
            "Zip": 5737,
            "Location": "Menziken"
        },
        {
            "Zip": 5742,
            "Location": "Kölliken"
        },
        {
            "Zip": 5745,
            "Location": "Safenwil"
        },
        {
            "Zip": 5746,
            "Location": "Walterswil SO"
        },
        {
            "Zip": 6000,
            "Location": "Luzern"
        },
        {
            "Zip": 6000,
            "Location": "Luzern 1 Hauptpost"
        },
        {
            "Zip": 6000,
            "Location": "Luzern 15"
        },
        {
            "Zip": 6000,
            "Location": "Luzern 16"
        },
        {
            "Zip": 6000,
            "Location": "Luzern 2 Universität"
        },
        {
            "Zip": 6000,
            "Location": "Luzern 30 AAL"
        },
        {
            "Zip": 6000,
            "Location": "Luzern 31"
        },
        {
            "Zip": 6000,
            "Location": "Luzern 4"
        },
        {
            "Zip": 6000,
            "Location": "Luzern 6"
        },
        {
            "Zip": 6000,
            "Location": "Luzern 7"
        },
        {
            "Zip": 6000,
            "Location": "Luzern Altstadt"
        },
        {
            "Zip": 6000,
            "Location": "Luzern Kaserne"
        },
        {
            "Zip": 6000,
            "Location": "Luzern Kreuzstutz"
        },
        {
            "Zip": 6000,
            "Location": "Luzern PF Fil"
        },
        {
            "Zip": 6000,
            "Location": "Luzern Postauto Zentralschw"
        },
        {
            "Zip": 6000,
            "Location": "Luzern Schönbühl"
        },
        {
            "Zip": 6000,
            "Location": "Luzern Wesemlin"
        },
        {
            "Zip": 6000,
            "Location": "Luzern Zustellung"
        },
        {
            "Zip": 6002,
            "Location": "Luzern"
        },
        {
            "Zip": 6002,
            "Location": "Luzern SPS"
        },
        {
            "Zip": 6003,
            "Location": "Luzern"
        },
        {
            "Zip": 6004,
            "Location": "Luzern"
        },
        {
            "Zip": 6005,
            "Location": "Luzern"
        },
        {
            "Zip": 6005,
            "Location": "St. Niklausen LU"
        },
        {
            "Zip": 6006,
            "Location": "Luzern"
        },
        {
            "Zip": 6007,
            "Location": "Luzern"
        },
        {
            "Zip": 6009,
            "Location": "Luzern"
        },
        {
            "Zip": 6010,
            "Location": "Kriens"
        },
        {
            "Zip": 6010,
            "Location": "Kriens 1"
        },
        {
            "Zip": 6010,
            "Location": "Kriens 2"
        },
        {
            "Zip": 6010,
            "Location": "Kriens 2 Sternmatt"
        },
        {
            "Zip": 6010,
            "Location": "Kriens 2 Zustellung"
        },
        {
            "Zip": 6010,
            "Location": "Kriens Contact Center"
        },
        {
            "Zip": 6010,
            "Location": "Kriens KC PG\\GK 2"
        },
        {
            "Zip": 6010,
            "Location": "Kriens Logistikzentrum"
        },
        {
            "Zip": 6010,
            "Location": "Kriens Luzernerstrasse"
        },
        {
            "Zip": 6010,
            "Location": "Pilatus Kulm"
        },
        {
            "Zip": 6011,
            "Location": "Kriens"
        },
        {
            "Zip": 6012,
            "Location": "Obernau"
        },
        {
            "Zip": 6013,
            "Location": "Eigenthal"
        },
        {
            "Zip": 6014,
            "Location": "Luzern"
        },
        {
            "Zip": 6014,
            "Location": "Luzern Littau Fanghöfli"
        },
        {
            "Zip": 6015,
            "Location": "Luzern"
        },
        {
            "Zip": 6015,
            "Location": "Luzern Reussbühl Zustellung"
        },
        {
            "Zip": 6016,
            "Location": "Hellbühl"
        },
        {
            "Zip": 6017,
            "Location": "Ruswil"
        },
        {
            "Zip": 6017,
            "Location": "Ruswil Zustellung"
        },
        {
            "Zip": 6018,
            "Location": "Buttisholz"
        },
        {
            "Zip": 6019,
            "Location": "Sigigen"
        },
        {
            "Zip": 6020,
            "Location": "Emmenbrücke"
        },
        {
            "Zip": 6020,
            "Location": "Emmenbrücke 1 Zustellung"
        },
        {
            "Zip": 6020,
            "Location": "Emmenbrücke 2"
        },
        {
            "Zip": 6020,
            "Location": "Emmenbrücke 3"
        },
        {
            "Zip": 6020,
            "Location": "Emmenbrücke Bahnhof"
        },
        {
            "Zip": 6021,
            "Location": "Emmenbrücke 1"
        },
        {
            "Zip": 6022,
            "Location": "Grosswangen"
        },
        {
            "Zip": 6023,
            "Location": "Rothenburg"
        },
        {
            "Zip": 6023,
            "Location": "Rothenburg DIST BA"
        },
        {
            "Zip": 6024,
            "Location": "Hildisrieden"
        },
        {
            "Zip": 6025,
            "Location": "Neudorf"
        },
        {
            "Zip": 6026,
            "Location": "Rain"
        },
        {
            "Zip": 6027,
            "Location": "Römerswil LU"
        },
        {
            "Zip": 6028,
            "Location": "Herlisberg"
        },
        {
            "Zip": 6030,
            "Location": "Ebikon"
        },
        {
            "Zip": 6030,
            "Location": "Ebikon Mall of Switzerland"
        },
        {
            "Zip": 6030,
            "Location": "Ebikon Zustellung"
        },
        {
            "Zip": 6031,
            "Location": "Ebikon"
        },
        {
            "Zip": 6032,
            "Location": "Emmen"
        },
        {
            "Zip": 6032,
            "Location": "Emmen Kaserne"
        },
        {
            "Zip": 6032,
            "Location": "Emmen Seetalstrasse"
        },
        {
            "Zip": 6033,
            "Location": "Buchrain"
        },
        {
            "Zip": 6033,
            "Location": "Buchrain Schiltwald"
        },
        {
            "Zip": 6034,
            "Location": "Inwil"
        },
        {
            "Zip": 6035,
            "Location": "Perlen"
        },
        {
            "Zip": 6036,
            "Location": "Dierikon"
        },
        {
            "Zip": 6037,
            "Location": "Root"
        },
        {
            "Zip": 6037,
            "Location": "Root Zustellung"
        },
        {
            "Zip": 6038,
            "Location": "Gisikon"
        },
        {
            "Zip": 6038,
            "Location": "Honau"
        },
        {
            "Zip": 6039,
            "Location": "Root D4"
        },
        {
            "Zip": 6039,
            "Location": "Root Längenbold SH"
        },
        {
            "Zip": 6042,
            "Location": "Dietwil"
        },
        {
            "Zip": 6043,
            "Location": "Adligenswil"
        },
        {
            "Zip": 6043,
            "Location": "Adligenswil Zustellung"
        },
        {
            "Zip": 6044,
            "Location": "Udligenswil"
        },
        {
            "Zip": 6045,
            "Location": "Meggen"
        },
        {
            "Zip": 6045,
            "Location": "Meggen Zustellung"
        },
        {
            "Zip": 6047,
            "Location": "Kastanienbaum"
        },
        {
            "Zip": 6048,
            "Location": "Horw"
        },
        {
            "Zip": 6048,
            "Location": "Horw Gemeindehausplatz"
        },
        {
            "Zip": 6052,
            "Location": "Hergiswil NW"
        },
        {
            "Zip": 6052,
            "Location": "Hergiswil NW Zustellung"
        },
        {
            "Zip": 6053,
            "Location": "Alpnachstad"
        },
        {
            "Zip": 6055,
            "Location": "Alpnach Dorf"
        },
        {
            "Zip": 6055,
            "Location": "Alpnach Zustellung"
        },
        {
            "Zip": 6056,
            "Location": "Kägiswil"
        },
        {
            "Zip": 6060,
            "Location": "Ramersberg"
        },
        {
            "Zip": 6060,
            "Location": "Sarnen"
        },
        {
            "Zip": 6060,
            "Location": "Sarnen 1"
        },
        {
            "Zip": 6060,
            "Location": "Sarnen 2"
        },
        {
            "Zip": 6060,
            "Location": "Sarnen 2 Büntenpark"
        },
        {
            "Zip": 6060,
            "Location": "Sarnen 2 Zustellung"
        },
        {
            "Zip": 6061,
            "Location": "Sarnen 1"
        },
        {
            "Zip": 6062,
            "Location": "Wilen (Sarnen)"
        },
        {
            "Zip": 6063,
            "Location": "Stalden (Sarnen)"
        },
        {
            "Zip": 6064,
            "Location": "Kerns"
        },
        {
            "Zip": 6066,
            "Location": "St. Niklausen OW"
        },
        {
            "Zip": 6067,
            "Location": "Melchtal"
        },
        {
            "Zip": 6068,
            "Location": "Melchsee-Frutt"
        },
        {
            "Zip": 6072,
            "Location": "Sachseln"
        },
        {
            "Zip": 6073,
            "Location": "Flüeli-Ranft"
        },
        {
            "Zip": 6074,
            "Location": "Giswil"
        },
        {
            "Zip": 6078,
            "Location": "Bürglen OW"
        },
        {
            "Zip": 6078,
            "Location": "Lungern"
        },
        {
            "Zip": 6083,
            "Location": "Hasliberg Hohfluh"
        },
        {
            "Zip": 6084,
            "Location": "Hasliberg Wasserwendi"
        },
        {
            "Zip": 6085,
            "Location": "Hasliberg Goldern"
        },
        {
            "Zip": 6086,
            "Location": "Hasliberg Reuti"
        },
        {
            "Zip": 6102,
            "Location": "Malters"
        },
        {
            "Zip": 6102,
            "Location": "Malters Zustellung"
        },
        {
            "Zip": 6103,
            "Location": "Schwarzenberg LU"
        },
        {
            "Zip": 6105,
            "Location": "Schachen LU"
        },
        {
            "Zip": 6106,
            "Location": "Werthenstein"
        },
        {
            "Zip": 6110,
            "Location": "Fontannen b. Wolhusen"
        },
        {
            "Zip": 6110,
            "Location": "Wolhusen"
        },
        {
            "Zip": 6110,
            "Location": "Wolhusen Zustellung"
        },
        {
            "Zip": 6112,
            "Location": "Doppleschwand"
        },
        {
            "Zip": 6113,
            "Location": "Romoos"
        },
        {
            "Zip": 6114,
            "Location": "Steinhuserberg"
        },
        {
            "Zip": 6122,
            "Location": "Menznau"
        },
        {
            "Zip": 6123,
            "Location": "Geiss"
        },
        {
            "Zip": 6125,
            "Location": "Menzberg"
        },
        {
            "Zip": 6126,
            "Location": "Daiwil"
        },
        {
            "Zip": 6130,
            "Location": "Willisau"
        },
        {
            "Zip": 6130,
            "Location": "Willisau Dist Hub"
        },
        {
            "Zip": 6130,
            "Location": "Willisau Rotmatt"
        },
        {
            "Zip": 6130,
            "Location": "Willisau Zustellung"
        },
        {
            "Zip": 6132,
            "Location": "Rohrmatt"
        },
        {
            "Zip": 6133,
            "Location": "Hergiswil b. Willisau"
        },
        {
            "Zip": 6142,
            "Location": "Gettnau"
        },
        {
            "Zip": 6143,
            "Location": "Ohmstal"
        },
        {
            "Zip": 6144,
            "Location": "Zell LU"
        },
        {
            "Zip": 6145,
            "Location": "Fischbach LU"
        },
        {
            "Zip": 6146,
            "Location": "Grossdietwil"
        },
        {
            "Zip": 6147,
            "Location": "Altbüron"
        },
        {
            "Zip": 6152,
            "Location": "Hüswil"
        },
        {
            "Zip": 6153,
            "Location": "Ufhusen"
        },
        {
            "Zip": 6154,
            "Location": "Hofstatt"
        },
        {
            "Zip": 6156,
            "Location": "Luthern"
        },
        {
            "Zip": 6156,
            "Location": "Luthern Bad"
        },
        {
            "Zip": 6160,
            "Location": "Entlebuch Businesszentrum"
        },
        {
            "Zip": 6161,
            "Location": "Entlebuch Versandzentrum"
        },
        {
            "Zip": 6162,
            "Location": "Entlebuch"
        },
        {
            "Zip": 6162,
            "Location": "Entlebuch Zustellung"
        },
        {
            "Zip": 6162,
            "Location": "Finsterwald b. Entlebuch"
        },
        {
            "Zip": 6162,
            "Location": "Rengg"
        },
        {
            "Zip": 6163,
            "Location": "Ebnet"
        },
        {
            "Zip": 6166,
            "Location": "Hasle LU"
        },
        {
            "Zip": 6167,
            "Location": "Bramboden"
        },
        {
            "Zip": 6170,
            "Location": "Schüpfheim"
        },
        {
            "Zip": 6170,
            "Location": "Schüpfheim Zustellung"
        },
        {
            "Zip": 6173,
            "Location": "Flühli LU"
        },
        {
            "Zip": 6174,
            "Location": "Sörenberg"
        },
        {
            "Zip": 6182,
            "Location": "Escholzmatt"
        },
        {
            "Zip": 6182,
            "Location": "Escholzmatt Zustellung"
        },
        {
            "Zip": 6192,
            "Location": "Wiggen"
        },
        {
            "Zip": 6196,
            "Location": "Marbach LU"
        },
        {
            "Zip": 6197,
            "Location": "Schangnau"
        },
        {
            "Zip": 6203,
            "Location": "Sempach Bahnhof GK"
        },
        {
            "Zip": 6203,
            "Location": "Sempach Station"
        },
        {
            "Zip": 6204,
            "Location": "Sempach"
        },
        {
            "Zip": 6204,
            "Location": "Sempach Stadt"
        },
        {
            "Zip": 6205,
            "Location": "Eich"
        },
        {
            "Zip": 6206,
            "Location": "Neuenkirch"
        },
        {
            "Zip": 6207,
            "Location": "Nottwil"
        },
        {
            "Zip": 6207,
            "Location": "Nottwil Paraplegikerzentrum"
        },
        {
            "Zip": 6208,
            "Location": "Oberkirch LU"
        },
        {
            "Zip": 6210,
            "Location": "Sursee"
        },
        {
            "Zip": 6210,
            "Location": "Sursee Zustellung"
        },
        {
            "Zip": 6211,
            "Location": "Buchs LU"
        },
        {
            "Zip": 6212,
            "Location": "Kaltbach"
        },
        {
            "Zip": 6212,
            "Location": "St. Erhard"
        },
        {
            "Zip": 6213,
            "Location": "Knutwil"
        },
        {
            "Zip": 6214,
            "Location": "Schenkon"
        },
        {
            "Zip": 6215,
            "Location": "Beromünster"
        },
        {
            "Zip": 6215,
            "Location": "Schwarzenbach LU"
        },
        {
            "Zip": 6216,
            "Location": "Mauensee"
        },
        {
            "Zip": 6217,
            "Location": "Kottwil"
        },
        {
            "Zip": 6218,
            "Location": "Ettiswil"
        },
        {
            "Zip": 6221,
            "Location": "Rickenbach LU"
        },
        {
            "Zip": 6222,
            "Location": "Gunzwil"
        },
        {
            "Zip": 6231,
            "Location": "Schlierbach"
        },
        {
            "Zip": 6232,
            "Location": "Geuensee"
        },
        {
            "Zip": 6233,
            "Location": "Büron"
        },
        {
            "Zip": 6233,
            "Location": "Büron Industriestrasse"
        },
        {
            "Zip": 6234,
            "Location": "Kulmerau"
        },
        {
            "Zip": 6234,
            "Location": "Triengen"
        },
        {
            "Zip": 6235,
            "Location": "Winikon"
        },
        {
            "Zip": 6236,
            "Location": "Wilihof"
        },
        {
            "Zip": 6242,
            "Location": "Wauwil"
        },
        {
            "Zip": 6242,
            "Location": "Wauwil Dorfstrasse"
        },
        {
            "Zip": 6243,
            "Location": "Egolzwil"
        },
        {
            "Zip": 6244,
            "Location": "Nebikon"
        },
        {
            "Zip": 6245,
            "Location": "Ebersecken"
        },
        {
            "Zip": 6246,
            "Location": "Altishofen"
        },
        {
            "Zip": 6247,
            "Location": "Schötz"
        },
        {
            "Zip": 6248,
            "Location": "Alberswil"
        },
        {
            "Zip": 6252,
            "Location": "Dagmersellen"
        },
        {
            "Zip": 6253,
            "Location": "Uffikon"
        },
        {
            "Zip": 6260,
            "Location": "Hintermoos"
        },
        {
            "Zip": 6260,
            "Location": "Mehlsecken"
        },
        {
            "Zip": 6260,
            "Location": "Reiden"
        },
        {
            "Zip": 6260,
            "Location": "Reiden Zustellung"
        },
        {
            "Zip": 6260,
            "Location": "Reidermoos"
        },
        {
            "Zip": 6262,
            "Location": "Langnau b. Reiden"
        },
        {
            "Zip": 6263,
            "Location": "Richenthal"
        },
        {
            "Zip": 6264,
            "Location": "Pfaffnau"
        },
        {
            "Zip": 6265,
            "Location": "Roggliswil"
        },
        {
            "Zip": 6274,
            "Location": "Eschenbach LU"
        },
        {
            "Zip": 6275,
            "Location": "Ballwil"
        },
        {
            "Zip": 6276,
            "Location": "Hohenrain"
        },
        {
            "Zip": 6277,
            "Location": "Kleinwangen"
        },
        {
            "Zip": 6277,
            "Location": "Lieli LU"
        },
        {
            "Zip": 6280,
            "Location": "Hochdorf"
        },
        {
            "Zip": 6280,
            "Location": "Hochdorf Hauptstrasse"
        },
        {
            "Zip": 6280,
            "Location": "Hochdorf Zustellung"
        },
        {
            "Zip": 6280,
            "Location": "Urswil"
        },
        {
            "Zip": 6281,
            "Location": "Hochdorf"
        },
        {
            "Zip": 6283,
            "Location": "Baldegg"
        },
        {
            "Zip": 6284,
            "Location": "Gelfingen"
        },
        {
            "Zip": 6284,
            "Location": "Sulz LU"
        },
        {
            "Zip": 6285,
            "Location": "Hitzkirch"
        },
        {
            "Zip": 6285,
            "Location": "Retschwil"
        },
        {
            "Zip": 6286,
            "Location": "Altwis"
        },
        {
            "Zip": 6287,
            "Location": "Aesch LU"
        },
        {
            "Zip": 6288,
            "Location": "Schongau"
        },
        {
            "Zip": 6289,
            "Location": "Hämikon"
        },
        {
            "Zip": 6289,
            "Location": "Müswangen"
        },
        {
            "Zip": 6294,
            "Location": "Ermensee"
        },
        {
            "Zip": 6295,
            "Location": "Mosen"
        },
        {
            "Zip": 6300,
            "Location": "Zug"
        },
        {
            "Zip": 6300,
            "Location": "Zug Altstadt"
        },
        {
            "Zip": 6300,
            "Location": "Zugerberg"
        },
        {
            "Zip": 6301,
            "Location": "Zug"
        },
        {
            "Zip": 6301,
            "Location": "Zug SPS"
        },
        {
            "Zip": 6302,
            "Location": "Zug"
        },
        {
            "Zip": 6303,
            "Location": "Zug"
        },
        {
            "Zip": 6312,
            "Location": "Steinhausen"
        },
        {
            "Zip": 6313,
            "Location": "Edlibach"
        },
        {
            "Zip": 6313,
            "Location": "Finstersee"
        },
        {
            "Zip": 6313,
            "Location": "Menzingen"
        },
        {
            "Zip": 6314,
            "Location": "Neuägeri"
        },
        {
            "Zip": 6314,
            "Location": "Unterägeri"
        },
        {
            "Zip": 6314,
            "Location": "Unterägeri Zustellung"
        },
        {
            "Zip": 6315,
            "Location": "Alosen"
        },
        {
            "Zip": 6315,
            "Location": "Morgarten"
        },
        {
            "Zip": 6315,
            "Location": "Oberägeri"
        },
        {
            "Zip": 6317,
            "Location": "Oberwil b. Zug"
        },
        {
            "Zip": 6318,
            "Location": "Walchwil"
        },
        {
            "Zip": 6319,
            "Location": "Allenwinden"
        },
        {
            "Zip": 6330,
            "Location": "Cham"
        },
        {
            "Zip": 6330,
            "Location": "Cham Hinterbergstrasse"
        },
        {
            "Zip": 6331,
            "Location": "Hünenberg"
        },
        {
            "Zip": 6331,
            "Location": "Hünenberg Bösch"
        },
        {
            "Zip": 6331,
            "Location": "Hünenberg Zustellung"
        },
        {
            "Zip": 6332,
            "Location": "Hagendorn"
        },
        {
            "Zip": 6333,
            "Location": "Hünenberg See"
        },
        {
            "Zip": 6340,
            "Location": "Baar"
        },
        {
            "Zip": 6340,
            "Location": "Baar Dorfstrasse"
        },
        {
            "Zip": 6340,
            "Location": "Sihlbrugg"
        },
        {
            "Zip": 6341,
            "Location": "Baar"
        },
        {
            "Zip": 6343,
            "Location": "Buonas"
        },
        {
            "Zip": 6343,
            "Location": "Holzhäusern ZG"
        },
        {
            "Zip": 6343,
            "Location": "Risch"
        },
        {
            "Zip": 6343,
            "Location": "Rotkreuz"
        },
        {
            "Zip": 6344,
            "Location": "Meierskappel"
        },
        {
            "Zip": 6345,
            "Location": "Neuheim"
        },
        {
            "Zip": 6346,
            "Location": "Baar 3"
        },
        {
            "Zip": 6346,
            "Location": "Baar 3 Dist Ba"
        },
        {
            "Zip": 6349,
            "Location": "Baar Sonderdienste"
        },
        {
            "Zip": 6353,
            "Location": "Weggis"
        },
        {
            "Zip": 6354,
            "Location": "Vitznau"
        },
        {
            "Zip": 6356,
            "Location": "Rigi Kaltbad"
        },
        {
            "Zip": 6362,
            "Location": "Stansstad"
        },
        {
            "Zip": 6363,
            "Location": "Bürgenstock"
        },
        {
            "Zip": 6363,
            "Location": "Fürigen"
        },
        {
            "Zip": 6363,
            "Location": "Obbürgen"
        },
        {
            "Zip": 6365,
            "Location": "Kehrsiten"
        },
        {
            "Zip": 6370,
            "Location": "Oberdorf NW"
        },
        {
            "Zip": 6370,
            "Location": "Stans"
        },
        {
            "Zip": 6370,
            "Location": "Stans Bahnhofplatz"
        },
        {
            "Zip": 6370,
            "Location": "Stans Kaserne"
        },
        {
            "Zip": 6371,
            "Location": "Stans"
        },
        {
            "Zip": 6372,
            "Location": "Ennetmoos"
        },
        {
            "Zip": 6373,
            "Location": "Ennetbürgen"
        },
        {
            "Zip": 6374,
            "Location": "Buochs"
        },
        {
            "Zip": 6374,
            "Location": "Buochs Zustellung"
        },
        {
            "Zip": 6375,
            "Location": "Beckenried"
        },
        {
            "Zip": 6376,
            "Location": "Emmetten"
        },
        {
            "Zip": 6377,
            "Location": "Seelisberg"
        },
        {
            "Zip": 6382,
            "Location": "Büren NW"
        },
        {
            "Zip": 6383,
            "Location": "Dallenwil"
        },
        {
            "Zip": 6383,
            "Location": "Niederrickenbach"
        },
        {
            "Zip": 6383,
            "Location": "Wiesenberg"
        },
        {
            "Zip": 6383,
            "Location": "Wirzweli"
        },
        {
            "Zip": 6386,
            "Location": "Wolfenschiessen"
        },
        {
            "Zip": 6387,
            "Location": "Oberrickenbach"
        },
        {
            "Zip": 6388,
            "Location": "Grafenort"
        },
        {
            "Zip": 6390,
            "Location": "Engelberg"
        },
        {
            "Zip": 6390,
            "Location": "Engelberg Zustellung"
        },
        {
            "Zip": 6391,
            "Location": "Engelberg"
        },
        {
            "Zip": 6402,
            "Location": "Merlischachen"
        },
        {
            "Zip": 6403,
            "Location": "Küssnacht a.R. Dist Hub"
        },
        {
            "Zip": 6403,
            "Location": "Küssnacht a.R. Zugstrasse"
        },
        {
            "Zip": 6403,
            "Location": "Küssnacht am Rigi"
        },
        {
            "Zip": 6403,
            "Location": "Küssnacht am Rigi Zust"
        },
        {
            "Zip": 6404,
            "Location": "Greppen"
        },
        {
            "Zip": 6405,
            "Location": "Immensee"
        },
        {
            "Zip": 6410,
            "Location": "Goldau"
        },
        {
            "Zip": 6410,
            "Location": "Goldau Zustellung"
        },
        {
            "Zip": 6410,
            "Location": "Rigi Klösterli"
        },
        {
            "Zip": 6410,
            "Location": "Rigi Kulm"
        },
        {
            "Zip": 6410,
            "Location": "Rigi Scheidegg"
        },
        {
            "Zip": 6410,
            "Location": "Rigi Staffel"
        },
        {
            "Zip": 6414,
            "Location": "Oberarth"
        },
        {
            "Zip": 6415,
            "Location": "Arth"
        },
        {
            "Zip": 6416,
            "Location": "Steinerberg"
        },
        {
            "Zip": 6417,
            "Location": "Sattel"
        },
        {
            "Zip": 6418,
            "Location": "Rothenthurm"
        },
        {
            "Zip": 6422,
            "Location": "Steinen"
        },
        {
            "Zip": 6422,
            "Location": "Steinen Zustellung"
        },
        {
            "Zip": 6423,
            "Location": "Seewen SZ"
        },
        {
            "Zip": 6424,
            "Location": "Lauerz"
        },
        {
            "Zip": 6430,
            "Location": "Schwyz"
        },
        {
            "Zip": 6430,
            "Location": "Schwyz Zustellung"
        },
        {
            "Zip": 6431,
            "Location": "Schwyz"
        },
        {
            "Zip": 6432,
            "Location": "Rickenbach b. Schwyz"
        },
        {
            "Zip": 6433,
            "Location": "Stoos SZ"
        },
        {
            "Zip": 6434,
            "Location": "Illgau"
        },
        {
            "Zip": 6436,
            "Location": "Bisisthal"
        },
        {
            "Zip": 6436,
            "Location": "Muotathal"
        },
        {
            "Zip": 6436,
            "Location": "Ried (Muotathal)"
        },
        {
            "Zip": 6438,
            "Location": "Ibach"
        },
        {
            "Zip": 6440,
            "Location": "Brunnen"
        },
        {
            "Zip": 6440,
            "Location": "Brunnen Zustellung"
        },
        {
            "Zip": 6441,
            "Location": "Rütli"
        },
        {
            "Zip": 6442,
            "Location": "Gersau"
        },
        {
            "Zip": 6443,
            "Location": "Morschach"
        },
        {
            "Zip": 6452,
            "Location": "Riemenstalden"
        },
        {
            "Zip": 6452,
            "Location": "Sisikon"
        },
        {
            "Zip": 6454,
            "Location": "Flüelen"
        },
        {
            "Zip": 6460,
            "Location": "Altdorf UR"
        },
        {
            "Zip": 6460,
            "Location": "Altdorf UR 1"
        },
        {
            "Zip": 6460,
            "Location": "Altdorf UR 2"
        },
        {
            "Zip": 6460,
            "Location": "Altdorf UR 2 Rynächt"
        },
        {
            "Zip": 6460,
            "Location": "Altdorf UR 2 Zustellung"
        },
        {
            "Zip": 6461,
            "Location": "Isenthal"
        },
        {
            "Zip": 6462,
            "Location": "Seedorf UR"
        },
        {
            "Zip": 6463,
            "Location": "Bürglen UR"
        },
        {
            "Zip": 6464,
            "Location": "Spiringen"
        },
        {
            "Zip": 6465,
            "Location": "Unterschächen"
        },
        {
            "Zip": 6466,
            "Location": "Bauen"
        },
        {
            "Zip": 6467,
            "Location": "Schattdorf"
        },
        {
            "Zip": 6468,
            "Location": "Attinghausen"
        },
        {
            "Zip": 6469,
            "Location": "Haldi b. Schattdorf"
        },
        {
            "Zip": 6472,
            "Location": "Erstfeld"
        },
        {
            "Zip": 6473,
            "Location": "Silenen"
        },
        {
            "Zip": 6474,
            "Location": "Amsteg"
        },
        {
            "Zip": 6475,
            "Location": "Bristen"
        },
        {
            "Zip": 6476,
            "Location": "Intschi"
        },
        {
            "Zip": 6482,
            "Location": "Gurtnellen"
        },
        {
            "Zip": 6484,
            "Location": "Wassen UR"
        },
        {
            "Zip": 6485,
            "Location": "Meien"
        },
        {
            "Zip": 6487,
            "Location": "Göschenen"
        },
        {
            "Zip": 6490,
            "Location": "Andermatt"
        },
        {
            "Zip": 6491,
            "Location": "Realp"
        },
        {
            "Zip": 6493,
            "Location": "Hospental"
        },
        {
            "Zip": 6500,
            "Location": "Bellinzona"
        },
        {
            "Zip": 6500,
            "Location": "Bellinzona 1"
        },
        {
            "Zip": 6500,
            "Location": "Bellinzona 2"
        },
        {
            "Zip": 6500,
            "Location": "Bellinzona 4"
        },
        {
            "Zip": 6500,
            "Location": "Bellinzona 5"
        },
        {
            "Zip": 6500,
            "Location": "Bellinzona Caserma"
        },
        {
            "Zip": 6500,
            "Location": "Bellinzona centro servici"
        },
        {
            "Zip": 6500,
            "Location": "Bellinzona Distribuzione"
        },
        {
            "Zip": 6500,
            "Location": "Bellinzona VZ"
        },
        {
            "Zip": 6501,
            "Location": "Bellinzona"
        },
        {
            "Zip": 6501,
            "Location": "Bellinzona SPS"
        },
        {
            "Zip": 6503,
            "Location": "Bellinzona"
        },
        {
            "Zip": 6506,
            "Location": "Bellinzona 6 Autopostale TI"
        },
        {
            "Zip": 6511,
            "Location": "Cadenazzo Scanning-Center"
        },
        {
            "Zip": 6512,
            "Location": "Giubiasco"
        },
        {
            "Zip": 6513,
            "Location": "Monte Carasso"
        },
        {
            "Zip": 6514,
            "Location": "Sementina"
        },
        {
            "Zip": 6515,
            "Location": "Gudo"
        },
        {
            "Zip": 6516,
            "Location": "Cugnasco"
        },
        {
            "Zip": 6517,
            "Location": "Arbedo"
        },
        {
            "Zip": 6518,
            "Location": "Gorduno"
        },
        {
            "Zip": 6523,
            "Location": "Preonzo"
        },
        {
            "Zip": 6524,
            "Location": "Moleno"
        },
        {
            "Zip": 6525,
            "Location": "Gnosca"
        },
        {
            "Zip": 6526,
            "Location": "Prosito"
        },
        {
            "Zip": 6527,
            "Location": "Lodrino"
        },
        {
            "Zip": 6528,
            "Location": "Camorino"
        },
        {
            "Zip": 6530,
            "Location": "Cadenazzo CALL"
        },
        {
            "Zip": 6532,
            "Location": "Castione"
        },
        {
            "Zip": 6533,
            "Location": "Lumino"
        },
        {
            "Zip": 6534,
            "Location": "S. Vittore"
        },
        {
            "Zip": 6535,
            "Location": "Roveredo GR"
        },
        {
            "Zip": 6537,
            "Location": "Grono"
        },
        {
            "Zip": 6538,
            "Location": "Verdabbio"
        },
        {
            "Zip": 6540,
            "Location": "Castaneda"
        },
        {
            "Zip": 6541,
            "Location": "Sta. Maria in Calanca"
        },
        {
            "Zip": 6542,
            "Location": "Buseno"
        },
        {
            "Zip": 6543,
            "Location": "Arvigo"
        },
        {
            "Zip": 6544,
            "Location": "Braggio"
        },
        {
            "Zip": 6545,
            "Location": "Selma"
        },
        {
            "Zip": 6546,
            "Location": "Cauco"
        },
        {
            "Zip": 6548,
            "Location": "Augio"
        },
        {
            "Zip": 6548,
            "Location": "Rossa"
        },
        {
            "Zip": 6548,
            "Location": "Sta. Domenica"
        },
        {
            "Zip": 6549,
            "Location": "Laura"
        },
        {
            "Zip": 6556,
            "Location": "Leggia"
        },
        {
            "Zip": 6557,
            "Location": "Cama"
        },
        {
            "Zip": 6558,
            "Location": "Cabbiolo"
        },
        {
            "Zip": 6558,
            "Location": "Lostallo"
        },
        {
            "Zip": 6562,
            "Location": "Soazza"
        },
        {
            "Zip": 6563,
            "Location": "Mesocco"
        },
        {
            "Zip": 6565,
            "Location": "S. Bernardino"
        },
        {
            "Zip": 6571,
            "Location": "Indemini"
        },
        {
            "Zip": 6572,
            "Location": "Quartino"
        },
        {
            "Zip": 6573,
            "Location": "Magadino"
        },
        {
            "Zip": 6574,
            "Location": "Vira (Gambarogno)"
        },
        {
            "Zip": 6575,
            "Location": "S. Nazzaro"
        },
        {
            "Zip": 6575,
            "Location": "Vairano"
        },
        {
            "Zip": 6576,
            "Location": "Gerra (Gambarogno)"
        },
        {
            "Zip": 6577,
            "Location": "Ranzo"
        },
        {
            "Zip": 6578,
            "Location": "Caviano"
        },
        {
            "Zip": 6579,
            "Location": "Piazzogna"
        },
        {
            "Zip": 6582,
            "Location": "Pianezzo"
        },
        {
            "Zip": 6583,
            "Location": "S. Antonio (Val Morobbia)"
        },
        {
            "Zip": 6584,
            "Location": "Carena"
        },
        {
            "Zip": 6590,
            "Location": "Cadenazzo Centro logistico"
        },
        {
            "Zip": 6590,
            "Location": "Cadenazzo CLL AP"
        },
        {
            "Zip": 6591,
            "Location": "Cadenazzo CPR"
        },
        {
            "Zip": 6591,
            "Location": "Cadenazzo Spartizione P"
        },
        {
            "Zip": 6592,
            "Location": "S. Antonino"
        },
        {
            "Zip": 6593,
            "Location": "Cadenazzo"
        },
        {
            "Zip": 6593,
            "Location": "Cadenazzo Dist Ba"
        },
        {
            "Zip": 6593,
            "Location": "Cadenazzo Distribuzione"
        },
        {
            "Zip": 6593,
            "Location": "Cadenazzo PL3"
        },
        {
            "Zip": 6594,
            "Location": "Contone"
        },
        {
            "Zip": 6595,
            "Location": "Riazzino"
        },
        {
            "Zip": 6595,
            "Location": "Riazzino Distribuzione"
        },
        {
            "Zip": 6596,
            "Location": "Gordola"
        },
        {
            "Zip": 6597,
            "Location": "Agarone"
        },
        {
            "Zip": 6598,
            "Location": "Tenero"
        },
        {
            "Zip": 6599,
            "Location": "Robasacco"
        },
        {
            "Zip": 6600,
            "Location": "Locarno"
        },
        {
            "Zip": 6600,
            "Location": "Locarno 1"
        },
        {
            "Zip": 6600,
            "Location": "Locarno 4 Solduno"
        },
        {
            "Zip": 6600,
            "Location": "Locarno Distribuzione"
        },
        {
            "Zip": 6600,
            "Location": "Muralto"
        },
        {
            "Zip": 6600,
            "Location": "Solduno"
        },
        {
            "Zip": 6601,
            "Location": "Locarno"
        },
        {
            "Zip": 6601,
            "Location": "Locarno SPS"
        },
        {
            "Zip": 6602,
            "Location": "Muralto"
        },
        {
            "Zip": 6604,
            "Location": "Locarno"
        },
        {
            "Zip": 6605,
            "Location": "Locarno"
        },
        {
            "Zip": 6611,
            "Location": "Crana"
        },
        {
            "Zip": 6611,
            "Location": "Gresso"
        },
        {
            "Zip": 6611,
            "Location": "Mosogno"
        },
        {
            "Zip": 6612,
            "Location": "Ascona"
        },
        {
            "Zip": 6613,
            "Location": "Porto Ronco"
        },
        {
            "Zip": 6614,
            "Location": "Brissago"
        },
        {
            "Zip": 6614,
            "Location": "Isole di Brissago"
        },
        {
            "Zip": 6616,
            "Location": "Losone"
        },
        {
            "Zip": 6616,
            "Location": "Losone Caserma"
        },
        {
            "Zip": 6616,
            "Location": "Losone via Locarno"
        },
        {
            "Zip": 6618,
            "Location": "Arcegno"
        },
        {
            "Zip": 6622,
            "Location": "Ronco sopra Ascona"
        },
        {
            "Zip": 6631,
            "Location": "Corippo"
        },
        {
            "Zip": 6632,
            "Location": "Vogorno"
        },
        {
            "Zip": 6633,
            "Location": "Lavertezzo"
        },
        {
            "Zip": 6634,
            "Location": "Brione (Verzasca)"
        },
        {
            "Zip": 6635,
            "Location": "Gerra (Verzasca)"
        },
        {
            "Zip": 6636,
            "Location": "Frasco"
        },
        {
            "Zip": 6637,
            "Location": "Sonogno"
        },
        {
            "Zip": 6644,
            "Location": "Orselina"
        },
        {
            "Zip": 6645,
            "Location": "Brione sopra Minusio"
        },
        {
            "Zip": 6646,
            "Location": "Contra"
        },
        {
            "Zip": 6647,
            "Location": "Mergoscia"
        },
        {
            "Zip": 6648,
            "Location": "Minusio"
        },
        {
            "Zip": 6652,
            "Location": "Tegna"
        },
        {
            "Zip": 6653,
            "Location": "Verscio"
        },
        {
            "Zip": 6654,
            "Location": "Cavigliano"
        },
        {
            "Zip": 6655,
            "Location": "Intragna"
        },
        {
            "Zip": 6655,
            "Location": "Rasa"
        },
        {
            "Zip": 6655,
            "Location": "Verdasio"
        },
        {
            "Zip": 6656,
            "Location": "Golino"
        },
        {
            "Zip": 6657,
            "Location": "Palagnedra"
        },
        {
            "Zip": 6658,
            "Location": "Borgnone"
        },
        {
            "Zip": 6659,
            "Location": "Camedo"
        },
        {
            "Zip": 6659,
            "Location": "Moneto"
        },
        {
            "Zip": 6661,
            "Location": "Auressio"
        },
        {
            "Zip": 6661,
            "Location": "Berzona"
        },
        {
            "Zip": 6661,
            "Location": "Loco"
        },
        {
            "Zip": 6662,
            "Location": "Russo"
        },
        {
            "Zip": 6663,
            "Location": "Comologno"
        },
        {
            "Zip": 6663,
            "Location": "Spruga"
        },
        {
            "Zip": 6664,
            "Location": "Vergeletto"
        },
        {
            "Zip": 6670,
            "Location": "Avegno"
        },
        {
            "Zip": 6672,
            "Location": "Gordevio"
        },
        {
            "Zip": 6673,
            "Location": "Maggia"
        },
        {
            "Zip": 6674,
            "Location": "Riveo"
        },
        {
            "Zip": 6674,
            "Location": "Someo"
        },
        {
            "Zip": 6675,
            "Location": "Cevio"
        },
        {
            "Zip": 6676,
            "Location": "Bignasco"
        },
        {
            "Zip": 6677,
            "Location": "Aurigeno"
        },
        {
            "Zip": 6677,
            "Location": "Moghegno"
        },
        {
            "Zip": 6678,
            "Location": "Coglio"
        },
        {
            "Zip": 6678,
            "Location": "Giumaglio"
        },
        {
            "Zip": 6678,
            "Location": "Lodano"
        },
        {
            "Zip": 6682,
            "Location": "Linescio"
        },
        {
            "Zip": 6683,
            "Location": "Cerentino"
        },
        {
            "Zip": 6683,
            "Location": "Niva (Vallemaggia)"
        },
        {
            "Zip": 6684,
            "Location": "Campo (Vallemaggia)"
        },
        {
            "Zip": 6684,
            "Location": "Cimalmotto"
        },
        {
            "Zip": 6685,
            "Location": "Bosco\\Gurin"
        },
        {
            "Zip": 6690,
            "Location": "Cavergno"
        },
        {
            "Zip": 6690,
            "Location": "S. Carlo (Val Bavona)"
        },
        {
            "Zip": 6692,
            "Location": "Brontallo"
        },
        {
            "Zip": 6692,
            "Location": "Menzonio"
        },
        {
            "Zip": 6693,
            "Location": "Broglio"
        },
        {
            "Zip": 6694,
            "Location": "Prato-Sornico"
        },
        {
            "Zip": 6695,
            "Location": "Peccia"
        },
        {
            "Zip": 6695,
            "Location": "Piano di Peccia"
        },
        {
            "Zip": 6696,
            "Location": "Fusio"
        },
        {
            "Zip": 6702,
            "Location": "Claro"
        },
        {
            "Zip": 6703,
            "Location": "Osogna"
        },
        {
            "Zip": 6705,
            "Location": "Cresciano"
        },
        {
            "Zip": 6707,
            "Location": "Iragna"
        },
        {
            "Zip": 6710,
            "Location": "Biasca"
        },
        {
            "Zip": 6710,
            "Location": "Biasca Distribuzione"
        },
        {
            "Zip": 6710,
            "Location": "Biasca Stazione"
        },
        {
            "Zip": 6713,
            "Location": "Malvaglia"
        },
        {
            "Zip": 6714,
            "Location": "Semione"
        },
        {
            "Zip": 6715,
            "Location": "Dongio"
        },
        {
            "Zip": 6716,
            "Location": "Acquarossa"
        },
        {
            "Zip": 6716,
            "Location": "Leontica"
        },
        {
            "Zip": 6716,
            "Location": "Lottigna"
        },
        {
            "Zip": 6717,
            "Location": "Dangio"
        },
        {
            "Zip": 6717,
            "Location": "Torre"
        },
        {
            "Zip": 6718,
            "Location": "Camperio"
        },
        {
            "Zip": 6718,
            "Location": "Olivone"
        },
        {
            "Zip": 6719,
            "Location": "Aquila"
        },
        {
            "Zip": 6720,
            "Location": "Campo (Blenio)"
        },
        {
            "Zip": 6720,
            "Location": "Ghirone"
        },
        {
            "Zip": 6721,
            "Location": "Ludiano"
        },
        {
            "Zip": 6721,
            "Location": "Motto (Blenio)"
        },
        {
            "Zip": 6722,
            "Location": "Corzoneso"
        },
        {
            "Zip": 6723,
            "Location": "Castro"
        },
        {
            "Zip": 6723,
            "Location": "Marolta"
        },
        {
            "Zip": 6723,
            "Location": "Prugiasco"
        },
        {
            "Zip": 6724,
            "Location": "Largario"
        },
        {
            "Zip": 6724,
            "Location": "Ponto Valentino"
        },
        {
            "Zip": 6742,
            "Location": "Pollegio"
        },
        {
            "Zip": 6743,
            "Location": "Bodio TI"
        },
        {
            "Zip": 6744,
            "Location": "Personico"
        },
        {
            "Zip": 6745,
            "Location": "Giornico"
        },
        {
            "Zip": 6746,
            "Location": "Calonico"
        },
        {
            "Zip": 6746,
            "Location": "Lavorgo"
        },
        {
            "Zip": 6746,
            "Location": "Nivo"
        },
        {
            "Zip": 6747,
            "Location": "Chironico"
        },
        {
            "Zip": 6748,
            "Location": "Anzonico"
        },
        {
            "Zip": 6749,
            "Location": "Cavagnago"
        },
        {
            "Zip": 6749,
            "Location": "Sobrio"
        },
        {
            "Zip": 6760,
            "Location": "Calpiogna"
        },
        {
            "Zip": 6760,
            "Location": "Campello"
        },
        {
            "Zip": 6760,
            "Location": "Carì"
        },
        {
            "Zip": 6760,
            "Location": "Faido"
        },
        {
            "Zip": 6760,
            "Location": "Molare"
        },
        {
            "Zip": 6760,
            "Location": "Rossura"
        },
        {
            "Zip": 6763,
            "Location": "Mairengo"
        },
        {
            "Zip": 6763,
            "Location": "Osco"
        },
        {
            "Zip": 6764,
            "Location": "Chiggiogna"
        },
        {
            "Zip": 6772,
            "Location": "Rodi-Fiesso"
        },
        {
            "Zip": 6773,
            "Location": "Prato (Leventina)"
        },
        {
            "Zip": 6774,
            "Location": "Dalpe"
        },
        {
            "Zip": 6775,
            "Location": "Ambrì"
        },
        {
            "Zip": 6776,
            "Location": "Piotta"
        },
        {
            "Zip": 6777,
            "Location": "Quinto"
        },
        {
            "Zip": 6777,
            "Location": "Varenzo"
        },
        {
            "Zip": 6780,
            "Location": "Airolo"
        },
        {
            "Zip": 6780,
            "Location": "Airolo Caserma"
        },
        {
            "Zip": 6780,
            "Location": "Madrano"
        },
        {
            "Zip": 6781,
            "Location": "Bedretto"
        },
        {
            "Zip": 6781,
            "Location": "Villa Bedretto"
        },
        {
            "Zip": 6802,
            "Location": "Rivera"
        },
        {
            "Zip": 6802,
            "Location": "Rivera Caserma"
        },
        {
            "Zip": 6803,
            "Location": "Camignolo"
        },
        {
            "Zip": 6804,
            "Location": "Bironico"
        },
        {
            "Zip": 6805,
            "Location": "Mezzovico"
        },
        {
            "Zip": 6806,
            "Location": "Sigirino"
        },
        {
            "Zip": 6807,
            "Location": "Taverne"
        },
        {
            "Zip": 6808,
            "Location": "Torricella"
        },
        {
            "Zip": 6809,
            "Location": "Medeglia"
        },
        {
            "Zip": 6810,
            "Location": "Isone"
        },
        {
            "Zip": 6810,
            "Location": "Isone Caserma"
        },
        {
            "Zip": 6814,
            "Location": "Cadempino"
        },
        {
            "Zip": 6814,
            "Location": "Lamone"
        },
        {
            "Zip": 6814,
            "Location": "Lamone-Cadempino"
        },
        {
            "Zip": 6814,
            "Location": "Lamone-Cadempino via Cant."
        },
        {
            "Zip": 6815,
            "Location": "Melide"
        },
        {
            "Zip": 6816,
            "Location": "Bissone"
        },
        {
            "Zip": 6817,
            "Location": "Maroggia"
        },
        {
            "Zip": 6818,
            "Location": "Melano"
        },
        {
            "Zip": 6821,
            "Location": "Rovio"
        },
        {
            "Zip": 6822,
            "Location": "Arogno"
        },
        {
            "Zip": 6823,
            "Location": "Pugerna"
        },
        {
            "Zip": 6825,
            "Location": "Capolago"
        },
        {
            "Zip": 6826,
            "Location": "Riva San Vitale"
        },
        {
            "Zip": 6827,
            "Location": "Brusino Arsizio"
        },
        {
            "Zip": 6828,
            "Location": "Balerna"
        },
        {
            "Zip": 6830,
            "Location": "Chiasso"
        },
        {
            "Zip": 6830,
            "Location": "Chiasso 1"
        },
        {
            "Zip": 6830,
            "Location": "Chiasso 1 ZF"
        },
        {
            "Zip": 6830,
            "Location": "Chiasso 3"
        },
        {
            "Zip": 6830,
            "Location": "Chiasso SPS"
        },
        {
            "Zip": 6832,
            "Location": "Pedrinate"
        },
        {
            "Zip": 6832,
            "Location": "Seseglio"
        },
        {
            "Zip": 6833,
            "Location": "Vacallo"
        },
        {
            "Zip": 6834,
            "Location": "Morbio Inferiore"
        },
        {
            "Zip": 6835,
            "Location": "Morbio Superiore"
        },
        {
            "Zip": 6836,
            "Location": "Serfontana"
        },
        {
            "Zip": 6837,
            "Location": "Bruzella"
        },
        {
            "Zip": 6837,
            "Location": "Caneggio"
        },
        {
            "Zip": 6838,
            "Location": "Cabbio"
        },
        {
            "Zip": 6838,
            "Location": "Muggio"
        },
        {
            "Zip": 6838,
            "Location": "Scudellate"
        },
        {
            "Zip": 6839,
            "Location": "Sagno"
        },
        {
            "Zip": 6850,
            "Location": "Mendrisio"
        },
        {
            "Zip": 6850,
            "Location": "Mendrisio Borgo"
        },
        {
            "Zip": 6850,
            "Location": "Mendrisio Distribuzione"
        },
        {
            "Zip": 6850,
            "Location": "Mendrisio Stazione"
        },
        {
            "Zip": 6852,
            "Location": "Genestrerio"
        },
        {
            "Zip": 6853,
            "Location": "Ligornetto"
        },
        {
            "Zip": 6854,
            "Location": "S. Pietro"
        },
        {
            "Zip": 6855,
            "Location": "Stabio"
        },
        {
            "Zip": 6862,
            "Location": "Rancate"
        },
        {
            "Zip": 6863,
            "Location": "Besazio"
        },
        {
            "Zip": 6864,
            "Location": "Arzo"
        },
        {
            "Zip": 6865,
            "Location": "Tremona"
        },
        {
            "Zip": 6866,
            "Location": "Meride"
        },
        {
            "Zip": 6867,
            "Location": "Serpiano"
        },
        {
            "Zip": 6872,
            "Location": "Salorino"
        },
        {
            "Zip": 6872,
            "Location": "Somazzo"
        },
        {
            "Zip": 6873,
            "Location": "Corteglia"
        },
        {
            "Zip": 6874,
            "Location": "Castel San Pietro"
        },
        {
            "Zip": 6875,
            "Location": "Campora"
        },
        {
            "Zip": 6875,
            "Location": "Casima"
        },
        {
            "Zip": 6875,
            "Location": "Monte"
        },
        {
            "Zip": 6877,
            "Location": "Coldrerio"
        },
        {
            "Zip": 6883,
            "Location": "Novazzano"
        },
        {
            "Zip": 6900,
            "Location": "Lugano"
        },
        {
            "Zip": 6900,
            "Location": "Lugano 1"
        },
        {
            "Zip": 6900,
            "Location": "Lugano 2"
        },
        {
            "Zip": 6900,
            "Location": "Lugano 3"
        },
        {
            "Zip": 6900,
            "Location": "Lugano 4"
        },
        {
            "Zip": 6900,
            "Location": "Lugano 6"
        },
        {
            "Zip": 6900,
            "Location": "Lugano 8"
        },
        {
            "Zip": 6900,
            "Location": "Lugano Distribuzione"
        },
        {
            "Zip": 6900,
            "Location": "Lugano Loreto"
        },
        {
            "Zip": 6900,
            "Location": "Lugano MailSource"
        },
        {
            "Zip": 6900,
            "Location": "Massagno"
        },
        {
            "Zip": 6900,
            "Location": "Paradiso"
        },
        {
            "Zip": 6901,
            "Location": "Lugano"
        },
        {
            "Zip": 6901,
            "Location": "Lugano SPS"
        },
        {
            "Zip": 6902,
            "Location": "Lugano 2 Paradiso Caselle"
        },
        {
            "Zip": 6903,
            "Location": "Lugano"
        },
        {
            "Zip": 6904,
            "Location": "Lugano 4 Molino Nuovo Casel"
        },
        {
            "Zip": 6905,
            "Location": "Lugano 5 Serv Autopostali"
        },
        {
            "Zip": 6906,
            "Location": "Lugano 6 Cassarate Caselle"
        },
        {
            "Zip": 6907,
            "Location": "Lugano 7 Loreto Caselle"
        },
        {
            "Zip": 6908,
            "Location": "Massagno Caselle"
        },
        {
            "Zip": 6911,
            "Location": "Campione d'Italia"
        },
        {
            "Zip": 6912,
            "Location": "Pazzallo"
        },
        {
            "Zip": 6913,
            "Location": "Carabbia"
        },
        {
            "Zip": 6914,
            "Location": "Carona"
        },
        {
            "Zip": 6915,
            "Location": "Pambio-Noranco"
        },
        {
            "Zip": 6916,
            "Location": "Grancia"
        },
        {
            "Zip": 6917,
            "Location": "Barbengo"
        },
        {
            "Zip": 6918,
            "Location": "Figino"
        },
        {
            "Zip": 6919,
            "Location": "Carabietta"
        },
        {
            "Zip": 6921,
            "Location": "Vico Morcote"
        },
        {
            "Zip": 6922,
            "Location": "Morcote"
        },
        {
            "Zip": 6924,
            "Location": "Sorengo"
        },
        {
            "Zip": 6925,
            "Location": "Gentilino"
        },
        {
            "Zip": 6926,
            "Location": "Montagnola"
        },
        {
            "Zip": 6927,
            "Location": "Agra"
        },
        {
            "Zip": 6928,
            "Location": "Manno"
        },
        {
            "Zip": 6929,
            "Location": "Gravesano"
        },
        {
            "Zip": 6930,
            "Location": "Bedano"
        },
        {
            "Zip": 6932,
            "Location": "Breganzona"
        },
        {
            "Zip": 6933,
            "Location": "Muzzano"
        },
        {
            "Zip": 6934,
            "Location": "Bioggio"
        },
        {
            "Zip": 6935,
            "Location": "Bosco Luganese"
        },
        {
            "Zip": 6936,
            "Location": "Cademario"
        },
        {
            "Zip": 6937,
            "Location": "Breno"
        },
        {
            "Zip": 6938,
            "Location": "Fescoggia"
        },
        {
            "Zip": 6938,
            "Location": "Vezio"
        },
        {
            "Zip": 6939,
            "Location": "Arosio"
        },
        {
            "Zip": 6939,
            "Location": "Arosio-Mugena"
        },
        {
            "Zip": 6939,
            "Location": "Mugena"
        },
        {
            "Zip": 6942,
            "Location": "Savosa"
        },
        {
            "Zip": 6943,
            "Location": "Vezia"
        },
        {
            "Zip": 6944,
            "Location": "Cureglia"
        },
        {
            "Zip": 6945,
            "Location": "Origlio"
        },
        {
            "Zip": 6946,
            "Location": "Ponte Capriasca"
        },
        {
            "Zip": 6947,
            "Location": "Vaglio"
        },
        {
            "Zip": 6948,
            "Location": "Porza"
        },
        {
            "Zip": 6949,
            "Location": "Comano"
        },
        {
            "Zip": 6950,
            "Location": "Tesserete"
        },
        {
            "Zip": 6951,
            "Location": "Bogno"
        },
        {
            "Zip": 6951,
            "Location": "Colla"
        },
        {
            "Zip": 6951,
            "Location": "Cozzo"
        },
        {
            "Zip": 6951,
            "Location": "Insone"
        },
        {
            "Zip": 6951,
            "Location": "Scareglia"
        },
        {
            "Zip": 6951,
            "Location": "Signôra"
        },
        {
            "Zip": 6952,
            "Location": "Canobbio"
        },
        {
            "Zip": 6953,
            "Location": "Lugaggia"
        },
        {
            "Zip": 6954,
            "Location": "Bigorio"
        },
        {
            "Zip": 6954,
            "Location": "Sala Capriasca"
        },
        {
            "Zip": 6955,
            "Location": "Cagiallo"
        },
        {
            "Zip": 6955,
            "Location": "Oggio"
        },
        {
            "Zip": 6956,
            "Location": "Lopagno"
        },
        {
            "Zip": 6957,
            "Location": "Roveredo TI"
        },
        {
            "Zip": 6958,
            "Location": "Bidogno"
        },
        {
            "Zip": 6958,
            "Location": "Corticiasca"
        },
        {
            "Zip": 6959,
            "Location": "Certara"
        },
        {
            "Zip": 6959,
            "Location": "Cimadera"
        },
        {
            "Zip": 6959,
            "Location": "Curtina"
        },
        {
            "Zip": 6959,
            "Location": "Maglio di Colla"
        },
        {
            "Zip": 6959,
            "Location": "Piandera Paese"
        },
        {
            "Zip": 6960,
            "Location": "Odogno"
        },
        {
            "Zip": 6962,
            "Location": "Viganello"
        },
        {
            "Zip": 6963,
            "Location": "Cureggia"
        },
        {
            "Zip": 6963,
            "Location": "Pregassona"
        },
        {
            "Zip": 6963,
            "Location": "Pregassona Distribuzione"
        },
        {
            "Zip": 6964,
            "Location": "Davesco-Soragno"
        },
        {
            "Zip": 6965,
            "Location": "Cadro"
        },
        {
            "Zip": 6966,
            "Location": "Villa Luganese"
        },
        {
            "Zip": 6967,
            "Location": "Dino"
        },
        {
            "Zip": 6968,
            "Location": "Sonvico"
        },
        {
            "Zip": 6974,
            "Location": "Aldesago"
        },
        {
            "Zip": 6976,
            "Location": "Castagnola"
        },
        {
            "Zip": 6977,
            "Location": "Ruvigliana"
        },
        {
            "Zip": 6978,
            "Location": "Gandria"
        },
        {
            "Zip": 6979,
            "Location": "Brè sopra Lugano"
        },
        {
            "Zip": 6980,
            "Location": "Castelrotto"
        },
        {
            "Zip": 6981,
            "Location": "Banco"
        },
        {
            "Zip": 6981,
            "Location": "Bedigliora"
        },
        {
            "Zip": 6981,
            "Location": "Biogno-Beride"
        },
        {
            "Zip": 6981,
            "Location": "Bombinasco"
        },
        {
            "Zip": 6982,
            "Location": "Agno"
        },
        {
            "Zip": 6983,
            "Location": "Magliaso"
        },
        {
            "Zip": 6984,
            "Location": "Pura"
        },
        {
            "Zip": 6986,
            "Location": "Curio"
        },
        {
            "Zip": 6986,
            "Location": "Miglieglia"
        },
        {
            "Zip": 6986,
            "Location": "Novaggio"
        },
        {
            "Zip": 6987,
            "Location": "Caslano"
        },
        {
            "Zip": 6987,
            "Location": "Caslano Distribuzione"
        },
        {
            "Zip": 6988,
            "Location": "Ponte Tresa"
        },
        {
            "Zip": 6989,
            "Location": "Purasca"
        },
        {
            "Zip": 6990,
            "Location": "Cassina d'Agno"
        },
        {
            "Zip": 6991,
            "Location": "Neggio"
        },
        {
            "Zip": 6992,
            "Location": "Cimo"
        },
        {
            "Zip": 6992,
            "Location": "Vernate"
        },
        {
            "Zip": 6993,
            "Location": "Iseo"
        },
        {
            "Zip": 6994,
            "Location": "Aranno"
        },
        {
            "Zip": 6995,
            "Location": "Madonna del Piano"
        },
        {
            "Zip": 6997,
            "Location": "Sessa"
        },
        {
            "Zip": 6998,
            "Location": "Monteggio"
        },
        {
            "Zip": 6998,
            "Location": "Monteggio 2"
        },
        {
            "Zip": 6999,
            "Location": "Astano"
        },
        {
            "Zip": 7000,
            "Location": "Chur"
        },
        {
            "Zip": 7000,
            "Location": "Chur 1 Annahme"
        },
        {
            "Zip": 7000,
            "Location": "Chur 1 Zustellung"
        },
        {
            "Zip": 7000,
            "Location": "Chur B&V GK"
        },
        {
            "Zip": 7000,
            "Location": "Chur B&V GK 2"
        },
        {
            "Zip": 7000,
            "Location": "Chur Kaserne"
        },
        {
            "Zip": 7000,
            "Location": "Chur Logistikzentrum"
        },
        {
            "Zip": 7000,
            "Location": "Chur Postplatz"
        },
        {
            "Zip": 7001,
            "Location": "Chur"
        },
        {
            "Zip": 7003,
            "Location": "Chur Postauto GR Reg. Chur"
        },
        {
            "Zip": 7004,
            "Location": "Chur"
        },
        {
            "Zip": 7006,
            "Location": "Chur"
        },
        {
            "Zip": 7007,
            "Location": "Chur"
        },
        {
            "Zip": 7012,
            "Location": "Felsberg"
        },
        {
            "Zip": 7013,
            "Location": "Domat\\Ems"
        },
        {
            "Zip": 7013,
            "Location": "Domat\\Ems Zustellung"
        },
        {
            "Zip": 7014,
            "Location": "Trin"
        },
        {
            "Zip": 7015,
            "Location": "Tamins"
        },
        {
            "Zip": 7016,
            "Location": "Trin Mulin"
        },
        {
            "Zip": 7017,
            "Location": "Flims Dorf"
        },
        {
            "Zip": 7018,
            "Location": "Flims Waldhaus"
        },
        {
            "Zip": 7019,
            "Location": "Fidaz"
        },
        {
            "Zip": 7023,
            "Location": "Haldenstein"
        },
        {
            "Zip": 7026,
            "Location": "Maladers"
        },
        {
            "Zip": 7027,
            "Location": "Calfreisen"
        },
        {
            "Zip": 7027,
            "Location": "Castiel"
        },
        {
            "Zip": 7027,
            "Location": "Lüen"
        },
        {
            "Zip": 7028,
            "Location": "Pagig"
        },
        {
            "Zip": 7028,
            "Location": "St. Peter"
        },
        {
            "Zip": 7029,
            "Location": "Peist"
        },
        {
            "Zip": 7031,
            "Location": "Laax GR"
        },
        {
            "Zip": 7031,
            "Location": "Laax GR 1"
        },
        {
            "Zip": 7032,
            "Location": "Laax GR 2"
        },
        {
            "Zip": 7050,
            "Location": "Arosa"
        },
        {
            "Zip": 7050,
            "Location": "Arosa Zustellung"
        },
        {
            "Zip": 7056,
            "Location": "Molinis"
        },
        {
            "Zip": 7057,
            "Location": "Langwies"
        },
        {
            "Zip": 7058,
            "Location": "Litzirüti"
        },
        {
            "Zip": 7062,
            "Location": "Passugg"
        },
        {
            "Zip": 7063,
            "Location": "Praden"
        },
        {
            "Zip": 7064,
            "Location": "Tschiertschen"
        },
        {
            "Zip": 7074,
            "Location": "Malix"
        },
        {
            "Zip": 7075,
            "Location": "Churwalden"
        },
        {
            "Zip": 7076,
            "Location": "Parpan"
        },
        {
            "Zip": 7077,
            "Location": "Valbella"
        },
        {
            "Zip": 7078,
            "Location": "Lenzerheide Zustellung"
        },
        {
            "Zip": 7078,
            "Location": "Lenzerheide\\Lai"
        },
        {
            "Zip": 7082,
            "Location": "Vaz\\Obervaz"
        },
        {
            "Zip": 7083,
            "Location": "Lantsch\\Lenz"
        },
        {
            "Zip": 7084,
            "Location": "Brienz\\Brinzauls GR"
        },
        {
            "Zip": 7104,
            "Location": "Versam"
        },
        {
            "Zip": 7106,
            "Location": "Tenna"
        },
        {
            "Zip": 7107,
            "Location": "Safien Platz"
        },
        {
            "Zip": 7109,
            "Location": "Thalkirch"
        },
        {
            "Zip": 7110,
            "Location": "Peiden"
        },
        {
            "Zip": 7111,
            "Location": "Pitasch"
        },
        {
            "Zip": 7112,
            "Location": "Duvin"
        },
        {
            "Zip": 7113,
            "Location": "Camuns"
        },
        {
            "Zip": 7114,
            "Location": "Uors (Lumnezia)"
        },
        {
            "Zip": 7115,
            "Location": "Surcasti"
        },
        {
            "Zip": 7116,
            "Location": "St. Martin (Lugnez)"
        },
        {
            "Zip": 7116,
            "Location": "Tersnaus"
        },
        {
            "Zip": 7122,
            "Location": "Valendas"
        },
        {
            "Zip": 7126,
            "Location": "Castrisch"
        },
        {
            "Zip": 7127,
            "Location": "Sevgein"
        },
        {
            "Zip": 7128,
            "Location": "Riein"
        },
        {
            "Zip": 7130,
            "Location": "Ilanz"
        },
        {
            "Zip": 7130,
            "Location": "Ilanz Zustellung"
        },
        {
            "Zip": 7130,
            "Location": "Schnaus"
        },
        {
            "Zip": 7132,
            "Location": "Vals"
        },
        {
            "Zip": 7134,
            "Location": "Obersaxen"
        },
        {
            "Zip": 7137,
            "Location": "Flond"
        },
        {
            "Zip": 7138,
            "Location": "Surcuolm"
        },
        {
            "Zip": 7141,
            "Location": "Luven"
        },
        {
            "Zip": 7142,
            "Location": "Cumbel"
        },
        {
            "Zip": 7143,
            "Location": "Morissen"
        },
        {
            "Zip": 7144,
            "Location": "Vella"
        },
        {
            "Zip": 7145,
            "Location": "Degen"
        },
        {
            "Zip": 7146,
            "Location": "Vattiz"
        },
        {
            "Zip": 7147,
            "Location": "Vignogn"
        },
        {
            "Zip": 7148,
            "Location": "Lumbrein"
        },
        {
            "Zip": 7149,
            "Location": "Vrin"
        },
        {
            "Zip": 7151,
            "Location": "Schluein"
        },
        {
            "Zip": 7152,
            "Location": "Sagogn"
        },
        {
            "Zip": 7153,
            "Location": "Falera"
        },
        {
            "Zip": 7154,
            "Location": "Ruschein"
        },
        {
            "Zip": 7155,
            "Location": "Ladir"
        },
        {
            "Zip": 7156,
            "Location": "Pigniu"
        },
        {
            "Zip": 7156,
            "Location": "Rueun"
        },
        {
            "Zip": 7157,
            "Location": "Siat"
        },
        {
            "Zip": 7158,
            "Location": "Waltensburg\\Vuorz"
        },
        {
            "Zip": 7159,
            "Location": "Andiast"
        },
        {
            "Zip": 7162,
            "Location": "Tavanasa"
        },
        {
            "Zip": 7163,
            "Location": "Danis"
        },
        {
            "Zip": 7164,
            "Location": "Dardin"
        },
        {
            "Zip": 7165,
            "Location": "Breil\\Brigels"
        },
        {
            "Zip": 7166,
            "Location": "Trun"
        },
        {
            "Zip": 7167,
            "Location": "Zignau"
        },
        {
            "Zip": 7168,
            "Location": "Schlans"
        },
        {
            "Zip": 7172,
            "Location": "Rabius"
        },
        {
            "Zip": 7173,
            "Location": "Surrein"
        },
        {
            "Zip": 7174,
            "Location": "S. Benedetg"
        },
        {
            "Zip": 7175,
            "Location": "Sumvitg"
        },
        {
            "Zip": 7176,
            "Location": "Cumpadials"
        },
        {
            "Zip": 7180,
            "Location": "Disentis\\Mustér"
        },
        {
            "Zip": 7182,
            "Location": "Cavardiras"
        },
        {
            "Zip": 7183,
            "Location": "Mumpé Medel"
        },
        {
            "Zip": 7184,
            "Location": "Curaglia"
        },
        {
            "Zip": 7185,
            "Location": "Platta"
        },
        {
            "Zip": 7186,
            "Location": "Segnas"
        },
        {
            "Zip": 7187,
            "Location": "Camischolas"
        },
        {
            "Zip": 7188,
            "Location": "Sedrun"
        },
        {
            "Zip": 7189,
            "Location": "Rueras"
        },
        {
            "Zip": 7200,
            "Location": "Untervaz RPZ"
        },
        {
            "Zip": 7200,
            "Location": "Untervaz Sortierung"
        },
        {
            "Zip": 7202,
            "Location": "Says"
        },
        {
            "Zip": 7203,
            "Location": "Trimmis"
        },
        {
            "Zip": 7204,
            "Location": "Untervaz"
        },
        {
            "Zip": 7205,
            "Location": "Zizers"
        },
        {
            "Zip": 7206,
            "Location": "Igis"
        },
        {
            "Zip": 7208,
            "Location": "Malans GR"
        },
        {
            "Zip": 7210,
            "Location": "Untervaz CIRCLE"
        },
        {
            "Zip": 7212,
            "Location": "Seewis Dorf"
        },
        {
            "Zip": 7212,
            "Location": "Seewis-Pardisla"
        },
        {
            "Zip": 7212,
            "Location": "Seewis-Schmitten"
        },
        {
            "Zip": 7213,
            "Location": "Valzeina"
        },
        {
            "Zip": 7214,
            "Location": "Grüsch"
        },
        {
            "Zip": 7215,
            "Location": "Fanas"
        },
        {
            "Zip": 7220,
            "Location": "Schiers"
        },
        {
            "Zip": 7222,
            "Location": "Lunden"
        },
        {
            "Zip": 7223,
            "Location": "Buchen im Prättigau"
        },
        {
            "Zip": 7224,
            "Location": "Putz"
        },
        {
            "Zip": 7226,
            "Location": "Fajauna"
        },
        {
            "Zip": 7226,
            "Location": "Stels"
        },
        {
            "Zip": 7228,
            "Location": "Pusserein"
        },
        {
            "Zip": 7228,
            "Location": "Schuders"
        },
        {
            "Zip": 7230,
            "Location": "Untervaz CALL"
        },
        {
            "Zip": 7231,
            "Location": "Pragg-Jenaz"
        },
        {
            "Zip": 7232,
            "Location": "Furna"
        },
        {
            "Zip": 7233,
            "Location": "Jenaz"
        },
        {
            "Zip": 7235,
            "Location": "Fideris"
        },
        {
            "Zip": 7240,
            "Location": "Küblis"
        },
        {
            "Zip": 7241,
            "Location": "Conters im Prättigau"
        },
        {
            "Zip": 7242,
            "Location": "Luzein"
        },
        {
            "Zip": 7243,
            "Location": "Pany"
        },
        {
            "Zip": 7244,
            "Location": "Gadenstätt"
        },
        {
            "Zip": 7245,
            "Location": "Ascharina"
        },
        {
            "Zip": 7246,
            "Location": "St. Antönien"
        },
        {
            "Zip": 7247,
            "Location": "Saas im Prättigau"
        },
        {
            "Zip": 7249,
            "Location": "Serneus"
        },
        {
            "Zip": 7250,
            "Location": "Klosters"
        },
        {
            "Zip": 7252,
            "Location": "Klosters Dorf"
        },
        {
            "Zip": 7260,
            "Location": "Davos Dorf"
        },
        {
            "Zip": 7265,
            "Location": "Davos Wolfgang"
        },
        {
            "Zip": 7270,
            "Location": "Davos Platz"
        },
        {
            "Zip": 7270,
            "Location": "Davos Platz 1"
        },
        {
            "Zip": 7270,
            "Location": "Davos Zustellung"
        },
        {
            "Zip": 7272,
            "Location": "Davos Clavadel"
        },
        {
            "Zip": 7276,
            "Location": "Davos Frauenkirch"
        },
        {
            "Zip": 7277,
            "Location": "Davos Glaris"
        },
        {
            "Zip": 7278,
            "Location": "Davos Monstein"
        },
        {
            "Zip": 7302,
            "Location": "Landquart"
        },
        {
            "Zip": 7302,
            "Location": "Landquart Dist Ba"
        },
        {
            "Zip": 7302,
            "Location": "Landquart Zustellung"
        },
        {
            "Zip": 7303,
            "Location": "Mastrils"
        },
        {
            "Zip": 7304,
            "Location": "Maienfeld"
        },
        {
            "Zip": 7304,
            "Location": "Maienfeld Stutz"
        },
        {
            "Zip": 7306,
            "Location": "Fläsch"
        },
        {
            "Zip": 7307,
            "Location": "Jenins"
        },
        {
            "Zip": 7310,
            "Location": "Bad Ragaz"
        },
        {
            "Zip": 7310,
            "Location": "Bad Ragaz Zustellung"
        },
        {
            "Zip": 7312,
            "Location": "Pfäfers"
        },
        {
            "Zip": 7313,
            "Location": "St. Margrethenberg"
        },
        {
            "Zip": 7314,
            "Location": "Vadura"
        },
        {
            "Zip": 7315,
            "Location": "Vättis"
        },
        {
            "Zip": 7317,
            "Location": "Valens"
        },
        {
            "Zip": 7317,
            "Location": "Vasön"
        },
        {
            "Zip": 7320,
            "Location": "Sargans"
        },
        {
            "Zip": 7320,
            "Location": "Sargans Zustellung"
        },
        {
            "Zip": 7323,
            "Location": "Wangs"
        },
        {
            "Zip": 7324,
            "Location": "Vilters"
        },
        {
            "Zip": 7325,
            "Location": "Schwendi im Weisstannental"
        },
        {
            "Zip": 7326,
            "Location": "Weisstannen"
        },
        {
            "Zip": 7402,
            "Location": "Bonaduz"
        },
        {
            "Zip": 7403,
            "Location": "Rhäzüns"
        },
        {
            "Zip": 7404,
            "Location": "Feldis\\Veulden"
        },
        {
            "Zip": 7405,
            "Location": "Rothenbrunnen"
        },
        {
            "Zip": 7407,
            "Location": "Trans"
        },
        {
            "Zip": 7408,
            "Location": "Cazis"
        },
        {
            "Zip": 7411,
            "Location": "Sils im Domleschg"
        },
        {
            "Zip": 7412,
            "Location": "Scharans"
        },
        {
            "Zip": 7413,
            "Location": "Fürstenaubruck"
        },
        {
            "Zip": 7414,
            "Location": "Fürstenau"
        },
        {
            "Zip": 7415,
            "Location": "Pratval"
        },
        {
            "Zip": 7415,
            "Location": "Rodels"
        },
        {
            "Zip": 7416,
            "Location": "Almens"
        },
        {
            "Zip": 7417,
            "Location": "Paspels"
        },
        {
            "Zip": 7418,
            "Location": "Tumegl\\Tomils"
        },
        {
            "Zip": 7419,
            "Location": "Scheid"
        },
        {
            "Zip": 7421,
            "Location": "Summaprada"
        },
        {
            "Zip": 7422,
            "Location": "Tartar"
        },
        {
            "Zip": 7423,
            "Location": "Portein"
        },
        {
            "Zip": 7423,
            "Location": "Sarn"
        },
        {
            "Zip": 7424,
            "Location": "Dalin"
        },
        {
            "Zip": 7424,
            "Location": "Präz"
        },
        {
            "Zip": 7425,
            "Location": "Masein"
        },
        {
            "Zip": 7426,
            "Location": "Flerden"
        },
        {
            "Zip": 7427,
            "Location": "Urmein"
        },
        {
            "Zip": 7428,
            "Location": "Tschappina"
        },
        {
            "Zip": 7430,
            "Location": "Rongellen"
        },
        {
            "Zip": 7430,
            "Location": "Thusis"
        },
        {
            "Zip": 7430,
            "Location": "Thusis Zustellung"
        },
        {
            "Zip": 7431,
            "Location": "Mutten"
        },
        {
            "Zip": 7431,
            "Location": "Obermutten"
        },
        {
            "Zip": 7432,
            "Location": "Zillis"
        },
        {
            "Zip": 7433,
            "Location": "Donat"
        },
        {
            "Zip": 7433,
            "Location": "Lohn GR"
        },
        {
            "Zip": 7433,
            "Location": "Mathon"
        },
        {
            "Zip": 7433,
            "Location": "Wergenstein"
        },
        {
            "Zip": 7434,
            "Location": "Sufers"
        },
        {
            "Zip": 7435,
            "Location": "Splügen"
        },
        {
            "Zip": 7436,
            "Location": "Medels im Rheinwald"
        },
        {
            "Zip": 7437,
            "Location": "Nufenen"
        },
        {
            "Zip": 7438,
            "Location": "Hinterrhein"
        },
        {
            "Zip": 7440,
            "Location": "Andeer"
        },
        {
            "Zip": 7442,
            "Location": "Clugin"
        },
        {
            "Zip": 7443,
            "Location": "Pignia"
        },
        {
            "Zip": 7444,
            "Location": "Ausserferrera"
        },
        {
            "Zip": 7445,
            "Location": "Innerferrera"
        },
        {
            "Zip": 7446,
            "Location": "Campsut-Cröt"
        },
        {
            "Zip": 7447,
            "Location": "Am Bach (Avers)"
        },
        {
            "Zip": 7447,
            "Location": "Cresta (Avers)"
        },
        {
            "Zip": 7448,
            "Location": "Juf"
        },
        {
            "Zip": 7450,
            "Location": "Tiefencastel"
        },
        {
            "Zip": 7451,
            "Location": "Alvaschein"
        },
        {
            "Zip": 7452,
            "Location": "Cunter"
        },
        {
            "Zip": 7453,
            "Location": "Tinizong"
        },
        {
            "Zip": 7454,
            "Location": "Rona"
        },
        {
            "Zip": 7455,
            "Location": "Mulegns"
        },
        {
            "Zip": 7456,
            "Location": "Marmorera"
        },
        {
            "Zip": 7456,
            "Location": "Sur"
        },
        {
            "Zip": 7457,
            "Location": "Bivio"
        },
        {
            "Zip": 7458,
            "Location": "Mon"
        },
        {
            "Zip": 7459,
            "Location": "Stierva"
        },
        {
            "Zip": 7460,
            "Location": "Savognin"
        },
        {
            "Zip": 7462,
            "Location": "Salouf"
        },
        {
            "Zip": 7463,
            "Location": "Riom"
        },
        {
            "Zip": 7464,
            "Location": "Parsonz"
        },
        {
            "Zip": 7472,
            "Location": "Surava"
        },
        {
            "Zip": 7473,
            "Location": "Alvaneu Bad"
        },
        {
            "Zip": 7477,
            "Location": "Filisur"
        },
        {
            "Zip": 7482,
            "Location": "Bergün\\Bravuogn"
        },
        {
            "Zip": 7482,
            "Location": "Preda"
        },
        {
            "Zip": 7482,
            "Location": "Stugl\\Stuls"
        },
        {
            "Zip": 7484,
            "Location": "Latsch"
        },
        {
            "Zip": 7492,
            "Location": "Alvaneu Dorf"
        },
        {
            "Zip": 7493,
            "Location": "Schmitten (Albula)"
        },
        {
            "Zip": 7494,
            "Location": "Davos Wiesen"
        },
        {
            "Zip": 7500,
            "Location": "St. Moritz"
        },
        {
            "Zip": 7500,
            "Location": "St. Moritz 1"
        },
        {
            "Zip": 7500,
            "Location": "St. Moritz 3"
        },
        {
            "Zip": 7500,
            "Location": "St. Moritz Dorf"
        },
        {
            "Zip": 7502,
            "Location": "Bever"
        },
        {
            "Zip": 7503,
            "Location": "Samedan"
        },
        {
            "Zip": 7503,
            "Location": "Samedan Zustellung"
        },
        {
            "Zip": 7504,
            "Location": "Pontresina"
        },
        {
            "Zip": 7505,
            "Location": "Celerina\\Schlarigna"
        },
        {
            "Zip": 7512,
            "Location": "Champfèr"
        },
        {
            "Zip": 7513,
            "Location": "Silvaplana"
        },
        {
            "Zip": 7513,
            "Location": "Silvaplana-Surlej"
        },
        {
            "Zip": 7514,
            "Location": "Fex"
        },
        {
            "Zip": 7514,
            "Location": "Sils\\Segl Maria"
        },
        {
            "Zip": 7515,
            "Location": "Sils\\Segl Baselgia"
        },
        {
            "Zip": 7516,
            "Location": "Maloja"
        },
        {
            "Zip": 7517,
            "Location": "Plaun da Lej"
        },
        {
            "Zip": 7522,
            "Location": "La Punt-Chamues-ch"
        },
        {
            "Zip": 7523,
            "Location": "Madulain"
        },
        {
            "Zip": 7524,
            "Location": "Zuoz"
        },
        {
            "Zip": 7525,
            "Location": "S-chanf"
        },
        {
            "Zip": 7526,
            "Location": "Cinuos-chel"
        },
        {
            "Zip": 7527,
            "Location": "Brail"
        },
        {
            "Zip": 7530,
            "Location": "Zernez"
        },
        {
            "Zip": 7532,
            "Location": "Tschierv"
        },
        {
            "Zip": 7533,
            "Location": "Fuldera"
        },
        {
            "Zip": 7534,
            "Location": "Lü"
        },
        {
            "Zip": 7535,
            "Location": "Valchava"
        },
        {
            "Zip": 7536,
            "Location": "Sta. Maria Val Müstair"
        },
        {
            "Zip": 7537,
            "Location": "Müstair"
        },
        {
            "Zip": 7542,
            "Location": "Susch"
        },
        {
            "Zip": 7543,
            "Location": "Lavin"
        },
        {
            "Zip": 7545,
            "Location": "Guarda"
        },
        {
            "Zip": 7546,
            "Location": "Ardez"
        },
        {
            "Zip": 7550,
            "Location": "Scuol"
        },
        {
            "Zip": 7551,
            "Location": "Ftan"
        },
        {
            "Zip": 7552,
            "Location": "Vulpera"
        },
        {
            "Zip": 7553,
            "Location": "Tarasp"
        },
        {
            "Zip": 7554,
            "Location": "Sent"
        },
        {
            "Zip": 7556,
            "Location": "Ramosch"
        },
        {
            "Zip": 7557,
            "Location": "Vnà"
        },
        {
            "Zip": 7558,
            "Location": "Strada"
        },
        {
            "Zip": 7559,
            "Location": "Tschlin"
        },
        {
            "Zip": 7560,
            "Location": "Martina"
        },
        {
            "Zip": 7562,
            "Location": "Samnaun-Compatsch"
        },
        {
            "Zip": 7563,
            "Location": "Samnaun Dorf"
        },
        {
            "Zip": 7602,
            "Location": "Casaccia"
        },
        {
            "Zip": 7603,
            "Location": "Vicosoprano"
        },
        {
            "Zip": 7604,
            "Location": "Borgonovo"
        },
        {
            "Zip": 7605,
            "Location": "Stampa"
        },
        {
            "Zip": 7606,
            "Location": "Bondo"
        },
        {
            "Zip": 7606,
            "Location": "Promontogno"
        },
        {
            "Zip": 7608,
            "Location": "Castasegna"
        },
        {
            "Zip": 7610,
            "Location": "Soglio"
        },
        {
            "Zip": 7710,
            "Location": "Alp Grüm"
        },
        {
            "Zip": 7710,
            "Location": "Ospizio Bernina"
        },
        {
            "Zip": 7741,
            "Location": "S. Carlo (Poschiavo)"
        },
        {
            "Zip": 7742,
            "Location": "La Rösa"
        },
        {
            "Zip": 7742,
            "Location": "Poschiavo"
        },
        {
            "Zip": 7742,
            "Location": "Sfazù"
        },
        {
            "Zip": 7743,
            "Location": "Brusio"
        },
        {
            "Zip": 7743,
            "Location": "Miralago"
        },
        {
            "Zip": 7744,
            "Location": "Campocologno"
        },
        {
            "Zip": 7745,
            "Location": "Li Curt"
        },
        {
            "Zip": 7746,
            "Location": "Le Prese"
        },
        {
            "Zip": 7747,
            "Location": "Viano"
        },
        {
            "Zip": 7748,
            "Location": "Campascio"
        },
        {
            "Zip": 8000,
            "Location": "Zürich"
        },
        {
            "Zip": 8001,
            "Location": "Zürich"
        },
        {
            "Zip": 8002,
            "Location": "Zürich"
        },
        {
            "Zip": 8002,
            "Location": "Zürich PF Fil Enge"
        },
        {
            "Zip": 8003,
            "Location": "Zürich"
        },
        {
            "Zip": 8004,
            "Location": "Zürich"
        },
        {
            "Zip": 8005,
            "Location": "Zürich"
        },
        {
            "Zip": 8006,
            "Location": "Zürich"
        },
        {
            "Zip": 8006,
            "Location": "Zürich Asendia"
        },
        {
            "Zip": 8008,
            "Location": "Zürich"
        },
        {
            "Zip": 8010,
            "Location": "Zürich"
        },
        {
            "Zip": 8010,
            "Location": "Zürich Briefzentrum"
        },
        {
            "Zip": 8010,
            "Location": "Zürich BZ Annahme"
        },
        {
            "Zip": 8010,
            "Location": "Zürich BZ Brieflklinik"
        },
        {
            "Zip": 8010,
            "Location": "Zürich BZ FP"
        },
        {
            "Zip": 8010,
            "Location": "Zürich BZI DE"
        },
        {
            "Zip": 8010,
            "Location": "Zürich CS Annahme"
        },
        {
            "Zip": 8010,
            "Location": "Zürich Helsana Annahme"
        },
        {
            "Zip": 8010,
            "Location": "Zürich Kanton Annahme"
        },
        {
            "Zip": 8010,
            "Location": "Zürich Mülligen PL"
        },
        {
            "Zip": 8010,
            "Location": "Zürich SPS"
        },
        {
            "Zip": 8010,
            "Location": "Zürich-Mülligen BZI"
        },
        {
            "Zip": 8010,
            "Location": "Zürich-Mülligen SPS AG"
        },
        {
            "Zip": 8011,
            "Location": "Zürich Mülligen SC"
        },
        {
            "Zip": 8012,
            "Location": "Zürich"
        },
        {
            "Zip": 8015,
            "Location": "Zürich 15 Zust"
        },
        {
            "Zip": 8016,
            "Location": "Zürich 16 Zustellung"
        },
        {
            "Zip": 8021,
            "Location": "Zürich 1"
        },
        {
            "Zip": 8021,
            "Location": "Zürich 1 Sihlpost"
        },
        {
            "Zip": 8022,
            "Location": "Zürich"
        },
        {
            "Zip": 8023,
            "Location": "Zürich"
        },
        {
            "Zip": 8024,
            "Location": "Zürich"
        },
        {
            "Zip": 8024,
            "Location": "Zürich Oberdorf"
        },
        {
            "Zip": 8025,
            "Location": "Zürich 25 Urania"
        },
        {
            "Zip": 8025,
            "Location": "Zürich Uraniastrasse"
        },
        {
            "Zip": 8026,
            "Location": "Zürich Helvetiaplatz"
        },
        {
            "Zip": 8027,
            "Location": "Zürich"
        },
        {
            "Zip": 8030,
            "Location": "Zürich"
        },
        {
            "Zip": 8031,
            "Location": "Zürich"
        },
        {
            "Zip": 8031,
            "Location": "Zürich Limmatstrasse"
        },
        {
            "Zip": 8032,
            "Location": "Zürich"
        },
        {
            "Zip": 8032,
            "Location": "Zürich Neumünster"
        },
        {
            "Zip": 8033,
            "Location": "Zürich"
        },
        {
            "Zip": 8034,
            "Location": "Zürich"
        },
        {
            "Zip": 8036,
            "Location": "Zürich"
        },
        {
            "Zip": 8036,
            "Location": "Zürich Corona"
        },
        {
            "Zip": 8037,
            "Location": "Zürich"
        },
        {
            "Zip": 8037,
            "Location": "Zürich Breitensteinstrasse"
        },
        {
            "Zip": 8037,
            "Location": "Zürich Scheffelstrasse"
        },
        {
            "Zip": 8038,
            "Location": "Zürich"
        },
        {
            "Zip": 8039,
            "Location": "Zürich"
        },
        {
            "Zip": 8040,
            "Location": "Zürich"
        },
        {
            "Zip": 8041,
            "Location": "Zürich"
        },
        {
            "Zip": 8042,
            "Location": "Zürich"
        },
        {
            "Zip": 8044,
            "Location": "Gockhausen"
        },
        {
            "Zip": 8044,
            "Location": "Zürich"
        },
        {
            "Zip": 8045,
            "Location": "Zürich"
        },
        {
            "Zip": 8045,
            "Location": "Zürich Brunaupark"
        },
        {
            "Zip": 8045,
            "Location": "Zürich Friesenbergplatz"
        },
        {
            "Zip": 8046,
            "Location": "Zürich"
        },
        {
            "Zip": 8047,
            "Location": "Zürich"
        },
        {
            "Zip": 8047,
            "Location": "Zürich Triemli"
        },
        {
            "Zip": 8048,
            "Location": "Zürich"
        },
        {
            "Zip": 8049,
            "Location": "Zürich"
        },
        {
            "Zip": 8050,
            "Location": "Zürich"
        },
        {
            "Zip": 8050,
            "Location": "Zürich 50 Zustellung"
        },
        {
            "Zip": 8050,
            "Location": "Zürich Dist Ba"
        },
        {
            "Zip": 8050,
            "Location": "Zürich Postauto Zürich"
        },
        {
            "Zip": 8051,
            "Location": "Zürich"
        },
        {
            "Zip": 8052,
            "Location": "Zürich"
        },
        {
            "Zip": 8053,
            "Location": "Zürich"
        },
        {
            "Zip": 8055,
            "Location": "Zürich"
        },
        {
            "Zip": 8057,
            "Location": "Zürich"
        },
        {
            "Zip": 8058,
            "Location": "Zürich"
        },
        {
            "Zip": 8059,
            "Location": "Zürich 59 Ausland"
        },
        {
            "Zip": 8059,
            "Location": "Zürich 59 Exchange Office"
        },
        {
            "Zip": 8060,
            "Location": "Zürich"
        },
        {
            "Zip": 8061,
            "Location": "Zürich"
        },
        {
            "Zip": 8063,
            "Location": "Zürich"
        },
        {
            "Zip": 8064,
            "Location": "Zürich"
        },
        {
            "Zip": 8066,
            "Location": "Zürich"
        },
        {
            "Zip": 8068,
            "Location": "Zürich"
        },
        {
            "Zip": 8070,
            "Location": "Zürich"
        },
        {
            "Zip": 8071,
            "Location": "Zürich CS PZ"
        },
        {
            "Zip": 8074,
            "Location": "Zürich Voice Publishing"
        },
        {
            "Zip": 8075,
            "Location": "Zürich"
        },
        {
            "Zip": 8080,
            "Location": "Zürich 80"
        },
        {
            "Zip": 8080,
            "Location": "Zürich PN"
        },
        {
            "Zip": 8081,
            "Location": "Zürich Helsana"
        },
        {
            "Zip": 8085,
            "Location": "Zürich Versicherung"
        },
        {
            "Zip": 8086,
            "Location": "Zürich Reader's Digest"
        },
        {
            "Zip": 8087,
            "Location": "Zürich"
        },
        {
            "Zip": 8088,
            "Location": "Zürich"
        },
        {
            "Zip": 8090,
            "Location": "Zürich"
        },
        {
            "Zip": 8091,
            "Location": "Zürich"
        },
        {
            "Zip": 8092,
            "Location": "Zürich ETH-Zentrum"
        },
        {
            "Zip": 8093,
            "Location": "Zürich ETH-Hönggerberg"
        },
        {
            "Zip": 8096,
            "Location": "Zürich IBRS local"
        },
        {
            "Zip": 8098,
            "Location": "Zürich"
        },
        {
            "Zip": 8099,
            "Location": "Zürich Sonderdienste"
        },
        {
            "Zip": 8102,
            "Location": "Oberengstringen"
        },
        {
            "Zip": 8103,
            "Location": "Unterengstringen"
        },
        {
            "Zip": 8104,
            "Location": "Weiningen ZH"
        },
        {
            "Zip": 8105,
            "Location": "Regensdorf"
        },
        {
            "Zip": 8105,
            "Location": "Watt"
        },
        {
            "Zip": 8106,
            "Location": "Adlikon b. Regensdorf"
        },
        {
            "Zip": 8107,
            "Location": "Buchs ZH"
        },
        {
            "Zip": 8107,
            "Location": "Buchs ZH Zustellung"
        },
        {
            "Zip": 8108,
            "Location": "Dällikon"
        },
        {
            "Zip": 8109,
            "Location": "Kloster Fahr"
        },
        {
            "Zip": 8112,
            "Location": "Otelfingen"
        },
        {
            "Zip": 8113,
            "Location": "Boppelsen"
        },
        {
            "Zip": 8114,
            "Location": "Dänikon ZH"
        },
        {
            "Zip": 8115,
            "Location": "Hüttikon"
        },
        {
            "Zip": 8117,
            "Location": "Fällanden"
        },
        {
            "Zip": 8118,
            "Location": "Pfaffhausen"
        },
        {
            "Zip": 8121,
            "Location": "Benglen"
        },
        {
            "Zip": 8122,
            "Location": "Binz"
        },
        {
            "Zip": 8123,
            "Location": "Ebmatingen"
        },
        {
            "Zip": 8124,
            "Location": "Maur"
        },
        {
            "Zip": 8125,
            "Location": "Zollikerberg"
        },
        {
            "Zip": 8126,
            "Location": "Zumikon"
        },
        {
            "Zip": 8126,
            "Location": "Zumikon Zustellung"
        },
        {
            "Zip": 8127,
            "Location": "Forch"
        },
        {
            "Zip": 8132,
            "Location": "Egg b. Zürich"
        },
        {
            "Zip": 8132,
            "Location": "Hinteregg"
        },
        {
            "Zip": 8133,
            "Location": "Esslingen"
        },
        {
            "Zip": 8134,
            "Location": "Adliswil"
        },
        {
            "Zip": 8134,
            "Location": "Adliswil 1"
        },
        {
            "Zip": 8134,
            "Location": "Adliswil 1 Zustellung"
        },
        {
            "Zip": 8134,
            "Location": "Adliswil Sood"
        },
        {
            "Zip": 8135,
            "Location": "Langnau am Albis"
        },
        {
            "Zip": 8135,
            "Location": "Sihlbrugg Station"
        },
        {
            "Zip": 8135,
            "Location": "Sihlwald"
        },
        {
            "Zip": 8136,
            "Location": "Gattikon"
        },
        {
            "Zip": 8142,
            "Location": "Uitikon Waldegg"
        },
        {
            "Zip": 8143,
            "Location": "Stallikon"
        },
        {
            "Zip": 8143,
            "Location": "Uetliberg"
        },
        {
            "Zip": 8152,
            "Location": "Glattbrugg"
        },
        {
            "Zip": 8152,
            "Location": "Glattbrugg Zustellung"
        },
        {
            "Zip": 8152,
            "Location": "Glattpark (Opfikon)"
        },
        {
            "Zip": 8152,
            "Location": "Opfikon"
        },
        {
            "Zip": 8153,
            "Location": "Rümlang"
        },
        {
            "Zip": 8154,
            "Location": "Oberglatt ZH"
        },
        {
            "Zip": 8155,
            "Location": "Nassenwil"
        },
        {
            "Zip": 8155,
            "Location": "Niederhasli"
        },
        {
            "Zip": 8156,
            "Location": "Oberhasli"
        },
        {
            "Zip": 8157,
            "Location": "Dielsdorf"
        },
        {
            "Zip": 8157,
            "Location": "Dielsdorf Zustellung"
        },
        {
            "Zip": 8158,
            "Location": "Regensberg"
        },
        {
            "Zip": 8162,
            "Location": "Steinmaur"
        },
        {
            "Zip": 8162,
            "Location": "Sünikon"
        },
        {
            "Zip": 8164,
            "Location": "Bachs"
        },
        {
            "Zip": 8165,
            "Location": "Oberweningen"
        },
        {
            "Zip": 8165,
            "Location": "Schleinikon"
        },
        {
            "Zip": 8165,
            "Location": "Schöfflisdorf"
        },
        {
            "Zip": 8166,
            "Location": "Niederweningen"
        },
        {
            "Zip": 8172,
            "Location": "Niederglatt ZH"
        },
        {
            "Zip": 8173,
            "Location": "Neerach"
        },
        {
            "Zip": 8174,
            "Location": "Stadel b. Niederglatt"
        },
        {
            "Zip": 8175,
            "Location": "Windlach"
        },
        {
            "Zip": 8180,
            "Location": "Bülach"
        },
        {
            "Zip": 8180,
            "Location": "Bülach Kaserne"
        },
        {
            "Zip": 8180,
            "Location": "Bülach Zustellung"
        },
        {
            "Zip": 8181,
            "Location": "Höri"
        },
        {
            "Zip": 8182,
            "Location": "Hochfelden"
        },
        {
            "Zip": 8183,
            "Location": "Bülach Dist Ba"
        },
        {
            "Zip": 8184,
            "Location": "Bachenbülach"
        },
        {
            "Zip": 8185,
            "Location": "Winkel"
        },
        {
            "Zip": 8187,
            "Location": "Weiach"
        },
        {
            "Zip": 8192,
            "Location": "Glattfelden"
        },
        {
            "Zip": 8192,
            "Location": "Zweidlen"
        },
        {
            "Zip": 8193,
            "Location": "Eglisau"
        },
        {
            "Zip": 8194,
            "Location": "Hüntwangen"
        },
        {
            "Zip": 8195,
            "Location": "Wasterkingen"
        },
        {
            "Zip": 8196,
            "Location": "Wil ZH"
        },
        {
            "Zip": 8197,
            "Location": "Rafz"
        },
        {
            "Zip": 8200,
            "Location": "Schaffhausen"
        },
        {
            "Zip": 8200,
            "Location": "Schaffhausen 1"
        },
        {
            "Zip": 8200,
            "Location": "Schaffhausen 1 Zust"
        },
        {
            "Zip": 8200,
            "Location": "Schaffhausen PF"
        },
        {
            "Zip": 8201,
            "Location": "Schaffhausen"
        },
        {
            "Zip": 8202,
            "Location": "Schaffhausen"
        },
        {
            "Zip": 8203,
            "Location": "Schaffhausen"
        },
        {
            "Zip": 8203,
            "Location": "Schaffhausen Buchthalen"
        },
        {
            "Zip": 8204,
            "Location": "Schaffhausen Breite"
        },
        {
            "Zip": 8205,
            "Location": "Schaffhausen"
        },
        {
            "Zip": 8207,
            "Location": "Schaffhausen"
        },
        {
            "Zip": 8208,
            "Location": "Schaffhausen"
        },
        {
            "Zip": 8210,
            "Location": "Schaffhausen Dist Ba"
        },
        {
            "Zip": 8212,
            "Location": "Neuhausen am Rheinfall"
        },
        {
            "Zip": 8212,
            "Location": "Neuhausen am Rheinfall 1"
        },
        {
            "Zip": 8212,
            "Location": "Neuhausen Rundbuck"
        },
        {
            "Zip": 8212,
            "Location": "Nohl"
        },
        {
            "Zip": 8213,
            "Location": "Neunkirch"
        },
        {
            "Zip": 8214,
            "Location": "Gächlingen"
        },
        {
            "Zip": 8215,
            "Location": "Hallau"
        },
        {
            "Zip": 8216,
            "Location": "Oberhallau"
        },
        {
            "Zip": 8217,
            "Location": "Wilchingen"
        },
        {
            "Zip": 8218,
            "Location": "Osterfingen"
        },
        {
            "Zip": 8219,
            "Location": "Trasadingen"
        },
        {
            "Zip": 8222,
            "Location": "Beringen"
        },
        {
            "Zip": 8223,
            "Location": "Guntmadingen"
        },
        {
            "Zip": 8224,
            "Location": "Löhningen"
        },
        {
            "Zip": 8225,
            "Location": "Siblingen"
        },
        {
            "Zip": 8226,
            "Location": "Schleitheim"
        },
        {
            "Zip": 8228,
            "Location": "Beggingen"
        },
        {
            "Zip": 8231,
            "Location": "Hemmental"
        },
        {
            "Zip": 8232,
            "Location": "Merishausen"
        },
        {
            "Zip": 8233,
            "Location": "Bargen SH"
        },
        {
            "Zip": 8234,
            "Location": "Stetten SH"
        },
        {
            "Zip": 8235,
            "Location": "Lohn SH"
        },
        {
            "Zip": 8236,
            "Location": "Büttenhardt"
        },
        {
            "Zip": 8236,
            "Location": "Opfertshofen SH"
        },
        {
            "Zip": 8238,
            "Location": "Büsingen"
        },
        {
            "Zip": 8239,
            "Location": "Dörflingen"
        },
        {
            "Zip": 8240,
            "Location": "Thayngen"
        },
        {
            "Zip": 8240,
            "Location": "Thayngen Zustellung"
        },
        {
            "Zip": 8241,
            "Location": "Barzheim"
        },
        {
            "Zip": 8242,
            "Location": "Bibern SH"
        },
        {
            "Zip": 8242,
            "Location": "Hofen SH"
        },
        {
            "Zip": 8243,
            "Location": "Altdorf SH"
        },
        {
            "Zip": 8245,
            "Location": "Feuerthalen"
        },
        {
            "Zip": 8246,
            "Location": "Langwiesen"
        },
        {
            "Zip": 8247,
            "Location": "Flurlingen"
        },
        {
            "Zip": 8248,
            "Location": "Uhwiesen"
        },
        {
            "Zip": 8252,
            "Location": "Schlatt TG"
        },
        {
            "Zip": 8253,
            "Location": "Diessenhofen"
        },
        {
            "Zip": 8253,
            "Location": "Diessenhofen Bahnhofstrasse"
        },
        {
            "Zip": 8253,
            "Location": "Diessenhofen Zustellung"
        },
        {
            "Zip": 8253,
            "Location": "Willisdorf"
        },
        {
            "Zip": 8254,
            "Location": "Basadingen"
        },
        {
            "Zip": 8255,
            "Location": "Schlattingen"
        },
        {
            "Zip": 8259,
            "Location": "Etzwilen"
        },
        {
            "Zip": 8259,
            "Location": "Kaltenbach"
        },
        {
            "Zip": 8259,
            "Location": "Rheinklingen"
        },
        {
            "Zip": 8259,
            "Location": "Wagenhausen"
        },
        {
            "Zip": 8260,
            "Location": "Stein am Rhein"
        },
        {
            "Zip": 8260,
            "Location": "Stein am Rhein 1"
        },
        {
            "Zip": 8260,
            "Location": "Stein am Rhein 1 Zustellung"
        },
        {
            "Zip": 8260,
            "Location": "Stein am Rhein 2 Stadt"
        },
        {
            "Zip": 8261,
            "Location": "Hemishofen"
        },
        {
            "Zip": 8262,
            "Location": "Ramsen"
        },
        {
            "Zip": 8263,
            "Location": "Buch SH"
        },
        {
            "Zip": 8264,
            "Location": "Eschenz"
        },
        {
            "Zip": 8265,
            "Location": "Mammern"
        },
        {
            "Zip": 8266,
            "Location": "Steckborn"
        },
        {
            "Zip": 8267,
            "Location": "Berlingen"
        },
        {
            "Zip": 8268,
            "Location": "Mannenbach-Salenstein"
        },
        {
            "Zip": 8268,
            "Location": "Salenstein"
        },
        {
            "Zip": 8269,
            "Location": "Fruthwilen"
        },
        {
            "Zip": 8272,
            "Location": "Ermatingen"
        },
        {
            "Zip": 8273,
            "Location": "Triboltingen"
        },
        {
            "Zip": 8274,
            "Location": "Gottlieben"
        },
        {
            "Zip": 8274,
            "Location": "Tägerwilen"
        },
        {
            "Zip": 8280,
            "Location": "Kreuzlingen"
        },
        {
            "Zip": 8280,
            "Location": "Kreuzlingen 1"
        },
        {
            "Zip": 8280,
            "Location": "Kreuzlingen 3"
        },
        {
            "Zip": 8280,
            "Location": "Kreuzlingen ceha!"
        },
        {
            "Zip": 8285,
            "Location": "Kreuzlingen Ifolor AG"
        },
        {
            "Zip": 8301,
            "Location": "Glattzentrum b. Wallisellen"
        },
        {
            "Zip": 8301,
            "Location": "Glattzentrum N. Wint.str."
        },
        {
            "Zip": 8302,
            "Location": "Kloten"
        },
        {
            "Zip": 8302,
            "Location": "Kloten Kaserne"
        },
        {
            "Zip": 8303,
            "Location": "Bassersdorf"
        },
        {
            "Zip": 8304,
            "Location": "Wallisellen"
        },
        {
            "Zip": 8304,
            "Location": "Wallisellen Zustellung"
        },
        {
            "Zip": 8305,
            "Location": "Dietlikon"
        },
        {
            "Zip": 8306,
            "Location": "Brüttisellen"
        },
        {
            "Zip": 8307,
            "Location": "Effretikon"
        },
        {
            "Zip": 8307,
            "Location": "Effretikon PostAuto AG"
        },
        {
            "Zip": 8307,
            "Location": "Effretikon Zustellung"
        },
        {
            "Zip": 8307,
            "Location": "Ottikon b. Kemptthal"
        },
        {
            "Zip": 8308,
            "Location": "Agasul"
        },
        {
            "Zip": 8308,
            "Location": "Illnau"
        },
        {
            "Zip": 8309,
            "Location": "Nürensdorf"
        },
        {
            "Zip": 8310,
            "Location": "Grafstal"
        },
        {
            "Zip": 8310,
            "Location": "Kemptthal"
        },
        {
            "Zip": 8311,
            "Location": "Brütten"
        },
        {
            "Zip": 8312,
            "Location": "Winterberg ZH"
        },
        {
            "Zip": 8314,
            "Location": "Kyburg"
        },
        {
            "Zip": 8315,
            "Location": "Lindau"
        },
        {
            "Zip": 8317,
            "Location": "Tagelswangen"
        },
        {
            "Zip": 8320,
            "Location": "Fehraltorf"
        },
        {
            "Zip": 8322,
            "Location": "Gündisau"
        },
        {
            "Zip": 8322,
            "Location": "Madetswil"
        },
        {
            "Zip": 8325,
            "Location": "Effretikon Dist Ba"
        },
        {
            "Zip": 8330,
            "Location": "Pfäffikon ZH"
        },
        {
            "Zip": 8330,
            "Location": "Pfäffikon ZH Bahnhofstrasse"
        },
        {
            "Zip": 8330,
            "Location": "Pfäffikon ZH Zustellung"
        },
        {
            "Zip": 8331,
            "Location": "Auslikon"
        },
        {
            "Zip": 8332,
            "Location": "Rumlikon"
        },
        {
            "Zip": 8332,
            "Location": "Russikon"
        },
        {
            "Zip": 8335,
            "Location": "Hittnau"
        },
        {
            "Zip": 8340,
            "Location": "Hinwil"
        },
        {
            "Zip": 8340,
            "Location": "Hinwil Zustellung"
        },
        {
            "Zip": 8342,
            "Location": "Wernetshausen"
        },
        {
            "Zip": 8343,
            "Location": "Hinwil Dist Ba"
        },
        {
            "Zip": 8344,
            "Location": "Bäretswil"
        },
        {
            "Zip": 8345,
            "Location": "Adetswil"
        },
        {
            "Zip": 8352,
            "Location": "Elsau"
        },
        {
            "Zip": 8352,
            "Location": "Elsau St. Gallerstrasse"
        },
        {
            "Zip": 8352,
            "Location": "Ricketwil (Winterthur)"
        },
        {
            "Zip": 8353,
            "Location": "Elgg"
        },
        {
            "Zip": 8354,
            "Location": "Dickbuch"
        },
        {
            "Zip": 8354,
            "Location": "Hofstetten ZH"
        },
        {
            "Zip": 8355,
            "Location": "Aadorf"
        },
        {
            "Zip": 8356,
            "Location": "Ettenhausen TG"
        },
        {
            "Zip": 8357,
            "Location": "Guntershausen b. Aadorf"
        },
        {
            "Zip": 8360,
            "Location": "Eschlikon TG"
        },
        {
            "Zip": 8360,
            "Location": "Wallenwil"
        },
        {
            "Zip": 8362,
            "Location": "Balterswil"
        },
        {
            "Zip": 8363,
            "Location": "Bichelsee"
        },
        {
            "Zip": 8370,
            "Location": "Sirnach"
        },
        {
            "Zip": 8370,
            "Location": "Sirnach Distributionsbasis"
        },
        {
            "Zip": 8370,
            "Location": "Sirnach Zustellung"
        },
        {
            "Zip": 8371,
            "Location": "Busswil TG"
        },
        {
            "Zip": 8372,
            "Location": "Wiezikon b. Sirnach"
        },
        {
            "Zip": 8374,
            "Location": "Dussnang"
        },
        {
            "Zip": 8374,
            "Location": "Oberwangen TG"
        },
        {
            "Zip": 8376,
            "Location": "Au TG"
        },
        {
            "Zip": 8376,
            "Location": "Fischingen"
        },
        {
            "Zip": 8400,
            "Location": "Winterthur"
        },
        {
            "Zip": 8400,
            "Location": "Winterthur 1 Annahme"
        },
        {
            "Zip": 8400,
            "Location": "Winterthur Kaserne"
        },
        {
            "Zip": 8400,
            "Location": "Winterthur Zustellung"
        },
        {
            "Zip": 8401,
            "Location": "Winterthur"
        },
        {
            "Zip": 8402,
            "Location": "Winterthur"
        },
        {
            "Zip": 8403,
            "Location": "Winterthur"
        },
        {
            "Zip": 8404,
            "Location": "Reutlingen (Winterthur)"
        },
        {
            "Zip": 8404,
            "Location": "Stadel (Winterthur)"
        },
        {
            "Zip": 8404,
            "Location": "Winterthur"
        },
        {
            "Zip": 8404,
            "Location": "Winterthur im LInk"
        },
        {
            "Zip": 8405,
            "Location": "Winterthur"
        },
        {
            "Zip": 8405,
            "Location": "Winterthur 5 Zustellung"
        },
        {
            "Zip": 8406,
            "Location": "Winterthur"
        },
        {
            "Zip": 8406,
            "Location": "Winterthur 6 Zustellung"
        },
        {
            "Zip": 8408,
            "Location": "Winterthur"
        },
        {
            "Zip": 8408,
            "Location": "Winterthur 8 Zustellung"
        },
        {
            "Zip": 8409,
            "Location": "Winterthur"
        },
        {
            "Zip": 8410,
            "Location": "Winterthur"
        },
        {
            "Zip": 8411,
            "Location": "Winterthur"
        },
        {
            "Zip": 8411,
            "Location": "Winterthur Pflanzschulstr"
        },
        {
            "Zip": 8412,
            "Location": "Aesch (Neftenbach)"
        },
        {
            "Zip": 8412,
            "Location": "Hünikon (Neftenbach)"
        },
        {
            "Zip": 8412,
            "Location": "Riet (Neftenbach)"
        },
        {
            "Zip": 8413,
            "Location": "Neftenbach"
        },
        {
            "Zip": 8414,
            "Location": "Buch am Irchel"
        },
        {
            "Zip": 8415,
            "Location": "Berg am Irchel"
        },
        {
            "Zip": 8415,
            "Location": "Gräslikon"
        },
        {
            "Zip": 8416,
            "Location": "Flaach"
        },
        {
            "Zip": 8418,
            "Location": "Schlatt ZH"
        },
        {
            "Zip": 8421,
            "Location": "Dättlikon"
        },
        {
            "Zip": 8422,
            "Location": "Pfungen"
        },
        {
            "Zip": 8422,
            "Location": "Pfungen PL3"
        },
        {
            "Zip": 8424,
            "Location": "Embrach"
        },
        {
            "Zip": 8424,
            "Location": "Embrach Dorfstrasse"
        },
        {
            "Zip": 8424,
            "Location": "Embrach Zustellung"
        },
        {
            "Zip": 8425,
            "Location": "Oberembrach"
        },
        {
            "Zip": 8426,
            "Location": "Lufingen"
        },
        {
            "Zip": 8427,
            "Location": "Freienstein"
        },
        {
            "Zip": 8427,
            "Location": "Rorbas"
        },
        {
            "Zip": 8428,
            "Location": "Teufen ZH"
        },
        {
            "Zip": 8442,
            "Location": "Hettlingen"
        },
        {
            "Zip": 8444,
            "Location": "Henggart"
        },
        {
            "Zip": 8447,
            "Location": "Dachsen"
        },
        {
            "Zip": 8450,
            "Location": "Andelfingen"
        },
        {
            "Zip": 8450,
            "Location": "Andelfingen Zustellung"
        },
        {
            "Zip": 8451,
            "Location": "Kleinandelfingen"
        },
        {
            "Zip": 8452,
            "Location": "Adlikon b. Andelfingen"
        },
        {
            "Zip": 8453,
            "Location": "Alten"
        },
        {
            "Zip": 8454,
            "Location": "Buchberg"
        },
        {
            "Zip": 8455,
            "Location": "Rüdlingen"
        },
        {
            "Zip": 8457,
            "Location": "Humlikon"
        },
        {
            "Zip": 8458,
            "Location": "Dorf"
        },
        {
            "Zip": 8459,
            "Location": "Volken"
        },
        {
            "Zip": 8460,
            "Location": "Marthalen"
        },
        {
            "Zip": 8460,
            "Location": "Marthalen Güeterstrass"
        },
        {
            "Zip": 8461,
            "Location": "Oerlingen"
        },
        {
            "Zip": 8462,
            "Location": "Rheinau"
        },
        {
            "Zip": 8463,
            "Location": "Benken ZH"
        },
        {
            "Zip": 8464,
            "Location": "Ellikon am Rhein"
        },
        {
            "Zip": 8465,
            "Location": "Rudolfingen"
        },
        {
            "Zip": 8465,
            "Location": "Wildensbuch"
        },
        {
            "Zip": 8466,
            "Location": "Trüllikon"
        },
        {
            "Zip": 8467,
            "Location": "Truttikon"
        },
        {
            "Zip": 8468,
            "Location": "Guntalingen"
        },
        {
            "Zip": 8468,
            "Location": "Waltalingen"
        },
        {
            "Zip": 8471,
            "Location": "Bänk (Dägerlen)"
        },
        {
            "Zip": 8471,
            "Location": "Berg (Dägerlen)"
        },
        {
            "Zip": 8471,
            "Location": "Dägerlen"
        },
        {
            "Zip": 8471,
            "Location": "Oberwil (Dägerlen)"
        },
        {
            "Zip": 8471,
            "Location": "Rutschwil (Dägerlen)"
        },
        {
            "Zip": 8472,
            "Location": "Seuzach"
        },
        {
            "Zip": 8472,
            "Location": "Seuzach Zustellung"
        },
        {
            "Zip": 8474,
            "Location": "Dinhard"
        },
        {
            "Zip": 8475,
            "Location": "Ossingen"
        },
        {
            "Zip": 8476,
            "Location": "Unterstammheim"
        },
        {
            "Zip": 8477,
            "Location": "Oberstammheim"
        },
        {
            "Zip": 8478,
            "Location": "Thalheim an der Thur"
        },
        {
            "Zip": 8479,
            "Location": "Altikon"
        },
        {
            "Zip": 8482,
            "Location": "Sennhof (Winterthur)"
        },
        {
            "Zip": 8483,
            "Location": "Kollbrunn"
        },
        {
            "Zip": 8484,
            "Location": "Neschwil"
        },
        {
            "Zip": 8484,
            "Location": "Theilingen"
        },
        {
            "Zip": 8484,
            "Location": "Weisslingen"
        },
        {
            "Zip": 8486,
            "Location": "Rikon im Tösstal"
        },
        {
            "Zip": 8487,
            "Location": "Rämismühle"
        },
        {
            "Zip": 8487,
            "Location": "Zell ZH"
        },
        {
            "Zip": 8488,
            "Location": "Turbenthal"
        },
        {
            "Zip": 8488,
            "Location": "Turbenthal Tösstalstrasse"
        },
        {
            "Zip": 8488,
            "Location": "Turbenthal Zustellung"
        },
        {
            "Zip": 8489,
            "Location": "Ehrikon"
        },
        {
            "Zip": 8489,
            "Location": "Schalchen"
        },
        {
            "Zip": 8489,
            "Location": "Wildberg"
        },
        {
            "Zip": 8492,
            "Location": "Wila"
        },
        {
            "Zip": 8493,
            "Location": "Saland"
        },
        {
            "Zip": 8494,
            "Location": "Bauma"
        },
        {
            "Zip": 8494,
            "Location": "Bauma Zustellung"
        },
        {
            "Zip": 8495,
            "Location": "Schmidrüti"
        },
        {
            "Zip": 8496,
            "Location": "Steg im Tösstal"
        },
        {
            "Zip": 8497,
            "Location": "Fischenthal"
        },
        {
            "Zip": 8498,
            "Location": "Gibswil"
        },
        {
            "Zip": 8499,
            "Location": "Sternenberg"
        },
        {
            "Zip": 8500,
            "Location": "Frauenfeld"
        },
        {
            "Zip": 8500,
            "Location": "Frauenfeld 1"
        },
        {
            "Zip": 8500,
            "Location": "Frauenfeld 1 Zustellung"
        },
        {
            "Zip": 8500,
            "Location": "Frauenfeld Kaserne"
        },
        {
            "Zip": 8500,
            "Location": "Frauenfeld Murgstrasse"
        },
        {
            "Zip": 8500,
            "Location": "Frauenfeld Postauto TG-SH"
        },
        {
            "Zip": 8500,
            "Location": "Gerlikon"
        },
        {
            "Zip": 8501,
            "Location": "Frauenfeld"
        },
        {
            "Zip": 8502,
            "Location": "Frauenfeld Talbach"
        },
        {
            "Zip": 8503,
            "Location": "Frauenfeld Kurzdorf"
        },
        {
            "Zip": 8505,
            "Location": "Dettighofen"
        },
        {
            "Zip": 8505,
            "Location": "Pfyn"
        },
        {
            "Zip": 8506,
            "Location": "Lanzenneunforn"
        },
        {
            "Zip": 8507,
            "Location": "Hörhausen"
        },
        {
            "Zip": 8508,
            "Location": "Homburg"
        },
        {
            "Zip": 8509,
            "Location": "Frauenfeld"
        },
        {
            "Zip": 8510,
            "Location": "Frauenfeld Kant. Verwaltung"
        },
        {
            "Zip": 8512,
            "Location": "Lustdorf"
        },
        {
            "Zip": 8512,
            "Location": "Thundorf"
        },
        {
            "Zip": 8512,
            "Location": "Wetzikon TG"
        },
        {
            "Zip": 8514,
            "Location": "Amlikon-Bissegg"
        },
        {
            "Zip": 8520,
            "Location": "Frauenfeld Dist Ba"
        },
        {
            "Zip": 8520,
            "Location": "Frauenfeld Paketzentrum"
        },
        {
            "Zip": 8522,
            "Location": "Aawangen"
        },
        {
            "Zip": 8522,
            "Location": "Häuslenen"
        },
        {
            "Zip": 8523,
            "Location": "Hagenbuch ZH"
        },
        {
            "Zip": 8524,
            "Location": "Buch b. Frauenfeld"
        },
        {
            "Zip": 8524,
            "Location": "Uesslingen"
        },
        {
            "Zip": 8525,
            "Location": "Niederneunforn"
        },
        {
            "Zip": 8525,
            "Location": "Wilen b. Neunforn"
        },
        {
            "Zip": 8526,
            "Location": "Oberneunforn"
        },
        {
            "Zip": 8530,
            "Location": "Frauenfeld CALL"
        },
        {
            "Zip": 8532,
            "Location": "Warth"
        },
        {
            "Zip": 8532,
            "Location": "Weiningen TG"
        },
        {
            "Zip": 8535,
            "Location": "Herdern"
        },
        {
            "Zip": 8536,
            "Location": "Hüttwilen"
        },
        {
            "Zip": 8537,
            "Location": "Nussbaumen TG"
        },
        {
            "Zip": 8537,
            "Location": "Uerschhausen"
        },
        {
            "Zip": 8540,
            "Location": "Frauenfeld ST PP 1"
        },
        {
            "Zip": 8542,
            "Location": "Wiesendangen"
        },
        {
            "Zip": 8543,
            "Location": "Bertschikon"
        },
        {
            "Zip": 8543,
            "Location": "Gundetswil"
        },
        {
            "Zip": 8543,
            "Location": "Kefikon ZH"
        },
        {
            "Zip": 8544,
            "Location": "Attikon"
        },
        {
            "Zip": 8545,
            "Location": "Rickenbach Sulz"
        },
        {
            "Zip": 8545,
            "Location": "Rickenbach ZH"
        },
        {
            "Zip": 8546,
            "Location": "Islikon"
        },
        {
            "Zip": 8546,
            "Location": "Kefikon TG"
        },
        {
            "Zip": 8546,
            "Location": "Menzengrüt"
        },
        {
            "Zip": 8547,
            "Location": "Gachnang"
        },
        {
            "Zip": 8548,
            "Location": "Ellikon an der Thur"
        },
        {
            "Zip": 8552,
            "Location": "Felben-Wellhausen"
        },
        {
            "Zip": 8553,
            "Location": "Eschikofen"
        },
        {
            "Zip": 8553,
            "Location": "Harenwilen"
        },
        {
            "Zip": 8553,
            "Location": "Hüttlingen"
        },
        {
            "Zip": 8553,
            "Location": "Hüttlingen-Mettendorf"
        },
        {
            "Zip": 8553,
            "Location": "Mettendorf TG"
        },
        {
            "Zip": 8554,
            "Location": "Bonau"
        },
        {
            "Zip": 8554,
            "Location": "Müllheim-Wigoltingen"
        },
        {
            "Zip": 8555,
            "Location": "Müllheim Dorf"
        },
        {
            "Zip": 8556,
            "Location": "Engwang"
        },
        {
            "Zip": 8556,
            "Location": "Illhart"
        },
        {
            "Zip": 8556,
            "Location": "Lamperswil TG"
        },
        {
            "Zip": 8556,
            "Location": "Wigoltingen"
        },
        {
            "Zip": 8558,
            "Location": "Raperswilen"
        },
        {
            "Zip": 8560,
            "Location": "Märstetten"
        },
        {
            "Zip": 8561,
            "Location": "Ottoberg"
        },
        {
            "Zip": 8564,
            "Location": "Engwilen"
        },
        {
            "Zip": 8564,
            "Location": "Gunterswilen"
        },
        {
            "Zip": 8564,
            "Location": "Hattenhausen"
        },
        {
            "Zip": 8564,
            "Location": "Hefenhausen"
        },
        {
            "Zip": 8564,
            "Location": "Lipperswil"
        },
        {
            "Zip": 8564,
            "Location": "Sonterswil"
        },
        {
            "Zip": 8564,
            "Location": "Wagerswil"
        },
        {
            "Zip": 8564,
            "Location": "Wäldi"
        },
        {
            "Zip": 8565,
            "Location": "Hugelshofen"
        },
        {
            "Zip": 8566,
            "Location": "Dotnacht"
        },
        {
            "Zip": 8566,
            "Location": "Ellighausen"
        },
        {
            "Zip": 8566,
            "Location": "Lippoldswilen"
        },
        {
            "Zip": 8566,
            "Location": "Neuwilen"
        },
        {
            "Zip": 8570,
            "Location": "Weinfelden"
        },
        {
            "Zip": 8570,
            "Location": "Weinfelden Zustellung"
        },
        {
            "Zip": 8572,
            "Location": "Andhausen"
        },
        {
            "Zip": 8572,
            "Location": "Berg TG"
        },
        {
            "Zip": 8572,
            "Location": "Graltshausen"
        },
        {
            "Zip": 8572,
            "Location": "Guntershausen b. Berg"
        },
        {
            "Zip": 8573,
            "Location": "Alterswilen"
        },
        {
            "Zip": 8573,
            "Location": "Altishausen"
        },
        {
            "Zip": 8573,
            "Location": "Siegershausen"
        },
        {
            "Zip": 8574,
            "Location": "Dettighofen (Lengwil)"
        },
        {
            "Zip": 8574,
            "Location": "Illighausen"
        },
        {
            "Zip": 8574,
            "Location": "Lengwil"
        },
        {
            "Zip": 8574,
            "Location": "Oberhofen TG"
        },
        {
            "Zip": 8575,
            "Location": "Bürglen TG"
        },
        {
            "Zip": 8575,
            "Location": "Bürglen TG Postweg"
        },
        {
            "Zip": 8575,
            "Location": "Istighofen"
        },
        {
            "Zip": 8576,
            "Location": "Mauren TG"
        },
        {
            "Zip": 8577,
            "Location": "Schönholzerswilen"
        },
        {
            "Zip": 8580,
            "Location": "Amriswil"
        },
        {
            "Zip": 8580,
            "Location": "Amriswil Zustellung"
        },
        {
            "Zip": 8580,
            "Location": "Biessenhofen"
        },
        {
            "Zip": 8580,
            "Location": "Hagenwil b. Amriswil"
        },
        {
            "Zip": 8580,
            "Location": "Hefenhofen"
        },
        {
            "Zip": 8580,
            "Location": "Sommeri"
        },
        {
            "Zip": 8581,
            "Location": "Schocherswil"
        },
        {
            "Zip": 8582,
            "Location": "Dozwil"
        },
        {
            "Zip": 8583,
            "Location": "Donzhausen"
        },
        {
            "Zip": 8583,
            "Location": "Götighofen"
        },
        {
            "Zip": 8583,
            "Location": "Sulgen"
        },
        {
            "Zip": 8584,
            "Location": "Leimbach TG"
        },
        {
            "Zip": 8584,
            "Location": "Opfershofen TG"
        },
        {
            "Zip": 8585,
            "Location": "Birwinken"
        },
        {
            "Zip": 8585,
            "Location": "Happerswil"
        },
        {
            "Zip": 8585,
            "Location": "Herrenhof"
        },
        {
            "Zip": 8585,
            "Location": "Klarsreuti"
        },
        {
            "Zip": 8585,
            "Location": "Langrickenbach"
        },
        {
            "Zip": 8585,
            "Location": "Mattwil"
        },
        {
            "Zip": 8585,
            "Location": "Schönenbaumgarten"
        },
        {
            "Zip": 8585,
            "Location": "Zuben"
        },
        {
            "Zip": 8586,
            "Location": "Andwil TG"
        },
        {
            "Zip": 8586,
            "Location": "Buch b. Kümmertshausen"
        },
        {
            "Zip": 8586,
            "Location": "Buchackern"
        },
        {
            "Zip": 8586,
            "Location": "Engishofen"
        },
        {
            "Zip": 8586,
            "Location": "Ennetaach"
        },
        {
            "Zip": 8586,
            "Location": "Erlen"
        },
        {
            "Zip": 8586,
            "Location": "Kümmertshausen"
        },
        {
            "Zip": 8586,
            "Location": "Riedt b. Erlen"
        },
        {
            "Zip": 8587,
            "Location": "Oberaach"
        },
        {
            "Zip": 8588,
            "Location": "Zihlschlacht"
        },
        {
            "Zip": 8589,
            "Location": "Sitterdorf"
        },
        {
            "Zip": 8590,
            "Location": "Romanshorn"
        },
        {
            "Zip": 8590,
            "Location": "Romanshorn Zustellung"
        },
        {
            "Zip": 8592,
            "Location": "Uttwil"
        },
        {
            "Zip": 8593,
            "Location": "Kesswil"
        },
        {
            "Zip": 8594,
            "Location": "Güttingen"
        },
        {
            "Zip": 8595,
            "Location": "Altnau"
        },
        {
            "Zip": 8596,
            "Location": "Münsterlingen"
        },
        {
            "Zip": 8596,
            "Location": "Scherzingen"
        },
        {
            "Zip": 8597,
            "Location": "Landschlacht"
        },
        {
            "Zip": 8598,
            "Location": "Bottighofen"
        },
        {
            "Zip": 8599,
            "Location": "Salmsach"
        },
        {
            "Zip": 8600,
            "Location": "Dübendorf"
        },
        {
            "Zip": 8600,
            "Location": "Dübendorf 1"
        },
        {
            "Zip": 8600,
            "Location": "Dübendorf 3"
        },
        {
            "Zip": 8600,
            "Location": "Dübendorf Kaserne"
        },
        {
            "Zip": 8600,
            "Location": "Dübendorf Wilstrasse"
        },
        {
            "Zip": 8602,
            "Location": "Wangen b. Dübendorf"
        },
        {
            "Zip": 8603,
            "Location": "Schwerzenbach"
        },
        {
            "Zip": 8603,
            "Location": "Schwerzenbach Bahnstrasse"
        },
        {
            "Zip": 8604,
            "Location": "Volketswil"
        },
        {
            "Zip": 8604,
            "Location": "Volketswil Zentrum"
        },
        {
            "Zip": 8605,
            "Location": "Gutenswil"
        },
        {
            "Zip": 8606,
            "Location": "Greifensee"
        },
        {
            "Zip": 8606,
            "Location": "Nänikon"
        },
        {
            "Zip": 8606,
            "Location": "Nänikon Zustellung"
        },
        {
            "Zip": 8607,
            "Location": "Aathal-Seegräben"
        },
        {
            "Zip": 8608,
            "Location": "Bubikon"
        },
        {
            "Zip": 8610,
            "Location": "Uster"
        },
        {
            "Zip": 8610,
            "Location": "Uster 1"
        },
        {
            "Zip": 8612,
            "Location": "Uster Niederuster"
        },
        {
            "Zip": 8613,
            "Location": "Uster 3"
        },
        {
            "Zip": 8614,
            "Location": "Bertschikon (Gossau ZH)"
        },
        {
            "Zip": 8614,
            "Location": "Sulzbach"
        },
        {
            "Zip": 8615,
            "Location": "Freudwil"
        },
        {
            "Zip": 8615,
            "Location": "Wermatswil"
        },
        {
            "Zip": 8616,
            "Location": "Riedikon"
        },
        {
            "Zip": 8617,
            "Location": "Mönchaltorf"
        },
        {
            "Zip": 8618,
            "Location": "Oetwil am See"
        },
        {
            "Zip": 8620,
            "Location": "Wetzikon Kastellstrasse"
        },
        {
            "Zip": 8620,
            "Location": "Wetzikon Poststrasse"
        },
        {
            "Zip": 8620,
            "Location": "Wetzikon ZH"
        },
        {
            "Zip": 8620,
            "Location": "Wetzikon ZH 1"
        },
        {
            "Zip": 8621,
            "Location": "Wetzikon ZH Robenhausen"
        },
        {
            "Zip": 8622,
            "Location": "Wetzikon ZH"
        },
        {
            "Zip": 8623,
            "Location": "Wetzikon ZH"
        },
        {
            "Zip": 8624,
            "Location": "Grüt (Gossau ZH)"
        },
        {
            "Zip": 8625,
            "Location": "Gossau ZH"
        },
        {
            "Zip": 8626,
            "Location": "Ottikon (Gossau ZH)"
        },
        {
            "Zip": 8627,
            "Location": "Grüningen"
        },
        {
            "Zip": 8630,
            "Location": "Rüti ZH"
        },
        {
            "Zip": 8632,
            "Location": "Tann"
        },
        {
            "Zip": 8633,
            "Location": "Wolfhausen"
        },
        {
            "Zip": 8634,
            "Location": "Hombrechtikon"
        },
        {
            "Zip": 8635,
            "Location": "Dürnten"
        },
        {
            "Zip": 8636,
            "Location": "Wald ZH"
        },
        {
            "Zip": 8636,
            "Location": "Wald ZH Zustellung"
        },
        {
            "Zip": 8637,
            "Location": "Laupen ZH"
        },
        {
            "Zip": 8638,
            "Location": "Goldingen"
        },
        {
            "Zip": 8639,
            "Location": "Faltigberg"
        },
        {
            "Zip": 8640,
            "Location": "Hurden"
        },
        {
            "Zip": 8640,
            "Location": "Kempraten"
        },
        {
            "Zip": 8640,
            "Location": "Rapperswil SG"
        },
        {
            "Zip": 8640,
            "Location": "Rapperswil SG Zustellung"
        },
        {
            "Zip": 8645,
            "Location": "Jona"
        },
        {
            "Zip": 8645,
            "Location": "Jona Buech Gewerbe"
        },
        {
            "Zip": 8646,
            "Location": "Wagen"
        },
        {
            "Zip": 8700,
            "Location": "Küsnacht ZH"
        },
        {
            "Zip": 8700,
            "Location": "Küsnacht ZH Zustellung"
        },
        {
            "Zip": 8702,
            "Location": "Zollikon"
        },
        {
            "Zip": 8702,
            "Location": "Zollikon Dorf"
        },
        {
            "Zip": 8703,
            "Location": "Erlenbach ZH"
        },
        {
            "Zip": 8704,
            "Location": "Herrliberg"
        },
        {
            "Zip": 8706,
            "Location": "Meilen"
        },
        {
            "Zip": 8706,
            "Location": "Meilen Zustellung"
        },
        {
            "Zip": 8707,
            "Location": "Uetikon am See"
        },
        {
            "Zip": 8708,
            "Location": "Männedorf"
        },
        {
            "Zip": 8708,
            "Location": "Männedorf Zustellung"
        },
        {
            "Zip": 8712,
            "Location": "Stäfa"
        },
        {
            "Zip": 8712,
            "Location": "Stäfa Zustellung"
        },
        {
            "Zip": 8713,
            "Location": "Uerikon"
        },
        {
            "Zip": 8714,
            "Location": "Feldbach"
        },
        {
            "Zip": 8715,
            "Location": "Bollingen"
        },
        {
            "Zip": 8716,
            "Location": "Schmerikon"
        },
        {
            "Zip": 8717,
            "Location": "Benken SG"
        },
        {
            "Zip": 8718,
            "Location": "Schänis"
        },
        {
            "Zip": 8722,
            "Location": "Kaltbrunn"
        },
        {
            "Zip": 8722,
            "Location": "Kaltbrunn Zustellung"
        },
        {
            "Zip": 8723,
            "Location": "Maseltrangen"
        },
        {
            "Zip": 8723,
            "Location": "Rufi"
        },
        {
            "Zip": 8725,
            "Location": "Ernetschwil"
        },
        {
            "Zip": 8725,
            "Location": "Gebertingen"
        },
        {
            "Zip": 8726,
            "Location": "Ricken SG"
        },
        {
            "Zip": 8727,
            "Location": "Walde SG"
        },
        {
            "Zip": 8730,
            "Location": "Uznach"
        },
        {
            "Zip": 8730,
            "Location": "Uznach Postauto Linth-SZ-GL"
        },
        {
            "Zip": 8730,
            "Location": "Uznach Zürcherstrasse"
        },
        {
            "Zip": 8730,
            "Location": "Uznach Zustellung"
        },
        {
            "Zip": 8732,
            "Location": "Neuhaus SG"
        },
        {
            "Zip": 8733,
            "Location": "Eschenbach SG"
        },
        {
            "Zip": 8734,
            "Location": "Ermenswil"
        },
        {
            "Zip": 8735,
            "Location": "Rüeterswil"
        },
        {
            "Zip": 8735,
            "Location": "St. Gallenkappel"
        },
        {
            "Zip": 8737,
            "Location": "Gommiswald"
        },
        {
            "Zip": 8738,
            "Location": "Uetliburg SG"
        },
        {
            "Zip": 8739,
            "Location": "Rieden SG"
        },
        {
            "Zip": 8740,
            "Location": "Uznach Vögele Versandhaus"
        },
        {
            "Zip": 8750,
            "Location": "Glarus"
        },
        {
            "Zip": 8750,
            "Location": "Klöntal"
        },
        {
            "Zip": 8750,
            "Location": "Riedern"
        },
        {
            "Zip": 8751,
            "Location": "Urnerboden"
        },
        {
            "Zip": 8752,
            "Location": "Näfels"
        },
        {
            "Zip": 8753,
            "Location": "Mollis"
        },
        {
            "Zip": 8754,
            "Location": "Netstal"
        },
        {
            "Zip": 8755,
            "Location": "Ennenda"
        },
        {
            "Zip": 8756,
            "Location": "Mitlödi"
        },
        {
            "Zip": 8757,
            "Location": "Filzbach"
        },
        {
            "Zip": 8758,
            "Location": "Obstalden"
        },
        {
            "Zip": 8759,
            "Location": "Netstal"
        },
        {
            "Zip": 8762,
            "Location": "Schwanden GL"
        },
        {
            "Zip": 8762,
            "Location": "Schwanden GL Zustellung"
        },
        {
            "Zip": 8762,
            "Location": "Schwändi b. Schwanden"
        },
        {
            "Zip": 8762,
            "Location": "Sool"
        },
        {
            "Zip": 8765,
            "Location": "Engi"
        },
        {
            "Zip": 8766,
            "Location": "Matt"
        },
        {
            "Zip": 8767,
            "Location": "Elm"
        },
        {
            "Zip": 8772,
            "Location": "Nidfurn"
        },
        {
            "Zip": 8773,
            "Location": "Haslen GL"
        },
        {
            "Zip": 8774,
            "Location": "Leuggelbach"
        },
        {
            "Zip": 8775,
            "Location": "Hätzingen"
        },
        {
            "Zip": 8775,
            "Location": "Luchsingen"
        },
        {
            "Zip": 8775,
            "Location": "Luchsingen-Hätzingen"
        },
        {
            "Zip": 8777,
            "Location": "Betschwanden"
        },
        {
            "Zip": 8777,
            "Location": "Diesbach GL"
        },
        {
            "Zip": 8782,
            "Location": "Rüti GL"
        },
        {
            "Zip": 8783,
            "Location": "Linthal"
        },
        {
            "Zip": 8784,
            "Location": "Braunwald"
        },
        {
            "Zip": 8800,
            "Location": "Thalwil"
        },
        {
            "Zip": 8800,
            "Location": "Thalwil Zustellung"
        },
        {
            "Zip": 8802,
            "Location": "Kilchberg ZH"
        },
        {
            "Zip": 8803,
            "Location": "Rüschlikon"
        },
        {
            "Zip": 8804,
            "Location": "Au ZH"
        },
        {
            "Zip": 8805,
            "Location": "Richterswil"
        },
        {
            "Zip": 8805,
            "Location": "Richterswil Burghalden SOB"
        },
        {
            "Zip": 8806,
            "Location": "Bäch SZ"
        },
        {
            "Zip": 8807,
            "Location": "Freienbach"
        },
        {
            "Zip": 8808,
            "Location": "Pfäffikon SZ"
        },
        {
            "Zip": 8808,
            "Location": "Pfäffikon SZ Zustellung"
        },
        {
            "Zip": 8810,
            "Location": "Horgen"
        },
        {
            "Zip": 8810,
            "Location": "Horgen 1"
        },
        {
            "Zip": 8812,
            "Location": "Horgen Bahnhof Oberdorf"
        },
        {
            "Zip": 8813,
            "Location": "Horgen"
        },
        {
            "Zip": 8815,
            "Location": "Horgenberg"
        },
        {
            "Zip": 8816,
            "Location": "Hirzel"
        },
        {
            "Zip": 8820,
            "Location": "Wädenswil"
        },
        {
            "Zip": 8820,
            "Location": "Wädenswil Dist Ba"
        },
        {
            "Zip": 8820,
            "Location": "Wädenswil Zustellung"
        },
        {
            "Zip": 8824,
            "Location": "Schönenberg ZH"
        },
        {
            "Zip": 8825,
            "Location": "Hütten"
        },
        {
            "Zip": 8832,
            "Location": "Wilen b. Wollerau"
        },
        {
            "Zip": 8832,
            "Location": "Wollerau"
        },
        {
            "Zip": 8832,
            "Location": "Wollerau Zustellung"
        },
        {
            "Zip": 8833,
            "Location": "Samstagern"
        },
        {
            "Zip": 8834,
            "Location": "Schindellegi"
        },
        {
            "Zip": 8835,
            "Location": "Feusisberg"
        },
        {
            "Zip": 8836,
            "Location": "Bennau"
        },
        {
            "Zip": 8840,
            "Location": "Einsiedeln"
        },
        {
            "Zip": 8840,
            "Location": "Einsiedeln Zustellung"
        },
        {
            "Zip": 8840,
            "Location": "Trachslau"
        },
        {
            "Zip": 8841,
            "Location": "Gross"
        },
        {
            "Zip": 8842,
            "Location": "Unteriberg"
        },
        {
            "Zip": 8843,
            "Location": "Oberiberg"
        },
        {
            "Zip": 8844,
            "Location": "Euthal"
        },
        {
            "Zip": 8845,
            "Location": "Studen SZ"
        },
        {
            "Zip": 8846,
            "Location": "Willerzell"
        },
        {
            "Zip": 8847,
            "Location": "Egg SZ"
        },
        {
            "Zip": 8849,
            "Location": "Alpthal"
        },
        {
            "Zip": 8852,
            "Location": "Altendorf"
        },
        {
            "Zip": 8852,
            "Location": "Altendorf B&V GK 2"
        },
        {
            "Zip": 8853,
            "Location": "Lachen SZ"
        },
        {
            "Zip": 8854,
            "Location": "Galgenen"
        },
        {
            "Zip": 8854,
            "Location": "Siebnen"
        },
        {
            "Zip": 8854,
            "Location": "Siebnen Zustellung"
        },
        {
            "Zip": 8855,
            "Location": "Wangen SZ"
        },
        {
            "Zip": 8856,
            "Location": "Tuggen"
        },
        {
            "Zip": 8857,
            "Location": "Vorderthal"
        },
        {
            "Zip": 8858,
            "Location": "Innerthal"
        },
        {
            "Zip": 8862,
            "Location": "Schübelbach"
        },
        {
            "Zip": 8863,
            "Location": "Buttikon SZ"
        },
        {
            "Zip": 8864,
            "Location": "Reichenburg"
        },
        {
            "Zip": 8865,
            "Location": "Bilten"
        },
        {
            "Zip": 8866,
            "Location": "Ziegelbrücke"
        },
        {
            "Zip": 8867,
            "Location": "Niederurnen"
        },
        {
            "Zip": 8867,
            "Location": "Niederurnen Dist Hub"
        },
        {
            "Zip": 8868,
            "Location": "Oberurnen"
        },
        {
            "Zip": 8872,
            "Location": "Weesen"
        },
        {
            "Zip": 8873,
            "Location": "Amden"
        },
        {
            "Zip": 8874,
            "Location": "Mühlehorn"
        },
        {
            "Zip": 8877,
            "Location": "Murg"
        },
        {
            "Zip": 8878,
            "Location": "Quinten"
        },
        {
            "Zip": 8879,
            "Location": "Pizolpark (Mels)"
        },
        {
            "Zip": 8880,
            "Location": "Walenstadt"
        },
        {
            "Zip": 8881,
            "Location": "Tscherlach"
        },
        {
            "Zip": 8881,
            "Location": "Walenstadtberg"
        },
        {
            "Zip": 8882,
            "Location": "Unterterzen"
        },
        {
            "Zip": 8883,
            "Location": "Quarten"
        },
        {
            "Zip": 8884,
            "Location": "Oberterzen"
        },
        {
            "Zip": 8885,
            "Location": "Mols"
        },
        {
            "Zip": 8886,
            "Location": "Mädris-Vermol"
        },
        {
            "Zip": 8887,
            "Location": "Mels"
        },
        {
            "Zip": 8887,
            "Location": "Mels Kaserne"
        },
        {
            "Zip": 8887,
            "Location": "Mels Zustellung"
        },
        {
            "Zip": 8888,
            "Location": "Heiligkreuz (Mels)"
        },
        {
            "Zip": 8889,
            "Location": "Plons"
        },
        {
            "Zip": 8890,
            "Location": "Flums"
        },
        {
            "Zip": 8890,
            "Location": "Flums Zustellung"
        },
        {
            "Zip": 8892,
            "Location": "Berschis"
        },
        {
            "Zip": 8893,
            "Location": "Flums Hochwiese"
        },
        {
            "Zip": 8894,
            "Location": "Flumserberg Saxli"
        },
        {
            "Zip": 8895,
            "Location": "Flumserberg Portels"
        },
        {
            "Zip": 8896,
            "Location": "Flumserberg Bergheim"
        },
        {
            "Zip": 8897,
            "Location": "Flumserberg Tannenheim"
        },
        {
            "Zip": 8898,
            "Location": "Flumserberg Tannenbodenalp"
        },
        {
            "Zip": 8901,
            "Location": "Urdorf Tessi"
        },
        {
            "Zip": 8902,
            "Location": "Urdorf"
        },
        {
            "Zip": 8902,
            "Location": "Urdorf Dist Ba"
        },
        {
            "Zip": 8902,
            "Location": "Urdorf PL3"
        },
        {
            "Zip": 8902,
            "Location": "Urdorf Sortierstelle"
        },
        {
            "Zip": 8903,
            "Location": "Birmensdorf ZH"
        },
        {
            "Zip": 8903,
            "Location": "Birmensdorf ZH Kaserne"
        },
        {
            "Zip": 8903,
            "Location": "Birmensdorf ZH Zustellung"
        },
        {
            "Zip": 8904,
            "Location": "Aesch ZH"
        },
        {
            "Zip": 8905,
            "Location": "Arni AG"
        },
        {
            "Zip": 8905,
            "Location": "Arni-Islisberg"
        },
        {
            "Zip": 8905,
            "Location": "Islisberg"
        },
        {
            "Zip": 8906,
            "Location": "Bonstetten"
        },
        {
            "Zip": 8907,
            "Location": "Wettswil"
        },
        {
            "Zip": 8907,
            "Location": "Wettswil Zustellung"
        },
        {
            "Zip": 8908,
            "Location": "Hedingen"
        },
        {
            "Zip": 8909,
            "Location": "Zwillikon"
        },
        {
            "Zip": 8910,
            "Location": "Affoltern am A. Zustellung"
        },
        {
            "Zip": 8910,
            "Location": "Affoltern am Albis"
        },
        {
            "Zip": 8911,
            "Location": "Rifferswil"
        },
        {
            "Zip": 8912,
            "Location": "Obfelden"
        },
        {
            "Zip": 8913,
            "Location": "Ottenbach"
        },
        {
            "Zip": 8914,
            "Location": "Aeugst am Albis"
        },
        {
            "Zip": 8914,
            "Location": "Aeugstertal"
        },
        {
            "Zip": 8915,
            "Location": "Hausen am Albis"
        },
        {
            "Zip": 8916,
            "Location": "Jonen"
        },
        {
            "Zip": 8917,
            "Location": "Oberlunkhofen"
        },
        {
            "Zip": 8918,
            "Location": "Unterlunkhofen"
        },
        {
            "Zip": 8919,
            "Location": "Rottenschwil"
        },
        {
            "Zip": 8925,
            "Location": "Ebertswil"
        },
        {
            "Zip": 8926,
            "Location": "Hauptikon"
        },
        {
            "Zip": 8926,
            "Location": "Kappel am Albis"
        },
        {
            "Zip": 8926,
            "Location": "Uerzlikon"
        },
        {
            "Zip": 8932,
            "Location": "Mettmenstetten"
        },
        {
            "Zip": 8933,
            "Location": "Maschwanden"
        },
        {
            "Zip": 8934,
            "Location": "Knonau"
        },
        {
            "Zip": 8942,
            "Location": "Oberrieden"
        },
        {
            "Zip": 8951,
            "Location": "Fahrweid"
        },
        {
            "Zip": 8952,
            "Location": "Schlieren"
        },
        {
            "Zip": 8952,
            "Location": "Schlieren DocumentServices"
        },
        {
            "Zip": 8952,
            "Location": "Schlieren Zustellung"
        },
        {
            "Zip": 8953,
            "Location": "Dietikon"
        },
        {
            "Zip": 8953,
            "Location": "Dietikon 1"
        },
        {
            "Zip": 8953,
            "Location": "Dietikon 2"
        },
        {
            "Zip": 8953,
            "Location": "Dietikon Silbern"
        },
        {
            "Zip": 8954,
            "Location": "Geroldswil"
        },
        {
            "Zip": 8955,
            "Location": "Oetwil an der Limmat"
        },
        {
            "Zip": 8956,
            "Location": "Killwangen"
        },
        {
            "Zip": 8957,
            "Location": "Spreitenbach"
        },
        {
            "Zip": 8957,
            "Location": "Spreitenbach Zustellung"
        },
        {
            "Zip": 8962,
            "Location": "Bergdietikon"
        },
        {
            "Zip": 8964,
            "Location": "Rudolfstetten"
        },
        {
            "Zip": 8965,
            "Location": "Berikon"
        },
        {
            "Zip": 8965,
            "Location": "Berikon 1 Zustellung"
        },
        {
            "Zip": 8965,
            "Location": "Berikon 2 Dorf"
        },
        {
            "Zip": 8965,
            "Location": "Berikon-Widen"
        },
        {
            "Zip": 8966,
            "Location": "Oberwil-Lieli"
        },
        {
            "Zip": 8967,
            "Location": "Widen"
        },
        {
            "Zip": 8970,
            "Location": "Urdorf CALL"
        },
        {
            "Zip": 8970,
            "Location": "Urdorf Exchange"
        },
        {
            "Zip": 8970,
            "Location": "Urdorf Exchange PL"
        },
        {
            "Zip": 9000,
            "Location": "St. Gallen"
        },
        {
            "Zip": 9000,
            "Location": "St. Gallen 1 Annahme"
        },
        {
            "Zip": 9000,
            "Location": "St. Gallen Dist Ba"
        },
        {
            "Zip": 9000,
            "Location": "St. Gallen Kaserne"
        },
        {
            "Zip": 9001,
            "Location": "St. Gallen"
        },
        {
            "Zip": 9001,
            "Location": "St. Gallen Postauto SG-Azel"
        },
        {
            "Zip": 9004,
            "Location": "St. Gallen"
        },
        {
            "Zip": 9006,
            "Location": "St. Gallen"
        },
        {
            "Zip": 9007,
            "Location": "St. Gallen"
        },
        {
            "Zip": 9008,
            "Location": "St. Gallen"
        },
        {
            "Zip": 9010,
            "Location": "St. Gallen"
        },
        {
            "Zip": 9011,
            "Location": "St. Gallen"
        },
        {
            "Zip": 9012,
            "Location": "St. Gallen"
        },
        {
            "Zip": 9013,
            "Location": "St. Gallen Lachen-Vonwil"
        },
        {
            "Zip": 9014,
            "Location": "St. Gallen"
        },
        {
            "Zip": 9014,
            "Location": "St. Gallen 14 Zustellung"
        },
        {
            "Zip": 9015,
            "Location": "St. Gallen"
        },
        {
            "Zip": 9016,
            "Location": "St. Gallen"
        },
        {
            "Zip": 9020,
            "Location": "St. Gallen"
        },
        {
            "Zip": 9020,
            "Location": "St. Gallen KC PKGK 5"
        },
        {
            "Zip": 9022,
            "Location": "St. Gallen"
        },
        {
            "Zip": 9023,
            "Location": "St. Gallen"
        },
        {
            "Zip": 9024,
            "Location": "St. Gallen Presse-Serv.Güll"
        },
        {
            "Zip": 9026,
            "Location": "St. Gallen Künzler AG"
        },
        {
            "Zip": 9027,
            "Location": "St. Gallen Mona Versand"
        },
        {
            "Zip": 9028,
            "Location": "St. Gallen"
        },
        {
            "Zip": 9029,
            "Location": "St. Gallen Sonderdienste"
        },
        {
            "Zip": 9030,
            "Location": "Abtwil SG"
        },
        {
            "Zip": 9030,
            "Location": "St. Josefen"
        },
        {
            "Zip": 9032,
            "Location": "Engelburg"
        },
        {
            "Zip": 9033,
            "Location": "Untereggen"
        },
        {
            "Zip": 9034,
            "Location": "Eggersriet"
        },
        {
            "Zip": 9035,
            "Location": "Grub AR"
        },
        {
            "Zip": 9036,
            "Location": "Grub SG"
        },
        {
            "Zip": 9037,
            "Location": "Speicherschwendi"
        },
        {
            "Zip": 9038,
            "Location": "Rehetobel"
        },
        {
            "Zip": 9042,
            "Location": "Speicher"
        },
        {
            "Zip": 9043,
            "Location": "Trogen"
        },
        {
            "Zip": 9044,
            "Location": "Wald AR"
        },
        {
            "Zip": 9050,
            "Location": "Appenzell"
        },
        {
            "Zip": 9050,
            "Location": "Appenzell Eggerstanden"
        },
        {
            "Zip": 9050,
            "Location": "Appenzell Enggenhütten"
        },
        {
            "Zip": 9050,
            "Location": "Appenzell Meistersrüte"
        },
        {
            "Zip": 9050,
            "Location": "Appenzell Schlatt"
        },
        {
            "Zip": 9050,
            "Location": "Appenzell Steinegg"
        },
        {
            "Zip": 9050,
            "Location": "Appenzell Zustellung"
        },
        {
            "Zip": 9052,
            "Location": "Niederteufen"
        },
        {
            "Zip": 9053,
            "Location": "Teufen AR"
        },
        {
            "Zip": 9053,
            "Location": "Teufen AR Zustellung"
        },
        {
            "Zip": 9054,
            "Location": "Haslen AI"
        },
        {
            "Zip": 9055,
            "Location": "Bühler"
        },
        {
            "Zip": 9056,
            "Location": "Gais"
        },
        {
            "Zip": 9057,
            "Location": "Schwende"
        },
        {
            "Zip": 9057,
            "Location": "Wasserauen"
        },
        {
            "Zip": 9057,
            "Location": "Weissbad"
        },
        {
            "Zip": 9058,
            "Location": "Brülisau"
        },
        {
            "Zip": 9062,
            "Location": "Lustmühle"
        },
        {
            "Zip": 9063,
            "Location": "Stein AR"
        },
        {
            "Zip": 9064,
            "Location": "Hundwil"
        },
        {
            "Zip": 9100,
            "Location": "Herisau"
        },
        {
            "Zip": 9100,
            "Location": "Herisau 1"
        },
        {
            "Zip": 9100,
            "Location": "Herisau 1 Zustellung"
        },
        {
            "Zip": 9102,
            "Location": "Herisau"
        },
        {
            "Zip": 9103,
            "Location": "Schwellbrunn"
        },
        {
            "Zip": 9104,
            "Location": "Waldstatt"
        },
        {
            "Zip": 9105,
            "Location": "Schönengrund"
        },
        {
            "Zip": 9107,
            "Location": "Urnäsch"
        },
        {
            "Zip": 9108,
            "Location": "Gonten"
        },
        {
            "Zip": 9108,
            "Location": "Gontenbad"
        },
        {
            "Zip": 9108,
            "Location": "Jakobsbad"
        },
        {
            "Zip": 9112,
            "Location": "Schachen b. Herisau"
        },
        {
            "Zip": 9113,
            "Location": "Degersheim"
        },
        {
            "Zip": 9113,
            "Location": "Degersheim Zustellung"
        },
        {
            "Zip": 9114,
            "Location": "Hoffeld"
        },
        {
            "Zip": 9115,
            "Location": "Dicken"
        },
        {
            "Zip": 9116,
            "Location": "Wolfertswil"
        },
        {
            "Zip": 9122,
            "Location": "Ebersol"
        },
        {
            "Zip": 9122,
            "Location": "Mogelsberg"
        },
        {
            "Zip": 9123,
            "Location": "Nassen"
        },
        {
            "Zip": 9125,
            "Location": "Brunnadern"
        },
        {
            "Zip": 9126,
            "Location": "Necker"
        },
        {
            "Zip": 9127,
            "Location": "St. Peterzell"
        },
        {
            "Zip": 9200,
            "Location": "Gossau SG"
        },
        {
            "Zip": 9200,
            "Location": "Gossau SG 1"
        },
        {
            "Zip": 9200,
            "Location": "Gossau SG 1 Zustellung"
        },
        {
            "Zip": 9200,
            "Location": "Gossau SG 2"
        },
        {
            "Zip": 9200,
            "Location": "Gossau SG Logistikzentrum"
        },
        {
            "Zip": 9200,
            "Location": "Gossau SG LZB FP"
        },
        {
            "Zip": 9201,
            "Location": "Gossau SG"
        },
        {
            "Zip": 9203,
            "Location": "Niederwil SG"
        },
        {
            "Zip": 9204,
            "Location": "Andwil SG"
        },
        {
            "Zip": 9205,
            "Location": "Waldkirch"
        },
        {
            "Zip": 9212,
            "Location": "Arnegg"
        },
        {
            "Zip": 9213,
            "Location": "Hauptwil"
        },
        {
            "Zip": 9214,
            "Location": "Kradolf"
        },
        {
            "Zip": 9215,
            "Location": "Buhwil"
        },
        {
            "Zip": 9215,
            "Location": "Schönenberg an der Thur"
        },
        {
            "Zip": 9216,
            "Location": "Heldswil"
        },
        {
            "Zip": 9216,
            "Location": "Hohentannen"
        },
        {
            "Zip": 9217,
            "Location": "Neukirch an der Thur"
        },
        {
            "Zip": 9220,
            "Location": "Bischofszell"
        },
        {
            "Zip": 9220,
            "Location": "Bischofszell Zustellung"
        },
        {
            "Zip": 9223,
            "Location": "Halden"
        },
        {
            "Zip": 9223,
            "Location": "Schweizersholz"
        },
        {
            "Zip": 9225,
            "Location": "St. Pelagiberg"
        },
        {
            "Zip": 9225,
            "Location": "Wilen (Gottshaus)"
        },
        {
            "Zip": 9230,
            "Location": "Flawil"
        },
        {
            "Zip": 9230,
            "Location": "Flawil 1"
        },
        {
            "Zip": 9230,
            "Location": "Flawil 1 Zustellung"
        },
        {
            "Zip": 9230,
            "Location": "Flawil 2 Botsberg"
        },
        {
            "Zip": 9231,
            "Location": "Egg (Flawil)"
        },
        {
            "Zip": 9240,
            "Location": "Niederglatt SG"
        },
        {
            "Zip": 9240,
            "Location": "Uzwil"
        },
        {
            "Zip": 9240,
            "Location": "Uzwil Zustellung"
        },
        {
            "Zip": 9242,
            "Location": "Oberuzwil"
        },
        {
            "Zip": 9243,
            "Location": "Jonschwil"
        },
        {
            "Zip": 9244,
            "Location": "Niederuzwil"
        },
        {
            "Zip": 9245,
            "Location": "Oberbüren"
        },
        {
            "Zip": 9245,
            "Location": "Sonnental"
        },
        {
            "Zip": 9246,
            "Location": "Niederbüren"
        },
        {
            "Zip": 9247,
            "Location": "Henau"
        },
        {
            "Zip": 9248,
            "Location": "Bichwil"
        },
        {
            "Zip": 9249,
            "Location": "Algetshausen"
        },
        {
            "Zip": 9249,
            "Location": "Niederstetten"
        },
        {
            "Zip": 9249,
            "Location": "Oberstetten"
        },
        {
            "Zip": 9300,
            "Location": "Wittenbach"
        },
        {
            "Zip": 9301,
            "Location": "Wittenbach"
        },
        {
            "Zip": 9304,
            "Location": "Bernhardzell"
        },
        {
            "Zip": 9305,
            "Location": "Berg SG"
        },
        {
            "Zip": 9306,
            "Location": "Freidorf TG"
        },
        {
            "Zip": 9308,
            "Location": "Lömmenschwil"
        },
        {
            "Zip": 9312,
            "Location": "Häggenschwil"
        },
        {
            "Zip": 9313,
            "Location": "Muolen"
        },
        {
            "Zip": 9314,
            "Location": "Steinebrunn"
        },
        {
            "Zip": 9315,
            "Location": "Neukirch (Egnach)"
        },
        {
            "Zip": 9315,
            "Location": "Winden"
        },
        {
            "Zip": 9320,
            "Location": "Arbon"
        },
        {
            "Zip": 9320,
            "Location": "Arbon Stickereistrasse"
        },
        {
            "Zip": 9320,
            "Location": "Arbon Zustellung"
        },
        {
            "Zip": 9320,
            "Location": "Frasnacht"
        },
        {
            "Zip": 9320,
            "Location": "Stachen"
        },
        {
            "Zip": 9322,
            "Location": "Egnach"
        },
        {
            "Zip": 9323,
            "Location": "Steinach"
        },
        {
            "Zip": 9325,
            "Location": "Roggwil TG"
        },
        {
            "Zip": 9326,
            "Location": "Horn"
        },
        {
            "Zip": 9327,
            "Location": "Tübach"
        },
        {
            "Zip": 9400,
            "Location": "Rorschach"
        },
        {
            "Zip": 9400,
            "Location": "Rorschach Zustellung"
        },
        {
            "Zip": 9401,
            "Location": "Rorschach"
        },
        {
            "Zip": 9402,
            "Location": "Mörschwil"
        },
        {
            "Zip": 9403,
            "Location": "Goldach"
        },
        {
            "Zip": 9404,
            "Location": "Rorschacherberg"
        },
        {
            "Zip": 9405,
            "Location": "Wienacht-Tobel"
        },
        {
            "Zip": 9410,
            "Location": "Heiden"
        },
        {
            "Zip": 9410,
            "Location": "Heiden Zustellung"
        },
        {
            "Zip": 9411,
            "Location": "Reute AR"
        },
        {
            "Zip": 9411,
            "Location": "Schachen b. Reute"
        },
        {
            "Zip": 9413,
            "Location": "Oberegg"
        },
        {
            "Zip": 9422,
            "Location": "Staad SG"
        },
        {
            "Zip": 9423,
            "Location": "Altenrhein"
        },
        {
            "Zip": 9423,
            "Location": "Altenrhein Dorfstrasse"
        },
        {
            "Zip": 9424,
            "Location": "Rheineck"
        },
        {
            "Zip": 9424,
            "Location": "Rheineck Zustellung"
        },
        {
            "Zip": 9425,
            "Location": "Thal"
        },
        {
            "Zip": 9426,
            "Location": "Lutzenberg"
        },
        {
            "Zip": 9427,
            "Location": "Wolfhalden"
        },
        {
            "Zip": 9428,
            "Location": "Platz AR"
        },
        {
            "Zip": 9428,
            "Location": "Walzenhausen"
        },
        {
            "Zip": 9430,
            "Location": "St. Margrethen SG"
        },
        {
            "Zip": 9434,
            "Location": "Au SG"
        },
        {
            "Zip": 9435,
            "Location": "Heerbrugg"
        },
        {
            "Zip": 9436,
            "Location": "Balgach"
        },
        {
            "Zip": 9437,
            "Location": "Marbach SG"
        },
        {
            "Zip": 9442,
            "Location": "Berneck"
        },
        {
            "Zip": 9442,
            "Location": "Berneck Dist Ba"
        },
        {
            "Zip": 9442,
            "Location": "Berneck Zustellung"
        },
        {
            "Zip": 9442,
            "Location": "Büriswilen"
        },
        {
            "Zip": 9443,
            "Location": "Widnau"
        },
        {
            "Zip": 9443,
            "Location": "Widnau Industriestrasse"
        },
        {
            "Zip": 9444,
            "Location": "Diepoldsau"
        },
        {
            "Zip": 9445,
            "Location": "Rebstein"
        },
        {
            "Zip": 9450,
            "Location": "Altstätten SG"
        },
        {
            "Zip": 9450,
            "Location": "Altstätten SG 2"
        },
        {
            "Zip": 9450,
            "Location": "Altstätten SG Zustellung"
        },
        {
            "Zip": 9450,
            "Location": "Lüchingen"
        },
        {
            "Zip": 9451,
            "Location": "Kriessern"
        },
        {
            "Zip": 9452,
            "Location": "Hinterforst"
        },
        {
            "Zip": 9453,
            "Location": "Eichberg"
        },
        {
            "Zip": 9462,
            "Location": "Montlingen"
        },
        {
            "Zip": 9463,
            "Location": "Oberriet SG"
        },
        {
            "Zip": 9463,
            "Location": "Oberriet SG Zustellung"
        },
        {
            "Zip": 9464,
            "Location": "Lienz"
        },
        {
            "Zip": 9464,
            "Location": "Rüthi (Rheintal)"
        },
        {
            "Zip": 9464,
            "Location": "Rüthi (Rheintal) Staatstr"
        },
        {
            "Zip": 9465,
            "Location": "Salez"
        },
        {
            "Zip": 9466,
            "Location": "Sennwald"
        },
        {
            "Zip": 9467,
            "Location": "Frümsen"
        },
        {
            "Zip": 9468,
            "Location": "Sax"
        },
        {
            "Zip": 9469,
            "Location": "Haag (Rheintal)"
        },
        {
            "Zip": 9470,
            "Location": "Buchs SG"
        },
        {
            "Zip": 9470,
            "Location": "Buchs SG 1"
        },
        {
            "Zip": 9470,
            "Location": "Buchs SG 1 Zustellung"
        },
        {
            "Zip": 9470,
            "Location": "Buchs SG Dist Fil"
        },
        {
            "Zip": 9470,
            "Location": "Buchs SG Räfis"
        },
        {
            "Zip": 9470,
            "Location": "Werdenberg"
        },
        {
            "Zip": 9471,
            "Location": "Buchs SG 1"
        },
        {
            "Zip": 9471,
            "Location": "Buchs SG 3"
        },
        {
            "Zip": 9472,
            "Location": "Grabs"
        },
        {
            "Zip": 9472,
            "Location": "Grabserberg"
        },
        {
            "Zip": 9473,
            "Location": "Gams"
        },
        {
            "Zip": 9475,
            "Location": "Sevelen"
        },
        {
            "Zip": 9476,
            "Location": "Fontnas"
        },
        {
            "Zip": 9476,
            "Location": "Weite"
        },
        {
            "Zip": 9477,
            "Location": "Trübbach"
        },
        {
            "Zip": 9478,
            "Location": "Azmoos"
        },
        {
            "Zip": 9479,
            "Location": "Gretschins"
        },
        {
            "Zip": 9479,
            "Location": "Malans SG"
        },
        {
            "Zip": 9479,
            "Location": "Oberschan"
        },
        {
            "Zip": 9485,
            "Location": "Nendeln"
        },
        {
            "Zip": 9486,
            "Location": "Schaanwald"
        },
        {
            "Zip": 9487,
            "Location": "Gamprin-Bendern"
        },
        {
            "Zip": 9488,
            "Location": "Schellenberg"
        },
        {
            "Zip": 9489,
            "Location": "Schaan Log"
        },
        {
            "Zip": 9490,
            "Location": "Vaduz"
        },
        {
            "Zip": 9491,
            "Location": "Ruggell"
        },
        {
            "Zip": 9492,
            "Location": "Eschen"
        },
        {
            "Zip": 9493,
            "Location": "Mauren FL"
        },
        {
            "Zip": 9494,
            "Location": "Schaan"
        },
        {
            "Zip": 9494,
            "Location": "Schaan Betriebszentrum"
        },
        {
            "Zip": 9494,
            "Location": "Schaan BZ Annahme"
        },
        {
            "Zip": 9494,
            "Location": "Schaan BZ GKS"
        },
        {
            "Zip": 9494,
            "Location": "Schaan IMPC"
        },
        {
            "Zip": 9494,
            "Location": "Schaan Zustellung"
        },
        {
            "Zip": 9495,
            "Location": "Triesen"
        },
        {
            "Zip": 9496,
            "Location": "Balzers"
        },
        {
            "Zip": 9497,
            "Location": "Triesenberg"
        },
        {
            "Zip": 9498,
            "Location": "Planken"
        },
        {
            "Zip": 9500,
            "Location": "Wil SG"
        },
        {
            "Zip": 9500,
            "Location": "Wil SG 1"
        },
        {
            "Zip": 9500,
            "Location": "Wil SG Hubstrasse"
        },
        {
            "Zip": 9501,
            "Location": "Wil SG 1"
        },
        {
            "Zip": 9502,
            "Location": "Braunau"
        },
        {
            "Zip": 9503,
            "Location": "Lanterswil"
        },
        {
            "Zip": 9503,
            "Location": "Stehrenberg"
        },
        {
            "Zip": 9504,
            "Location": "Friltschen"
        },
        {
            "Zip": 9506,
            "Location": "Lommis"
        },
        {
            "Zip": 9507,
            "Location": "Stettfurt"
        },
        {
            "Zip": 9508,
            "Location": "Weingarten-Kalthäusern"
        },
        {
            "Zip": 9512,
            "Location": "Rossrüti"
        },
        {
            "Zip": 9514,
            "Location": "Wuppenau"
        },
        {
            "Zip": 9515,
            "Location": "Hosenruck"
        },
        {
            "Zip": 9517,
            "Location": "Mettlen"
        },
        {
            "Zip": 9523,
            "Location": "Züberwangen"
        },
        {
            "Zip": 9524,
            "Location": "Zuzwil SG"
        },
        {
            "Zip": 9524,
            "Location": "Zuzwil SG Gewerbestrasse"
        },
        {
            "Zip": 9525,
            "Location": "Lenggenwil"
        },
        {
            "Zip": 9526,
            "Location": "Zuckenriet"
        },
        {
            "Zip": 9527,
            "Location": "Niederhelfenschwil"
        },
        {
            "Zip": 9532,
            "Location": "Rickenbach b. Wil"
        },
        {
            "Zip": 9533,
            "Location": "Dietschwil"
        },
        {
            "Zip": 9533,
            "Location": "Kirchberg SG"
        },
        {
            "Zip": 9534,
            "Location": "Gähwil"
        },
        {
            "Zip": 9535,
            "Location": "Wilen b. Wil"
        },
        {
            "Zip": 9536,
            "Location": "Schwarzenbach SG"
        },
        {
            "Zip": 9542,
            "Location": "Münchwilen TG"
        },
        {
            "Zip": 9543,
            "Location": "St. Margarethen TG"
        },
        {
            "Zip": 9545,
            "Location": "Wängi"
        },
        {
            "Zip": 9545,
            "Location": "Wängi Zustellung"
        },
        {
            "Zip": 9546,
            "Location": "Tuttwil"
        },
        {
            "Zip": 9547,
            "Location": "Wittenwil"
        },
        {
            "Zip": 9548,
            "Location": "Matzingen"
        },
        {
            "Zip": 9552,
            "Location": "Bronschhofen"
        },
        {
            "Zip": 9553,
            "Location": "Bettwiesen"
        },
        {
            "Zip": 9554,
            "Location": "Tägerschen"
        },
        {
            "Zip": 9555,
            "Location": "Tobel"
        },
        {
            "Zip": 9556,
            "Location": "Affeltrangen"
        },
        {
            "Zip": 9556,
            "Location": "Zezikon"
        },
        {
            "Zip": 9562,
            "Location": "Buch b. Märwil"
        },
        {
            "Zip": 9562,
            "Location": "Märwil"
        },
        {
            "Zip": 9565,
            "Location": "Bussnang"
        },
        {
            "Zip": 9565,
            "Location": "Oberbussnang"
        },
        {
            "Zip": 9565,
            "Location": "Oppikon"
        },
        {
            "Zip": 9565,
            "Location": "Rothenhausen"
        },
        {
            "Zip": 9565,
            "Location": "Schmidshof"
        },
        {
            "Zip": 9573,
            "Location": "Littenheid"
        },
        {
            "Zip": 9601,
            "Location": "Lütisburg Station"
        },
        {
            "Zip": 9602,
            "Location": "Bazenheid"
        },
        {
            "Zip": 9602,
            "Location": "Bazenheid Zustellung"
        },
        {
            "Zip": 9602,
            "Location": "Müselbach"
        },
        {
            "Zip": 9604,
            "Location": "Lütisburg"
        },
        {
            "Zip": 9604,
            "Location": "Oberrindal"
        },
        {
            "Zip": 9604,
            "Location": "Unterrindal"
        },
        {
            "Zip": 9606,
            "Location": "Bütschwil"
        },
        {
            "Zip": 9607,
            "Location": "Mosnang"
        },
        {
            "Zip": 9608,
            "Location": "Ganterschwil"
        },
        {
            "Zip": 9612,
            "Location": "Dreien"
        },
        {
            "Zip": 9613,
            "Location": "Mühlrüti"
        },
        {
            "Zip": 9614,
            "Location": "Libingen"
        },
        {
            "Zip": 9615,
            "Location": "Dietfurt"
        },
        {
            "Zip": 9620,
            "Location": "Lichtensteig"
        },
        {
            "Zip": 9621,
            "Location": "Oberhelfenschwil"
        },
        {
            "Zip": 9622,
            "Location": "Krinau"
        },
        {
            "Zip": 9630,
            "Location": "Wattwil"
        },
        {
            "Zip": 9630,
            "Location": "Wattwil Zustellung"
        },
        {
            "Zip": 9631,
            "Location": "Ulisbach"
        },
        {
            "Zip": 9633,
            "Location": "Bächli (Hemberg)"
        },
        {
            "Zip": 9633,
            "Location": "Hemberg"
        },
        {
            "Zip": 9642,
            "Location": "Ebnat-Kappel"
        },
        {
            "Zip": 9643,
            "Location": "Krummenau"
        },
        {
            "Zip": 9650,
            "Location": "Nesslau"
        },
        {
            "Zip": 9651,
            "Location": "Ennetbühl"
        },
        {
            "Zip": 9652,
            "Location": "Neu St. Johann"
        },
        {
            "Zip": 9655,
            "Location": "Stein SG"
        },
        {
            "Zip": 9656,
            "Location": "Alt St. Johann"
        },
        {
            "Zip": 9657,
            "Location": "Unterwasser"
        },
        {
            "Zip": 9658,
            "Location": "Wildhaus"
        }
    ];

return zipLocation;
} 
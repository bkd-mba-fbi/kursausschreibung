//Script um die SocialMedia Icons zum Weiterempfehlen einzubinden
// thomas moser 20160810 
// URL /dam/assets/internet/scm.js

// popup script
function openWindowS(url) { window.open(url, "_blank", "height=600, width=600, menubar=no, titlebar=no, toolbar=no"); }

// prüfen der Sprache -------------------		
	var pageurl = window.location.href;
	var chkFR = pageurl.search("/fr/");		// wert -1 = nicht FR
	var chkEN = pageurl.search("/en/");		// wert -1 = nicht EN
	
	var urlForw = pageurl.replace("/", "%2f");
	urlForw = urlForw.replace(":", "%3a");
	urlForw = urlForw.replace("?", "%3F");
	urlForw = urlForw.replace("=", "%3D");
	// & anders umformen für eMail
	var urlMail = urlForw.replace("&", "%26amp;");
	urlForw = urlForw.replace("&", "%2526");
	
	
// werte setzen DE / FR 
	var langC =	" deu";
	var txt01 =	"Seite teilen";
	var txt02 =	"Seite auf Twitter teilen (weiterempfehlen)";
	var txt03 =	"Seite auf Facebook teilen (weiterempfehlen)";
	var txt04 =	"Empfehlung%3A%20Website%20Kanton%20Bern";
	var txt05 =	"Diese Seite wird dir empfohlen von ...";
	var txt06 =	"Seite per E-Mail teilen (weiterempfehlen)";

// sprachrelevante werte setzen	
	if (chkFR > 0) {
		//FR
		langC =	" fra";		
		txt01 =	"Partager";
		txt02 =	"Partager sur Twitter (recommander)";
		txt03 =	"Partager sur Facebook (recommander)";
		txt04 =	"Recommander%20le%20site%20du%20canton%20de%20Berne";
		txt05 =	"Page recommandée par ...";
		txt06 =	"Partager cette page par courriel (recommander)";
	} 
	if (chkEN > 0) {
		//EN
		langC =	" eng";
		txt01 =	"Share this page";
		txt02 =	"Share this page on Twitter (recommend)";
		txt03 =	"Share this page on Facebook (recommend)";
		txt04 =	"Recommendation%3A%20Website%20Canton%20of%20Bern";
		txt05 =	"This page is recommended to you by ...";
		txt06 =	"Share this page via e-mail (recommend)";
	} 

// html zusammensetzen - desktop 
var htmlOutput = "<p class='social"+ langC +"'><span class='text'>"+ txt01 +" </span>"
		htmlOutput = htmlOutput + "<a href='javascript:openWindowS(\"https://twitter.com/share?url="+ urlForw +"\")' title='"+ txt02 +"'><img src='KtBe/css/media/icon-twitter.png' /></a> ";
		htmlOutput = htmlOutput + "<a href='javascript:openWindowS(\"https://www.facebook.com/share.php?u="+ urlForw +"\")' title='"+ txt03 +"'><img src='KtBe/css/media/icon-facebook.png' /></a>";
		htmlOutput = htmlOutput + "<a href='mailto:?subject="+ txt04 +"&amp;body="+ urlMail +"%0A%0A"+ txt05 +"' title='"+ txt06 +"'><img src='KtBe/css/media/icon-mail.png' /></a>";
	htmlOutput = htmlOutput + "</p>";

// html zusammensetzen - mobile footer	
var mobileOutput = "<p id='footer-social' class='social"+ langC +"'><span class='text'>"+ txt01 +" </span>"
		mobileOutput = mobileOutput + "<a href='https://twitter.com/share?url="+ urlForw +"' title='"+ txt02 +"' target='_blank' style='background-image: url(\"KtBe/css/media/twitter_mobileIcon.png\")' class='footer-links socIcon'> </a>";
		mobileOutput = mobileOutput + "<a href='https://www.facebook.com/share.php?u="+ urlForw +"' target='_blank title='"+ txt03 +"' style='background-image: url(\"KtBe/css/media/facebook_mobileIcon.png\")' class='footer-links socIcon'> </a>";
		mobileOutput = mobileOutput + "<a href='mailto:?subject="+ txt04 +"&amp;body="+ urlMail +"%0A%0A"+ txt05 +"' title='"+ txt06 +" ' style='background-image: url(\"KtBe/css/media/mail_mobileIcon.png\")' class='footer-links socIcon'> </a>";
	mobileOutput = mobileOutput + "</p>"
	
// Script, welcher den Link im Head einsetzt für Jobs
$(document).ready(function() {
	$("#breadcrumb").after(htmlOutput);
	$("#footer-contact").after(mobileOutput);
	$("#footer").wrapInner("<div class='footer floatingComponent'></div>");
});
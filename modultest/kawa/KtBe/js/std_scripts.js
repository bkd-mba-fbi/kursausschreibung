function isEmpty(e){return null==e||"undefined"==e||""==e}function isNotEmpty(e){return!isEmpty(e)}function isNumber(e){return Number(e)==e}function isValidValue(e){return isNumber(e)&&e>=1&&""!=e}function isNotToBig(e){return e.length<5}function getCookie(e){var t,n,i,r=document.cookie.split(";")
for(t=0;t<r.length;t++)if(n=r[t].substr(0,r[t].indexOf("=")),i=r[t].substr(r[t].indexOf("=")+1),(n=n.replace(/^\s+|\s+$/g,""))==e)return unescape(i)}function addLoadEvent(e){var t=window.onload
"function"!=typeof window.onload?window.onload=e:window.onload=function(){t&&t(),e()}}function closeDetail(e){document.getElementById(e+"_Open").style.display="none",document.getElementById(e+"_Closed").style.display="block"}function openDetail(e){document.getElementById(e+"_Open").style.display="block",document.getElementById(e+"_Closed").style.display="none"}function removeDivWithoutLink(e){0==e.getElementsByTagName("a").length&&e.parentNode.removeChild(e)}var xmlhttp=null
function getXmlHttp(){if(xmlhttp)return xmlhttp
if(window.XMLHttpRequest)xmlhttp=new XMLHttpRequest
else if(window.ActiveXObject)try{xmlhttp=new ActiveXObject("Msxml2.XMLHTTP")}catch(e){try{xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}}return xmlhttp}function sendRequest(e,t,n){var i=getXmlHttp()
if(i)return i.readyState<4&&i.abort(),i.open("GET",e+"?sling:authRequestLogin=1",!1,t,n),i.send(""),403!=i.status}function loginuser(){var e=document.forms.login.contextPath.value,t=document.forms.login.usr.value,n=document.forms.login.pwd.value,i=document.forms.login.resource.value
if(!t)return!1
if(sendRequest(e,t,n)){var r=i
window.location.hash&&(r+=window.location.hash),document.location=r}else sendRequest(e,"__failed_login_user__","null")
return!1}function calculatePrice(e,t,n){var i=0
isNumber(e)&&(i=e)
var r=n*(i-t)
return r>0?r:0}function formatCurrency(e){var t="",n=e.toFixed(2),r=n.length,a=(r-3)%3
if(r-3<=3)return n
for(i=r-6;i>=a;i-=3)t=i==r-6?n.substring(i,n.length):n.substring(i,i+3)+"'"+t
return"'"==(t=n.substring(0,a)+"'"+t).substring(0,1)&&(t=t.substring(1,t.length)),t}function numberize(e){var t=(t=e+"").replace("'","")
return Number(t)}function getDateFromElement(e){var t=document.getElementById(e).value
if(""!=t){var n,i=t.split("."),r=i[2],a=i[1]-1,o=i[0]
return n=2==r.length?parseInt(r)+2e3:r,new Date(n,a,o)}return""}function dateIsBefore(e,t){return!(!isEmpty(e)&&NaN!=e)||(!(!isEmpty(t)&&NaN!=t)||e.getTime()<t.getTime())}function dateIsAfter(e,t){return!(!isEmpty(e)&&NaN!=e)||(!(!isEmpty(t)&&NaN!=t)||e.getTime()>t.getTime())}function dateIsNoLater(e,t){return!(!isEmpty(e)&&NaN!=e)||(!(!isEmpty(t)&&NaN!=t)||e.getTime()<=t.getTime())}$(document).ready(function(e){$('input[name^="anz"]').change(function(){$("#nextstep").attr("disabled","disabled")
var e=$(this).parent().next(),t=$(e).text()
$(e).text(""),$(e).html('<span class="loading">'+t+"</span>"),$("#totalSumHolder").attr("class","loading")
var n=numberize($("#cleanTotalPrice").val()),i=$(this).nextAll(),r=$(i).eq(0).val(),a=$(i).eq(1).val(),o=($(i).eq(2).val(),$(i).eq(3)),l=$(this).val()
isValidValue(l)&&($("p.invalidnumber").hide("fast"),$(this).removeClass("error")),isNotToBig(l)&&($("p.bignumber").hide("fast"),$(this).removeClass("error")),isValidValue(l)&&isNotToBig(l)||(isValidValue(l)||$("p.invalidnumber").show("fast"),isNotToBig(l)||$("p.bignumber").show("fast"),$(this).addClass("error"))
var u=calculatePrice($(o).val(),a,r),s=calculatePrice(l,a,r)
$(o).val(l),$(e).html(formatCurrency(s))
var c=n+s-u
$("#totalSumHolder").text(formatCurrency(c)),$("#totalSumHolder").removeAttr("class"),$("#cleanTotalPrice").val(formatCurrency(c)),$("#nextstep").removeAttr("disabled")}),$("form#warenkorbstep1").submit(function(){var e=!0
return $('input[name^="anz"]').each(function(){e=e&&isValidValue($(this).val())}),e})})

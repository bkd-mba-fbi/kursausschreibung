import settings from 'kursausschreibung/framework/settings';

/**
 * scroll to target after timeout
 * @param {string} elementId id of html element
 */
export function scrollToTimeout(elementId) {
    setTimeout(function(){
        scrollToTargetAdjusted(elementId);
      },500);
}

/**
 * set offset from settings.headerOffset to uk-sticky attribut
 * @param {string} elementId id of html element
 */
export function setOffsetStickyHeader(elementId) {
    document.getElementById(elementId).setAttribute('uk-sticky','offset: '+settings.headerOffset+'; bottom: #top');   
}

/**
 * scroll to position of a element consider settings.headerOffset
 * @param {string} elementId id of html element
 */
function scrollToTargetAdjusted(elementId){
    var element = document.getElementById(elementId);
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = window.scrollY + elementPosition - settings.headerOffset;
    window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
    });
}
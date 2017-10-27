//________________________________________________________
// -                                      PRIVATES METHODS

function _classReg (pClassName) {
  return new RegExp("(^|\\s+)" + pClassName + "(\\s+|$)");
};


export function addClass (pElement, pClassName) {
  if(pElement.classList)
    pElement.classList.add(pClassName);
  else
    pElement.className += (' ' + pClassName);
}

export function toogleClass(pElement, pClassName) {
  if(this._hasClass(pElement, pClassName))
    this.removeClass(pElement, pClassName);
  else
    this.addClass(pElement, pClassName);
}


export function removeClass(pElement, pClassName) {
  if (pElement.classList)
    pElement.classList.remove(pClassName);
  else
    pElement.className = pElement.className.replace(new RegExp('(^|\\b)' + pClassName.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}


export function hasClass(pElement, pClassName) {
  if (pElement.classList)
    return pElement.classList.contains( pClassName );
  else
    return new RegExp('(^| )' + pClassName + '( |$)', 'gi').test(pElement.className);
}


export function addClassToSVG(pElement, pClassName) {
  if (pElement.classList)
    pElement.classList.add(pClassName);
  else if(!this._hasClass( pElement, pClassName ))
    pElement.className.baseVal += (' ' + pClassName);
}


export function removeClassToSVG(pElement, pClassName) {
  if (pElement.classList)
    pElement.classList.remove(pClassName)
  else if(!this._hasClass( pElement, pClassName ))
    pElement.className.baseVal = pElement.className.baseVal.replace(new RegExp('(^|\\b)' + pClassName.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
}

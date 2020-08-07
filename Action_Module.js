window.$ = jQuery;
var tempGlobal;
let arrayIdValues = [];
let arrayElements = [];

//url: "http://servicedesk:8080/DynamicNotification.do?method=getDynamicNotificationCount",

const findElementbyValue = (value, arr) => {
    for (let i = 0; i < arr.length; i++) {
        if (parseInt(value) === parseInt(arr[i])) {
            return true
        }
    }
}

function addXMLRequestCallback(callback) {
    var oldSend, i;
    if (XMLHttpRequest.callbacks) {
        XMLHttpRequest.callbacks.push(callback);
    } else {


        XMLHttpRequest.callbacks = [callback];
        oldSend = XMLHttpRequest.prototype.send;

        XMLHttpRequest.prototype.send = function () {
            for (i = 0; i < XMLHttpRequest.callbacks.length; i++) {
                XMLHttpRequest.callbacks[i](this);
            }
            oldSend.apply(this, arguments);
        }
    }
}

addXMLRequestCallback(function () {
    //  sayHi()
});


let emptyDivs1 = $('.evenRow').filter(function () {
    return $.trim($(this).text()) === "" && $(this).children().length === 0;
});
let emptyDivs2 = $('.oddRow').filter(function () {
    return $.trim($(this).text()) === "" && $(this).children().length === 0;
});


for (let key in emptyDivs1.prevObject) {
    if (key === 'length') {
        break
    } else {
        (emptyDivs1.prevObject[key].outerHTML.match(/value=\"[0-9]+\"/gm)) ? arrayIdValues.push(emptyDivs1.prevObject[key]) : null
    }
}
for (let key in emptyDivs2.prevObject) {
    if (key === 'length') {
        break
    } else {
        (emptyDivs2.prevObject[key].outerHTML.match(/value=\"[0-9]+\"/gm)) ? arrayIdValues.push(emptyDivs2.prevObject[key]) : null
    }
}

//emptyDivs1.prevObject.filter((v, i, arr) => (i.outerHTML.match(/value=\"[0-9]+\"/gm) ? arrayIdValues.push(i) : null));
//emptyDivs2.prevObject.filter((v, i, arr) => (i.outerHTML.match(/value=\"[0-9]+\"/gm) ? arrayIdValues.push(i) : null));

arrayIdValues = arrayIdValues.map(v => v.firstElementChild.value).sort((a, b) => a.innerText < b.innerText);


for (let key in emptyDivs1.prevObject) {
    if (key === 'length') {
        break
    } else {
        findElementbyValue(emptyDivs1.prevObject[key].textContent, arrayIdValues) ? arrayElements.push(emptyDivs1.prevObject[key]) : null
    }
}
for (let key in emptyDivs2.prevObject) {
    if (key === 'length') {
        break
    } else {
        findElementbyValue(emptyDivs2.prevObject[key].textContent, arrayIdValues) ? arrayElements.push(emptyDivs2.prevObject[key]) : null
    }
}


//emptyDivs1.prevObject.filter((v, i) => findElementbyValue(i.textContent, arrayIdValues) ? arrayElements.push(i) : null)
//emptyDivs2.prevObject.filter((v, i) => findElementbyValue(i.textContent, arrayIdValues) ? arrayElements.push(i) : null)

arrayElements = arrayElements.sort((a, b) => a.innerText < b.innerText)

console.log(arrayIdValues)
console.log(arrayElements)

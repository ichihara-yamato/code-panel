//@ts-check

(function () {
    const vscode = acquireVsCodeApi();

    window.addEventListener('message', event => {
        const v = event.data.command;

        selectPanel(v);
        showPanel(v);
    });

    function init() {
        vscode.postMessage({type: 'showPanel'});
    }

    function selectPanel(v) {
        document.querySelectorAll('.changeCodePanel option').forEach(sel => {
            sel.removeAttribute("selected");
        });
        document.querySelector('.changeCodePanel').querySelector("option[value='" + v + "']").setAttribute("selected", "selected");
    }

    function showPanel(v) {
        document.querySelectorAll('.panel').forEach(function(div) {
            div.style.display = 'none';
        });
        if(v === 'js') document.querySelector('.panel-js').style.display = 'block';
        else if(v === 'php') document.querySelector('.panel-php').style.display = 'block';
        else if(v === 'py') document.querySelector('.panel-py').style.display = 'block';
    };

    var FunctionList = {
        // javascript
        'jsIF': function(){vscode.postMessage({type: 'jsIF'});},
        'jsSwitch': function(){vscode.postMessage({type: 'jsSwitch'});},
        'jsFor': function(){vscode.postMessage({type: 'jsFor'});},
        'jsWhile': function(){vscode.postMessage({type: 'jsWhile'});},
        'jsDoWhile': function(){vscode.postMessage({type: 'jsDoWhile'});},
        'jsFunction': function(){vscode.postMessage({type: 'jsFunction'});},
        'jsAsyncFunction': function(){vscode.postMessage({type: 'jsAsyncFunction'});},
        'jsClass': function(){vscode.postMessage({type: 'jsClass'});},
        'jsGet': function(){vscode.postMessage({type: 'jsGet'});},
        'jsPost': function(){vscode.postMessage({type: 'jsPost'});},
        'jsJson': function(){vscode.postMessage({type: 'jsJson'});},
        'jsTry': function(){vscode.postMessage({type: 'jsTry'});},
        'jsHello': function () { vscode.postMessage({ type: 'jsHello' });},
        
        // php
        'phpIF': function(){vscode.postMessage({type: 'phpIF'});},
        'phpSwitch': function(){vscode.postMessage({type: 'phpSwitch'});},
        'phpFor': function(){vscode.postMessage({type: 'phpFor'});},
        'phpWhile': function(){vscode.postMessage({type: 'phpWhile'});},
        'phpDoWhile': function(){vscode.postMessage({type: 'phpDoWhile'});},
        'phpFunction': function(){vscode.postMessage({type: 'phpFunction'});},
        'phpClass': function(){vscode.postMessage({type: 'phpClass'});},
        'phpGet': function(){vscode.postMessage({type: 'phpGet'});},
        'phpPost': function(){vscode.postMessage({type: 'phpPost'});},
        'phpJson': function(){vscode.postMessage({type: 'phpJson'});},
        'phpMail': function(){vscode.postMessage({type: 'phpMail'});},
        'phpTry': function(){vscode.postMessage({type: 'phpTry'});},
        'phpHello': function () { vscode.postMessage({ type: 'phpHello' }); },
        
        // python
        'pyIF': function(){vscode.postMessage({type: 'pyIF'});},
        'pyWith': function(){vscode.postMessage({type: 'pyWith'});},
        'pyDictionary': function(){vscode.postMessage({type: 'pyDictionary'});},
        'pyFor': function(){vscode.postMessage({type: 'pyFor'});},
        'pyWhile': function(){vscode.postMessage({type: 'pyWhile'});},
        'pyDef': function(){vscode.postMessage({type: 'pyDef'});},
        'pyClass': function(){vscode.postMessage({type: 'pyClass'});},
        'pyGet': function(){vscode.postMessage({type: 'pyGet'});},
        'pyPost': function(){vscode.postMessage({type: 'pyPost'});},
        'pyJson': function(){vscode.postMessage({type: 'pyJson'});},
        'pyTry': function(){vscode.postMessage({type: 'pyTry'});},
        'pyHello': function () { vscode.postMessage({ type: 'pyHello' });}
    };

    document.querySelector('.changeCodePanel').addEventListener('change', (event) => {
        showPanel(event.target.value);
        switch (event.target.value) {
            case 'js':
                break;
            case 'php':
                break;
            case 'py':
                break;
        }
    }, false);

    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
            if (typeof FunctionList[btn.dataset.act] === 'function') FunctionList[btn.dataset.act]();
        }, false);
    });

    init();
}());

/*!
 * @copyright Copyright (c) 2017 IcoMoon.io
 * @license   Licensed under MIT license
 *            See https://github.com/Keyamoon/svgxuse
 * @version   1.2.6
 */
/*jslint browser: true */
/*global XDomainRequest, MutationObserver, window */
(function () {
    "use strict";
    if (typeof window !== "undefined" && window.addEventListener) {
        var cache = Object.create(null); // holds xhr objects to prevent multiple requests
        var checkUseElems;
        var tid; // timeout id
        var debouncedCheck = function () {
            clearTimeout(tid);
            tid = setTimeout(checkUseElems, 100);
        };
        var unobserveChanges = function () {
            return;
        };
        var observeChanges = function () {
            var observer;
            window.addEventListener("resize", debouncedCheck, false);
            window.addEventListener("orientationchange", debouncedCheck, false);
            if (window.MutationObserver) {
                observer = new MutationObserver(debouncedCheck);
                observer.observe(document.documentElement, {
                    childList: true,
                    subtree: true,
                    attributes: true
                });
                unobserveChanges = function () {
                    try {
                        observer.disconnect();
                        window.removeEventListener("resize", debouncedCheck, false);
                        window.removeEventListener("orientationchange", debouncedCheck, false);
                    } catch (ignore) {}
                };
            } else {
                document.documentElement.addEventListener("DOMSubtreeModified", debouncedCheck, false);
                unobserveChanges = function () {
                    document.documentElement.removeEventListener("DOMSubtreeModified", debouncedCheck, false);
                    window.removeEventListener("resize", debouncedCheck, false);
                    window.removeEventListener("orientationchange", debouncedCheck, false);
                };
            }
        };
        var createRequest = function (url) {
            // In IE 9, cross origin requests can only be sent using XDomainRequest.
            // XDomainRequest would fail if CORS headers are not set.
            // Therefore, XDomainRequest should only be used with cross origin requests.
            function getOrigin(loc) {
                var a;
                if (loc.protocol !== undefined) {
                    a = loc;
                } else {
                    a = document.createElement("a");
                    a.href = loc;
                }
                return a.protocol.replace(/:/g, "") + a.host;
            }
            var Request;
            var origin;
            var origin2;
            if (window.XMLHttpRequest) {
                Request = new XMLHttpRequest();
                origin = getOrigin(location);
                origin2 = getOrigin(url);
                if (Request.withCredentials === undefined && origin2 !== "" && origin2 !== origin) {
                    Request = XDomainRequest || undefined;
                } else {
                    Request = XMLHttpRequest;
                }
            }
            return Request;
        };
        var xlinkNS = "http://www.w3.org/1999/xlink";
        checkUseElems = function () {
            var base;
            var bcr;
            var fallback = ""; // optional fallback URL in case no base path to SVG file was given and no symbol definition was found.
            var hash;
            var href;
            var i;
            var inProgressCount = 0;
            var isHidden;
            var Request;
            var url;
            var uses;
            var xhr;
            function observeIfDone() {
                // If done with making changes, start watching for chagnes in DOM again
                inProgressCount -= 1;
                if (inProgressCount === 0) { // if all xhrs were resolved
                    unobserveChanges(); // make sure to remove old handlers
                    observeChanges(); // watch for changes to DOM
                }
            }
            function attrUpdateFunc(spec) {
                return function () {
                    if (cache[spec.base] !== true) {
                        spec.useEl.setAttributeNS(xlinkNS, "xlink:href", "#" + spec.hash);
                        if (spec.useEl.hasAttribute("href")) {
                            spec.useEl.setAttribute("href", "#" + spec.hash);
                        }
                    }
                };
            }
            function onloadFunc(xhr) {
                return function () {
                    var body = document.body;
                    var x = document.createElement("x");
                    var svg;
                    xhr.onload = null;
                    x.innerHTML = xhr.responseText;
                    svg = x.getElementsByTagName("svg")[0];
                    if (svg) {
                        svg.setAttribute("aria-hidden", "true");
                        svg.style.position = "absolute";
                        svg.style.width = 0;
                        svg.style.height = 0;
                        svg.style.overflow = "hidden";
                        body.insertBefore(svg, body.firstChild);
                    }
                    observeIfDone();
                };
            }
            function onErrorTimeout(xhr) {
                return function () {
                    xhr.onerror = null;
                    xhr.ontimeout = null;
                    observeIfDone();
                };
            }
            unobserveChanges(); // stop watching for changes to DOM
            // find all use elements
            uses = document.getElementsByTagName("use");
            for (i = 0; i < uses.length; i += 1) {
                try {
                    bcr = uses[i].getBoundingClientRect();
                } catch (ignore) {
                    // failed to get bounding rectangle of the use element
                    bcr = false;
                }
                href = uses[i].getAttribute("href")
                        || uses[i].getAttributeNS(xlinkNS, "href")
                        || uses[i].getAttribute("xlink:href");
                if (href && href.split) {
                    url = href.split("#");
                } else {
                    url = ["", ""];
                }
                base = url[0];
                hash = url[1];
                isHidden = bcr && bcr.left === 0 && bcr.right === 0 && bcr.top === 0 && bcr.bottom === 0;
                if (bcr && bcr.width === 0 && bcr.height === 0 && !isHidden) {
                    // the use element is empty
                    // if there is a reference to an external SVG, try to fetch it
                    // use the optional fallback URL if there is no reference to an external SVG
                    if (fallback && !base.length && hash && !document.getElementById(hash)) {
                        base = fallback;
                    }
                    if (uses[i].hasAttribute("href")) {
                        uses[i].setAttributeNS(xlinkNS, "xlink:href", href);
                    }
                    if (base.length) {
                        // schedule updating xlink:href
                        xhr = cache[base];
                        if (xhr !== true) {
                            // true signifies that prepending the SVG was not required
                            setTimeout(attrUpdateFunc({
                                useEl: uses[i],
                                base: base,
                                hash: hash
                            }), 0);
                        }
                        if (xhr === undefined) {
                            Request = createRequest(base);
                            if (Request !== undefined) {
                                xhr = new Request();
                                cache[base] = xhr;
                                xhr.onload = onloadFunc(xhr);
                                xhr.onerror = onErrorTimeout(xhr);
                                xhr.ontimeout = onErrorTimeout(xhr);
                                xhr.open("GET", base);
                                xhr.send();
                                inProgressCount += 1;
                            }
                        }
                    }
                } else {
                    if (!isHidden) {
                        if (cache[base] === undefined) {
                            // remember this URL if the use element was not empty and no request was sent
                            cache[base] = true;
                        } else if (cache[base].onload) {
                            // if it turns out that prepending the SVG is not necessary,
                            // abort the in-progress xhr.
                            cache[base].abort();
                            delete cache[base].onload;
                            cache[base] = true;
                        }
                    } else if (base.length && cache[base]) {
                        setTimeout(attrUpdateFunc({
                            useEl: uses[i],
                            base: base,
                            hash: hash
                        }), 0);
                    }
                }
            }
            uses = "";
            inProgressCount += 1;
            observeIfDone();
        };
        var winLoad;
        winLoad = function () {
            window.removeEventListener("load", winLoad, false); // to prevent memory leaks
            tid = setTimeout(checkUseElems, 0);
        };
        if (document.readyState !== "complete") {
            // The load event fires when all resources have finished loading, which allows detecting whether SVG use elements are empty.
            window.addEventListener("load", winLoad, false);
        } else {
            // No need to add a listener if the document is already loaded, initialize immediately.
            winLoad();
        }
    }
}());

// unminified backup of javascript code that lives in qrforth.html

wa64 = "AGFzbQEAAAABFgVgAAF/YAAAYAF/AX9gAX8AYAJ/fwADCAcAAQACAwQBBQMBABEGGQN/AUGAgMAAC38AQYP6wQALfwBBkPrBAAsHSwgGbWVtb3J5AgAFZmxhZ3MAAAV6ZmxhZwABA3RvcAACBXN0YWNrAAMFZm9ydGgABQpfX2RhdGFfZW5kAwELX19oZWFwX2Jhc2UDAgrACQcLAEEALQCC+sGAAAsNAEEAQQA6AIL6wYAACwsAQQAvAYD6wYAACyYAAkAgAEG/PksNACAAQQJ0QYCAwIAAaigCAA8LIAAQhICAgAAACwkAEIaAgIAAAAvMCAEBf0EAQQA6AIL6wYAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIABBv+DNA0oNAAJAIABBX2oOIAkCAgICAgICAgIEAgIMAgICAgICAgICAgICAgICAgIIAAsgAEG94ABGDQYgAEH5yq0DRw0BQQBBEDoAgvrBgAAPCwJAIABB89K1qwZKDQAgAEHA4M0DRg0JIABB8N7JowZHDQFBAC8BgPrBgAAiAA0FQQBBAjoAgvrBgAAPCyAAQfTStasGRg0JIABB5NyF8wZGDQMgAEHo5tWDB0YNAQtBAEEgOgCC+sGAAA8LAkBBAC8BgPrBgAAiAEGgH0kNAEEAQQE6AIL6wYAADwtBACAAQQFqOwGA+sGAACAAQQJ0QYCAwIAAaiABNgIADwtBAC8BgPrBgAAiAEECSQ0IIABBf2ohASAAQcE+Tw0JIABBfmoiAkHAPk8NCkEAIABBf2o7AYD6wYAAIAJBAnRBgIDAgABqIgAgACgCACABQQJ0QYCAwIAAaigCAGo2AgAPC0EALwGA+sGAACIAQQJJDQogAEF/aiEBIABBwT5PDQsgAEF+aiICQcA+Tw0MQQAgAEF/ajsBgPrBgAAgAkECdEGAgMCAAGoiACAAKAIAIAFBAnRBgIDAgABqKAIAcUF/czYCAA8LQQAgAEF/ajsBgPrBgAAPC0EALwGA+sGAAEF/aiIAQcA+Tw0LIABBAnRBgIDAgABqIgBBAEF/IAAoAgAbNgIADwtBAC8BgPrBgABBf2oiAEG/PksNCyAAQQJ0QYCAwIAAaiIBKAIAIgBBwD5PDQwgASAAQQJ0QYCAwIAAaigCADYCAA8LQQAvAYD6wYAAIgBBAkkNDEEAIABBf2oiATsBgPrBgAAgAUH//wNxIQEgAEHBPk8NDSABQX9qIgJBwD5PDQ4CQCABQQJ0QYCAwIAAaigCACIBQcA+Tw0AQQAgAEF+ajsBgPrBgAAgAUECdEGAgMCAAGogAkECdEGAgMCAAGooAgA2AgAPCyABEISAgIAAAAsCQEEALwGA+sGAACIAQaAfSQ0AQQBBAToAgvrBgAAPC0EAIABBAWo7AYD6wYAAIABBAnRBgIDAgABqIABBf2o2AgAPCwJAQQAvAYD6wYAAIgANAEEAQQY6AIL6wYAADwtBACAAQX9qOwGA+sGAAEEAQQQ6AIL6wYAADwsCQEEALwGA+sGAACIADQBBAEEKOgCC+sGAAA8LQQAgAEF/ajsBgPrBgABBAEEIOgCC+sGAAA8LQQBBAjoAgvrBgAAPCyABEISAgIAAAAsgAhCEgICAAAALQQBBAjoAgvrBgAAPCyABEISAgIAAAAsgAhCEgICAAAALIAAQhICAgAAACyAAEISAgIAAAAsgABCEgICAAAALQQBBAjoAgvrBgAAPCyABEISAgIAAAAtBfxCEgICAAAALGQBBAEEALQCC+sGAAEEgcjoAgvrBgAAAAAs=";
wabuf = Uint8Array.from(atob(wa64), c => c.charCodeAt(0)).buffer;
WebAssembly.compile(wabuf).then(x => {
    wasm = x;
    ins = new WebAssembly.Instance(wasm);
});
const term = document.getElementById('term');
const out = document.getElementById('out');
const input = document.getElementById('in');
const stack = document.getElementById('stack');
const dict = {};
let com = '';
input.addEventListener('keydown', function(e) {
    if ("Return"===e.key||"Enter"===e.code&&!e.shiftKey) {
        e.preventDefault();
        const txt = input.value;
        input.value = '';
        com = txt.replace(/\n/g, ' ');
        executeCommand(com.replace(/\([^)]*\)/g, ''));
        window.scrollTo(0,document.body.scrollHeight);
    }
});

function output(text) {
    out.innerHTML += text;
    term.scrollTop = term.scrollHeight;
}

function redrawStack() {
    const out = [];
    for (let i = 0; i < ins.exports.top(); i++) {
        out.push(ins.exports.stack(i));
    }
    stack.innerHTML = 'Stack: [' + `${out}` + '] <- Top';
}

function defineWord(tokens, mark) {
    // take tokens up to first ';'
    let word = [];
    for (let i = mark; i < tokens.length; i++) {
        if (tokens[i] === ';') {
            word = tokens.slice(mark, i + 1);
            break;
        }
    }
    let wordlen = word.length + mark;

    word.shift();
    word.pop();
    const name = word.shift();
    const definition = word.join(' ');
    dict[name] = definition;
    return wordlen
}

function executeCommand(command) {
    const tokens = command.split(/\s+/);
    let display = true;
    let msg = '';
    let status = '';
    let i = 0
    let wordlen = 0
    for (i; i < tokens.length; i++) {
        
        const token = tokens[i];

        if (token === '') {
            continue;
        } else if (token === 'cr') {
            output('\n');
        } else if (token in dict) {
            executeCommand(dict[token]);
            display = false;
        } else if (!isNaN(token)) {
            ins.exports.forth( 1886745448, parseInt(token) );
        } else if (token === ':') {
            wordlen = defineWord(tokens, wordlen);
            i = wordlen - 1;
        } else {
            let num = 0;
            for (let i = 0; i < token.length; i++) {
                const charCode = token.charCodeAt(i);
                num = (num << 8) | charCode;
            }
            ins.exports.forth( num );
        }
        let flags = ins.exports.flags();
        if (flags & 1) {msg += 'Overflow';}
        else if (flags & 2) {msg += 'Underflow';}
        else if (flags & 4) {msg += String.fromCharCode(ins.exports.stack(ins.exports.top()));}
        else if (flags & 8) {msg += ins.exports.stack(ins.exports.top());}
        else if (flags & 16) {
            // read input and push to stack
            const input = prompt('Enter input');
            if (isNaN(input)) {
                ins.exports.forth( 1886745448, input.charCodeAt(0) );
            } else {
                ins.exports.forth( 1886745448, parseInt(input) );
            }
        }
        if (flags & 32) {status = `${token}` + ' ?';}
        ins.exports.zflag();
    }
    if (status === '') {status = 'ok';}
    if (display) {output(`${com}` + ' ' + `${msg}` + ' ' + `${status}` + '\n');}
    redrawStack();
}
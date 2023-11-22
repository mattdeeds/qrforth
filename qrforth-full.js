wa64 = "AGFzbQEAAAABFgVgAAF/YAF/AX9gAX8AYAJ/fwBgAAADBwYAAAECAwQFAwEAEQYZA38BQYCAwAALfwBBg/rBAAt/AEGQ+sEACwdDBwZtZW1vcnkCAAVmbGFncwAAA3RvcAABBXN0YWNrAAIFZm9ydGgABApfX2RhdGFfZW5kAwELX19oZWFwX2Jhc2UDAgq2CQYLAEEALQCC+sGAAAsLAEEALwGA+sGAAAsmAAJAIABBvz5LDQAgAEECdEGAgMCAAGooAgAPCyAAEIOAgIAAAAsJABCFgICAAAAL5QgBAn9BAEEAOgCC+sGAAAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAAQb/gzQNKDQACQCAAQV9qDiAJAgICAgICAgICBAICDAICAgICAgICAgICAgICAgICCAALIABBveAARg0GIABB+cqtA0cNAUEAQRA6AIL6wYAADwsCQCAAQfPStasGSg0AIABBwODNA0YNCSAAQfDeyaMGRw0BQQAvAYD6wYAAIgANBUEAQQI6AIL6wYAADwsgAEH00rWrBkYNCSAAQeTchfMGRg0DIABB6ObVgwdGDQELQQBBIDoAgvrBgAAPCwJAQQAvAYD6wYAAIgBBoR9JDQBBAEEBOgCC+sGAAA8LQQAgAEEBajsBgPrBgAAgAEECdEGAgMCAAGogATYCAA8LAkBBAC8BgPrBgAAiAA0AQQBBAjoAgvrBgAAMEQtBACAAQX9qIgE7AYD6wYAAIAFB//8DcSEBIABBwD5LDQggAUF/aiIAQcA+Tw0QIABBAnRBgIDAgABqIgAgACgCACABQQJ0QYCAwIAAaigCAGo2AgAPCwJAQQAvAYD6wYAAIgANAEEAQQI6AIL6wYAAQX8hAQwPC0EAIABBf2oiATsBgPrBgAAgAUH//wNxIgJBf2oiAUG/PksNDiAAQcE+Tw0IIAFBAnRBgIDAgABqIgAgAkECdEGAgMCAAGooAgAgACgCAHFBf3M2AgAPC0EAIABBf2o7AYD6wYAADwtBAC8BgPrBgABBf2oiAEHAPk8NByAAQQJ0QYCAwIAAaiIAQQBBfyAAKAIAGzYCAA8LQQAvAYD6wYAAQX9qIgBBvz5LDQcgAEECdEGAgMCAAGoiASgCACIAQcA+Tw0IIAEgAEECdEGAgMCAAGooAgA2AgAPCwJAQQAvAYD6wYAAIgANAEEAQQI6AIL6wYAADAoLQQAgAEF/aiICOwGA+sGAACACQf//A3EhASAAQcA+Sw0IIAFBf2oiA0HAPk8NCQJAIAFBAnRBgIDAgABqKAIAIgFBwD5PDQAgAUECdEGAgMCAAGogA0ECdEGAgMCAAGooAgA2AgACQCACQf//A3ENAEEAQQI6AIL6wYAADwtBACAAQX5qOwGA+sGAAA8LIAEQg4CAgAAACwJAQQAvAYD6wYAAIgBBoR9JDQBBAEEBOgCC+sGAAA8LQQAgAEEBajsBgPrBgAAgAEECdEGAgMCAAGogADYCAA8LAkBBAC8BgPrBgAAiAA0AQQBBBjoAgvrBgAAPC0EAIABBf2o7AYD6wYAAQQBBBDoAgvrBgAAPCwJAQQAvAYD6wYAAIgANAEEAQQo6AIL6wYAADwtBACAAQX9qOwGA+sGAAEEAQQg6AIL6wYAADwsgARCDgICAAAALIAIQg4CAgAAACyAAEIOAgIAAAAsgABCDgICAAAALIAAQg4CAgAAACyABEIOAgIAAAAtBfxCDgICAAAALIAEQg4CAgAAAC0F/EIOAgIAAAAsEAAAACwClAQRuYW1lAYkBBgAFZmxhZ3MBA3RvcAIFc3RhY2sDOl9aTjRjb3JlOXBhbmlja2luZzE4cGFuaWNfYm91bmRzX2NoZWNrMTdoNDVjMjA0ZDEzZjQwMzgwY0UEBWZvcnRoBTBfWk40Y29yZTlwYW5pY2tpbmc5cGFuaWNfZm10MTdoNzg1OWRkZmE0OTdjMGU2MUUHEgEAD19fc3RhY2tfcG9pbnRlcgBNCXByb2R1Y2VycwIIbGFuZ3VhZ2UBBFJ1c3QADHByb2Nlc3NlZC1ieQEFcnVzdGMdMS43Mi4xIChkNWMyZTljMzQgMjAyMy0wOS0xMykALA90YXJnZXRfZmVhdHVyZXMCKw9tdXRhYmxlLWdsb2JhbHMrCHNpZ24tZXh0";
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
const dis = true;
input.addEventListener('keyup', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const txt = input.value;
        input.value = '';
        com = txt.replace(/\n/g, ' ');
        executeCommand(com.replace(/\([^)]*\)/g, ''));
        document.getElementById( 'stack' ).scrollIntoView();
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
    stack.innerHTML = '[' + `${out}` + ']';
}

function defineWord(tokens) {
    tokens.shift();
    tokens.pop();
    tokens.pop();
    const name = tokens.shift();
    const definition = tokens.join(' ');
    dict[name] = definition;
}

function executeCommand(command) {
    const tokens = command.split(/\s+/);
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (token === '') {
            continue;
        } else if (token === 'cr') {
            output('\n');
        } else if (!isNaN(token)) {
            ins.exports.forth( 1886745448, parseInt(token) );
        } else if (token === ':') {
            defineWord(tokens);
            break;
        } else if (token in dict) {
            executeCommand(dict[token]);
            dis = false;
        } else {
            let num = 0;
            for (let i = 0; i < token.length; i++) {
                const charCode = token.charCodeAt(i);
                num = (num << 8) | charCode;
            }
            ins.exports.forth( num );
        }
    }
    let msg = 'ok';
    let flags = ins.exports.flags();
    if (flags & 1) {msg = 'Stack overflow';}
    if (flags & 2) {msg = 'Stack underflow';}
    if (flags & 4) {msg = String.fromCharCode(ins.exports.stack(ins.exports.top()));}
    if (flags & 8) {msg = ins.exports.stack(ins.exports.top());}
    if (flags & 16) {
        // read input and push to stack
        const input = prompt('Enter input');
        if (isNaN(input)) {
            ins.exports.forth( 1886745448, input.charCodeAt(0) );
        } else {
            ins.exports.forth( 1886745448, parseInt(input) );
        }
    }
    if (flags & 32) {msg = '?';}
    if (dis) {output(`${com}` + ' ' + `${msg}` + '\n');}
    redrawStack();
}
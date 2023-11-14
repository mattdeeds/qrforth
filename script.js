let brotli = await import("https://unpkg.com/brotli-wasm@1.3.1/index.web.js?module").then(m => m.default);

// Get the URL fragment
var urlFragment = window.location.hash;
// Print the URL fragment to the console
console.log("URL Fragment:", urlFragment);
// Remove the leading '#'
var command = urlFragment.substring(1);
// decode the base64 string
var decoded = atob(command);
// Print the decoded string to the console
console.log("Decoded:", decoded);


// let decompressed = brotli.decompress(Uint8Array.from(atob(command), c => c.charCodeAt(0)));
// let decoded = new TextDecoder().decode(decompressed);
// console.log(decoded);
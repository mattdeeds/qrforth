# qrforth

wasm-pack build --target web
python -m http.server
python NoCacheHTTPServer.py
twiggy top pkg/qrforth_bg.wasm
twiggy top target/wasm32-unknown-unknown/release/qrforth.wasm
./wasm2wat target/wasm32-unknown-unknown/release/qrforth.wasm
python comp.py qrforth.html
python qr.py "url"
base64 -i target/wasm32-unknown-unknown/release/qrforth.wasm -o 64

cargo bloat
cargo build --target=wasm32-unknown-unknown --release
twiggy top target/wasm32-unknown-unknown/release/qrforth.wasm

## Primitives

- Fetch = @
- Store = !
- Flag = flag
- Add = +
- Nand = nand
- Drop = drop
- Key = key
- Stack pointer = sp@
- Emit = emit


<!-- todo -->
<!-- shrink wasm file -->
<!-- shrink qrforth.html -->
<!-- one command to compile, convert to base64, put in html, run comp.py, run qr.py -->
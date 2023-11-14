# qrforth

wasm-pack build --target web
python -m http.server
python NoCacheHTTPServer.py
twiggy top pkg/qrforth_bg.wasm
twiggy top target/wasm32-unknown-unknown/release/qrforth.wasm
./wasm2wat target/wasm32-unknown-unknown/release/qrforth.wasm
python comp.py qrforth.html
python qr.py "url"

cargo bloat
cargo build --target=wasm32-unknown-unknown --release

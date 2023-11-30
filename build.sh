#!/bin/sh

var=$1
echo "Building qrforth..."
cargo build --target=wasm32-unknown-unknown --release
echo "Converting to base64..."
base64 -i target/wasm32-unknown-unknown/release/qrforth.wasm -o base64.txt
echo "Adding WASM to HTML..."
/usr/local/bin/python3.11 pack.py
echo "Compressing everything..."
/usr/local/bin/python3.11 comp.py qrforth.html $var
echo "Creating QR code..."
/usr/local/bin/python3.11 qr.py url.txt

echo "Done."
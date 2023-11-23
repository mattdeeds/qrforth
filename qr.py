import sys
import qrcode

qr = qrcode.QRCode(
    version=40,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
)

# read url from file url.txt
if sys.argv[1] == "url.txt":
    with open('url.txt', 'r') as f:
        url = f.read()
else:
    url = sys.argv[1]

qr.add_data(url)
try:
    qr.make(fit=True)
except:
    print("Error: URL too long")
    exit(1)

img = qr.make_image(fill_color="black", back_color="white")

img.save("qr.png" )
import sys
import qrcode
# from qrcode.image.pure import PyPNGImage

qr = qrcode.QRCode(
    version=40,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
)

url = sys.argv[1]

qr.add_data(url)
try:
    qr.make(fit=True)
except:
    print("Error: URL too long")
    exit(1)

img = qr.make_image(fill_color="black", back_color="white")

img.save("qr.png" )

# save image to file with time stamp
# import time
# timestr = time.strftime("%Y%m%d-%H%M%S")
# img.save("qr-" + timestr + ".png")
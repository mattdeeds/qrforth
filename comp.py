import base64
import sys
import brotli

def compress(data):
    return brotli.compress(data, quality=0, mode=brotli.MODE_TEXT)

# get data from arg
file = sys.argv[1]

if len(sys.argv) > 2:
    url = "http://[::]:8000/#"
else:
    url = "https://qrforth.com/#"
    
# load data from file
with open(file, "r") as f:
    html = f.read()

# convert to bytes
data = html.encode('utf-8')
# print 
# print("UTF-8 Encoded => ")
# print(data)
# compress
data = compress(data)
# print
# print("Compressed => ")
# print(data)
# encode to base64
data = base64.b64encode(data)
# print 
# print("Base64 Encoded => ")
# print(data)
# convert to string
data = data.decode('utf-8')
# print
# print("String => ")
# print(data)

# count number of bytes in string
# print("Number of bytes in Input: " + str(len(html)))
print("Output bytes: " + str(len(data)))
# print("URL => " + "http://[::]:8000/#" + data)

# save final url to file
with open("url.txt", "w") as f:
    f.write(url + data)
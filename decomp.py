import base64
import sys
import brotli

def decompress(data):
    return brotli.decompress(data)

# decode from base64
data = sys.argv[1]
data = base64.b64decode(data)
# print
print("Base64 Decoded => ")
print(data)
# decompress
data = decompress(data)
# print
print("Decompressed => ")
print(data)
# convert to string
data = data.decode('utf-8')
# print
print("String => ")
print(data)
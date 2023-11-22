# load data from file as bytes
with open("target/wasm32-unknown-unknown/release/qrforth.wasm", "rb") as f:
    data = f.read()
    
    
# encode data from file into utf-8 string


   
# print(data)
# print(list(data))
# a = list(data)
# # covert a to string
# a = str(a)
# # print
# print("String => ")
# print(a)
# # print string length
# print("String length => " + str(len(a)))
# # remove whitespace from string
# a = a.replace(" ", "")
# # print
# print("String => ")
# print(a)

    

print("Number of bytes in raw wasm binary: " + str(len(data)))

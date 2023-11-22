import sys
    
word = sys.argv[1]

if sys.argv[1] == "-b":
    # convert single integer to array of ascii codes
    code = int(sys.argv[2])
    codes = []
    if code < 256:
        codes.append(code)
    elif code < 65536:
        codes.append(code >> 8)
        codes.append(code & 0xFF)
    elif code < 16777216:
        codes.append(code >> 16)
        codes.append((code >> 8) & 0xFF)
        codes.append(code & 0xFF)
    elif code < 4294967296:
        codes.append(code >> 24)
        codes.append((code >> 16) & 0xFF)
        codes.append((code >> 8) & 0xFF)
        codes.append(code & 0xFF)
    else:
        print("Error: code is too large")
        exit(1)
    print("Input =>",codes)

else:
    # convert word to ascii codes, add to array, and print
    codes = []
    for char in word:
        codes.append(ord(char))
        print(char + " =",ord(char))
        
    # convert array of ascii codes to a single integer
    if len(codes) == 1:
        code = codes[0]
    elif len(codes) == 2:
        code = (codes[0] << 8) | codes[1]
    elif len(codes) == 3:
        code = (codes[0] << 16) | (codes[1] << 8) | codes[2]
    elif len(codes) == 4:
        code = (codes[0] << 24) | (codes[1] << 16) | (codes[2] << 8) | codes[3]
    else:
        print("Error: word is too long")
        exit(1)
        
    print("Output =>",code)

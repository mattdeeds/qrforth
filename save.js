console.log("tokenPointer: " + tokenPointer);
      console.log("tokenLength: " + tokenLength);
      for (let i = 0; i < tokenLength; i++) {
        console.log("token: " + String.fromCharCode(wasmMemory[tokenPointer + i]));
      }

      console.log("--------------------");

      wasmMemory[tokenPointer] = 50;
      wasmMemory[tokenPointer + 4 ] = 50;
      //wasmMemory[tokenPointer + 5 ] = 50;
      for (let i = 0; i < tokenLength; i++) {
        console.log("token: " + String.fromCharCode(wasmMemory[tokenPointer + i]));
      }

      console.log("--------------------");


      console.log("tokenPointer: " + tokenPointer);
      console.log("tokenLength: " + tokenLength);
      for (let i = 0; i < tokenLength; i++) {
        console.log("token: " + String.fromCharCode(wasmMemory[tokenPointer + i]));
      }

      console.log("--------------------");

      wasmMemory[tokenPointer] = 77;
      wasmMemory[tokenPointer + 4 ] = 50;
      //wasmMemory[tokenPointer + 5 ] = 50;
      for (let i = 0; i < tokenLength; i++) {
        console.log("token: " + String.fromCharCode(wasmMemory[tokenPointer + i]));
      }

      console.log("--------------------");

      const splitArray = splitStringByWhitespace(command);
      console.log("input: " + splitArray);
      for (let i = 0; i < splitArray.length; i++) {
        //wasmMemory[tokenPointer] = splitArray[i];
        //console.log(splitArray[i]);
        //let asciiArray = stringToAsciiArray(splitArray[i]);
        //console.log(asciiArray);
        //for (let j = 0; j < splitArray.length; j++) {
        //  wasmMemory[tokenPointer + j] = splitArray[i];
        //}
        //store_value_in_input(splitArray[i], i);
        forth();
      }
      //set_input_len(asciiArray.length - 1);
      //console.log(asciiArray);
      //store_value_in_input(50, 0);
      //store_value_in_input(32, 1);
      //store_value_in_input(50, 2);
      //store_value_in_input(32, 3);
      //store_value_in_input(43, 4);
      //forth();

      <script type="module">

    import init, { forth, get_stack_pointer, get_stack_top, get_stack_at_location, get_st_pointer, get_st_len, set_token_len, set_token_at_index } from "./pkg/qrforth.js";
    const rustWasm = await init("./pkg/qrforth_bg.wasm");
    init().then(() => {
      //forth();
    });

    const terminal = document.getElementById('terminal');
    const output = document.getElementById('output');
    const input = document.getElementById('input');


    // Next, let's create a Uint8Array of our wasm memory
    const wasmMemory = new Uint8Array(rustWasm.memory.buffer);

    let tokenPointer = get_st_pointer();
    let tokenLength = get_st_len();

    input.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const command = input.value;
            input.value = '';
            appendOutput(`${command}`);
            executeCommand(command);
        }
    });

    function appendOutput(text) {
        output.innerHTML += text + '\n';
        terminal.scrollTop = terminal.scrollHeight; // Auto-scroll to the bottom
    }

    //function to split string by whitespace
    function splitStringByWhitespace(string) {
      return string.split(/\s+/);
    }

    function stringToAsciiArray(str) {
      let asciiArray = [];
    
      for (let i = 0; i < str.length; i++) {
        asciiArray.push(str.charCodeAt(i));
      }
    
      return asciiArray;
    }

    function executeCommand(command) {
      //wasmMemory[tokenPointer + 1] = 55;
      set_token_at_index(0, 49);
      set_token_at_index(1, 48);
      set_token_at_index(2, 48);
      //set_token_len(3);
      forth();
      
      let top = get_stack_top();
      const out = [];
      for (let i = 0; i < top; i++) {
        //out.push(wasmMemory[stackPointer + i]);
        out.push(get_stack_at_location(i));
      }
      appendOutput('top = ' + `${top}`+ " | " + '[' + `${out}` + ']');
    }
    
  </script>

https://itty.bitty.site/#/?eJyzKbAzNLLRL7ADAAwSAmc=

qrforth website has qr code reader that reads the qrforth qrcode and loads the html code in an iframe on the page

https://itty.bitty.site/#index.html/data:text/html;format=gz;base64,eJyFVuFO40gM/s9TeKOTElSaFNBKJ7VB2ttFWiRYVoLT6cQimCZuM0cyk8s4QMX23c+TSdqE5WglmIn9+bM9tieZffhy+fn67++nkFGRn+zN7AK5UMvYQzX+88qzMhTpyR7AjCTlePJvtdAVZbPIPVpFgSQgyURlkGKvpsX4dw8iNo2c7Wyu01WDTOWjXXmXHW6ZeO+ErAaZxh5hVUglcs/JG11ZYaPTNZU1eSeziCU9vVQsbhDNzgNalWipnnkvatILndSmdRS1gWw386pZFlqz8y40eJyEh+HkAI4mR8dQpIipOYCLs2s4lwkqg7OoNbC2JqlkSa3fQqd1jpxA4zDRynBwRcmsl/N/IIaX9bSnqdCUvEFWiCchCRZISRZ4JKolUvQkTHF8NK7Vg9JPqlujCnMUBqM22tDCvP0+74vk/0IluGbm9qycg79w/skYLOb5KnQgkoLwiioUfPbLoAvpYBs2UzccUZQj56lLJu0chPhsUSZUlN2VlSwwON7vJ9/VlG1SrkSBikLO7TRHu/1jdZYGfofxB0m4ir9n5xBDK9cP7xg1AL/LqXkKRZqePjLiXBpChVXgP+CqLv0DWNQqIakVBLgPL5u2kwsWhAyCOI7BP1Wcgt8H2B+G3KqW9gsuRJ1T0Aba/VzAiS4KodLmTG0sjyKvcQjsKRjm+0OtKEtU6WVzFsH9by8t4fr+lTt8xqQm/OzUQQvrgdbNbt0dzSb1gQM7WP1EXQ24l/jYvl5fnMMoBouBEfg/VC/Ursghz4vO8+umjV4Jv6JcZjTlToNPPLpjJ+WWA8oQ5ppIFy7IVyH+T26bOKNmli6w0NXqhvQDqu9a2qJxmIe3HMjHj9MNFK7KnEfFuuyKw1iOwdoZmK/gKZPEcyIS3OuXsgXEnVloLFEQ/TCjaHPOtnUcMMxRLfm2sS006Z9phVRXqjNYtysPOwR2AiV7mEx5mcGAiEWjUZ+nF5U96wZ7I2+ngzZu1baNX3Uwm5NU/WZcA+Z8W1mzD9J8E9+c9f7Q7pe7oaxNFpT2PXGmqDN5k7UXzMjfwcpDG+xkGe9iMfV8N0ta6XIXkcW8wdS3GdZ1W9m2mwHeuV/5GrtjUfJwR30/m6uSbW42lX27VcpfGiSK2NKVpzcfjZvtfMjbXlYb/DsBCrrLdSLsYAZyW+gu28F14rt0ffbDVxc/rO9H4MFP/uML5KaVs9f1vRXcdpe9I2vf6u4NbD883BcHf1rY75r/AGLzpno=


//const importObj = {};
    //const response = await fetch("target/wasm32-unknown-unknown/release/qrforth.wasm");
    //const {ins} = 
    //  await WebAssembly.instantiateStreaming(response, importObj);

            //out.push(wasmMemory[stackPointer + i]);

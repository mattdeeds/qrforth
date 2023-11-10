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
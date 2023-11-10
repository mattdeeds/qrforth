#![no_std]

use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

pub const STACK_SIZE: usize = 256;

pub static mut STACK: [i32; STACK_SIZE] = [0; STACK_SIZE];
pub static mut TOP: u8 = 0;

pub static mut DICT: [&'static str; STACK_SIZE] = [""; STACK_SIZE];
pub static mut DNAME: [&'static str; STACK_SIZE] = [""; STACK_SIZE];
pub static mut DLOC: [u8; STACK_SIZE] = [0; STACK_SIZE];
pub static mut DTOP: u8 = 0;

pub static mut INPUT: [u8; STACK_SIZE] = [0; STACK_SIZE];
pub static mut ITOP: u8 = 0;

pub static mut S: u8 = 0;

// #[wasm_bindgen]
// pub extern "C" fn stack() {
//     unsafe {
//         while S < TOP {
//             log(STACK[S]);
//             S += 1;
//         }
//         S = 0;
//     }
// }

// fn push(n: i32) {
//     unsafe {
//         STACK[TOP as usize] = n;
//         TOP += 1;
//     }
// }

// Function to return a pointer to our buffer
// in wasm memory
// JS reads from this buffer to display the stack
#[wasm_bindgen]
pub fn get_stack_pointer() -> *const i32 {
  let pointer: *const i32;
  unsafe {
    pointer = STACK.as_ptr();
  }

  return pointer;
}

#[wasm_bindgen]
pub fn get_stack_top() -> u8 {
  unsafe {
    return TOP;
  }
}

// JS writes to this buffer to pass input to forth
// #[wasm_bindgen]
// pub fn get_input_buffer_pointer() -> *const u8 {
//   let pointer: *const u8;
//   unsafe {
//     pointer = INPUT.as_ptr();
//   }
//   return pointer;
// }

// Function to store the passed value at index 0,
// in our buffer
#[wasm_bindgen]
pub fn store_value_in_input(value: u8, index: u8) {
  unsafe {
    INPUT[index as usize] = value;
    ITOP += 1;
  }
}

#[wasm_bindgen]
pub fn get_stack_at_location(index: u8) -> i32 {
  unsafe {
    return STACK[index as usize];
  }
}

pub static mut DEFINE: bool = false;
pub static mut COUNT: u8 = 0;

#[wasm_bindgen]
pub fn forth() {
    unsafe {
        let input_slice = core::slice::from_raw_parts(INPUT.as_ptr(), ITOP.into());
        let input = core::str::from_utf8_unchecked(input_slice);
        log(input);
        for token in input.split_whitespace() {
            log(token);
            // if token == ":" || DEFINE {
            //     // start defining new word
            //     DEFINE = true;
            //     COUNT += 1;
            // } else if DEFINE && COUNT == 1 {
            //     // copy word name to dictionary name array
            //     DNAME[DTOP as usize] = token;
            //     // and set the DLOC to starting index of word definition which should be DTOP
            //     DLOC[DTOP as usize] = DTOP;
            //     // You can lookup the word name in the dictionary name array to get the starting index of the word definition from the DLOC array
            // } else if DEFINE && token == ";" {
            //     // end defining new word
            //     // Store blank space at end of word definition to mark end of word
            //     DICT[DTOP as usize] = "";
            //     DTOP += 1;

            //     DEFINE = false;
            //     COUNT = 0;
            //     break;
            // } else if DEFINE && COUNT > 1 {
            //     // copy word definition to dictionary array
            //     DICT[DTOP as usize] = token;
            //     // increment dictionary pointer
            //     DTOP += 1;
            // } else 
            if token.chars().all(char::is_numeric) {
                // push number to stack
                STACK[TOP as usize] = token.parse::<i32>().unwrap_or(1000);
                if TOP < 255 {
                    TOP += 1;
                } else {
                    log("Stack overflow");
                }
            } else if token == "+" {
                // add top two numbers on stack
                TOP -= 1;
                STACK[TOP as usize - 1] += STACK[TOP as usize];
            } else if token == "-" {
                // subtract top two numbers on stack
                TOP -= 1;
                STACK[TOP as usize - 1] -= STACK[TOP as usize];
            // } else if DNAME.contains(&token) {
            //     // copy word definition to input buffer
            //     // let index = DNAME.iter().position(|&s| s == token).unwrap();
            //     // let mut i = DLOC[index];
            //     // while DICT[i as usize] != "" {
            //     //     INPUT[ITOP as usize] = DICT[i as usize];
            //     //     ITOP += 1;
            //     //     i += 1;
            //     // }
            //     log("found word")
            } else {
                log("?")
            }
            // } else if let Some(index) = DNAME.iter().position(|&s| s == token) {
            //     // println!("Found '{}' at index {}", search_str, index);
            //     // copy word definition to input buffer
                
            // } else {
            //     // println!("'{}' not found in the array", search_str);
            // }
        }
        ITOP = 0;
    //     // define new word in dictionary
    //     // remove : and ; and word name from input
        
    //     // DICT[DTOP as usize] = input;
    //     // copy word name to dictionary
    //     // copy word definition to dictionary
    //     // increment dictionary pointer
        
    } 
    // fix core::fmt size and panic checking for forth function

}
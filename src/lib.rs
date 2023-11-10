#![no_std]
// #![feature(core_intrinsics)]

// #![no_std]
static PRIMES: &[i32] = &[2, 3, 5, 7, 11, 13, 17, 19, 23];

#[no_mangle]
extern "C" fn nth_prime(n: usize) -> i32 {
    PRIMES[n]
}

// // use core::ptr;

#[panic_handler]
fn panic(_panic: &core::panic::PanicInfo<'_>) -> ! {
    core::arch::wasm32::unreachable()
}

// use wasm_bindgen::prelude::wasm_bindgen;

// extern crate alloc;

// #[cfg(target_arch = "wasm32")]
// use lol_alloc::FailAllocator;

// #[cfg(target_arch = "wasm32")]
// #[global_allocator]
// static ALLOCATOR: FailAllocator = FailAllocator;

// #[wasm_bindgen]
// extern "C" {
//     #[wasm_bindgen(js_namespace = console)]
//     fn log(s: &str);
// }

pub const STACK_SIZE: usize = 256;

pub static mut STACK: [i32; STACK_SIZE] = [0; STACK_SIZE];
pub static mut TOP: u8 = 0;

// // pub static mut INPUT: [u8; STACK_SIZE] = [0; STACK_SIZE];
// // pub static mut ITOP: u8 = 0;

// // Function to return a pointer to our buffer
// // in wasm memory
// // JS reads from this buffer to display the stack
// #[wasm_bindgen]
#[no_mangle]
extern "C" fn get_stack_pointer() -> *const i32 {
  let pointer: *const i32;
  unsafe {
    pointer = STACK.as_ptr();
  }

  return pointer;
}

// #[wasm_bindgen]
extern "C" fn get_stack_top() -> u8 {
  unsafe {
    return TOP;
  }
}

// #[wasm_bindgen]
extern "C" fn get_stack_at_location(index: u8) -> i32 {
  unsafe {
    return STACK[index as usize];
  }
}

pub static mut ST: &str = "";

// #[wasm_bindgen]
// extern "C" fn get_st_pointer() -> *const u8 {
//   let pointer: *const u8;
//   unsafe {
//     pointer = ST.as_ptr();
//   }

//   return pointer;
// }

// #[wasm_bindgen]
// extern "C" fn get_st_len() -> *const u8 {
//   let pointer: *const u8;
//   unsafe {
//     pointer = ST.len() as *const u8;
//   }

//   return pointer;
// }

pub static mut X: u8 = 0;
pub static mut TOKEN: [u8; 256] = [0; 256];
pub static mut TLEN: u8 = 0;

// #[wasm_bindgen]
// pub fn set_token_len(input: u8) {
//   unsafe {
//     TLEN = input;
//   }
// }

// // #[wasm_bindgen]
// // pub fn get_token_pointer() -> *const &str {
// //   let pointer: *const &str;
// //   unsafe {
// //     pointer = TOKEN.as_ptr();
// //   }

// //   return pointer;
// // }

pub static mut Y: &[u8] = &[];

// #[wasm_bindgen]
// pub fn set_token_at_index(input: u8, index: u8) {
//   unsafe {
//     TOKEN[index as usize] = input;
//     TLEN += 1;
//   }
// }

// #[wasm_bindgen]
#[no_mangle]
extern "C" fn forth() {
    unsafe {
        // while X < TLEN {
        //     log("p");
            
            
        //     X += 1;
        // }
        // X = 0;
        let x = core::slice::from_raw_parts(TOKEN.as_ptr(), TLEN as usize);
        // Y = &*ptr::slice_from_raw_parts(TOKEN.as_ptr(), TLEN as usize);
        ST = core::str::from_utf8_unchecked(x);
        // if x == b"" {
        //     // ST = core::intrinsics::transmute_unchecked(Y); 
            
        // } else {
        //     // log("not ok");
        // }
        

        // log(ST);
        if ST.chars().all(char::is_numeric) {
            // push number to stack
            STACK[TOP as usize] = match ST.parse::<i32>() {
                Ok(n) => n,
                Err(_) => 0,
            };
            if TOP < 255 {
                TOP += 1;
            } else {
                // log("Stack overflow");
            }
        } else if ST == "+" {
            // add top two numbers on stack
            TOP -= 1;
            STACK[TOP as usize - 1] += STACK[TOP as usize];
        } else if ST == "-" {
            // subtract top two numbers on stack
            TOP -= 1;
            STACK[TOP as usize - 1] -= STACK[TOP as usize];
        } else {
            // log("?")
        }
    } 

}
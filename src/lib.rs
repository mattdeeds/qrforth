#![no_std]

#[panic_handler]
fn panic(_panic: &core::panic::PanicInfo<'_>) -> ! {
    core::arch::wasm32::unreachable()
}

pub const STACK_SIZE: usize = 4000;
pub static mut STACK: [i32; STACK_SIZE] = [0; STACK_SIZE];
pub static mut TOP: u8 = 0;

#[no_mangle]
extern "C" fn top() -> u8 {
  unsafe {
    return TOP;
  }
}

#[no_mangle]
extern "C" fn stack(index: u8) -> i32 {
  unsafe {
    return STACK[index as usize];
  }
}

// Fetch memory contents at addr
// Store x at addr
// Get pointer to top of data stack
// Get pointer to top of return stack
// Pop return stack and resume execution at addr
// Read key stroke as ASCII character
// Print low byte of x as an ASCII character



#[no_mangle]
extern "C" fn forth(input: u8) {
    match input {
        43 => add(),            // +
        110 => nand(),          // n
        100 => drop(),          // d
        102 => flag(),          // f
        _ => core::arch::wasm32::unreachable()
    }
}

#[no_mangle]
extern "C" fn push(input: i32) {
    unsafe {
        STACK[TOP as usize] = input;
        if TOP < 255 {
            TOP += 1;
        }
    
    }
}

fn flag() {
    // -1 if top of stack is 0, 0 otherwise
    unsafe {
        if STACK[TOP as usize - 1] == 0 {
            STACK[TOP as usize - 1] = -1;
        } else {
            STACK[TOP as usize - 1] = 0;
        }
    }
}

fn drop() {
    // Drop the number at the top of the stack
    unsafe {
        TOP -= 1;
    }
}

fn add() {
    // Sum the two numbers at the top of the stack
    unsafe {
        TOP -= 1;
        STACK[TOP as usize - 1] += STACK[TOP as usize];
        STACK[TOP as usize - 1];
    }
}

fn nand() {
    // NAND the two numbers at the top of the stack
    unsafe {
        TOP -= 1;
        STACK[TOP as usize - 1] = !(STACK[TOP as usize - 1] & STACK[TOP as usize]);
    }
}

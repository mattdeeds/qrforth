#![no_std]

#[panic_handler]
fn panic(_panic: &core::panic::PanicInfo<'_>) -> ! {
    core::arch::wasm32::unreachable()
}

const STACK_SIZE: usize = 4000;

// Input = 1
// STACK => [ 1 , 0 , 0 , 0 , 0 , etc. ]
//                ^
// TOP => 1
// Input = 2
// STACK => [ 1 , 2 , 0 , 0 , 0 , etc. ]
//                    ^
// TOP => 2

static mut STACK: [i32; STACK_SIZE * 2] = [0; STACK_SIZE * 2];
static mut TOP: u16 = 0;
static MIN: u16 = 2;

static mut FLAGS: u8 = 0;
// bit 0 = overflow flag
// bit 1 = underflow flag
// bit 2 = emit flag
// bit 3 = period flag
// bit 4 = key flag
// bit 5 = unknown word flag

// return register value
#[no_mangle]
extern "C" fn flags() -> u8 {
  unsafe {
    return FLAGS;
  }
}

// zero flags register
#[no_mangle]
extern "C" fn zflag() {
  unsafe {
    FLAGS = 0;
  }
}

// return pointer to top of stack
#[no_mangle]
extern "C" fn top() -> u16 {
  unsafe {
    return TOP;
  }
}

// get stack value at index
#[no_mangle]
extern "C" fn stack(index: u16) -> i32 {
  unsafe {
    return STACK[index as usize];
  }
}

// Push x onto the stack, ( x -- )
extern "C" fn push(input: i32) {
    unsafe {
        if usize::from(TOP) >= STACK_SIZE {
            // set overflow bit in flags register
            FLAGS |= 1;
        } else {
            STACK[TOP as usize] = input;
            TOP += 1;
        }
    }
}

// Fetch memory contents at addr, ( addr -- x )
fn fetch() {
    unsafe {
        let addr = STACK[TOP as usize - 1];
        STACK[TOP as usize - 1] = STACK[addr as usize];
    }
}

// Store x at addr, ( x addr -- )
fn store() {
    unsafe {
        if TOP < MIN {
            // set underflow bit in flags register
            FLAGS |= 2;
        } else {
            drop();
            let addr = STACK[TOP as usize];
            let x = STACK[TOP as usize - 1];
            STACK[addr as usize] = x;
            drop();
        }
    }
}

// Return stack top pointer to top of stack ( -- sp )
fn sp() {
    unsafe {
        push(TOP as i32 - 1);
    }
}

// Print low byte of x as an ASCII character ( x -- )
fn emit() {
    unsafe {
        drop();
        // set emit flag in flags register
        FLAGS |= 4;
    }
}

// Print top of the stack ( x -- )
fn period() {
    unsafe {
        drop();
        // set period flag in flags register
        FLAGS |= 8;
    }
}

// Read a character from stdin and push it onto the stack ( -- x )
fn key() {
    unsafe {
        // set key flag in flags register
        FLAGS |= 16;
    }
}

// -1 if top of stack is 0, 0 otherwise, ( x -- flag )
fn flag() {
    unsafe {
        if STACK[TOP as usize - 1] == 0 {
            STACK[TOP as usize - 1] = -1;
        } else {
            STACK[TOP as usize - 1] = 0;
        }
    }
}

// Drop the number at the top of the stack, ( x -- )
fn drop() {
    unsafe {
        if usize::from(TOP) == 0 {
            // set underflow bit in flags register
            FLAGS |= 2;
        } else {
            TOP -= 1;
        }
    }
}

// Sum the two numbers at the top of the stack, ( x y -- z )
fn add() {
    unsafe {
        if TOP < MIN {
            // set underflow bit in flags register
            FLAGS |= 2;
        } else {
            STACK[TOP as usize - 2] = STACK[TOP as usize - 1] + STACK[TOP as usize - 2];
            drop();
        }
    }
}

// NAND the two numbers at the top of the stack, ( x y -- z )
fn nand() {
    unsafe {
        if TOP < MIN {
            // set underflow bit in flags register
            FLAGS |= 2;
        } else {
            STACK[TOP as usize - 2] = !(STACK[TOP as usize - 1] & STACK[TOP as usize - 2]);
            drop();
        }
    }
}

// unknown word
fn unknown() {
    unsafe {
        // set unknown flag in flags register
        FLAGS |= 32;
    }
}

#[no_mangle]
extern "C" fn forth(word: u32, value: i32) {    
    unsafe {
        // clear flags register
        FLAGS = 0;
    }
    // match word to function
    match word {
        // push
        1886745448 => push(value),
        // +
        43 => add(),
        // nand
        1851879012 => nand(),
        // drop
        1685221232 => drop(),
        // 0=
        12349 => flag(),
        // @
        64 => fetch(),
        // !
        33 => store(),
        // sp@
        7565376 => sp(),
        // emit
        1701669236 => emit(),
        // .
        46 => period(),
        // key
        7038329 => key(),
        _ => unknown()
    }
}
use wasm_bindgen::prelude::*;

// #![no_std]

// #[panic_handler]
// fn panic(_panic: &core::panic::PanicInfo<'_>) -> ! {
//     loop {}
//     core::arch::wasm32::unreachable()
// }

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
    #[wasm_bindgen(js_namespace = console)]
    fn read() -> String;
}

fn tokenize(input: &str) -> Vec<String> {
    // split by whitespace
    let mut tokens: Vec<String> = Vec::new();
    for token in input.split_whitespace() {
        tokens.push(token.to_string());
    }

    // remove comments
    if tokens.contains(&"(".to_string()) {
        let mut i = 0;
        let mut j = 0;
        for token in &tokens {
            if token == "(" {
                i = tokens.iter().position(|x| x == token).unwrap();
            }
            if token == ")" {
                j = tokens.iter().position(|x| x == token).unwrap();
            }
        }
        tokens.drain(i..j+1);
    }

    tokens
}

fn words(input: &str, stack: &mut Vec<i32>) -> String {
    // execute matching word
    match input {
        "emit" => {
            // print character
            let a = stack.pop().unwrap(); // handle underflow
            format!("{}", a as u8 as char)
        },
        // "key" => { 
        //     let buffer = read();
        //     stack.push(buffer.chars().next().unwrap() as i32);
        // },
        "cr" => {
            // print newline
            let cr = "\n";
            cr.to_string()
        },
        "dup" => {
            // duplicate top of stack
            let a = stack.pop().unwrap(); // handle underflow
            stack.push(a);
            stack.push(a);
            format!("ok")
        },
        "+" => { 
            // add top two elements of stack
            let a = stack.pop().unwrap(); // handle underflow
            let b = stack.pop().unwrap(); // handle underflow
            stack.push(a + b);
            format!("ok")
        },
        "0=" => {
            // check if top of stack is 0
            let a = stack.pop().unwrap(); // handle underflow
            if a == 0 {
                stack.push(-1);
            } else {
                stack.push(0);
            }
            format!("ok")
        },
        "nand" => { 
            // nand top two elements of stack
            let a = stack.pop().unwrap(); // handle underflow
            let b = stack.pop().unwrap(); // handle underflow
            stack.push(!(a & b));
            format!("ok")
        },
        "." => {
            // print top of stack
            let a = stack.pop().unwrap(); // handle underflow
            format!("{}", a)
        },
        _ => format!("? : {}", input),
    
    }
}

fn check_dict(dictionary: &Vec<(String,Vec<String>)>, input: &str) -> i32 {
    for (key, _) in dictionary {
        if key == input {
            // return index of word in dictionary
            return dictionary.iter().position(|x| x.0 == input).unwrap() as i32;
        }
    }
    -1
}

fn parse(input: &String, stack: &mut Vec<i32>, dictionary: &Vec<(String,Vec<String>)>) -> String {
    let mut out = String::new();
    if input.chars().all(char::is_numeric) { 
        // if input is a number, push it to the stack
        stack.push(input.parse::<i32>().unwrap());
        out = format!("ok");
    } else {
        let index = check_dict(&dictionary, input);
        if index != -1 {
            // if input is a word, execute it
            for word in &dictionary[index as usize].1 {
                out = parse(&word, stack, dictionary);
            }
        } else {
            out = words(input, stack);
        }
    }
    out
}

pub static mut STACK: Vec<i32> = Vec::new();
pub static mut DICT: Vec<(String,Vec<String>)> = Vec::new();

#[wasm_bindgen]
pub extern "C" fn forth(input: &str) -> JsValue {
    let mut out = String::new();
    // let mut stack: Vec<i32> = Vec::new();
    // let mut dictionary: Vec<(String,Vec<String>)> = Vec::new();

    // println!("qrforth v0.1.0, 2023 mdeeds, MIT License"); // output this to dom element
    // log("qrforth v0.1.0, 2023 mdeeds, MIT License");

    // read input from dom element
    // let input = read();

    // Remove trailing newline character
    // input = input.trim().to_string();

    if input == "" {
        out = "ok".to_string();
    } else {
        // tokenize input
        let tokens = tokenize(input);

        for token in &tokens {

            // exit if we are defining a new word
            if token == ":" {
                break;

            // exceute word if it is in the dictionary
            } else {
                unsafe {
                    out = parse(&token, &mut STACK, &DICT);
                }
                // out = parse(&token, &mut STACK, &dictionary);        
            }
        }
        // if tokens begins with :, and ends with ;, add to dictionary
        if tokens[0] == ":" && tokens[tokens.len()-1] == ";" {
            let mut new_word: Vec<String> = Vec::new();
            for token in &tokens[2..tokens.len()-1] {
                new_word.push(token.to_string());
            }
            unsafe {
                DICT.push((tokens[1].to_string(), new_word));
            }
            // dictionary.push((tokens[1].to_string(), new_word));
            out = "ok".to_string();
        }
    }
    
    // out // output this to dom element
    unsafe {
        out = out + &format!(" | stack: {:?}", STACK);
    }
    // let sout = format!(" | stack: {:?}", stack);
    // out = out + &sout;
    JsValue::from_str(&out)
    // log(&out)
    // format!("ok | stack: {:?}", stack);
}
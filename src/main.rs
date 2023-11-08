use std::io;

fn main() {
    // clear();
    println!("qrforth v0.1.0, 2023 mdeeds, MIT License");
    let mut stack: Vec<i32> = Vec::new();
    let mut dictionary: Vec<(String,Vec<String>)> = Vec::new();
    looop(&mut stack, &mut dictionary);
}

// function to clear the console
// fn clear() {
//     clearscreen::clear().expect("failed to clear screen");
// }

fn read() -> String {
    let mut buffer = String::new();
    io::stdin().read_line(&mut buffer).expect("Failed to read line");
    buffer
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

fn words(input: &str, stack: &mut Vec<i32>) -> bool {
    // execute matching word
    match input {
        "emit" => {
            let a = stack.pop().unwrap(); // handle underflow
            println!("{}", a as u8 as char);
            true
        },
        "key" => { 
            let buffer = read();
            stack.push(buffer.chars().next().unwrap() as i32);
            true
        },
        "cr" => {
            println!();
            true
        },
        "dup" => {
            let a = stack.pop().unwrap(); // handle underflow
            stack.push(a);
            stack.push(a);
            true
        },
        "+" => { 
            let a = stack.pop().unwrap(); // handle underflow
            let b = stack.pop().unwrap(); // handle underflow
            stack.push(a + b);
            true
        },
        "0=" => {
            let a = stack.pop().unwrap(); // handle underflow
            if a == 0 {
                stack.push(-1);
            } else {
                stack.push(0);
            }
            true
        },
        "nand" => { 
            let a = stack.pop().unwrap(); // handle underflow
            let b = stack.pop().unwrap(); // handle underflow
            stack.push(!(a & b));
            true
        },
        "." => {
            let a = stack.pop().unwrap(); // handle underflow
            println!("{}", a);
            true
        },
        _ => false,
    
    }
}

// function to determine if input is contained in the dictionary
fn contains_string(dictionary: &Vec<(String,Vec<String>)>, input: &str) -> (bool, Option<Vec<String>>)  {
    for (key, x) in dictionary {
        if key == input {
            return (true, Some(x.to_vec()));
        }
    }
    (false, None)
}

fn parse(input: &String, stack: &mut Vec<i32>) -> bool {

    if input.chars().all(char::is_numeric) { 
        // if input is a number, push it to the stack
        stack.push(input.parse::<i32>().unwrap());
        true

    } else if words(input, stack) {
        // if input is a word, execute it
        true

    } else {
        false
    }
    
}

fn looop(stack: &mut Vec<i32>, dictionary: &mut Vec<(String,Vec<String>)>) {
    loop {
        let mut input = read();

        // Remove trailing newline character
        input = input.trim().to_string();

        if input == "" {
            continue;
        }
        if input == "exit" {
            break;
        }

        // tokenize input
        let tokens = tokenize(input.as_str());

        let mut success: bool = false;
        for token in &tokens {
            // check if token is in dictionary
            let cword = contains_string(dictionary, &token);

            // exit if we are defining a new word
            if token == ":" {
                break;

            // exceute word if it is in the dictionary
            } else if cword.0 {
                for word in cword.1.unwrap() {
                    if !parse(&word, stack) {
                        println!("? : {}", word);
                        success = false;
                    } else {
                        success = true;
                    }
                }

            // if we cant parse the token, print error
            } else if !parse(&token, stack) {
                println!("? : {}", token);
                success = false;

            // add to input to stack or execute predefined word
            } else {
                success = true;
            }
        }
        // if tokens begins with :, and ends with ;, add to dictionary
        if tokens[0] == ":" && tokens[tokens.len()-1] == ";" {
            let mut new_word: Vec<String> = Vec::new();
            for token in &tokens[2..tokens.len()-1] {
                new_word.push(token.to_string());
            }
            dictionary.push((tokens[1].to_string(), new_word));
            success = true;
        }
        if success {
            println!("ok | stack: {:?}", stack);
        }
    }
}
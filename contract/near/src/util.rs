use near_sdk::{env, Promise, AccountId};


pub fn transfer(account_id: &AccountId, amount: u128) -> Option<Promise> {
    if amount > 0 {
        return Some(Promise::new(account_id.clone()).transfer(amount));
    };
    None
}

pub fn current_time() -> f64 {
    let nano_to_sec = 1000000000 as f64;
    env::block_timestamp() as f64  / nano_to_sec
}

pub fn get_random_number(shift_amount: u32) -> u32 {
    let mut seed = env::random_seed();
    let seed_len = seed.len();
    let mut arr: [u8; 4] = Default::default();
    seed.rotate_left(shift_amount as usize % seed_len);
    arr.copy_from_slice(&seed[..4]);
    u32::from_le_bytes(arr)
}

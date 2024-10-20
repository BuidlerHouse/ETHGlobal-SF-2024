use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LazyOption, LookupMap, UnorderedMap, UnorderedSet, Vector};
use near_sdk::json_types::{Base64VecU8, U128};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{
    env, near_bindgen, AccountId, Balance, CryptoHash, PanicOnDefault, Promise, PromiseOrValue,
    Gas, require, BorshStorageKey, log, ext_contract
};
use near_units::{parse_near, parse_gas};

pub use crate::util::*;
mod util;

pub const VERSION_CODE: &str  = "v1.0.0";
pub const GAS_FOR_CALL: Gas = Gas(parse_gas!("20 Tgas") as u64);

#[derive(BorshDeserialize, BorshSerialize)]
pub struct Conversation {
    pub messages: String,
    pub role: String,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    pub request: LookupMap<String, Vector<Conversation>>,
    pub request_wallet: LookupMap<String, AccountId>,
    pub price_per_token: u128,
    pub owner: AccountId,
    pub max_token_output_length: u128,
}

#[derive(BorshSerialize, BorshStorageKey)]
pub enum StorageKey {
    Requests,
    RequestsConversation { request_id: String },
    RequestWallet,
}

#[near_bindgen]
impl Contract {
    #[init]
    // TODO: add [Private]
    pub fn new() -> Self {
        let this = Self {
            request: LookupMap::new(StorageKey::Requests),
            price_per_token: 1,
            owner: env::signer_account_id(),
            max_token_output_length: 10000,
            request_wallet: LookupMap::new(StorageKey::RequestWallet),
        };
        this
    }

    pub fn set_price_per_token(&mut self, price: u128) {
        assert_eq!(env::signer_account_id(), self.owner, "Forbidden");
        self.price_per_token = price;
    }

    #[payable]
    pub fn chat(&mut self, request_id: String, message: String) {
        let required_deposit = (message.len() as u128) * self.price_per_token + self.max_token_output_length * self.price_per_token;
        // TODO: pre-payment for max token output length
        let attached_deposit = env::attached_deposit();
        require!(attached_deposit >= required_deposit, "Not enough NEAR attached for this message length");
        let conversation = Conversation {
            messages: message,
            role: "user".to_string(),
        };
        let full_request_id = self.get_request_id(request_id);
        let mut conversations = self.request.get(&full_request_id).unwrap_or_else(|| {
            Vector::new(StorageKey::RequestsConversation { request_id: full_request_id.clone() })
        });
        conversations.push(&conversation);
        self.request.insert(&full_request_id, &conversations);
        self.request_wallet.insert(&full_request_id, &env::signer_account_id());
        // Refund any excess deposit
        if attached_deposit > required_deposit {
            Promise::new(env::predecessor_account_id()).transfer(attached_deposit - required_deposit);
        }
    }
    
    #[payable]
    pub fn reply(&mut self, full_request_id: String, message: String) {
        assert_eq!(env::signer_account_id(), self.owner, "Forbidden");
        if message.len() as u128 > self.max_token_output_length {
            env::panic_str("Message too long");
        }
        let conversation = Conversation {
            messages: message.clone(),
            role: "system".to_string(),
        };
        let mut conversations = self.request.get(&full_request_id).unwrap_or_else(|| {
            Vector::new(StorageKey::RequestsConversation { request_id: full_request_id.clone() })
        });
        conversations.push(&conversation);
        self.request.insert(&full_request_id, &conversations);
        let token_left = self.max_token_output_length - (message.len() as u128);
        let request_wallet = self.request_wallet.get(&full_request_id).unwrap();
        if token_left > 0 {
            Promise::new(request_wallet).transfer(token_left * self.price_per_token);
        }
    }

    pub fn get_request_id(&self, request_id: String) -> String {
        let signer_account_id = env::signer_account_id().to_string();
        let full_request_id = format!("{}_{}", signer_account_id, request_id);
        full_request_id
    }

    pub fn get_chat_history(&self, full_request_id: String) -> Vec<Conversation> {
        let conversations = self.request.get(&full_request_id)
            .unwrap_or_else(|| {
                Vector::new(StorageKey::RequestsConversation { request_id: full_request_id.clone() })
            });
        conversations.to_vec()
    }
}
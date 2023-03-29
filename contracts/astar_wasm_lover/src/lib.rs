#![cfg_attr(not(feature = "std"), no_std)]

#[ink::contract]
mod astar_wasm_lover {
    use ink::storage::{ Mapping, traits::StorageLayout };
    use ink::prelude::{ vec::Vec, string::String };

    #[derive(Debug, Clone, scale::Encode, scale::Decode, PartialEq)]
    #[cfg_attr(feature = "std", derive(StorageLayout, scale_info::TypeInfo))]
    pub struct LoverInfo {
        pub id: u128,
        pub name: String,
        pub account_id: AccountId,
        pub message: String,
        pub github_url_of_dapp: Option<String>,
        pub x: u128,
        pub y: u128,
    }

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        AlreadyExists,
    }

    pub type Result<T> = core::result::Result<T, Error>;

    #[ink(storage)]
    pub struct AstarWasmLover {
        list_of_lovers: Mapping<AccountId, LoverInfo>,
        list_of_lovers_with_id: Mapping<u128, LoverInfo>,
        lover_id: u128,
    }

    impl AstarWasmLover {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self { 
                list_of_lovers: Mapping::default(),
                list_of_lovers_with_id: Mapping::default(),
                lover_id: 0,
            }
        }

        #[ink(message)]
        pub fn set_message(&mut self, name:String, message:String, github_url_of_dapp:Option<String>, x:u128, y:u128) -> Result<()> {
            let caller = self.env().caller();
            match self.list_of_lovers.get(&caller){
                Some(_) => return Err(Error::AlreadyExists),
                None => (),
            }
            let lover:LoverInfo = LoverInfo{
                id: self.lover_id,
                name: name,
                account_id: caller,
                message: message,
                github_url_of_dapp: github_url_of_dapp,
                x: x,
                y: y,
            };
            self.list_of_lovers.insert(&caller, &lover);
            self.list_of_lovers_with_id.insert(&self.lover_id, &lover);
            self.lover_id += 1;
            Ok(())
        }

        #[ink(message)]
        pub fn get_message_list(&self) -> Vec<LoverInfo> {
            let mut result:Vec<LoverInfo> = Vec::new();
            for i in 0..self.lover_id {
                match self.list_of_lovers_with_id.get(&i) {
                    Some(value) => result.push(value),
                    None => ()
                }
            };
            result
        }

        #[ink(message)]
        pub fn get_message(&self) -> Option<LoverInfo> {
            self.list_of_lovers.get(&self.env().caller())
        }

    }

    #[cfg(test)]
    mod tests {
        use super::*;

        #[ink::test]
        fn it_works() {
            let mut astar_wasm_lover = AstarWasmLover::new();
            let result = astar_wasm_lover.set_message("Shin Takahashi".to_string(), "Welcome, WASM".to_string(), Some("https://github.com/realtakahashi".to_string()), 0, 0);
            assert_eq!(result, Ok(()));
            let lover_info = astar_wasm_lover.get_message().unwrap();
            assert_eq!(lover_info.name, "Shin Takahashi".to_string());
            assert_eq!(lover_info.id, 0);
            assert_eq!(astar_wasm_lover.get_message_list().len(),1);
        }

        #[ink::test]
        fn two_data_works() {
            let mut astar_wasm_lover = AstarWasmLover::new();
            let result = astar_wasm_lover.set_message("Shin Takahashi".to_string(), "Welcome, WASM".to_string(), Some("https://github.com/realtakahashi".to_string()), 0, 0);
            assert_eq!(result, Ok(()));
            let lover_info = astar_wasm_lover.get_message().unwrap();
            assert_eq!(lover_info.name, "Shin Takahashi".to_string());
            assert_eq!(lover_info.id, 0);
            assert_eq!(astar_wasm_lover.get_message_list().len(),1);

            let accounts =
                ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();
            ink::env::test::set_caller::<ink::env::DefaultEnvironment>(accounts.bob);
            let result = astar_wasm_lover.set_message("Sei Takahashi".to_string(), "Welcome to Astar Network, WASM".to_string(), Some("https://github.com/realtakahashi".to_string()), 0, 0);
            assert_eq!(result, Ok(()));
            let lover_info = astar_wasm_lover.get_message().unwrap();
            assert_eq!(lover_info.message, "Welcome to Astar Network, WASM".to_string());
            assert_eq!(lover_info.id, 1);
            assert_eq!(astar_wasm_lover.get_message_list().len(),2);
        }

        #[ink::test]
        fn check_already_exists_works() {
            let mut astar_wasm_lover = AstarWasmLover::new();
            let result = astar_wasm_lover.set_message("Shin Takahashi".to_string(), "Welcome, WASM".to_string(), Some("https://github.com/realtakahashi".to_string()),0 , 0);
            assert_eq!(result, Ok(()));
            let lover_info = astar_wasm_lover.get_message().unwrap();
            assert_eq!(lover_info.name, "Shin Takahashi".to_string());
            assert_eq!(lover_info.id, 0);
            assert_eq!(astar_wasm_lover.get_message_list().len(),1);

            let result = astar_wasm_lover.set_message("Sei Takahashi".to_string(), "Welcome to Astar Network, WASM".to_string(), Some("https://github.com/realtakahashi".to_string()),0, 0);
            assert_eq!(result, Err(Error::AlreadyExists));
        }
    }
}

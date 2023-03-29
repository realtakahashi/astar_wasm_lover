/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/astar_wasm_lover';
import type BN from 'bn.js';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";


export default class Methods {
	private __nativeContract : ContractPromise;
	private __keyringPair : KeyringPair;
	private __apiPromise: ApiPromise;

	constructor(
		apiPromise: ApiPromise,
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__apiPromise = apiPromise;
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
	}

	/**
	* setMessage
	*
	* @param { string } name,
	* @param { string } message,
	* @param { string | null } githubUrlOfDapp,
	*/
	"setMessage" (
		name: string,
		message: string,
		githubUrlOfDapp: string | null,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "setMessage", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "astar_wasm_lover");
		}, [name, message, githubUrlOfDapp], __options);
	}

	/**
	* getMessageList
	*
	*/
	"getMessageList" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "getMessageList", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "astar_wasm_lover");
		}, [], __options);
	}

	/**
	* getMessage
	*
	*/
	"getMessage" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "getMessage", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "astar_wasm_lover");
		}, [], __options);
	}

}
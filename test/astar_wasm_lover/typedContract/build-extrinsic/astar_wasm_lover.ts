/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/astar_wasm_lover';
import type BN from 'bn.js';
import type { ApiPromise } from '@polkadot/api';



export default class Methods {
	private __nativeContract : ContractPromise;
	private __apiPromise: ApiPromise;

	constructor(
		nativeContract : ContractPromise,
		apiPromise: ApiPromise,
	) {
		this.__nativeContract = nativeContract;
		this.__apiPromise = apiPromise;
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "setMessage", [name, message, githubUrlOfDapp], __options);
	}

	/**
	 * getMessageList
	 *
	*/
	"getMessageList" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getMessageList", [], __options);
	}

	/**
	 * getMessage
	 *
	*/
	"getMessage" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getMessage", [], __options);
	}

}
/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryOkJSON, queryJSON, handleReturnType } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/astar_wasm_lover';
import type * as ReturnTypes from '../types-returns/astar_wasm_lover';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";


export default class Methods {
	private __nativeContract : ContractPromise;
	private __keyringPair : KeyringPair;
	private __callerAddress : string;
	private __apiPromise: ApiPromise;

	constructor(
		apiPromise : ApiPromise,
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__apiPromise = apiPromise;
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
		this.__callerAddress = keyringPair.address;
	}

	/**
	* setMessage
	*
	* @param { string } name,
	* @param { string } message,
	* @param { string | null } githubUrlOfDapp,
	* @returns { void }
	*/
	"setMessage" (
		name: string,
		message: string,
		githubUrlOfDapp: string | null,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "setMessage", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "astar_wasm_lover");
		}, [name, message, githubUrlOfDapp], __options);
	}

	/**
	* getMessageList
	*
	* @returns { Result<Array<ReturnTypes.LoverInfo>, ReturnTypes.LangError> }
	*/
	"getMessageList" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Array<ReturnTypes.LoverInfo>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getMessageList", [], __options, (result) => { return handleReturnType(result, getTypeDescription(12, 'astar_wasm_lover')); });
	}

	/**
	* getMessage
	*
	* @returns { Result<ReturnTypes.LoverInfo | null, ReturnTypes.LangError> }
	*/
	"getMessage" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.LoverInfo | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getMessage", [], __options, (result) => { return handleReturnType(result, getTypeDescription(15, 'astar_wasm_lover')); });
	}

}
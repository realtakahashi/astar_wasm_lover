/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryJSON, queryOkJSON, handleReturnType } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/astar_wasm_lover';
import type * as ReturnTypes from '../types-returns/astar_wasm_lover';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';


export default class Methods {
	private __nativeContract : ContractPromise;
	private __apiPromise: ApiPromise;
	private __callerAddress : string;

	constructor(
		nativeContract : ContractPromise,
		nativeApi : ApiPromise,
		callerAddress : string,
	) {
		this.__nativeContract = nativeContract;
		this.__callerAddress = callerAddress;
		this.__apiPromise = nativeApi;
	}

	/**
	* setMessage
	*
	* @param { string } name,
	* @param { string } message,
	* @param { string | null } githubUrlOfDapp,
	* @returns { Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> }
	*/
	"setMessage" (
		name: string,
		message: string,
		githubUrlOfDapp: string | null,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.Error>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "setMessage", [name, message, githubUrlOfDapp], __options , (result) => { return handleReturnType(result, getTypeDescription(9, 'astar_wasm_lover')); });
	}

	/**
	* getMessageList
	*
	* @returns { Result<Array<ReturnTypes.LoverInfo>, ReturnTypes.LangError> }
	*/
	"getMessageList" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Array<ReturnTypes.LoverInfo>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getMessageList", [], __options , (result) => { return handleReturnType(result, getTypeDescription(12, 'astar_wasm_lover')); });
	}

	/**
	* getMessage
	*
	* @returns { Result<ReturnTypes.LoverInfo | null, ReturnTypes.LangError> }
	*/
	"getMessage" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.LoverInfo | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getMessage", [], __options , (result) => { return handleReturnType(result, getTypeDescription(15, 'astar_wasm_lover')); });
	}

}
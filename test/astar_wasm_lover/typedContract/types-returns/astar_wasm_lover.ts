import type BN from 'bn.js';
import type {ReturnNumber} from '@727-ventures/typechain-types';

export type AccountId = string | number[]

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export enum Error {
	alreadyExists = 'AlreadyExists'
}

export type LoverInfo = {
	id: ReturnNumber,
	name: string,
	accountId: AccountId,
	message: string,
	githubUrlOfDapp: string | null
}


import type BN from 'bn.js';

export type AccountId = string | number[]

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export enum Error {
	alreadyExists = 'AlreadyExists'
}

export type LoverInfo = {
	id: (string | number | BN),
	name: string,
	accountId: AccountId,
	message: string,
	githubUrlOfDapp: string | null
}


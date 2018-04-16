import fetch from 'node-fetch';
import {
	AuthRequestResponseJson,
	GetAllNamespacesResponseJson,
	GetAllNamesResponseJson,
	GetConsensusHashResponseJson,
	GetHistoricalZoneFileResponseJson,
	GetNameHistoryResponseJson,
	GetNameInfoResponseJson,
	GetNamePriceResponseJson,
	GetNamesOwnedByAddressResponseJson,
	GetNamespaceNamesResponseJson,
	GetNamespacePriceResponseJson,
	GetNumberOfNamesOnBlockchainResponseJson,
	GetOperationsInBlockResponseJson,
	GetZoneFileResponseJson,
	PingResponseJson
} from './responses';


export class BlockstackCoreClient {
	public readonly host: string;
	public readonly port: number;
	public readonly scheme: string;
	public readonly basePath: string;

	constructor(host: string, port: number = 443, scheme: string = 'https', basePath: string = '') {
		this.host = host;
		this.port = port;
		this.scheme = scheme;
		this.basePath = basePath;
	}

	private async fetchEndpoint<T>(path: string): Promise<T> {
		const response = await fetch(`${this.scheme}://${this.host}${this.basePath}${path}`);

		let data;
		try {
			data = (await response.json()) as T;
		} catch (error) {
			throw error;
		}

		return data;
	}


	/*
	 * Authorization
	 */

	public async requestAuth(authRequestToken: string) {
		const path = `/auth?authRequest=${authRequestToken}`;
		return this.fetchEndpoint<AuthRequestResponseJson>(path);
	}


	/*
	 * Core Node Administration
	 */

	public async ping() {
		const path = '/v1/node/ping';
		return this.fetchEndpoint<PingResponseJson>(path);
	}


	/*
	 * Managing Names
	 */

	public async getZoneFile(name: string) {
		const path = `/v1/names/${name}/zonefile`;
		return this.fetchEndpoint<GetZoneFileResponseJson>(path);
	}


	/*
	 * Name Querying
	 */

	public async getAllNames(page: number) {
		const path = `/v1/names?page=${page}`;
		return this.fetchEndpoint<GetAllNamesResponseJson>(path);
	}

	public async getNameInfo(name: string) {
		const path = `/v1/names/${name}`;
		return this.fetchEndpoint<GetNameInfoResponseJson>(path);
	}

	public async getNameHistory(name: string) {
		const path = `/v1/names/${name}/history`;
		return this.fetchEndpoint<GetNameHistoryResponseJson>(path);
	}

	public async getHistoricalZoneFile(name: string, zoneFileHash: string) {
		const path = `/v1/names/${name}/zonefile/${zoneFileHash}`;
		return this.fetchEndpoint<GetHistoricalZoneFileResponseJson>(path);
	}

	public async getNamesOwnedByAddress(blockchain: string, address: string) {
		const path = `/v1/addresses/${blockchain}/${address}`;
		return this.fetchEndpoint<GetNamesOwnedByAddressResponseJson>(path);
	}


	/*
	 * Price Checks
	 */

	public async getNamespacePrice(tld: string) {
		const path = `/v1/prices/namespaces/${tld}`;
		return this.fetchEndpoint<GetNamespacePriceResponseJson>(path);
	}

	public async getNamePrice(name: string) {
		const path = `/v1/prices/names/${name}`;
		return this.fetchEndpoint<GetNamePriceResponseJson>(path);
	}


	/*
	 * Blockchain Operations
	 */

	public async getConsensusHash(blockchainName: string) {
		const path = `/v1/blockchains/${blockchainName}/consensus`;
		return this.fetchEndpoint<GetConsensusHashResponseJson>(path);
	}

	public async getNumberOfNamesOnBlockchain(blockchainName: string) {
		const path = `/v1/blockchains/${blockchainName}/name_count`;
		return this.fetchEndpoint<GetNumberOfNamesOnBlockchainResponseJson>(path);
	}

	public async getOperationsInBlock(blockchainName: string, blockHeight: number) {
		const path = `/v1/blockchains/${blockchainName}/operations/${blockHeight}`;
		return this.fetchEndpoint<GetOperationsInBlockResponseJson>(path);
	}


	/*
	 * Namespace Operations
	 */

	public async getAllNamespaces() {
		const path = '/v1/namespaces';
		return this.fetchEndpoint<GetAllNamespacesResponseJson>(path);
	}

	public async getNamespaceNames(tld: string, page: number) {
		const path = `/v1/namespaces/${tld}/names?page=${page}`;
		return this.fetchEndpoint<GetNamespaceNamesResponseJson>(path);
	}
}

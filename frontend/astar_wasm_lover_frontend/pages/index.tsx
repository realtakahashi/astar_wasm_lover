import type { NextPage } from "next";
import { useState } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { ContractPromise } from "@polkadot/api-contract";
import contractAbi from "../astar_wasm_lover.json";
import { BN } from "@polkadot/util";
import type { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import Link from "next/link";

const blockchainUrl = String(process.env.NEXT_PUBLIC_BLOCK_CHAIN_URL) ?? "";
const contractAddress = String(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS) ?? "";

export interface LoverInfo {
  id: string;
  name: string;
  message: string;
  address: string;
  githubUrl: string;
}

const Home: NextPage = () => {
  const [api, setApi] = useState<any>();
  const [messageList, setMessageList] = useState<Array<LoverInfo>>();
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [actingAddress, setActingAddress] = useState("");

  const setup = async () => {
    const wsProvider = new WsProvider(blockchainUrl);
    const api = await ApiPromise.create({ provider: wsProvider });
    setApi(api);
    await extensionSetup();
  };

  const extensionSetup = async () => {
    const { web3Accounts, web3Enable } = await import(
      "@polkadot/extension-dapp"
    );
    const extensions = await web3Enable("Polk4NET");
    if (extensions.length === 0) {
      return;
    }
    const account = await web3Accounts();
    setAccounts(account);
  };

  const getGasLimitForNotDeploy = (api: any): any => {
    const gasLimit: any = api.registry.createType("WeightV2", {
      refTime: new BN("100000000000"),
      proofSize: new BN("100000000000"),
    });
    return gasLimit;
  };

  const getMessageList = async () => {
    console.log("pass getMessageList #1");

    let response: LoverInfo[] = [];
    const contract = new ContractPromise(api, contractAbi, contractAddress);
    const gasLimit: any = getGasLimitForNotDeploy(api);

    const { gasConsumed, result, output } = await contract.query.getMessageList(
      actingAddress,
      {
        value: 0,
        gasLimit: gasLimit,
      }
    );
    console.log("pass getMessageList #2");
    if (output !== undefined && output !== null) {
      let response_json = output.toJSON();
      let json_data = JSON.parse(JSON.stringify(response_json));
      console.log("json_data:", json_data);
      for (let i = 0; i < json_data.ok.length; i++) {
        let item: LoverInfo = {
          id: json_data.ok[i].id,
          name: json_data.ok[i].name,
          message: json_data.ok[i].message,
          githubUrl: json_data.ok[i].githubUrlOfDapp,
          address: json_data.ok[i].accountId,
        };
        response.push(item);
      }
      setMessageList(response);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-b from-blue-500 flex-col text-center items-center min-h-screen">
        <br />
        <div className="text-8xl text-blue-900">
          For All WASM Contract Lovers
        </div>
        <div className="text-8xl text-indigo-800">Astar Network</div>
        <br />
        <br />
        <button
          className="bg-blue-900 hover:bg-blue-500 text-white rounded px-4 py-2"
          onClick={setup}
        >
          Connect Wallet
        </button>

        <div className="p-5"></div>
        <div className="text-black">
          Acting account (select from dropdown):{" "}
          {actingAddress ? actingAddress : "..."}
        </div>
        <br />
        <select
          className="p-3 m-3 border-2 border-green-500 w-1/2"
          onChange={(event) => {
            console.log(event);
            setActingAddress(event.target.value);
          }}
        >
          {accounts.map((a) => (
            <option key={a.address} value={a.address}>
              {a.address} [{a.meta.name}]
            </option>
          ))}
        </select>
        <br />
        <div>
          <button
            className="m-5 bg-blue-900 hover:bg-blue-500 text-white rounded px-4 py-2"
            onClick={getMessageList}
          >
            Show All Messages
          </button>
          <button className="m-5 bg-blue-900 hover:bg-blue-500 text-white rounded px-4 py-2">
            <Link href="submit">Submit Your Message</Link>
          </button>
        </div>
        <br />
        <div className="flex justify-center m-5 p-5 ">
          <table className="table-auto border border-blue-900">
            <thead>
              <tr>
                <th className="border border-blue-900 px-2 py-2">Id</th>
                <th className="border border-blue-900 px-2 py-2">Name</th>
                <th className="border border-blue-900 px-2 py-2">Message</th>
                <th className="border border-blue-900 px-2 py-2">
                  Github Url Of Your dApp
                </th>
                <th className="border border-blue-900 px-2 py-2">Address</th>
              </tr>
            </thead>
            <tbody>
              {typeof messageList !== "undefined"
                ? messageList.map((loverInfo) => {
                    return (
                      <tr>
                        <td className="border border-blue-900 px-2 py-2">
                          {loverInfo.id}
                        </td>
                        <td className="border border-blue-900 px-2 py-2">
                          {loverInfo.name}
                        </td>
                        <td className="border border-blue-900 px-2 py-2">
                          {loverInfo.message}
                        </td>
                        <td className="border border-blue-900 px-2 py-2">
                          {loverInfo.githubUrl}
                        </td>
                        <td className="border border-blue-900 px-2 py-2">
                          {loverInfo.address}
                        </td>
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default Home;

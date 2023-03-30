import type { NextPage } from "next";
import { useState } from "react";
import type { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { ContractPromise } from "@polkadot/api-contract";
import { LoverInfo } from "..";
import Link from "next/link";
import contractAbi from "../../astar_wasm_lover.json";
import { BN } from "@polkadot/util";

const Submit: NextPage = () => {
  const [api, setApi] = useState<any>();
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [actingAddress, setActingAddress] = useState("");
  const [statusString, setStatusString] = useState("");
  const [addLoverInfo, setAddLoverInfo] = useState<LoverInfo>({
    id: "",
    name: "",
    message: "",
    address: "",
    githubUrl: "",
  });

  const blockchainUrl = String(process.env.NEXT_PUBLIC_BLOCK_CHAIN_URL) ?? "";
  const contractAddress =
    String(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS) ?? "";
  const storageDepositLimit = null;

  const getGasLimitForNotDeploy = (api: any): any => {
    const gasLimit: any = api.registry.createType("WeightV2", {
      refTime: new BN("100000000000"),
      proofSize: new BN("100000000000"),
    });
    return gasLimit;
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
    const empty_data: InjectedAccountWithMeta = {
      address: "",
      meta: { genesisHash: "", name: "** Plese select your account **", source: "" },
    };
    var tmpAccount: Array<InjectedAccountWithMeta> = [];
    tmpAccount.push(empty_data);
    account.forEach((value) => {
      tmpAccount.push(value);
    });
    setAccounts(tmpAccount);
  };

  const setup = async () => {
    const wsProvider = new WsProvider(blockchainUrl);
    const api = await ApiPromise.create({ provider: wsProvider });
    setApi(api);
    await extensionSetup();
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddLoverInfo({
      ...addLoverInfo,
      [event.target.name]: event.target.value,
    });
  };

  const onChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAddLoverInfo({
      ...addLoverInfo,
      [event.target.name]: event.target.value,
    });
  };

  const _onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const { web3FromSource } = await import("@polkadot/extension-dapp");
    console.log("## _onSubmit 1");
    event.preventDefault();

    const contract = new ContractPromise(api, contractAbi, contractAddress);

    console.log("actingAddress", actingAddress);

    var actingAccount = accounts[1];
    accounts.forEach((value) => {
      if (value.address == actingAddress) {
        actingAccount = value;
      }
    });
    console.log("actingAccount", actingAccount);
    const injector = await web3FromSource(actingAccount.meta.source);

    const gasLimit: any = getGasLimitForNotDeploy(api);

    const { gasRequired, gasConsumed, result, output } =
      await contract.query.setMessage(
        actingAddress,
        { value: 0, gasLimit: gasLimit, storageDepositLimit },
        addLoverInfo.name,
        addLoverInfo.message,
        addLoverInfo.githubUrl,
        0,
        0
      );

    console.log("output?.toHuman()?", output?.toHuman());

    if (output?.toHuman()?.Ok.Err == "AlreadyExists") {
      alert("Your message is already submited.");
      return;
    }

    const setMessage = await contract.tx.setMessage(
      { value: 0, gasLimit: gasRequired },
      addLoverInfo.name,
      addLoverInfo.message,
      addLoverInfo.githubUrl,
      0,
      0
    );

    if (injector !== undefined) {
      const unsub = await setMessage.signAndSend(
        actingAddress,
        { signer: injector.signer },
        ({ status, events = [] }) => {
          if (status.isFinalized) {
            events.forEach(({ event: { data } }) => {
              console.log("### data.methhod:", data.method);
              if (String(data.method) == "ExtrinsicFailed") {
                console.log("### check ExtrinsicFailed");
                setStatusString("Transaction is failure");
              }
              else{
                setStatusString("Transaction is success");
              }
            });
            
            unsub();
            //api.disconnect();
          }
        }
      );
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
        <div>
          <button
            className="bg-blue-900 hover:bg-blue-500 text-white rounded px-4 py-2 m-5"
            onClick={setup}
          >
            Connect Wallet
          </button>
          <button className="bg-blue-500 hover:bg-blue-200 text-white rounded px-4 py-2 m-5">
            <Link href="/">Back To Top</Link>
          </button>
        </div>
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
        <br />
        <br />
        <br />
        <form className="" onSubmit={_onSubmit}>
          <div className="text-black">Your Name</div>
          <div>
            <input
              className="m-5 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 
                        leading-tight focus:outline-none focus:bg-white focus:border-blue-500 w-1/2"
              name="name"
              type="text"
              onChange={onChangeInput}
            ></input>
          </div>
          <br />
          <div className="text-black">Message For WASM Launch</div>
          <div>
            <textarea
              className="m-5 appearance-none border-2 border-gray-200 rounded w-1/2 py-2 px-4 text-gray-700 
                        leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              name="message"
              rows={5}
              onInput={onChangeText}
            ></textarea>
          </div>
          <br />
          <div className="text-black">The Github URL Of Your WASM dApp</div>
          <div>
            <input
              className="m-5 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 
                        leading-tight focus:outline-none focus:bg-white focus:border-blue-500 w-1/2"
              name="githubUrl"
              type="text"
              onChange={onChangeInput}
            ></input>
          </div>
          <br />
          <button
            className="bg-blue-500 hover:bg-blue-300 text-white rounded px-4 py-2"
            onClick={setup}
          >
            Submit
          </button>
          <br />
          <br />
          <br />
          <div className="text-black">
            Status: {statusString}
          </div>
          <br />
          <br />
          <br />
          <div className="text-blue-300">
            Copyright © 2023 Shin Takahashi All Rights Reserved.
          </div>
        </form>
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

export default Submit;

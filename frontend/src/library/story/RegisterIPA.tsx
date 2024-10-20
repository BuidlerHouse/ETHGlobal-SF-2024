import { useIpAsset } from '@story-protocol/react-sdk';

import {  RegisterDerivativeWithLicenseTokensResponse, SnapshotResponse, ClaimRevenueResponse, CollectRoyaltyTokensResponse, StoryClient, StoryConfig, IpMetadata, PIL_TYPE, RegisterDerivativeResponse,
    RegisterIpAndAttachPilTermsResponse,
    RegisterIpAndMakeDerivativeResponse,
    RegisterIpResponse,CreateIpAssetWithPilTermsResponse } from '@story-protocol/core-sdk'
import { http } from 'viem'
import { privateKeyToAccount, Address, Account } from 'viem/accounts'
import { uploadJSONToIPFS } from './utils/uploadToIpfs'
import { createHash } from 'crypto'
import { NFTContractAddress, NonCommercialSocialRemixingTermsId, RPCProviderUrl, account, CurrencyAddress } from './utils/utils'
import { mintNFT } from './utils/mintNFT'

export default async function RegisterIPA(address:string ) {
    const { register } = useIpAsset();
    

    const config: StoryConfig = {
        account: account,
        transport: http(process.env.RPC_PROVIDER_URL),
        chainId: 'iliad',
    }
    const client = StoryClient.newClient(config)
    
    const ipMetadata : IpMetadata = client.ipAsset.generateIpMetadata({
        title: 'Code Block',
        description: 'This is a Code Block Asset by dAIp',
        watermarkImg: 'https://raw.githubusercontent.com/BuidlerHouse/dAIp/refs/heads/main/docs/logo.png',
        attributes: [
            {
                key: 'Time',
                value: 'ETHGlobal',
            },
        ],
    })

    const nftMetadata = {
        name: 'Code Block NFT',
        description: 'This NFT represents ownership of this Code Block',
        image: 'https://raw.githubusercontent.com/BuidlerHouse/dAIp/refs/heads/main/docs/logo.png',
    }

    const ipIpfsHash = await uploadJSONToIPFS(ipMetadata)
    const ipHash = createHash('sha256').update(ipIpfsHash).digest('hex')

    const nftIpfsHash = await uploadJSONToIPFS(nftMetadata)
    const nftHash = createHash('sha256').update(nftIpfsHash).digest('hex')

    console.log(`Generating Parent IP`)

    const tokenId = await mintNFT(wallet?.account.address as Address, ipfsUri);

    const response = await register({
        nftContract: "0xd516482bef63Ff19Ed40E4C6C2e626ccE04e19ED", // your NFT contract address
        tokenId, 
        ipMetadata: {
        ipMetadataURI: ipfsUri,
        ipMetadataHash: `0x${metadataHash}`,
        nftMetadataHash: `0x${metadataHash}`,
        nftMetadataURI: ipfsUri,
        },
        txOptions: {
        waitForTransaction: true,
        },
    });

    console.log(`Root IPA created at tx hash ${response.txHash}, IPA ID: ${response.ipId}`);
}

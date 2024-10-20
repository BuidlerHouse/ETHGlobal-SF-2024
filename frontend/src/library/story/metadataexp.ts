import {  RegisterDerivativeWithLicenseTokensResponse, SnapshotResponse, ClaimRevenueResponse, CollectRoyaltyTokensResponse, StoryClient, StoryConfig, IpMetadata, PIL_TYPE, RegisterDerivativeResponse,
    RegisterIpAndAttachPilTermsResponse,
    RegisterIpAndMakeDerivativeResponse,
    RegisterIpResponse,CreateIpAssetWithPilTermsResponse } from '@story-protocol/core-sdk'
import { http } from 'viem'
import { privateKeyToAccount, Address, Account } from 'viem/accounts'
import { uploadJSONToIPFS } from './utils/uploadToIpfs'
import { createHash } from 'crypto'
import { NFTContractAddress, NonCommercialSocialRemixingTermsId, RPCProviderUrl, CurrencyAddress } from './utils/utils'
import { mintNFT } from './utils/mintNFT'

const main = async function () {
    
    const privateKey: Address = `0x${process.env.WALLET_PRIVATE_KEY}`
    const account: Account = privateKeyToAccount(privateKey)

    const config: StoryConfig = {
        account: account,
        transport: http(process.env.RPC_PROVIDER_URL),
        chainId: 'iliad',
    }
    const client = StoryClient.newClient(config)

    const ipMetadata : IpMetadata = client.ipAsset.generateIpMetadata({
        title: 'My IP Asset',
        description: 'This is a test IP asset',
        watermarkImg: 'https://picsum.photos/200',
        attributes: [
            {
                key: 'Rarity',
                value: 'Legendary',
            },
        ],
    })

    const nftMetadata = {
        name: 'NFT representing ownership of IP Asset',
        description: 'This NFT represents ownership of an IP Asset',
        image: 'https://picsum.photos/200',
    }

    const ipIpfsHash = await uploadJSONToIPFS(ipMetadata)
    const ipHash = createHash('sha256').update(ipIpfsHash).digest('hex')

    const nftIpfsHash = await uploadJSONToIPFS(nftMetadata)
    const nftHash = createHash('sha256').update(nftIpfsHash).digest('hex')

    console.log(`Generating Parent IP`)
    const ParentIPA: CreateIpAssetWithPilTermsResponse = await client.ipAsset.mintAndRegisterIpAssetWithPilTerms({
        nftContract: process.env.SPG_NFT_CONTRACT_ADDRESS as Address,
        pilType: PIL_TYPE.COMMERCIAL_REMIX,
        mintingFee: 1,
        currency: CurrencyAddress,
        commercialRevShare:5,
        ipMetadata: {
            ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
            ipMetadataHash: `0x${ipHash}`,
            nftMetadataURI: `https://ipfs.io/ipfs/${nftIpfsHash}`,
            nftMetadataHash: `0x${nftHash}`,
        },
        txOptions: { waitForTransaction: true },
    })

    // console.log(`Root IPA created at transaction hash ${ParentIPA.txHash}, IPA ID: ${ParentIPA.ipId}, License Terms ID: ${ParentIPA.licenseTermsId}`)
    // console.log(`View on the explorer: https://explorer.story.foundation/ipa/${ParentIPA.ipId}`)
    
    // console.log(`Generating Child IP1`)
    // const ChildIPA: RegisterDerivativeResponse = await client.ipAsset.mintAndRegisterIpAndMakeDerivative({
    //     nftContract: process.env.SPG_NFT_CONTRACT_ADDRESS as Address,
    //     derivData: {
    //         parentIpIds: [ParentIPA.ipId!],
    //         licenseTermsIds: [ParentIPA.licenseTermsId!],
    //     },
    //     ipMetadata: {
    //         ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
    //         ipMetadataHash: `0x${ipHash}`,
    //         nftMetadataURI: `https://ipfs.io/ipfs/${nftIpfsHash}`,
    //         nftMetadataHash: `0x${nftHash}`,
    //     },
    //     txOptions: { waitForTransaction: true }
    // })

    // console.log(`Deriv IPA created at transaction hash ${ChildIPA.txHash}, IPA Deriv ID: ${ChildIPA.childIpId}`)
    // console.log(`View on the explorer: https://explorer.story.foundation/ipa/${ChildIPA.childIpId}`)

    // const AttachResponse = await client.license.attachLicenseTerms({
    //     ipId: ChildIPA.childIpId as Address,
    //     licenseTemplate: "0x8BB1ADE72E21090Fc891e1d4b88AC5E57b27cB31",
    //     licenseTermsId: ParentIPA.licenseTermsId!,
    //     txOptions: { waitForTransaction: true }
    // })

    // console.log(`License Terms attached at transaction hash ${AttachResponse.txHash}`)

    // console.log(`Generating Child IP2`)
    // const ChildIPA2: RegisterDerivativeResponse = await client.ipAsset.mintAndRegisterIpAndMakeDerivative({
    //     nftContract: process.env.SPG_NFT_CONTRACT_ADDRESS as Address,
    //     derivData: {
    //         parentIpIds: [ChildIPA.childIpId!],
    //         licenseTermsIds: [ParentIPA.licenseTermsId!],
    //     },
    //     ipMetadata: {
    //         ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
    //         ipMetadataHash: `0x${ipHash}`,
    //         nftMetadataURI: `https://ipfs.io/ipfs/${nftIpfsHash}`,
    //         nftMetadataHash: `0x${nftHash}`,
    //     },
    //     txOptions: { waitForTransaction: true }
    // })

    // console.log(`Deriv IPA created at transaction hash ${ChildIPA2.txHash}, IPA Deriv ID: ${ChildIPA2.childIpId}`)
    // console.log(`View on the explorer: https://explorer.story.foundation/ipa/${ChildIPA2.childIpId}`)

    // const AttachResponse2 = await client.license.attachLicenseTerms({
    //     ipId: ChildIPA2.childIpId as Address,
    //     licenseTemplate: "0x8BB1ADE72E21090Fc891e1d4b88AC5E57b27cB31",
    //     licenseTermsId: ParentIPA.licenseTermsId!,
    //     txOptions: { waitForTransaction: true }
    // })

    // console.log(`License Terms attached at transaction hash ${AttachResponse.txHash}`)

    // console.log(`Generating Child IP3`)
    // const ChildIPA3: RegisterDerivativeResponse = await client.ipAsset.mintAndRegisterIpAndMakeDerivative({
    //     nftContract: process.env.SPG_NFT_CONTRACT_ADDRESS as Address,
    //     derivData: {
    //         parentIpIds: [ChildIPA2.childIpId!],
    //         licenseTermsIds: [ParentIPA.licenseTermsId!],
    //     },
    //     ipMetadata: {
    //         ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
    //         ipMetadataHash: `0x${ipHash}`,
    //         nftMetadataURI: `https://ipfs.io/ipfs/${nftIpfsHash}`,
    //         nftMetadataHash: `0x${nftHash}`,
    //     },
    //     txOptions: { waitForTransaction: true }
    // })

    // console.log(`Deriv IPA created at transaction hash ${ChildIPA3.txHash}, IPA Deriv ID: ${ChildIPA3.childIpId}`)
    // console.log(`View on the explorer: https://explorer.story.foundation/ipa/${ChildIPA3.childIpId}`)


    // const parentVault = client.royalty.getRoyaltyVaultAddress("0xAe91A48C53AebbAd1a2112Bbf13C48052F384D40")
    // console.log(`Parent Vault Address: ${(await parentVault).toString()}`)

    // const childVault = client.royalty.getRoyaltyVaultAddress(ChildIPA.childIpId!)
    // console.log(`Child Vault Address: ${(await childVault).toString()}`)

    // const childVault2 = client.royalty.getRoyaltyVaultAddress(ChildIPA2.childIpId!)
    // console.log(`Child2 Vault Address: ${(await childVault2).toString()}`)

    // const childVault3 = client.royalty.getRoyaltyVaultAddress(ChildIPA3.childIpId!)
    // console.log(`Child3 Vault Address: ${(await childVault3).toString()}`)
    const ip3 = "0x652B9FB50Ff90E48aD84114736453A671538D764"
    const ip4 = "0x7316D2c9565e9b1166F1AF2Cc7F7d607a6a2c3A0"
    const ip2 = "0x2ED334D02125E6508539b73CAe52BD375C4809AA"
    
    // // 5. Collect Royalty Tokens
    // //
    // // Docs: https://docs.story.foundation/docs/collect-and-claim-royalty#collect-royalty-tokens
    const collectRoyaltyTokensResponse: CollectRoyaltyTokensResponse = await client.royalty.collectRoyaltyTokens({
        parentIpId: ip3 as Address, 
        royaltyVaultIpId: ip4 as Address,
        txOptions: { waitForTransaction: true },
    })
    console.log(
        `Collected royalty token ${collectRoyaltyTokensResponse.royaltyTokensCollected} at transaction hash ${collectRoyaltyTokensResponse.txHash}`
    )
   // // 6. Claim Revenue
    // //
    // Docs: https://docs.story.foundation/docs/collect-and-claim-royalty#claim-revenue
    const snapshotResponse: SnapshotResponse = await client.royalty.snapshot({
        royaltyVaultIpId: ip3 as Address,
        txOptions: { waitForTransaction: true },
    })
    console.log(`Took a snapshot with ID ${snapshotResponse.snapshotId} at transaction hash ${snapshotResponse.txHash}`)
    const claimRevenueResponse: ClaimRevenueResponse = await client.royalty.claimRevenue({
        snapshotIds: [snapshotResponse.snapshotId as bigint],
        royaltyVaultIpId: ip3 as Address,
        token: "0x91f6F05B08c16769d3c85867548615d270C42fC7",
        txOptions: { waitForTransaction: true },
    })
    console.log(`Claimed revenue ${claimRevenueResponse.claimableToken} at transaction hash ${claimRevenueResponse.txHash}`)
    // const payRoayltyResponse = client.royalty.payRoyaltyOnBehalf({
    //     receiverIpId : ip3 as Address,
    //     payerIpId : ip4 as Address,
    //     token : CurrencyAddress,
    //     amount : 10 *(10 ** 18),
    //     txOptions : {waitForTransaction : true}
    // })

    // console.log(`Pay ROYALT at transaction hash ${(await payRoayltyResponse).txHash}`)
    

}

main()
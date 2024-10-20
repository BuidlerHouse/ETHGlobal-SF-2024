import { Address, toHex } from 'viem';
import { PIL_TYPE, useIpAsset } from '@story-protocol/react-sdk';
import { mintNFT } from './utils/mintNFT';
import { uploadJSONToIPFS } from './utils/uploadToIpfs';
import { createHash } from 'crypto';
import { CurrencyAddress } from './utils/utils'
const { mintAndRegisterIpAssetWithPilTerms, generateIpMetadata} = useIpAsset();
export default async function RegisterIPA(address:string) {
    
    return
    const ipMetadata = generateIpMetadata({
      title: 'Code Block',
      description: 'This is a code block for IP',
      watermarkImg: 'https://raw.githubusercontent.com/BuidlerHouse/dAIp/refs/heads/main/docs/logo.png',
      attributes: [
          {
              key: 'CodeHash',
              value: "https://testnet.suivision.xyz/object/0x12fabab08a72acd508ebbfa1ab4f6379777c6fa2d7c4c4438e1f8a158883d9c5"
          
          }
      ],
    })

    const nftMetadata = {
        name: 'Ownership of the Code Block',
        description: 'This NFT represents ownership of this Code Block as an IP',
        image: 'https://raw.githubusercontent.com/BuidlerHouse/dAIp/refs/heads/main/docs/logo.png',
    }

    const ipIpfsHash = await uploadJSONToIPFS(ipMetadata)
    const ipHash = createHash('sha256').update(ipIpfsHash).digest('hex')

    const nftIpfsHash = await uploadJSONToIPFS(nftMetadata)
    const nftHash = createHash('sha256').update(nftIpfsHash).digest('hex')

    console.log(`Generating Parent IP`)
    const ParentIPA = await mintAndRegisterIpAssetWithPilTerms({
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

    console.log(`Root IPA created at transaction hash ${ParentIPA.txHash}, IPA ID: ${ParentIPA.ipId}, License Terms ID: ${ParentIPA.licenseTermsId}`)
    console.log(`View on the explorer: https://explorer.story.foundation/ipa/${ParentIPA.ipId}`)
    
}

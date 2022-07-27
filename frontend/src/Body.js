import React from 'react'
import styled from 'styled-components'
import { mintNFT } from './utils/interact'
import { useState } from 'react'

function Body() {

    const [metadataName, setMetadataName] = useState('GSB');
    const [coupon, setCoupon] = useState('GSB');
    const [isTransactionDone, setIsTransactionDone] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('')

    const connectWallet = () => {
        return new Promise((resolve, reject) => {

        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if(isMobile){
            alert("Currently we are not supporting mobile transactions, please use a computer.");
        }else{
            if (window.ethereum && window.ethereum.isMetaMask) {
            window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then((result) => {
                    console.log(result[0]);
                    resolve(result[0]);
                })
                .catch((error) => {
                    alert(error.message);
                });
            } else {
                console.log("Need to install MetaMask");
                alert("You need to install metamask");
                reject(false)
            }
        }
        })

      }



    const triggerMint = () => {
        connectWallet().then((walletAddress) => {
            mintNFT(walletAddress, coupon).then((receipt) => {
                setMessage(receipt.events.CreatedTNFT.transactionHash);

            })
        })
    }


    return (
        <>
        <Container>
            <Video autoPlay muted loop>
                <source src="video/generation_one_video.mp4" type="video/mp4"/>
            </Video>
            <InputPart >

                <CouponInput onChange={(e) => setCoupon(e.target.value)} placeholder="Access Code">

                </CouponInput>
                <MintButton onClick={triggerMint}>
                    MINT
                </MintButton>
            </InputPart>
        </Container>
        <Warning>
            WARNING: Once you provided the coupon and click the MINT button, your coupon will be unusable whether you approve or reject the transaction! 
        </Warning>
        <Hash>
            {message}
        </Hash>
        </>
    )
}

const Container = styled.div`
    margin-top: 100px;
    display:flex;
    justify-content: center;
    column-gap: 100px;
    @media (max-width: 670px) {
        flex-direction: column;
        align-items: center;
        margin-top: 50px;
    }
`


const Video = styled.video`
    width: 300px;
    height: auto;
`

const InputPart = styled.div`
    display: flex;
    flex-direction: column;
    overflow: none;
    max-height: 330px;
    @media (max-width: 670px) {
        margin-top: 30px;
    }
    margin-bottom: 40px;

`

const NameInput = styled.input`
    border: none;
    border-bottom: 1px solid #fff;
    font-size: 18px;
    color: #fff;
    padding-bottom: 10px;
    flex: 1;
    margin-bottom: 40px;
    :focus
        {
            border: none;
            outline: none;
            border-bottom: 1px solid #fff;

        }
`

const CouponInput = styled(NameInput)``



const MintButton = styled.button`
    color: #5AA1C2;
    border: 1px solid #5AA1C2;
    padding: 15px 80px;
    cursor: pointer;
    font-size: 20px;
    margin-top: 20%;
    @media (max-width: 670px) {
        margin-top: 10px;
    }

`

const Message = styled.div`
    color: #fff;
    display: flex;
    justify-content: center;
    padding-left: 50px;
    padding-right: 50px;
    p{
        overflow-wrap: break-word !important;
        width: 100%;
        text-align: center;
    }
`

const MembershipClosed = styled.div`
    display: flex;
    justify-content: center;
    font-size: 30px;
    text-align: center;
    color: #fff;
`

const Warning = styled.div`
    display: flex;
    justify-content: center;
    font-size: 15px;
    text-align: center;
    color: red;
    margin-top: 40px;
`
const Hash = styled.div`
    display: flex;
    justify-content: center;
    font-size: 15px;
    text-align: center;
    color: white;
    margin-top: 40px;
`


export default Body

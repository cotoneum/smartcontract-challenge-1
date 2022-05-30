import { ethers } from 'hardhat'
import { Contract } from 'ethers'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
// Replace CHALLENGE_CONTRACT with a contract name you want to deploy
import { OpenVaultChallenge } from '../typechain-types'

const toWei = ethers.utils.parseEther

/// Template
describe('Challenge Name', async function () {
  let player: SignerWithAddress
  let challenge: OpenVaultChallenge

  before(async function () {
    ;[player] = await ethers.getSigners()

    const Challenge = await ethers.getContractFactory('OpenVaultChallenge')
    challenge = (await Challenge.deploy({
      value: toWei('1'),
    })) as OpenVaultChallenge
  })

  it('Attack', async function () {
    // describe how to exploit the challenge
    const PseudoEOA = await ethers.getContractFactory('PseudoEOA', player)
    await PseudoEOA.deploy(challenge.address)
    expect(await challenge.isSolved()).to.be.true
  })
})

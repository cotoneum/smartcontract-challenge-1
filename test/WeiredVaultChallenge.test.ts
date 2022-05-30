import { ethers } from 'hardhat'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { WeirdVaultChallenge } from '../typechain-types'
// Replace CHALLENGE_CONTRACT with a contract name you want to deploy
// import { CHALLENGE_CONTRACT } from '../typechain-types'

const toWei = ethers.utils.parseEther

/// Template
describe('WeirdVaultChallenge', async function () {
  let player: SignerWithAddress
  let challenge: WeirdVaultChallenge

  before(async function () {
    ;[player] = await ethers.getSigners()

    const Challenge = await ethers.getContractFactory('WeirdVaultChallenge')
    challenge = (await Challenge.deploy()) as WeirdVaultChallenge
  })

  it('Attack', async function () {
    // describe how to exploit the challenge
    let attacker
    const Attacker = await ethers.getContractFactory('ForcedRemittance')
    attacker = await Attacker.deploy(challenge.address, { value: toWei('1') })
    await challenge.complete()
    expect(await challenge.isSolved()).to.be.true
  })
})

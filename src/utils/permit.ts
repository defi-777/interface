import { Web3Provider } from '@ethersproject/providers'

const DAI_PERMIT_FN = '8fcbaf0c'
const ERC2612_PERMIT_FN = 'd505accf'

export enum PermitType {
  NO_PERMIT,
  ERC2612,
  DAI
}

export async function getPermitType(contract: string, library: Web3Provider): Promise<PermitType> {
  const code = await library.getCode(contract)

  if (code.indexOf(ERC2612_PERMIT_FN) !== -1) {
    return PermitType.ERC2612
  }
  if (code.indexOf(DAI_PERMIT_FN) !== -1) {
    return PermitType.DAI
  }
  return PermitType.NO_PERMIT
}

/* eslint-disable no-useless-constructor */
import { Ideia } from '../../../entities/Ideia'
import { IEquipeRepository } from '../../../infra/seqInterfaces/IEquipeRepository'
import { IIdeiaRepository } from '../../../infra/seqInterfaces/IIdeiaRepository'
import { DataNotFound } from '../../../main/errors-type/DataNotFound'
import { UseCase } from '../../../main/protocols/usecase'
import { VerifyUsuarioUseCase } from '../../Usuario/VerifyUsuario/VerifyUsuarioUseCase'

export class ListIdeiasUseCase implements UseCase {
  constructor (
    private ideiasRepository: IIdeiaRepository,
    private equipeRepository: IEquipeRepository,

    private verifyUserUseCase: VerifyUsuarioUseCase
  ) {}

  async execute (data: {idEquipe: number, idUser: number}): Promise<Ideia[]> {
    await this.verifyUserUseCase.execute(data.idUser)

    const equipe = await this.equipeRepository.findById(data.idEquipe, data.idUser)
    if (!equipe) throw new DataNotFound('Equipe')

    const ideias = await this.ideiasRepository.findAll(data.idEquipe, data.idUser)

    return ideias
  }
}

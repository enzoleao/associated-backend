import { Injectable } from '@nestjs/common';
import { AssociateAddress } from '@prisma/client';
import { ICreateAssociateAddress } from '../interfaces/create-associate-address.interface';

export interface IAssociateAddressRepository {

    createAssociateAddress(data: ICreateAssociateAddress): Promise<AssociateAddress>;
}

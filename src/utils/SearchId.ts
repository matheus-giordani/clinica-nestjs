import { HttpStatus } from '@nestjs/common';
import { ApiError } from './MsgError';
import { PrismaClient } from '@prisma/client';

function searchId(table: string, id: string): boolean {
  try {
    const prisma = new PrismaClient();
    return prisma[table].findUnique({
      where: {
        id,
      },
    })
      ? true
      : false;
  } catch (error) {
    throw new ApiError('Id not found', HttpStatus.NOT_FOUND);
  }
}

export default searchId;

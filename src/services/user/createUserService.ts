import { prismaClient } from "../../prisma";
import { hash } from 'bcryptjs'

enum UserRole {
  GARBAGE_COLLECTOR = "GARBAGE_COLLECTOR",
  COLLECTION_COMPANY = "COLLECTION_COMPANY",
}

interface UserRequest {
  name: string;
  role: UserRole;
  email: string;
  password: string;

}


export class CreateUserService {
  async execute({name, role,email, password}: UserRequest){

    if(!role) {
      throw new Error('Select a role')
    }

    if(!email) {
      throw new Error('Email incorrect')

    }

    //Verificar se esse email já está cadastrado na plataforma
    const userAlreadyExists = await prismaClient.user.findFirst({
      where:{
        email: email
      }
    })

   
    if(userAlreadyExists){
      throw new Error("User already exists")
    }


    const passwordHash = await hash(password, 8)

    const user = await prismaClient.user.create({
      data:{
        name: name,
        email: email,
        role: role,
        password: passwordHash,
      },
      select:{
        id: true,
        name: true,       
        email: true,
        role:true,
      }
    })
    return user;
  }
}
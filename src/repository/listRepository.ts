import { PrismaClient } from "@prisma/client";

import { ListDTOS, UpdateListDTOS, CreateListDTOS } from "../dtos/listDtos";

const client = new PrismaClient();

export default{

    async list(): Promise<ListDTOS[]>{
        const response = await client.list.findMany({
            include:{
                tasks:true
            }
        });

        return response;
    },
    async create(data: CreateListDTOS):Promise<CreateListDTOS>{
        const response = await client.list.create({
            data
        })

        return response;
    }
   
}
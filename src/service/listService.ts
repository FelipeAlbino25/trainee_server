import listRepository from "../repository/listRepository";
import { ListDTOS, UpdateListDTOS, CreateListDTOS } from "../dtos/listDtos";
import { List } from "../../generated/prisma";

export default{
    async create({name}:CreateListDTOS):Promise<CreateListDTOS>{
        const newList = await listRepository.create({
            name
        })

        return newList;
    },

    async list():Promise<ListDTOS[]>{
        const lists = await listRepository.list();
        return lists;
    }
}
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
    },
    async update({id, name}:UpdateListDTOS):Promise<UpdateListDTOS>{
        const updatedList = await listRepository.update({
            id,
            name
        });
        return updatedList;
    },
    async delete(id: string): Promise<Boolean> {
        const response = await listRepository.delete(id);
        return response;
    },
    async findById(id: string): Promise<ListDTOS | null> {
        const list = await listRepository.findById(id);
        if (list === null) {
            throw new Error("List not found");
        }
        return list;
    }
}
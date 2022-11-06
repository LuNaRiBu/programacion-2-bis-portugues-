import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

class SearchUserService {
  async search(search: string) {
    if (!search) {
      throw new Error("Por favor complete el campo de busqueda");
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository
      .createQueryBuilder()
      .where("username like :search", { search: `%${search}%` })
      .orWhere("email like :search", { search: `%${search}%` })
      .orWhere("telefono like :search", { search: `%${search}%` })
      .orWhere("ciudad like :search", { search: `%${search}%` })
      .orWhere("estado like :search", { search: `%${search}%` })
      .getMany();

    return user;

  }
}

export { SearchUserService };
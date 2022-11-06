import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

interface IUser {
  username: string;
  email: string;
  telefono: string;
  ciudad: string;
  estado: string;
}

class CreateUserService {
  async create({ username, email, telefono, ciudad, estado }: IUser) {
    if (!username || !email || !telefono || !ciudad || !estado) {
      throw new Error("Por favor rellan todos los campos");
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const usernameAlreadyExists = await usersRepository.findOne({ username });

    if (usernameAlreadyExists) {
      throw new Error("El nombre de usuario ya esta registrado");
    }

    const emailAlreadyExists = await usersRepository.findOne({ email });

    if (emailAlreadyExists) {
      throw new Error("Correo ya registrado");
    }

    const user = usersRepository.create({ username, email, telefono, ciudad, estado });

    await usersRepository.save(user);

    return user;

  }
}

export { CreateUserService };
import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { username, email, telefono, ciudad, estado } = request.body;

    const createUserService = new CreateUserService();

    try {
      await createUserService.create({
        username,
        email,
        telefono,
        ciudad,
        estado
      }).then(() => {
        response.render("message", {
          message: "Usuario registrado correctamente"
        });
      });
    } catch (err) {
      response.render("message", {
        message: `Error al registrar el usuario: ${err.message}`
      });
    }

  }
}

export { CreateUserController };
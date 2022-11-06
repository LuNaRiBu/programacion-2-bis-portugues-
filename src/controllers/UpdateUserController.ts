import { Request, Response } from "express";
import { UpdateUserService } from "../services/UpdateUserService";

class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { id, username, email, telefono, ciudad, estado } = request.body;

    const updateUserService = new UpdateUserService();

    try {
      await updateUserService.update({ id, username, email, telefono, ciudad, estado }).then(() => {
        response.render("message", {
          message: "Usuario actualizado correctamente"
        });
      });
    } catch (err) {
      response.render("message", {
        message: `Error al actualizar usuario: ${err.message}`
      });
    }

  }
}

export { UpdateUserController };
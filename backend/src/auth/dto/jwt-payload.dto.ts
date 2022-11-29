import { User } from "src/users/users.model";

export class JwtPayloadDto implements Readonly<JwtPayloadDto> {
  declare user_id: string;
  declare email: string;

  public static generate(user: User) {
    const jwt = new JwtPayloadDto();
    jwt.user_id = user.id;
    jwt.email = user.email;
    return { ...jwt };
  }
}

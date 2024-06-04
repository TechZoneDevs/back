export class CreateUserDto {
  name?: string;
  email: string;
  password: string;
  imgAvatar?: string;
  biografia?: string;
  status?: boolean;
  idLocation: number;
}

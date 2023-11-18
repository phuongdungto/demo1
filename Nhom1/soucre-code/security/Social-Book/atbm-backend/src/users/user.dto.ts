export class CreateUserDTO {
    fullname?: string
    email: string
    password: string
}

export class LoginDTO {
    email: string
    password: string
}

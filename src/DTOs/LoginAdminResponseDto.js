class LoginAdminResponseDto
{
    constructor(adminDto, authToken)
    {
        this.adminDto = adminDto;
        this.authToken = authToken;
    }
}

export default LoginAdminResponseDto;
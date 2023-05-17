import HttpClientService from './HttpClientService';

class AuthService 
{
    async login(email, password)
    {
        return HttpClientService.postAsync({ email, password }, '/Auth/login/admin');
    }
}

export default AuthService;
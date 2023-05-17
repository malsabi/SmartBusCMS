import HttpClientService from './HttpClientService';

class ParentService
{
    async getParents(authToken)
    {
        return new HttpClientService().getAsync('/Parent', authToken);
    }

    async getParent(authToken, parentID)
    {
        return new HttpClientService().getAsync('/Parent/{0}', authToken, parentID);
    }

    async createParent(authToken, parentDto)
    {
        return new HttpClientService().postAsync(parentDto, '/Parent', authToken);
    }

    async updateParent(authToken, parentID, parentDto)
    {
        return new HttpClientService().putAsync(parentDto, '/Parent/{0}', authToken, parentID);
    }

    async deleteParent(authToken, parentID)
    {
        return new HttpClientService().deleteAsync('/Parent/{0}', authToken, parentID);
    }
}

export default ParentService;
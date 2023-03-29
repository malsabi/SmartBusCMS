import HttpClientService from './HttpClientService';

class ParentService
{
    async getParents(authToken)
    {
        return HttpClientService.getAsync('/Parent', authToken);
    }

    async getParent(authToken, parentID)
    {
        return HttpClientService.getAsync('/Parent/{0}', authToken, parentID);
    }

    async createParent(authToken, parentDto)
    {
        return HttpClientService.postAsync(parentDto, '/Parent', authToken);
    }

    async updateParent(authToken, parentID, parentDto)
    {
        return HttpClientService.putAsync(parentDto, '/Parent/{0}', authToken, parentID);
    }

    async deleteParent(authToken, parentID)
    {
        return HttpClientService.deleteAsync('/Parent/{0}', authToken, parentID);
    }
}

export default new ParentService();
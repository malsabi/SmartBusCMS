import HttpClientService from './HttpClientService';

class BusService
{
    async getBuses(authToken)
    {
        return HttpClientService.getAsync('/Bus', authToken);
    }

    async getBus(authToken, busID)
    {
        return HttpClientService.getAsync('/Bus/{0}', authToken, busID);
    }

    async createBus(authToken, busDto)
    {
        return HttpClientService.postAsync(busDto, '/Bus', authToken);
    }

    async updateBus(authToken, busID, busDto)
    {
        return HttpClientService.putAsync(busDto, '/Bus/{0}', authToken, busID);
    }

    async deleteBus(authToken, busID)
    {
        return HttpClientService.deleteAsync('/Bus/{0}', authToken, busID);
    }
}

export default new BusService();
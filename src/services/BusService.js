import HttpClientService from './HttpClientService';

class BusService
{
    async getBuses(authToken)
    {
        return new HttpClientService().getAsync('/Bus', authToken);
    }

    async getBus(authToken, busID)
    {
        return new HttpClientService().getAsync('/Bus/{0}', authToken, busID);
    }

    async createBus(authToken, busDto)
    {
        return new HttpClientService().postAsync(busDto, '/Bus', authToken);
    }

    async updateBus(authToken, busID, busDto)
    {
        return new HttpClientService().putAsync(busDto, '/Bus/{0}', authToken, busID);
    }

    async deleteBus(authToken, busID)
    {
        return new HttpClientService().deleteAsync('/Bus/{0}', authToken, busID);
    }
}

export default BusService;
import HttpClientService from './HttpClientService';

class DriverService
{
    async getDrivers(authToken)
    {
        return HttpClientService.getAsync('/BusDriver', authToken);
    }

    async getDriver(authToken, DriverID)
    {
        return HttpClientService.getAsync('/BusDriver/{0}', authToken, DriverID);
    }

    async createDriver(authToken, driverDto)
    {
        return HttpClientService.postAsync(driverDto, '/BusDriver', authToken);
    }

    async updateDriver(authToken, driverID, driverDto)
    {
        return HttpClientService.putAsync(driverDto, '/BusDriver/{0}', authToken, driverID);
    }

    async deleteDriver(authToken, driverID)
    {
        return HttpClientService.deleteAsync('/BusDriver/{0}', authToken, driverID);
    }
}

export default new DriverService();
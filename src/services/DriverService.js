import HttpClientService from './HttpClientService';

class DriverService
{
    async getDrivers(authToken)
    {
        return new HttpClientService().getAsync('/BusDriver', authToken);
    }

    async getDriver(authToken, DriverID)
    {
        return new HttpClientService().getAsync('/BusDriver/{0}', authToken, DriverID);
    }

    async createDriver(authToken, driverDto)
    {
        return new HttpClientService().postAsync(driverDto, '/BusDriver', authToken);
    }

    async updateDriver(authToken, driverID, driverDto)
    {
        return new HttpClientService().putAsync(driverDto, '/BusDriver/{0}', authToken, driverID);
    }

    async deleteDriver(authToken, driverID)
    {
        return new HttpClientService().deleteAsync('/BusDriver/{0}', authToken, driverID);
    }
}

export default DriverService;
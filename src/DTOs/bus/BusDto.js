class BusDto {
    constructor (id, licenseNumber, capacity, currentLocation, destinationType, isInService)
    {
        this.id = id;
        this.licenseNumber = licenseNumber;
        this.capacity = capacity;
        this.currentLocation = currentLocation;
        this.destinationType = destinationType;
        this.isInService = isInService;
    }
}

export default BusDto;
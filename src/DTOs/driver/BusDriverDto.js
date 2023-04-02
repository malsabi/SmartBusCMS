class BusDriverDto {
    
    constructor(id, firstName, lastName, email, driverID, phoneNumber, country, password, busID)
    {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.driverID = driverID;
        this.phoneNumber = phoneNumber;
        this.country = country;
        this.password = password;
        this.busID = busID;
    }
}

export default BusDriverDto;
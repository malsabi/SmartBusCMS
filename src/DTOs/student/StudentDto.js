class StudentDto
{
    constructor(id, faceRecognitionID, image, firstName, lastName, gender, gradeLevel, address, belongsToBusID, lastSeen, isAtSchool, isAtHome, isOnBus, parentID, busID)
    {
        this.id = id;
        this.faceRecognitionID = faceRecognitionID;
        this.image = image;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.gradeLevel = gradeLevel;
        this.address = address;
        this.belongsToBusID = belongsToBusID;
        this.lastSeen = lastSeen;
        this.isAtSchool = isAtSchool;
        this.isAtHome = isAtHome;
        this.isOnBus = isOnBus;
        this.parentID = parentID;
        this.busID = busID;
    }
}

export default StudentDto;
class NotificationDto {

    constructor(id, title, message, timestamp, isOpened, parentID, busID)
    {
        this.id = id;
        this.title = title;
        this.message = message;
        this.timestamp = timestamp;
        this.isOpened = isOpened;
        this.parentID = parentID;
        this.busID = busID;
    }
}

export default NotificationDto;
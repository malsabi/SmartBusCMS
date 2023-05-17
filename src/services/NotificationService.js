import HttpClientService from './HttpClientService';

class NotificationService
{
    async getNotifications(authToken)
    {
        return new HttpClientService().getAsync('/Notification', authToken);
    }

    async getNotification(authToken, notificationID)
    {
        return new HttpClientService().getAsync('/Notification/{0}', authToken, notificationID);
    }

    async createNotification(authToken, notificationDto)
    {
        return new HttpClientService().postAsync(notificationDto, '/Notification', authToken);
    }

    async updateNotification(authToken, notificationID, notificationDto)
    {
        return new HttpClientService().putAsync(notificationDto, '/Notification/{0}', authToken, notificationID);
    }

    async deleteNotification(authToken, notificationID)
    {
        return new HttpClientService().deleteAsync('/Notification/{0}', authToken, notificationID);
    }
}

export default NotificationService;
import HttpClientService from './HttpClientService';

class NotificationService
{
    async getNotifications(authToken)
    {
        return HttpClientService.getAsync('/Notification', authToken);
    }

    async getNotification(authToken, notificationID)
    {
        return HttpClientService.getAsync('/Notification/{0}', authToken, notificationID);
    }

    async createNotification(authToken, notificationDto)
    {
        return HttpClientService.postAsync(notificationDto, '/Notification', authToken);
    }

    async updateNotification(authToken, notificationID, notificationDto)
    {
        return HttpClientService.putAsync(notificationDto, '/Notification/{0}', authToken, notificationID);
    }

    async deleteNotification(authToken, notificationID)
    {
        return HttpClientService.deleteAsync('/Notification/{0}', authToken, notificationID);
    }
}

export default new NotificationService();
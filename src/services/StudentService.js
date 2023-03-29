import HttpClientService from './HttpClientService';

class StudentService
{
    async getStudents(authToken)
    {
        return HttpClientService.getAsync('/Student', authToken);
    }

    async getStudent(authToken, studentID)
    {
        return HttpClientService.getAsync('/Student/{0}', authToken, studentID);
    }

    async createStudent(authToken, studentDto)
    {
        return HttpClientService.postAsync(studentDto, '/Student', authToken);
    }

    async updateStudent(authToken, studentID, studentDto)
    {
        return HttpClientService.putAsync(studentDto, '/Student/{0}', authToken, studentID);
    }

    async deleteStudent(authToken, studentID)
    {
        return HttpClientService.deleteAsync('/Student/{0}', authToken, studentID);
    }
}

export default new StudentService();
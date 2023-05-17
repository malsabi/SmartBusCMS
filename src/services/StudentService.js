import HttpClientService from './HttpClientService';

class StudentService
{
    async getStudents(authToken)
    {
        return new HttpClientService().getAsync('/Student', authToken);
    }

    async getStudent(authToken, studentID)
    {
        return new HttpClientService().getAsync('/Student/{0}', authToken, studentID);
    }

    async createStudent(authToken, studentDto)
    {
        return new HttpClientService().postAsync(studentDto, '/Student', authToken);
    }

    async updateStudent(authToken, studentID, studentDto)
    {
        return new HttpClientService().putAsync(studentDto, '/Student/{0}', authToken, studentID);
    }

    async deleteStudent(authToken, studentID)
    {
        return new HttpClientService().deleteAsync('/Student/{0}', authToken, studentID);
    }
}

export default StudentService;
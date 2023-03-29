class HttpResponseModel
{
    constructor(isSuccess, response, problemDetails)
    {
        this.isSuccess = isSuccess;
        this.response = response;
        this.problemDetails = problemDetails;
    }
}
export default HttpResponseModel;
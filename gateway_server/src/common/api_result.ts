class ApiError extends Error {
    result = "failed";

    code: string;
    message: string;

    constructor(code: string, message: string) {
        super(message);
        this.result = this.result;
        this.code = code;
    }
}

class ApiSuccess {
    result = "success";
    code = 0;
    message = "";

    constructor(result = "success", code = 0, message = "") {
        this.result = result;
        this.code = code;
        this.message = message;
    }
}



export class ApiResult{
    IS_OK = new ApiSuccess();
    UNKNOWN_ERROR = new ApiError("UNKNOWN_ERROR", "알 수 없는 오류가 발생했습니다.");
    SESSION_EXPIRED = new ApiError("SESSION_EXPIRED", "세션이 만료되었습니다.");
    INVALID_SESSION = new ApiError("INVALID_SESSION", "유효하지 않은 세션입니다.");

}
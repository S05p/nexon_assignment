export class ApiError extends Error {
    result: string;
    code: string;
    message: string;

    constructor(code: string, message: string) {    
        super(message);
        this.result = "failed";
        this.code = code;
        this.message = message;
    }
}

export class ApiSuccess {
    result: string;
    code: string;
    message: string;

    constructor(result: string = "success", code: string = "0", message: string = "") {
        this.result = result;
        this.code = code;
        this.message = message;
    }
}



export class ApiResult{
    static IS_OK = new ApiSuccess();
    static UNKNOWN_ERROR = new ApiError("U001", "알 수 없는 오류가 발생했습니다.");
    static SESSION_EXPIRED = new ApiError("U002", "세션이 만료되었습니다.");
    static INVALID_SESSION = new ApiError("U003", "유효하지 않은 세션입니다.");
    static INVALID_ROLE = new ApiError("U004", "권한이 없습니다.");
}

export function make_api_result(api_result: ApiSuccess | ApiError, data: Record<string, any> | undefined = undefined) {
    if (api_result instanceof ApiSuccess) {
        return {
            result: "success",
            code: 0,
            message: "",
            data: data
        }
    }
    else {
        return {
            result: "failed",
            code: api_result.code,
            message: api_result.message,
            data: data
        }
    }
}

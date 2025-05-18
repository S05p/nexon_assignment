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

    // Auth
    static UNKNOWN_ERROR = new ApiError("U001", "알 수 없는 오류가 발생했습니다.");
    static SESSION_EXPIRED = new ApiError("U002", "세션이 만료되었습니다.");
    static INVALID_SESSION = new ApiError("U003", "유효하지 않은 세션입니다.");
    static INVALID_ROLE = new ApiError("U004", "권한이 없습니다.");

    // Bad Request
    static BAD_REQUEST = new ApiError("B001", "잘못된 요청입니다.");
    static NOT_FOUND = new ApiError("B002", "요청하신 경로를 찾을 수 없습니다.");

    // User
    static USER_ALREADY_EXISTS = new ApiError("A001", "해당 아이디는 이미 존재합니다.");
    static USER_NOT_FOUND = new ApiError("A002", "해당 아이디는 존재하지 않습니다.");
    static INVALID_PASSWORD = new ApiError("A003", "비밀번호가 일치하지 않습니다.");

    // Event
    static EVENT_ALREADY_EXISTS = new ApiError("E001", "해당 이벤트는 이미 존재합니다.");
    static EVENT_NOT_FOUND = new ApiError("E002", "해당 이벤트는 존재하지 않습니다.");
    static EVENT_FOR_USER_ALREADY_EXISTS = new ApiError("E003", "해당 이벤트 보상 받은 기록이 이미 존재합니다.");

    
}

export function make_api_result(api_result: ApiSuccess | ApiError, data: Record<string, any> | undefined = {}) {
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

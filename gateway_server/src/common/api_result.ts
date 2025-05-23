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

export class MsaFailed extends ApiError {
    data: any | undefined;

    constructor(code: string, message: string, data: any | undefined = {}) {
        super(code, message);
        this.result = "msa_failed";
        this.data = data;
    }
}
export class ApiResult {
    static get IS_OK() { return new ApiSuccess(); }
  
    // Auth
    static get UNKNOWN_ERROR() { return new ApiError("U001", "알 수 없는 오류가 발생했습니다."); }
    static get SESSION_EXPIRED() { return new ApiError("U002", "세션이 만료되었습니다."); }
    static get INVALID_SESSION() { return new ApiError("U003", "유효하지 않은 세션입니다."); }
    static get INVALID_ROLE() { return new ApiError("U004", "권한이 없습니다."); }
    static get ALREADY_LOGGED_IN() { return new ApiError("U005", "이미 로그인되어 있습니다."); }
  
    // Bad Request
    static get BAD_REQUEST() { return new ApiError("B001", "잘못된 요청입니다."); }
    static get NOT_FOUND() { return new ApiError("B002", "요청하신 경로를 찾을 수 없습니다."); }
  
    // User
    static get USER_ALREADY_EXISTS() { return new ApiError("A001", "해당 아이디는 이미 존재합니다."); }
    static get USER_NOT_FOUND() { return new ApiError("A002", "해당 아이디는 존재하지 않습니다."); }
    static get INVALID_PASSWORD() { return new ApiError("A003", "비밀번호가 일치하지 않습니다."); }
  
    // Event
    static get EVENT_ALREADY_EXISTS() { return new ApiError("E001", "해당 이벤트는 이미 존재합니다."); }
    static get EVENT_NOT_FOUND() { return new ApiError("E002", "해당 이벤트는 존재하지 않습니다."); }
    static get EVENT_FOR_USER_ALREADY_EXISTS() { return new ApiError("E003", "해당 이벤트 보상 받은 기록이 이미 존재합니다."); }
  }

export function make_api_result(api_result: ApiSuccess | ApiError | MsaFailed, data: Record<string, any> | undefined = {}) {
    if (api_result instanceof ApiSuccess) {
        return {
            result: "success",
            code: 0,
            message: "",
            data: data
        }
    }
    else if (api_result instanceof MsaFailed) {
        return {
            result: api_result.result,
            code: api_result.code,
            message: api_result.message,
            data: api_result.data
        }
    }
    else {
        return {
            result: api_result.result,
            code: api_result.code,
            message: api_result.message,
        }
    }
}

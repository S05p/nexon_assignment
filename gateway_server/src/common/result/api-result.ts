export class ApiResult {
    static IS_OK = { result: true, code: "S001", message: "성공" };
    static IS_FAIL = { result: false, code: "F001", message: "실패" };
    static VALIDATION_ERROR = { result: false, code: "V001", message: "올바르지 않은 값이 전달되었습니다." };
    // ... existing code ...
} 
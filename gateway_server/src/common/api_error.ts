export class ApiError extends Error {
    constructor(
        public readonly code: string,
        public readonly message: string,
        public readonly data?: any
    ) {
        super(message);
        this.name = 'ApiError';
    }
} 
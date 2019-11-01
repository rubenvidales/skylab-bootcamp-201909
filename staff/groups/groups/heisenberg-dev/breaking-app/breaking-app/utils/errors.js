class ContentError extends Error {
    constructor(message) {
        super(message)

        Error.captureStackTrace(this, ContentError)

        this.name = ContentError.name
    }
}

class NotFoundError extends Error {
    constructor(message){
        super(message)

        Error.captureStackTrace(this, NotFoundError)

        this.name = NotFoundError.name
    }
}
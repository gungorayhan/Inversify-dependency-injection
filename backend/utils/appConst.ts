

export const INTERFACE_TYPE = {
    PasswordService: Symbol.for("PasswordService"),
    TokenService: Symbol.for("TokenService"),
    UserController: Symbol.for("UserController"),
    UserService: Symbol.for("UserService"),
    UserRepository: Symbol.for("UserRepository"),
    AuthRepository: Symbol.for("AuthRepository"),
    AuthService: Symbol.for("AuthService"),
    AuthController: Symbol.for("AuthController"),
    AuthMiddleware: Symbol.for("AuthMiddleware"),
    ErrorMiddleware: Symbol.for("ErrorMiddleware"),
    DtoMiddleware: Symbol.for("DtoMiddleware"),
    EventEmitter: Symbol.for("EventEmitter"),
    Notification: Symbol.for("Notification"),
    Redis: Symbol.for("Redis"),
    CachedMiddleware: Symbol.for("CachedMiddleware")
}
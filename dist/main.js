/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const app_module_1 = __webpack_require__(2);
const config_1 = __webpack_require__(4);
const gqlerr_1 = __webpack_require__(9);
const cookieParser = __webpack_require__(144);
const config_service_1 = __webpack_require__(145);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: { origin: '*', credentials: true },
    });
    const config = app.get(config_1.ConfigService);
    app.use(cookieParser());
    app.useGlobalFilters(new gqlerr_1.CustomGraphQLErrorFilter());
    await app.listen(config.get('PORT') || config_service_1.configService.getPort());
}
if (process.env.VERCEL_ENV) {
    module.exports = bootstrap();
}
else {
    bootstrap();
}


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(4);
const graphql_1 = __webpack_require__(5);
const apollo_1 = __webpack_require__(6);
const mongoose_1 = __webpack_require__(7);
const throttler_1 = __webpack_require__(8);
const gqlerr_1 = __webpack_require__(9);
const app_config_1 = __webpack_require__(11);
const database_config_1 = __webpack_require__(12);
const jwt_config_1 = __webpack_require__(13);
const throttle_config_1 = __webpack_require__(14);
const date_time_scalar_1 = __webpack_require__(15);
const json_scalar_1 = __webpack_require__(17);
const auth_module_1 = __webpack_require__(18);
const users_module_1 = __webpack_require__(21);
const uat_reports_module_1 = __webpack_require__(56);
const scoring_rules_module_1 = __webpack_require__(90);
const evaluations_module_1 = __webpack_require__(110);
const audit_logs_module_1 = __webpack_require__(134);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [app_config_1.default, database_config_1.default, jwt_config_1.default, throttle_config_1.default],
            }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                path: '/graphql',
                autoSchemaFile: true,
                sortSchema: true,
                playground: true,
                introspection: true,
                formatError: gqlerr_1.GQLErrFormatter,
                context: ({ req, res }) => ({
                    req,
                    res,
                }),
            }),
            mongoose_1.MongooseModule.forRootAsync({
                useFactory: (configService) => ({
                    uri: configService.get('database.uri'),
                    dbName: configService.get('database.dbName'),
                    connectTimeoutMS: 10000,
                }),
                inject: [config_1.ConfigService],
            }),
            throttler_1.ThrottlerModule.forRootAsync({
                useFactory: (configService) => [
                    {
                        ttl: configService.get('throttle.ttl') || 60,
                        limit: configService.get('throttle.limit') || 100,
                    },
                ],
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            uat_reports_module_1.UATReportsModule,
            scoring_rules_module_1.ScoringRulesModule,
            evaluations_module_1.EvaluationsModule,
            audit_logs_module_1.AuditLogsModule,
        ],
        providers: [date_time_scalar_1.DateTimeScalar, json_scalar_1.JSONScalar],
    })
], AppModule);


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/graphql");

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/apollo");

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("@nestjs/throttler");

/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomGraphQLErrorFilter = exports.ThrowGQL = void 0;
exports.GQLErrFormatter = GQLErrFormatter;
exports.Try = Try;
const common_1 = __webpack_require__(3);
const type_1 = __webpack_require__(10);
__exportStar(__webpack_require__(10), exports);
function GQLErrFormatter(err, anyErr) {
    delete err.extensions['code'];
    delete err.extensions['originalError'];
    delete err.extensions['stacktrace'];
    return err;
}
class ThrowGQL extends common_1.BadRequestException {
    constructor(message, type) {
        const options = { type };
        super(message, options);
        this.type = type;
        this.map = type_1.CThrowType[type];
    }
}
exports.ThrowGQL = ThrowGQL;
let CustomGraphQLErrorFilter = class CustomGraphQLErrorFilter {
    async catch(exception, host) {
        if (exception instanceof ThrowGQL) {
            const type = exception.type;
            const customMessage = exception.message;
            const map = exception.map;
            const newException = new common_1.BadRequestException(customMessage);
            delete newException['extensions'];
            newException['extensions'] = {
                type,
                map,
            };
            delete newException['originalError'];
            return newException;
        }
        const translatedMessage = 'Unhandled/Generic Error, please check';
        const newException = new common_1.BadRequestException(translatedMessage);
        return newException;
    }
};
exports.CustomGraphQLErrorFilter = CustomGraphQLErrorFilter;
exports.CustomGraphQLErrorFilter = CustomGraphQLErrorFilter = __decorate([
    (0, common_1.Catch)(common_1.BadRequestException)
], CustomGraphQLErrorFilter);
class CheckResult {
    constructor(result, error) {
        this.result = result;
        this.error = error;
    }
    err(errorMessage, errorType) {
        if (this.error !== null) {
            throw new ThrowGQL(errorMessage, errorType);
        }
        return this.result;
    }
}
function Try(fn) {
    try {
        const result = fn();
        return new CheckResult(result, null);
    }
    catch (error) {
        return new CheckResult(null, error);
    }
}


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CThrowType = exports.GQLThrowType = void 0;
var GQLThrowType;
(function (GQLThrowType) {
    GQLThrowType["NOT_FOUND"] = "NOT_FOUND";
    GQLThrowType["INVALID"] = "INVALID";
    GQLThrowType["NOT_AUTHORIZED"] = "NOT_AUTHORIZED";
    GQLThrowType["UNEXPECTED"] = "UNEXPECTED";
    GQLThrowType["DUPLICATE"] = "DUPLICATE";
    GQLThrowType["FORBIDDEN"] = "FORBIDDEN";
    GQLThrowType["BAD_REQUEST"] = "BAD_REQUEST";
    GQLThrowType["UNPROCESSABLE"] = "UNPROCESSABLE";
    GQLThrowType["INTERNAL"] = "INTERNAL";
    GQLThrowType["ALREADY_JOIN"] = "ALREADY_JOINED";
})(GQLThrowType || (exports.GQLThrowType = GQLThrowType = {}));
exports.CThrowType = {
    NOT_FOUND: 'AT-404',
    INVALID: 'AT-400',
    NOT_AUTHORIZED: 'AT-401',
    UNEXPECTED: 'AT-500',
    DUPLICATE: 'AT-409',
    FORBIDDEN: 'AT-403',
    BAD_REQUEST: 'AT-400',
    UNPROCESSABLE: 'AT-422',
    INTERNAL: 'AT-500',
    ALREADY_JOINED: 'AT-304',
};


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(4);
exports["default"] = (0, config_1.registerAs)('app', () => ({
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
}));


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(4);
exports["default"] = (0, config_1.registerAs)('database', () => ({
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/uat-evaluation-db',
    dbName: process.env.MONGODB_DB_NAME || 'uat-evaluation-db',
}));


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(4);
exports["default"] = (0, config_1.registerAs)('jwt', () => ({
    secret: process.env.JWT_SECRET || 'dev-secret-key',
    expiry: process.env.JWT_EXPIRY || '1h',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret-key',
    refreshExpiry: process.env.JWT_REFRESH_EXPIRY || '7d',
}));


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(4);
exports["default"] = (0, config_1.registerAs)('throttle', () => ({
    ttl: process.env.THROTTLE_TTL ? parseInt(process.env.THROTTLE_TTL, 10) : 60,
    limit: process.env.THROTTLE_LIMIT
        ? parseInt(process.env.THROTTLE_LIMIT, 10)
        : 100,
}));


/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DateTimeScalar = void 0;
const graphql_1 = __webpack_require__(5);
const graphql_2 = __webpack_require__(16);
let DateTimeScalar = class DateTimeScalar {
    constructor() {
        this.description = 'DateTime custom scalar type';
    }
    parseValue(value) {
        return new Date(value);
    }
    serialize(value) {
        return value.toISOString();
    }
    parseLiteral(ast) {
        if (ast.kind === graphql_2.Kind.STRING) {
            return new Date(ast.value);
        }
        throw new Error('DateTime must be a string');
    }
};
exports.DateTimeScalar = DateTimeScalar;
exports.DateTimeScalar = DateTimeScalar = __decorate([
    (0, graphql_1.Scalar)('DateTime', () => Date)
], DateTimeScalar);


/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("graphql");

/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JSONScalar = void 0;
const graphql_1 = __webpack_require__(5);
const graphql_2 = __webpack_require__(16);
let JSONScalar = class JSONScalar {
    constructor() {
        this.description = 'JSON custom scalar type';
    }
    parseValue(value) {
        return value;
    }
    serialize(value) {
        return value;
    }
    parseLiteral(ast) {
        switch (ast.kind) {
            case graphql_2.Kind.STRING:
                return ast.value;
            case graphql_2.Kind.BOOLEAN:
                return ast.value;
            case graphql_2.Kind.INT:
                return parseInt(ast.value, 10);
            case graphql_2.Kind.FLOAT:
                return parseFloat(ast.value);
            case graphql_2.Kind.OBJECT:
                return this.parseObject(ast);
            case graphql_2.Kind.LIST:
                return ast.values.map((v) => this.parseLiteral(v));
            default:
                return null;
        }
    }
    parseObject(ast) {
        const value = Object.create(null);
        ast.fields.forEach((field) => {
            value[field.name.value] = this.parseLiteral(field.value);
        });
        return value;
    }
};
exports.JSONScalar = JSONScalar;
exports.JSONScalar = JSONScalar = __decorate([
    (0, graphql_1.Scalar)('JSON')
], JSONScalar);


/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(3);
const jwt_1 = __webpack_require__(19);
const passport_1 = __webpack_require__(20);
const config_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(7);
const users_module_1 = __webpack_require__(21);
const auth_service_1 = __webpack_require__(48);
const token_service_1 = __webpack_require__(49);
const jwt_strategy_1 = __webpack_require__(50);
const auth_resolver_1 = __webpack_require__(52);
const user_1 = __webpack_require__(22);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            passport_1.PassportModule,
            mongoose_1.MongooseModule.forFeature([{ name: user_1.User.name, schema: user_1.UserSchema }]),
            jwt_1.JwtModule.registerAsync({
                useFactory: (configService) => {
                    const secret = configService.get('jwt.secret') || 'dev-secret-key';
                    const expiresIn = configService.get('jwt.expiry') || '1h';
                    return {
                        secret,
                        signOptions: { expiresIn },
                    };
                },
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [auth_service_1.AuthService, token_service_1.TokenService, jwt_strategy_1.JwtStrategy, auth_resolver_1.AuthResolver],
        exports: [auth_service_1.AuthService, token_service_1.TokenService],
    })
], AuthModule);


/***/ }),
/* 19 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 20 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(7);
const user_1 = __webpack_require__(22);
const create_user_service_1 = __webpack_require__(24);
const get_user_service_1 = __webpack_require__(29);
const update_user_service_1 = __webpack_require__(30);
const users_resolver_1 = __webpack_require__(31);
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: user_1.User.name, schema: user_1.UserSchema }]),
        ],
        providers: [
            create_user_service_1.CreateUserService,
            get_user_service_1.GetUserService,
            update_user_service_1.UpdateUserService,
            users_resolver_1.UsersResolver,
        ],
        exports: [create_user_service_1.CreateUserService, get_user_service_1.GetUserService, update_user_service_1.UpdateUserService],
    })
], UsersModule);


/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = exports.User = void 0;
const mongoose_1 = __webpack_require__(7);
const graphql_1 = __webpack_require__(5);
const user_role_enum_1 = __webpack_require__(23);
let User = class User {
};
exports.User = User;
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, graphql_1.HideField)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_role_enum_1.UserRole),
    (0, mongoose_1.Prop)({ required: true, type: String, enum: user_role_enum_1.UserRole, default: user_role_enum_1.UserRole.VIEWER }),
    __metadata("design:type", typeof (_a = typeof user_role_enum_1.UserRole !== "undefined" && user_role_enum_1.UserRole) === "function" ? _a : Object)
], User.prototype, "role", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], User.prototype, "updatedAt", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true }),
    (0, graphql_1.ObjectType)()
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRole = void 0;
const graphql_1 = __webpack_require__(5);
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["REVIEWER"] = "REVIEWER";
    UserRole["VIEWER"] = "VIEWER";
})(UserRole || (exports.UserRole = UserRole = {}));
(0, graphql_1.registerEnumType)(UserRole, {
    name: 'UserRole',
    description: 'User roles in the system',
});


/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserService = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(25);
const bson_1 = __webpack_require__(26);
const bcrypt = __webpack_require__(27);
const gqlerr_1 = __webpack_require__(9);
const user_1 = __webpack_require__(22);
const parser_1 = __webpack_require__(28);
let CreateUserService = class CreateUserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(input) {
        try {
            const existingUser = await this.userModel.findOne({ email: input.email });
            if (existingUser) {
                throw new gqlerr_1.ThrowGQL('User with this email already exists', gqlerr_1.GQLThrowType.DUPLICATE);
            }
            const hashedPassword = await bcrypt.hash(input.password, 10);
            const user = await this.userModel.create({
                _id: new bson_1.ObjectId().toString(),
                email: input.email,
                name: input.name,
                password: hashedPassword,
                role: input.role,
            });
            return (0, parser_1.parseUserToView)(user);
        }
        catch (error) {
            if (error instanceof gqlerr_1.ThrowGQL) {
                throw error;
            }
            throw new gqlerr_1.ThrowGQL(error, gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
    }
};
exports.CreateUserService = CreateUserService;
exports.CreateUserService = CreateUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_1.User.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], CreateUserService);


/***/ }),
/* 25 */
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),
/* 26 */
/***/ ((module) => {

module.exports = require("bson");

/***/ }),
/* 27 */
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseUserToView = parseUserToView;
exports.parseUserInput = parseUserInput;
function parseUserToView(doc) {
    const user = doc.toObject();
    delete user.password;
    return user;
}
function parseUserInput(input) {
    return {
        ...input,
    };
}


/***/ }),
/* 29 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetUserService = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(25);
const gqlerr_1 = __webpack_require__(9);
const user_1 = __webpack_require__(22);
const parser_1 = __webpack_require__(28);
let GetUserService = class GetUserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findById(id) {
        try {
            const user = await this.userModel.findOne({ _id: id });
            if (!user) {
                throw new gqlerr_1.ThrowGQL('User not found', gqlerr_1.GQLThrowType.NOT_FOUND);
            }
            return (0, parser_1.parseUserToView)(user);
        }
        catch (error) {
            if (error instanceof gqlerr_1.ThrowGQL) {
                throw error;
            }
            throw new gqlerr_1.ThrowGQL(error, gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
    }
    async findByEmail(email) {
        try {
            return await this.userModel.findOne({ email });
        }
        catch (error) {
            throw new gqlerr_1.ThrowGQL(error, gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
    }
    async findAll(filter, pagination) {
        try {
            const query = {};
            if (filter?.role) {
                query.role = filter.role;
            }
            const page = pagination?.page || 1;
            const limit = pagination?.limit || 20;
            const skip = (page - 1) * limit;
            const [users, totalCount] = await Promise.all([
                this.userModel.find(query).skip(skip).limit(limit).exec(),
                this.userModel.countDocuments(query),
            ]);
            const edges = users.map((user, index) => ({
                node: (0, parser_1.parseUserToView)(user),
                cursor: Buffer.from(`${skip + index}`).toString('base64'),
            }));
            return {
                edges,
                pageInfo: {
                    hasNextPage: skip + users.length < totalCount,
                    hasPreviousPage: page > 1,
                    startCursor: edges[0]?.cursor,
                    endCursor: edges[edges.length - 1]?.cursor,
                },
                totalCount,
            };
        }
        catch (error) {
            throw new gqlerr_1.ThrowGQL(error, gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
    }
};
exports.GetUserService = GetUserService;
exports.GetUserService = GetUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_1.User.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], GetUserService);


/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserService = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(25);
const bcrypt = __webpack_require__(27);
const gqlerr_1 = __webpack_require__(9);
const user_1 = __webpack_require__(22);
const parser_1 = __webpack_require__(28);
let UpdateUserService = class UpdateUserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async update(id, input) {
        try {
            const updateData = {};
            if (input.name) {
                updateData.name = input.name;
            }
            if (input.password) {
                updateData.password = await bcrypt.hash(input.password, 10);
            }
            if (input.role) {
                updateData.role = input.role;
            }
            const user = await this.userModel.findOneAndUpdate({ _id: id }, { $set: updateData }, { new: true });
            if (!user) {
                throw new gqlerr_1.ThrowGQL('User not found', gqlerr_1.GQLThrowType.NOT_FOUND);
            }
            return (0, parser_1.parseUserToView)(user);
        }
        catch (error) {
            if (error instanceof gqlerr_1.ThrowGQL) {
                throw error;
            }
            throw new gqlerr_1.ThrowGQL(error, gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
    }
};
exports.UpdateUserService = UpdateUserService;
exports.UpdateUserService = UpdateUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_1.User.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], UpdateUserService);


/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersResolver = void 0;
const graphql_1 = __webpack_require__(5);
const common_1 = __webpack_require__(3);
const guards_1 = __webpack_require__(32);
const decorators_1 = __webpack_require__(36);
const create_user_service_1 = __webpack_require__(24);
const get_user_service_1 = __webpack_require__(29);
const update_user_service_1 = __webpack_require__(30);
const user_view_1 = __webpack_require__(38);
const user_connection_view_1 = __webpack_require__(39);
const register_user_input_1 = __webpack_require__(45);
const update_user_input_1 = __webpack_require__(46);
const user_filter_input_1 = __webpack_require__(47);
const types_1 = __webpack_require__(40);
let UsersResolver = class UsersResolver {
    constructor(createUserService, getUserService, updateUserService) {
        this.createUserService = createUserService;
        this.getUserService = getUserService;
        this.updateUserService = updateUserService;
    }
    async getCurrentUser(user) {
        return this.getUserService.findById(user._id);
    }
    async getUsers(filter, pagination) {
        return this.getUserService.findAll(filter, pagination);
    }
    async register(input) {
        return this.createUserService.create(input);
    }
    async updateUser(id, input) {
        return this.updateUserService.update(id, input);
    }
};
exports.UsersResolver = UsersResolver;
__decorate([
    (0, graphql_1.Query)(() => user_view_1.UserView, { name: 'me' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], UsersResolver.prototype, "getCurrentUser", null);
__decorate([
    (0, graphql_1.Query)(() => user_connection_view_1.UserConnection, { name: 'users' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('ADMIN'),
    __param(0, (0, graphql_1.Args)('filter', { nullable: true })),
    __param(1, (0, graphql_1.Args)('pagination', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof user_filter_input_1.UserFilterInput !== "undefined" && user_filter_input_1.UserFilterInput) === "function" ? _e : Object, typeof (_f = typeof types_1.PaginationInput !== "undefined" && types_1.PaginationInput) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], UsersResolver.prototype, "getUsers", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_view_1.UserView, { name: 'register' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('ADMIN'),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof register_user_input_1.RegisterUserInput !== "undefined" && register_user_input_1.RegisterUserInput) === "function" ? _h : Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], UsersResolver.prototype, "register", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_view_1.UserView, { name: 'updateUser' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('ADMIN'),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_k = typeof update_user_input_1.UpdateUserInput !== "undefined" && update_user_input_1.UpdateUserInput) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], UsersResolver.prototype, "updateUser", null);
exports.UsersResolver = UsersResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_view_1.UserView),
    __metadata("design:paramtypes", [typeof (_a = typeof create_user_service_1.CreateUserService !== "undefined" && create_user_service_1.CreateUserService) === "function" ? _a : Object, typeof (_b = typeof get_user_service_1.GetUserService !== "undefined" && get_user_service_1.GetUserService) === "function" ? _b : Object, typeof (_c = typeof update_user_service_1.UpdateUserService !== "undefined" && update_user_service_1.UpdateUserService) === "function" ? _c : Object])
], UsersResolver);


/***/ }),
/* 32 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(33), exports);
__exportStar(__webpack_require__(34), exports);


/***/ }),
/* 33 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(3);
const passport_1 = __webpack_require__(20);
const graphql_1 = __webpack_require__(5);
const gqlerr_1 = __webpack_require__(9);
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const gqlContext = ctx.getContext();
        return gqlContext.req;
    }
    handleRequest(err, user) {
        if (err || !user) {
            throw new gqlerr_1.ThrowGQL('Unauthorized: You must be logged in to access this resource', gqlerr_1.GQLThrowType.NOT_AUTHORIZED);
        }
        return user;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);


/***/ }),
/* 34 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RolesGuard = void 0;
const common_1 = __webpack_require__(3);
const core_1 = __webpack_require__(1);
const graphql_1 = __webpack_require__(5);
const gqlerr_1 = __webpack_require__(9);
const roles_decorator_1 = __webpack_require__(35);
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const user = ctx.getContext().req.user;
        if (!user) {
            throw new gqlerr_1.ThrowGQL('Unauthorized: Authentication required', gqlerr_1.GQLThrowType.NOT_AUTHORIZED);
        }
        const hasRole = requiredRoles.some((role) => user.role === role);
        if (!hasRole) {
            throw new gqlerr_1.ThrowGQL('Forbidden: You do not have permission to access this resource', gqlerr_1.GQLThrowType.FORBIDDEN);
        }
        return true;
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], RolesGuard);


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__(3);
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ }),
/* 36 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(35), exports);
__exportStar(__webpack_require__(37), exports);


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CurrentUser = void 0;
const common_1 = __webpack_require__(3);
const graphql_1 = __webpack_require__(5);
exports.CurrentUser = (0, common_1.createParamDecorator)((data, context) => {
    const ctx = graphql_1.GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    return request.user;
});


/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserView = void 0;
const graphql_1 = __webpack_require__(5);
const user_role_enum_1 = __webpack_require__(23);
let UserView = class UserView {
};
exports.UserView = UserView;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserView.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserView.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserView.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_role_enum_1.UserRole),
    __metadata("design:type", typeof (_a = typeof user_role_enum_1.UserRole !== "undefined" && user_role_enum_1.UserRole) === "function" ? _a : Object)
], UserView.prototype, "role", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], UserView.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], UserView.prototype, "updatedAt", void 0);
exports.UserView = UserView = __decorate([
    (0, graphql_1.ObjectType)()
], UserView);


/***/ }),
/* 39 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserConnection = exports.UserEdge = void 0;
const graphql_1 = __webpack_require__(5);
const types_1 = __webpack_require__(40);
const user_view_1 = __webpack_require__(38);
let UserEdge = class UserEdge {
};
exports.UserEdge = UserEdge;
__decorate([
    (0, graphql_1.Field)(() => user_view_1.UserView),
    __metadata("design:type", typeof (_a = typeof user_view_1.UserView !== "undefined" && user_view_1.UserView) === "function" ? _a : Object)
], UserEdge.prototype, "node", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserEdge.prototype, "cursor", void 0);
exports.UserEdge = UserEdge = __decorate([
    (0, graphql_1.ObjectType)()
], UserEdge);
let UserConnection = class UserConnection {
};
exports.UserConnection = UserConnection;
__decorate([
    (0, graphql_1.Field)(() => [UserEdge]),
    __metadata("design:type", Array)
], UserConnection.prototype, "edges", void 0);
__decorate([
    (0, graphql_1.Field)(() => types_1.PageInfo),
    __metadata("design:type", typeof (_b = typeof types_1.PageInfo !== "undefined" && types_1.PageInfo) === "function" ? _b : Object)
], UserConnection.prototype, "pageInfo", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], UserConnection.prototype, "totalCount", void 0);
exports.UserConnection = UserConnection = __decorate([
    (0, graphql_1.ObjectType)()
], UserConnection);


/***/ }),
/* 40 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(41), exports);
__exportStar(__webpack_require__(43), exports);
__exportStar(__webpack_require__(44), exports);


/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaginationInput = void 0;
const graphql_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(42);
let PaginationInput = class PaginationInput {
    constructor() {
        this.page = 1;
        this.limit = 20;
    }
};
exports.PaginationInput = PaginationInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { defaultValue: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], PaginationInput.prototype, "page", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { defaultValue: 20 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], PaginationInput.prototype, "limit", void 0);
exports.PaginationInput = PaginationInput = __decorate([
    (0, graphql_1.InputType)()
], PaginationInput);


/***/ }),
/* 42 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 43 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PageInfo = void 0;
const graphql_1 = __webpack_require__(5);
let PageInfo = class PageInfo {
};
exports.PageInfo = PageInfo;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], PageInfo.prototype, "hasNextPage", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], PageInfo.prototype, "hasPreviousPage", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PageInfo.prototype, "startCursor", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PageInfo.prototype, "endCursor", void 0);
exports.PageInfo = PageInfo = __decorate([
    (0, graphql_1.ObjectType)()
], PageInfo);


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SortDirection = void 0;
const graphql_1 = __webpack_require__(5);
var SortDirection;
(function (SortDirection) {
    SortDirection["ASC"] = "ASC";
    SortDirection["DESC"] = "DESC";
})(SortDirection || (exports.SortDirection = SortDirection = {}));
(0, graphql_1.registerEnumType)(SortDirection, {
    name: 'SortDirection',
    description: 'Sort direction for ordering results',
});


/***/ }),
/* 45 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterUserInput = void 0;
const graphql_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(42);
const user_role_enum_1 = __webpack_require__(23);
let RegisterUserInput = class RegisterUserInput {
};
exports.RegisterUserInput = RegisterUserInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterUserInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], RegisterUserInput.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterUserInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_role_enum_1.UserRole),
    (0, class_validator_1.IsEnum)(user_role_enum_1.UserRole),
    __metadata("design:type", typeof (_a = typeof user_role_enum_1.UserRole !== "undefined" && user_role_enum_1.UserRole) === "function" ? _a : Object)
], RegisterUserInput.prototype, "role", void 0);
exports.RegisterUserInput = RegisterUserInput = __decorate([
    (0, graphql_1.InputType)()
], RegisterUserInput);


/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserInput = void 0;
const graphql_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(42);
const user_role_enum_1 = __webpack_require__(23);
let UpdateUserInput = class UpdateUserInput {
};
exports.UpdateUserInput = UpdateUserInput;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_role_enum_1.UserRole, { nullable: true }),
    (0, class_validator_1.IsEnum)(user_role_enum_1.UserRole),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof user_role_enum_1.UserRole !== "undefined" && user_role_enum_1.UserRole) === "function" ? _a : Object)
], UpdateUserInput.prototype, "role", void 0);
exports.UpdateUserInput = UpdateUserInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateUserInput);


/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserFilterInput = void 0;
const graphql_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(42);
const user_role_enum_1 = __webpack_require__(23);
let UserFilterInput = class UserFilterInput {
};
exports.UserFilterInput = UserFilterInput;
__decorate([
    (0, graphql_1.Field)(() => user_role_enum_1.UserRole, { nullable: true }),
    (0, class_validator_1.IsEnum)(user_role_enum_1.UserRole),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof user_role_enum_1.UserRole !== "undefined" && user_role_enum_1.UserRole) === "function" ? _a : Object)
], UserFilterInput.prototype, "role", void 0);
exports.UserFilterInput = UserFilterInput = __decorate([
    (0, graphql_1.InputType)()
], UserFilterInput);


/***/ }),
/* 48 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(25);
const bson_1 = __webpack_require__(26);
const bcrypt = __webpack_require__(27);
const gqlerr_1 = __webpack_require__(9);
const get_user_service_1 = __webpack_require__(29);
const token_service_1 = __webpack_require__(49);
const user_1 = __webpack_require__(22);
const user_role_enum_1 = __webpack_require__(23);
const parser_1 = __webpack_require__(28);
let AuthService = class AuthService {
    constructor(getUserService, tokenService, userModel) {
        this.getUserService = getUserService;
        this.tokenService = tokenService;
        this.userModel = userModel;
    }
    async login(input) {
        try {
            const user = await this.getUserService.findByEmail(input.email);
            if (!user) {
                throw new gqlerr_1.ThrowGQL('Invalid credentials', gqlerr_1.GQLThrowType.NOT_AUTHORIZED);
            }
            const isPasswordValid = await bcrypt.compare(input.password, user.password);
            if (!isPasswordValid) {
                throw new gqlerr_1.ThrowGQL('Invalid credentials', gqlerr_1.GQLThrowType.NOT_AUTHORIZED);
            }
            const accessToken = this.tokenService.generateAccessToken(user._id, user.email);
            const refreshToken = this.tokenService.generateRefreshToken(user._id, user.email);
            return {
                accessToken,
                refreshToken,
                user: (0, parser_1.parseUserToView)(user),
            };
        }
        catch (error) {
            if (error instanceof gqlerr_1.ThrowGQL) {
                throw error;
            }
            throw new gqlerr_1.ThrowGQL(error, gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
    }
    async refreshToken(token) {
        try {
            const payload = this.tokenService.verifyRefreshToken(token);
            if (!payload) {
                throw new gqlerr_1.ThrowGQL('Invalid refresh token', gqlerr_1.GQLThrowType.NOT_AUTHORIZED);
            }
            const user = await this.getUserService.findById(payload.sub);
            if (!user) {
                throw new gqlerr_1.ThrowGQL('User not found', gqlerr_1.GQLThrowType.NOT_FOUND);
            }
            const accessToken = this.tokenService.generateAccessToken(user._id, user.email);
            const refreshToken = this.tokenService.generateRefreshToken(user._id, user.email);
            return {
                accessToken,
                refreshToken,
                user,
            };
        }
        catch (error) {
            if (error instanceof gqlerr_1.ThrowGQL) {
                throw error;
            }
            throw new gqlerr_1.ThrowGQL(error, gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
    }
    async logout() {
        return true;
    }
    async publicRegister(input) {
        try {
            const existingUser = await this.userModel.findOne({ email: input.email });
            if (existingUser) {
                throw new gqlerr_1.ThrowGQL('User with this email already exists', gqlerr_1.GQLThrowType.DUPLICATE);
            }
            const hashedPassword = await bcrypt.hash(input.password, 10);
            const user = await this.userModel.create({
                _id: new bson_1.ObjectId().toString(),
                email: input.email,
                name: input.name,
                password: hashedPassword,
                role: user_role_enum_1.UserRole.VIEWER,
            });
            const accessToken = this.tokenService.generateAccessToken(user._id, user.email);
            const refreshToken = this.tokenService.generateRefreshToken(user._id, user.email);
            return {
                accessToken,
                refreshToken,
                user: (0, parser_1.parseUserToView)(user),
            };
        }
        catch (error) {
            if (error instanceof gqlerr_1.ThrowGQL) {
                throw error;
            }
            throw new gqlerr_1.ThrowGQL(error, gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)(user_1.User.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof get_user_service_1.GetUserService !== "undefined" && get_user_service_1.GetUserService) === "function" ? _a : Object, typeof (_b = typeof token_service_1.TokenService !== "undefined" && token_service_1.TokenService) === "function" ? _b : Object, typeof (_c = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _c : Object])
], AuthService);


/***/ }),
/* 49 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TokenService = void 0;
const common_1 = __webpack_require__(3);
const jwt_1 = __webpack_require__(19);
const config_1 = __webpack_require__(4);
let TokenService = class TokenService {
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
    }
    generateAccessToken(userId, email) {
        const payload = { sub: userId, email };
        return this.jwtService.sign(payload);
    }
    generateRefreshToken(userId, email) {
        const payload = { sub: userId, email };
        const secret = this.configService.get('jwt.refreshSecret') ||
            'dev-refresh-secret-key';
        const expiresIn = this.configService.get('jwt.refreshExpiry') || '7d';
        return this.jwtService.sign(payload, { secret, expiresIn });
    }
    verifyRefreshToken(token) {
        try {
            return this.jwtService.verify(token, {
                secret: this.configService.get('jwt.refreshSecret') ||
                    'dev-refresh-secret-key',
            });
        }
        catch (error) {
            return null;
        }
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], TokenService);


/***/ }),
/* 50 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const common_1 = __webpack_require__(3);
const passport_1 = __webpack_require__(20);
const config_1 = __webpack_require__(4);
const passport_jwt_1 = __webpack_require__(51);
const gqlerr_1 = __webpack_require__(9);
const get_user_service_1 = __webpack_require__(29);
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(configService, getUserService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('jwt.secret') || 'dev-secret-key',
        });
        this.configService = configService;
        this.getUserService = getUserService;
    }
    async validate(payload) {
        const user = await this.getUserService.findById(payload.sub);
        if (!user) {
            throw new gqlerr_1.ThrowGQL('Invalid token', gqlerr_1.GQLThrowType.NOT_AUTHORIZED);
        }
        return user;
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof get_user_service_1.GetUserService !== "undefined" && get_user_service_1.GetUserService) === "function" ? _b : Object])
], JwtStrategy);


/***/ }),
/* 51 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 52 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthResolver = void 0;
const graphql_1 = __webpack_require__(5);
const common_1 = __webpack_require__(3);
const auth_service_1 = __webpack_require__(48);
const login_input_1 = __webpack_require__(53);
const public_register_input_1 = __webpack_require__(54);
const auth_payload_view_1 = __webpack_require__(55);
const guards_1 = __webpack_require__(32);
let AuthResolver = class AuthResolver {
    constructor(authService) {
        this.authService = authService;
    }
    async login(input) {
        return this.authService.login(input);
    }
    async publicRegister(input) {
        return this.authService.publicRegister(input);
    }
    async refreshToken(token) {
        return this.authService.refreshToken(token);
    }
    async logout() {
        return this.authService.logout();
    }
};
exports.AuthResolver = AuthResolver;
__decorate([
    (0, graphql_1.Mutation)(() => auth_payload_view_1.AuthPayload, { name: 'login' }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof login_input_1.LoginInput !== "undefined" && login_input_1.LoginInput) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AuthResolver.prototype, "login", null);
__decorate([
    (0, graphql_1.Mutation)(() => auth_payload_view_1.AuthPayload, { name: 'publicRegister' }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof public_register_input_1.PublicRegisterInput !== "undefined" && public_register_input_1.PublicRegisterInput) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], AuthResolver.prototype, "publicRegister", null);
__decorate([
    (0, graphql_1.Mutation)(() => auth_payload_view_1.AuthPayload, { name: 'refreshToken' }),
    __param(0, (0, graphql_1.Args)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], AuthResolver.prototype, "refreshToken", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { name: 'logout' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], AuthResolver.prototype, "logout", null);
exports.AuthResolver = AuthResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthResolver);


/***/ }),
/* 53 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginInput = void 0;
const graphql_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(42);
let LoginInput = class LoginInput {
};
exports.LoginInput = LoginInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LoginInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginInput.prototype, "password", void 0);
exports.LoginInput = LoginInput = __decorate([
    (0, graphql_1.InputType)()
], LoginInput);


/***/ }),
/* 54 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PublicRegisterInput = void 0;
const graphql_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(42);
let PublicRegisterInput = class PublicRegisterInput {
};
exports.PublicRegisterInput = PublicRegisterInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], PublicRegisterInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], PublicRegisterInput.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PublicRegisterInput.prototype, "name", void 0);
exports.PublicRegisterInput = PublicRegisterInput = __decorate([
    (0, graphql_1.InputType)()
], PublicRegisterInput);


/***/ }),
/* 55 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthPayload = void 0;
const graphql_1 = __webpack_require__(5);
const user_view_1 = __webpack_require__(38);
let AuthPayload = class AuthPayload {
};
exports.AuthPayload = AuthPayload;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AuthPayload.prototype, "accessToken", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AuthPayload.prototype, "refreshToken", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_view_1.UserView),
    __metadata("design:type", typeof (_a = typeof user_view_1.UserView !== "undefined" && user_view_1.UserView) === "function" ? _a : Object)
], AuthPayload.prototype, "user", void 0);
exports.AuthPayload = AuthPayload = __decorate([
    (0, graphql_1.ObjectType)()
], AuthPayload);


/***/ }),
/* 56 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UATReportsModule = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(7);
const uat_report_1 = __webpack_require__(57);
const user_1 = __webpack_require__(22);
const create_uat_report_service_1 = __webpack_require__(64);
const get_uat_report_service_1 = __webpack_require__(66);
const list_uat_reports_service_1 = __webpack_require__(67);
const update_uat_report_service_1 = __webpack_require__(68);
const delete_uat_report_service_1 = __webpack_require__(69);
const upload_batch_reports_service_1 = __webpack_require__(70);
const get_dashboard_stats_service_1 = __webpack_require__(71);
const uat_reports_resolver_1 = __webpack_require__(72);
let UATReportsModule = class UATReportsModule {
};
exports.UATReportsModule = UATReportsModule;
exports.UATReportsModule = UATReportsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: uat_report_1.UATReport.name, schema: uat_report_1.UATReportSchema },
                { name: user_1.User.name, schema: user_1.UserSchema },
            ]),
        ],
        providers: [
            create_uat_report_service_1.CreateUATReportService,
            get_uat_report_service_1.GetUATReportService,
            list_uat_reports_service_1.ListUATReportsService,
            update_uat_report_service_1.UpdateUATReportService,
            delete_uat_report_service_1.DeleteUATReportService,
            upload_batch_reports_service_1.UploadBatchReportsService,
            get_dashboard_stats_service_1.GetDashboardStatsService,
            uat_reports_resolver_1.UATReportsResolver,
        ],
        exports: [
            create_uat_report_service_1.CreateUATReportService,
            get_uat_report_service_1.GetUATReportService,
            list_uat_reports_service_1.ListUATReportsService,
            update_uat_report_service_1.UpdateUATReportService,
            delete_uat_report_service_1.DeleteUATReportService,
        ],
    })
], UATReportsModule);


/***/ }),
/* 57 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UATReportSchema = exports.UATReport = void 0;
const mongoose_1 = __webpack_require__(7);
const graphql_1 = __webpack_require__(5);
const mongoose_2 = __webpack_require__(25);
const test_identity_1 = __webpack_require__(58);
const test_environment_1 = __webpack_require__(59);
const evidence_1 = __webpack_require__(60);
const severity_level_enum_1 = __webpack_require__(62);
const report_status_enum_1 = __webpack_require__(63);
let UATReport = class UATReport {
};
exports.UATReport = UATReport;
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], UATReport.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => test_identity_1.TestIdentity),
    (0, mongoose_1.Prop)({ required: true, type: test_identity_1.TestIdentitySchema }),
    __metadata("design:type", typeof (_a = typeof test_identity_1.TestIdentity !== "undefined" && test_identity_1.TestIdentity) === "function" ? _a : Object)
], UATReport.prototype, "testIdentity", void 0);
__decorate([
    (0, graphql_1.Field)(() => test_environment_1.TestEnvironment),
    (0, mongoose_1.Prop)({ required: true, type: test_environment_1.TestEnvironmentSchema }),
    __metadata("design:type", typeof (_b = typeof test_environment_1.TestEnvironment !== "undefined" && test_environment_1.TestEnvironment) === "function" ? _b : Object)
], UATReport.prototype, "testEnvironment", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    (0, mongoose_1.Prop)({ required: true, type: [String] }),
    __metadata("design:type", Array)
], UATReport.prototype, "stepsToReproduce", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], UATReport.prototype, "actualResult", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], UATReport.prototype, "expectedResult", void 0);
__decorate([
    (0, graphql_1.Field)(() => [evidence_1.Evidence]),
    (0, mongoose_1.Prop)({ required: true, type: [evidence_1.EvidenceSchema], default: [] }),
    __metadata("design:type", Array)
], UATReport.prototype, "supportingEvidence", void 0);
__decorate([
    (0, graphql_1.Field)(() => severity_level_enum_1.SeverityLevel),
    (0, mongoose_1.Prop)({ required: true, type: String, enum: severity_level_enum_1.SeverityLevel }),
    __metadata("design:type", typeof (_c = typeof severity_level_enum_1.SeverityLevel !== "undefined" && severity_level_enum_1.SeverityLevel) === "function" ? _c : Object)
], UATReport.prototype, "severityLevel", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], UATReport.prototype, "domain", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], UATReport.prototype, "additionalInfo", void 0);
__decorate([
    (0, graphql_1.Field)(() => report_status_enum_1.ReportStatus),
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
        enum: report_status_enum_1.ReportStatus,
        default: report_status_enum_1.ReportStatus.PENDING_EVALUATION,
    }),
    __metadata("design:type", typeof (_d = typeof report_status_enum_1.ReportStatus !== "undefined" && report_status_enum_1.ReportStatus) === "function" ? _d : Object)
], UATReport.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.Schema.Types.String, ref: 'User' }),
    __metadata("design:type", String)
], UATReport.prototype, "createdBy", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], UATReport.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], UATReport.prototype, "updatedAt", void 0);
exports.UATReport = UATReport = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true }),
    (0, graphql_1.ObjectType)()
], UATReport);
exports.UATReportSchema = mongoose_1.SchemaFactory.createForClass(UATReport);
exports.UATReportSchema.index({ status: 1 });
exports.UATReportSchema.index({ severityLevel: 1 });
exports.UATReportSchema.index({ createdBy: 1 });
exports.UATReportSchema.index({ createdAt: -1 });
exports.UATReportSchema.index({ domain: 1 });
exports.UATReportSchema.index({ status: 1, severityLevel: 1 });


/***/ }),
/* 58 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TestIdentitySchema = exports.TestIdentity = void 0;
const mongoose_1 = __webpack_require__(7);
const graphql_1 = __webpack_require__(5);
let TestIdentity = class TestIdentity {
};
exports.TestIdentity = TestIdentity;
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TestIdentity.prototype, "testId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TestIdentity.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TestIdentity.prototype, "version", void 0);
exports.TestIdentity = TestIdentity = __decorate([
    (0, mongoose_1.Schema)({ _id: false }),
    (0, graphql_1.ObjectType)()
], TestIdentity);
exports.TestIdentitySchema = mongoose_1.SchemaFactory.createForClass(TestIdentity);


/***/ }),
/* 59 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TestEnvironmentSchema = exports.TestEnvironment = void 0;
const mongoose_1 = __webpack_require__(7);
const graphql_1 = __webpack_require__(5);
let TestEnvironment = class TestEnvironment {
};
exports.TestEnvironment = TestEnvironment;
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TestEnvironment.prototype, "os", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TestEnvironment.prototype, "browser", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TestEnvironment.prototype, "device", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], TestEnvironment.prototype, "additionalInfo", void 0);
exports.TestEnvironment = TestEnvironment = __decorate([
    (0, mongoose_1.Schema)({ _id: false }),
    (0, graphql_1.ObjectType)()
], TestEnvironment);
exports.TestEnvironmentSchema = mongoose_1.SchemaFactory.createForClass(TestEnvironment);


/***/ }),
/* 60 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EvidenceSchema = exports.Evidence = void 0;
const mongoose_1 = __webpack_require__(7);
const graphql_1 = __webpack_require__(5);
const evidence_type_enum_1 = __webpack_require__(61);
let Evidence = class Evidence {
};
exports.Evidence = Evidence;
__decorate([
    (0, graphql_1.Field)(() => evidence_type_enum_1.EvidenceType),
    (0, mongoose_1.Prop)({ required: true, type: String, enum: evidence_type_enum_1.EvidenceType }),
    __metadata("design:type", typeof (_a = typeof evidence_type_enum_1.EvidenceType !== "undefined" && evidence_type_enum_1.EvidenceType) === "function" ? _a : Object)
], Evidence.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Evidence.prototype, "url", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Evidence.prototype, "description", void 0);
exports.Evidence = Evidence = __decorate([
    (0, mongoose_1.Schema)({ _id: false }),
    (0, graphql_1.ObjectType)()
], Evidence);
exports.EvidenceSchema = mongoose_1.SchemaFactory.createForClass(Evidence);


/***/ }),
/* 61 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EvidenceType = void 0;
const graphql_1 = __webpack_require__(5);
var EvidenceType;
(function (EvidenceType) {
    EvidenceType["SCREENSHOT"] = "SCREENSHOT";
    EvidenceType["VIDEO"] = "VIDEO";
    EvidenceType["LOG"] = "LOG";
    EvidenceType["DOCUMENT"] = "DOCUMENT";
})(EvidenceType || (exports.EvidenceType = EvidenceType = {}));
(0, graphql_1.registerEnumType)(EvidenceType, {
    name: 'EvidenceType',
    description: 'Type of supporting evidence',
});


/***/ }),
/* 62 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SeverityLevel = void 0;
const graphql_1 = __webpack_require__(5);
var SeverityLevel;
(function (SeverityLevel) {
    SeverityLevel["LOW"] = "LOW";
    SeverityLevel["MEDIUM"] = "MEDIUM";
    SeverityLevel["HIGH"] = "HIGH";
    SeverityLevel["CRITICAL"] = "CRITICAL";
})(SeverityLevel || (exports.SeverityLevel = SeverityLevel = {}));
(0, graphql_1.registerEnumType)(SeverityLevel, {
    name: 'SeverityLevel',
    description: 'Severity level of the UAT report',
});


/***/ }),
/* 63 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReportStatus = void 0;
const graphql_1 = __webpack_require__(5);
var ReportStatus;
(function (ReportStatus) {
    ReportStatus["PENDING_EVALUATION"] = "PENDING_EVALUATION";
    ReportStatus["EVALUATING"] = "EVALUATING";
    ReportStatus["VALID"] = "VALID";
    ReportStatus["INVALID"] = "INVALID";
    ReportStatus["FAILED"] = "FAILED";
})(ReportStatus || (exports.ReportStatus = ReportStatus = {}));
(0, graphql_1.registerEnumType)(ReportStatus, {
    name: 'ReportStatus',
    description: 'Status of the UAT report',
});


/***/ }),
/* 64 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUATReportService = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(25);
const bson_1 = __webpack_require__(26);
const gqlerr_1 = __webpack_require__(9);
const uat_report_1 = __webpack_require__(57);
const parser_1 = __webpack_require__(65);
const report_status_enum_1 = __webpack_require__(63);
let CreateUATReportService = class CreateUATReportService {
    constructor(uatReportModel) {
        this.uatReportModel = uatReportModel;
    }
    async create(input, userId) {
        try {
            const report = await this.uatReportModel.create({
                _id: new bson_1.ObjectId().toString(),
                ...input,
                supportingEvidence: input.supportingEvidence || [],
                status: report_status_enum_1.ReportStatus.PENDING_EVALUATION,
                createdBy: userId,
            });
            return (0, parser_1.parseUATReportToView)(report);
        }
        catch (error) {
            throw new gqlerr_1.ThrowGQL(error, gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
    }
};
exports.CreateUATReportService = CreateUATReportService;
exports.CreateUATReportService = CreateUATReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(uat_report_1.UATReport.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], CreateUATReportService);


/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseUATReportToView = parseUATReportToView;
exports.parseUATReportInput = parseUATReportInput;
function parseUATReportToView(doc) {
    return doc.toObject();
}
function parseUATReportInput(input, userId) {
    return {
        ...input,
        createdBy: userId,
        status: 'PENDING_EVALUATION',
    };
}


/***/ }),
/* 66 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetUATReportService = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(25);
const gqlerr_1 = __webpack_require__(9);
const uat_report_1 = __webpack_require__(57);
const parser_1 = __webpack_require__(65);
let GetUATReportService = class GetUATReportService {
    constructor(uatReportModel) {
        this.uatReportModel = uatReportModel;
    }
    async findById(id) {
        try {
            const report = await this.uatReportModel
                .findOne({ _id: id })
                .populate('createdBy')
                .exec();
            if (!report) {
                throw new gqlerr_1.ThrowGQL('UAT Report not found', gqlerr_1.GQLThrowType.NOT_FOUND);
            }
            return (0, parser_1.parseUATReportToView)(report);
        }
        catch (error) {
            if (error instanceof gqlerr_1.ThrowGQL) {
                throw error;
            }
            throw new gqlerr_1.ThrowGQL(error, gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
    }
};
exports.GetUATReportService = GetUATReportService;
exports.GetUATReportService = GetUATReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(uat_report_1.UATReport.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], GetUATReportService);


/***/ }),
/* 67 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListUATReportsService = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(25);
const gqlerr_1 = __webpack_require__(9);
const uat_report_1 = __webpack_require__(57);
const parser_1 = __webpack_require__(65);
let ListUATReportsService = class ListUATReportsService {
    constructor(uatReportModel) {
        this.uatReportModel = uatReportModel;
    }
    async findAll(filter, sort, pagination) {
        try {
            const query = {};
            if (filter?.status && filter.status.length > 0) {
                query.status = { $in: filter.status };
            }
            if (filter?.severityLevel && filter.severityLevel.length > 0) {
                query.severityLevel = { $in: filter.severityLevel };
            }
            if (filter?.domain) {
                query.domain = filter.domain;
            }
            if (filter?.createdBy) {
                query.createdBy = filter.createdBy;
            }
            if (filter?.dateRange) {
                query.createdAt = {
                    $gte: filter.dateRange.from,
                    $lte: filter.dateRange.to,
                };
            }
            const sortField = this.mapSortField(sort?.field);
            const sortDirection = sort?.direction === 'DESC' ? -1 : 1;
            const sortOptions = sortField
                ? { [sortField]: sortDirection }
                : { createdAt: -1 };
            const page = pagination?.page || 1;
            const limit = pagination?.limit || 20;
            const skip = (page - 1) * limit;
            const [reports, totalCount] = await Promise.all([
                this.uatReportModel
                    .find(query)
                    .populate('createdBy')
                    .sort(sortOptions)
                    .skip(skip)
                    .limit(limit)
                    .exec(),
                this.uatReportModel.countDocuments(query),
            ]);
            const edges = reports.map((report, index) => ({
                node: (0, parser_1.parseUATReportToView)(report),
                cursor: Buffer.from(`${skip + index}`).toString('base64'),
            }));
            return {
                edges,
                pageInfo: {
                    hasNextPage: skip + reports.length < totalCount,
                    hasPreviousPage: page > 1,
                    startCursor: edges[0]?.cursor,
                    endCursor: edges[edges.length - 1]?.cursor,
                },
                totalCount,
            };
        }
        catch (error) {
            throw new gqlerr_1.ThrowGQL(error, gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
    }
    mapSortField(field) {
        const fieldMap = {
            CREATED_AT: 'createdAt',
            UPDATED_AT: 'updatedAt',
            SCORE: 'score',
            SEVERITY: 'severityLevel',
            STATUS: 'status',
        };
        return field ? fieldMap[field] || 'createdAt' : 'createdAt';
    }
};
exports.ListUATReportsService = ListUATReportsService;
exports.ListUATReportsService = ListUATReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(uat_report_1.UATReport.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], ListUATReportsService);


/***/ }),
/* 68 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUATReportService = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(25);
const gqlerr_1 = __webpack_require__(9);
const uat_report_1 = __webpack_require__(57);
const parser_1 = __webpack_require__(65);
let UpdateUATReportService = class UpdateUATReportService {
    constructor(uatReportModel) {
        this.uatReportModel = uatReportModel;
    }
    async update(id, input) {
        try {
            const updateData = {};
            if (input.testIdentity) {
                updateData.testIdentity = input.testIdentity;
            }
            if (input.testEnvironment) {
                updateData.testEnvironment = input.testEnvironment;
            }
            if (input.stepsToReproduce) {
                updateData.stepsToReproduce = input.stepsToReproduce;
            }
            if (input.actualResult) {
                updateData.actualResult = input.actualResult;
            }
            if (input.expectedResult) {
                updateData.expectedResult = input.expectedResult;
            }
            if (input.supportingEvidence) {
                updateData.supportingEvidence = input.supportingEvidence;
            }
            if (input.severityLevel) {
                updateData.severityLevel = input.severityLevel;
            }
            if (input.domain !== undefined) {
                updateData.domain = input.domain;
            }
            if (input.additionalInfo !== undefined) {
                updateData.additionalInfo = input.additionalInfo;
            }
            const report = await this.uatReportModel
                .findOneAndUpdate({ _id: id }, { $set: updateData }, { new: true })
                .populate('createdBy')
                .exec();
            if (!report) {
                throw new gqlerr_1.ThrowGQL('UAT Report not found', gqlerr_1.GQLThrowType.NOT_FOUND);
            }
            return (0, parser_1.parseUATReportToView)(report);
        }
        catch (error) {
            if (error instanceof gqlerr_1.ThrowGQL) {
                throw error;
            }
            throw new gqlerr_1.ThrowGQL(error, gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
    }
};
exports.UpdateUATReportService = UpdateUATReportService;
exports.UpdateUATReportService = UpdateUATReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(uat_report_1.UATReport.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], UpdateUATReportService);


/***/ }),
/* 69 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteUATReportService = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(25);
const gqlerr_1 = __webpack_require__(9);
const uat_report_1 = __webpack_require__(57);
let DeleteUATReportService = class DeleteUATReportService {
    constructor(uatReportModel) {
        this.uatReportModel = uatReportModel;
    }
    async delete(id) {
        try {
            const result = await this.uatReportModel.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                throw new gqlerr_1.ThrowGQL('UAT Report not found', gqlerr_1.GQLThrowType.NOT_FOUND);
            }
            return true;
        }
        catch (error) {
            if (error instanceof gqlerr_1.ThrowGQL) {
                throw error;
            }
            throw new gqlerr_1.ThrowGQL(error, gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
    }
};
exports.DeleteUATReportService = DeleteUATReportService;
exports.DeleteUATReportService = DeleteUATReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(uat_report_1.UATReport.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], DeleteUATReportService);


/***/ }),
/* 70 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadBatchReportsService = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(25);
const bson_1 = __webpack_require__(26);
const gqlerr_1 = __webpack_require__(9);
const uat_report_1 = __webpack_require__(57);
const parser_1 = __webpack_require__(65);
const report_status_enum_1 = __webpack_require__(63);
let UploadBatchReportsService = class UploadBatchReportsService {
    constructor(uatReportModel) {
        this.uatReportModel = uatReportModel;
    }
    async uploadBatch(input, userId) {
        try {
            const decodedData = Buffer.from(input.data, 'base64').toString('utf-8');
            let parsedData;
            if (input.format === 'JSON') {
                parsedData = JSON.parse(decodedData);
            }
            else {
                parsedData = this.parseCSV(decodedData);
            }
            const results = {
                totalProcessed: parsedData.length,
                successful: 0,
                failed: 0,
                reports: [],
                errors: [],
            };
            for (let i = 0; i < parsedData.length; i++) {
                try {
                    const reportData = parsedData[i];
                    const report = await this.uatReportModel.create({
                        _id: new bson_1.ObjectId().toString(),
                        testIdentity: reportData.testIdentity,
                        testEnvironment: reportData.testEnvironment,
                        stepsToReproduce: reportData.stepsToReproduce,
                        actualResult: reportData.actualResult,
                        expectedResult: reportData.expectedResult,
                        supportingEvidence: reportData.supportingEvidence || [],
                        severityLevel: reportData.severityLevel,
                        domain: reportData.domain,
                        additionalInfo: reportData.additionalInfo,
                        status: report_status_enum_1.ReportStatus.PENDING_EVALUATION,
                        createdBy: userId,
                    });
                    results.reports.push((0, parser_1.parseUATReportToView)(report));
                    results.successful++;
                }
                catch (error) {
                    results.failed++;
                    results.errors.push({
                        row: i + 1,
                        message: error.message || 'Failed to create report',
                        data: JSON.stringify(parsedData[i]),
                    });
                }
            }
            return results;
        }
        catch (error) {
            throw new gqlerr_1.ThrowGQL(error, gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
    }
    parseCSV(csvData) {
        const lines = csvData.trim().split('\n');
        const headers = lines[0].split(',').map((h) => h.trim());
        const result = [];
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = values[index]?.trim();
            });
            result.push(obj);
        }
        return result;
    }
};
exports.UploadBatchReportsService = UploadBatchReportsService;
exports.UploadBatchReportsService = UploadBatchReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(uat_report_1.UATReport.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], UploadBatchReportsService);


/***/ }),
/* 71 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetDashboardStatsService = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(25);
const gqlerr_1 = __webpack_require__(9);
const uat_report_1 = __webpack_require__(57);
const report_status_enum_1 = __webpack_require__(63);
let GetDashboardStatsService = class GetDashboardStatsService {
    constructor(uatReportModel) {
        this.uatReportModel = uatReportModel;
    }
    async getStats() {
        try {
            const stats = await this.uatReportModel.aggregate([
                {
                    $group: {
                        _id: '$status',
                        count: { $sum: 1 },
                    },
                },
            ]);
            const counts = {
                [report_status_enum_1.ReportStatus.PENDING_EVALUATION]: 0,
                [report_status_enum_1.ReportStatus.EVALUATING]: 0,
                [report_status_enum_1.ReportStatus.VALID]: 0,
                [report_status_enum_1.ReportStatus.INVALID]: 0,
                [report_status_enum_1.ReportStatus.FAILED]: 0,
            };
            stats.forEach((stat) => {
                counts[stat._id] = stat.count;
            });
            const totalReports = await this.uatReportModel.countDocuments();
            return {
                totalReports,
                validReports: counts[report_status_enum_1.ReportStatus.VALID] || 0,
                invalidReports: (counts[report_status_enum_1.ReportStatus.INVALID] || 0) + (counts[report_status_enum_1.ReportStatus.FAILED] || 0),
                pendingReports: counts[report_status_enum_1.ReportStatus.PENDING_EVALUATION] || 0,
                evaluatingReports: counts[report_status_enum_1.ReportStatus.EVALUATING] || 0,
                failedReports: counts[report_status_enum_1.ReportStatus.FAILED] || 0,
                newReports: counts[report_status_enum_1.ReportStatus.PENDING_EVALUATION] || 0,
                verifyingReports: (counts[report_status_enum_1.ReportStatus.PENDING_EVALUATION] || 0) +
                    (counts[report_status_enum_1.ReportStatus.EVALUATING] || 0),
            };
        }
        catch (error) {
            throw new gqlerr_1.ThrowGQL(error, gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
    }
};
exports.GetDashboardStatsService = GetDashboardStatsService;
exports.GetDashboardStatsService = GetDashboardStatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(uat_report_1.UATReport.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], GetDashboardStatsService);


/***/ }),
/* 72 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UATReportsResolver = void 0;
const graphql_1 = __webpack_require__(5);
const common_1 = __webpack_require__(3);
const guards_1 = __webpack_require__(32);
const decorators_1 = __webpack_require__(36);
const create_uat_report_service_1 = __webpack_require__(64);
const get_uat_report_service_1 = __webpack_require__(66);
const list_uat_reports_service_1 = __webpack_require__(67);
const update_uat_report_service_1 = __webpack_require__(68);
const delete_uat_report_service_1 = __webpack_require__(69);
const upload_batch_reports_service_1 = __webpack_require__(70);
const get_dashboard_stats_service_1 = __webpack_require__(71);
const uat_report_view_1 = __webpack_require__(73);
const uat_report_connection_view_1 = __webpack_require__(74);
const batch_upload_result_view_1 = __webpack_require__(75);
const dashboard_stats_view_1 = __webpack_require__(76);
const create_uat_report_input_1 = __webpack_require__(77);
const update_uat_report_input_1 = __webpack_require__(82);
const batch_upload_input_1 = __webpack_require__(83);
const uat_report_filter_input_1 = __webpack_require__(85);
const uat_report_sort_input_1 = __webpack_require__(88);
const types_1 = __webpack_require__(40);
const user_view_1 = __webpack_require__(38);
let UATReportsResolver = class UATReportsResolver {
    constructor(createUATReportService, getUATReportService, listUATReportsService, updateUATReportService, deleteUATReportService, uploadBatchReportsService, getDashboardStatsService) {
        this.createUATReportService = createUATReportService;
        this.getUATReportService = getUATReportService;
        this.listUATReportsService = listUATReportsService;
        this.updateUATReportService = updateUATReportService;
        this.deleteUATReportService = deleteUATReportService;
        this.uploadBatchReportsService = uploadBatchReportsService;
        this.getDashboardStatsService = getDashboardStatsService;
    }
    async createUATReport(input, user) {
        return await this.createUATReportService.create(input, user._id);
    }
    async uploadBatchReports(input, user) {
        return await this.uploadBatchReportsService.uploadBatch(input, user._id);
    }
    async updateUATReport(id, input) {
        return await this.updateUATReportService.update(id, input);
    }
    async deleteUATReport(id) {
        return await this.deleteUATReportService.delete(id);
    }
    async getUATReport(id) {
        return await this.getUATReportService.findById(id);
    }
    async getUATReports(filter, sort, pagination) {
        return await this.listUATReportsService.findAll(filter, sort, pagination);
    }
    async getDashboardStats() {
        return await this.getDashboardStatsService.getStats();
    }
};
exports.UATReportsResolver = UATReportsResolver;
__decorate([
    (0, graphql_1.Mutation)(() => uat_report_view_1.UATReportView, { name: 'createUATReport' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('ADMIN', 'REVIEWER'),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof create_uat_report_input_1.CreateUATReportInput !== "undefined" && create_uat_report_input_1.CreateUATReportInput) === "function" ? _h : Object, typeof (_j = typeof user_view_1.UserView !== "undefined" && user_view_1.UserView) === "function" ? _j : Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], UATReportsResolver.prototype, "createUATReport", null);
__decorate([
    (0, graphql_1.Mutation)(() => batch_upload_result_view_1.BatchUploadResult, { name: 'uploadBatchReports' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('ADMIN', 'REVIEWER'),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof batch_upload_input_1.BatchUploadInput !== "undefined" && batch_upload_input_1.BatchUploadInput) === "function" ? _l : Object, typeof (_m = typeof user_view_1.UserView !== "undefined" && user_view_1.UserView) === "function" ? _m : Object]),
    __metadata("design:returntype", typeof (_o = typeof Promise !== "undefined" && Promise) === "function" ? _o : Object)
], UATReportsResolver.prototype, "uploadBatchReports", null);
__decorate([
    (0, graphql_1.Mutation)(() => uat_report_view_1.UATReportView, { name: 'updateUATReport' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('ADMIN', 'REVIEWER'),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_p = typeof update_uat_report_input_1.UpdateUATReportInput !== "undefined" && update_uat_report_input_1.UpdateUATReportInput) === "function" ? _p : Object]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], UATReportsResolver.prototype, "updateUATReport", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { name: 'deleteUATReport' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('ADMIN'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
], UATReportsResolver.prototype, "deleteUATReport", null);
__decorate([
    (0, graphql_1.Query)(() => uat_report_view_1.UATReportView, { name: 'getUATReport' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
], UATReportsResolver.prototype, "getUATReport", null);
__decorate([
    (0, graphql_1.Query)(() => uat_report_connection_view_1.UATReportConnection, { name: 'getUATReports' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('filter', { nullable: true })),
    __param(1, (0, graphql_1.Args)('sort', { nullable: true })),
    __param(2, (0, graphql_1.Args)('pagination', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_t = typeof uat_report_filter_input_1.UATReportFilterInput !== "undefined" && uat_report_filter_input_1.UATReportFilterInput) === "function" ? _t : Object, typeof (_u = typeof uat_report_sort_input_1.UATReportSortInput !== "undefined" && uat_report_sort_input_1.UATReportSortInput) === "function" ? _u : Object, typeof (_v = typeof types_1.PaginationInput !== "undefined" && types_1.PaginationInput) === "function" ? _v : Object]),
    __metadata("design:returntype", typeof (_w = typeof Promise !== "undefined" && Promise) === "function" ? _w : Object)
], UATReportsResolver.prototype, "getUATReports", null);
__decorate([
    (0, graphql_1.Query)(() => dashboard_stats_view_1.DashboardStatsView, { name: 'getDashboardStats' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_x = typeof Promise !== "undefined" && Promise) === "function" ? _x : Object)
], UATReportsResolver.prototype, "getDashboardStats", null);
exports.UATReportsResolver = UATReportsResolver = __decorate([
    (0, graphql_1.Resolver)(() => uat_report_view_1.UATReportView),
    __metadata("design:paramtypes", [typeof (_a = typeof create_uat_report_service_1.CreateUATReportService !== "undefined" && create_uat_report_service_1.CreateUATReportService) === "function" ? _a : Object, typeof (_b = typeof get_uat_report_service_1.GetUATReportService !== "undefined" && get_uat_report_service_1.GetUATReportService) === "function" ? _b : Object, typeof (_c = typeof list_uat_reports_service_1.ListUATReportsService !== "undefined" && list_uat_reports_service_1.ListUATReportsService) === "function" ? _c : Object, typeof (_d = typeof update_uat_report_service_1.UpdateUATReportService !== "undefined" && update_uat_report_service_1.UpdateUATReportService) === "function" ? _d : Object, typeof (_e = typeof delete_uat_report_service_1.DeleteUATReportService !== "undefined" && delete_uat_report_service_1.DeleteUATReportService) === "function" ? _e : Object, typeof (_f = typeof upload_batch_reports_service_1.UploadBatchReportsService !== "undefined" && upload_batch_reports_service_1.UploadBatchReportsService) === "function" ? _f : Object, typeof (_g = typeof get_dashboard_stats_service_1.GetDashboardStatsService !== "undefined" && get_dashboard_stats_service_1.GetDashboardStatsService) === "function" ? _g : Object])
], UATReportsResolver);


/***/ }),
/* 73 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UATReportView = void 0;
const graphql_1 = __webpack_require__(5);
const test_identity_1 = __webpack_require__(58);
const test_environment_1 = __webpack_require__(59);
const evidence_1 = __webpack_require__(60);
const severity_level_enum_1 = __webpack_require__(62);
const report_status_enum_1 = __webpack_require__(63);
const user_view_1 = __webpack_require__(38);
let UATReportView = class UATReportView {
};
exports.UATReportView = UATReportView;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UATReportView.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => test_identity_1.TestIdentity),
    __metadata("design:type", typeof (_a = typeof test_identity_1.TestIdentity !== "undefined" && test_identity_1.TestIdentity) === "function" ? _a : Object)
], UATReportView.prototype, "testIdentity", void 0);
__decorate([
    (0, graphql_1.Field)(() => test_environment_1.TestEnvironment),
    __metadata("design:type", typeof (_b = typeof test_environment_1.TestEnvironment !== "undefined" && test_environment_1.TestEnvironment) === "function" ? _b : Object)
], UATReportView.prototype, "testEnvironment", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], UATReportView.prototype, "stepsToReproduce", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UATReportView.prototype, "actualResult", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UATReportView.prototype, "expectedResult", void 0);
__decorate([
    (0, graphql_1.Field)(() => [evidence_1.Evidence]),
    __metadata("design:type", Array)
], UATReportView.prototype, "supportingEvidence", void 0);
__decorate([
    (0, graphql_1.Field)(() => severity_level_enum_1.SeverityLevel),
    __metadata("design:type", typeof (_c = typeof severity_level_enum_1.SeverityLevel !== "undefined" && severity_level_enum_1.SeverityLevel) === "function" ? _c : Object)
], UATReportView.prototype, "severityLevel", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UATReportView.prototype, "domain", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UATReportView.prototype, "additionalInfo", void 0);
__decorate([
    (0, graphql_1.Field)(() => report_status_enum_1.ReportStatus),
    __metadata("design:type", typeof (_d = typeof report_status_enum_1.ReportStatus !== "undefined" && report_status_enum_1.ReportStatus) === "function" ? _d : Object)
], UATReportView.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_view_1.UserView),
    __metadata("design:type", typeof (_e = typeof user_view_1.UserView !== "undefined" && user_view_1.UserView) === "function" ? _e : Object)
], UATReportView.prototype, "createdBy", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], UATReportView.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", typeof (_g = typeof Date !== "undefined" && Date) === "function" ? _g : Object)
], UATReportView.prototype, "updatedAt", void 0);
exports.UATReportView = UATReportView = __decorate([
    (0, graphql_1.ObjectType)()
], UATReportView);


/***/ }),
/* 74 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UATReportConnection = exports.UATReportEdge = void 0;
const graphql_1 = __webpack_require__(5);
const types_1 = __webpack_require__(40);
const uat_report_view_1 = __webpack_require__(73);
let UATReportEdge = class UATReportEdge {
};
exports.UATReportEdge = UATReportEdge;
__decorate([
    (0, graphql_1.Field)(() => uat_report_view_1.UATReportView),
    __metadata("design:type", typeof (_a = typeof uat_report_view_1.UATReportView !== "undefined" && uat_report_view_1.UATReportView) === "function" ? _a : Object)
], UATReportEdge.prototype, "node", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UATReportEdge.prototype, "cursor", void 0);
exports.UATReportEdge = UATReportEdge = __decorate([
    (0, graphql_1.ObjectType)()
], UATReportEdge);
let UATReportConnection = class UATReportConnection {
};
exports.UATReportConnection = UATReportConnection;
__decorate([
    (0, graphql_1.Field)(() => [UATReportEdge]),
    __metadata("design:type", Array)
], UATReportConnection.prototype, "edges", void 0);
__decorate([
    (0, graphql_1.Field)(() => types_1.PageInfo),
    __metadata("design:type", typeof (_b = typeof types_1.PageInfo !== "undefined" && types_1.PageInfo) === "function" ? _b : Object)
], UATReportConnection.prototype, "pageInfo", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], UATReportConnection.prototype, "totalCount", void 0);
exports.UATReportConnection = UATReportConnection = __decorate([
    (0, graphql_1.ObjectType)()
], UATReportConnection);


/***/ }),
/* 75 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BatchUploadResult = exports.BatchError = void 0;
const graphql_1 = __webpack_require__(5);
const uat_report_view_1 = __webpack_require__(73);
let BatchError = class BatchError {
};
exports.BatchError = BatchError;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], BatchError.prototype, "row", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], BatchError.prototype, "message", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BatchError.prototype, "data", void 0);
exports.BatchError = BatchError = __decorate([
    (0, graphql_1.ObjectType)()
], BatchError);
let BatchUploadResult = class BatchUploadResult {
};
exports.BatchUploadResult = BatchUploadResult;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], BatchUploadResult.prototype, "totalProcessed", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], BatchUploadResult.prototype, "successful", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], BatchUploadResult.prototype, "failed", void 0);
__decorate([
    (0, graphql_1.Field)(() => [uat_report_view_1.UATReportView]),
    __metadata("design:type", Array)
], BatchUploadResult.prototype, "reports", void 0);
__decorate([
    (0, graphql_1.Field)(() => [BatchError]),
    __metadata("design:type", Array)
], BatchUploadResult.prototype, "errors", void 0);
exports.BatchUploadResult = BatchUploadResult = __decorate([
    (0, graphql_1.ObjectType)()
], BatchUploadResult);


/***/ }),
/* 76 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DashboardStatsView = void 0;
const graphql_1 = __webpack_require__(5);
let DashboardStatsView = class DashboardStatsView {
};
exports.DashboardStatsView = DashboardStatsView;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], DashboardStatsView.prototype, "totalReports", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], DashboardStatsView.prototype, "validReports", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], DashboardStatsView.prototype, "invalidReports", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], DashboardStatsView.prototype, "pendingReports", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], DashboardStatsView.prototype, "evaluatingReports", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], DashboardStatsView.prototype, "failedReports", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], DashboardStatsView.prototype, "newReports", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], DashboardStatsView.prototype, "verifyingReports", void 0);
exports.DashboardStatsView = DashboardStatsView = __decorate([
    (0, graphql_1.ObjectType)()
], DashboardStatsView);


/***/ }),
/* 77 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUATReportInput = void 0;
const graphql_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(42);
const class_transformer_1 = __webpack_require__(78);
const test_identity_input_1 = __webpack_require__(79);
const test_environment_input_1 = __webpack_require__(80);
const evidence_input_1 = __webpack_require__(81);
const severity_level_enum_1 = __webpack_require__(62);
let CreateUATReportInput = class CreateUATReportInput {
};
exports.CreateUATReportInput = CreateUATReportInput;
__decorate([
    (0, graphql_1.Field)(() => test_identity_input_1.TestIdentityInput),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => test_identity_input_1.TestIdentityInput),
    __metadata("design:type", typeof (_a = typeof test_identity_input_1.TestIdentityInput !== "undefined" && test_identity_input_1.TestIdentityInput) === "function" ? _a : Object)
], CreateUATReportInput.prototype, "testIdentity", void 0);
__decorate([
    (0, graphql_1.Field)(() => test_environment_input_1.TestEnvironmentInput),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => test_environment_input_1.TestEnvironmentInput),
    __metadata("design:type", typeof (_b = typeof test_environment_input_1.TestEnvironmentInput !== "undefined" && test_environment_input_1.TestEnvironmentInput) === "function" ? _b : Object)
], CreateUATReportInput.prototype, "testEnvironment", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsNotEmpty)({ each: true }),
    __metadata("design:type", Array)
], CreateUATReportInput.prototype, "stepsToReproduce", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUATReportInput.prototype, "actualResult", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUATReportInput.prototype, "expectedResult", void 0);
__decorate([
    (0, graphql_1.Field)(() => [evidence_input_1.EvidenceInput], { nullable: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => evidence_input_1.EvidenceInput),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateUATReportInput.prototype, "supportingEvidence", void 0);
__decorate([
    (0, graphql_1.Field)(() => severity_level_enum_1.SeverityLevel),
    (0, class_validator_1.IsEnum)(severity_level_enum_1.SeverityLevel),
    __metadata("design:type", typeof (_c = typeof severity_level_enum_1.SeverityLevel !== "undefined" && severity_level_enum_1.SeverityLevel) === "function" ? _c : Object)
], CreateUATReportInput.prototype, "severityLevel", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUATReportInput.prototype, "domain", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUATReportInput.prototype, "additionalInfo", void 0);
exports.CreateUATReportInput = CreateUATReportInput = __decorate([
    (0, graphql_1.InputType)()
], CreateUATReportInput);


/***/ }),
/* 78 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 79 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TestIdentityInput = void 0;
const graphql_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(42);
let TestIdentityInput = class TestIdentityInput {
};
exports.TestIdentityInput = TestIdentityInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TestIdentityInput.prototype, "testId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TestIdentityInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TestIdentityInput.prototype, "version", void 0);
exports.TestIdentityInput = TestIdentityInput = __decorate([
    (0, graphql_1.InputType)()
], TestIdentityInput);


/***/ }),
/* 80 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TestEnvironmentInput = void 0;
const graphql_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(42);
let TestEnvironmentInput = class TestEnvironmentInput {
};
exports.TestEnvironmentInput = TestEnvironmentInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TestEnvironmentInput.prototype, "os", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TestEnvironmentInput.prototype, "browser", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TestEnvironmentInput.prototype, "device", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TestEnvironmentInput.prototype, "additionalInfo", void 0);
exports.TestEnvironmentInput = TestEnvironmentInput = __decorate([
    (0, graphql_1.InputType)()
], TestEnvironmentInput);


/***/ }),
/* 81 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EvidenceInput = void 0;
const graphql_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(42);
const evidence_type_enum_1 = __webpack_require__(61);
let EvidenceInput = class EvidenceInput {
};
exports.EvidenceInput = EvidenceInput;
__decorate([
    (0, graphql_1.Field)(() => evidence_type_enum_1.EvidenceType),
    (0, class_validator_1.IsEnum)(evidence_type_enum_1.EvidenceType),
    __metadata("design:type", typeof (_a = typeof evidence_type_enum_1.EvidenceType !== "undefined" && evidence_type_enum_1.EvidenceType) === "function" ? _a : Object)
], EvidenceInput.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EvidenceInput.prototype, "url", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EvidenceInput.prototype, "description", void 0);
exports.EvidenceInput = EvidenceInput = __decorate([
    (0, graphql_1.InputType)()
], EvidenceInput);


/***/ }),
/* 82 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUATReportInput = void 0;
const graphql_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(42);
const class_transformer_1 = __webpack_require__(78);
const test_identity_input_1 = __webpack_require__(79);
const test_environment_input_1 = __webpack_require__(80);
const evidence_input_1 = __webpack_require__(81);
const severity_level_enum_1 = __webpack_require__(62);
let UpdateUATReportInput = class UpdateUATReportInput {
};
exports.UpdateUATReportInput = UpdateUATReportInput;
__decorate([
    (0, graphql_1.Field)(() => test_identity_input_1.TestIdentityInput, { nullable: true }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => test_identity_input_1.TestIdentityInput),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof test_identity_input_1.TestIdentityInput !== "undefined" && test_identity_input_1.TestIdentityInput) === "function" ? _a : Object)
], UpdateUATReportInput.prototype, "testIdentity", void 0);
__decorate([
    (0, graphql_1.Field)(() => test_environment_input_1.TestEnvironmentInput, { nullable: true }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => test_environment_input_1.TestEnvironmentInput),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_b = typeof test_environment_input_1.TestEnvironmentInput !== "undefined" && test_environment_input_1.TestEnvironmentInput) === "function" ? _b : Object)
], UpdateUATReportInput.prototype, "testEnvironment", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateUATReportInput.prototype, "stepsToReproduce", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUATReportInput.prototype, "actualResult", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUATReportInput.prototype, "expectedResult", void 0);
__decorate([
    (0, graphql_1.Field)(() => [evidence_input_1.EvidenceInput], { nullable: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => evidence_input_1.EvidenceInput),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateUATReportInput.prototype, "supportingEvidence", void 0);
__decorate([
    (0, graphql_1.Field)(() => severity_level_enum_1.SeverityLevel, { nullable: true }),
    (0, class_validator_1.IsEnum)(severity_level_enum_1.SeverityLevel),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_c = typeof severity_level_enum_1.SeverityLevel !== "undefined" && severity_level_enum_1.SeverityLevel) === "function" ? _c : Object)
], UpdateUATReportInput.prototype, "severityLevel", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUATReportInput.prototype, "domain", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUATReportInput.prototype, "additionalInfo", void 0);
exports.UpdateUATReportInput = UpdateUATReportInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateUATReportInput);


/***/ }),
/* 83 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BatchUploadInput = void 0;
const graphql_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(42);
const batch_format_enum_1 = __webpack_require__(84);
let BatchUploadInput = class BatchUploadInput {
};
exports.BatchUploadInput = BatchUploadInput;
__decorate([
    (0, graphql_1.Field)(() => batch_format_enum_1.BatchFormat),
    (0, class_validator_1.IsEnum)(batch_format_enum_1.BatchFormat),
    __metadata("design:type", typeof (_a = typeof batch_format_enum_1.BatchFormat !== "undefined" && batch_format_enum_1.BatchFormat) === "function" ? _a : Object)
], BatchUploadInput.prototype, "format", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BatchUploadInput.prototype, "data", void 0);
exports.BatchUploadInput = BatchUploadInput = __decorate([
    (0, graphql_1.InputType)()
], BatchUploadInput);


/***/ }),
/* 84 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BatchFormat = void 0;
const graphql_1 = __webpack_require__(5);
var BatchFormat;
(function (BatchFormat) {
    BatchFormat["CSV"] = "CSV";
    BatchFormat["JSON"] = "JSON";
})(BatchFormat || (exports.BatchFormat = BatchFormat = {}));
(0, graphql_1.registerEnumType)(BatchFormat, {
    name: 'BatchFormat',
    description: 'Format for batch upload',
});


/***/ }),
/* 85 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UATReportFilterInput = void 0;
const graphql_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(42);
const class_transformer_1 = __webpack_require__(78);
const report_status_enum_1 = __webpack_require__(63);
const severity_level_enum_1 = __webpack_require__(62);
const date_range_input_1 = __webpack_require__(86);
const score_range_input_1 = __webpack_require__(87);
let UATReportFilterInput = class UATReportFilterInput {
};
exports.UATReportFilterInput = UATReportFilterInput;
__decorate([
    (0, graphql_1.Field)(() => [report_status_enum_1.ReportStatus], { nullable: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(report_status_enum_1.ReportStatus, { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UATReportFilterInput.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => [severity_level_enum_1.SeverityLevel], { nullable: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(severity_level_enum_1.SeverityLevel, { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UATReportFilterInput.prototype, "severityLevel", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UATReportFilterInput.prototype, "domain", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UATReportFilterInput.prototype, "createdBy", void 0);
__decorate([
    (0, graphql_1.Field)(() => date_range_input_1.DateRangeInput, { nullable: true }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => date_range_input_1.DateRangeInput),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof date_range_input_1.DateRangeInput !== "undefined" && date_range_input_1.DateRangeInput) === "function" ? _a : Object)
], UATReportFilterInput.prototype, "dateRange", void 0);
__decorate([
    (0, graphql_1.Field)(() => score_range_input_1.ScoreRangeInput, { nullable: true }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => score_range_input_1.ScoreRangeInput),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_b = typeof score_range_input_1.ScoreRangeInput !== "undefined" && score_range_input_1.ScoreRangeInput) === "function" ? _b : Object)
], UATReportFilterInput.prototype, "scoreRange", void 0);
exports.UATReportFilterInput = UATReportFilterInput = __decorate([
    (0, graphql_1.InputType)()
], UATReportFilterInput);


/***/ }),
/* 86 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DateRangeInput = void 0;
const graphql_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(42);
const class_transformer_1 = __webpack_require__(78);
let DateRangeInput = class DateRangeInput {
};
exports.DateRangeInput = DateRangeInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], DateRangeInput.prototype, "from", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], DateRangeInput.prototype, "to", void 0);
exports.DateRangeInput = DateRangeInput = __decorate([
    (0, graphql_1.InputType)()
], DateRangeInput);


/***/ }),
/* 87 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScoreRangeInput = void 0;
const graphql_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(42);
let ScoreRangeInput = class ScoreRangeInput {
};
exports.ScoreRangeInput = ScoreRangeInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], ScoreRangeInput.prototype, "min", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], ScoreRangeInput.prototype, "max", void 0);
exports.ScoreRangeInput = ScoreRangeInput = __decorate([
    (0, graphql_1.InputType)()
], ScoreRangeInput);


/***/ }),
/* 88 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UATReportSortInput = void 0;
const graphql_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(42);
const uat_report_sort_field_enum_1 = __webpack_require__(89);
const types_1 = __webpack_require__(40);
let UATReportSortInput = class UATReportSortInput {
};
exports.UATReportSortInput = UATReportSortInput;
__decorate([
    (0, graphql_1.Field)(() => uat_report_sort_field_enum_1.UATReportSortField, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(uat_report_sort_field_enum_1.UATReportSortField),
    __metadata("design:type", typeof (_a = typeof uat_report_sort_field_enum_1.UATReportSortField !== "undefined" && uat_report_sort_field_enum_1.UATReportSortField) === "function" ? _a : Object)
], UATReportSortInput.prototype, "field", void 0);
__decorate([
    (0, graphql_1.Field)(() => types_1.SortDirection, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(types_1.SortDirection),
    __metadata("design:type", typeof (_b = typeof types_1.SortDirection !== "undefined" && types_1.SortDirection) === "function" ? _b : Object)
], UATReportSortInput.prototype, "direction", void 0);
exports.UATReportSortInput = UATReportSortInput = __decorate([
    (0, graphql_1.InputType)()
], UATReportSortInput);


/***/ }),
/* 89 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UATReportSortField = void 0;
const graphql_1 = __webpack_require__(5);
var UATReportSortField;
(function (UATReportSortField) {
    UATReportSortField["CREATED_AT"] = "CREATED_AT";
    UATReportSortField["UPDATED_AT"] = "UPDATED_AT";
    UATReportSortField["SCORE"] = "SCORE";
    UATReportSortField["SEVERITY"] = "SEVERITY";
    UATReportSortField["STATUS"] = "STATUS";
})(UATReportSortField || (exports.UATReportSortField = UATReportSortField = {}));
(0, graphql_1.registerEnumType)(UATReportSortField, {
    name: 'UATReportSortField',
    description: 'Fields to sort UAT reports by',
});


/***/ }),
/* 90 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScoringRulesModule = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(7);
const scoring_rule_1 = __webpack_require__(91);
const validation_config_1 = __webpack_require__(93);
const config_history_1 = __webpack_require__(94);
const user_1 = __webpack_require__(22);
const initialize_scoring_rules_service_1 = __webpack_require__(96);
const get_scoring_rules_service_1 = __webpack_require__(97);
const update_scoring_rule_service_1 = __webpack_require__(99);
const toggle_scoring_rule_service_1 = __webpack_require__(101);
const update_validation_threshold_service_1 = __webpack_require__(102);
const reset_scoring_rules_service_1 = __webpack_require__(103);
const track_config_change_service_1 = __webpack_require__(100);
const scoring_rules_resolver_1 = __webpack_require__(104);
let ScoringRulesModule = class ScoringRulesModule {
};
exports.ScoringRulesModule = ScoringRulesModule;
exports.ScoringRulesModule = ScoringRulesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: scoring_rule_1.ScoringRule.name, schema: scoring_rule_1.ScoringRuleSchema },
                { name: validation_config_1.ValidationConfig.name, schema: validation_config_1.ValidationConfigSchema },
                { name: config_history_1.ConfigHistory.name, schema: config_history_1.ConfigHistorySchema },
                { name: user_1.User.name, schema: user_1.UserSchema },
            ]),
        ],
        providers: [
            initialize_scoring_rules_service_1.InitializeScoringRulesService,
            get_scoring_rules_service_1.GetScoringRulesService,
            update_scoring_rule_service_1.UpdateScoringRuleService,
            toggle_scoring_rule_service_1.ToggleScoringRuleService,
            update_validation_threshold_service_1.UpdateValidationThresholdService,
            reset_scoring_rules_service_1.ResetScoringRulesService,
            track_config_change_service_1.TrackConfigChangeService,
            scoring_rules_resolver_1.ScoringRulesResolver,
        ],
        exports: [
            initialize_scoring_rules_service_1.InitializeScoringRulesService,
            get_scoring_rules_service_1.GetScoringRulesService,
            track_config_change_service_1.TrackConfigChangeService,
        ],
    })
], ScoringRulesModule);


/***/ }),
/* 91 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScoringRuleSchema = exports.ScoringRule = void 0;
const mongoose_1 = __webpack_require__(7);
const graphql_1 = __webpack_require__(5);
const attribute_type_enum_1 = __webpack_require__(92);
let ScoringRule = class ScoringRule {
};
exports.ScoringRule = ScoringRule;
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ScoringRule.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => attribute_type_enum_1.AttributeType),
    (0, mongoose_1.Prop)({ required: true, type: String, enum: attribute_type_enum_1.AttributeType, unique: true }),
    __metadata("design:type", typeof (_a = typeof attribute_type_enum_1.AttributeType !== "undefined" && attribute_type_enum_1.AttributeType) === "function" ? _a : Object)
], ScoringRule.prototype, "attribute", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ScoringRule.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ScoringRule.prototype, "criteria", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], ScoringRule.prototype, "weight", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ required: true, default: true }),
    __metadata("design:type", Boolean)
], ScoringRule.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ScoringRule.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], ScoringRule.prototype, "updatedAt", void 0);
exports.ScoringRule = ScoringRule = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true }),
    (0, graphql_1.ObjectType)()
], ScoringRule);
exports.ScoringRuleSchema = mongoose_1.SchemaFactory.createForClass(ScoringRule);
exports.ScoringRuleSchema.index({ isActive: 1 });


/***/ }),
/* 92 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeType = void 0;
const graphql_1 = __webpack_require__(5);
var AttributeType;
(function (AttributeType) {
    AttributeType["TEST_IDENTITY"] = "TEST_IDENTITY";
    AttributeType["TEST_ENVIRONMENT"] = "TEST_ENVIRONMENT";
    AttributeType["STEPS_TO_REPRODUCE"] = "STEPS_TO_REPRODUCE";
    AttributeType["ACTUAL_RESULT"] = "ACTUAL_RESULT";
    AttributeType["EXPECTED_RESULT"] = "EXPECTED_RESULT";
    AttributeType["SUPPORTING_EVIDENCE"] = "SUPPORTING_EVIDENCE";
    AttributeType["SEVERITY_LEVEL"] = "SEVERITY_LEVEL";
    AttributeType["INFORMATION_CONSISTENCY"] = "INFORMATION_CONSISTENCY";
})(AttributeType || (exports.AttributeType = AttributeType = {}));
(0, graphql_1.registerEnumType)(AttributeType, {
    name: 'AttributeType',
    description: 'Types of attributes evaluated in UAT reports',
});


/***/ }),
/* 93 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValidationConfigSchema = exports.ValidationConfig = void 0;
const mongoose_1 = __webpack_require__(7);
const graphql_1 = __webpack_require__(5);
const mongoose_2 = __webpack_require__(25);
let ValidationConfig = class ValidationConfig {
};
exports.ValidationConfig = ValidationConfig;
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ValidationConfig.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, mongoose_1.Prop)({ required: true, default: 70 }),
    __metadata("design:type", Number)
], ValidationConfig.prototype, "threshold", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.Schema.Types.String, ref: 'User' }),
    __metadata("design:type", String)
], ValidationConfig.prototype, "updatedBy", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ValidationConfig.prototype, "updatedAt", void 0);
exports.ValidationConfig = ValidationConfig = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true }),
    (0, graphql_1.ObjectType)()
], ValidationConfig);
exports.ValidationConfigSchema = mongoose_1.SchemaFactory.createForClass(ValidationConfig);


/***/ }),
/* 94 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigHistorySchema = exports.ConfigHistory = void 0;
const mongoose_1 = __webpack_require__(7);
const graphql_1 = __webpack_require__(5);
const mongoose_2 = __webpack_require__(25);
const config_type_enum_1 = __webpack_require__(95);
const attribute_type_enum_1 = __webpack_require__(92);
const json_scalar_1 = __webpack_require__(17);
let ConfigHistory = class ConfigHistory {
};
exports.ConfigHistory = ConfigHistory;
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], ConfigHistory.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => config_type_enum_1.ConfigType),
    (0, mongoose_1.Prop)({ required: true, type: String, enum: config_type_enum_1.ConfigType }),
    __metadata("design:type", typeof (_a = typeof config_type_enum_1.ConfigType !== "undefined" && config_type_enum_1.ConfigType) === "function" ? _a : Object)
], ConfigHistory.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => attribute_type_enum_1.AttributeType, { nullable: true }),
    (0, mongoose_1.Prop)({ required: false, type: String, enum: attribute_type_enum_1.AttributeType }),
    __metadata("design:type", typeof (_b = typeof attribute_type_enum_1.AttributeType !== "undefined" && attribute_type_enum_1.AttributeType) === "function" ? _b : Object)
], ConfigHistory.prototype, "attribute", void 0);
__decorate([
    (0, graphql_1.Field)(() => json_scalar_1.JSONScalar),
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.Schema.Types.Mixed }),
    __metadata("design:type", Object)
], ConfigHistory.prototype, "changes", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.Schema.Types.String, ref: 'User' }),
    __metadata("design:type", String)
], ConfigHistory.prototype, "changedBy", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], ConfigHistory.prototype, "reason", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], ConfigHistory.prototype, "changedAt", void 0);
exports.ConfigHistory = ConfigHistory = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true }),
    (0, graphql_1.ObjectType)()
], ConfigHistory);
exports.ConfigHistorySchema = mongoose_1.SchemaFactory.createForClass(ConfigHistory);
exports.ConfigHistorySchema.index({ type: 1 });
exports.ConfigHistorySchema.index({ changedBy: 1 });
exports.ConfigHistorySchema.index({ changedAt: -1 });


/***/ }),
/* 95 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigType = void 0;
const graphql_1 = __webpack_require__(5);
var ConfigType;
(function (ConfigType) {
    ConfigType["RULE_UPDATE"] = "RULE_UPDATE";
    ConfigType["THRESHOLD_UPDATE"] = "THRESHOLD_UPDATE";
    ConfigType["RULE_TOGGLE"] = "RULE_TOGGLE";
    ConfigType["RULE_RESET"] = "RULE_RESET";
})(ConfigType || (exports.ConfigType = ConfigType = {}));
(0, graphql_1.registerEnumType)(ConfigType, {
    name: 'ConfigType',
    description: 'Types of configuration changes',
});


/***/ }),
/* 96 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InitializeScoringRulesService = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(25);
const bson_1 = __webpack_require__(26);
const gqlerr_1 = __webpack_require__(9);
const scoring_rule_1 = __webpack_require__(91);
const validation_config_1 = __webpack_require__(93);
const attribute_type_enum_1 = __webpack_require__(92);
let InitializeScoringRulesService = class InitializeScoringRulesService {
    constructor(scoringRuleModel, validationConfigModel) {
        this.scoringRuleModel = scoringRuleModel;
        this.validationConfigModel = validationConfigModel;
    }
    async initialize(userId) {
        try {
            const existingRules = await this.scoringRuleModel.countDocuments();
            if (existingRules > 0) {
                return;
            }
            const defaultRules = [
                {
                    _id: new bson_1.ObjectId().toString(),
                    attribute: attribute_type_enum_1.AttributeType.TEST_IDENTITY,
                    description: 'Test Identity Completeness',
                    criteria: 'IF testId AND title AND version are provided THEN score = 1 ELSE 0',
                    weight: 10,
                    isActive: true,
                },
                {
                    _id: new bson_1.ObjectId().toString(),
                    attribute: attribute_type_enum_1.AttributeType.TEST_ENVIRONMENT,
                    description: 'Test Environment Completeness',
                    criteria: 'IF os AND browser AND device are complete THEN score = 1 ELSE 0',
                    weight: 15,
                    isActive: true,
                },
                {
                    _id: new bson_1.ObjectId().toString(),
                    attribute: attribute_type_enum_1.AttributeType.STEPS_TO_REPRODUCE,
                    description: 'Steps to Reproduce Completeness',
                    criteria: 'IF steps.length >= 3 AND logically ordered THEN score = 1; IF ambiguous THEN 0.5',
                    weight: 25,
                    isActive: true,
                },
                {
                    _id: new bson_1.ObjectId().toString(),
                    attribute: attribute_type_enum_1.AttributeType.ACTUAL_RESULT,
                    description: 'Actual Result Completeness',
                    criteria: 'IF actualResult.length >= 30 THEN score = 1 ELSE 0',
                    weight: 10,
                    isActive: true,
                },
                {
                    _id: new bson_1.ObjectId().toString(),
                    attribute: attribute_type_enum_1.AttributeType.EXPECTED_RESULT,
                    description: 'Expected Result Completeness',
                    criteria: 'IF expectedResult provided AND matches requirement THEN score = 1 ELSE 0',
                    weight: 10,
                    isActive: true,
                },
                {
                    _id: new bson_1.ObjectId().toString(),
                    attribute: attribute_type_enum_1.AttributeType.SUPPORTING_EVIDENCE,
                    description: 'Supporting Evidence Completeness',
                    criteria: 'IF supportingEvidence.length > 0 THEN score = 1 ELSE 0',
                    weight: 15,
                    isActive: true,
                },
                {
                    _id: new bson_1.ObjectId().toString(),
                    attribute: attribute_type_enum_1.AttributeType.SEVERITY_LEVEL,
                    description: 'Severity Level Validity',
                    criteria: 'IF severityLevel IN [LOW, MEDIUM, HIGH, CRITICAL] THEN score = 1 ELSE 0',
                    weight: 10,
                    isActive: true,
                },
                {
                    _id: new bson_1.ObjectId().toString(),
                    attribute: attribute_type_enum_1.AttributeType.INFORMATION_CONSISTENCY,
                    description: 'Information Consistency',
                    criteria: 'IF no contradictions detected THEN score = 1 ELSE 0',
                    weight: 5,
                    isActive: true,
                },
            ];
            await this.scoringRuleModel.insertMany(defaultRules);
            const existingConfig = await this.validationConfigModel.countDocuments();
            if (existingConfig === 0) {
                await this.validationConfigModel.create({
                    _id: new bson_1.ObjectId().toString(),
                    threshold: 70,
                    updatedBy: userId,
                });
            }
        }
        catch (error) {
            throw new gqlerr_1.ThrowGQL(error, gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
    }
    getDefaultRules() {
        return [
            {
                attribute: attribute_type_enum_1.AttributeType.TEST_IDENTITY,
                description: 'Test Identity Completeness',
                criteria: 'IF testId AND title AND version are provided THEN score = 1 ELSE 0',
                weight: 10,
                isActive: true,
            },
            {
                attribute: attribute_type_enum_1.AttributeType.TEST_ENVIRONMENT,
                description: 'Test Environment Completeness',
                criteria: 'IF os AND browser AND device are complete THEN score = 1 ELSE 0',
                weight: 15,
                isActive: true,
            },
            {
                attribute: attribute_type_enum_1.AttributeType.STEPS_TO_REPRODUCE,
                description: 'Steps to Reproduce Completeness',
                criteria: 'IF steps.length >= 3 AND logically ordered THEN score = 1; IF ambiguous THEN 0.5',
                weight: 25,
                isActive: true,
            },
            {
                attribute: attribute_type_enum_1.AttributeType.ACTUAL_RESULT,
                description: 'Actual Result Completeness',
                criteria: 'IF actualResult.length >= 30 THEN score = 1 ELSE 0',
                weight: 10,
                isActive: true,
            },
            {
                attribute: attribute_type_enum_1.AttributeType.EXPECTED_RESULT,
                description: 'Expected Result Completeness',
                criteria: 'IF expectedResult provided AND matches requirement THEN score = 1 ELSE 0',
                weight: 10,
                isActive: true,
            },
            {
                attribute: attribute_type_enum_1.AttributeType.SUPPORTING_EVIDENCE,
                description: 'Supporting Evidence Completeness',
                criteria: 'IF supportingEvidence.length > 0 THEN score = 1 ELSE 0',
                weight: 15,
                isActive: true,
            },
            {
                attribute: attribute_type_enum_1.AttributeType.SEVERITY_LEVEL,
                description: 'Severity Level Validity',
                criteria: 'IF severityLevel IN [LOW, MEDIUM, HIGH, CRITICAL] THEN score = 1 ELSE 0',
                weight: 10,
                isActive: true,
            },
            {
                attribute: attribute_type_enum_1.AttributeType.INFORMATION_CONSISTENCY,
                description: 'Information Consistency',
                criteria: 'IF no contradictions detected THEN score = 1 ELSE 0',
                weight: 5,
                isActive: true,
            },
        ];
    }
};
exports.InitializeScoringRulesService = InitializeScoringRulesService;
exports.InitializeScoringRulesService = InitializeScoringRulesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(scoring_rule_1.ScoringRule.name)),
    __param(1, (0, mongoose_1.InjectModel)(validation_config_1.ValidationConfig.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], InitializeScoringRulesService);


/***/ }),
/* 97 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetScoringRulesService = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(25);
const gqlerr_1 = __webpack_require__(9);
const scoring_rule_1 = __webpack_require__(91);
const validation_config_1 = __webpack_require__(93);
const parser_1 = __webpack_require__(98);
let GetScoringRulesService = class GetScoringRulesService {
    constructor(scoringRuleModel, validationConfigModel) {
        this.scoringRuleModel = scoringRuleModel;
        this.validationConfigModel = validationConfigModel;
    }
    async findAll() {
        try {
            const rules = await this.scoringRuleModel.find().exec();
            return rules.map(parser_1.parseScoringRuleToView);
        }
        catch (error) {
            throw new gqlerr_1.ThrowGQL(error, gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
    }
    async findByAttribute(attribute) {
        try {
            const rule = await this.scoringRuleModel.findOne({ attribute }).exec();
            if (!rule) {
                throw new gqlerr_1.ThrowGQL('Scoring rule not found', gqlerr_1.GQLThrowType.NOT_FOUND);
            }
            return (0, parser_1.parseScoringRuleToView)(rule);
        }
        catch (error) {
            if (error instanceof gqlerr_1.ThrowGQL) {
                throw error;
            }
            throw new gqlerr_1.ThrowGQL(error, gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
    }
    async getActiveRules() {
        try {
            const rules = await this.scoringRuleModel.find({ isActive: true }).exec();
            return rules.map(parser_1.parseScoringRuleToView);
        }
        catch (error) {
            throw new gqlerr_1.ThrowGQL(error, gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
    }
    async getValidationConfig() {
        try {
            const config = await this.validationConfigModel
                .findOne()
                .sort({ updatedAt: -1 })
                .populate('updatedBy')
                .exec();
            if (!config) {
                throw new gqlerr_1.ThrowGQL('Validation config not found', gqlerr_1.GQLThrowType.NOT_FOUND);
            }
            return (0, parser_1.parseValidationConfigToView)(config);
        }
        catch (error) {
            if (error instanceof gqlerr_1.ThrowGQL) {
                throw error;
            }
            throw new gqlerr_1.ThrowGQL(error, gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
    }
};
exports.GetScoringRulesService = GetScoringRulesService;
exports.GetScoringRulesService = GetScoringRulesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(scoring_rule_1.ScoringRule.name)),
    __param(1, (0, mongoose_1.InjectModel)(validation_config_1.ValidationConfig.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object])
], GetScoringRulesService);


/***/ }),
/* 98 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseScoringRuleToView = parseScoringRuleToView;
exports.parseValidationConfigToView = parseValidationConfigToView;
exports.parseConfigHistoryToView = parseConfigHistoryToView;
function parseScoringRuleToView(doc) {
    return doc.toObject();
}
function parseValidationConfigToView(doc) {
    return doc.toObject();
}
function parseConfigHistoryToView(doc) {
    return doc.toObject();
}


/***/ }),
/* 99 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateScoringRuleService = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(25);
const gqlerr_1 = __webpack_require__(9);
const scoring_rule_1 = __webpack_require__(91);
const parser_1 = __webpack_require__(98);
const track_config_change_service_1 = __webpack_require__(100);
const config_type_enum_1 = __webpack_require__(95);
let UpdateScoringRuleService = class UpdateScoringRuleService {
    constructor(scoringRuleModel, trackConfigChangeService) {
        this.scoringRuleModel = scoringRuleModel;
        this.trackConfigChangeService = trackConfigChangeService;
    }
    async update(input, userId) {
        try {
            const updateData = {};
            const changes = {};
            if (input.weight !== undefined) {
                updateData.weight = input.weight;
                changes.weight = input.weight;
            }
            if (input.criteria) {
                updateData.criteria = input.criteria;
                changes.criteria = input.criteria;
            }
            if (input.description) {
                updateData.description = input.description;
                changes.description = input.description;
            }
            const rule = await this.scoringRuleModel.findOneAndUpdate({ attribute: input.attribute }, { $set: updateData }, { new: true });
            if (!rule) {
                throw new gqlerr_1.ThrowGQL('Scoring rule not found', gqlerr_1.GQLThrowType.NOT_FOUND);
            }
            await this.trackConfigChangeService.track(config_type_enum_1.ConfigType.RULE_UPDATE, changes, userId, input.attribute);
            return (0, parser_1.parseScoringRuleToView)(rule);
        }
        catch (error) {
            if (error instanceof gqlerr_1.ThrowGQL) {
                throw error;
            }
            throw new gqlerr_1.ThrowGQL(error, gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
    }
};
exports.UpdateScoringRuleService = UpdateScoringRuleService;
exports.UpdateScoringRuleService = UpdateScoringRuleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(scoring_rule_1.ScoringRule.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof track_config_change_service_1.TrackConfigChangeService !== "undefined" && track_config_change_service_1.TrackConfigChangeService) === "function" ? _b : Object])
], UpdateScoringRuleService);


/***/ }),
/* 100 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TrackConfigChangeService = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(25);
const bson_1 = __webpack_require__(26);
const gqlerr_1 = __webpack_require__(9);
const config_history_1 = __webpack_require__(94);
const parser_1 = __webpack_require__(98);
let TrackConfigChangeService = class TrackConfigChangeService {
    constructor(configHistoryModel) {
        this.configHistoryModel = configHistoryModel;
    }
    async track(type, changes, userId, attribute, reason) {
        try {
            const history = await this.configHistoryModel.create({
                _id: new bson_1.ObjectId().toString(),
                type,
                attribute,
                changes,
                changedBy: userId,
                changedAt: new Date(),
                reason,
            });
            return (0, parser_1.parseConfigHistoryToView)(history);
        }
        catch (error) {
            throw new gqlerr_1.ThrowGQL(error, gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
    }
    async getHistory(pagination) {
        try {
            const page = pagination?.page || 1;
            const limit = pagination?.limit || 20;
            const skip = (page - 1) * limit;
            const [history, totalCount] = await Promise.all([
                this.configHistoryModel
                    .find()
                    .populate('changedBy')
                    .sort({ changedAt: -1 })
                    .skip(skip)
                    .limit(limit)
                    .exec(),
                this.configHistoryModel.countDocuments(),
            ]);
            const edges = history.map((item, index) => ({
                node: (0, parser_1.parseConfigHistoryToView)(item),
                cursor: Buffer.from(`${skip + index}`).toString('base64'),
            }));
            return {
                edges,
                pageInfo: {
                    hasNextPage: skip + history.length < totalCount,
                    hasPreviousPage: page > 1,
                    startCursor: edges[0]?.cursor,
                    endCursor: edges[edges.length - 1]?.cursor,
                },
                totalCount,
            };
        }
        catch (error) {
            throw new gqlerr_1.ThrowGQL(error, gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
    }
};
exports.TrackConfigChangeService = TrackConfigChangeService;
exports.TrackConfigChangeService = TrackConfigChangeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(config_history_1.ConfigHistory.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], TrackConfigChangeService);


/***/ }),
/* 101 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ToggleScoringRuleService = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(25);
const gqlerr_1 = __webpack_require__(9);
const scoring_rule_1 = __webpack_require__(91);
const parser_1 = __webpack_require__(98);
const track_config_change_service_1 = __webpack_require__(100);
const config_type_enum_1 = __webpack_require__(95);
let ToggleScoringRuleService = class ToggleScoringRuleService {
    constructor(scoringRuleModel, trackConfigChangeService) {
        this.scoringRuleModel = scoringRuleModel;
        this.trackConfigChangeService = trackConfigChangeService;
    }
    async toggle(attribute, isActive, userId) {
        try {
            const rule = await this.scoringRuleModel.findOneAndUpdate({ attribute }, { $set: { isActive } }, { new: true });
            if (!rule) {
                throw new gqlerr_1.ThrowGQL('Scoring rule not found', gqlerr_1.GQLThrowType.NOT_FOUND);
            }
            await this.trackConfigChangeService.track(config_type_enum_1.ConfigType.RULE_TOGGLE, { isActive }, userId, attribute);
            return (0, parser_1.parseScoringRuleToView)(rule);
        }
        catch (error) {
            if (error instanceof gqlerr_1.ThrowGQL) {
                throw error;
            }
            throw new gqlerr_1.ThrowGQL(error, gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
    }
};
exports.ToggleScoringRuleService = ToggleScoringRuleService;
exports.ToggleScoringRuleService = ToggleScoringRuleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(scoring_rule_1.ScoringRule.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof track_config_change_service_1.TrackConfigChangeService !== "undefined" && track_config_change_service_1.TrackConfigChangeService) === "function" ? _b : Object])
], ToggleScoringRuleService);


/***/ }),
/* 102 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateValidationThresholdService = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(25);
const bson_1 = __webpack_require__(26);
const gqlerr_1 = __webpack_require__(9);
const validation_config_1 = __webpack_require__(93);
const parser_1 = __webpack_require__(98);
const track_config_change_service_1 = __webpack_require__(100);
const config_type_enum_1 = __webpack_require__(95);
let UpdateValidationThresholdService = class UpdateValidationThresholdService {
    constructor(validationConfigModel, trackConfigChangeService) {
        this.validationConfigModel = validationConfigModel;
        this.trackConfigChangeService = trackConfigChangeService;
    }
    async update(threshold, userId) {
        try {
            let config = await this.validationConfigModel
                .findOne()
                .sort({ updatedAt: -1 });
            if (config) {
                const updatedConfig = await this.validationConfigModel
                    .findOneAndUpdate({ _id: config._id }, { $set: { threshold, updatedBy: userId } }, { new: true })
                    .populate('updatedBy');
                if (!updatedConfig) {
                    throw new gqlerr_1.ThrowGQL('Failed to update validation config', gqlerr_1.GQLThrowType.UNPROCESSABLE);
                }
                await this.trackConfigChangeService.track(config_type_enum_1.ConfigType.THRESHOLD_UPDATE, { threshold }, userId);
                return (0, parser_1.parseValidationConfigToView)(updatedConfig);
            }
            else {
                let newConfig = await this.validationConfigModel.create({
                    _id: new bson_1.ObjectId().toString(),
                    threshold,
                    updatedBy: userId,
                });
                newConfig = await newConfig.populate('updatedBy');
                await this.trackConfigChangeService.track(config_type_enum_1.ConfigType.THRESHOLD_UPDATE, { threshold }, userId);
                return (0, parser_1.parseValidationConfigToView)(newConfig);
            }
        }
        catch (error) {
            throw new gqlerr_1.ThrowGQL(error, gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
    }
};
exports.UpdateValidationThresholdService = UpdateValidationThresholdService;
exports.UpdateValidationThresholdService = UpdateValidationThresholdService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(validation_config_1.ValidationConfig.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof track_config_change_service_1.TrackConfigChangeService !== "undefined" && track_config_change_service_1.TrackConfigChangeService) === "function" ? _b : Object])
], UpdateValidationThresholdService);


/***/ }),
/* 103 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResetScoringRulesService = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(25);
const bson_1 = __webpack_require__(26);
const gqlerr_1 = __webpack_require__(9);
const scoring_rule_1 = __webpack_require__(91);
const parser_1 = __webpack_require__(98);
const track_config_change_service_1 = __webpack_require__(100);
const config_type_enum_1 = __webpack_require__(95);
const initialize_scoring_rules_service_1 = __webpack_require__(96);
let ResetScoringRulesService = class ResetScoringRulesService {
    constructor(scoringRuleModel, trackConfigChangeService, initializeScoringRulesService) {
        this.scoringRuleModel = scoringRuleModel;
        this.trackConfigChangeService = trackConfigChangeService;
        this.initializeScoringRulesService = initializeScoringRulesService;
    }
    async reset(userId) {
        try {
            await this.scoringRuleModel.deleteMany({});
            const defaultRules = this.initializeScoringRulesService.getDefaultRules();
            const rules = await this.scoringRuleModel.insertMany(defaultRules.map((rule) => ({
                ...rule,
                _id: new bson_1.ObjectId().toString(),
            })));
            await this.trackConfigChangeService.track(config_type_enum_1.ConfigType.RULE_RESET, { message: 'All rules reset to default values' }, userId);
            return rules.map(parser_1.parseScoringRuleToView);
        }
        catch (error) {
            throw new gqlerr_1.ThrowGQL(error, gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
    }
};
exports.ResetScoringRulesService = ResetScoringRulesService;
exports.ResetScoringRulesService = ResetScoringRulesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(scoring_rule_1.ScoringRule.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof track_config_change_service_1.TrackConfigChangeService !== "undefined" && track_config_change_service_1.TrackConfigChangeService) === "function" ? _b : Object, typeof (_c = typeof initialize_scoring_rules_service_1.InitializeScoringRulesService !== "undefined" && initialize_scoring_rules_service_1.InitializeScoringRulesService) === "function" ? _c : Object])
], ResetScoringRulesService);


/***/ }),
/* 104 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScoringRulesResolver = void 0;
const graphql_1 = __webpack_require__(5);
const common_1 = __webpack_require__(3);
const guards_1 = __webpack_require__(32);
const decorators_1 = __webpack_require__(36);
const get_scoring_rules_service_1 = __webpack_require__(97);
const update_scoring_rule_service_1 = __webpack_require__(99);
const toggle_scoring_rule_service_1 = __webpack_require__(101);
const update_validation_threshold_service_1 = __webpack_require__(102);
const reset_scoring_rules_service_1 = __webpack_require__(103);
const track_config_change_service_1 = __webpack_require__(100);
const scoring_rule_view_1 = __webpack_require__(105);
const validation_config_view_1 = __webpack_require__(106);
const config_history_connection_view_1 = __webpack_require__(107);
const update_scoring_rule_input_1 = __webpack_require__(109);
const attribute_type_enum_1 = __webpack_require__(92);
const types_1 = __webpack_require__(40);
const user_view_1 = __webpack_require__(38);
let ScoringRulesResolver = class ScoringRulesResolver {
    constructor(getScoringRulesService, updateScoringRuleService, toggleScoringRuleService, updateValidationThresholdService, resetScoringRulesService, trackConfigChangeService) {
        this.getScoringRulesService = getScoringRulesService;
        this.updateScoringRuleService = updateScoringRuleService;
        this.toggleScoringRuleService = toggleScoringRuleService;
        this.updateValidationThresholdService = updateValidationThresholdService;
        this.resetScoringRulesService = resetScoringRulesService;
        this.trackConfigChangeService = trackConfigChangeService;
    }
    async getScoringRules() {
        return await this.getScoringRulesService.findAll();
    }
    async getScoringRule(attribute) {
        return await this.getScoringRulesService.findByAttribute(attribute);
    }
    async getValidationConfig() {
        return await this.getScoringRulesService.getValidationConfig();
    }
    async getRuleConfigHistory(pagination) {
        return await this.trackConfigChangeService.getHistory(pagination);
    }
    async updateScoringRule(input, user) {
        return await this.updateScoringRuleService.update(input, user._id);
    }
    async updateValidationThreshold(threshold, user) {
        return await this.updateValidationThresholdService.update(threshold, user._id);
    }
    async toggleScoringRule(attribute, isActive, user) {
        return await this.toggleScoringRuleService.toggle(attribute, isActive, user._id);
    }
    async resetScoringRulesToDefault(user) {
        return await this.resetScoringRulesService.reset(user._id);
    }
};
exports.ScoringRulesResolver = ScoringRulesResolver;
__decorate([
    (0, graphql_1.Query)(() => [scoring_rule_view_1.ScoringRuleView], { name: 'getScoringRules' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('ADMIN', 'REVIEWER'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], ScoringRulesResolver.prototype, "getScoringRules", null);
__decorate([
    (0, graphql_1.Query)(() => scoring_rule_view_1.ScoringRuleView, { name: 'getScoringRule' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('ADMIN', 'REVIEWER'),
    __param(0, (0, graphql_1.Args)('attribute', { type: () => attribute_type_enum_1.AttributeType })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof attribute_type_enum_1.AttributeType !== "undefined" && attribute_type_enum_1.AttributeType) === "function" ? _h : Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], ScoringRulesResolver.prototype, "getScoringRule", null);
__decorate([
    (0, graphql_1.Query)(() => validation_config_view_1.ValidationConfigView, { name: 'getValidationConfig' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('ADMIN', 'REVIEWER'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], ScoringRulesResolver.prototype, "getValidationConfig", null);
__decorate([
    (0, graphql_1.Query)(() => config_history_connection_view_1.ConfigHistoryConnection, { name: 'getRuleConfigHistory' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('ADMIN'),
    __param(0, (0, graphql_1.Args)('pagination', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof types_1.PaginationInput !== "undefined" && types_1.PaginationInput) === "function" ? _l : Object]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], ScoringRulesResolver.prototype, "getRuleConfigHistory", null);
__decorate([
    (0, graphql_1.Mutation)(() => scoring_rule_view_1.ScoringRuleView, { name: 'updateScoringRule' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('ADMIN'),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_o = typeof update_scoring_rule_input_1.UpdateScoringRuleInput !== "undefined" && update_scoring_rule_input_1.UpdateScoringRuleInput) === "function" ? _o : Object, typeof (_p = typeof user_view_1.UserView !== "undefined" && user_view_1.UserView) === "function" ? _p : Object]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], ScoringRulesResolver.prototype, "updateScoringRule", null);
__decorate([
    (0, graphql_1.Mutation)(() => validation_config_view_1.ValidationConfigView, { name: 'updateValidationThreshold' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('ADMIN'),
    __param(0, (0, graphql_1.Args)('threshold', { type: () => graphql_1.Float })),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_r = typeof user_view_1.UserView !== "undefined" && user_view_1.UserView) === "function" ? _r : Object]),
    __metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
], ScoringRulesResolver.prototype, "updateValidationThreshold", null);
__decorate([
    (0, graphql_1.Mutation)(() => scoring_rule_view_1.ScoringRuleView, { name: 'toggleScoringRule' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('ADMIN'),
    __param(0, (0, graphql_1.Args)('attribute', { type: () => attribute_type_enum_1.AttributeType })),
    __param(1, (0, graphql_1.Args)('isActive')),
    __param(2, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_t = typeof attribute_type_enum_1.AttributeType !== "undefined" && attribute_type_enum_1.AttributeType) === "function" ? _t : Object, Boolean, typeof (_u = typeof user_view_1.UserView !== "undefined" && user_view_1.UserView) === "function" ? _u : Object]),
    __metadata("design:returntype", typeof (_v = typeof Promise !== "undefined" && Promise) === "function" ? _v : Object)
], ScoringRulesResolver.prototype, "toggleScoringRule", null);
__decorate([
    (0, graphql_1.Mutation)(() => [scoring_rule_view_1.ScoringRuleView], { name: 'resetScoringRulesToDefault' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('ADMIN'),
    __param(0, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_w = typeof user_view_1.UserView !== "undefined" && user_view_1.UserView) === "function" ? _w : Object]),
    __metadata("design:returntype", typeof (_x = typeof Promise !== "undefined" && Promise) === "function" ? _x : Object)
], ScoringRulesResolver.prototype, "resetScoringRulesToDefault", null);
exports.ScoringRulesResolver = ScoringRulesResolver = __decorate([
    (0, graphql_1.Resolver)(() => scoring_rule_view_1.ScoringRuleView),
    __metadata("design:paramtypes", [typeof (_a = typeof get_scoring_rules_service_1.GetScoringRulesService !== "undefined" && get_scoring_rules_service_1.GetScoringRulesService) === "function" ? _a : Object, typeof (_b = typeof update_scoring_rule_service_1.UpdateScoringRuleService !== "undefined" && update_scoring_rule_service_1.UpdateScoringRuleService) === "function" ? _b : Object, typeof (_c = typeof toggle_scoring_rule_service_1.ToggleScoringRuleService !== "undefined" && toggle_scoring_rule_service_1.ToggleScoringRuleService) === "function" ? _c : Object, typeof (_d = typeof update_validation_threshold_service_1.UpdateValidationThresholdService !== "undefined" && update_validation_threshold_service_1.UpdateValidationThresholdService) === "function" ? _d : Object, typeof (_e = typeof reset_scoring_rules_service_1.ResetScoringRulesService !== "undefined" && reset_scoring_rules_service_1.ResetScoringRulesService) === "function" ? _e : Object, typeof (_f = typeof track_config_change_service_1.TrackConfigChangeService !== "undefined" && track_config_change_service_1.TrackConfigChangeService) === "function" ? _f : Object])
], ScoringRulesResolver);


/***/ }),
/* 105 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScoringRuleView = void 0;
const graphql_1 = __webpack_require__(5);
const attribute_type_enum_1 = __webpack_require__(92);
let ScoringRuleView = class ScoringRuleView {
};
exports.ScoringRuleView = ScoringRuleView;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ScoringRuleView.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => attribute_type_enum_1.AttributeType),
    __metadata("design:type", typeof (_a = typeof attribute_type_enum_1.AttributeType !== "undefined" && attribute_type_enum_1.AttributeType) === "function" ? _a : Object)
], ScoringRuleView.prototype, "attribute", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ScoringRuleView.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ScoringRuleView.prototype, "criteria", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], ScoringRuleView.prototype, "weight", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], ScoringRuleView.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ScoringRuleView.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], ScoringRuleView.prototype, "updatedAt", void 0);
exports.ScoringRuleView = ScoringRuleView = __decorate([
    (0, graphql_1.ObjectType)()
], ScoringRuleView);


/***/ }),
/* 106 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValidationConfigView = void 0;
const graphql_1 = __webpack_require__(5);
const user_view_1 = __webpack_require__(38);
let ValidationConfigView = class ValidationConfigView {
};
exports.ValidationConfigView = ValidationConfigView;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ValidationConfigView.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], ValidationConfigView.prototype, "threshold", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_view_1.UserView),
    __metadata("design:type", typeof (_a = typeof user_view_1.UserView !== "undefined" && user_view_1.UserView) === "function" ? _a : Object)
], ValidationConfigView.prototype, "updatedBy", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ValidationConfigView.prototype, "updatedAt", void 0);
exports.ValidationConfigView = ValidationConfigView = __decorate([
    (0, graphql_1.ObjectType)()
], ValidationConfigView);


/***/ }),
/* 107 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigHistoryConnection = exports.ConfigHistoryEdge = void 0;
const graphql_1 = __webpack_require__(5);
const types_1 = __webpack_require__(40);
const config_history_view_1 = __webpack_require__(108);
let ConfigHistoryEdge = class ConfigHistoryEdge {
};
exports.ConfigHistoryEdge = ConfigHistoryEdge;
__decorate([
    (0, graphql_1.Field)(() => config_history_view_1.ConfigHistoryView),
    __metadata("design:type", typeof (_a = typeof config_history_view_1.ConfigHistoryView !== "undefined" && config_history_view_1.ConfigHistoryView) === "function" ? _a : Object)
], ConfigHistoryEdge.prototype, "node", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ConfigHistoryEdge.prototype, "cursor", void 0);
exports.ConfigHistoryEdge = ConfigHistoryEdge = __decorate([
    (0, graphql_1.ObjectType)()
], ConfigHistoryEdge);
let ConfigHistoryConnection = class ConfigHistoryConnection {
};
exports.ConfigHistoryConnection = ConfigHistoryConnection;
__decorate([
    (0, graphql_1.Field)(() => [ConfigHistoryEdge]),
    __metadata("design:type", Array)
], ConfigHistoryConnection.prototype, "edges", void 0);
__decorate([
    (0, graphql_1.Field)(() => types_1.PageInfo),
    __metadata("design:type", typeof (_b = typeof types_1.PageInfo !== "undefined" && types_1.PageInfo) === "function" ? _b : Object)
], ConfigHistoryConnection.prototype, "pageInfo", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], ConfigHistoryConnection.prototype, "totalCount", void 0);
exports.ConfigHistoryConnection = ConfigHistoryConnection = __decorate([
    (0, graphql_1.ObjectType)()
], ConfigHistoryConnection);


/***/ }),
/* 108 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigHistoryView = void 0;
const graphql_1 = __webpack_require__(5);
const config_type_enum_1 = __webpack_require__(95);
const attribute_type_enum_1 = __webpack_require__(92);
const user_view_1 = __webpack_require__(38);
const json_scalar_1 = __webpack_require__(17);
let ConfigHistoryView = class ConfigHistoryView {
};
exports.ConfigHistoryView = ConfigHistoryView;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ConfigHistoryView.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => config_type_enum_1.ConfigType),
    __metadata("design:type", typeof (_a = typeof config_type_enum_1.ConfigType !== "undefined" && config_type_enum_1.ConfigType) === "function" ? _a : Object)
], ConfigHistoryView.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => attribute_type_enum_1.AttributeType, { nullable: true }),
    __metadata("design:type", typeof (_b = typeof attribute_type_enum_1.AttributeType !== "undefined" && attribute_type_enum_1.AttributeType) === "function" ? _b : Object)
], ConfigHistoryView.prototype, "attribute", void 0);
__decorate([
    (0, graphql_1.Field)(() => json_scalar_1.JSONScalar),
    __metadata("design:type", Object)
], ConfigHistoryView.prototype, "changes", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_view_1.UserView),
    __metadata("design:type", typeof (_c = typeof user_view_1.UserView !== "undefined" && user_view_1.UserView) === "function" ? _c : Object)
], ConfigHistoryView.prototype, "changedBy", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ConfigHistoryView.prototype, "reason", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], ConfigHistoryView.prototype, "changedAt", void 0);
exports.ConfigHistoryView = ConfigHistoryView = __decorate([
    (0, graphql_1.ObjectType)()
], ConfigHistoryView);


/***/ }),
/* 109 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateScoringRuleInput = void 0;
const graphql_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(42);
const attribute_type_enum_1 = __webpack_require__(92);
let UpdateScoringRuleInput = class UpdateScoringRuleInput {
};
exports.UpdateScoringRuleInput = UpdateScoringRuleInput;
__decorate([
    (0, graphql_1.Field)(() => attribute_type_enum_1.AttributeType),
    (0, class_validator_1.IsEnum)(attribute_type_enum_1.AttributeType),
    __metadata("design:type", typeof (_a = typeof attribute_type_enum_1.AttributeType !== "undefined" && attribute_type_enum_1.AttributeType) === "function" ? _a : Object)
], UpdateScoringRuleInput.prototype, "attribute", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateScoringRuleInput.prototype, "weight", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateScoringRuleInput.prototype, "criteria", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateScoringRuleInput.prototype, "description", void 0);
exports.UpdateScoringRuleInput = UpdateScoringRuleInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateScoringRuleInput);


/***/ }),
/* 110 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EvaluationsModule = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(7);
const evaluation_1 = __webpack_require__(111);
const uat_reports_module_1 = __webpack_require__(56);
const scoring_rules_module_1 = __webpack_require__(90);
const users_module_1 = __webpack_require__(21);
const uat_report_1 = __webpack_require__(57);
const user_1 = __webpack_require__(22);
const test_identity_evaluator_1 = __webpack_require__(116);
const test_environment_evaluator_1 = __webpack_require__(117);
const steps_to_reproduce_evaluator_1 = __webpack_require__(118);
const actual_result_evaluator_1 = __webpack_require__(119);
const expected_result_evaluator_1 = __webpack_require__(120);
const supporting_evidence_evaluator_1 = __webpack_require__(121);
const severity_level_evaluator_1 = __webpack_require__(122);
const information_consistency_evaluator_1 = __webpack_require__(123);
const calculate_score_service_1 = __webpack_require__(124);
const determine_status_service_1 = __webpack_require__(125);
const generate_feedback_service_1 = __webpack_require__(126);
const evaluate_report_service_1 = __webpack_require__(127);
const get_evaluation_service_1 = __webpack_require__(129);
const batch_evaluate_reports_service_1 = __webpack_require__(130);
const evaluations_resolver_1 = __webpack_require__(131);
let EvaluationsModule = class EvaluationsModule {
};
exports.EvaluationsModule = EvaluationsModule;
exports.EvaluationsModule = EvaluationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: evaluation_1.Evaluation.name, schema: evaluation_1.EvaluationSchema },
                { name: uat_report_1.UATReport.name, schema: uat_report_1.UATReportSchema },
                { name: user_1.User.name, schema: user_1.UserSchema },
            ]),
            uat_reports_module_1.UATReportsModule,
            scoring_rules_module_1.ScoringRulesModule,
            users_module_1.UsersModule,
        ],
        providers: [
            test_identity_evaluator_1.TestIdentityEvaluator,
            test_environment_evaluator_1.TestEnvironmentEvaluator,
            steps_to_reproduce_evaluator_1.StepsToReproduceEvaluator,
            actual_result_evaluator_1.ActualResultEvaluator,
            expected_result_evaluator_1.ExpectedResultEvaluator,
            supporting_evidence_evaluator_1.SupportingEvidenceEvaluator,
            severity_level_evaluator_1.SeverityLevelEvaluator,
            information_consistency_evaluator_1.InformationConsistencyEvaluator,
            calculate_score_service_1.CalculateScoreService,
            determine_status_service_1.DetermineStatusService,
            generate_feedback_service_1.GenerateFeedbackService,
            evaluate_report_service_1.EvaluateReportService,
            get_evaluation_service_1.GetEvaluationService,
            batch_evaluate_reports_service_1.BatchEvaluateReportsService,
            evaluations_resolver_1.EvaluationsResolver,
        ],
        exports: [evaluate_report_service_1.EvaluateReportService, get_evaluation_service_1.GetEvaluationService],
    })
], EvaluationsModule);


/***/ }),
/* 111 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EvaluationSchema = exports.Evaluation = void 0;
const mongoose_1 = __webpack_require__(7);
const graphql_1 = __webpack_require__(5);
const mongoose_2 = __webpack_require__(25);
const attribute_score_1 = __webpack_require__(112);
const evaluation_feedback_1 = __webpack_require__(113);
const validation_status_enum_1 = __webpack_require__(115);
let Evaluation = class Evaluation {
};
exports.Evaluation = Evaluation;
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Evaluation.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.Schema.Types.String, ref: 'UATReport' }),
    __metadata("design:type", String)
], Evaluation.prototype, "reportId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [attribute_score_1.AttributeScore]),
    (0, mongoose_1.Prop)({ required: true, type: [attribute_score_1.AttributeScoreSchema] }),
    __metadata("design:type", Array)
], Evaluation.prototype, "attributeScores", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Evaluation.prototype, "totalScore", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Evaluation.prototype, "maxScore", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Evaluation.prototype, "scorePercentage", void 0);
__decorate([
    (0, graphql_1.Field)(() => validation_status_enum_1.ValidationStatus),
    (0, mongoose_1.Prop)({ required: true, type: String, enum: validation_status_enum_1.ValidationStatus }),
    __metadata("design:type", typeof (_a = typeof validation_status_enum_1.ValidationStatus !== "undefined" && validation_status_enum_1.ValidationStatus) === "function" ? _a : Object)
], Evaluation.prototype, "validationStatus", void 0);
__decorate([
    (0, graphql_1.Field)(() => [evaluation_feedback_1.EvaluationFeedback]),
    (0, mongoose_1.Prop)({ required: true, type: [evaluation_feedback_1.EvaluationFeedbackSchema], default: [] }),
    __metadata("design:type", Array)
], Evaluation.prototype, "feedback", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Evaluation.prototype, "processingTime", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, mongoose_1.Prop)({ required: false, type: mongoose_2.Schema.Types.String, ref: 'User' }),
    __metadata("design:type", String)
], Evaluation.prototype, "evaluatedBy", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ required: true, default: () => new Date() }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Evaluation.prototype, "evaluatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, mongoose_1.Prop)({ required: true, default: 1 }),
    __metadata("design:type", Number)
], Evaluation.prototype, "version", void 0);
exports.Evaluation = Evaluation = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true }),
    (0, graphql_1.ObjectType)()
], Evaluation);
exports.EvaluationSchema = mongoose_1.SchemaFactory.createForClass(Evaluation);
exports.EvaluationSchema.index({ reportId: 1 });
exports.EvaluationSchema.index({ evaluatedAt: -1 });
exports.EvaluationSchema.index({ validationStatus: 1 });
exports.EvaluationSchema.index({ reportId: 1, version: -1 });


/***/ }),
/* 112 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeScoreSchema = exports.AttributeScore = void 0;
const mongoose_1 = __webpack_require__(7);
const graphql_1 = __webpack_require__(5);
const attribute_type_enum_1 = __webpack_require__(92);
let AttributeScore = class AttributeScore {
};
exports.AttributeScore = AttributeScore;
__decorate([
    (0, graphql_1.Field)(() => attribute_type_enum_1.AttributeType),
    (0, mongoose_1.Prop)({ required: true, type: String, enum: attribute_type_enum_1.AttributeType }),
    __metadata("design:type", typeof (_a = typeof attribute_type_enum_1.AttributeType !== "undefined" && attribute_type_enum_1.AttributeType) === "function" ? _a : Object)
], AttributeScore.prototype, "attribute", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], AttributeScore.prototype, "score", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], AttributeScore.prototype, "maxScore", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], AttributeScore.prototype, "weight", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], AttributeScore.prototype, "weightedScore", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], AttributeScore.prototype, "passed", void 0);
exports.AttributeScore = AttributeScore = __decorate([
    (0, mongoose_1.Schema)({ _id: false }),
    (0, graphql_1.ObjectType)()
], AttributeScore);
exports.AttributeScoreSchema = mongoose_1.SchemaFactory.createForClass(AttributeScore);


/***/ }),
/* 113 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EvaluationFeedbackSchema = exports.EvaluationFeedback = void 0;
const mongoose_1 = __webpack_require__(7);
const graphql_1 = __webpack_require__(5);
const attribute_type_enum_1 = __webpack_require__(92);
const feedback_severity_enum_1 = __webpack_require__(114);
let EvaluationFeedback = class EvaluationFeedback {
};
exports.EvaluationFeedback = EvaluationFeedback;
__decorate([
    (0, graphql_1.Field)(() => attribute_type_enum_1.AttributeType),
    (0, mongoose_1.Prop)({ required: true, type: String, enum: attribute_type_enum_1.AttributeType }),
    __metadata("design:type", typeof (_a = typeof attribute_type_enum_1.AttributeType !== "undefined" && attribute_type_enum_1.AttributeType) === "function" ? _a : Object)
], EvaluationFeedback.prototype, "attribute", void 0);
__decorate([
    (0, graphql_1.Field)(() => feedback_severity_enum_1.FeedbackSeverity),
    (0, mongoose_1.Prop)({ required: true, type: String, enum: feedback_severity_enum_1.FeedbackSeverity }),
    __metadata("design:type", typeof (_b = typeof feedback_severity_enum_1.FeedbackSeverity !== "undefined" && feedback_severity_enum_1.FeedbackSeverity) === "function" ? _b : Object)
], EvaluationFeedback.prototype, "severity", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], EvaluationFeedback.prototype, "message", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], EvaluationFeedback.prototype, "suggestion", void 0);
exports.EvaluationFeedback = EvaluationFeedback = __decorate([
    (0, mongoose_1.Schema)({ _id: false }),
    (0, graphql_1.ObjectType)()
], EvaluationFeedback);
exports.EvaluationFeedbackSchema = mongoose_1.SchemaFactory.createForClass(EvaluationFeedback);


/***/ }),
/* 114 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FeedbackSeverity = void 0;
const graphql_1 = __webpack_require__(5);
var FeedbackSeverity;
(function (FeedbackSeverity) {
    FeedbackSeverity["ERROR"] = "ERROR";
    FeedbackSeverity["WARNING"] = "WARNING";
    FeedbackSeverity["INFO"] = "INFO";
})(FeedbackSeverity || (exports.FeedbackSeverity = FeedbackSeverity = {}));
(0, graphql_1.registerEnumType)(FeedbackSeverity, {
    name: 'FeedbackSeverity',
    description: 'Severity level of evaluation feedback',
});


/***/ }),
/* 115 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValidationStatus = void 0;
const graphql_1 = __webpack_require__(5);
var ValidationStatus;
(function (ValidationStatus) {
    ValidationStatus["VALID"] = "VALID";
    ValidationStatus["INVALID"] = "INVALID";
    ValidationStatus["PARTIAL"] = "PARTIAL";
})(ValidationStatus || (exports.ValidationStatus = ValidationStatus = {}));
(0, graphql_1.registerEnumType)(ValidationStatus, {
    name: 'ValidationStatus',
    description: 'Validation status of the evaluation',
});


/***/ }),
/* 116 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TestIdentityEvaluator = void 0;
const common_1 = __webpack_require__(3);
const attribute_type_enum_1 = __webpack_require__(92);
let TestIdentityEvaluator = class TestIdentityEvaluator {
    evaluate(report, rule) {
        const testIdentity = report.testIdentity;
        const hasAllFields = testIdentity &&
            testIdentity.testId &&
            testIdentity.title &&
            testIdentity.version;
        const score = hasAllFields ? 1 : 0;
        return {
            attribute: attribute_type_enum_1.AttributeType.TEST_IDENTITY,
            score,
            maxScore: 1,
            weight: rule.weight,
            weightedScore: score * rule.weight,
            passed: score >= 1,
        };
    }
};
exports.TestIdentityEvaluator = TestIdentityEvaluator;
exports.TestIdentityEvaluator = TestIdentityEvaluator = __decorate([
    (0, common_1.Injectable)()
], TestIdentityEvaluator);


/***/ }),
/* 117 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TestEnvironmentEvaluator = void 0;
const common_1 = __webpack_require__(3);
const attribute_type_enum_1 = __webpack_require__(92);
let TestEnvironmentEvaluator = class TestEnvironmentEvaluator {
    evaluate(report, rule) {
        const testEnvironment = report.testEnvironment;
        const hasAllFields = testEnvironment &&
            testEnvironment.os &&
            testEnvironment.browser &&
            testEnvironment.device;
        const score = hasAllFields ? 1 : 0;
        return {
            attribute: attribute_type_enum_1.AttributeType.TEST_ENVIRONMENT,
            score,
            maxScore: 1,
            weight: rule.weight,
            weightedScore: score * rule.weight,
            passed: score >= 1,
        };
    }
};
exports.TestEnvironmentEvaluator = TestEnvironmentEvaluator;
exports.TestEnvironmentEvaluator = TestEnvironmentEvaluator = __decorate([
    (0, common_1.Injectable)()
], TestEnvironmentEvaluator);


/***/ }),
/* 118 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StepsToReproduceEvaluator = void 0;
const common_1 = __webpack_require__(3);
const attribute_type_enum_1 = __webpack_require__(92);
let StepsToReproduceEvaluator = class StepsToReproduceEvaluator {
    evaluate(report, rule) {
        const steps = report.stepsToReproduce || [];
        let score = 0;
        if (steps.length >= 3) {
            const areStepsClear = steps.every((step) => step && step.length >= 10);
            score = areStepsClear ? 1 : 0.5;
        }
        return {
            attribute: attribute_type_enum_1.AttributeType.STEPS_TO_REPRODUCE,
            score,
            maxScore: 1,
            weight: rule.weight,
            weightedScore: score * rule.weight,
            passed: score >= 1,
        };
    }
};
exports.StepsToReproduceEvaluator = StepsToReproduceEvaluator;
exports.StepsToReproduceEvaluator = StepsToReproduceEvaluator = __decorate([
    (0, common_1.Injectable)()
], StepsToReproduceEvaluator);


/***/ }),
/* 119 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActualResultEvaluator = void 0;
const common_1 = __webpack_require__(3);
const attribute_type_enum_1 = __webpack_require__(92);
let ActualResultEvaluator = class ActualResultEvaluator {
    evaluate(report, rule) {
        const actualResult = report.actualResult || '';
        const score = actualResult.length >= 30 ? 1 : 0;
        return {
            attribute: attribute_type_enum_1.AttributeType.ACTUAL_RESULT,
            score,
            maxScore: 1,
            weight: rule.weight,
            weightedScore: score * rule.weight,
            passed: score >= 1,
        };
    }
};
exports.ActualResultEvaluator = ActualResultEvaluator;
exports.ActualResultEvaluator = ActualResultEvaluator = __decorate([
    (0, common_1.Injectable)()
], ActualResultEvaluator);


/***/ }),
/* 120 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExpectedResultEvaluator = void 0;
const common_1 = __webpack_require__(3);
const attribute_type_enum_1 = __webpack_require__(92);
let ExpectedResultEvaluator = class ExpectedResultEvaluator {
    evaluate(report, rule) {
        const expectedResult = report.expectedResult || '';
        const score = expectedResult && expectedResult.length >= 10 ? 1 : 0;
        return {
            attribute: attribute_type_enum_1.AttributeType.EXPECTED_RESULT,
            score,
            maxScore: 1,
            weight: rule.weight,
            weightedScore: score * rule.weight,
            passed: score >= 1,
        };
    }
};
exports.ExpectedResultEvaluator = ExpectedResultEvaluator;
exports.ExpectedResultEvaluator = ExpectedResultEvaluator = __decorate([
    (0, common_1.Injectable)()
], ExpectedResultEvaluator);


/***/ }),
/* 121 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SupportingEvidenceEvaluator = void 0;
const common_1 = __webpack_require__(3);
const attribute_type_enum_1 = __webpack_require__(92);
let SupportingEvidenceEvaluator = class SupportingEvidenceEvaluator {
    evaluate(report, rule) {
        const supportingEvidence = report.supportingEvidence || [];
        const score = supportingEvidence.length > 0 ? 1 : 0;
        return {
            attribute: attribute_type_enum_1.AttributeType.SUPPORTING_EVIDENCE,
            score,
            maxScore: 1,
            weight: rule.weight,
            weightedScore: score * rule.weight,
            passed: score >= 1,
        };
    }
};
exports.SupportingEvidenceEvaluator = SupportingEvidenceEvaluator;
exports.SupportingEvidenceEvaluator = SupportingEvidenceEvaluator = __decorate([
    (0, common_1.Injectable)()
], SupportingEvidenceEvaluator);


/***/ }),
/* 122 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SeverityLevelEvaluator = void 0;
const common_1 = __webpack_require__(3);
const attribute_type_enum_1 = __webpack_require__(92);
const severity_level_enum_1 = __webpack_require__(62);
let SeverityLevelEvaluator = class SeverityLevelEvaluator {
    evaluate(report, rule) {
        const severityLevel = report.severityLevel;
        const validLevels = [
            severity_level_enum_1.SeverityLevel.LOW,
            severity_level_enum_1.SeverityLevel.MEDIUM,
            severity_level_enum_1.SeverityLevel.HIGH,
            severity_level_enum_1.SeverityLevel.CRITICAL,
        ];
        const score = validLevels.includes(severityLevel) ? 1 : 0;
        return {
            attribute: attribute_type_enum_1.AttributeType.SEVERITY_LEVEL,
            score,
            maxScore: 1,
            weight: rule.weight,
            weightedScore: score * rule.weight,
            passed: score >= 1,
        };
    }
};
exports.SeverityLevelEvaluator = SeverityLevelEvaluator;
exports.SeverityLevelEvaluator = SeverityLevelEvaluator = __decorate([
    (0, common_1.Injectable)()
], SeverityLevelEvaluator);


/***/ }),
/* 123 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InformationConsistencyEvaluator = void 0;
const common_1 = __webpack_require__(3);
const attribute_type_enum_1 = __webpack_require__(92);
const severity_level_enum_1 = __webpack_require__(62);
let InformationConsistencyEvaluator = class InformationConsistencyEvaluator {
    evaluate(report, rule) {
        const actualResult = (report.actualResult || '').toLowerCase().trim();
        const expectedResult = (report.expectedResult || '').toLowerCase().trim();
        const areDifferent = actualResult !== expectedResult;
        const areMeaningful = actualResult.length >= 10 && expectedResult.length >= 10;
        let severityConsistent = true;
        const severityLevel = report.severityLevel;
        const combinedText = (actualResult + ' ' + expectedResult).toLowerCase();
        if (severityLevel === severity_level_enum_1.SeverityLevel.CRITICAL) {
            severityConsistent =
                combinedText.includes('crash') ||
                    combinedText.includes('fail') ||
                    combinedText.includes('error') ||
                    combinedText.includes('unable') ||
                    true;
        }
        const score = areDifferent && areMeaningful && severityConsistent ? 1 : 0;
        return {
            attribute: attribute_type_enum_1.AttributeType.INFORMATION_CONSISTENCY,
            score,
            maxScore: 1,
            weight: rule.weight,
            weightedScore: score * rule.weight,
            passed: score >= 1,
        };
    }
};
exports.InformationConsistencyEvaluator = InformationConsistencyEvaluator;
exports.InformationConsistencyEvaluator = InformationConsistencyEvaluator = __decorate([
    (0, common_1.Injectable)()
], InformationConsistencyEvaluator);


/***/ }),
/* 124 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CalculateScoreService = void 0;
const common_1 = __webpack_require__(3);
let CalculateScoreService = class CalculateScoreService {
    calculate(attributeScores) {
        const totalScore = attributeScores.reduce((sum, score) => sum + score.weightedScore, 0);
        const maxScore = attributeScores.reduce((sum, score) => sum + score.weight, 0);
        const scorePercentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
        return {
            totalScore,
            maxScore,
            scorePercentage,
        };
    }
};
exports.CalculateScoreService = CalculateScoreService;
exports.CalculateScoreService = CalculateScoreService = __decorate([
    (0, common_1.Injectable)()
], CalculateScoreService);


/***/ }),
/* 125 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DetermineStatusService = void 0;
const common_1 = __webpack_require__(3);
const validation_status_enum_1 = __webpack_require__(115);
let DetermineStatusService = class DetermineStatusService {
    determine(scorePercentage, threshold) {
        if (scorePercentage >= threshold) {
            return validation_status_enum_1.ValidationStatus.VALID;
        }
        else if (scorePercentage >= threshold * 0.5) {
            return validation_status_enum_1.ValidationStatus.PARTIAL;
        }
        else {
            return validation_status_enum_1.ValidationStatus.INVALID;
        }
    }
};
exports.DetermineStatusService = DetermineStatusService;
exports.DetermineStatusService = DetermineStatusService = __decorate([
    (0, common_1.Injectable)()
], DetermineStatusService);


/***/ }),
/* 126 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GenerateFeedbackService = void 0;
const common_1 = __webpack_require__(3);
const attribute_type_enum_1 = __webpack_require__(92);
const feedback_severity_enum_1 = __webpack_require__(114);
let GenerateFeedbackService = class GenerateFeedbackService {
    generate(attributeScores) {
        const feedback = [];
        const feedbackMap = {
            [attribute_type_enum_1.AttributeType.TEST_IDENTITY]: {
                message: 'Test identity is incomplete',
                suggestion: 'Please provide test ID, title, and version',
            },
            [attribute_type_enum_1.AttributeType.TEST_ENVIRONMENT]: {
                message: 'Test environment is incomplete',
                suggestion: 'Please provide OS, browser, and device information',
            },
            [attribute_type_enum_1.AttributeType.STEPS_TO_REPRODUCE]: {
                message: 'Steps to reproduce are insufficient',
                suggestion: 'Please provide at least 3 clear and detailed steps',
            },
            [attribute_type_enum_1.AttributeType.ACTUAL_RESULT]: {
                message: 'Actual result is too brief',
                suggestion: 'Please provide a detailed description (at least 30 characters)',
            },
            [attribute_type_enum_1.AttributeType.EXPECTED_RESULT]: {
                message: 'Expected result is missing or too brief',
                suggestion: 'Please provide a clear expected result',
            },
            [attribute_type_enum_1.AttributeType.SUPPORTING_EVIDENCE]: {
                message: 'No supporting evidence provided',
                suggestion: 'Please attach screenshots, videos, or logs',
            },
            [attribute_type_enum_1.AttributeType.SEVERITY_LEVEL]: {
                message: 'Severity level is invalid',
                suggestion: 'Please select a valid severity level (LOW, MEDIUM, HIGH, CRITICAL)',
            },
            [attribute_type_enum_1.AttributeType.INFORMATION_CONSISTENCY]: {
                message: 'Information appears inconsistent',
                suggestion: 'Please ensure actual and expected results are different and meaningful',
            },
        };
        for (const score of attributeScores) {
            if (!score.passed) {
                const feedbackInfo = feedbackMap[score.attribute];
                if (feedbackInfo) {
                    feedback.push({
                        attribute: score.attribute,
                        severity: score.score === 0
                            ? feedback_severity_enum_1.FeedbackSeverity.ERROR
                            : score.score === 0.5
                                ? feedback_severity_enum_1.FeedbackSeverity.WARNING
                                : feedback_severity_enum_1.FeedbackSeverity.INFO,
                        message: feedbackInfo.message,
                        suggestion: feedbackInfo.suggestion,
                    });
                }
            }
        }
        return feedback;
    }
};
exports.GenerateFeedbackService = GenerateFeedbackService;
exports.GenerateFeedbackService = GenerateFeedbackService = __decorate([
    (0, common_1.Injectable)()
], GenerateFeedbackService);


/***/ }),
/* 127 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EvaluateReportService = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(25);
const bson_1 = __webpack_require__(26);
const gqlerr_1 = __webpack_require__(9);
const evaluation_1 = __webpack_require__(111);
const uat_report_1 = __webpack_require__(57);
const get_scoring_rules_service_1 = __webpack_require__(97);
const test_identity_evaluator_1 = __webpack_require__(116);
const test_environment_evaluator_1 = __webpack_require__(117);
const steps_to_reproduce_evaluator_1 = __webpack_require__(118);
const actual_result_evaluator_1 = __webpack_require__(119);
const expected_result_evaluator_1 = __webpack_require__(120);
const supporting_evidence_evaluator_1 = __webpack_require__(121);
const severity_level_evaluator_1 = __webpack_require__(122);
const information_consistency_evaluator_1 = __webpack_require__(123);
const calculate_score_service_1 = __webpack_require__(124);
const determine_status_service_1 = __webpack_require__(125);
const generate_feedback_service_1 = __webpack_require__(126);
const parser_1 = __webpack_require__(128);
const attribute_type_enum_1 = __webpack_require__(92);
const report_status_enum_1 = __webpack_require__(63);
let EvaluateReportService = class EvaluateReportService {
    constructor(evaluationModel, uatReportModel, getScoringRulesService, testIdentityEvaluator, testEnvironmentEvaluator, stepsToReproduceEvaluator, actualResultEvaluator, expectedResultEvaluator, supportingEvidenceEvaluator, severityLevelEvaluator, informationConsistencyEvaluator, calculateScoreService, determineStatusService, generateFeedbackService) {
        this.evaluationModel = evaluationModel;
        this.uatReportModel = uatReportModel;
        this.getScoringRulesService = getScoringRulesService;
        this.testIdentityEvaluator = testIdentityEvaluator;
        this.testEnvironmentEvaluator = testEnvironmentEvaluator;
        this.stepsToReproduceEvaluator = stepsToReproduceEvaluator;
        this.actualResultEvaluator = actualResultEvaluator;
        this.expectedResultEvaluator = expectedResultEvaluator;
        this.supportingEvidenceEvaluator = supportingEvidenceEvaluator;
        this.severityLevelEvaluator = severityLevelEvaluator;
        this.informationConsistencyEvaluator = informationConsistencyEvaluator;
        this.calculateScoreService = calculateScoreService;
        this.determineStatusService = determineStatusService;
        this.generateFeedbackService = generateFeedbackService;
    }
    async evaluate(reportId, userId) {
        const startTime = Date.now();
        try {
            const report = await this.uatReportModel.findOne({ _id: reportId });
            if (!report) {
                throw new gqlerr_1.ThrowGQL('Report not found', gqlerr_1.GQLThrowType.NOT_FOUND);
            }
            await this.uatReportModel.updateOne({ _id: reportId }, { $set: { status: report_status_enum_1.ReportStatus.EVALUATING } });
            const rules = await this.getScoringRulesService.getActiveRules();
            const rulesMap = rules.reduce((map, rule) => {
                map[rule.attribute] = rule;
                return map;
            }, {});
            const validationConfig = await this.getScoringRulesService.getValidationConfig();
            const attributeScores = [];
            const evaluators = {
                [attribute_type_enum_1.AttributeType.TEST_IDENTITY]: this.testIdentityEvaluator,
                [attribute_type_enum_1.AttributeType.TEST_ENVIRONMENT]: this.testEnvironmentEvaluator,
                [attribute_type_enum_1.AttributeType.STEPS_TO_REPRODUCE]: this.stepsToReproduceEvaluator,
                [attribute_type_enum_1.AttributeType.ACTUAL_RESULT]: this.actualResultEvaluator,
                [attribute_type_enum_1.AttributeType.EXPECTED_RESULT]: this.expectedResultEvaluator,
                [attribute_type_enum_1.AttributeType.SUPPORTING_EVIDENCE]: this.supportingEvidenceEvaluator,
                [attribute_type_enum_1.AttributeType.SEVERITY_LEVEL]: this.severityLevelEvaluator,
                [attribute_type_enum_1.AttributeType.INFORMATION_CONSISTENCY]: this.informationConsistencyEvaluator,
            };
            for (const [attribute, evaluator] of Object.entries(evaluators)) {
                const rule = rulesMap[attribute];
                if (rule) {
                    const score = evaluator.evaluate(report.toObject(), rule);
                    attributeScores.push(score);
                }
            }
            const { totalScore, maxScore, scorePercentage } = this.calculateScoreService.calculate(attributeScores);
            const validationStatus = this.determineStatusService.determine(scorePercentage, validationConfig.threshold);
            const feedback = this.generateFeedbackService.generate(attributeScores);
            const processingTime = Date.now() - startTime;
            const latestEvaluation = await this.evaluationModel
                .findOne({ reportId })
                .sort({ version: -1 })
                .exec();
            const version = latestEvaluation ? latestEvaluation.version + 1 : 1;
            const evaluation = await this.evaluationModel.create({
                _id: new bson_1.ObjectId().toString(),
                reportId,
                attributeScores,
                totalScore,
                maxScore,
                scorePercentage,
                validationStatus,
                feedback,
                processingTime,
                evaluatedBy: userId || null,
                evaluatedAt: new Date(),
                version,
            });
            const reportStatus = validationStatus === 'VALID'
                ? report_status_enum_1.ReportStatus.VALID
                : report_status_enum_1.ReportStatus.INVALID;
            await this.uatReportModel.updateOne({ _id: reportId }, { $set: { status: reportStatus } });
            const result = (0, parser_1.parseEvaluationToView)(evaluation);
            return result;
        }
        catch (error) {
            await this.uatReportModel.updateOne({ _id: reportId }, { $set: { status: report_status_enum_1.ReportStatus.FAILED } });
            if (error instanceof gqlerr_1.ThrowGQL) {
                throw error;
            }
            throw new gqlerr_1.ThrowGQL(error, gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
    }
};
exports.EvaluateReportService = EvaluateReportService;
exports.EvaluateReportService = EvaluateReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(evaluation_1.Evaluation.name)),
    __param(1, (0, mongoose_1.InjectModel)(uat_report_1.UATReport.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object, typeof (_c = typeof get_scoring_rules_service_1.GetScoringRulesService !== "undefined" && get_scoring_rules_service_1.GetScoringRulesService) === "function" ? _c : Object, typeof (_d = typeof test_identity_evaluator_1.TestIdentityEvaluator !== "undefined" && test_identity_evaluator_1.TestIdentityEvaluator) === "function" ? _d : Object, typeof (_e = typeof test_environment_evaluator_1.TestEnvironmentEvaluator !== "undefined" && test_environment_evaluator_1.TestEnvironmentEvaluator) === "function" ? _e : Object, typeof (_f = typeof steps_to_reproduce_evaluator_1.StepsToReproduceEvaluator !== "undefined" && steps_to_reproduce_evaluator_1.StepsToReproduceEvaluator) === "function" ? _f : Object, typeof (_g = typeof actual_result_evaluator_1.ActualResultEvaluator !== "undefined" && actual_result_evaluator_1.ActualResultEvaluator) === "function" ? _g : Object, typeof (_h = typeof expected_result_evaluator_1.ExpectedResultEvaluator !== "undefined" && expected_result_evaluator_1.ExpectedResultEvaluator) === "function" ? _h : Object, typeof (_j = typeof supporting_evidence_evaluator_1.SupportingEvidenceEvaluator !== "undefined" && supporting_evidence_evaluator_1.SupportingEvidenceEvaluator) === "function" ? _j : Object, typeof (_k = typeof severity_level_evaluator_1.SeverityLevelEvaluator !== "undefined" && severity_level_evaluator_1.SeverityLevelEvaluator) === "function" ? _k : Object, typeof (_l = typeof information_consistency_evaluator_1.InformationConsistencyEvaluator !== "undefined" && information_consistency_evaluator_1.InformationConsistencyEvaluator) === "function" ? _l : Object, typeof (_m = typeof calculate_score_service_1.CalculateScoreService !== "undefined" && calculate_score_service_1.CalculateScoreService) === "function" ? _m : Object, typeof (_o = typeof determine_status_service_1.DetermineStatusService !== "undefined" && determine_status_service_1.DetermineStatusService) === "function" ? _o : Object, typeof (_p = typeof generate_feedback_service_1.GenerateFeedbackService !== "undefined" && generate_feedback_service_1.GenerateFeedbackService) === "function" ? _p : Object])
], EvaluateReportService);


/***/ }),
/* 128 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseEvaluationToView = parseEvaluationToView;
function parseEvaluationToView(doc) {
    return {
        _id: doc._id,
        reportId: doc.reportId,
        report: undefined,
        attributeScores: doc.attributeScores,
        totalScore: doc.totalScore,
        maxScore: doc.maxScore,
        scorePercentage: doc.scorePercentage,
        validationStatus: doc.validationStatus,
        feedback: doc.feedback,
        processingTime: doc.processingTime,
        evaluatedBy: doc.evaluatedBy,
        evaluatedAt: doc.evaluatedAt,
        version: doc.version,
    };
}


/***/ }),
/* 129 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetEvaluationService = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(25);
const gqlerr_1 = __webpack_require__(9);
const evaluation_1 = __webpack_require__(111);
const parser_1 = __webpack_require__(128);
let GetEvaluationService = class GetEvaluationService {
    constructor(evaluationModel) {
        this.evaluationModel = evaluationModel;
    }
    async findByReportId(reportId) {
        try {
            const evaluation = (await this.evaluationModel
                .findOne({ reportId })
                .sort({ version: -1 })
                .populate('reportId')
                .populate('evaluatedBy')
                .lean()
                .exec());
            if (!evaluation) {
                throw new gqlerr_1.ThrowGQL('Evaluation not found', gqlerr_1.GQLThrowType.NOT_FOUND);
            }
            return (0, parser_1.parseEvaluationToView)(evaluation);
        }
        catch (error) {
            if (error instanceof gqlerr_1.ThrowGQL) {
                throw error;
            }
            throw new gqlerr_1.ThrowGQL(error, gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
    }
    async findHistoryByReportId(reportId, pagination) {
        try {
            const page = pagination?.page || 1;
            const limit = pagination?.limit || 20;
            const skip = (page - 1) * limit;
            const [evaluationsResult, totalCount] = await Promise.all([
                this.evaluationModel
                    .find({ reportId })
                    .populate('reportId')
                    .populate('evaluatedBy')
                    .sort({ version: -1 })
                    .skip(skip)
                    .limit(limit)
                    .lean()
                    .exec(),
                this.evaluationModel.countDocuments({ reportId }),
            ]);
            const evaluations = evaluationsResult;
            const edges = evaluations.map((evaluation, index) => ({
                node: (0, parser_1.parseEvaluationToView)(evaluation),
                cursor: Buffer.from(`${skip + index}`).toString('base64'),
            }));
            return {
                edges,
                pageInfo: {
                    hasNextPage: skip + evaluations.length < totalCount,
                    hasPreviousPage: page > 1,
                    startCursor: edges[0]?.cursor,
                    endCursor: edges[edges.length - 1]?.cursor,
                },
                totalCount,
            };
        }
        catch (error) {
            throw new gqlerr_1.ThrowGQL(error, gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
    }
};
exports.GetEvaluationService = GetEvaluationService;
exports.GetEvaluationService = GetEvaluationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(evaluation_1.Evaluation.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], GetEvaluationService);


/***/ }),
/* 130 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BatchEvaluateReportsService = void 0;
const common_1 = __webpack_require__(3);
const gqlerr_1 = __webpack_require__(9);
const evaluate_report_service_1 = __webpack_require__(127);
let BatchEvaluateReportsService = class BatchEvaluateReportsService {
    constructor(evaluateReportService) {
        this.evaluateReportService = evaluateReportService;
    }
    async evaluateBatch(reportIds, userId) {
        try {
            const results = [];
            for (const reportId of reportIds) {
                try {
                    const evaluation = await this.evaluateReportService.evaluate(reportId, userId);
                    results.push(evaluation);
                }
                catch (error) {
                    console.error(`Failed to evaluate report ${reportId}:`, error);
                }
            }
            return results;
        }
        catch (error) {
            throw new gqlerr_1.ThrowGQL(error, gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
    }
};
exports.BatchEvaluateReportsService = BatchEvaluateReportsService;
exports.BatchEvaluateReportsService = BatchEvaluateReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof evaluate_report_service_1.EvaluateReportService !== "undefined" && evaluate_report_service_1.EvaluateReportService) === "function" ? _a : Object])
], BatchEvaluateReportsService);


/***/ }),
/* 131 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EvaluationsResolver = void 0;
const graphql_1 = __webpack_require__(5);
const common_1 = __webpack_require__(3);
const guards_1 = __webpack_require__(32);
const decorators_1 = __webpack_require__(36);
const evaluate_report_service_1 = __webpack_require__(127);
const get_evaluation_service_1 = __webpack_require__(129);
const batch_evaluate_reports_service_1 = __webpack_require__(130);
const evaluation_view_1 = __webpack_require__(132);
const evaluation_connection_view_1 = __webpack_require__(133);
const uat_report_view_1 = __webpack_require__(73);
const user_view_1 = __webpack_require__(38);
const get_uat_report_service_1 = __webpack_require__(66);
const get_user_service_1 = __webpack_require__(29);
const types_1 = __webpack_require__(40);
let EvaluationsResolver = class EvaluationsResolver {
    constructor(evaluateReportService, getEvaluationService, batchEvaluateReportsService, getUATReportService, getUserService) {
        this.evaluateReportService = evaluateReportService;
        this.getEvaluationService = getEvaluationService;
        this.batchEvaluateReportsService = batchEvaluateReportsService;
        this.getUATReportService = getUATReportService;
        this.getUserService = getUserService;
    }
    async evaluateReport(id, user) {
        return await this.evaluateReportService.evaluate(id, user._id);
    }
    async evaluateBatchReports(ids, user) {
        return await this.batchEvaluateReportsService.evaluateBatch(ids, user._id);
    }
    async getEvaluation(reportId) {
        return this.getEvaluationService.findByReportId(reportId);
    }
    async getEvaluationHistory(reportId, pagination) {
        return this.getEvaluationService.findHistoryByReportId(reportId, pagination);
    }
    async getReport(evaluation) {
        if (typeof evaluation.reportId === 'object' &&
            evaluation.reportId !== null) {
            return evaluation.reportId;
        }
        return await this.getUATReportService.findById(evaluation.reportId);
    }
    async getEvaluatedBy(evaluation) {
        if (!evaluation.evaluatedBy) {
            return null;
        }
        if (typeof evaluation.evaluatedBy === 'object' &&
            evaluation.evaluatedBy !== null) {
            return evaluation.evaluatedBy;
        }
        return await this.getUserService.findById(evaluation.evaluatedBy);
    }
};
exports.EvaluationsResolver = EvaluationsResolver;
__decorate([
    (0, graphql_1.Mutation)(() => evaluation_view_1.EvaluationView, { name: 'evaluateReport' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('ADMIN', 'REVIEWER'),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_f = typeof user_view_1.UserView !== "undefined" && user_view_1.UserView) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], EvaluationsResolver.prototype, "evaluateReport", null);
__decorate([
    (0, graphql_1.Mutation)(() => [evaluation_view_1.EvaluationView], { name: 'evaluateBatchReports' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('ADMIN', 'REVIEWER'),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [String] })),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, typeof (_h = typeof user_view_1.UserView !== "undefined" && user_view_1.UserView) === "function" ? _h : Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], EvaluationsResolver.prototype, "evaluateBatchReports", null);
__decorate([
    (0, graphql_1.Query)(() => evaluation_view_1.EvaluationView, { name: 'getEvaluation' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('reportId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], EvaluationsResolver.prototype, "getEvaluation", null);
__decorate([
    (0, graphql_1.Query)(() => evaluation_connection_view_1.EvaluationConnection, { name: 'getEvaluationHistory' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('reportId')),
    __param(1, (0, graphql_1.Args)('pagination', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_l = typeof types_1.PaginationInput !== "undefined" && types_1.PaginationInput) === "function" ? _l : Object]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], EvaluationsResolver.prototype, "getEvaluationHistory", null);
__decorate([
    (0, graphql_1.ResolveField)(() => uat_report_view_1.UATReportView, { name: 'report' }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_o = typeof evaluation_view_1.EvaluationView !== "undefined" && evaluation_view_1.EvaluationView) === "function" ? _o : Object]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], EvaluationsResolver.prototype, "getReport", null);
__decorate([
    (0, graphql_1.ResolveField)(() => user_view_1.UserView, { name: 'evaluatedBy', nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_q = typeof evaluation_view_1.EvaluationView !== "undefined" && evaluation_view_1.EvaluationView) === "function" ? _q : Object]),
    __metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
], EvaluationsResolver.prototype, "getEvaluatedBy", null);
exports.EvaluationsResolver = EvaluationsResolver = __decorate([
    (0, graphql_1.Resolver)(() => evaluation_view_1.EvaluationView),
    __metadata("design:paramtypes", [typeof (_a = typeof evaluate_report_service_1.EvaluateReportService !== "undefined" && evaluate_report_service_1.EvaluateReportService) === "function" ? _a : Object, typeof (_b = typeof get_evaluation_service_1.GetEvaluationService !== "undefined" && get_evaluation_service_1.GetEvaluationService) === "function" ? _b : Object, typeof (_c = typeof batch_evaluate_reports_service_1.BatchEvaluateReportsService !== "undefined" && batch_evaluate_reports_service_1.BatchEvaluateReportsService) === "function" ? _c : Object, typeof (_d = typeof get_uat_report_service_1.GetUATReportService !== "undefined" && get_uat_report_service_1.GetUATReportService) === "function" ? _d : Object, typeof (_e = typeof get_user_service_1.GetUserService !== "undefined" && get_user_service_1.GetUserService) === "function" ? _e : Object])
], EvaluationsResolver);


/***/ }),
/* 132 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EvaluationView = void 0;
const graphql_1 = __webpack_require__(5);
const attribute_score_1 = __webpack_require__(112);
const evaluation_feedback_1 = __webpack_require__(113);
const validation_status_enum_1 = __webpack_require__(115);
const uat_report_view_1 = __webpack_require__(73);
const user_view_1 = __webpack_require__(38);
let EvaluationView = class EvaluationView {
};
exports.EvaluationView = EvaluationView;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], EvaluationView.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], EvaluationView.prototype, "reportId", void 0);
__decorate([
    (0, graphql_1.Field)(() => uat_report_view_1.UATReportView),
    __metadata("design:type", typeof (_a = typeof uat_report_view_1.UATReportView !== "undefined" && uat_report_view_1.UATReportView) === "function" ? _a : Object)
], EvaluationView.prototype, "report", void 0);
__decorate([
    (0, graphql_1.Field)(() => [attribute_score_1.AttributeScore]),
    __metadata("design:type", Array)
], EvaluationView.prototype, "attributeScores", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], EvaluationView.prototype, "totalScore", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], EvaluationView.prototype, "maxScore", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], EvaluationView.prototype, "scorePercentage", void 0);
__decorate([
    (0, graphql_1.Field)(() => validation_status_enum_1.ValidationStatus),
    __metadata("design:type", typeof (_b = typeof validation_status_enum_1.ValidationStatus !== "undefined" && validation_status_enum_1.ValidationStatus) === "function" ? _b : Object)
], EvaluationView.prototype, "validationStatus", void 0);
__decorate([
    (0, graphql_1.Field)(() => [evaluation_feedback_1.EvaluationFeedback]),
    __metadata("design:type", Array)
], EvaluationView.prototype, "feedback", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], EvaluationView.prototype, "processingTime", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_view_1.UserView, { nullable: true }),
    __metadata("design:type", typeof (_c = typeof user_view_1.UserView !== "undefined" && user_view_1.UserView) === "function" ? _c : Object)
], EvaluationView.prototype, "evaluatedBy", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], EvaluationView.prototype, "evaluatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], EvaluationView.prototype, "version", void 0);
exports.EvaluationView = EvaluationView = __decorate([
    (0, graphql_1.ObjectType)()
], EvaluationView);


/***/ }),
/* 133 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EvaluationConnection = exports.EvaluationEdge = void 0;
const graphql_1 = __webpack_require__(5);
const types_1 = __webpack_require__(40);
const evaluation_view_1 = __webpack_require__(132);
let EvaluationEdge = class EvaluationEdge {
};
exports.EvaluationEdge = EvaluationEdge;
__decorate([
    (0, graphql_1.Field)(() => evaluation_view_1.EvaluationView),
    __metadata("design:type", typeof (_a = typeof evaluation_view_1.EvaluationView !== "undefined" && evaluation_view_1.EvaluationView) === "function" ? _a : Object)
], EvaluationEdge.prototype, "node", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], EvaluationEdge.prototype, "cursor", void 0);
exports.EvaluationEdge = EvaluationEdge = __decorate([
    (0, graphql_1.ObjectType)()
], EvaluationEdge);
let EvaluationConnection = class EvaluationConnection {
};
exports.EvaluationConnection = EvaluationConnection;
__decorate([
    (0, graphql_1.Field)(() => [EvaluationEdge]),
    __metadata("design:type", Array)
], EvaluationConnection.prototype, "edges", void 0);
__decorate([
    (0, graphql_1.Field)(() => types_1.PageInfo),
    __metadata("design:type", typeof (_b = typeof types_1.PageInfo !== "undefined" && types_1.PageInfo) === "function" ? _b : Object)
], EvaluationConnection.prototype, "pageInfo", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], EvaluationConnection.prototype, "totalCount", void 0);
exports.EvaluationConnection = EvaluationConnection = __decorate([
    (0, graphql_1.ObjectType)()
], EvaluationConnection);


/***/ }),
/* 134 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditLogsModule = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(7);
const audit_log_1 = __webpack_require__(135);
const user_1 = __webpack_require__(22);
const create_audit_log_service_1 = __webpack_require__(138);
const get_audit_logs_service_1 = __webpack_require__(139);
const audit_logs_resolver_1 = __webpack_require__(140);
let AuditLogsModule = class AuditLogsModule {
};
exports.AuditLogsModule = AuditLogsModule;
exports.AuditLogsModule = AuditLogsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: audit_log_1.AuditLog.name, schema: audit_log_1.AuditLogSchema },
                { name: user_1.User.name, schema: user_1.UserSchema },
            ]),
        ],
        providers: [create_audit_log_service_1.CreateAuditLogService, get_audit_logs_service_1.GetAuditLogsService, audit_logs_resolver_1.AuditLogsResolver],
        exports: [create_audit_log_service_1.CreateAuditLogService],
    })
], AuditLogsModule);


/***/ }),
/* 135 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditLogSchema = exports.AuditLog = void 0;
const mongoose_1 = __webpack_require__(7);
const graphql_1 = __webpack_require__(5);
const mongoose_2 = __webpack_require__(25);
const audit_action_enum_1 = __webpack_require__(136);
const audit_entity_enum_1 = __webpack_require__(137);
const json_scalar_1 = __webpack_require__(17);
let AuditLog = class AuditLog {
};
exports.AuditLog = AuditLog;
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], AuditLog.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.Schema.Types.String, ref: 'User' }),
    __metadata("design:type", String)
], AuditLog.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => audit_action_enum_1.AuditAction),
    (0, mongoose_1.Prop)({ required: true, type: String, enum: audit_action_enum_1.AuditAction }),
    __metadata("design:type", typeof (_a = typeof audit_action_enum_1.AuditAction !== "undefined" && audit_action_enum_1.AuditAction) === "function" ? _a : Object)
], AuditLog.prototype, "action", void 0);
__decorate([
    (0, graphql_1.Field)(() => audit_entity_enum_1.AuditEntity),
    (0, mongoose_1.Prop)({ required: true, type: String, enum: audit_entity_enum_1.AuditEntity }),
    __metadata("design:type", typeof (_b = typeof audit_entity_enum_1.AuditEntity !== "undefined" && audit_entity_enum_1.AuditEntity) === "function" ? _b : Object)
], AuditLog.prototype, "entity", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], AuditLog.prototype, "entityId", void 0);
__decorate([
    (0, graphql_1.Field)(() => json_scalar_1.JSONScalar, { nullable: true }),
    (0, mongoose_1.Prop)({ required: false, type: mongoose_2.Schema.Types.Mixed }),
    __metadata("design:type", Object)
], AuditLog.prototype, "changes", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], AuditLog.prototype, "ipAddress", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], AuditLog.prototype, "userAgent", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], AuditLog.prototype, "timestamp", void 0);
exports.AuditLog = AuditLog = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true }),
    (0, graphql_1.ObjectType)()
], AuditLog);
exports.AuditLogSchema = mongoose_1.SchemaFactory.createForClass(AuditLog);
exports.AuditLogSchema.index({ user: 1 });
exports.AuditLogSchema.index({ action: 1 });
exports.AuditLogSchema.index({ entity: 1 });
exports.AuditLogSchema.index({ timestamp: -1 });
exports.AuditLogSchema.index({ user: 1, timestamp: -1 });


/***/ }),
/* 136 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditAction = void 0;
const graphql_1 = __webpack_require__(5);
var AuditAction;
(function (AuditAction) {
    AuditAction["CREATE"] = "CREATE";
    AuditAction["UPDATE"] = "UPDATE";
    AuditAction["DELETE"] = "DELETE";
    AuditAction["EVALUATE"] = "EVALUATE";
    AuditAction["EXPORT"] = "EXPORT";
    AuditAction["LOGIN"] = "LOGIN";
    AuditAction["LOGOUT"] = "LOGOUT";
    AuditAction["CONFIG_CHANGE"] = "CONFIG_CHANGE";
})(AuditAction || (exports.AuditAction = AuditAction = {}));
(0, graphql_1.registerEnumType)(AuditAction, {
    name: 'AuditAction',
    description: 'Type of action performed',
});


/***/ }),
/* 137 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditEntity = void 0;
const graphql_1 = __webpack_require__(5);
var AuditEntity;
(function (AuditEntity) {
    AuditEntity["UAT_REPORT"] = "UAT_REPORT";
    AuditEntity["EVALUATION"] = "EVALUATION";
    AuditEntity["SCORING_RULE"] = "SCORING_RULE";
    AuditEntity["VALIDATION_CONFIG"] = "VALIDATION_CONFIG";
    AuditEntity["USER"] = "USER";
})(AuditEntity || (exports.AuditEntity = AuditEntity = {}));
(0, graphql_1.registerEnumType)(AuditEntity, {
    name: 'AuditEntity',
    description: 'Type of entity affected',
});


/***/ }),
/* 138 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAuditLogService = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(25);
const bson_1 = __webpack_require__(26);
const audit_log_1 = __webpack_require__(135);
let CreateAuditLogService = class CreateAuditLogService {
    constructor(auditLogModel) {
        this.auditLogModel = auditLogModel;
    }
    async log(userId, action, entity, entityId, changes, ipAddress, userAgent) {
        try {
            await this.auditLogModel.create({
                _id: new bson_1.ObjectId().toString(),
                user: userId,
                action,
                entity,
                entityId,
                changes,
                ipAddress,
                userAgent,
                timestamp: new Date(),
            });
        }
        catch (error) {
            console.error('Failed to create audit log:', error);
        }
    }
};
exports.CreateAuditLogService = CreateAuditLogService;
exports.CreateAuditLogService = CreateAuditLogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(audit_log_1.AuditLog.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], CreateAuditLogService);


/***/ }),
/* 139 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetAuditLogsService = void 0;
const common_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(7);
const mongoose_2 = __webpack_require__(25);
const gqlerr_1 = __webpack_require__(9);
const audit_log_1 = __webpack_require__(135);
let GetAuditLogsService = class GetAuditLogsService {
    constructor(auditLogModel) {
        this.auditLogModel = auditLogModel;
    }
    async findAll(filter, pagination) {
        try {
            const query = {};
            if (filter?.userId) {
                query.user = filter.userId;
            }
            if (filter?.action && filter.action.length > 0) {
                query.action = { $in: filter.action };
            }
            if (filter?.entity && filter.entity.length > 0) {
                query.entity = { $in: filter.entity };
            }
            if (filter?.dateRange) {
                query.timestamp = {
                    $gte: filter.dateRange.from,
                    $lte: filter.dateRange.to,
                };
            }
            const page = pagination?.page || 1;
            const limit = pagination?.limit || 20;
            const skip = (page - 1) * limit;
            const [logs, totalCount] = await Promise.all([
                this.auditLogModel
                    .find(query)
                    .populate('user')
                    .sort({ timestamp: -1 })
                    .skip(skip)
                    .limit(limit)
                    .exec(),
                this.auditLogModel.countDocuments(query),
            ]);
            const edges = logs.map((log, index) => ({
                node: log.toObject(),
                cursor: Buffer.from(`${skip + index}`).toString('base64'),
            }));
            return {
                edges,
                pageInfo: {
                    hasNextPage: skip + logs.length < totalCount,
                    hasPreviousPage: page > 1,
                    startCursor: edges[0]?.cursor,
                    endCursor: edges[edges.length - 1]?.cursor,
                },
                totalCount,
            };
        }
        catch (error) {
            throw new gqlerr_1.ThrowGQL(error, gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
    }
};
exports.GetAuditLogsService = GetAuditLogsService;
exports.GetAuditLogsService = GetAuditLogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(audit_log_1.AuditLog.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], GetAuditLogsService);


/***/ }),
/* 140 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditLogsResolver = void 0;
const graphql_1 = __webpack_require__(5);
const common_1 = __webpack_require__(3);
const guards_1 = __webpack_require__(32);
const decorators_1 = __webpack_require__(36);
const get_audit_logs_service_1 = __webpack_require__(139);
const audit_log_connection_view_1 = __webpack_require__(141);
const audit_log_filter_input_1 = __webpack_require__(143);
const types_1 = __webpack_require__(40);
let AuditLogsResolver = class AuditLogsResolver {
    constructor(getAuditLogsService) {
        this.getAuditLogsService = getAuditLogsService;
    }
    async getAuditLogs(filter, pagination) {
        return this.getAuditLogsService.findAll(filter, pagination);
    }
};
exports.AuditLogsResolver = AuditLogsResolver;
__decorate([
    (0, graphql_1.Query)(() => audit_log_connection_view_1.AuditLogConnection, { name: 'getAuditLogs' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('ADMIN'),
    __param(0, (0, graphql_1.Args)('filter', { nullable: true })),
    __param(1, (0, graphql_1.Args)('pagination', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof audit_log_filter_input_1.AuditLogFilterInput !== "undefined" && audit_log_filter_input_1.AuditLogFilterInput) === "function" ? _b : Object, typeof (_c = typeof types_1.PaginationInput !== "undefined" && types_1.PaginationInput) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], AuditLogsResolver.prototype, "getAuditLogs", null);
exports.AuditLogsResolver = AuditLogsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [typeof (_a = typeof get_audit_logs_service_1.GetAuditLogsService !== "undefined" && get_audit_logs_service_1.GetAuditLogsService) === "function" ? _a : Object])
], AuditLogsResolver);


/***/ }),
/* 141 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditLogConnection = exports.AuditLogEdge = void 0;
const graphql_1 = __webpack_require__(5);
const types_1 = __webpack_require__(40);
const audit_log_view_1 = __webpack_require__(142);
let AuditLogEdge = class AuditLogEdge {
};
exports.AuditLogEdge = AuditLogEdge;
__decorate([
    (0, graphql_1.Field)(() => audit_log_view_1.AuditLogView),
    __metadata("design:type", typeof (_a = typeof audit_log_view_1.AuditLogView !== "undefined" && audit_log_view_1.AuditLogView) === "function" ? _a : Object)
], AuditLogEdge.prototype, "node", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AuditLogEdge.prototype, "cursor", void 0);
exports.AuditLogEdge = AuditLogEdge = __decorate([
    (0, graphql_1.ObjectType)()
], AuditLogEdge);
let AuditLogConnection = class AuditLogConnection {
};
exports.AuditLogConnection = AuditLogConnection;
__decorate([
    (0, graphql_1.Field)(() => [AuditLogEdge]),
    __metadata("design:type", Array)
], AuditLogConnection.prototype, "edges", void 0);
__decorate([
    (0, graphql_1.Field)(() => types_1.PageInfo),
    __metadata("design:type", typeof (_b = typeof types_1.PageInfo !== "undefined" && types_1.PageInfo) === "function" ? _b : Object)
], AuditLogConnection.prototype, "pageInfo", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], AuditLogConnection.prototype, "totalCount", void 0);
exports.AuditLogConnection = AuditLogConnection = __decorate([
    (0, graphql_1.ObjectType)()
], AuditLogConnection);


/***/ }),
/* 142 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditLogView = void 0;
const graphql_1 = __webpack_require__(5);
const audit_action_enum_1 = __webpack_require__(136);
const audit_entity_enum_1 = __webpack_require__(137);
const user_view_1 = __webpack_require__(38);
const json_scalar_1 = __webpack_require__(17);
let AuditLogView = class AuditLogView {
};
exports.AuditLogView = AuditLogView;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AuditLogView.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_view_1.UserView),
    __metadata("design:type", typeof (_a = typeof user_view_1.UserView !== "undefined" && user_view_1.UserView) === "function" ? _a : Object)
], AuditLogView.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => audit_action_enum_1.AuditAction),
    __metadata("design:type", typeof (_b = typeof audit_action_enum_1.AuditAction !== "undefined" && audit_action_enum_1.AuditAction) === "function" ? _b : Object)
], AuditLogView.prototype, "action", void 0);
__decorate([
    (0, graphql_1.Field)(() => audit_entity_enum_1.AuditEntity),
    __metadata("design:type", typeof (_c = typeof audit_entity_enum_1.AuditEntity !== "undefined" && audit_entity_enum_1.AuditEntity) === "function" ? _c : Object)
], AuditLogView.prototype, "entity", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AuditLogView.prototype, "entityId", void 0);
__decorate([
    (0, graphql_1.Field)(() => json_scalar_1.JSONScalar, { nullable: true }),
    __metadata("design:type", Object)
], AuditLogView.prototype, "changes", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], AuditLogView.prototype, "ipAddress", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], AuditLogView.prototype, "userAgent", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], AuditLogView.prototype, "timestamp", void 0);
exports.AuditLogView = AuditLogView = __decorate([
    (0, graphql_1.ObjectType)()
], AuditLogView);


/***/ }),
/* 143 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditLogFilterInput = void 0;
const graphql_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(42);
const class_transformer_1 = __webpack_require__(78);
const audit_action_enum_1 = __webpack_require__(136);
const audit_entity_enum_1 = __webpack_require__(137);
const date_range_input_1 = __webpack_require__(86);
let AuditLogFilterInput = class AuditLogFilterInput {
};
exports.AuditLogFilterInput = AuditLogFilterInput;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AuditLogFilterInput.prototype, "userId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [audit_action_enum_1.AuditAction], { nullable: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(audit_action_enum_1.AuditAction, { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AuditLogFilterInput.prototype, "action", void 0);
__decorate([
    (0, graphql_1.Field)(() => [audit_entity_enum_1.AuditEntity], { nullable: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(audit_entity_enum_1.AuditEntity, { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AuditLogFilterInput.prototype, "entity", void 0);
__decorate([
    (0, graphql_1.Field)(() => date_range_input_1.DateRangeInput, { nullable: true }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => date_range_input_1.DateRangeInput),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_a = typeof date_range_input_1.DateRangeInput !== "undefined" && date_range_input_1.DateRangeInput) === "function" ? _a : Object)
], AuditLogFilterInput.prototype, "dateRange", void 0);
exports.AuditLogFilterInput = AuditLogFilterInput = __decorate([
    (0, graphql_1.InputType)()
], AuditLogFilterInput);


/***/ }),
/* 144 */
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),
/* 145 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.configService = void 0;
exports.configService = {
    getPort() {
        const portFromEnv = process.env.PORT;
        const port = portFromEnv ? parseInt(portFromEnv, 10) : 3000;
        return Number.isNaN(port) ? 3000 : port;
    },
};


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;
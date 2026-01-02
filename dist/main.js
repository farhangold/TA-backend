/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./libs/gqlerr/src/index.ts":
/*!**********************************!*\
  !*** ./libs/gqlerr/src/index.ts ***!
  \**********************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const type_1 = __webpack_require__(/*! ./type */ "./libs/gqlerr/src/type.ts");
__exportStar(__webpack_require__(/*! ./type */ "./libs/gqlerr/src/type.ts"), exports);
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

/***/ "./libs/gqlerr/src/type.ts":
/*!*********************************!*\
  !*** ./libs/gqlerr/src/type.ts ***!
  \*********************************/
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

/***/ "./src/app.module.ts":
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const apollo_1 = __webpack_require__(/*! @nestjs/apollo */ "@nestjs/apollo");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const throttler_1 = __webpack_require__(/*! @nestjs/throttler */ "@nestjs/throttler");
const gqlerr_1 = __webpack_require__(/*! @app/gqlerr */ "./libs/gqlerr/src/index.ts");
const app_config_1 = __webpack_require__(/*! ./config/app.config */ "./src/config/app.config.ts");
const database_config_1 = __webpack_require__(/*! ./config/database.config */ "./src/config/database.config.ts");
const jwt_config_1 = __webpack_require__(/*! ./config/jwt.config */ "./src/config/jwt.config.ts");
const throttle_config_1 = __webpack_require__(/*! ./config/throttle.config */ "./src/config/throttle.config.ts");
const llm_config_1 = __webpack_require__(/*! ./llm/config/llm.config */ "./src/llm/config/llm.config.ts");
const date_time_scalar_1 = __webpack_require__(/*! ./common/scalars/date-time.scalar */ "./src/common/scalars/date-time.scalar.ts");
const json_scalar_1 = __webpack_require__(/*! ./common/scalars/json.scalar */ "./src/common/scalars/json.scalar.ts");
const auth_module_1 = __webpack_require__(/*! ./auth/auth.module */ "./src/auth/auth.module.ts");
const users_module_1 = __webpack_require__(/*! ./users/users.module */ "./src/users/users.module.ts");
const uat_reports_module_1 = __webpack_require__(/*! ./uat-reports/uat-reports.module */ "./src/uat-reports/uat-reports.module.ts");
const scoring_rules_module_1 = __webpack_require__(/*! ./scoring-rules/scoring-rules.module */ "./src/scoring-rules/scoring-rules.module.ts");
const evaluations_module_1 = __webpack_require__(/*! ./evaluations/evaluations.module */ "./src/evaluations/evaluations.module.ts");
const audit_logs_module_1 = __webpack_require__(/*! ./audit-logs/audit-logs.module */ "./src/audit-logs/audit-logs.module.ts");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [app_config_1.default, database_config_1.default, jwt_config_1.default, throttle_config_1.default, llm_config_1.default],
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

/***/ "./src/audit-logs/audit-logs.module.ts":
/*!*********************************************!*\
  !*** ./src/audit-logs/audit-logs.module.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditLogsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const audit_log_1 = __webpack_require__(/*! ./models/audit-log */ "./src/audit-logs/models/audit-log.ts");
const user_1 = __webpack_require__(/*! ../users/models/user */ "./src/users/models/user.ts");
const create_audit_log_service_1 = __webpack_require__(/*! ./services/create-audit-log.service */ "./src/audit-logs/services/create-audit-log.service.ts");
const get_audit_logs_service_1 = __webpack_require__(/*! ./services/get-audit-logs.service */ "./src/audit-logs/services/get-audit-logs.service.ts");
const audit_logs_resolver_1 = __webpack_require__(/*! ./audit-logs.resolver */ "./src/audit-logs/audit-logs.resolver.ts");
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

/***/ "./src/audit-logs/audit-logs.resolver.ts":
/*!***********************************************!*\
  !*** ./src/audit-logs/audit-logs.resolver.ts ***!
  \***********************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const guards_1 = __webpack_require__(/*! ../common/guards */ "./src/common/guards/index.ts");
const decorators_1 = __webpack_require__(/*! ../common/decorators */ "./src/common/decorators/index.ts");
const get_audit_logs_service_1 = __webpack_require__(/*! ./services/get-audit-logs.service */ "./src/audit-logs/services/get-audit-logs.service.ts");
const audit_log_connection_view_1 = __webpack_require__(/*! ./dto/views/audit-log-connection.view */ "./src/audit-logs/dto/views/audit-log-connection.view.ts");
const audit_log_filter_input_1 = __webpack_require__(/*! ./dto/inputs/audit-log-filter.input */ "./src/audit-logs/dto/inputs/audit-log-filter.input.ts");
const types_1 = __webpack_require__(/*! ../common/types */ "./src/common/types/index.ts");
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

/***/ "./src/audit-logs/dto/inputs/audit-log-filter.input.ts":
/*!*************************************************************!*\
  !*** ./src/audit-logs/dto/inputs/audit-log-filter.input.ts ***!
  \*************************************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const audit_action_enum_1 = __webpack_require__(/*! ../../enums/audit-action.enum */ "./src/audit-logs/enums/audit-action.enum.ts");
const audit_entity_enum_1 = __webpack_require__(/*! ../../enums/audit-entity.enum */ "./src/audit-logs/enums/audit-entity.enum.ts");
const date_range_input_1 = __webpack_require__(/*! ../../../uat-reports/dto/inputs/date-range.input */ "./src/uat-reports/dto/inputs/date-range.input.ts");
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

/***/ "./src/audit-logs/dto/views/audit-log-connection.view.ts":
/*!***************************************************************!*\
  !*** ./src/audit-logs/dto/views/audit-log-connection.view.ts ***!
  \***************************************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const types_1 = __webpack_require__(/*! ../../../common/types */ "./src/common/types/index.ts");
const audit_log_view_1 = __webpack_require__(/*! ./audit-log.view */ "./src/audit-logs/dto/views/audit-log.view.ts");
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

/***/ "./src/audit-logs/dto/views/audit-log.view.ts":
/*!****************************************************!*\
  !*** ./src/audit-logs/dto/views/audit-log.view.ts ***!
  \****************************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const audit_action_enum_1 = __webpack_require__(/*! ../../enums/audit-action.enum */ "./src/audit-logs/enums/audit-action.enum.ts");
const audit_entity_enum_1 = __webpack_require__(/*! ../../enums/audit-entity.enum */ "./src/audit-logs/enums/audit-entity.enum.ts");
const user_view_1 = __webpack_require__(/*! ../../../users/dto/views/user.view */ "./src/users/dto/views/user.view.ts");
const json_scalar_1 = __webpack_require__(/*! ../../../common/scalars/json.scalar */ "./src/common/scalars/json.scalar.ts");
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

/***/ "./src/audit-logs/enums/audit-action.enum.ts":
/*!***************************************************!*\
  !*** ./src/audit-logs/enums/audit-action.enum.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditAction = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
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

/***/ "./src/audit-logs/enums/audit-entity.enum.ts":
/*!***************************************************!*\
  !*** ./src/audit-logs/enums/audit-entity.enum.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuditEntity = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
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

/***/ "./src/audit-logs/models/audit-log.ts":
/*!********************************************!*\
  !*** ./src/audit-logs/models/audit-log.ts ***!
  \********************************************/
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
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const audit_action_enum_1 = __webpack_require__(/*! ../enums/audit-action.enum */ "./src/audit-logs/enums/audit-action.enum.ts");
const audit_entity_enum_1 = __webpack_require__(/*! ../enums/audit-entity.enum */ "./src/audit-logs/enums/audit-entity.enum.ts");
const json_scalar_1 = __webpack_require__(/*! ../../common/scalars/json.scalar */ "./src/common/scalars/json.scalar.ts");
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

/***/ "./src/audit-logs/services/create-audit-log.service.ts":
/*!*************************************************************!*\
  !*** ./src/audit-logs/services/create-audit-log.service.ts ***!
  \*************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const bson_1 = __webpack_require__(/*! bson */ "bson");
const audit_log_1 = __webpack_require__(/*! ../models/audit-log */ "./src/audit-logs/models/audit-log.ts");
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

/***/ "./src/audit-logs/services/get-audit-logs.service.ts":
/*!***********************************************************!*\
  !*** ./src/audit-logs/services/get-audit-logs.service.ts ***!
  \***********************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const gqlerr_1 = __webpack_require__(/*! @app/gqlerr */ "./libs/gqlerr/src/index.ts");
const audit_log_1 = __webpack_require__(/*! ../models/audit-log */ "./src/audit-logs/models/audit-log.ts");
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

/***/ "./src/auth/auth.module.ts":
/*!*********************************!*\
  !*** ./src/auth/auth.module.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const users_module_1 = __webpack_require__(/*! ../users/users.module */ "./src/users/users.module.ts");
const auth_service_1 = __webpack_require__(/*! ./services/auth.service */ "./src/auth/services/auth.service.ts");
const token_service_1 = __webpack_require__(/*! ./services/token.service */ "./src/auth/services/token.service.ts");
const jwt_strategy_1 = __webpack_require__(/*! ./strategies/jwt.strategy */ "./src/auth/strategies/jwt.strategy.ts");
const auth_resolver_1 = __webpack_require__(/*! ./auth.resolver */ "./src/auth/auth.resolver.ts");
const user_1 = __webpack_require__(/*! ../users/models/user */ "./src/users/models/user.ts");
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

/***/ "./src/auth/auth.resolver.ts":
/*!***********************************!*\
  !*** ./src/auth/auth.resolver.ts ***!
  \***********************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_service_1 = __webpack_require__(/*! ./services/auth.service */ "./src/auth/services/auth.service.ts");
const login_input_1 = __webpack_require__(/*! ./dto/inputs/login.input */ "./src/auth/dto/inputs/login.input.ts");
const public_register_input_1 = __webpack_require__(/*! ./dto/inputs/public-register.input */ "./src/auth/dto/inputs/public-register.input.ts");
const auth_payload_view_1 = __webpack_require__(/*! ./dto/views/auth-payload.view */ "./src/auth/dto/views/auth-payload.view.ts");
const guards_1 = __webpack_require__(/*! ../common/guards */ "./src/common/guards/index.ts");
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

/***/ "./src/auth/dto/inputs/login.input.ts":
/*!********************************************!*\
  !*** ./src/auth/dto/inputs/login.input.ts ***!
  \********************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "./src/auth/dto/inputs/public-register.input.ts":
/*!******************************************************!*\
  !*** ./src/auth/dto/inputs/public-register.input.ts ***!
  \******************************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "./src/auth/dto/views/auth-payload.view.ts":
/*!*************************************************!*\
  !*** ./src/auth/dto/views/auth-payload.view.ts ***!
  \*************************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const user_view_1 = __webpack_require__(/*! ../../../users/dto/views/user.view */ "./src/users/dto/views/user.view.ts");
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

/***/ "./src/auth/services/auth.service.ts":
/*!*******************************************!*\
  !*** ./src/auth/services/auth.service.ts ***!
  \*******************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const bson_1 = __webpack_require__(/*! bson */ "bson");
const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");
const gqlerr_1 = __webpack_require__(/*! @app/gqlerr */ "./libs/gqlerr/src/index.ts");
const get_user_service_1 = __webpack_require__(/*! ../../users/services/get-user.service */ "./src/users/services/get-user.service.ts");
const token_service_1 = __webpack_require__(/*! ./token.service */ "./src/auth/services/token.service.ts");
const user_1 = __webpack_require__(/*! ../../users/models/user */ "./src/users/models/user.ts");
const user_role_enum_1 = __webpack_require__(/*! ../../users/enums/user-role.enum */ "./src/users/enums/user-role.enum.ts");
const parser_1 = __webpack_require__(/*! ../../users/models/parser */ "./src/users/models/parser.ts");
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

/***/ "./src/auth/services/token.service.ts":
/*!********************************************!*\
  !*** ./src/auth/services/token.service.ts ***!
  \********************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
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
        catch {
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

/***/ "./src/auth/strategies/jwt.strategy.ts":
/*!*********************************************!*\
  !*** ./src/auth/strategies/jwt.strategy.ts ***!
  \*********************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const passport_jwt_1 = __webpack_require__(/*! passport-jwt */ "passport-jwt");
const gqlerr_1 = __webpack_require__(/*! @app/gqlerr */ "./libs/gqlerr/src/index.ts");
const get_user_service_1 = __webpack_require__(/*! ../../users/services/get-user.service */ "./src/users/services/get-user.service.ts");
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

/***/ "./src/common/decorators/current-user.decorator.ts":
/*!*********************************************************!*\
  !*** ./src/common/decorators/current-user.decorator.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CurrentUser = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
exports.CurrentUser = (0, common_1.createParamDecorator)((data, context) => {
    const ctx = graphql_1.GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    return request.user;
});


/***/ }),

/***/ "./src/common/decorators/index.ts":
/*!****************************************!*\
  !*** ./src/common/decorators/index.ts ***!
  \****************************************/
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
__exportStar(__webpack_require__(/*! ./roles.decorator */ "./src/common/decorators/roles.decorator.ts"), exports);
__exportStar(__webpack_require__(/*! ./current-user.decorator */ "./src/common/decorators/current-user.decorator.ts"), exports);


/***/ }),

/***/ "./src/common/decorators/roles.decorator.ts":
/*!**************************************************!*\
  !*** ./src/common/decorators/roles.decorator.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;


/***/ }),

/***/ "./src/common/guards/index.ts":
/*!************************************!*\
  !*** ./src/common/guards/index.ts ***!
  \************************************/
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
__exportStar(__webpack_require__(/*! ./jwt-auth.guard */ "./src/common/guards/jwt-auth.guard.ts"), exports);
__exportStar(__webpack_require__(/*! ./roles.guard */ "./src/common/guards/roles.guard.ts"), exports);


/***/ }),

/***/ "./src/common/guards/jwt-auth.guard.ts":
/*!*********************************************!*\
  !*** ./src/common/guards/jwt-auth.guard.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const gqlerr_1 = __webpack_require__(/*! @app/gqlerr */ "./libs/gqlerr/src/index.ts");
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

/***/ "./src/common/guards/roles.guard.ts":
/*!******************************************!*\
  !*** ./src/common/guards/roles.guard.ts ***!
  \******************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const gqlerr_1 = __webpack_require__(/*! @app/gqlerr */ "./libs/gqlerr/src/index.ts");
const roles_decorator_1 = __webpack_require__(/*! ../decorators/roles.decorator */ "./src/common/decorators/roles.decorator.ts");
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

/***/ "./src/common/scalars/date-time.scalar.ts":
/*!************************************************!*\
  !*** ./src/common/scalars/date-time.scalar.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DateTimeScalar = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const graphql_2 = __webpack_require__(/*! graphql */ "graphql");
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

/***/ "./src/common/scalars/json.scalar.ts":
/*!*******************************************!*\
  !*** ./src/common/scalars/json.scalar.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JSONScalar = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const graphql_2 = __webpack_require__(/*! graphql */ "graphql");
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

/***/ "./src/common/types/index.ts":
/*!***********************************!*\
  !*** ./src/common/types/index.ts ***!
  \***********************************/
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
__exportStar(__webpack_require__(/*! ./pagination.input */ "./src/common/types/pagination.input.ts"), exports);
__exportStar(__webpack_require__(/*! ./page-info.type */ "./src/common/types/page-info.type.ts"), exports);
__exportStar(__webpack_require__(/*! ./sort-direction.enum */ "./src/common/types/sort-direction.enum.ts"), exports);


/***/ }),

/***/ "./src/common/types/page-info.type.ts":
/*!********************************************!*\
  !*** ./src/common/types/page-info.type.ts ***!
  \********************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
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

/***/ "./src/common/types/pagination.input.ts":
/*!**********************************************!*\
  !*** ./src/common/types/pagination.input.ts ***!
  \**********************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "./src/common/types/sort-direction.enum.ts":
/*!*************************************************!*\
  !*** ./src/common/types/sort-direction.enum.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SortDirection = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
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

/***/ "./src/config/app.config.ts":
/*!**********************************!*\
  !*** ./src/config/app.config.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
exports["default"] = (0, config_1.registerAs)('app', () => ({
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    corsOrigins: process.env.CORS_ORIGINS
        ? process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim())
        : ['http://localhost:3000'],
}));


/***/ }),

/***/ "./src/config/config.service.ts":
/*!**************************************!*\
  !*** ./src/config/config.service.ts ***!
  \**************************************/
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


/***/ }),

/***/ "./src/config/database.config.ts":
/*!***************************************!*\
  !*** ./src/config/database.config.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
exports["default"] = (0, config_1.registerAs)('database', () => ({
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/uat-evaluation-db',
    dbName: process.env.MONGODB_DB_NAME || 'uat-evaluation-db',
}));


/***/ }),

/***/ "./src/config/jwt.config.ts":
/*!**********************************!*\
  !*** ./src/config/jwt.config.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
exports["default"] = (0, config_1.registerAs)('jwt', () => ({
    secret: process.env.JWT_SECRET || 'dev-secret-key',
    expiry: process.env.JWT_EXPIRY || '1h',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret-key',
    refreshExpiry: process.env.JWT_REFRESH_EXPIRY || '7d',
}));


/***/ }),

/***/ "./src/config/throttle.config.ts":
/*!***************************************!*\
  !*** ./src/config/throttle.config.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
exports["default"] = (0, config_1.registerAs)('throttle', () => ({
    ttl: process.env.THROTTLE_TTL ? parseInt(process.env.THROTTLE_TTL, 10) : 60,
    limit: process.env.THROTTLE_LIMIT
        ? parseInt(process.env.THROTTLE_LIMIT, 10)
        : 100,
}));


/***/ }),

/***/ "./src/evaluations/dto/views/evaluation-connection.view.ts":
/*!*****************************************************************!*\
  !*** ./src/evaluations/dto/views/evaluation-connection.view.ts ***!
  \*****************************************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const types_1 = __webpack_require__(/*! ../../../common/types */ "./src/common/types/index.ts");
const evaluation_view_1 = __webpack_require__(/*! ./evaluation.view */ "./src/evaluations/dto/views/evaluation.view.ts");
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

/***/ "./src/evaluations/dto/views/evaluation.view.ts":
/*!******************************************************!*\
  !*** ./src/evaluations/dto/views/evaluation.view.ts ***!
  \******************************************************/
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
exports.EvaluationView = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const attribute_score_1 = __webpack_require__(/*! ../../models/attribute-score */ "./src/evaluations/models/attribute-score.ts");
const evaluation_feedback_1 = __webpack_require__(/*! ../../models/evaluation-feedback */ "./src/evaluations/models/evaluation-feedback.ts");
const llm_evaluation_error_1 = __webpack_require__(/*! ../../models/llm-evaluation-error */ "./src/evaluations/models/llm-evaluation-error.ts");
const validation_status_enum_1 = __webpack_require__(/*! ../../enums/validation-status.enum */ "./src/evaluations/enums/validation-status.enum.ts");
const completeness_status_enum_1 = __webpack_require__(/*! ../../enums/completeness-status.enum */ "./src/evaluations/enums/completeness-status.enum.ts");
const attribute_type_enum_1 = __webpack_require__(/*! ../../../scoring-rules/enums/attribute-type.enum */ "./src/scoring-rules/enums/attribute-type.enum.ts");
const report_type_enum_1 = __webpack_require__(/*! ../../../uat-reports/enums/report-type.enum */ "./src/uat-reports/enums/report-type.enum.ts");
const uat_report_view_1 = __webpack_require__(/*! ../../../uat-reports/dto/views/uat-report.view */ "./src/uat-reports/dto/views/uat-report.view.ts");
const user_view_1 = __webpack_require__(/*! ../../../users/dto/views/user.view */ "./src/users/dto/views/user.view.ts");
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
    (0, graphql_1.Field)(() => report_type_enum_1.ReportType),
    __metadata("design:type", typeof (_a = typeof report_type_enum_1.ReportType !== "undefined" && report_type_enum_1.ReportType) === "function" ? _a : Object)
], EvaluationView.prototype, "reportType", void 0);
__decorate([
    (0, graphql_1.Field)(() => uat_report_view_1.UATReportView),
    __metadata("design:type", typeof (_b = typeof uat_report_view_1.UATReportView !== "undefined" && uat_report_view_1.UATReportView) === "function" ? _b : Object)
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
    __metadata("design:type", typeof (_c = typeof validation_status_enum_1.ValidationStatus !== "undefined" && validation_status_enum_1.ValidationStatus) === "function" ? _c : Object)
], EvaluationView.prototype, "validationStatus", void 0);
__decorate([
    (0, graphql_1.Field)(() => completeness_status_enum_1.CompletenessStatus, { nullable: true }),
    __metadata("design:type", typeof (_d = typeof completeness_status_enum_1.CompletenessStatus !== "undefined" && completeness_status_enum_1.CompletenessStatus) === "function" ? _d : Object)
], EvaluationView.prototype, "completenessStatus", void 0);
__decorate([
    (0, graphql_1.Field)(() => [attribute_type_enum_1.AttributeType], { nullable: true }),
    __metadata("design:type", Array)
], EvaluationView.prototype, "incompleteAttributes", void 0);
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
    __metadata("design:type", typeof (_e = typeof user_view_1.UserView !== "undefined" && user_view_1.UserView) === "function" ? _e : Object)
], EvaluationView.prototype, "evaluatedBy", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], EvaluationView.prototype, "evaluatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], EvaluationView.prototype, "version", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], EvaluationView.prototype, "requiresManualReview", void 0);
__decorate([
    (0, graphql_1.Field)(() => [llm_evaluation_error_1.LLMEvaluationError], { nullable: true }),
    __metadata("design:type", Array)
], EvaluationView.prototype, "llmEvaluationErrors", void 0);
exports.EvaluationView = EvaluationView = __decorate([
    (0, graphql_1.ObjectType)()
], EvaluationView);


/***/ }),

/***/ "./src/evaluations/enums/completeness-status.enum.ts":
/*!***********************************************************!*\
  !*** ./src/evaluations/enums/completeness-status.enum.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompletenessStatus = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
var CompletenessStatus;
(function (CompletenessStatus) {
    CompletenessStatus["COMPLETE"] = "COMPLETE";
    CompletenessStatus["INCOMPLETE"] = "INCOMPLETE";
})(CompletenessStatus || (exports.CompletenessStatus = CompletenessStatus = {}));
(0, graphql_1.registerEnumType)(CompletenessStatus, {
    name: 'CompletenessStatus',
    description: 'Completeness status indicating whether all required attributes are complete',
});


/***/ }),

/***/ "./src/evaluations/enums/feedback-severity.enum.ts":
/*!*********************************************************!*\
  !*** ./src/evaluations/enums/feedback-severity.enum.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FeedbackSeverity = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
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

/***/ "./src/evaluations/enums/validation-status.enum.ts":
/*!*********************************************************!*\
  !*** ./src/evaluations/enums/validation-status.enum.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValidationStatus = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
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

/***/ "./src/evaluations/evaluations.module.ts":
/*!***********************************************!*\
  !*** ./src/evaluations/evaluations.module.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EvaluationsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const evaluation_1 = __webpack_require__(/*! ./models/evaluation */ "./src/evaluations/models/evaluation.ts");
const uat_reports_module_1 = __webpack_require__(/*! ../uat-reports/uat-reports.module */ "./src/uat-reports/uat-reports.module.ts");
const scoring_rules_module_1 = __webpack_require__(/*! ../scoring-rules/scoring-rules.module */ "./src/scoring-rules/scoring-rules.module.ts");
const users_module_1 = __webpack_require__(/*! ../users/users.module */ "./src/users/users.module.ts");
const llm_module_1 = __webpack_require__(/*! ../llm/llm.module */ "./src/llm/llm.module.ts");
const uat_report_1 = __webpack_require__(/*! ../uat-reports/models/uat-report */ "./src/uat-reports/models/uat-report.ts");
const user_1 = __webpack_require__(/*! ../users/models/user */ "./src/users/models/user.ts");
const llm_test_identity_evaluator_1 = __webpack_require__(/*! ./services/evaluators/llm-test-identity.evaluator */ "./src/evaluations/services/evaluators/llm-test-identity.evaluator.ts");
const llm_test_environment_evaluator_1 = __webpack_require__(/*! ./services/evaluators/llm-test-environment.evaluator */ "./src/evaluations/services/evaluators/llm-test-environment.evaluator.ts");
const llm_steps_to_reproduce_evaluator_1 = __webpack_require__(/*! ./services/evaluators/llm-steps-to-reproduce.evaluator */ "./src/evaluations/services/evaluators/llm-steps-to-reproduce.evaluator.ts");
const llm_actual_result_evaluator_1 = __webpack_require__(/*! ./services/evaluators/llm-actual-result.evaluator */ "./src/evaluations/services/evaluators/llm-actual-result.evaluator.ts");
const llm_expected_result_evaluator_1 = __webpack_require__(/*! ./services/evaluators/llm-expected-result.evaluator */ "./src/evaluations/services/evaluators/llm-expected-result.evaluator.ts");
const llm_supporting_evidence_evaluator_1 = __webpack_require__(/*! ./services/evaluators/llm-supporting-evidence.evaluator */ "./src/evaluations/services/evaluators/llm-supporting-evidence.evaluator.ts");
const llm_severity_level_evaluator_1 = __webpack_require__(/*! ./services/evaluators/llm-severity-level.evaluator */ "./src/evaluations/services/evaluators/llm-severity-level.evaluator.ts");
const llm_information_consistency_evaluator_1 = __webpack_require__(/*! ./services/evaluators/llm-information-consistency.evaluator */ "./src/evaluations/services/evaluators/llm-information-consistency.evaluator.ts");
const llm_description_success_evaluator_1 = __webpack_require__(/*! ./services/evaluators/llm-description-success.evaluator */ "./src/evaluations/services/evaluators/llm-description-success.evaluator.ts");
const llm_environment_success_evaluator_1 = __webpack_require__(/*! ./services/evaluators/llm-environment-success.evaluator */ "./src/evaluations/services/evaluators/llm-environment-success.evaluator.ts");
const calculate_score_service_1 = __webpack_require__(/*! ./services/calculate-score.service */ "./src/evaluations/services/calculate-score.service.ts");
const determine_status_service_1 = __webpack_require__(/*! ./services/determine-status.service */ "./src/evaluations/services/determine-status.service.ts");
const generate_feedback_service_1 = __webpack_require__(/*! ./services/generate-feedback.service */ "./src/evaluations/services/generate-feedback.service.ts");
const evaluate_report_service_1 = __webpack_require__(/*! ./services/evaluate-report.service */ "./src/evaluations/services/evaluate-report.service.ts");
const get_evaluation_service_1 = __webpack_require__(/*! ./services/get-evaluation.service */ "./src/evaluations/services/get-evaluation.service.ts");
const batch_evaluate_reports_service_1 = __webpack_require__(/*! ./services/batch-evaluate-reports.service */ "./src/evaluations/services/batch-evaluate-reports.service.ts");
const delete_evaluation_service_1 = __webpack_require__(/*! ./services/delete-evaluation.service */ "./src/evaluations/services/delete-evaluation.service.ts");
const evaluations_resolver_1 = __webpack_require__(/*! ./evaluations.resolver */ "./src/evaluations/evaluations.resolver.ts");
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
            (0, common_1.forwardRef)(() => uat_reports_module_1.UATReportsModule),
            scoring_rules_module_1.ScoringRulesModule,
            users_module_1.UsersModule,
            llm_module_1.LLMModule,
        ],
        providers: [
            llm_test_identity_evaluator_1.LLMTestIdentityEvaluator,
            llm_test_environment_evaluator_1.LLMTestEnvironmentEvaluator,
            llm_steps_to_reproduce_evaluator_1.LLMStepsToReproduceEvaluator,
            llm_actual_result_evaluator_1.LLMActualResultEvaluator,
            llm_expected_result_evaluator_1.LLMExpectedResultEvaluator,
            llm_supporting_evidence_evaluator_1.LLMSupportingEvidenceEvaluator,
            llm_severity_level_evaluator_1.LLMSeverityLevelEvaluator,
            llm_information_consistency_evaluator_1.LLMInformationConsistencyEvaluator,
            llm_description_success_evaluator_1.LLMDescriptionSuccessEvaluator,
            llm_environment_success_evaluator_1.LLMEnvironmentSuccessEvaluator,
            calculate_score_service_1.CalculateScoreService,
            determine_status_service_1.DetermineStatusService,
            generate_feedback_service_1.GenerateFeedbackService,
            evaluate_report_service_1.EvaluateReportService,
            get_evaluation_service_1.GetEvaluationService,
            batch_evaluate_reports_service_1.BatchEvaluateReportsService,
            delete_evaluation_service_1.DeleteEvaluationService,
            evaluations_resolver_1.EvaluationsResolver,
        ],
        exports: [evaluate_report_service_1.EvaluateReportService, get_evaluation_service_1.GetEvaluationService],
    })
], EvaluationsModule);


/***/ }),

/***/ "./src/evaluations/evaluations.resolver.ts":
/*!*************************************************!*\
  !*** ./src/evaluations/evaluations.resolver.ts ***!
  \*************************************************/
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EvaluationsResolver = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const guards_1 = __webpack_require__(/*! ../common/guards */ "./src/common/guards/index.ts");
const decorators_1 = __webpack_require__(/*! ../common/decorators */ "./src/common/decorators/index.ts");
const evaluate_report_service_1 = __webpack_require__(/*! ./services/evaluate-report.service */ "./src/evaluations/services/evaluate-report.service.ts");
const get_evaluation_service_1 = __webpack_require__(/*! ./services/get-evaluation.service */ "./src/evaluations/services/get-evaluation.service.ts");
const batch_evaluate_reports_service_1 = __webpack_require__(/*! ./services/batch-evaluate-reports.service */ "./src/evaluations/services/batch-evaluate-reports.service.ts");
const delete_evaluation_service_1 = __webpack_require__(/*! ./services/delete-evaluation.service */ "./src/evaluations/services/delete-evaluation.service.ts");
const evaluation_view_1 = __webpack_require__(/*! ./dto/views/evaluation.view */ "./src/evaluations/dto/views/evaluation.view.ts");
const evaluation_connection_view_1 = __webpack_require__(/*! ./dto/views/evaluation-connection.view */ "./src/evaluations/dto/views/evaluation-connection.view.ts");
const uat_report_view_1 = __webpack_require__(/*! ../uat-reports/dto/views/uat-report.view */ "./src/uat-reports/dto/views/uat-report.view.ts");
const user_view_1 = __webpack_require__(/*! ../users/dto/views/user.view */ "./src/users/dto/views/user.view.ts");
const get_uat_report_service_1 = __webpack_require__(/*! ../uat-reports/services/get-uat-report.service */ "./src/uat-reports/services/get-uat-report.service.ts");
const get_user_service_1 = __webpack_require__(/*! ../users/services/get-user.service */ "./src/users/services/get-user.service.ts");
const types_1 = __webpack_require__(/*! ../common/types */ "./src/common/types/index.ts");
let EvaluationsResolver = class EvaluationsResolver {
    constructor(evaluateReportService, getEvaluationService, batchEvaluateReportsService, deleteEvaluationService, getUATReportService, getUserService) {
        this.evaluateReportService = evaluateReportService;
        this.getEvaluationService = getEvaluationService;
        this.batchEvaluateReportsService = batchEvaluateReportsService;
        this.deleteEvaluationService = deleteEvaluationService;
        this.getUATReportService = getUATReportService;
        this.getUserService = getUserService;
    }
    async evaluateReport(id, user) {
        return await this.evaluateReportService.evaluate(id, user._id);
    }
    async evaluateBatchReports(ids, user) {
        return await this.batchEvaluateReportsService.evaluateBatch(ids, user._id);
    }
    async deleteEvaluationByReport(reportId) {
        return await this.deleteEvaluationService.deleteByReportId(reportId);
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
    __metadata("design:paramtypes", [String, typeof (_g = typeof user_view_1.UserView !== "undefined" && user_view_1.UserView) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], EvaluationsResolver.prototype, "evaluateReport", null);
__decorate([
    (0, graphql_1.Mutation)(() => [evaluation_view_1.EvaluationView], { name: 'evaluateBatchReports' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('ADMIN', 'REVIEWER'),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [String] })),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, typeof (_j = typeof user_view_1.UserView !== "undefined" && user_view_1.UserView) === "function" ? _j : Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], EvaluationsResolver.prototype, "evaluateBatchReports", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { name: 'deleteEvaluationByReport' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('ADMIN', 'REVIEWER'),
    __param(0, (0, graphql_1.Args)('reportId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], EvaluationsResolver.prototype, "deleteEvaluationByReport", null);
__decorate([
    (0, graphql_1.Query)(() => evaluation_view_1.EvaluationView, { name: 'getEvaluation', nullable: true }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('reportId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_m = typeof Promise !== "undefined" && Promise) === "function" ? _m : Object)
], EvaluationsResolver.prototype, "getEvaluation", null);
__decorate([
    (0, graphql_1.Query)(() => evaluation_connection_view_1.EvaluationConnection, { name: 'getEvaluationHistory' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('reportId')),
    __param(1, (0, graphql_1.Args)('pagination', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_o = typeof types_1.PaginationInput !== "undefined" && types_1.PaginationInput) === "function" ? _o : Object]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], EvaluationsResolver.prototype, "getEvaluationHistory", null);
__decorate([
    (0, graphql_1.ResolveField)(() => uat_report_view_1.UATReportView, { name: 'report' }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_q = typeof evaluation_view_1.EvaluationView !== "undefined" && evaluation_view_1.EvaluationView) === "function" ? _q : Object]),
    __metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
], EvaluationsResolver.prototype, "getReport", null);
__decorate([
    (0, graphql_1.ResolveField)(() => user_view_1.UserView, { name: 'evaluatedBy', nullable: true }),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_s = typeof evaluation_view_1.EvaluationView !== "undefined" && evaluation_view_1.EvaluationView) === "function" ? _s : Object]),
    __metadata("design:returntype", typeof (_t = typeof Promise !== "undefined" && Promise) === "function" ? _t : Object)
], EvaluationsResolver.prototype, "getEvaluatedBy", null);
exports.EvaluationsResolver = EvaluationsResolver = __decorate([
    (0, graphql_1.Resolver)(() => evaluation_view_1.EvaluationView),
    __metadata("design:paramtypes", [typeof (_a = typeof evaluate_report_service_1.EvaluateReportService !== "undefined" && evaluate_report_service_1.EvaluateReportService) === "function" ? _a : Object, typeof (_b = typeof get_evaluation_service_1.GetEvaluationService !== "undefined" && get_evaluation_service_1.GetEvaluationService) === "function" ? _b : Object, typeof (_c = typeof batch_evaluate_reports_service_1.BatchEvaluateReportsService !== "undefined" && batch_evaluate_reports_service_1.BatchEvaluateReportsService) === "function" ? _c : Object, typeof (_d = typeof delete_evaluation_service_1.DeleteEvaluationService !== "undefined" && delete_evaluation_service_1.DeleteEvaluationService) === "function" ? _d : Object, typeof (_e = typeof get_uat_report_service_1.GetUATReportService !== "undefined" && get_uat_report_service_1.GetUATReportService) === "function" ? _e : Object, typeof (_f = typeof get_user_service_1.GetUserService !== "undefined" && get_user_service_1.GetUserService) === "function" ? _f : Object])
], EvaluationsResolver);


/***/ }),

/***/ "./src/evaluations/models/attribute-score.ts":
/*!***************************************************!*\
  !*** ./src/evaluations/models/attribute-score.ts ***!
  \***************************************************/
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
exports.AttributeScoreSchema = exports.AttributeScore = exports.QualityFlagsSchema = exports.QualityFlags = void 0;
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const attribute_type_enum_1 = __webpack_require__(/*! ../../scoring-rules/enums/attribute-type.enum */ "./src/scoring-rules/enums/attribute-type.enum.ts");
let QualityFlags = class QualityFlags {
};
exports.QualityFlags = QualityFlags;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, mongoose_1.Prop)({ required: false, type: Boolean }),
    __metadata("design:type", Boolean)
], QualityFlags.prototype, "isConsistent", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, mongoose_1.Prop)({ required: false, type: Boolean }),
    __metadata("design:type", Boolean)
], QualityFlags.prototype, "isClear", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, mongoose_1.Prop)({ required: false, type: Boolean }),
    __metadata("design:type", Boolean)
], QualityFlags.prototype, "isContradictory", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, mongoose_1.Prop)({ required: false, type: Boolean }),
    __metadata("design:type", Boolean)
], QualityFlags.prototype, "isTooGeneric", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, mongoose_1.Prop)({ required: false, type: Boolean }),
    __metadata("design:type", Boolean)
], QualityFlags.prototype, "hasBias", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, mongoose_1.Prop)({ required: false, type: Boolean }),
    __metadata("design:type", Boolean)
], QualityFlags.prototype, "isAmbiguous", void 0);
exports.QualityFlags = QualityFlags = __decorate([
    (0, mongoose_1.Schema)({ _id: false }),
    (0, graphql_1.ObjectType)('QualityFlags')
], QualityFlags);
exports.QualityFlagsSchema = mongoose_1.SchemaFactory.createForClass(QualityFlags);
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
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], AttributeScore.prototype, "reasoning", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, mongoose_1.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], AttributeScore.prototype, "evaluationStatus", void 0);
__decorate([
    (0, graphql_1.Field)(() => QualityFlags, { nullable: true }),
    (0, mongoose_1.Prop)({ required: false, type: Object }),
    __metadata("design:type", QualityFlags)
], AttributeScore.prototype, "qualityFlags", void 0);
exports.AttributeScore = AttributeScore = __decorate([
    (0, mongoose_1.Schema)({ _id: false }),
    (0, graphql_1.ObjectType)()
], AttributeScore);
exports.AttributeScoreSchema = mongoose_1.SchemaFactory.createForClass(AttributeScore);


/***/ }),

/***/ "./src/evaluations/models/evaluation-feedback.ts":
/*!*******************************************************!*\
  !*** ./src/evaluations/models/evaluation-feedback.ts ***!
  \*******************************************************/
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
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const attribute_type_enum_1 = __webpack_require__(/*! ../../scoring-rules/enums/attribute-type.enum */ "./src/scoring-rules/enums/attribute-type.enum.ts");
const feedback_severity_enum_1 = __webpack_require__(/*! ../enums/feedback-severity.enum */ "./src/evaluations/enums/feedback-severity.enum.ts");
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

/***/ "./src/evaluations/models/evaluation.ts":
/*!**********************************************!*\
  !*** ./src/evaluations/models/evaluation.ts ***!
  \**********************************************/
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
exports.EvaluationSchema = exports.Evaluation = void 0;
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const attribute_score_1 = __webpack_require__(/*! ./attribute-score */ "./src/evaluations/models/attribute-score.ts");
const evaluation_feedback_1 = __webpack_require__(/*! ./evaluation-feedback */ "./src/evaluations/models/evaluation-feedback.ts");
const llm_evaluation_error_1 = __webpack_require__(/*! ./llm-evaluation-error */ "./src/evaluations/models/llm-evaluation-error.ts");
const validation_status_enum_1 = __webpack_require__(/*! ../enums/validation-status.enum */ "./src/evaluations/enums/validation-status.enum.ts");
const completeness_status_enum_1 = __webpack_require__(/*! ../enums/completeness-status.enum */ "./src/evaluations/enums/completeness-status.enum.ts");
const attribute_type_enum_1 = __webpack_require__(/*! ../../scoring-rules/enums/attribute-type.enum */ "./src/scoring-rules/enums/attribute-type.enum.ts");
const report_type_enum_1 = __webpack_require__(/*! ../../uat-reports/enums/report-type.enum */ "./src/uat-reports/enums/report-type.enum.ts");
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
    (0, graphql_1.Field)(() => report_type_enum_1.ReportType),
    (0, mongoose_1.Prop)({ required: true, type: String, enum: report_type_enum_1.ReportType }),
    __metadata("design:type", typeof (_a = typeof report_type_enum_1.ReportType !== "undefined" && report_type_enum_1.ReportType) === "function" ? _a : Object)
], Evaluation.prototype, "reportType", void 0);
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
    __metadata("design:type", typeof (_b = typeof validation_status_enum_1.ValidationStatus !== "undefined" && validation_status_enum_1.ValidationStatus) === "function" ? _b : Object)
], Evaluation.prototype, "validationStatus", void 0);
__decorate([
    (0, graphql_1.Field)(() => completeness_status_enum_1.CompletenessStatus),
    (0, mongoose_1.Prop)({
        required: false,
        type: String,
        enum: completeness_status_enum_1.CompletenessStatus,
        default: completeness_status_enum_1.CompletenessStatus.COMPLETE,
    }),
    __metadata("design:type", typeof (_c = typeof completeness_status_enum_1.CompletenessStatus !== "undefined" && completeness_status_enum_1.CompletenessStatus) === "function" ? _c : Object)
], Evaluation.prototype, "completenessStatus", void 0);
__decorate([
    (0, graphql_1.Field)(() => [attribute_type_enum_1.AttributeType], { nullable: true }),
    (0, mongoose_1.Prop)({ required: false, type: [String], enum: attribute_type_enum_1.AttributeType, default: [] }),
    __metadata("design:type", Array)
], Evaluation.prototype, "incompleteAttributes", void 0);
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
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], Evaluation.prototype, "evaluatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, mongoose_1.Prop)({ required: true, default: 1 }),
    __metadata("design:type", Number)
], Evaluation.prototype, "version", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ required: false, default: false }),
    __metadata("design:type", Boolean)
], Evaluation.prototype, "requiresManualReview", void 0);
__decorate([
    (0, graphql_1.Field)(() => [llm_evaluation_error_1.LLMEvaluationError], { nullable: true }),
    (0, mongoose_1.Prop)({
        required: false,
        type: [llm_evaluation_error_1.LLMEvaluationErrorSchema],
        default: [],
    }),
    __metadata("design:type", Array)
], Evaluation.prototype, "llmEvaluationErrors", void 0);
exports.Evaluation = Evaluation = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true }),
    (0, graphql_1.ObjectType)()
], Evaluation);
exports.EvaluationSchema = mongoose_1.SchemaFactory.createForClass(Evaluation);
exports.EvaluationSchema.index({ reportId: 1 });
exports.EvaluationSchema.index({ evaluatedAt: -1 });
exports.EvaluationSchema.index({ validationStatus: 1 });
exports.EvaluationSchema.index({ reportId: 1, version: -1 });
exports.EvaluationSchema.index({ reportType: 1 });
exports.EvaluationSchema.index({ reportType: 1, validationStatus: 1 });


/***/ }),

/***/ "./src/evaluations/models/llm-evaluation-error.ts":
/*!********************************************************!*\
  !*** ./src/evaluations/models/llm-evaluation-error.ts ***!
  \********************************************************/
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
exports.LLMEvaluationErrorSchema = exports.LLMEvaluationError = void 0;
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const attribute_type_enum_1 = __webpack_require__(/*! ../../scoring-rules/enums/attribute-type.enum */ "./src/scoring-rules/enums/attribute-type.enum.ts");
let LLMEvaluationError = class LLMEvaluationError {
};
exports.LLMEvaluationError = LLMEvaluationError;
__decorate([
    (0, graphql_1.Field)(() => attribute_type_enum_1.AttributeType),
    (0, mongoose_1.Prop)({ required: true, type: String, enum: attribute_type_enum_1.AttributeType }),
    __metadata("design:type", typeof (_a = typeof attribute_type_enum_1.AttributeType !== "undefined" && attribute_type_enum_1.AttributeType) === "function" ? _a : Object)
], LLMEvaluationError.prototype, "attribute", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], LLMEvaluationError.prototype, "error", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ required: true, type: Date }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], LLMEvaluationError.prototype, "timestamp", void 0);
exports.LLMEvaluationError = LLMEvaluationError = __decorate([
    (0, mongoose_1.Schema)({ _id: false }),
    (0, graphql_1.ObjectType)()
], LLMEvaluationError);
exports.LLMEvaluationErrorSchema = mongoose_1.SchemaFactory.createForClass(LLMEvaluationError);


/***/ }),

/***/ "./src/evaluations/models/parser.ts":
/*!******************************************!*\
  !*** ./src/evaluations/models/parser.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseEvaluationToView = parseEvaluationToView;
const completeness_status_enum_1 = __webpack_require__(/*! ../enums/completeness-status.enum */ "./src/evaluations/enums/completeness-status.enum.ts");
function parseEvaluationToView(doc) {
    let completenessStatus;
    let incompleteAttributes;
    if (doc.completenessStatus) {
        completenessStatus = doc.completenessStatus;
        incompleteAttributes = doc.incompleteAttributes || [];
    }
    else {
        incompleteAttributes = [];
        completenessStatus = completeness_status_enum_1.CompletenessStatus.COMPLETE;
    }
    let reportId;
    if (typeof doc.reportId === 'string') {
        reportId = doc.reportId;
    }
    else if (doc.reportId &&
        typeof doc.reportId === 'object' &&
        '_id' in doc.reportId) {
        reportId =
            doc.reportId._id?.toString() || doc.reportId._id;
    }
    else {
        reportId = String(doc.reportId);
    }
    let evaluatedBy;
    if (!doc.evaluatedBy) {
        evaluatedBy = undefined;
    }
    else if (typeof doc.evaluatedBy === 'string') {
        evaluatedBy = doc.evaluatedBy;
    }
    else if (doc.evaluatedBy &&
        typeof doc.evaluatedBy === 'object' &&
        '_id' in doc.evaluatedBy) {
        evaluatedBy =
            doc.evaluatedBy._id?.toString() || doc.evaluatedBy._id;
    }
    else {
        evaluatedBy = String(doc.evaluatedBy);
    }
    return {
        _id: doc._id,
        reportId,
        reportType: doc.reportType,
        report: undefined,
        attributeScores: doc.attributeScores,
        totalScore: doc.totalScore,
        maxScore: doc.maxScore,
        scorePercentage: doc.scorePercentage,
        validationStatus: doc.validationStatus,
        completenessStatus,
        incompleteAttributes,
        feedback: doc.feedback,
        processingTime: doc.processingTime,
        evaluatedBy: evaluatedBy,
        evaluatedAt: doc.evaluatedAt,
        version: doc.version,
        requiresManualReview: doc.requiresManualReview ?? false,
        llmEvaluationErrors: doc.llmEvaluationErrors ?? [],
    };
}


/***/ }),

/***/ "./src/evaluations/services/batch-evaluate-reports.service.ts":
/*!********************************************************************!*\
  !*** ./src/evaluations/services/batch-evaluate-reports.service.ts ***!
  \********************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const gqlerr_1 = __webpack_require__(/*! @app/gqlerr */ "./libs/gqlerr/src/index.ts");
const evaluate_report_service_1 = __webpack_require__(/*! ./evaluate-report.service */ "./src/evaluations/services/evaluate-report.service.ts");
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

/***/ "./src/evaluations/services/calculate-score.service.ts":
/*!*************************************************************!*\
  !*** ./src/evaluations/services/calculate-score.service.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CalculateScoreService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
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

/***/ "./src/evaluations/services/delete-evaluation.service.ts":
/*!***************************************************************!*\
  !*** ./src/evaluations/services/delete-evaluation.service.ts ***!
  \***************************************************************/
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
exports.DeleteEvaluationService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const gqlerr_1 = __webpack_require__(/*! @app/gqlerr */ "./libs/gqlerr/src/index.ts");
const evaluation_1 = __webpack_require__(/*! ../models/evaluation */ "./src/evaluations/models/evaluation.ts");
let DeleteEvaluationService = class DeleteEvaluationService {
    constructor(evaluationModel) {
        this.evaluationModel = evaluationModel;
    }
    async deleteByReportId(reportId) {
        try {
            const result = await this.evaluationModel.deleteMany({ reportId });
            if (result.deletedCount === 0) {
                throw new gqlerr_1.ThrowGQL('Evaluation not found for this report', gqlerr_1.GQLThrowType.NOT_FOUND);
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
exports.DeleteEvaluationService = DeleteEvaluationService;
exports.DeleteEvaluationService = DeleteEvaluationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(evaluation_1.Evaluation.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], DeleteEvaluationService);


/***/ }),

/***/ "./src/evaluations/services/determine-status.service.ts":
/*!**************************************************************!*\
  !*** ./src/evaluations/services/determine-status.service.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DetermineStatusService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const validation_status_enum_1 = __webpack_require__(/*! ../enums/validation-status.enum */ "./src/evaluations/enums/validation-status.enum.ts");
let DetermineStatusService = class DetermineStatusService {
    determine(scorePercentage, threshold) {
        const acceptThreshold = threshold >= 60 ? threshold : 60;
        if (scorePercentage >= acceptThreshold) {
            return validation_status_enum_1.ValidationStatus.VALID;
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

/***/ "./src/evaluations/services/evaluate-report.service.ts":
/*!*************************************************************!*\
  !*** ./src/evaluations/services/evaluate-report.service.ts ***!
  \*************************************************************/
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
exports.EvaluateReportService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const bson_1 = __webpack_require__(/*! bson */ "bson");
const gqlerr_1 = __webpack_require__(/*! @app/gqlerr */ "./libs/gqlerr/src/index.ts");
const evaluation_1 = __webpack_require__(/*! ../models/evaluation */ "./src/evaluations/models/evaluation.ts");
const uat_report_1 = __webpack_require__(/*! ../../uat-reports/models/uat-report */ "./src/uat-reports/models/uat-report.ts");
const get_scoring_rules_service_1 = __webpack_require__(/*! ../../scoring-rules/services/get-scoring-rules.service */ "./src/scoring-rules/services/get-scoring-rules.service.ts");
const llm_test_identity_evaluator_1 = __webpack_require__(/*! ./evaluators/llm-test-identity.evaluator */ "./src/evaluations/services/evaluators/llm-test-identity.evaluator.ts");
const llm_test_environment_evaluator_1 = __webpack_require__(/*! ./evaluators/llm-test-environment.evaluator */ "./src/evaluations/services/evaluators/llm-test-environment.evaluator.ts");
const llm_steps_to_reproduce_evaluator_1 = __webpack_require__(/*! ./evaluators/llm-steps-to-reproduce.evaluator */ "./src/evaluations/services/evaluators/llm-steps-to-reproduce.evaluator.ts");
const llm_actual_result_evaluator_1 = __webpack_require__(/*! ./evaluators/llm-actual-result.evaluator */ "./src/evaluations/services/evaluators/llm-actual-result.evaluator.ts");
const llm_expected_result_evaluator_1 = __webpack_require__(/*! ./evaluators/llm-expected-result.evaluator */ "./src/evaluations/services/evaluators/llm-expected-result.evaluator.ts");
const llm_supporting_evidence_evaluator_1 = __webpack_require__(/*! ./evaluators/llm-supporting-evidence.evaluator */ "./src/evaluations/services/evaluators/llm-supporting-evidence.evaluator.ts");
const llm_severity_level_evaluator_1 = __webpack_require__(/*! ./evaluators/llm-severity-level.evaluator */ "./src/evaluations/services/evaluators/llm-severity-level.evaluator.ts");
const llm_information_consistency_evaluator_1 = __webpack_require__(/*! ./evaluators/llm-information-consistency.evaluator */ "./src/evaluations/services/evaluators/llm-information-consistency.evaluator.ts");
const llm_description_success_evaluator_1 = __webpack_require__(/*! ./evaluators/llm-description-success.evaluator */ "./src/evaluations/services/evaluators/llm-description-success.evaluator.ts");
const llm_environment_success_evaluator_1 = __webpack_require__(/*! ./evaluators/llm-environment-success.evaluator */ "./src/evaluations/services/evaluators/llm-environment-success.evaluator.ts");
const report_type_enum_1 = __webpack_require__(/*! ../../uat-reports/enums/report-type.enum */ "./src/uat-reports/enums/report-type.enum.ts");
const calculate_score_service_1 = __webpack_require__(/*! ./calculate-score.service */ "./src/evaluations/services/calculate-score.service.ts");
const determine_status_service_1 = __webpack_require__(/*! ./determine-status.service */ "./src/evaluations/services/determine-status.service.ts");
const generate_feedback_service_1 = __webpack_require__(/*! ./generate-feedback.service */ "./src/evaluations/services/generate-feedback.service.ts");
const parser_1 = __webpack_require__(/*! ../models/parser */ "./src/evaluations/models/parser.ts");
const attribute_type_enum_1 = __webpack_require__(/*! ../../scoring-rules/enums/attribute-type.enum */ "./src/scoring-rules/enums/attribute-type.enum.ts");
const completeness_status_enum_1 = __webpack_require__(/*! ../enums/completeness-status.enum */ "./src/evaluations/enums/completeness-status.enum.ts");
const report_status_enum_1 = __webpack_require__(/*! ../../uat-reports/enums/report-status.enum */ "./src/uat-reports/enums/report-status.enum.ts");
const llm_evaluation_failed_error_1 = __webpack_require__(/*! ../../llm/errors/llm-evaluation-failed.error */ "./src/llm/errors/llm-evaluation-failed.error.ts");
let EvaluateReportService = class EvaluateReportService {
    constructor(evaluationModel, uatReportModel, getScoringRulesService, testIdentityEvaluator, testEnvironmentEvaluator, stepsToReproduceEvaluator, actualResultEvaluator, expectedResultEvaluator, supportingEvidenceEvaluator, severityLevelEvaluator, informationConsistencyEvaluator, descriptionSuccessEvaluator, environmentSuccessEvaluator, calculateScoreService, determineStatusService, generateFeedbackService) {
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
        this.descriptionSuccessEvaluator = descriptionSuccessEvaluator;
        this.environmentSuccessEvaluator = environmentSuccessEvaluator;
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
            const reportType = report.reportType || report_type_enum_1.ReportType.BUG_REPORT;
            await this.uatReportModel.updateOne({ _id: reportId }, { $set: { status: report_status_enum_1.ReportStatus.EVALUATING } });
            const rules = await this.getScoringRulesService.getScoringRulesByReportType(reportType);
            const rulesMap = rules.reduce((map, rule) => {
                map[rule.attribute] = rule;
                return map;
            }, {});
            const validationConfig = await this.getScoringRulesService.getValidationConfig();
            const attributeScores = [];
            const llmEvaluationErrors = [];
            let evaluators;
            if (reportType === report_type_enum_1.ReportType.SUCCESS_REPORT) {
                evaluators = {
                    [attribute_type_enum_1.AttributeType.TEST_ENVIRONMENT]: this.environmentSuccessEvaluator,
                    [attribute_type_enum_1.AttributeType.ACTUAL_RESULT]: this.descriptionSuccessEvaluator,
                };
            }
            else {
                evaluators = {
                    [attribute_type_enum_1.AttributeType.TEST_ENVIRONMENT]: this.testEnvironmentEvaluator,
                    [attribute_type_enum_1.AttributeType.STEPS_TO_REPRODUCE]: this.stepsToReproduceEvaluator,
                    [attribute_type_enum_1.AttributeType.ACTUAL_RESULT]: this.actualResultEvaluator,
                    [attribute_type_enum_1.AttributeType.SUPPORTING_EVIDENCE]: this.supportingEvidenceEvaluator,
                };
            }
            const evaluationPromises = Object.entries(evaluators).map(async ([attribute, evaluator]) => {
                const rule = rulesMap[attribute];
                if (rule) {
                    try {
                        const score = await evaluator.evaluate(report.toObject(), rule, reportType);
                        return score;
                    }
                    catch (error) {
                        if (error instanceof llm_evaluation_failed_error_1.LLMEvaluationFailedError) {
                            const errorEntry = {
                                attribute: error.attribute,
                                error: error.originalError.message,
                                timestamp: new Date(),
                            };
                            llmEvaluationErrors.push(errorEntry);
                            console.error(`LLM evaluation failed for attribute ${attribute}:`, error);
                            return {
                                attribute: attribute,
                                score: 0,
                                maxScore: 1,
                                weight: rule.weight,
                                weightedScore: 0,
                                passed: false,
                                evaluationStatus: 'NEEDS_MANUAL_REVIEW',
                                reasoning: `LLM evaluation failed: ${error.originalError.message}`,
                            };
                        }
                        console.error(`Error evaluating attribute ${attribute}:`, error);
                        return {
                            attribute: attribute,
                            score: 0,
                            maxScore: 1,
                            weight: rule.weight,
                            weightedScore: 0,
                            passed: false,
                        };
                    }
                }
                return null;
            });
            const scores = await Promise.all(evaluationPromises);
            attributeScores.push(...scores.filter((score) => score !== null));
            const { totalScore, maxScore, scorePercentage } = this.calculateScoreService.calculate(attributeScores);
            const validationStatus = this.determineStatusService.determine(scorePercentage, validationConfig.threshold);
            const feedback = this.generateFeedbackService.generate(attributeScores);
            const incompleteAttributes = [];
            if (reportType === report_type_enum_1.ReportType.SUCCESS_REPORT) {
                if (!report.actualResult || report.actualResult.trim() === '') {
                    incompleteAttributes.push(attribute_type_enum_1.AttributeType.ACTUAL_RESULT);
                }
            }
            else {
                if (!report.stepsToReproduce ||
                    !Array.isArray(report.stepsToReproduce) ||
                    report.stepsToReproduce.length === 0 ||
                    report.stepsToReproduce.every((step) => !step || step.trim() === '')) {
                    incompleteAttributes.push(attribute_type_enum_1.AttributeType.STEPS_TO_REPRODUCE);
                }
                if (!report.actualResult || report.actualResult.trim() === '') {
                    incompleteAttributes.push(attribute_type_enum_1.AttributeType.ACTUAL_RESULT);
                }
                if (!report.expectedResult || report.expectedResult.trim() === '') {
                    incompleteAttributes.push(attribute_type_enum_1.AttributeType.EXPECTED_RESULT);
                }
                if (!report.supportingEvidence ||
                    !Array.isArray(report.supportingEvidence) ||
                    report.supportingEvidence.length === 0) {
                    incompleteAttributes.push(attribute_type_enum_1.AttributeType.SUPPORTING_EVIDENCE);
                }
            }
            const completenessStatus = incompleteAttributes.length === 0
                ? completeness_status_enum_1.CompletenessStatus.COMPLETE
                : completeness_status_enum_1.CompletenessStatus.INCOMPLETE;
            const requiresManualReview = attributeScores.some((score) => score.evaluationStatus === 'NEEDS_MANUAL_REVIEW') || llmEvaluationErrors.length > 0;
            const processingTime = Date.now() - startTime;
            const latestEvaluation = await this.evaluationModel
                .findOne({ reportId })
                .sort({ version: -1 })
                .exec();
            const version = latestEvaluation ? latestEvaluation.version + 1 : 1;
            const evaluation = await this.evaluationModel.create({
                _id: new bson_1.ObjectId().toString(),
                reportId,
                reportType,
                attributeScores,
                totalScore,
                maxScore,
                scorePercentage,
                validationStatus,
                completenessStatus,
                incompleteAttributes,
                feedback,
                processingTime,
                evaluatedBy: userId || null,
                evaluatedAt: new Date(),
                version,
                requiresManualReview,
                llmEvaluationErrors: llmEvaluationErrors.length > 0 ? llmEvaluationErrors : undefined,
            });
            let reportStatus;
            if (requiresManualReview) {
                reportStatus = report_status_enum_1.ReportStatus.NEEDS_MANUAL_REVIEW;
            }
            else {
                reportStatus =
                    validationStatus === 'VALID'
                        ? report_status_enum_1.ReportStatus.VALID
                        : report_status_enum_1.ReportStatus.INVALID;
            }
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
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object, typeof (_c = typeof get_scoring_rules_service_1.GetScoringRulesService !== "undefined" && get_scoring_rules_service_1.GetScoringRulesService) === "function" ? _c : Object, typeof (_d = typeof llm_test_identity_evaluator_1.LLMTestIdentityEvaluator !== "undefined" && llm_test_identity_evaluator_1.LLMTestIdentityEvaluator) === "function" ? _d : Object, typeof (_e = typeof llm_test_environment_evaluator_1.LLMTestEnvironmentEvaluator !== "undefined" && llm_test_environment_evaluator_1.LLMTestEnvironmentEvaluator) === "function" ? _e : Object, typeof (_f = typeof llm_steps_to_reproduce_evaluator_1.LLMStepsToReproduceEvaluator !== "undefined" && llm_steps_to_reproduce_evaluator_1.LLMStepsToReproduceEvaluator) === "function" ? _f : Object, typeof (_g = typeof llm_actual_result_evaluator_1.LLMActualResultEvaluator !== "undefined" && llm_actual_result_evaluator_1.LLMActualResultEvaluator) === "function" ? _g : Object, typeof (_h = typeof llm_expected_result_evaluator_1.LLMExpectedResultEvaluator !== "undefined" && llm_expected_result_evaluator_1.LLMExpectedResultEvaluator) === "function" ? _h : Object, typeof (_j = typeof llm_supporting_evidence_evaluator_1.LLMSupportingEvidenceEvaluator !== "undefined" && llm_supporting_evidence_evaluator_1.LLMSupportingEvidenceEvaluator) === "function" ? _j : Object, typeof (_k = typeof llm_severity_level_evaluator_1.LLMSeverityLevelEvaluator !== "undefined" && llm_severity_level_evaluator_1.LLMSeverityLevelEvaluator) === "function" ? _k : Object, typeof (_l = typeof llm_information_consistency_evaluator_1.LLMInformationConsistencyEvaluator !== "undefined" && llm_information_consistency_evaluator_1.LLMInformationConsistencyEvaluator) === "function" ? _l : Object, typeof (_m = typeof llm_description_success_evaluator_1.LLMDescriptionSuccessEvaluator !== "undefined" && llm_description_success_evaluator_1.LLMDescriptionSuccessEvaluator) === "function" ? _m : Object, typeof (_o = typeof llm_environment_success_evaluator_1.LLMEnvironmentSuccessEvaluator !== "undefined" && llm_environment_success_evaluator_1.LLMEnvironmentSuccessEvaluator) === "function" ? _o : Object, typeof (_p = typeof calculate_score_service_1.CalculateScoreService !== "undefined" && calculate_score_service_1.CalculateScoreService) === "function" ? _p : Object, typeof (_q = typeof determine_status_service_1.DetermineStatusService !== "undefined" && determine_status_service_1.DetermineStatusService) === "function" ? _q : Object, typeof (_r = typeof generate_feedback_service_1.GenerateFeedbackService !== "undefined" && generate_feedback_service_1.GenerateFeedbackService) === "function" ? _r : Object])
], EvaluateReportService);


/***/ }),

/***/ "./src/evaluations/services/evaluators/llm-actual-result.evaluator.ts":
/*!****************************************************************************!*\
  !*** ./src/evaluations/services/evaluators/llm-actual-result.evaluator.ts ***!
  \****************************************************************************/
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
exports.LLMActualResultEvaluator = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const attribute_type_enum_1 = __webpack_require__(/*! ../../../scoring-rules/enums/attribute-type.enum */ "./src/scoring-rules/enums/attribute-type.enum.ts");
const llm_evaluation_service_1 = __webpack_require__(/*! ../../../llm/services/llm-evaluation.service */ "./src/llm/services/llm-evaluation.service.ts");
const llm_evaluation_failed_error_1 = __webpack_require__(/*! ../../../llm/errors/llm-evaluation-failed.error */ "./src/llm/errors/llm-evaluation-failed.error.ts");
let LLMActualResultEvaluator = class LLMActualResultEvaluator {
    constructor(llmEvaluationService) {
        this.llmEvaluationService = llmEvaluationService;
    }
    async evaluate(report, rule, reportType) {
        try {
            const result = await this.llmEvaluationService.evaluate(attribute_type_enum_1.AttributeType.ACTUAL_RESULT, report, reportType);
            let finalScore = result.score;
            const qualityFlags = result.qualityFlags;
            if (qualityFlags) {
                if (qualityFlags.isContradictory === true) {
                    finalScore = Math.max(0, finalScore - 0.2);
                }
                if (qualityFlags.isTooGeneric === true) {
                    finalScore = Math.max(0, finalScore - 0.15);
                }
                if (qualityFlags.hasBias === true) {
                    finalScore = Math.max(0, finalScore - 0.1);
                }
                if (qualityFlags.isAmbiguous === true) {
                    finalScore = Math.max(0, finalScore - 0.1);
                }
                if (qualityFlags.isConsistent === false) {
                    finalScore = Math.max(0, finalScore - 0.15);
                }
                if (qualityFlags.isClear === false) {
                    finalScore = Math.max(0, finalScore - 0.1);
                }
                finalScore = Math.min(1, Math.max(0, finalScore));
            }
            return {
                attribute: attribute_type_enum_1.AttributeType.ACTUAL_RESULT,
                score: finalScore,
                maxScore: 1,
                weight: rule.weight,
                weightedScore: finalScore * rule.weight,
                passed: finalScore >= 0.7,
                reasoning: result.reasoning,
                qualityFlags: qualityFlags,
            };
        }
        catch (error) {
            if (error instanceof llm_evaluation_failed_error_1.LLMEvaluationFailedError) {
                return {
                    attribute: attribute_type_enum_1.AttributeType.ACTUAL_RESULT,
                    score: 0,
                    maxScore: 1,
                    weight: rule.weight,
                    weightedScore: 0,
                    passed: false,
                    reasoning: `LLM evaluation failed: ${error.originalError.message}`,
                    evaluationStatus: 'NEEDS_MANUAL_REVIEW',
                };
            }
            throw error;
        }
    }
};
exports.LLMActualResultEvaluator = LLMActualResultEvaluator;
exports.LLMActualResultEvaluator = LLMActualResultEvaluator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof llm_evaluation_service_1.LLMEvaluationService !== "undefined" && llm_evaluation_service_1.LLMEvaluationService) === "function" ? _a : Object])
], LLMActualResultEvaluator);


/***/ }),

/***/ "./src/evaluations/services/evaluators/llm-description-success.evaluator.ts":
/*!**********************************************************************************!*\
  !*** ./src/evaluations/services/evaluators/llm-description-success.evaluator.ts ***!
  \**********************************************************************************/
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
exports.LLMDescriptionSuccessEvaluator = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const attribute_type_enum_1 = __webpack_require__(/*! ../../../scoring-rules/enums/attribute-type.enum */ "./src/scoring-rules/enums/attribute-type.enum.ts");
const llm_evaluation_service_1 = __webpack_require__(/*! ../../../llm/services/llm-evaluation.service */ "./src/llm/services/llm-evaluation.service.ts");
const llm_evaluation_failed_error_1 = __webpack_require__(/*! ../../../llm/errors/llm-evaluation-failed.error */ "./src/llm/errors/llm-evaluation-failed.error.ts");
let LLMDescriptionSuccessEvaluator = class LLMDescriptionSuccessEvaluator {
    constructor(llmEvaluationService) {
        this.llmEvaluationService = llmEvaluationService;
    }
    async evaluate(report, rule, reportType) {
        try {
            const result = await this.llmEvaluationService.evaluate(attribute_type_enum_1.AttributeType.ACTUAL_RESULT, report, reportType);
            return {
                attribute: attribute_type_enum_1.AttributeType.ACTUAL_RESULT,
                score: result.score,
                maxScore: 1,
                weight: rule.weight,
                weightedScore: result.score * rule.weight,
                passed: result.score >= 0.7,
                reasoning: result.reasoning,
                qualityFlags: result.qualityFlags,
            };
        }
        catch (error) {
            if (error instanceof llm_evaluation_failed_error_1.LLMEvaluationFailedError) {
                return {
                    attribute: attribute_type_enum_1.AttributeType.ACTUAL_RESULT,
                    score: 0,
                    maxScore: 1,
                    weight: rule.weight,
                    weightedScore: 0,
                    passed: false,
                    reasoning: `LLM evaluation failed: ${error.originalError.message}`,
                    evaluationStatus: 'NEEDS_MANUAL_REVIEW',
                };
            }
            throw error;
        }
    }
};
exports.LLMDescriptionSuccessEvaluator = LLMDescriptionSuccessEvaluator;
exports.LLMDescriptionSuccessEvaluator = LLMDescriptionSuccessEvaluator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof llm_evaluation_service_1.LLMEvaluationService !== "undefined" && llm_evaluation_service_1.LLMEvaluationService) === "function" ? _a : Object])
], LLMDescriptionSuccessEvaluator);


/***/ }),

/***/ "./src/evaluations/services/evaluators/llm-environment-success.evaluator.ts":
/*!**********************************************************************************!*\
  !*** ./src/evaluations/services/evaluators/llm-environment-success.evaluator.ts ***!
  \**********************************************************************************/
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
exports.LLMEnvironmentSuccessEvaluator = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const attribute_type_enum_1 = __webpack_require__(/*! ../../../scoring-rules/enums/attribute-type.enum */ "./src/scoring-rules/enums/attribute-type.enum.ts");
const llm_evaluation_service_1 = __webpack_require__(/*! ../../../llm/services/llm-evaluation.service */ "./src/llm/services/llm-evaluation.service.ts");
let LLMEnvironmentSuccessEvaluator = class LLMEnvironmentSuccessEvaluator {
    constructor(llmEvaluationService) {
        this.llmEvaluationService = llmEvaluationService;
    }
    async evaluate(report, rule, reportType) {
        const result = await this.llmEvaluationService.evaluate(attribute_type_enum_1.AttributeType.TEST_ENVIRONMENT, report, reportType);
        return {
            attribute: attribute_type_enum_1.AttributeType.TEST_ENVIRONMENT,
            score: result.score,
            maxScore: 1,
            weight: rule.weight,
            weightedScore: result.score * rule.weight,
            passed: result.score >= 0.7,
            reasoning: result.reasoning,
        };
    }
};
exports.LLMEnvironmentSuccessEvaluator = LLMEnvironmentSuccessEvaluator;
exports.LLMEnvironmentSuccessEvaluator = LLMEnvironmentSuccessEvaluator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof llm_evaluation_service_1.LLMEvaluationService !== "undefined" && llm_evaluation_service_1.LLMEvaluationService) === "function" ? _a : Object])
], LLMEnvironmentSuccessEvaluator);


/***/ }),

/***/ "./src/evaluations/services/evaluators/llm-expected-result.evaluator.ts":
/*!******************************************************************************!*\
  !*** ./src/evaluations/services/evaluators/llm-expected-result.evaluator.ts ***!
  \******************************************************************************/
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
exports.LLMExpectedResultEvaluator = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const attribute_type_enum_1 = __webpack_require__(/*! ../../../scoring-rules/enums/attribute-type.enum */ "./src/scoring-rules/enums/attribute-type.enum.ts");
const llm_evaluation_service_1 = __webpack_require__(/*! ../../../llm/services/llm-evaluation.service */ "./src/llm/services/llm-evaluation.service.ts");
let LLMExpectedResultEvaluator = class LLMExpectedResultEvaluator {
    constructor(llmEvaluationService) {
        this.llmEvaluationService = llmEvaluationService;
    }
    async evaluate(report, rule, reportType) {
        const result = await this.llmEvaluationService.evaluate(attribute_type_enum_1.AttributeType.EXPECTED_RESULT, report, reportType);
        return {
            attribute: attribute_type_enum_1.AttributeType.EXPECTED_RESULT,
            score: result.score,
            maxScore: 1,
            weight: rule.weight,
            weightedScore: result.score * rule.weight,
            passed: result.score >= 0.7,
            reasoning: result.reasoning,
        };
    }
};
exports.LLMExpectedResultEvaluator = LLMExpectedResultEvaluator;
exports.LLMExpectedResultEvaluator = LLMExpectedResultEvaluator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof llm_evaluation_service_1.LLMEvaluationService !== "undefined" && llm_evaluation_service_1.LLMEvaluationService) === "function" ? _a : Object])
], LLMExpectedResultEvaluator);


/***/ }),

/***/ "./src/evaluations/services/evaluators/llm-information-consistency.evaluator.ts":
/*!**************************************************************************************!*\
  !*** ./src/evaluations/services/evaluators/llm-information-consistency.evaluator.ts ***!
  \**************************************************************************************/
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
exports.LLMInformationConsistencyEvaluator = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const attribute_type_enum_1 = __webpack_require__(/*! ../../../scoring-rules/enums/attribute-type.enum */ "./src/scoring-rules/enums/attribute-type.enum.ts");
const llm_evaluation_service_1 = __webpack_require__(/*! ../../../llm/services/llm-evaluation.service */ "./src/llm/services/llm-evaluation.service.ts");
let LLMInformationConsistencyEvaluator = class LLMInformationConsistencyEvaluator {
    constructor(llmEvaluationService) {
        this.llmEvaluationService = llmEvaluationService;
    }
    async evaluate(report, rule, reportType) {
        const result = await this.llmEvaluationService.evaluate(attribute_type_enum_1.AttributeType.INFORMATION_CONSISTENCY, report, reportType);
        return {
            attribute: attribute_type_enum_1.AttributeType.INFORMATION_CONSISTENCY,
            score: result.score,
            maxScore: 1,
            weight: rule.weight,
            weightedScore: result.score * rule.weight,
            passed: result.score >= 0.7,
            reasoning: result.reasoning,
        };
    }
};
exports.LLMInformationConsistencyEvaluator = LLMInformationConsistencyEvaluator;
exports.LLMInformationConsistencyEvaluator = LLMInformationConsistencyEvaluator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof llm_evaluation_service_1.LLMEvaluationService !== "undefined" && llm_evaluation_service_1.LLMEvaluationService) === "function" ? _a : Object])
], LLMInformationConsistencyEvaluator);


/***/ }),

/***/ "./src/evaluations/services/evaluators/llm-severity-level.evaluator.ts":
/*!*****************************************************************************!*\
  !*** ./src/evaluations/services/evaluators/llm-severity-level.evaluator.ts ***!
  \*****************************************************************************/
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
exports.LLMSeverityLevelEvaluator = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const attribute_type_enum_1 = __webpack_require__(/*! ../../../scoring-rules/enums/attribute-type.enum */ "./src/scoring-rules/enums/attribute-type.enum.ts");
const llm_evaluation_service_1 = __webpack_require__(/*! ../../../llm/services/llm-evaluation.service */ "./src/llm/services/llm-evaluation.service.ts");
let LLMSeverityLevelEvaluator = class LLMSeverityLevelEvaluator {
    constructor(llmEvaluationService) {
        this.llmEvaluationService = llmEvaluationService;
    }
    async evaluate(report, rule, reportType) {
        const result = await this.llmEvaluationService.evaluate(attribute_type_enum_1.AttributeType.SEVERITY_LEVEL, report, reportType);
        return {
            attribute: attribute_type_enum_1.AttributeType.SEVERITY_LEVEL,
            score: result.score,
            maxScore: 1,
            weight: rule.weight,
            weightedScore: result.score * rule.weight,
            passed: result.score >= 0.7,
            reasoning: result.reasoning,
        };
    }
};
exports.LLMSeverityLevelEvaluator = LLMSeverityLevelEvaluator;
exports.LLMSeverityLevelEvaluator = LLMSeverityLevelEvaluator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof llm_evaluation_service_1.LLMEvaluationService !== "undefined" && llm_evaluation_service_1.LLMEvaluationService) === "function" ? _a : Object])
], LLMSeverityLevelEvaluator);


/***/ }),

/***/ "./src/evaluations/services/evaluators/llm-steps-to-reproduce.evaluator.ts":
/*!*********************************************************************************!*\
  !*** ./src/evaluations/services/evaluators/llm-steps-to-reproduce.evaluator.ts ***!
  \*********************************************************************************/
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
exports.LLMStepsToReproduceEvaluator = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const attribute_type_enum_1 = __webpack_require__(/*! ../../../scoring-rules/enums/attribute-type.enum */ "./src/scoring-rules/enums/attribute-type.enum.ts");
const llm_evaluation_service_1 = __webpack_require__(/*! ../../../llm/services/llm-evaluation.service */ "./src/llm/services/llm-evaluation.service.ts");
const llm_evaluation_failed_error_1 = __webpack_require__(/*! ../../../llm/errors/llm-evaluation-failed.error */ "./src/llm/errors/llm-evaluation-failed.error.ts");
let LLMStepsToReproduceEvaluator = class LLMStepsToReproduceEvaluator {
    constructor(llmEvaluationService) {
        this.llmEvaluationService = llmEvaluationService;
    }
    async evaluate(report, rule, reportType) {
        try {
            const result = await this.llmEvaluationService.evaluate(attribute_type_enum_1.AttributeType.STEPS_TO_REPRODUCE, report, reportType);
            let evaluationStatus;
            if (result.status) {
                evaluationStatus = result.status;
            }
            else {
                if (result.score >= 0.7) {
                    evaluationStatus = 'VALID';
                }
                else if (result.score >= 0.4) {
                    evaluationStatus = 'AMBIGUOUS';
                }
                else {
                    evaluationStatus = 'INVALID';
                }
            }
            return {
                attribute: attribute_type_enum_1.AttributeType.STEPS_TO_REPRODUCE,
                score: result.score,
                maxScore: 1,
                weight: rule.weight,
                weightedScore: result.score * rule.weight,
                passed: result.score >= 0.7,
                reasoning: result.reasoning,
                evaluationStatus,
            };
        }
        catch (error) {
            if (error instanceof llm_evaluation_failed_error_1.LLMEvaluationFailedError) {
                return {
                    attribute: attribute_type_enum_1.AttributeType.STEPS_TO_REPRODUCE,
                    score: 0,
                    maxScore: 1,
                    weight: rule.weight,
                    weightedScore: 0,
                    passed: false,
                    reasoning: `LLM evaluation failed: ${error.originalError.message}`,
                    evaluationStatus: 'NEEDS_MANUAL_REVIEW',
                };
            }
            throw error;
        }
    }
};
exports.LLMStepsToReproduceEvaluator = LLMStepsToReproduceEvaluator;
exports.LLMStepsToReproduceEvaluator = LLMStepsToReproduceEvaluator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof llm_evaluation_service_1.LLMEvaluationService !== "undefined" && llm_evaluation_service_1.LLMEvaluationService) === "function" ? _a : Object])
], LLMStepsToReproduceEvaluator);


/***/ }),

/***/ "./src/evaluations/services/evaluators/llm-supporting-evidence.evaluator.ts":
/*!**********************************************************************************!*\
  !*** ./src/evaluations/services/evaluators/llm-supporting-evidence.evaluator.ts ***!
  \**********************************************************************************/
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
exports.LLMSupportingEvidenceEvaluator = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const attribute_type_enum_1 = __webpack_require__(/*! ../../../scoring-rules/enums/attribute-type.enum */ "./src/scoring-rules/enums/attribute-type.enum.ts");
const llm_evaluation_service_1 = __webpack_require__(/*! ../../../llm/services/llm-evaluation.service */ "./src/llm/services/llm-evaluation.service.ts");
let LLMSupportingEvidenceEvaluator = class LLMSupportingEvidenceEvaluator {
    constructor(llmEvaluationService) {
        this.llmEvaluationService = llmEvaluationService;
    }
    async evaluate(report, rule, reportType) {
        const result = await this.llmEvaluationService.evaluate(attribute_type_enum_1.AttributeType.SUPPORTING_EVIDENCE, report, reportType);
        return {
            attribute: attribute_type_enum_1.AttributeType.SUPPORTING_EVIDENCE,
            score: result.score,
            maxScore: 1,
            weight: rule.weight,
            weightedScore: result.score * rule.weight,
            passed: result.score >= 0.7,
            reasoning: result.reasoning,
        };
    }
};
exports.LLMSupportingEvidenceEvaluator = LLMSupportingEvidenceEvaluator;
exports.LLMSupportingEvidenceEvaluator = LLMSupportingEvidenceEvaluator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof llm_evaluation_service_1.LLMEvaluationService !== "undefined" && llm_evaluation_service_1.LLMEvaluationService) === "function" ? _a : Object])
], LLMSupportingEvidenceEvaluator);


/***/ }),

/***/ "./src/evaluations/services/evaluators/llm-test-environment.evaluator.ts":
/*!*******************************************************************************!*\
  !*** ./src/evaluations/services/evaluators/llm-test-environment.evaluator.ts ***!
  \*******************************************************************************/
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
exports.LLMTestEnvironmentEvaluator = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const attribute_type_enum_1 = __webpack_require__(/*! ../../../scoring-rules/enums/attribute-type.enum */ "./src/scoring-rules/enums/attribute-type.enum.ts");
const llm_evaluation_service_1 = __webpack_require__(/*! ../../../llm/services/llm-evaluation.service */ "./src/llm/services/llm-evaluation.service.ts");
let LLMTestEnvironmentEvaluator = class LLMTestEnvironmentEvaluator {
    constructor(llmEvaluationService) {
        this.llmEvaluationService = llmEvaluationService;
    }
    async evaluate(report, rule, reportType) {
        const result = await this.llmEvaluationService.evaluate(attribute_type_enum_1.AttributeType.TEST_ENVIRONMENT, report, reportType);
        return {
            attribute: attribute_type_enum_1.AttributeType.TEST_ENVIRONMENT,
            score: result.score,
            maxScore: 1,
            weight: rule.weight,
            weightedScore: result.score * rule.weight,
            passed: result.score >= 0.7,
            reasoning: result.reasoning,
        };
    }
};
exports.LLMTestEnvironmentEvaluator = LLMTestEnvironmentEvaluator;
exports.LLMTestEnvironmentEvaluator = LLMTestEnvironmentEvaluator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof llm_evaluation_service_1.LLMEvaluationService !== "undefined" && llm_evaluation_service_1.LLMEvaluationService) === "function" ? _a : Object])
], LLMTestEnvironmentEvaluator);


/***/ }),

/***/ "./src/evaluations/services/evaluators/llm-test-identity.evaluator.ts":
/*!****************************************************************************!*\
  !*** ./src/evaluations/services/evaluators/llm-test-identity.evaluator.ts ***!
  \****************************************************************************/
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
exports.LLMTestIdentityEvaluator = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const attribute_type_enum_1 = __webpack_require__(/*! ../../../scoring-rules/enums/attribute-type.enum */ "./src/scoring-rules/enums/attribute-type.enum.ts");
const llm_evaluation_service_1 = __webpack_require__(/*! ../../../llm/services/llm-evaluation.service */ "./src/llm/services/llm-evaluation.service.ts");
let LLMTestIdentityEvaluator = class LLMTestIdentityEvaluator {
    constructor(llmEvaluationService) {
        this.llmEvaluationService = llmEvaluationService;
    }
    async evaluate(report, rule, reportType) {
        const result = await this.llmEvaluationService.evaluate(attribute_type_enum_1.AttributeType.TEST_IDENTITY, report, reportType);
        return {
            attribute: attribute_type_enum_1.AttributeType.TEST_IDENTITY,
            score: result.score,
            maxScore: 1,
            weight: rule.weight,
            weightedScore: result.score * rule.weight,
            passed: result.score >= 0.7,
            reasoning: result.reasoning,
        };
    }
};
exports.LLMTestIdentityEvaluator = LLMTestIdentityEvaluator;
exports.LLMTestIdentityEvaluator = LLMTestIdentityEvaluator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof llm_evaluation_service_1.LLMEvaluationService !== "undefined" && llm_evaluation_service_1.LLMEvaluationService) === "function" ? _a : Object])
], LLMTestIdentityEvaluator);


/***/ }),

/***/ "./src/evaluations/services/generate-feedback.service.ts":
/*!***************************************************************!*\
  !*** ./src/evaluations/services/generate-feedback.service.ts ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GenerateFeedbackService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const attribute_type_enum_1 = __webpack_require__(/*! ../../scoring-rules/enums/attribute-type.enum */ "./src/scoring-rules/enums/attribute-type.enum.ts");
const feedback_severity_enum_1 = __webpack_require__(/*! ../enums/feedback-severity.enum */ "./src/evaluations/enums/feedback-severity.enum.ts");
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

/***/ "./src/evaluations/services/get-evaluation.service.ts":
/*!************************************************************!*\
  !*** ./src/evaluations/services/get-evaluation.service.ts ***!
  \************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const gqlerr_1 = __webpack_require__(/*! @app/gqlerr */ "./libs/gqlerr/src/index.ts");
const evaluation_1 = __webpack_require__(/*! ../models/evaluation */ "./src/evaluations/models/evaluation.ts");
const parser_1 = __webpack_require__(/*! ../models/parser */ "./src/evaluations/models/parser.ts");
let GetEvaluationService = class GetEvaluationService {
    constructor(evaluationModel) {
        this.evaluationModel = evaluationModel;
    }
    async findByReportId(reportId) {
        try {
            const evaluation = (await this.evaluationModel
                .findOne({ reportId })
                .sort({ version: -1 })
                .lean()
                .exec());
            if (!evaluation) {
                return null;
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

/***/ "./src/llm/config/llm.config.ts":
/*!**************************************!*\
  !*** ./src/llm/config/llm.config.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
exports["default"] = (0, config_1.registerAs)('llm', () => ({
    apiKey: process.env.OPENAI_API_KEY || '',
    model: process.env.OPENAI_MODEL || 'gpt-4o',
    temperature: process.env.OPENAI_TEMPERATURE
        ? parseFloat(process.env.OPENAI_TEMPERATURE)
        : 0.2,
    timeout: process.env.OPENAI_TIMEOUT
        ? parseInt(process.env.OPENAI_TIMEOUT, 10)
        : 30000,
    maxRetries: process.env.OPENAI_MAX_RETRIES
        ? parseInt(process.env.OPENAI_MAX_RETRIES, 10)
        : 3,
    cacheEnabled: process.env.LLM_CACHE_ENABLED !== 'false',
    cacheTTL: process.env.LLM_CACHE_TTL
        ? parseInt(process.env.LLM_CACHE_TTL, 10)
        : 86400000,
}));


/***/ }),

/***/ "./src/llm/errors/llm-evaluation-failed.error.ts":
/*!*******************************************************!*\
  !*** ./src/llm/errors/llm-evaluation-failed.error.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LLMEvaluationFailedError = void 0;
class LLMEvaluationFailedError extends Error {
    constructor(attribute, originalError, retryAttempts) {
        super(`LLM evaluation failed for attribute ${attribute} after ${retryAttempts} attempts: ${originalError.message}`);
        this.attribute = attribute;
        this.originalError = originalError;
        this.retryAttempts = retryAttempts;
        this.name = 'LLMEvaluationFailedError';
        Object.setPrototypeOf(this, LLMEvaluationFailedError.prototype);
    }
}
exports.LLMEvaluationFailedError = LLMEvaluationFailedError;


/***/ }),

/***/ "./src/llm/llm.module.ts":
/*!*******************************!*\
  !*** ./src/llm/llm.module.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LLMModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const cache_manager_1 = __webpack_require__(/*! @nestjs/cache-manager */ "@nestjs/cache-manager");
const llm_config_1 = __webpack_require__(/*! ./config/llm.config */ "./src/llm/config/llm.config.ts");
const llm_evaluation_service_1 = __webpack_require__(/*! ./services/llm-evaluation.service */ "./src/llm/services/llm-evaluation.service.ts");
const prompt_builder_service_1 = __webpack_require__(/*! ./services/prompt-builder.service */ "./src/llm/services/prompt-builder.service.ts");
const llm_cache_service_1 = __webpack_require__(/*! ./services/llm-cache.service */ "./src/llm/services/llm-cache.service.ts");
let LLMModule = class LLMModule {
};
exports.LLMModule = LLMModule;
exports.LLMModule = LLMModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forFeature(llm_config_1.default),
            cache_manager_1.CacheModule.register({
                ttl: 86400000,
                max: 1000,
            }),
        ],
        providers: [
            llm_evaluation_service_1.LLMEvaluationService,
            prompt_builder_service_1.PromptBuilderService,
            llm_cache_service_1.LLMCacheService,
        ],
        exports: [
            llm_evaluation_service_1.LLMEvaluationService,
            prompt_builder_service_1.PromptBuilderService,
            llm_cache_service_1.LLMCacheService,
        ],
    })
], LLMModule);


/***/ }),

/***/ "./src/llm/services/llm-cache.service.ts":
/*!***********************************************!*\
  !*** ./src/llm/services/llm-cache.service.ts ***!
  \***********************************************/
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
exports.LLMCacheService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const cache_manager_1 = __webpack_require__(/*! @nestjs/cache-manager */ "@nestjs/cache-manager");
const cache_manager_2 = __webpack_require__(/*! cache-manager */ "cache-manager");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const crypto = __webpack_require__(/*! crypto */ "crypto");
let LLMCacheService = class LLMCacheService {
    constructor(cacheManager, configService) {
        this.cacheManager = cacheManager;
        this.configService = configService;
        this.cacheEnabled =
            this.configService.get('llm.cacheEnabled') !== false;
    }
    async get(attribute, reportData) {
        if (!this.cacheEnabled) {
            return null;
        }
        const cacheKey = this.generateCacheKey(attribute, reportData);
        try {
            const cached = await this.cacheManager.get(cacheKey);
            return cached || null;
        }
        catch (error) {
            console.error('Cache get error:', error);
            return null;
        }
    }
    async set(attribute, reportData, result, ttl) {
        if (!this.cacheEnabled) {
            return;
        }
        const cacheKey = this.generateCacheKey(attribute, reportData);
        try {
            await this.cacheManager.set(cacheKey, result, ttl);
        }
        catch (error) {
            console.error('Cache set error:', error);
        }
    }
    generateCacheKey(attribute, reportData) {
        const dataToHash = JSON.stringify({
            attribute,
            testId: reportData.testIdentity?.testId,
            version: reportData.testIdentity?.version,
            actualResult: reportData.actualResult,
            expectedResult: reportData.expectedResult,
            stepsToReproduce: reportData.stepsToReproduce,
            testEnvironment: reportData.testEnvironment,
            supportingEvidence: reportData.supportingEvidence,
            severityLevel: reportData.severityLevel,
        });
        const hash = crypto.createHash('sha256').update(dataToHash).digest('hex');
        return `llm:eval:${attribute}:${hash}`;
    }
};
exports.LLMCacheService = LLMCacheService;
exports.LLMCacheService = LLMCacheService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeof (_a = typeof cache_manager_2.Cache !== "undefined" && cache_manager_2.Cache) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], LLMCacheService);


/***/ }),

/***/ "./src/llm/services/llm-evaluation.service.ts":
/*!****************************************************!*\
  !*** ./src/llm/services/llm-evaluation.service.ts ***!
  \****************************************************/
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
var LLMEvaluationService_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LLMEvaluationService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const openai_1 = __webpack_require__(/*! openai */ "openai");
const prompt_builder_service_1 = __webpack_require__(/*! ./prompt-builder.service */ "./src/llm/services/prompt-builder.service.ts");
const llm_cache_service_1 = __webpack_require__(/*! ./llm-cache.service */ "./src/llm/services/llm-cache.service.ts");
const llm_evaluation_failed_error_1 = __webpack_require__(/*! ../errors/llm-evaluation-failed.error */ "./src/llm/errors/llm-evaluation-failed.error.ts");
let LLMEvaluationService = LLMEvaluationService_1 = class LLMEvaluationService {
    constructor(configService, promptBuilder, cacheService) {
        this.configService = configService;
        this.promptBuilder = promptBuilder;
        this.cacheService = cacheService;
        this.logger = new common_1.Logger(LLMEvaluationService_1.name);
        const apiKey = this.configService.get('llm.apiKey');
        if (!apiKey) {
            this.logger.warn('OpenAI API key not configured');
        }
        this.openai = new openai_1.default({
            apiKey: apiKey,
        });
        this.model = this.configService.get('llm.model') || 'gpt-4o-mini';
        this.temperature =
            this.configService.get('llm.temperature') || 0.2;
        this.timeout = this.configService.get('llm.timeout') || 30000;
        this.maxRetries = this.configService.get('llm.maxRetries') || 3;
        this.cacheEnabled =
            this.configService.get('llm.cacheEnabled') !== false;
        this.cacheTTL =
            this.configService.get('llm.cacheTTL') || 86400000;
    }
    async evaluate(attribute, report, reportType) {
        if (this.cacheEnabled) {
            const reportData = this.convertReportToPlainObject(report);
            const cached = await this.cacheService.get(attribute, reportData);
            if (cached) {
                this.logger.debug(`Cache hit for attribute: ${attribute}`);
                return cached;
            }
        }
        const { systemPrompt, userPrompt } = this.promptBuilder.buildPrompt(attribute, report, reportType);
        let lastError = null;
        for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
            try {
                const result = await this.callOpenAI(systemPrompt, userPrompt);
                if (this.cacheEnabled) {
                    const reportData = this.convertReportToPlainObject(report);
                    await this.cacheService.set(attribute, reportData, result, this.cacheTTL);
                }
                return result;
            }
            catch (error) {
                lastError = error;
                this.logger.warn(`OpenAI API call failed (attempt ${attempt}/${this.maxRetries}): ${error.message}`);
                if (error instanceof Error &&
                    (error.message.includes('rate limit') ||
                        error.message.includes('429'))) {
                    const waitTime = Math.min(1000 * Math.pow(2, attempt), 10000);
                    await this.sleep(waitTime);
                }
                else if (attempt < this.maxRetries) {
                    const waitTime = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
                    await this.sleep(waitTime);
                }
            }
        }
        this.logger.error(`All retry attempts failed for attribute ${attribute}. Throwing error for failover.`);
        throw new llm_evaluation_failed_error_1.LLMEvaluationFailedError(attribute, lastError || new Error('Unknown error'), this.maxRetries);
    }
    async callOpenAI(systemPrompt, userPrompt) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);
        try {
            const completion = await this.openai.chat.completions.create({
                model: this.model,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt },
                ],
                temperature: this.temperature,
                response_format: { type: 'json_object' },
                max_tokens: 200,
            }, { signal: controller.signal });
            clearTimeout(timeoutId);
            const content = completion.choices[0]?.message?.content;
            if (!content) {
                throw new Error('Empty response from OpenAI');
            }
            const parsed = JSON.parse(content);
            let score = parseFloat(parsed.score);
            if (isNaN(score) || score < 0) {
                score = 0;
            }
            else if (score > 1) {
                score = 1;
            }
            const result = {
                score,
                reasoning: parsed.reasoning || 'No reasoning provided',
            };
            if (parsed.status) {
                const validStatuses = ['VALID', 'AMBIGUOUS', 'INVALID'];
                if (validStatuses.includes(parsed.status)) {
                    result.status = parsed.status;
                }
            }
            if (parsed.qualityFlags) {
                result.qualityFlags = {
                    isConsistent: parsed.qualityFlags.isConsistent ?? undefined,
                    isClear: parsed.qualityFlags.isClear ?? undefined,
                    isContradictory: parsed.qualityFlags.isContradictory ?? undefined,
                    isTooGeneric: parsed.qualityFlags.isTooGeneric ?? undefined,
                    hasBias: parsed.qualityFlags.hasBias ?? undefined,
                    isAmbiguous: parsed.qualityFlags.isAmbiguous ?? undefined,
                };
            }
            if (parsed.issues && Array.isArray(parsed.issues)) {
                result.issues = parsed.issues;
            }
            return result;
        }
        catch (error) {
            clearTimeout(timeoutId);
            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    throw new Error(`Request timeout after ${this.timeout}ms`);
                }
                throw error;
            }
            throw new Error('Unknown error occurred');
        }
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    convertReportToPlainObject(report) {
        return {
            testIdentity: report.testIdentity,
            testEnvironment: report.testEnvironment,
            stepsToReproduce: report.stepsToReproduce,
            actualResult: report.actualResult,
            expectedResult: report.expectedResult,
            supportingEvidence: report.supportingEvidence,
            severityLevel: report.severityLevel,
            reportType: report.reportType,
        };
    }
};
exports.LLMEvaluationService = LLMEvaluationService;
exports.LLMEvaluationService = LLMEvaluationService = LLMEvaluationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof prompt_builder_service_1.PromptBuilderService !== "undefined" && prompt_builder_service_1.PromptBuilderService) === "function" ? _b : Object, typeof (_c = typeof llm_cache_service_1.LLMCacheService !== "undefined" && llm_cache_service_1.LLMCacheService) === "function" ? _c : Object])
], LLMEvaluationService);


/***/ }),

/***/ "./src/llm/services/prompt-builder.service.ts":
/*!****************************************************!*\
  !*** ./src/llm/services/prompt-builder.service.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PromptBuilderService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const attribute_type_enum_1 = __webpack_require__(/*! ../../scoring-rules/enums/attribute-type.enum */ "./src/scoring-rules/enums/attribute-type.enum.ts");
const report_type_enum_1 = __webpack_require__(/*! ../../uat-reports/enums/report-type.enum */ "./src/uat-reports/enums/report-type.enum.ts");
let PromptBuilderService = class PromptBuilderService {
    buildPrompt(attribute, report, reportType) {
        const systemPrompt = this.getSystemPrompt(attribute, reportType);
        const userPrompt = this.getUserPrompt(attribute, report, reportType);
        return {
            systemPrompt,
            userPrompt,
        };
    }
    getSystemPrompt(attribute, reportType) {
        const reportTypeLabel = reportType === report_type_enum_1.ReportType.BUG_REPORT ? 'Laporan Bug' : 'Laporan Sukses';
        if (attribute === attribute_type_enum_1.AttributeType.STEPS_TO_REPRODUCE) {
            return `Anda adalah evaluator quality assurance ahli yang mengkhususkan diri dalam mengevaluasi kemampuan reproduksi test case. Tugas Anda adalah mengevaluasi Langkah-langkah untuk Reproduksi untuk ${reportTypeLabel.toLowerCase()} dan memberikan penilaian semantik.

Anda HARUS merespons HANYA dengan JSON yang valid dalam format ini:
{"score": 0.0-1.0, "status": "VALID|AMBIGUOUS|INVALID", "reasoning": "penjelasan singkat", "issues": ["daftar masalah jika ada"]}

Pemetaan Status:
- VALID: score >= 0.7 - Langkah-langkah tersusun secara logis, dapat direproduksi, dan lengkap
- AMBIGUOUS: 0.4 <= score < 0.7 - Langkah-langkah memiliki beberapa masalah tetapi mungkin masih bisa digunakan
- INVALID: score < 0.4 - Langkah-langkah tidak jelas, tidak logis, atau tidak lengkap

Skor harus mencerminkan kualitas semantik, bukan jumlah karakter. Evaluasi berdasarkan:
- Urutan dan logika langkah
- Hubungan sebab-akibat antar langkah
- Kemampuan reproduksi oleh tester lain
- Kelengkapan untuk reproduksi bug

Bersikap ketat tetapi adil dalam evaluasi Anda.`;
        }
        if (attribute === attribute_type_enum_1.AttributeType.ACTUAL_RESULT) {
            return `Anda adalah evaluator quality assurance ahli yang mengkhususkan diri dalam mengevaluasi deskripsi laporan bug. Tugas Anda adalah mengevaluasi deskripsi Hasil Aktual untuk ${reportTypeLabel.toLowerCase()} dan memberikan penilaian semantik.

Anda HARUS merespons HANYA dengan JSON yang valid dalam format ini:
{"score": 0.0-1.0, "reasoning": "penjelasan singkat", "qualityFlags": {"isConsistent": true/false, "isClear": true/false, "isContradictory": false/true, "isTooGeneric": false/true, "hasBias": false/true, "isAmbiguous": false/true}}

Skor harus mencerminkan kualitas semantik, bukan jumlah karakter. Evaluasi berdasarkan:
- Konsistensi dengan judul laporan
- Kejelasan deskripsi perilaku sistem
- Tidak ada kontradiksi
- Spesifisitas (tidak terlalu umum)
- Kelengkapan informasi

Bersikap ketat tetapi adil dalam evaluasi Anda.`;
        }
        return `Anda adalah evaluator quality assurance ahli. Tugas Anda adalah mengevaluasi atribut ${reportTypeLabel.toLowerCase()} dan memberikan skor dari 0.0 hingga 1.0.

Anda HARUS merespons HANYA dengan JSON yang valid dalam format ini:
{"score": 0.0-1.0, "reasoning": "penjelasan singkat dari evaluasi Anda"}

Skor harus mencerminkan:
- 0.0-0.3: Kualitas buruk, informasi kritis hilang
- 0.4-0.6: Dapat diterima tetapi tidak lengkap atau tidak jelas
- 0.7-0.9: Kualitas baik dengan masalah minor
- 1.0: Kualitas sangat baik, lengkap dan jelas

Bersikap ketat tetapi adil dalam evaluasi Anda.`;
    }
    getUserPrompt(attribute, report, reportType) {
        const reportTypeLabel = reportType === report_type_enum_1.ReportType.BUG_REPORT ? 'Laporan Bug' : 'Laporan Sukses';
        switch (attribute) {
            case attribute_type_enum_1.AttributeType.TEST_ENVIRONMENT:
                return this.buildTestEnvironmentPrompt(report, reportTypeLabel);
            case attribute_type_enum_1.AttributeType.STEPS_TO_REPRODUCE:
                return this.buildStepsToReproducePrompt(report, reportTypeLabel);
            case attribute_type_enum_1.AttributeType.ACTUAL_RESULT:
                return this.buildActualResultPrompt(report, reportTypeLabel);
            case attribute_type_enum_1.AttributeType.EXPECTED_RESULT:
                return this.buildExpectedResultPrompt(report, reportTypeLabel);
            case attribute_type_enum_1.AttributeType.SUPPORTING_EVIDENCE:
                return this.buildSupportingEvidencePrompt(report, reportTypeLabel);
            case attribute_type_enum_1.AttributeType.SEVERITY_LEVEL:
                return this.buildSeverityLevelPrompt(report, reportTypeLabel);
            case attribute_type_enum_1.AttributeType.INFORMATION_CONSISTENCY:
                return this.buildInformationConsistencyPrompt(report, reportTypeLabel);
            case attribute_type_enum_1.AttributeType.TEST_IDENTITY:
                return this.buildTestIdentityPrompt(report, reportTypeLabel);
            default:
                return this.buildGenericPrompt(attribute, report, reportTypeLabel);
        }
    }
    buildTestEnvironmentPrompt(report, reportTypeLabel) {
        const env = report.testEnvironment;
        return `Evaluasi atribut Lingkungan Uji untuk ${reportTypeLabel.toLowerCase()} ini:

Data Lingkungan Uji:
- Sistem Operasi: ${env?.os || 'Tidak disediakan'}
- Browser: ${env?.browser || 'Tidak disediakan'}
- Perangkat: ${env?.device || 'Tidak disediakan'}
- Informasi Tambahan: ${env?.additionalInfo || 'Tidak ada'}

Kriteria Penilaian:
- Semua field wajib (OS, Browser, Perangkat) disediakan: +0.5
- Informasi tambahan yang relevan disediakan: +0.3
- Informasi jelas dan spesifik: +0.2

Kembalikan JSON: {"score": 0.0-1.0, "reasoning": "penjelasan"}`;
    }
    buildStepsToReproducePrompt(report, reportTypeLabel) {
        const steps = report.stepsToReproduce || [];
        const stepsText = steps.length > 0
            ? steps.map((step, i) => `${i + 1}. ${step}`).join('\n')
            : 'Tidak ada langkah yang disediakan';
        const title = report.testIdentity?.title || 'N/A';
        const actualResult = report.actualResult || 'N/A';
        const expectedResult = report.expectedResult || 'N/A';
        return `Evaluasi atribut Langkah-langkah untuk Reproduksi untuk ${reportTypeLabel.toLowerCase()} ini:

Judul Laporan: ${title}

Langkah-langkah untuk Reproduksi:
${stepsText}

Konteks:
- Hasil Aktual: ${actualResult.substring(0, 200)}${actualResult.length > 200 ? '...' : ''}
- Hasil yang Diharapkan: ${expectedResult.substring(0, 200)}${expectedResult.length > 200 ? '...' : ''}

Kriteria Evaluasi Semantik:
1. Validitas Urutan (0.3 poin):
   - Apakah langkah-langkah dalam urutan yang logis?
   - Apakah mereka mengikuti progresi alami?
   - Apakah ada awal dan akhir yang jelas?

2. Hubungan Sebab-Akibat (0.3 poin):
   - Apakah langkah-langkah saling membangun?
   - Apakah ada rantai sebab-akibat yang jelas?
   - Apakah dependensi antar langkah eksplisit?

3. Kemampuan Reproduksi (0.2 poin):
   - Dapatkah tester lain mengikuti langkah-langkah ini?
   - Apakah tindakan spesifik dan tidak ambigu?
   - Apakah semua detail yang diperlukan disertakan?

4. Kelengkapan (0.2 poin):
   - Apakah semua langkah yang diperlukan untuk mereproduksi masalah ada?
   - Apakah tidak ada yang kritis yang hilang?
   - Apakah mengikuti langkah-langkah ini akan secara andal mereproduksi bug?

Kembalikan JSON: {"score": 0.0-1.0, "status": "VALID|AMBIGUOUS|INVALID", "reasoning": "penjelasan detail", "issues": ["daftar masalah spesifik yang ditemukan"]}`;
    }
    buildActualResultPrompt(report, reportTypeLabel) {
        const actualResult = report.actualResult || 'Not provided';
        const isSuccessReport = report.reportType === report_type_enum_1.ReportType.SUCCESS_REPORT;
        const title = report.testIdentity?.title || 'N/A';
        const expectedResult = report.expectedResult || 'N/A';
        if (isSuccessReport) {
            return `Evaluasi atribut Deskripsi Sukses (Hasil Aktual) untuk laporan sukses ini:

Judul Laporan: ${title}

Deskripsi Sukses:
${actualResult}

Hasil yang Diharapkan (untuk konteks):
${expectedResult}

Kriteria Evaluasi Semantik:
1. Konsistensi dengan Judul (0.2 poin):
   - Apakah deskripsi konsisten dengan judul laporan?
   - Apakah sesuai dengan yang disarankan oleh judul?

2. Kejelasan Perilaku Sukses (0.3 poin):
   - Apakah jelas apa yang berhasil?
   - Apakah perilaku sukses dijelaskan secara detail?
   - Dapatkah pembaca memahami apa yang berfungsi?

3. Tidak Kontradiktif (0.2 poin):
   - Apakah ada kontradiksi dalam deskripsi?
   - Apakah informasi koheren?

4. Spesifisitas (0.2 poin):
   - Apakah deskripsi cukup spesifik?
   - Tidak terlalu umum atau samar?
   - Menyertakan detail yang relevan?

5. Kelengkapan (0.1 poin):
   - Apakah semua informasi yang diperlukan disertakan?
   - Dapatkah seseorang memahami kesuksesan tanpa konteks tambahan?

Kembalikan JSON: {"score": 0.0-1.0, "reasoning": "penjelasan detail", "qualityFlags": {"isConsistent": true/false, "isClear": true/false, "isContradictory": false/true, "isTooGeneric": false/true, "hasBias": false/true, "isAmbiguous": false/true}}`;
        }
        return `Evaluasi atribut Hasil Aktual untuk laporan bug ini:

Judul Laporan: ${title}

Hasil Aktual:
${actualResult}

Hasil yang Diharapkan (untuk perbandingan):
${expectedResult}

Kriteria Evaluasi Semantik:
1. Konsistensi dengan Judul (0.2 poin):
   - Apakah hasil aktual konsisten dengan judul laporan?
   - Apakah menggambarkan masalah yang disebutkan dalam judul?

2. Kejelasan Perilaku Sistem (0.3 poin):
   - Apakah jelas apa yang sebenarnya terjadi?
   - Apakah perilaku sistem dijelaskan dengan jelas?
   - Dapatkah pembaca memahami masalahnya?

3. Tidak Kontradiktif (0.2 poin):
   - Apakah ada kontradiksi dalam deskripsi?
   - Apakah informasi koheren dan logis?

4. Spesifisitas (0.2 poin):
   - Apakah deskripsi cukup spesifik?
   - Tidak terlalu umum atau samar?
   - Menyertakan pesan error, gejala, atau detail yang relevan?

5. Kelengkapan (0.1 poin):
   - Apakah semua informasi yang diperlukan disertakan?
   - Dapatkah seseorang memahami masalah tanpa konteks tambahan?

Kembalikan JSON: {"score": 0.0-1.0, "reasoning": "penjelasan detail", "qualityFlags": {"isConsistent": true/false, "isClear": true/false, "isContradictory": false/true, "isTooGeneric": false/true, "hasBias": false/true, "isAmbiguous": false/true}}`;
    }
    buildExpectedResultPrompt(report, reportTypeLabel) {
        const expectedResult = report.expectedResult || 'Tidak disediakan';
        return `Evaluasi atribut Hasil yang Diharapkan untuk ${reportTypeLabel.toLowerCase()} ini:

Hasil yang Diharapkan:
${expectedResult}

Kriteria Penilaian:
- Hasil yang diharapkan disediakan dan bermakna (minimal 10 karakter): +0.4
- Jelas menggambarkan apa yang seharusnya terjadi: +0.3
- Kontras dengan tepat terhadap hasil aktual: +0.2
- Deskripsi jelas dan spesifik: +0.1

Kembalikan JSON: {"score": 0.0-1.0, "reasoning": "penjelasan"}`;
    }
    buildSupportingEvidencePrompt(report, reportTypeLabel) {
        const evidence = report.supportingEvidence || [];
        const evidenceText = evidence.length > 0
            ? evidence
                .map((e, i) => `${i + 1}. Tipe: ${e.type}, URL: ${e.url || 'N/A'}, Deskripsi: ${e.description || 'Tidak ada'}`)
                .join('\n')
            : 'Tidak ada bukti pendukung yang disediakan';
        return `Evaluasi atribut Bukti Pendukung untuk ${reportTypeLabel.toLowerCase()} ini:

Bukti Pendukung:
${evidenceText}

Kriteria Penilaian:
- Setidaknya satu bukti disediakan: +0.5
- Bukti relevan dengan laporan: +0.3
- Bukti menyertakan deskripsi atau konteks yang tepat: +0.2

Kembalikan JSON: {"score": 0.0-1.0, "reasoning": "penjelasan"}`;
    }
    buildSeverityLevelPrompt(report, reportTypeLabel) {
        const severity = report.severityLevel;
        const actualResult = report.actualResult || '';
        const expectedResult = report.expectedResult || '';
        return `Evaluasi atribut Tingkat Keparahan untuk ${reportTypeLabel.toLowerCase()} ini:

Tingkat Keparahan: ${severity}

Hasil Aktual: ${actualResult.substring(0, 200)}
Hasil yang Diharapkan: ${expectedResult.substring(0, 200)}

Kriteria Penilaian:
- Tingkat keparahan sesuai dengan masalah yang dijelaskan: +0.5
- Keparahan sesuai dengan dampak yang dijelaskan dalam hasil aktual/diharapkan: +0.3
- Tingkat keparahan ditetapkan dengan benar (Critical untuk crash, High untuk masalah besar, dll.): +0.2

Kembalikan JSON: {"score": 0.0-1.0, "reasoning": "penjelasan"}`;
    }
    buildInformationConsistencyPrompt(report, reportTypeLabel) {
        const actualResult = report.actualResult || '';
        const expectedResult = report.expectedResult || '';
        const severity = report.severityLevel;
        const steps = report.stepsToReproduce || [];
        return `Evaluasi atribut Konsistensi Informasi untuk ${reportTypeLabel.toLowerCase()} ini:

Hasil Aktual: ${actualResult.substring(0, 200)}
Hasil yang Diharapkan: ${expectedResult.substring(0, 200)}
Tingkat Keparahan: ${severity}
Langkah-langkah untuk Reproduksi: ${steps.length} langkah disediakan

Kriteria Penilaian:
- Hasil aktual dan yang diharapkan berbeda (seperti yang seharusnya untuk laporan bug): +0.3
- Baik hasil aktual maupun yang diharapkan bermakna (minimal 10 karakter masing-masing): +0.2
- Tingkat keparahan konsisten dengan masalah yang dijelaskan: +0.2
- Langkah-langkah untuk reproduksi selaras dengan masalah yang dijelaskan: +0.2
- Secara keseluruhan informasi koheren dan konsisten: +0.1

Kembalikan JSON: {"score": 0.0-1.0, "reasoning": "penjelasan"}`;
    }
    buildTestIdentityPrompt(report, reportTypeLabel) {
        const testIdentity = report.testIdentity;
        return `Evaluasi atribut Identitas Test untuk ${reportTypeLabel.toLowerCase()} ini:

Data Identitas Test:
- ID Test: ${testIdentity?.testId || 'Tidak disediakan'}
- Versi: ${testIdentity?.version || 'Tidak disediakan'}
- Judul: ${testIdentity?.title || 'Tidak disediakan'}

Kriteria Penilaian:
- ID Test disediakan dan valid: +0.4
- Versi disediakan: +0.3
- Nama test case disediakan: +0.3

Kembalikan JSON: {"score": 0.0-1.0, "reasoning": "penjelasan"}`;
    }
    buildGenericPrompt(attribute, report, reportTypeLabel) {
        return `Evaluasi atribut ${attribute} untuk ${reportTypeLabel.toLowerCase()} ini.

Data Laporan:
${JSON.stringify(report, null, 2)}

Berikan skor dari 0.0 hingga 1.0 berdasarkan kualitas dan kelengkapan atribut ini.

Kembalikan JSON: {"score": 0.0-1.0, "reasoning": "penjelasan"}`;
    }
};
exports.PromptBuilderService = PromptBuilderService;
exports.PromptBuilderService = PromptBuilderService = __decorate([
    (0, common_1.Injectable)()
], PromptBuilderService);


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./src/app.module.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const gqlerr_1 = __webpack_require__(/*! @app/gqlerr */ "./libs/gqlerr/src/index.ts");
const cookieParser = __webpack_require__(/*! cookie-parser */ "cookie-parser");
const config_service_1 = __webpack_require__(/*! ./config/config.service */ "./src/config/config.service.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    const allowedOrigins = config.get('app.corsOrigins') || [
        'http://localhost:3000',
    ];
    app.enableCors({
        origin: (origin, callback) => {
            if (!origin)
                return callback(null, true);
            if (allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
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

/***/ "./src/scoring-rules/dto/inputs/update-scoring-rule.input.ts":
/*!*******************************************************************!*\
  !*** ./src/scoring-rules/dto/inputs/update-scoring-rule.input.ts ***!
  \*******************************************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const attribute_type_enum_1 = __webpack_require__(/*! ../../enums/attribute-type.enum */ "./src/scoring-rules/enums/attribute-type.enum.ts");
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

/***/ "./src/scoring-rules/dto/views/config-history-connection.view.ts":
/*!***********************************************************************!*\
  !*** ./src/scoring-rules/dto/views/config-history-connection.view.ts ***!
  \***********************************************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const types_1 = __webpack_require__(/*! ../../../common/types */ "./src/common/types/index.ts");
const config_history_view_1 = __webpack_require__(/*! ./config-history.view */ "./src/scoring-rules/dto/views/config-history.view.ts");
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

/***/ "./src/scoring-rules/dto/views/config-history.view.ts":
/*!************************************************************!*\
  !*** ./src/scoring-rules/dto/views/config-history.view.ts ***!
  \************************************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const config_type_enum_1 = __webpack_require__(/*! ../../enums/config-type.enum */ "./src/scoring-rules/enums/config-type.enum.ts");
const attribute_type_enum_1 = __webpack_require__(/*! ../../enums/attribute-type.enum */ "./src/scoring-rules/enums/attribute-type.enum.ts");
const user_view_1 = __webpack_require__(/*! ../../../users/dto/views/user.view */ "./src/users/dto/views/user.view.ts");
const json_scalar_1 = __webpack_require__(/*! ../../../common/scalars/json.scalar */ "./src/common/scalars/json.scalar.ts");
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

/***/ "./src/scoring-rules/dto/views/scoring-rule.view.ts":
/*!**********************************************************!*\
  !*** ./src/scoring-rules/dto/views/scoring-rule.view.ts ***!
  \**********************************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const attribute_type_enum_1 = __webpack_require__(/*! ../../enums/attribute-type.enum */ "./src/scoring-rules/enums/attribute-type.enum.ts");
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

/***/ "./src/scoring-rules/dto/views/validation-config.view.ts":
/*!***************************************************************!*\
  !*** ./src/scoring-rules/dto/views/validation-config.view.ts ***!
  \***************************************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const user_view_1 = __webpack_require__(/*! ../../../users/dto/views/user.view */ "./src/users/dto/views/user.view.ts");
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

/***/ "./src/scoring-rules/enums/attribute-type.enum.ts":
/*!********************************************************!*\
  !*** ./src/scoring-rules/enums/attribute-type.enum.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttributeType = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
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

/***/ "./src/scoring-rules/enums/config-type.enum.ts":
/*!*****************************************************!*\
  !*** ./src/scoring-rules/enums/config-type.enum.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigType = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
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

/***/ "./src/scoring-rules/models/config-history.ts":
/*!****************************************************!*\
  !*** ./src/scoring-rules/models/config-history.ts ***!
  \****************************************************/
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
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const config_type_enum_1 = __webpack_require__(/*! ../enums/config-type.enum */ "./src/scoring-rules/enums/config-type.enum.ts");
const attribute_type_enum_1 = __webpack_require__(/*! ../enums/attribute-type.enum */ "./src/scoring-rules/enums/attribute-type.enum.ts");
const json_scalar_1 = __webpack_require__(/*! ../../common/scalars/json.scalar */ "./src/common/scalars/json.scalar.ts");
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

/***/ "./src/scoring-rules/models/parser.ts":
/*!********************************************!*\
  !*** ./src/scoring-rules/models/parser.ts ***!
  \********************************************/
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

/***/ "./src/scoring-rules/models/scoring-rule.ts":
/*!**************************************************!*\
  !*** ./src/scoring-rules/models/scoring-rule.ts ***!
  \**************************************************/
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
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const attribute_type_enum_1 = __webpack_require__(/*! ../enums/attribute-type.enum */ "./src/scoring-rules/enums/attribute-type.enum.ts");
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

/***/ "./src/scoring-rules/models/validation-config.ts":
/*!*******************************************************!*\
  !*** ./src/scoring-rules/models/validation-config.ts ***!
  \*******************************************************/
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
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
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

/***/ "./src/scoring-rules/scoring-rules.module.ts":
/*!***************************************************!*\
  !*** ./src/scoring-rules/scoring-rules.module.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScoringRulesModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const scoring_rule_1 = __webpack_require__(/*! ./models/scoring-rule */ "./src/scoring-rules/models/scoring-rule.ts");
const validation_config_1 = __webpack_require__(/*! ./models/validation-config */ "./src/scoring-rules/models/validation-config.ts");
const config_history_1 = __webpack_require__(/*! ./models/config-history */ "./src/scoring-rules/models/config-history.ts");
const user_1 = __webpack_require__(/*! ../users/models/user */ "./src/users/models/user.ts");
const initialize_scoring_rules_service_1 = __webpack_require__(/*! ./services/initialize-scoring-rules.service */ "./src/scoring-rules/services/initialize-scoring-rules.service.ts");
const get_scoring_rules_service_1 = __webpack_require__(/*! ./services/get-scoring-rules.service */ "./src/scoring-rules/services/get-scoring-rules.service.ts");
const update_scoring_rule_service_1 = __webpack_require__(/*! ./services/update-scoring-rule.service */ "./src/scoring-rules/services/update-scoring-rule.service.ts");
const toggle_scoring_rule_service_1 = __webpack_require__(/*! ./services/toggle-scoring-rule.service */ "./src/scoring-rules/services/toggle-scoring-rule.service.ts");
const update_validation_threshold_service_1 = __webpack_require__(/*! ./services/update-validation-threshold.service */ "./src/scoring-rules/services/update-validation-threshold.service.ts");
const reset_scoring_rules_service_1 = __webpack_require__(/*! ./services/reset-scoring-rules.service */ "./src/scoring-rules/services/reset-scoring-rules.service.ts");
const track_config_change_service_1 = __webpack_require__(/*! ./services/track-config-change.service */ "./src/scoring-rules/services/track-config-change.service.ts");
const scoring_rules_resolver_1 = __webpack_require__(/*! ./scoring-rules.resolver */ "./src/scoring-rules/scoring-rules.resolver.ts");
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

/***/ "./src/scoring-rules/scoring-rules.resolver.ts":
/*!*****************************************************!*\
  !*** ./src/scoring-rules/scoring-rules.resolver.ts ***!
  \*****************************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const guards_1 = __webpack_require__(/*! ../common/guards */ "./src/common/guards/index.ts");
const decorators_1 = __webpack_require__(/*! ../common/decorators */ "./src/common/decorators/index.ts");
const get_scoring_rules_service_1 = __webpack_require__(/*! ./services/get-scoring-rules.service */ "./src/scoring-rules/services/get-scoring-rules.service.ts");
const update_scoring_rule_service_1 = __webpack_require__(/*! ./services/update-scoring-rule.service */ "./src/scoring-rules/services/update-scoring-rule.service.ts");
const toggle_scoring_rule_service_1 = __webpack_require__(/*! ./services/toggle-scoring-rule.service */ "./src/scoring-rules/services/toggle-scoring-rule.service.ts");
const update_validation_threshold_service_1 = __webpack_require__(/*! ./services/update-validation-threshold.service */ "./src/scoring-rules/services/update-validation-threshold.service.ts");
const reset_scoring_rules_service_1 = __webpack_require__(/*! ./services/reset-scoring-rules.service */ "./src/scoring-rules/services/reset-scoring-rules.service.ts");
const track_config_change_service_1 = __webpack_require__(/*! ./services/track-config-change.service */ "./src/scoring-rules/services/track-config-change.service.ts");
const scoring_rule_view_1 = __webpack_require__(/*! ./dto/views/scoring-rule.view */ "./src/scoring-rules/dto/views/scoring-rule.view.ts");
const validation_config_view_1 = __webpack_require__(/*! ./dto/views/validation-config.view */ "./src/scoring-rules/dto/views/validation-config.view.ts");
const config_history_connection_view_1 = __webpack_require__(/*! ./dto/views/config-history-connection.view */ "./src/scoring-rules/dto/views/config-history-connection.view.ts");
const update_scoring_rule_input_1 = __webpack_require__(/*! ./dto/inputs/update-scoring-rule.input */ "./src/scoring-rules/dto/inputs/update-scoring-rule.input.ts");
const attribute_type_enum_1 = __webpack_require__(/*! ./enums/attribute-type.enum */ "./src/scoring-rules/enums/attribute-type.enum.ts");
const types_1 = __webpack_require__(/*! ../common/types */ "./src/common/types/index.ts");
const user_view_1 = __webpack_require__(/*! ../users/dto/views/user.view */ "./src/users/dto/views/user.view.ts");
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

/***/ "./src/scoring-rules/services/get-scoring-rules.service.ts":
/*!*****************************************************************!*\
  !*** ./src/scoring-rules/services/get-scoring-rules.service.ts ***!
  \*****************************************************************/
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
exports.GetScoringRulesService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const gqlerr_1 = __webpack_require__(/*! @app/gqlerr */ "./libs/gqlerr/src/index.ts");
const scoring_rule_1 = __webpack_require__(/*! ../models/scoring-rule */ "./src/scoring-rules/models/scoring-rule.ts");
const validation_config_1 = __webpack_require__(/*! ../models/validation-config */ "./src/scoring-rules/models/validation-config.ts");
const parser_1 = __webpack_require__(/*! ../models/parser */ "./src/scoring-rules/models/parser.ts");
const attribute_type_enum_1 = __webpack_require__(/*! ../enums/attribute-type.enum */ "./src/scoring-rules/enums/attribute-type.enum.ts");
const report_type_enum_1 = __webpack_require__(/*! ../../uat-reports/enums/report-type.enum */ "./src/uat-reports/enums/report-type.enum.ts");
const initialize_scoring_rules_service_1 = __webpack_require__(/*! ./initialize-scoring-rules.service */ "./src/scoring-rules/services/initialize-scoring-rules.service.ts");
let GetScoringRulesService = class GetScoringRulesService {
    constructor(scoringRuleModel, validationConfigModel, initializeScoringRulesService) {
        this.scoringRuleModel = scoringRuleModel;
        this.validationConfigModel = validationConfigModel;
        this.initializeScoringRulesService = initializeScoringRulesService;
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
    async getScoringRulesByReportType(reportType) {
        try {
            const rules = await this.scoringRuleModel.find({ isActive: true }).exec();
            const bugReportAttributes = [
                attribute_type_enum_1.AttributeType.TEST_ENVIRONMENT,
                attribute_type_enum_1.AttributeType.STEPS_TO_REPRODUCE,
                attribute_type_enum_1.AttributeType.ACTUAL_RESULT,
                attribute_type_enum_1.AttributeType.SUPPORTING_EVIDENCE,
            ];
            const successReportAttributes = [
                attribute_type_enum_1.AttributeType.TEST_ENVIRONMENT,
                attribute_type_enum_1.AttributeType.ACTUAL_RESULT,
            ];
            const relevantAttributes = reportType === report_type_enum_1.ReportType.BUG_REPORT
                ? bugReportAttributes
                : successReportAttributes;
            const filteredRules = rules.filter((rule) => relevantAttributes.includes(rule.attribute));
            if (filteredRules.length === 0) {
                const defaultRules = reportType === report_type_enum_1.ReportType.BUG_REPORT
                    ? this.initializeScoringRulesService.getDefaultBugReportRules()
                    : this.initializeScoringRulesService.getDefaultSuccessReportRules();
                return defaultRules.map((rule) => ({
                    _id: '',
                    attribute: rule.attribute,
                    description: rule.description,
                    criteria: rule.criteria,
                    weight: rule.weight,
                    isActive: rule.isActive,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }));
            }
            return filteredRules.map(parser_1.parseScoringRuleToView);
        }
        catch (error) {
            throw new gqlerr_1.ThrowGQL(error, gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
    }
};
exports.GetScoringRulesService = GetScoringRulesService;
exports.GetScoringRulesService = GetScoringRulesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(scoring_rule_1.ScoringRule.name)),
    __param(1, (0, mongoose_1.InjectModel)(validation_config_1.ValidationConfig.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object, typeof (_c = typeof initialize_scoring_rules_service_1.InitializeScoringRulesService !== "undefined" && initialize_scoring_rules_service_1.InitializeScoringRulesService) === "function" ? _c : Object])
], GetScoringRulesService);


/***/ }),

/***/ "./src/scoring-rules/services/initialize-scoring-rules.service.ts":
/*!************************************************************************!*\
  !*** ./src/scoring-rules/services/initialize-scoring-rules.service.ts ***!
  \************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const bson_1 = __webpack_require__(/*! bson */ "bson");
const gqlerr_1 = __webpack_require__(/*! @app/gqlerr */ "./libs/gqlerr/src/index.ts");
const scoring_rule_1 = __webpack_require__(/*! ../models/scoring-rule */ "./src/scoring-rules/models/scoring-rule.ts");
const validation_config_1 = __webpack_require__(/*! ../models/validation-config */ "./src/scoring-rules/models/validation-config.ts");
const attribute_type_enum_1 = __webpack_require__(/*! ../enums/attribute-type.enum */ "./src/scoring-rules/enums/attribute-type.enum.ts");
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
                criteria: 'LLM-based semantic evaluation: Sequence validity, causal relationships, reproducibility, and completeness. Status: VALID (score >= 0.7), AMBIGUOUS (0.4-0.7), or INVALID (< 0.4)',
                weight: 25,
                isActive: true,
            },
            {
                attribute: attribute_type_enum_1.AttributeType.ACTUAL_RESULT,
                description: 'Actual Result Completeness',
                criteria: 'LLM-based semantic evaluation: Consistency with title, clarity of system behavior, non-contradictory, specificity, and completeness. Score 0.0-1.0 with quality flags',
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
    getDefaultBugReportRules() {
        return [
            {
                attribute: attribute_type_enum_1.AttributeType.TEST_ENVIRONMENT,
                description: 'Test Environment Completeness',
                criteria: 'IF OS, browser, dan perangkat diisi lengkap THEN 1 ELSE 0',
                weight: 25,
                isActive: true,
            },
            {
                attribute: attribute_type_enum_1.AttributeType.STEPS_TO_REPRODUCE,
                description: 'Input (Step to Reproduce)',
                criteria: 'IF langkah ≥ 3 dan berurutan logis THEN 1 ELSE 0.5 jika ambigu',
                weight: 35,
                isActive: true,
            },
            {
                attribute: attribute_type_enum_1.AttributeType.ACTUAL_RESULT,
                description: 'Description',
                criteria: 'IF deskripsi hasil aktual ≥ 30 karakter THEN 1 ELSE 0',
                weight: 25,
                isActive: true,
            },
            {
                attribute: attribute_type_enum_1.AttributeType.SUPPORTING_EVIDENCE,
                description: 'Screenshot/Evidence',
                criteria: 'IF evidence tidak kosong dan sesuai kebutuhan THEN 1 ELSE 0',
                weight: 15,
                isActive: true,
            },
        ];
    }
    getDefaultSuccessReportRules() {
        return [
            {
                attribute: attribute_type_enum_1.AttributeType.TEST_ENVIRONMENT,
                description: 'Environment',
                criteria: 'IF OS, browser, dan perangkat diisi lengkap THEN 1 ELSE 0',
                weight: 40,
                isActive: true,
            },
            {
                attribute: attribute_type_enum_1.AttributeType.ACTUAL_RESULT,
                description: 'Description',
                criteria: 'IF deskripsi hasil aktual ≥ 30 karakter THEN 1 ELSE 0',
                weight: 60,
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

/***/ "./src/scoring-rules/services/reset-scoring-rules.service.ts":
/*!*******************************************************************!*\
  !*** ./src/scoring-rules/services/reset-scoring-rules.service.ts ***!
  \*******************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const bson_1 = __webpack_require__(/*! bson */ "bson");
const gqlerr_1 = __webpack_require__(/*! @app/gqlerr */ "./libs/gqlerr/src/index.ts");
const scoring_rule_1 = __webpack_require__(/*! ../models/scoring-rule */ "./src/scoring-rules/models/scoring-rule.ts");
const parser_1 = __webpack_require__(/*! ../models/parser */ "./src/scoring-rules/models/parser.ts");
const track_config_change_service_1 = __webpack_require__(/*! ./track-config-change.service */ "./src/scoring-rules/services/track-config-change.service.ts");
const config_type_enum_1 = __webpack_require__(/*! ../enums/config-type.enum */ "./src/scoring-rules/enums/config-type.enum.ts");
const initialize_scoring_rules_service_1 = __webpack_require__(/*! ./initialize-scoring-rules.service */ "./src/scoring-rules/services/initialize-scoring-rules.service.ts");
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

/***/ "./src/scoring-rules/services/toggle-scoring-rule.service.ts":
/*!*******************************************************************!*\
  !*** ./src/scoring-rules/services/toggle-scoring-rule.service.ts ***!
  \*******************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const gqlerr_1 = __webpack_require__(/*! @app/gqlerr */ "./libs/gqlerr/src/index.ts");
const scoring_rule_1 = __webpack_require__(/*! ../models/scoring-rule */ "./src/scoring-rules/models/scoring-rule.ts");
const parser_1 = __webpack_require__(/*! ../models/parser */ "./src/scoring-rules/models/parser.ts");
const track_config_change_service_1 = __webpack_require__(/*! ./track-config-change.service */ "./src/scoring-rules/services/track-config-change.service.ts");
const config_type_enum_1 = __webpack_require__(/*! ../enums/config-type.enum */ "./src/scoring-rules/enums/config-type.enum.ts");
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

/***/ "./src/scoring-rules/services/track-config-change.service.ts":
/*!*******************************************************************!*\
  !*** ./src/scoring-rules/services/track-config-change.service.ts ***!
  \*******************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const bson_1 = __webpack_require__(/*! bson */ "bson");
const gqlerr_1 = __webpack_require__(/*! @app/gqlerr */ "./libs/gqlerr/src/index.ts");
const config_history_1 = __webpack_require__(/*! ../models/config-history */ "./src/scoring-rules/models/config-history.ts");
const parser_1 = __webpack_require__(/*! ../models/parser */ "./src/scoring-rules/models/parser.ts");
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

/***/ "./src/scoring-rules/services/update-scoring-rule.service.ts":
/*!*******************************************************************!*\
  !*** ./src/scoring-rules/services/update-scoring-rule.service.ts ***!
  \*******************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const gqlerr_1 = __webpack_require__(/*! @app/gqlerr */ "./libs/gqlerr/src/index.ts");
const scoring_rule_1 = __webpack_require__(/*! ../models/scoring-rule */ "./src/scoring-rules/models/scoring-rule.ts");
const parser_1 = __webpack_require__(/*! ../models/parser */ "./src/scoring-rules/models/parser.ts");
const track_config_change_service_1 = __webpack_require__(/*! ./track-config-change.service */ "./src/scoring-rules/services/track-config-change.service.ts");
const config_type_enum_1 = __webpack_require__(/*! ../enums/config-type.enum */ "./src/scoring-rules/enums/config-type.enum.ts");
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

/***/ "./src/scoring-rules/services/update-validation-threshold.service.ts":
/*!***************************************************************************!*\
  !*** ./src/scoring-rules/services/update-validation-threshold.service.ts ***!
  \***************************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const bson_1 = __webpack_require__(/*! bson */ "bson");
const gqlerr_1 = __webpack_require__(/*! @app/gqlerr */ "./libs/gqlerr/src/index.ts");
const validation_config_1 = __webpack_require__(/*! ../models/validation-config */ "./src/scoring-rules/models/validation-config.ts");
const parser_1 = __webpack_require__(/*! ../models/parser */ "./src/scoring-rules/models/parser.ts");
const track_config_change_service_1 = __webpack_require__(/*! ./track-config-change.service */ "./src/scoring-rules/services/track-config-change.service.ts");
const config_type_enum_1 = __webpack_require__(/*! ../enums/config-type.enum */ "./src/scoring-rules/enums/config-type.enum.ts");
let UpdateValidationThresholdService = class UpdateValidationThresholdService {
    constructor(validationConfigModel, trackConfigChangeService) {
        this.validationConfigModel = validationConfigModel;
        this.trackConfigChangeService = trackConfigChangeService;
    }
    async update(threshold, userId) {
        try {
            const config = await this.validationConfigModel
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

/***/ "./src/uat-reports/dto/inputs/batch-upload.input.ts":
/*!**********************************************************!*\
  !*** ./src/uat-reports/dto/inputs/batch-upload.input.ts ***!
  \**********************************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const batch_format_enum_1 = __webpack_require__(/*! ../../enums/batch-format.enum */ "./src/uat-reports/enums/batch-format.enum.ts");
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

/***/ "./src/uat-reports/dto/inputs/create-uat-report.input.ts":
/*!***************************************************************!*\
  !*** ./src/uat-reports/dto/inputs/create-uat-report.input.ts ***!
  \***************************************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const test_identity_input_1 = __webpack_require__(/*! ./test-identity.input */ "./src/uat-reports/dto/inputs/test-identity.input.ts");
const test_environment_input_1 = __webpack_require__(/*! ./test-environment.input */ "./src/uat-reports/dto/inputs/test-environment.input.ts");
const evidence_input_1 = __webpack_require__(/*! ./evidence.input */ "./src/uat-reports/dto/inputs/evidence.input.ts");
const severity_level_enum_1 = __webpack_require__(/*! ../../enums/severity-level.enum */ "./src/uat-reports/enums/severity-level.enum.ts");
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

/***/ "./src/uat-reports/dto/inputs/date-range.input.ts":
/*!********************************************************!*\
  !*** ./src/uat-reports/dto/inputs/date-range.input.ts ***!
  \********************************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
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

/***/ "./src/uat-reports/dto/inputs/evidence.input.ts":
/*!******************************************************!*\
  !*** ./src/uat-reports/dto/inputs/evidence.input.ts ***!
  \******************************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const evidence_type_enum_1 = __webpack_require__(/*! ../../enums/evidence-type.enum */ "./src/uat-reports/enums/evidence-type.enum.ts");
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

/***/ "./src/uat-reports/dto/inputs/score-range.input.ts":
/*!*********************************************************!*\
  !*** ./src/uat-reports/dto/inputs/score-range.input.ts ***!
  \*********************************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "./src/uat-reports/dto/inputs/test-environment.input.ts":
/*!**************************************************************!*\
  !*** ./src/uat-reports/dto/inputs/test-environment.input.ts ***!
  \**************************************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "./src/uat-reports/dto/inputs/test-identity.input.ts":
/*!***********************************************************!*\
  !*** ./src/uat-reports/dto/inputs/test-identity.input.ts ***!
  \***********************************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "./src/uat-reports/dto/inputs/uat-report-filter.input.ts":
/*!***************************************************************!*\
  !*** ./src/uat-reports/dto/inputs/uat-report-filter.input.ts ***!
  \***************************************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const report_status_enum_1 = __webpack_require__(/*! ../../enums/report-status.enum */ "./src/uat-reports/enums/report-status.enum.ts");
const severity_level_enum_1 = __webpack_require__(/*! ../../enums/severity-level.enum */ "./src/uat-reports/enums/severity-level.enum.ts");
const date_range_input_1 = __webpack_require__(/*! ./date-range.input */ "./src/uat-reports/dto/inputs/date-range.input.ts");
const score_range_input_1 = __webpack_require__(/*! ./score-range.input */ "./src/uat-reports/dto/inputs/score-range.input.ts");
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

/***/ "./src/uat-reports/dto/inputs/uat-report-sort.input.ts":
/*!*************************************************************!*\
  !*** ./src/uat-reports/dto/inputs/uat-report-sort.input.ts ***!
  \*************************************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const uat_report_sort_field_enum_1 = __webpack_require__(/*! ../../enums/uat-report-sort-field.enum */ "./src/uat-reports/enums/uat-report-sort-field.enum.ts");
const types_1 = __webpack_require__(/*! ../../../common/types */ "./src/common/types/index.ts");
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

/***/ "./src/uat-reports/dto/inputs/update-uat-report.input.ts":
/*!***************************************************************!*\
  !*** ./src/uat-reports/dto/inputs/update-uat-report.input.ts ***!
  \***************************************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const class_transformer_1 = __webpack_require__(/*! class-transformer */ "class-transformer");
const test_identity_input_1 = __webpack_require__(/*! ./test-identity.input */ "./src/uat-reports/dto/inputs/test-identity.input.ts");
const test_environment_input_1 = __webpack_require__(/*! ./test-environment.input */ "./src/uat-reports/dto/inputs/test-environment.input.ts");
const evidence_input_1 = __webpack_require__(/*! ./evidence.input */ "./src/uat-reports/dto/inputs/evidence.input.ts");
const severity_level_enum_1 = __webpack_require__(/*! ../../enums/severity-level.enum */ "./src/uat-reports/enums/severity-level.enum.ts");
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

/***/ "./src/uat-reports/dto/views/batch-upload-result.view.ts":
/*!***************************************************************!*\
  !*** ./src/uat-reports/dto/views/batch-upload-result.view.ts ***!
  \***************************************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const uat_report_view_1 = __webpack_require__(/*! ./uat-report.view */ "./src/uat-reports/dto/views/uat-report.view.ts");
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

/***/ "./src/uat-reports/dto/views/dashboard-stats.view.ts":
/*!***********************************************************!*\
  !*** ./src/uat-reports/dto/views/dashboard-stats.view.ts ***!
  \***********************************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
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

/***/ "./src/uat-reports/dto/views/uat-report-connection.view.ts":
/*!*****************************************************************!*\
  !*** ./src/uat-reports/dto/views/uat-report-connection.view.ts ***!
  \*****************************************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const types_1 = __webpack_require__(/*! ../../../common/types */ "./src/common/types/index.ts");
const uat_report_view_1 = __webpack_require__(/*! ./uat-report.view */ "./src/uat-reports/dto/views/uat-report.view.ts");
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

/***/ "./src/uat-reports/dto/views/uat-report.view.ts":
/*!******************************************************!*\
  !*** ./src/uat-reports/dto/views/uat-report.view.ts ***!
  \******************************************************/
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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UATReportView = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const test_identity_1 = __webpack_require__(/*! ../../models/test-identity */ "./src/uat-reports/models/test-identity.ts");
const test_environment_1 = __webpack_require__(/*! ../../models/test-environment */ "./src/uat-reports/models/test-environment.ts");
const evidence_1 = __webpack_require__(/*! ../../models/evidence */ "./src/uat-reports/models/evidence.ts");
const severity_level_enum_1 = __webpack_require__(/*! ../../enums/severity-level.enum */ "./src/uat-reports/enums/severity-level.enum.ts");
const report_status_enum_1 = __webpack_require__(/*! ../../enums/report-status.enum */ "./src/uat-reports/enums/report-status.enum.ts");
const report_type_enum_1 = __webpack_require__(/*! ../../enums/report-type.enum */ "./src/uat-reports/enums/report-type.enum.ts");
const user_view_1 = __webpack_require__(/*! ../../../users/dto/views/user.view */ "./src/users/dto/views/user.view.ts");
let UATReportView = class UATReportView {
};
exports.UATReportView = UATReportView;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UATReportView.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)(() => report_type_enum_1.ReportType),
    __metadata("design:type", typeof (_a = typeof report_type_enum_1.ReportType !== "undefined" && report_type_enum_1.ReportType) === "function" ? _a : Object)
], UATReportView.prototype, "reportType", void 0);
__decorate([
    (0, graphql_1.Field)(() => test_identity_1.TestIdentity),
    __metadata("design:type", typeof (_b = typeof test_identity_1.TestIdentity !== "undefined" && test_identity_1.TestIdentity) === "function" ? _b : Object)
], UATReportView.prototype, "testIdentity", void 0);
__decorate([
    (0, graphql_1.Field)(() => test_environment_1.TestEnvironment),
    __metadata("design:type", typeof (_c = typeof test_environment_1.TestEnvironment !== "undefined" && test_environment_1.TestEnvironment) === "function" ? _c : Object)
], UATReportView.prototype, "testEnvironment", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], UATReportView.prototype, "stepsToReproduce", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UATReportView.prototype, "actualResult", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UATReportView.prototype, "expectedResult", void 0);
__decorate([
    (0, graphql_1.Field)(() => [evidence_1.Evidence], { nullable: true }),
    __metadata("design:type", Array)
], UATReportView.prototype, "supportingEvidence", void 0);
__decorate([
    (0, graphql_1.Field)(() => severity_level_enum_1.SeverityLevel),
    __metadata("design:type", typeof (_d = typeof severity_level_enum_1.SeverityLevel !== "undefined" && severity_level_enum_1.SeverityLevel) === "function" ? _d : Object)
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
    __metadata("design:type", typeof (_e = typeof report_status_enum_1.ReportStatus !== "undefined" && report_status_enum_1.ReportStatus) === "function" ? _e : Object)
], UATReportView.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_view_1.UserView),
    __metadata("design:type", typeof (_f = typeof user_view_1.UserView !== "undefined" && user_view_1.UserView) === "function" ? _f : Object)
], UATReportView.prototype, "createdBy", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", typeof (_g = typeof Date !== "undefined" && Date) === "function" ? _g : Object)
], UATReportView.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", typeof (_h = typeof Date !== "undefined" && Date) === "function" ? _h : Object)
], UATReportView.prototype, "updatedAt", void 0);
exports.UATReportView = UATReportView = __decorate([
    (0, graphql_1.ObjectType)()
], UATReportView);


/***/ }),

/***/ "./src/uat-reports/enums/batch-format.enum.ts":
/*!****************************************************!*\
  !*** ./src/uat-reports/enums/batch-format.enum.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BatchFormat = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
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

/***/ "./src/uat-reports/enums/evidence-type.enum.ts":
/*!*****************************************************!*\
  !*** ./src/uat-reports/enums/evidence-type.enum.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EvidenceType = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
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

/***/ "./src/uat-reports/enums/report-status.enum.ts":
/*!*****************************************************!*\
  !*** ./src/uat-reports/enums/report-status.enum.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReportStatus = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
var ReportStatus;
(function (ReportStatus) {
    ReportStatus["PENDING_EVALUATION"] = "PENDING_EVALUATION";
    ReportStatus["EVALUATING"] = "EVALUATING";
    ReportStatus["VALID"] = "VALID";
    ReportStatus["INVALID"] = "INVALID";
    ReportStatus["FAILED"] = "FAILED";
    ReportStatus["NEEDS_MANUAL_REVIEW"] = "NEEDS_MANUAL_REVIEW";
})(ReportStatus || (exports.ReportStatus = ReportStatus = {}));
(0, graphql_1.registerEnumType)(ReportStatus, {
    name: 'ReportStatus',
    description: 'Status of the UAT report',
});


/***/ }),

/***/ "./src/uat-reports/enums/report-type.enum.ts":
/*!***************************************************!*\
  !*** ./src/uat-reports/enums/report-type.enum.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReportType = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
var ReportType;
(function (ReportType) {
    ReportType["BUG_REPORT"] = "BUG_REPORT";
    ReportType["SUCCESS_REPORT"] = "SUCCESS_REPORT";
})(ReportType || (exports.ReportType = ReportType = {}));
(0, graphql_1.registerEnumType)(ReportType, {
    name: 'ReportType',
    description: 'Type of UAT report - Bug Report or Success Report',
});


/***/ }),

/***/ "./src/uat-reports/enums/severity-level.enum.ts":
/*!******************************************************!*\
  !*** ./src/uat-reports/enums/severity-level.enum.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SeverityLevel = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
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

/***/ "./src/uat-reports/enums/uat-report-sort-field.enum.ts":
/*!*************************************************************!*\
  !*** ./src/uat-reports/enums/uat-report-sort-field.enum.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UATReportSortField = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
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

/***/ "./src/uat-reports/models/evidence.ts":
/*!********************************************!*\
  !*** ./src/uat-reports/models/evidence.ts ***!
  \********************************************/
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
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const evidence_type_enum_1 = __webpack_require__(/*! ../enums/evidence-type.enum */ "./src/uat-reports/enums/evidence-type.enum.ts");
let Evidence = class Evidence {
};
exports.Evidence = Evidence;
__decorate([
    (0, graphql_1.Field)(() => evidence_type_enum_1.EvidenceType),
    (0, mongoose_1.Prop)({ required: true, type: String, enum: evidence_type_enum_1.EvidenceType }),
    __metadata("design:type", typeof (_a = typeof evidence_type_enum_1.EvidenceType !== "undefined" && evidence_type_enum_1.EvidenceType) === "function" ? _a : Object)
], Evidence.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, mongoose_1.Prop)({ required: false }),
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

/***/ "./src/uat-reports/models/parser.ts":
/*!******************************************!*\
  !*** ./src/uat-reports/models/parser.ts ***!
  \******************************************/
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

/***/ "./src/uat-reports/models/test-environment.ts":
/*!****************************************************!*\
  !*** ./src/uat-reports/models/test-environment.ts ***!
  \****************************************************/
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
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
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

/***/ "./src/uat-reports/models/test-identity.ts":
/*!*************************************************!*\
  !*** ./src/uat-reports/models/test-identity.ts ***!
  \*************************************************/
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
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
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

/***/ "./src/uat-reports/models/uat-report.ts":
/*!**********************************************!*\
  !*** ./src/uat-reports/models/uat-report.ts ***!
  \**********************************************/
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
exports.UATReportSchema = exports.UATReport = void 0;
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const test_identity_1 = __webpack_require__(/*! ./test-identity */ "./src/uat-reports/models/test-identity.ts");
const test_environment_1 = __webpack_require__(/*! ./test-environment */ "./src/uat-reports/models/test-environment.ts");
const evidence_1 = __webpack_require__(/*! ./evidence */ "./src/uat-reports/models/evidence.ts");
const severity_level_enum_1 = __webpack_require__(/*! ../enums/severity-level.enum */ "./src/uat-reports/enums/severity-level.enum.ts");
const report_status_enum_1 = __webpack_require__(/*! ../enums/report-status.enum */ "./src/uat-reports/enums/report-status.enum.ts");
const report_type_enum_1 = __webpack_require__(/*! ../enums/report-type.enum */ "./src/uat-reports/enums/report-type.enum.ts");
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
    (0, graphql_1.Field)(() => report_type_enum_1.ReportType),
    (0, mongoose_1.Prop)({ required: true, type: String, enum: report_type_enum_1.ReportType }),
    __metadata("design:type", typeof (_b = typeof report_type_enum_1.ReportType !== "undefined" && report_type_enum_1.ReportType) === "function" ? _b : Object)
], UATReport.prototype, "reportType", void 0);
__decorate([
    (0, graphql_1.Field)(() => test_environment_1.TestEnvironment),
    (0, mongoose_1.Prop)({ required: true, type: test_environment_1.TestEnvironmentSchema }),
    __metadata("design:type", typeof (_c = typeof test_environment_1.TestEnvironment !== "undefined" && test_environment_1.TestEnvironment) === "function" ? _c : Object)
], UATReport.prototype, "testEnvironment", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    (0, mongoose_1.Prop)({ required: false, type: [String] }),
    __metadata("design:type", Array)
], UATReport.prototype, "stepsToReproduce", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], UATReport.prototype, "actualResult", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], UATReport.prototype, "expectedResult", void 0);
__decorate([
    (0, graphql_1.Field)(() => [evidence_1.Evidence], { nullable: true }),
    (0, mongoose_1.Prop)({ required: false, type: [evidence_1.EvidenceSchema], default: [] }),
    __metadata("design:type", Array)
], UATReport.prototype, "supportingEvidence", void 0);
__decorate([
    (0, graphql_1.Field)(() => severity_level_enum_1.SeverityLevel),
    (0, mongoose_1.Prop)({ required: true, type: String, enum: severity_level_enum_1.SeverityLevel }),
    __metadata("design:type", typeof (_d = typeof severity_level_enum_1.SeverityLevel !== "undefined" && severity_level_enum_1.SeverityLevel) === "function" ? _d : Object)
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
    __metadata("design:type", typeof (_e = typeof report_status_enum_1.ReportStatus !== "undefined" && report_status_enum_1.ReportStatus) === "function" ? _e : Object)
], UATReport.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.Schema.Types.String, ref: 'User' }),
    __metadata("design:type", String)
], UATReport.prototype, "createdBy", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], UATReport.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", typeof (_g = typeof Date !== "undefined" && Date) === "function" ? _g : Object)
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
exports.UATReportSchema.index({ reportType: 1 });
exports.UATReportSchema.index({ reportType: 1, status: 1 });
exports.UATReportSchema.index({
    'testIdentity.testId': 1,
    'testIdentity.version': 1,
    domain: 1,
    actualResult: 1,
    createdBy: 1,
});


/***/ }),

/***/ "./src/uat-reports/services/create-uat-report.service.ts":
/*!***************************************************************!*\
  !*** ./src/uat-reports/services/create-uat-report.service.ts ***!
  \***************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const bson_1 = __webpack_require__(/*! bson */ "bson");
const gqlerr_1 = __webpack_require__(/*! @app/gqlerr */ "./libs/gqlerr/src/index.ts");
const uat_report_1 = __webpack_require__(/*! ../models/uat-report */ "./src/uat-reports/models/uat-report.ts");
const parser_1 = __webpack_require__(/*! ../models/parser */ "./src/uat-reports/models/parser.ts");
const report_status_enum_1 = __webpack_require__(/*! ../enums/report-status.enum */ "./src/uat-reports/enums/report-status.enum.ts");
let CreateUATReportService = class CreateUATReportService {
    constructor(uatReportModel) {
        this.uatReportModel = uatReportModel;
    }
    async create(input, userId) {
        try {
            const existing = await this.uatReportModel.findOne({
                'testIdentity.testId': input.testIdentity?.testId,
                'testIdentity.version': input.testIdentity?.version,
                domain: input.domain || null,
                actualResult: input.actualResult,
                createdBy: userId,
            });
            if (existing) {
                throw new gqlerr_1.ThrowGQL('UAT Report redundan: data dengan Test ID, versi, domain, dan actual result yang sama sudah ada.', gqlerr_1.GQLThrowType.UNPROCESSABLE);
            }
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

/***/ "./src/uat-reports/services/delete-bulk-uat-reports.service.ts":
/*!*********************************************************************!*\
  !*** ./src/uat-reports/services/delete-bulk-uat-reports.service.ts ***!
  \*********************************************************************/
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
exports.DeleteBulkUATReportsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const gqlerr_1 = __webpack_require__(/*! @app/gqlerr */ "./libs/gqlerr/src/index.ts");
const uat_report_1 = __webpack_require__(/*! ../models/uat-report */ "./src/uat-reports/models/uat-report.ts");
let DeleteBulkUATReportsService = class DeleteBulkUATReportsService {
    constructor(uatReportModel) {
        this.uatReportModel = uatReportModel;
    }
    async deleteByIds(ids) {
        if (!ids || ids.length === 0) {
            throw new gqlerr_1.ThrowGQL('No UAT Report IDs provided', gqlerr_1.GQLThrowType.UNPROCESSABLE);
        }
        try {
            const result = await this.uatReportModel.deleteMany({
                _id: { $in: ids },
            });
            if (result.deletedCount === 0) {
                throw new gqlerr_1.ThrowGQL('No UAT Reports found for the provided IDs', gqlerr_1.GQLThrowType.NOT_FOUND);
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
    async deleteAll() {
        try {
            await this.uatReportModel.deleteMany({});
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
exports.DeleteBulkUATReportsService = DeleteBulkUATReportsService;
exports.DeleteBulkUATReportsService = DeleteBulkUATReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(uat_report_1.UATReport.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], DeleteBulkUATReportsService);


/***/ }),

/***/ "./src/uat-reports/services/delete-uat-report.service.ts":
/*!***************************************************************!*\
  !*** ./src/uat-reports/services/delete-uat-report.service.ts ***!
  \***************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const gqlerr_1 = __webpack_require__(/*! @app/gqlerr */ "./libs/gqlerr/src/index.ts");
const uat_report_1 = __webpack_require__(/*! ../models/uat-report */ "./src/uat-reports/models/uat-report.ts");
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

/***/ "./src/uat-reports/services/get-dashboard-stats.service.ts":
/*!*****************************************************************!*\
  !*** ./src/uat-reports/services/get-dashboard-stats.service.ts ***!
  \*****************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const gqlerr_1 = __webpack_require__(/*! @app/gqlerr */ "./libs/gqlerr/src/index.ts");
const uat_report_1 = __webpack_require__(/*! ../models/uat-report */ "./src/uat-reports/models/uat-report.ts");
const report_status_enum_1 = __webpack_require__(/*! ../enums/report-status.enum */ "./src/uat-reports/enums/report-status.enum.ts");
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
                invalidReports: (counts[report_status_enum_1.ReportStatus.INVALID] || 0) +
                    (counts[report_status_enum_1.ReportStatus.FAILED] || 0),
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

/***/ "./src/uat-reports/services/get-uat-report.service.ts":
/*!************************************************************!*\
  !*** ./src/uat-reports/services/get-uat-report.service.ts ***!
  \************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const gqlerr_1 = __webpack_require__(/*! @app/gqlerr */ "./libs/gqlerr/src/index.ts");
const uat_report_1 = __webpack_require__(/*! ../models/uat-report */ "./src/uat-reports/models/uat-report.ts");
const parser_1 = __webpack_require__(/*! ../models/parser */ "./src/uat-reports/models/parser.ts");
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

/***/ "./src/uat-reports/services/list-uat-reports.service.ts":
/*!**************************************************************!*\
  !*** ./src/uat-reports/services/list-uat-reports.service.ts ***!
  \**************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const gqlerr_1 = __webpack_require__(/*! @app/gqlerr */ "./libs/gqlerr/src/index.ts");
const uat_report_1 = __webpack_require__(/*! ../models/uat-report */ "./src/uat-reports/models/uat-report.ts");
const parser_1 = __webpack_require__(/*! ../models/parser */ "./src/uat-reports/models/parser.ts");
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

/***/ "./src/uat-reports/services/update-uat-report.service.ts":
/*!***************************************************************!*\
  !*** ./src/uat-reports/services/update-uat-report.service.ts ***!
  \***************************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const gqlerr_1 = __webpack_require__(/*! @app/gqlerr */ "./libs/gqlerr/src/index.ts");
const uat_report_1 = __webpack_require__(/*! ../models/uat-report */ "./src/uat-reports/models/uat-report.ts");
const parser_1 = __webpack_require__(/*! ../models/parser */ "./src/uat-reports/models/parser.ts");
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

/***/ "./src/uat-reports/services/upload-batch-reports.service.ts":
/*!******************************************************************!*\
  !*** ./src/uat-reports/services/upload-batch-reports.service.ts ***!
  \******************************************************************/
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
exports.UploadBatchReportsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const bson_1 = __webpack_require__(/*! bson */ "bson");
const gqlerr_1 = __webpack_require__(/*! @app/gqlerr */ "./libs/gqlerr/src/index.ts");
const uat_report_1 = __webpack_require__(/*! ../models/uat-report */ "./src/uat-reports/models/uat-report.ts");
const parser_1 = __webpack_require__(/*! ../models/parser */ "./src/uat-reports/models/parser.ts");
const report_status_enum_1 = __webpack_require__(/*! ../enums/report-status.enum */ "./src/uat-reports/enums/report-status.enum.ts");
const report_type_enum_1 = __webpack_require__(/*! ../enums/report-type.enum */ "./src/uat-reports/enums/report-type.enum.ts");
const evidence_type_enum_1 = __webpack_require__(/*! ../enums/evidence-type.enum */ "./src/uat-reports/enums/evidence-type.enum.ts");
const severity_level_enum_1 = __webpack_require__(/*! ../enums/severity-level.enum */ "./src/uat-reports/enums/severity-level.enum.ts");
const evaluate_report_service_1 = __webpack_require__(/*! ../../evaluations/services/evaluate-report.service */ "./src/evaluations/services/evaluate-report.service.ts");
let UploadBatchReportsService = class UploadBatchReportsService {
    constructor(uatReportModel, evaluateReportService) {
        this.uatReportModel = uatReportModel;
        this.evaluateReportService = evaluateReportService;
    }
    async uploadBatch(input, userId) {
        try {
            let decodedData;
            const isPlainText = input.data.trim().startsWith('[') ||
                input.data.trim().startsWith('{') ||
                input.data.includes('\n') ||
                input.data.includes(',');
            if (isPlainText) {
                decodedData = input.data;
            }
            else {
                try {
                    const decoded = Buffer.from(input.data, 'base64').toString('utf-8');
                    if (decoded && decoded.length > 0 && !decoded.includes('\0')) {
                        decodedData = decoded;
                    }
                    else {
                        decodedData = input.data;
                    }
                }
                catch {
                    decodedData = input.data;
                }
            }
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
            const seenKeys = new Set();
            for (let i = 0; i < parsedData.length; i++) {
                try {
                    const reportData = parsedData[i];
                    const testIdentity = {
                        testId: reportData['test id'] ||
                            reportData.testId ||
                            reportData.testIdentity?.testId ||
                            '',
                        title: reportData.title || reportData.testIdentity?.title || '',
                        version: reportData.version || reportData.testIdentity?.version || '1.0',
                    };
                    const environment = this.parseEnvironment(reportData.environment || reportData.testEnvironment || reportData);
                    const stepsToReproduce = this.parseStepsToReproduce(reportData['step to reproduce'] ||
                        reportData.stepToReproduce ||
                        reportData.stepsToReproduce);
                    const evidence = this.parseEvidence(reportData.evidence || reportData.supportingEvidence);
                    const reportType = this.classifyReportType(stepsToReproduce, evidence);
                    const reportObj = {
                        _id: new bson_1.ObjectId().toString(),
                        reportType,
                        testIdentity,
                        testEnvironment: environment,
                        actualResult: reportData.description || reportData.actualResult || '',
                        expectedResult: reportData.expectedResult || null,
                        severityLevel: reportData.severityLevel || severity_level_enum_1.SeverityLevel.MEDIUM,
                        domain: reportData.domain || null,
                        additionalInfo: reportData.additionalInfo || null,
                        status: report_status_enum_1.ReportStatus.PENDING_EVALUATION,
                        createdBy: userId,
                    };
                    const dedupeKey = [
                        userId,
                        testIdentity.testId || '',
                        testIdentity.version || '',
                        reportObj.domain || '',
                        reportObj.actualResult || '',
                    ].join('||');
                    if (seenKeys.has(dedupeKey)) {
                        results.failed++;
                        results.errors.push({
                            row: i + 1,
                            message: 'Data redundan di dalam file upload: kombinasi Test ID, versi, domain, dan actual result sudah muncul sebelumnya.',
                            data: JSON.stringify(parsedData[i]),
                        });
                        continue;
                    }
                    const existing = await this.uatReportModel.findOne({
                        'testIdentity.testId': testIdentity.testId,
                        'testIdentity.version': testIdentity.version,
                        domain: reportObj.domain || null,
                        actualResult: reportObj.actualResult,
                        createdBy: userId,
                    });
                    if (existing) {
                        results.failed++;
                        results.errors.push({
                            row: i + 1,
                            message: 'Data redundan: laporan dengan Test ID, versi, domain, dan actual result yang sama sudah tersimpan sebelumnya.',
                            data: JSON.stringify(parsedData[i]),
                        });
                        continue;
                    }
                    seenKeys.add(dedupeKey);
                    if (reportType === report_type_enum_1.ReportType.BUG_REPORT) {
                        reportObj.stepsToReproduce = stepsToReproduce;
                        reportObj.supportingEvidence = evidence;
                    }
                    else {
                        reportObj.stepsToReproduce = null;
                        reportObj.supportingEvidence = null;
                    }
                    const report = await this.uatReportModel.create(reportObj);
                    try {
                        await this.evaluateReportService.evaluate(report._id, userId);
                    }
                    catch (evalError) {
                        console.error(`Failed to evaluate report ${report._id}:`, evalError);
                    }
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
    classifyReportType(stepsToReproduce, evidence) {
        const hasSteps = stepsToReproduce &&
            stepsToReproduce.length > 0 &&
            stepsToReproduce.some((s) => s && s.trim().length > 0);
        const hasEvidence = evidence && evidence.length > 0;
        if (hasSteps && hasEvidence) {
            return report_type_enum_1.ReportType.BUG_REPORT;
        }
        return report_type_enum_1.ReportType.SUCCESS_REPORT;
    }
    parseEnvironment(env) {
        if (typeof env === 'object' && env !== null && !Array.isArray(env)) {
            return {
                os: env.OS || env.os || env['Operating System'] || '',
                device: env.Device || env.device || '',
                browser: env.Browser || env.browser || '',
                additionalInfo: env.additionalInfo || null,
            };
        }
        if (typeof env === 'string' && env.trim().length > 0) {
            const parts = env.split(',').map((s) => s.trim());
            return {
                os: parts[0] || '',
                device: parts[1] || '',
                browser: parts[2] || '',
            };
        }
        return {
            os: '',
            device: '',
            browser: '',
        };
    }
    parseStepsToReproduce(steps) {
        if (!steps)
            return null;
        if (Array.isArray(steps)) {
            return steps.filter((s) => s && s.trim().length > 0);
        }
        if (typeof steps === 'string') {
            const delimiters = ['|', ';', '\n', '\\n'];
            let result = [steps];
            for (const delimiter of delimiters) {
                const split = result.flatMap((s) => s.split(delimiter));
                if (split.length > result.length) {
                    result = split;
                }
            }
            return result.map((s) => s.trim()).filter((s) => s.length > 0);
        }
        return null;
    }
    parseEvidence(evidence) {
        if (!evidence)
            return null;
        if (Array.isArray(evidence)) {
            return evidence.map((e) => {
                if (typeof e === 'string') {
                    return {
                        type: evidence_type_enum_1.EvidenceType.SCREENSHOT,
                        url: e,
                        description: null,
                    };
                }
                const url = typeof e.url === 'string'
                    ? e.url
                    : typeof e === 'string'
                        ? e
                        : '';
                return {
                    type: e.type || evidence_type_enum_1.EvidenceType.SCREENSHOT,
                    url,
                    description: e.description || null,
                };
            });
        }
        if (typeof evidence === 'string') {
            const delimiters = [';', ',', '|', '\n', '\\n'];
            let result = [evidence];
            for (const delimiter of delimiters) {
                const split = result.flatMap((s) => s.split(delimiter));
                if (split.length > result.length) {
                    result = split;
                }
            }
            return result
                .map((url) => url.trim())
                .filter((url) => url.length > 0)
                .map((url) => ({
                type: evidence_type_enum_1.EvidenceType.SCREENSHOT,
                url,
                description: null,
            }));
        }
        return null;
    }
    parseCSV(csvData) {
        const lines = csvData.trim().split('\n');
        if (lines.length < 2)
            return [];
        const headers = this.parseCSVLine(lines[0]);
        const result = [];
        for (let i = 1; i < lines.length; i++) {
            const values = this.parseCSVLine(lines[i]);
            const obj = {};
            headers.forEach((header, index) => {
                const value = values[index]?.trim() || '';
                obj[header] = value;
            });
            result.push(obj);
        }
        return result;
    }
    parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                inQuotes = !inQuotes;
            }
            else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            }
            else {
                current += char;
            }
        }
        result.push(current.trim());
        return result;
    }
};
exports.UploadBatchReportsService = UploadBatchReportsService;
exports.UploadBatchReportsService = UploadBatchReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(uat_report_1.UATReport.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => evaluate_report_service_1.EvaluateReportService))),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof evaluate_report_service_1.EvaluateReportService !== "undefined" && evaluate_report_service_1.EvaluateReportService) === "function" ? _b : Object])
], UploadBatchReportsService);


/***/ }),

/***/ "./src/uat-reports/uat-reports.module.ts":
/*!***********************************************!*\
  !*** ./src/uat-reports/uat-reports.module.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UATReportsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const uat_report_1 = __webpack_require__(/*! ./models/uat-report */ "./src/uat-reports/models/uat-report.ts");
const user_1 = __webpack_require__(/*! ../users/models/user */ "./src/users/models/user.ts");
const create_uat_report_service_1 = __webpack_require__(/*! ./services/create-uat-report.service */ "./src/uat-reports/services/create-uat-report.service.ts");
const get_uat_report_service_1 = __webpack_require__(/*! ./services/get-uat-report.service */ "./src/uat-reports/services/get-uat-report.service.ts");
const list_uat_reports_service_1 = __webpack_require__(/*! ./services/list-uat-reports.service */ "./src/uat-reports/services/list-uat-reports.service.ts");
const update_uat_report_service_1 = __webpack_require__(/*! ./services/update-uat-report.service */ "./src/uat-reports/services/update-uat-report.service.ts");
const delete_uat_report_service_1 = __webpack_require__(/*! ./services/delete-uat-report.service */ "./src/uat-reports/services/delete-uat-report.service.ts");
const upload_batch_reports_service_1 = __webpack_require__(/*! ./services/upload-batch-reports.service */ "./src/uat-reports/services/upload-batch-reports.service.ts");
const get_dashboard_stats_service_1 = __webpack_require__(/*! ./services/get-dashboard-stats.service */ "./src/uat-reports/services/get-dashboard-stats.service.ts");
const delete_bulk_uat_reports_service_1 = __webpack_require__(/*! ./services/delete-bulk-uat-reports.service */ "./src/uat-reports/services/delete-bulk-uat-reports.service.ts");
const uat_reports_resolver_1 = __webpack_require__(/*! ./uat-reports.resolver */ "./src/uat-reports/uat-reports.resolver.ts");
const evaluations_module_1 = __webpack_require__(/*! ../evaluations/evaluations.module */ "./src/evaluations/evaluations.module.ts");
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
            (0, common_1.forwardRef)(() => evaluations_module_1.EvaluationsModule),
        ],
        providers: [
            create_uat_report_service_1.CreateUATReportService,
            get_uat_report_service_1.GetUATReportService,
            list_uat_reports_service_1.ListUATReportsService,
            update_uat_report_service_1.UpdateUATReportService,
            delete_uat_report_service_1.DeleteUATReportService,
            delete_bulk_uat_reports_service_1.DeleteBulkUATReportsService,
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
            delete_bulk_uat_reports_service_1.DeleteBulkUATReportsService,
        ],
    })
], UATReportsModule);


/***/ }),

/***/ "./src/uat-reports/uat-reports.resolver.ts":
/*!*************************************************!*\
  !*** ./src/uat-reports/uat-reports.resolver.ts ***!
  \*************************************************/
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UATReportsResolver = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const guards_1 = __webpack_require__(/*! ../common/guards */ "./src/common/guards/index.ts");
const decorators_1 = __webpack_require__(/*! ../common/decorators */ "./src/common/decorators/index.ts");
const create_uat_report_service_1 = __webpack_require__(/*! ./services/create-uat-report.service */ "./src/uat-reports/services/create-uat-report.service.ts");
const get_uat_report_service_1 = __webpack_require__(/*! ./services/get-uat-report.service */ "./src/uat-reports/services/get-uat-report.service.ts");
const list_uat_reports_service_1 = __webpack_require__(/*! ./services/list-uat-reports.service */ "./src/uat-reports/services/list-uat-reports.service.ts");
const update_uat_report_service_1 = __webpack_require__(/*! ./services/update-uat-report.service */ "./src/uat-reports/services/update-uat-report.service.ts");
const delete_uat_report_service_1 = __webpack_require__(/*! ./services/delete-uat-report.service */ "./src/uat-reports/services/delete-uat-report.service.ts");
const delete_bulk_uat_reports_service_1 = __webpack_require__(/*! ./services/delete-bulk-uat-reports.service */ "./src/uat-reports/services/delete-bulk-uat-reports.service.ts");
const upload_batch_reports_service_1 = __webpack_require__(/*! ./services/upload-batch-reports.service */ "./src/uat-reports/services/upload-batch-reports.service.ts");
const get_dashboard_stats_service_1 = __webpack_require__(/*! ./services/get-dashboard-stats.service */ "./src/uat-reports/services/get-dashboard-stats.service.ts");
const uat_report_view_1 = __webpack_require__(/*! ./dto/views/uat-report.view */ "./src/uat-reports/dto/views/uat-report.view.ts");
const uat_report_connection_view_1 = __webpack_require__(/*! ./dto/views/uat-report-connection.view */ "./src/uat-reports/dto/views/uat-report-connection.view.ts");
const batch_upload_result_view_1 = __webpack_require__(/*! ./dto/views/batch-upload-result.view */ "./src/uat-reports/dto/views/batch-upload-result.view.ts");
const dashboard_stats_view_1 = __webpack_require__(/*! ./dto/views/dashboard-stats.view */ "./src/uat-reports/dto/views/dashboard-stats.view.ts");
const create_uat_report_input_1 = __webpack_require__(/*! ./dto/inputs/create-uat-report.input */ "./src/uat-reports/dto/inputs/create-uat-report.input.ts");
const update_uat_report_input_1 = __webpack_require__(/*! ./dto/inputs/update-uat-report.input */ "./src/uat-reports/dto/inputs/update-uat-report.input.ts");
const batch_upload_input_1 = __webpack_require__(/*! ./dto/inputs/batch-upload.input */ "./src/uat-reports/dto/inputs/batch-upload.input.ts");
const uat_report_filter_input_1 = __webpack_require__(/*! ./dto/inputs/uat-report-filter.input */ "./src/uat-reports/dto/inputs/uat-report-filter.input.ts");
const uat_report_sort_input_1 = __webpack_require__(/*! ./dto/inputs/uat-report-sort.input */ "./src/uat-reports/dto/inputs/uat-report-sort.input.ts");
const types_1 = __webpack_require__(/*! ../common/types */ "./src/common/types/index.ts");
const user_view_1 = __webpack_require__(/*! ../users/dto/views/user.view */ "./src/users/dto/views/user.view.ts");
let UATReportsResolver = class UATReportsResolver {
    constructor(createUATReportService, getUATReportService, listUATReportsService, updateUATReportService, deleteUATReportService, uploadBatchReportsService, getDashboardStatsService, deleteBulkUATReportsService) {
        this.createUATReportService = createUATReportService;
        this.getUATReportService = getUATReportService;
        this.listUATReportsService = listUATReportsService;
        this.updateUATReportService = updateUATReportService;
        this.deleteUATReportService = deleteUATReportService;
        this.uploadBatchReportsService = uploadBatchReportsService;
        this.getDashboardStatsService = getDashboardStatsService;
        this.deleteBulkUATReportsService = deleteBulkUATReportsService;
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
    async deleteBulkUATReports(ids) {
        return await this.deleteBulkUATReportsService.deleteByIds(ids);
    }
    async deleteAllUATReports() {
        return await this.deleteBulkUATReportsService.deleteAll();
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
    __metadata("design:paramtypes", [typeof (_j = typeof create_uat_report_input_1.CreateUATReportInput !== "undefined" && create_uat_report_input_1.CreateUATReportInput) === "function" ? _j : Object, typeof (_k = typeof user_view_1.UserView !== "undefined" && user_view_1.UserView) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], UATReportsResolver.prototype, "createUATReport", null);
__decorate([
    (0, graphql_1.Mutation)(() => batch_upload_result_view_1.BatchUploadResult, { name: 'uploadBatchReports' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('ADMIN', 'REVIEWER'),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, decorators_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_m = typeof batch_upload_input_1.BatchUploadInput !== "undefined" && batch_upload_input_1.BatchUploadInput) === "function" ? _m : Object, typeof (_o = typeof user_view_1.UserView !== "undefined" && user_view_1.UserView) === "function" ? _o : Object]),
    __metadata("design:returntype", typeof (_p = typeof Promise !== "undefined" && Promise) === "function" ? _p : Object)
], UATReportsResolver.prototype, "uploadBatchReports", null);
__decorate([
    (0, graphql_1.Mutation)(() => uat_report_view_1.UATReportView, { name: 'updateUATReport' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('ADMIN', 'REVIEWER'),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_q = typeof update_uat_report_input_1.UpdateUATReportInput !== "undefined" && update_uat_report_input_1.UpdateUATReportInput) === "function" ? _q : Object]),
    __metadata("design:returntype", typeof (_r = typeof Promise !== "undefined" && Promise) === "function" ? _r : Object)
], UATReportsResolver.prototype, "updateUATReport", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { name: 'deleteUATReport' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('ADMIN'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_s = typeof Promise !== "undefined" && Promise) === "function" ? _s : Object)
], UATReportsResolver.prototype, "deleteUATReport", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { name: 'deleteBulkUATReports' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('ADMIN'),
    __param(0, (0, graphql_1.Args)({ name: 'ids', type: () => [String] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", typeof (_t = typeof Promise !== "undefined" && Promise) === "function" ? _t : Object)
], UATReportsResolver.prototype, "deleteBulkUATReports", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean, { name: 'deleteAllUATReports' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, decorators_1.Roles)('ADMIN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_u = typeof Promise !== "undefined" && Promise) === "function" ? _u : Object)
], UATReportsResolver.prototype, "deleteAllUATReports", null);
__decorate([
    (0, graphql_1.Query)(() => uat_report_view_1.UATReportView, { name: 'getUATReport' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_v = typeof Promise !== "undefined" && Promise) === "function" ? _v : Object)
], UATReportsResolver.prototype, "getUATReport", null);
__decorate([
    (0, graphql_1.Query)(() => uat_report_connection_view_1.UATReportConnection, { name: 'getUATReports' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('filter', { nullable: true })),
    __param(1, (0, graphql_1.Args)('sort', { nullable: true })),
    __param(2, (0, graphql_1.Args)('pagination', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_w = typeof uat_report_filter_input_1.UATReportFilterInput !== "undefined" && uat_report_filter_input_1.UATReportFilterInput) === "function" ? _w : Object, typeof (_x = typeof uat_report_sort_input_1.UATReportSortInput !== "undefined" && uat_report_sort_input_1.UATReportSortInput) === "function" ? _x : Object, typeof (_y = typeof types_1.PaginationInput !== "undefined" && types_1.PaginationInput) === "function" ? _y : Object]),
    __metadata("design:returntype", typeof (_z = typeof Promise !== "undefined" && Promise) === "function" ? _z : Object)
], UATReportsResolver.prototype, "getUATReports", null);
__decorate([
    (0, graphql_1.Query)(() => dashboard_stats_view_1.DashboardStatsView, { name: 'getDashboardStats' }),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_0 = typeof Promise !== "undefined" && Promise) === "function" ? _0 : Object)
], UATReportsResolver.prototype, "getDashboardStats", null);
exports.UATReportsResolver = UATReportsResolver = __decorate([
    (0, graphql_1.Resolver)(() => uat_report_view_1.UATReportView),
    __metadata("design:paramtypes", [typeof (_a = typeof create_uat_report_service_1.CreateUATReportService !== "undefined" && create_uat_report_service_1.CreateUATReportService) === "function" ? _a : Object, typeof (_b = typeof get_uat_report_service_1.GetUATReportService !== "undefined" && get_uat_report_service_1.GetUATReportService) === "function" ? _b : Object, typeof (_c = typeof list_uat_reports_service_1.ListUATReportsService !== "undefined" && list_uat_reports_service_1.ListUATReportsService) === "function" ? _c : Object, typeof (_d = typeof update_uat_report_service_1.UpdateUATReportService !== "undefined" && update_uat_report_service_1.UpdateUATReportService) === "function" ? _d : Object, typeof (_e = typeof delete_uat_report_service_1.DeleteUATReportService !== "undefined" && delete_uat_report_service_1.DeleteUATReportService) === "function" ? _e : Object, typeof (_f = typeof upload_batch_reports_service_1.UploadBatchReportsService !== "undefined" && upload_batch_reports_service_1.UploadBatchReportsService) === "function" ? _f : Object, typeof (_g = typeof get_dashboard_stats_service_1.GetDashboardStatsService !== "undefined" && get_dashboard_stats_service_1.GetDashboardStatsService) === "function" ? _g : Object, typeof (_h = typeof delete_bulk_uat_reports_service_1.DeleteBulkUATReportsService !== "undefined" && delete_bulk_uat_reports_service_1.DeleteBulkUATReportsService) === "function" ? _h : Object])
], UATReportsResolver);


/***/ }),

/***/ "./src/users/dto/inputs/register-user.input.ts":
/*!*****************************************************!*\
  !*** ./src/users/dto/inputs/register-user.input.ts ***!
  \*****************************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const user_role_enum_1 = __webpack_require__(/*! ../../enums/user-role.enum */ "./src/users/enums/user-role.enum.ts");
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

/***/ "./src/users/dto/inputs/update-user.input.ts":
/*!***************************************************!*\
  !*** ./src/users/dto/inputs/update-user.input.ts ***!
  \***************************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const user_role_enum_1 = __webpack_require__(/*! ../../enums/user-role.enum */ "./src/users/enums/user-role.enum.ts");
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

/***/ "./src/users/dto/inputs/user-filter.input.ts":
/*!***************************************************!*\
  !*** ./src/users/dto/inputs/user-filter.input.ts ***!
  \***************************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const user_role_enum_1 = __webpack_require__(/*! ../../enums/user-role.enum */ "./src/users/enums/user-role.enum.ts");
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

/***/ "./src/users/dto/views/user-connection.view.ts":
/*!*****************************************************!*\
  !*** ./src/users/dto/views/user-connection.view.ts ***!
  \*****************************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const types_1 = __webpack_require__(/*! ../../../common/types */ "./src/common/types/index.ts");
const user_view_1 = __webpack_require__(/*! ./user.view */ "./src/users/dto/views/user.view.ts");
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

/***/ "./src/users/dto/views/user.view.ts":
/*!******************************************!*\
  !*** ./src/users/dto/views/user.view.ts ***!
  \******************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const user_role_enum_1 = __webpack_require__(/*! ../../enums/user-role.enum */ "./src/users/enums/user-role.enum.ts");
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

/***/ "./src/users/enums/user-role.enum.ts":
/*!*******************************************!*\
  !*** ./src/users/enums/user-role.enum.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRole = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
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

/***/ "./src/users/models/parser.ts":
/*!************************************!*\
  !*** ./src/users/models/parser.ts ***!
  \************************************/
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

/***/ "./src/users/models/user.ts":
/*!**********************************!*\
  !*** ./src/users/models/user.ts ***!
  \**********************************/
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
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const user_role_enum_1 = __webpack_require__(/*! ../enums/user-role.enum */ "./src/users/enums/user-role.enum.ts");
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
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
        enum: user_role_enum_1.UserRole,
        default: user_role_enum_1.UserRole.VIEWER,
    }),
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

/***/ "./src/users/services/create-user.service.ts":
/*!***************************************************!*\
  !*** ./src/users/services/create-user.service.ts ***!
  \***************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const bson_1 = __webpack_require__(/*! bson */ "bson");
const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");
const gqlerr_1 = __webpack_require__(/*! @app/gqlerr */ "./libs/gqlerr/src/index.ts");
const user_1 = __webpack_require__(/*! ../models/user */ "./src/users/models/user.ts");
const parser_1 = __webpack_require__(/*! ../models/parser */ "./src/users/models/parser.ts");
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

/***/ "./src/users/services/get-user.service.ts":
/*!************************************************!*\
  !*** ./src/users/services/get-user.service.ts ***!
  \************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const gqlerr_1 = __webpack_require__(/*! @app/gqlerr */ "./libs/gqlerr/src/index.ts");
const user_1 = __webpack_require__(/*! ../models/user */ "./src/users/models/user.ts");
const parser_1 = __webpack_require__(/*! ../models/parser */ "./src/users/models/parser.ts");
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

/***/ "./src/users/services/update-user.service.ts":
/*!***************************************************!*\
  !*** ./src/users/services/update-user.service.ts ***!
  \***************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");
const gqlerr_1 = __webpack_require__(/*! @app/gqlerr */ "./libs/gqlerr/src/index.ts");
const user_1 = __webpack_require__(/*! ../models/user */ "./src/users/models/user.ts");
const parser_1 = __webpack_require__(/*! ../models/parser */ "./src/users/models/parser.ts");
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

/***/ "./src/users/users.module.ts":
/*!***********************************!*\
  !*** ./src/users/users.module.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const user_1 = __webpack_require__(/*! ./models/user */ "./src/users/models/user.ts");
const create_user_service_1 = __webpack_require__(/*! ./services/create-user.service */ "./src/users/services/create-user.service.ts");
const get_user_service_1 = __webpack_require__(/*! ./services/get-user.service */ "./src/users/services/get-user.service.ts");
const update_user_service_1 = __webpack_require__(/*! ./services/update-user.service */ "./src/users/services/update-user.service.ts");
const users_resolver_1 = __webpack_require__(/*! ./users.resolver */ "./src/users/users.resolver.ts");
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

/***/ "./src/users/users.resolver.ts":
/*!*************************************!*\
  !*** ./src/users/users.resolver.ts ***!
  \*************************************/
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
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const guards_1 = __webpack_require__(/*! ../common/guards */ "./src/common/guards/index.ts");
const decorators_1 = __webpack_require__(/*! ../common/decorators */ "./src/common/decorators/index.ts");
const create_user_service_1 = __webpack_require__(/*! ./services/create-user.service */ "./src/users/services/create-user.service.ts");
const get_user_service_1 = __webpack_require__(/*! ./services/get-user.service */ "./src/users/services/get-user.service.ts");
const update_user_service_1 = __webpack_require__(/*! ./services/update-user.service */ "./src/users/services/update-user.service.ts");
const user_view_1 = __webpack_require__(/*! ./dto/views/user.view */ "./src/users/dto/views/user.view.ts");
const user_connection_view_1 = __webpack_require__(/*! ./dto/views/user-connection.view */ "./src/users/dto/views/user-connection.view.ts");
const register_user_input_1 = __webpack_require__(/*! ./dto/inputs/register-user.input */ "./src/users/dto/inputs/register-user.input.ts");
const update_user_input_1 = __webpack_require__(/*! ./dto/inputs/update-user.input */ "./src/users/dto/inputs/update-user.input.ts");
const user_filter_input_1 = __webpack_require__(/*! ./dto/inputs/user-filter.input */ "./src/users/dto/inputs/user-filter.input.ts");
const types_1 = __webpack_require__(/*! ../common/types */ "./src/common/types/index.ts");
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

/***/ "@nestjs/apollo":
/*!*********************************!*\
  !*** external "@nestjs/apollo" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/apollo");

/***/ }),

/***/ "@nestjs/cache-manager":
/*!****************************************!*\
  !*** external "@nestjs/cache-manager" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/cache-manager");

/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/graphql":
/*!**********************************!*\
  !*** external "@nestjs/graphql" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/graphql");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/mongoose":
/*!***********************************!*\
  !*** external "@nestjs/mongoose" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),

/***/ "@nestjs/passport":
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/throttler":
/*!************************************!*\
  !*** external "@nestjs/throttler" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("@nestjs/throttler");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "bson":
/*!***********************!*\
  !*** external "bson" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("bson");

/***/ }),

/***/ "cache-manager":
/*!********************************!*\
  !*** external "cache-manager" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cache-manager");

/***/ }),

/***/ "class-transformer":
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "graphql":
/*!**************************!*\
  !*** external "graphql" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("graphql");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "openai":
/*!*************************!*\
  !*** external "openai" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("openai");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ })

/******/ 	});
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;
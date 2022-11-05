"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MentorsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mentor_model_1 = require("./mentor.model");
const mentors_controller_1 = require("./mentors.controller");
const mentors_service_1 = require("./mentors.service");
let MentorsModule = class MentorsModule {
};
MentorsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Mentor', schema: mentor_model_1.MentorSchema }])
        ],
        controllers: [mentors_controller_1.MentorsController],
        providers: [mentors_service_1.MentorsService]
    })
], MentorsModule);
exports.MentorsModule = MentorsModule;
//# sourceMappingURL=mentors.module.js.map
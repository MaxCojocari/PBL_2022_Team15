"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MentorsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let MentorsService = class MentorsService {
    constructor(mentorModel) {
        this.mentorModel = mentorModel;
    }
    ;
    async insertMentor(fN, lN, email, linkedin, twitter, ind, acc) {
        const newMentor = new this.mentorModel({
            firstName: fN,
            lastName: lN,
            email,
            linkedinURL: linkedin,
            twitterURL: twitter,
            industries: ind,
            accelerators: acc
        });
        const result = await newMentor.save();
        return result.id;
    }
    async getMentors() {
        const mentors = await this.mentorModel.find().exec();
        return mentors;
    }
    async getSingleMentor(mentorId) {
        const mentor = await this.findMentor(mentorId);
        return mentor;
    }
    async modifyMentor(mentorId, firstName, lastName, email, linkedinURL, twitterURL, industries, accelerators) {
        const updatedMentor = await this.findMentor(mentorId);
        if (firstName) {
            updatedMentor.firstName = firstName;
        }
        if (lastName) {
            updatedMentor.lastName = lastName;
        }
        if (email) {
            updatedMentor.email = email;
        }
        if (linkedinURL) {
            updatedMentor.linkedinURL = linkedinURL;
        }
        if (twitterURL) {
            updatedMentor.twitterURL = twitterURL;
        }
        if (industries) {
            updatedMentor.industries = industries;
        }
        if (accelerators) {
            updatedMentor.accelerators = accelerators;
        }
        updatedMentor.save();
    }
    async deleteMentor(mentorId) {
        const result = await this.mentorModel.deleteOne({ _id: mentorId }).exec();
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException('Could not find mentor.');
        }
        return result;
    }
    async findMentor(id) {
        let mentor;
        try {
            mentor = await this.mentorModel.findById(id);
        }
        catch (error) {
            throw new common_1.NotFoundException('Could not find mentor');
        }
        if (!mentor) {
            throw new common_1.NotFoundException('Could not find mentor');
        }
        return mentor;
    }
};
MentorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Mentor')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MentorsService);
exports.MentorsService = MentorsService;
//# sourceMappingURL=mentors.service.js.map
using Talent.Common.Contracts;
using Talent.Common.Models;
using Talent.Services.Profile.Domain.Contracts;
using Talent.Services.Profile.Models.Profile;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;
using Talent.Services.Profile.Models;
using Microsoft.AspNetCore.Http;
using System.IO;
using Talent.Common.Security;
using RawRabbit.Pipe.Middleware;
using System.Reflection;
using System.Numerics;
using System.Xml.Linq;
using StackExchange.Redis;

namespace Talent.Services.Profile.Domain.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IUserAppContext _userAppContext;
        IRepository<UserLanguage> _userLanguageRepository;
        IRepository<User> _userRepository;
        IRepository<Employer> _employerRepository;
        IRepository<Job> _jobRepository;
        IRepository<Recruiter> _recruiterRepository;
        IFileService _fileService;


        public ProfileService(IUserAppContext userAppContext,
                              IRepository<UserLanguage> userLanguageRepository,
                              IRepository<User> userRepository,
                              IRepository<Employer> employerRepository,
                              IRepository<Job> jobRepository,
                              IRepository<Recruiter> recruiterRepository,
                              IFileService fileService)
        {
            _userAppContext = userAppContext;
            _userLanguageRepository = userLanguageRepository;
            _userRepository = userRepository;
            _employerRepository = employerRepository;
            _jobRepository = jobRepository;
            _recruiterRepository = recruiterRepository;
            _fileService = fileService;
        }

        public async Task<List<AddLanguageViewModel>> AddTalentLanguage(String Id, AddLanguageViewModel language) //public bool AddNewLanguage(AddLanguageViewModel language)
        {            
            User user = await _userRepository.GetByIdAsync(Id);
            if (user != null)
            {
                var getLanguage = user.Languages.ToList();
                getLanguage.Add(new UserLanguage
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    UserId = user.Id,
                    Language = language.Name,
                    LanguageLevel = language.Level
                });

                user.Languages = getLanguage;
                await _userRepository.Update(user);
                var mappedLanguage = user.Languages.Select(x => ViewModelFromLanguage(x)).ToList();
                return mappedLanguage;
            }
            return null;
        }
        
        public async Task<List<AddLanguageViewModel>> UpdateTalentLanguage(String Id, AddLanguageViewModel language)
        {
            User user = await _userRepository.GetByIdAsync(Id);
            if (user != null)
            {
                var getLanguage = user.Languages.ToList();
                foreach (var lang in getLanguage)
                {
                    if (lang.Id == language.Id)
                    {
                        lang.Language = language.Name;
                        lang.LanguageLevel = language.Level;
                    }
                }
                user.Languages = getLanguage.ToList();
                await _userRepository.Update(user);
                var mappedLanguages = user.Languages.Select(x => ViewModelFromLanguage(x)).ToList();                
                return mappedLanguages;
            }
            return null;
        }
        public async Task<List<AddLanguageViewModel>> DeleteTalentLanguage(String Id, AddLanguageViewModel language)
        {
            User user = await _userRepository.GetByIdAsync(Id);
            if (user != null)
            {
                var getLanguage = user.Languages.ToList();
                var delLang = user.Languages.FirstOrDefault(x => x.Id == language.Id);
                getLanguage.Remove(delLang);
                user.Languages = getLanguage.ToList();
                await _userRepository.Update(user);
                var mappedLanguages = user.Languages.Select(x => ViewModelFromLanguage(x)).ToList();
                return mappedLanguages;                
            }
            return null;
        }
        public async Task<List<AddSkillViewModel>> AddTalentSkill(String Id, AddSkillViewModel skill)
        {
            User user = await _userRepository.GetByIdAsync(Id);
            if (user != null)
            {
                var getSkills = user.Skills.ToList();
                getSkills.Add(new UserSkill
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    UserId = user.Id,
                    Skill = skill.Name,
                    ExperienceLevel = skill.Level
                });
                user.Skills = getSkills;
                await _userRepository.Update(user);
                var mappedSkills = user.Skills.Select(x => ViewModelFromSkill(x)).ToList();
                return mappedSkills;
            }
            return null;
        }
        public async Task<List<AddSkillViewModel>> UpdateTalentSkill(String Id, AddSkillViewModel skill)
        {
            User user = await _userRepository.GetByIdAsync(Id);
            if (user != null)
            {
                var getSkills = user.Skills.ToList();
                foreach (var item in getSkills)
                {
                    if (item.Id == skill.Id)
                    {
                        item.Skill = skill.Name;
                        item.ExperienceLevel = skill.Level;
                    }
                }
                user.Skills = getSkills.ToList();
                await _userRepository.Update(user);
                var mappedSkills = user.Skills.Select(x => ViewModelFromSkill(x)).ToList();
                return mappedSkills;
            }
            return null;
        }
        public async Task<List<AddSkillViewModel>> DeleteTalentSkill(String Id, AddSkillViewModel skill)
        {
            User user = await _userRepository.GetByIdAsync(Id);
            if (user != null)
            {
                var getSkills = user.Skills.ToList();
                var delSkill = getSkills.FirstOrDefault(x => x.Id == skill.Id);
                getSkills.Remove(delSkill);
                user.Skills = getSkills.ToList();
                await _userRepository.Update(user);
                var mappedSkills = user.Skills.Select(x => ViewModelFromSkill(x)).ToList();
                return mappedSkills;
            }
            return null;
        }
        public async Task<List<ExperienceViewModel>> AddTalentExperience(String Id, ExperienceViewModel experience)
        {
            User user = await _userRepository.GetByIdAsync(Id);
            if (user != null)
            {
                List<UserExperience> getExperience = user.Experience;
                getExperience.Add(new UserExperience
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    Company = experience.Company,
                    Position = experience.Position,
                    Responsibilities = experience.Responsibilities,
                    Start = experience.Start,
                    End = experience.End,
                });
                user.Experience = getExperience;
                await _userRepository.Update(user);
                var mappedExperience = user.Experience.Select(x => ViewModelFromExperience(x)).ToList();
                return mappedExperience;
            }
            return null;
        }
        public async Task<List<ExperienceViewModel>> DeleteTalentExperience(String Id, ExperienceViewModel experience)
        {
            User user = await _userRepository.GetByIdAsync(Id);
            if (user != null)
            {
                List<UserExperience> getExperience = user.Experience;
                var deleteExper = getExperience.FirstOrDefault(x => x.Id == experience.Id);
                getExperience.Remove(deleteExper);
                user.Experience = getExperience;
                await _userRepository.Update(user);
                var mappedExperience = user.Experience.Select(x => ViewModelFromExperience(x)).ToList();
                return mappedExperience;
            }
            return null;
        }
        public async Task<List<ExperienceViewModel>> UpdateTalentExperience(String Id, ExperienceViewModel model)
        {
            User user = await _userRepository.GetByIdAsync(Id);
            if (user != null)
            {
                var getExperience = user.Experience;
                foreach (var experience in getExperience)
                {
                    if (experience.Id == model.Id)
                    {
                        experience.Company = model.Company;
                        experience.Position = model.Position;
                        experience.Responsibilities = model.Responsibilities;
                        experience.Start = model.Start;
                        experience.End = model.End;
                    }
                }
                user.Experience = getExperience;
                await _userRepository.Update(user);
                var mappedExperience = user.Experience.Select(x => ViewModelFromExperience(x)).ToList();
                return mappedExperience;
            }
            return null;
        }
        public async Task<List<AddEducationViewModel>> AddTalentEducation(String Id, AddEducationViewModel educat)
        {
            User user = await _userRepository.GetByIdAsync(Id);
            if (user != null)
            {
                var getEducation = user.Education;
                getEducation.Add(new UserEducation
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    UserId = user.Id,
                    Country = educat.Country,
                    InstituteName = educat.InstituteName,
                    Title = educat.Title,
                    Degree = educat.Degree,
                    YearOfGraduation = educat.YearOfGraduation,
                });
                user.Education = getEducation;
                await _userRepository.Update(user);
                var mappedEducation = user.Education.Select(x => ViewModelFromEducation(x)).ToList();
                return mappedEducation;
            }
            return null;
        }
        public async Task<List<AddEducationViewModel>> DeleteTalentEducation(String Id, AddEducationViewModel educat)
        {
            User user = await _userRepository.GetByIdAsync(Id);
            if (user != null)
            {
                var getEducation = user.Education;
                var deleteEducation = getEducation.FirstOrDefault(x => x.Id == educat.Id);
                getEducation.Remove(deleteEducation);
                user.Education = getEducation;
                await _userRepository.Update(user);
                var mappedEducation = user.Education.Select(x => ViewModelFromEducation(x)).ToList();
                return mappedEducation;
            }
            return null;
        }
        public async Task<List<AddEducationViewModel>> UpdateTalentEducation(String Id, AddEducationViewModel educat)
        {
            User user = await _userRepository.GetByIdAsync(Id);
            if (user != null)
            {
                var getEducation = user.Education;
                foreach (var item in getEducation)
                {
                    if (item.Id == educat.Id)
                    {
                        item.Country = educat.Country;
                        item.InstituteName = educat.InstituteName;
                        item.Title = educat.Title;
                        item.Degree = educat.Degree;
                        item.YearOfGraduation = educat.YearOfGraduation;
                    }
                }
                user.Education = getEducation;
                await _userRepository.Update(user);
                var mappedEducation = user.Education.Select(x => ViewModelFromEducation(x)).ToList();
                return mappedEducation;
            }
            return null;
        }

        public async Task<TalentProfileViewModel> GetTalentProfile(string Id)
        {
            //Your code here;
            //throw new NotImplementedException();

            User profile = (await _userRepository.GetByIdAsync(Id));

            var videoUrl = "";
            var cvUrl = "";
            if (profile != null)
            {
                var mappedLanguages = profile.Languages.Select(x => ViewModelFromLanguage(x)).ToList();
                var mappedSkills = profile.Skills.Select(x => ViewModelFromSkill(x)).ToList();
                var mappedEducation = profile.Education.Select(x => ViewModelFromEducation(x)).ToList();
                var mappedCertification = profile.Certifications.Select(x => ViewModelFromCertification(x)).ToList();
                var mappedExperience = profile.Experience.Select(x => ViewModelFromExperience(x)).ToList();

                var result = new TalentProfileViewModel
                {
                    Id = profile.Id,
                    FirstName = profile.FirstName,
                    MiddleName = profile.MiddleName,
                    LastName = profile.LastName,
                    Gender = profile.Gender,
                    Email = profile.Email,
                    Phone = profile.Phone,
                    MobilePhone = profile.MobilePhone,
                    IsMobilePhoneVerified = profile.IsMobilePhoneVerified,
                    Address = profile.Address,
                    Nationality = profile.Nationality,
                    VisaStatus = profile.VisaStatus,
                    VisaExpiryDate = profile.VisaExpiryDate,
                    ProfilePhoto = profile.ProfilePhoto,
                    ProfilePhotoUrl = profile.ProfilePhotoUrl,
                    VideoName = profile.VideoName,
                    VideoUrl = videoUrl,// need to edit ???
                    CvName = profile.CvName,
                    CvUrl = cvUrl,  // need to edit ???
                    Summary = profile.Summary,
                    Description = profile.Description,
                    LinkedAccounts = profile.LinkedAccounts,
                    JobSeekingStatus = profile.JobSeekingStatus,
                    Languages = mappedLanguages,
                    Skills = mappedSkills,
                    Education = mappedEducation,
                    Certifications = mappedCertification,
                    Experience = mappedExperience
                };
                return result;
            }
            return null;
        }

        public async Task<bool> UpdateTalentProfile(TalentProfileViewModel model, string updaterId)
        {
            //Your code here;
            //throw new NotImplementedException();            
            try
            {
                if (model.Id != null)
                {
                    User existingUser = await _userRepository.GetByIdAsync(model.Id);
                    existingUser.FirstName = model.FirstName;
                    existingUser.LastName = model.LastName;
                    existingUser.Email = model.Email;
                    existingUser.Phone = model.Phone;
                    existingUser.LinkedAccounts = model.LinkedAccounts;
                    existingUser.Address = model.Address;
                    existingUser.Nationality = model.Nationality;
                    existingUser.Summary = model.Summary;
                    existingUser.Description = model.Description;
                    existingUser.VisaStatus = model.VisaStatus;
                    existingUser.VisaExpiryDate = model.VisaExpiryDate;
                    existingUser.JobSeekingStatus = model.JobSeekingStatus;

                    //existingUser.Languages = model.Languages.Select(x => new UserLanguage {
                    //    Id = ObjectId.GenerateNewId().ToString(),                        
                    //    UserId = model.Id,
                    //    Language = x.Name,
                    //    LanguageLevel = x.Level
                    //}).ToList();                    
                    //existingUser.Skills = model.Skills.Select(x => new UserSkill
                    //{
                    //    Id = ObjectId.GenerateNewId().ToString(),
                    //    UserId = model.Id,
                    //    Skill = x.Name,
                    //    ExperienceLevel = x.Level
                    //}).ToList();
                    //existingUser.Education = model.Education.Select(x => new UserEducation
                    //{
                    //    Id = ObjectId.GenerateNewId().ToString(),
                    //    UserId = model.Id,
                    //    Country = x.Country,
                    //    InstituteName = x.InstituteName,
                    //    Title = x.Title,
                    //    Degree = x.Degree,
                    //    YearOfGraduation = x.YearOfGraduation,
                    //}).ToList();
                    await _userRepository.Update(existingUser);
                }                
            }
            catch (MongoException ex)
            {
                return false;
            }
            return true;
        }

        public async Task<EmployerProfileViewModel> GetEmployerProfile(string Id, string role)
        {

            Employer profile = null;
            switch (role)


            {
                case "employer":
                    profile = (await _employerRepository.GetByIdAsync(Id));
                    break;
                case "recruiter":
                    profile = (await _recruiterRepository.GetByIdAsync(Id));
                    break;
            }

            var videoUrl = "";

            if (profile != null)
            {
                videoUrl = string.IsNullOrWhiteSpace(profile.VideoName)
                          ? ""
                          : await _fileService.GetFileURL(profile.VideoName, FileType.UserVideo);

                var skills = profile.Skills.Select(x => ViewModelFromSkill(x)).ToList();

                var result = new EmployerProfileViewModel
                {
                    Id = profile.Id,
                    CompanyContact = profile.CompanyContact,
                    PrimaryContact = profile.PrimaryContact,
                    Skills = skills,
                    ProfilePhoto = profile.ProfilePhoto,
                    ProfilePhotoUrl = profile.ProfilePhotoUrl,
                    VideoName = profile.VideoName,
                    VideoUrl = videoUrl,
                    DisplayProfile = profile.DisplayProfile,
                };
                return result;
            }

            return null;
        }

        public async Task<bool> UpdateEmployerProfile(EmployerProfileViewModel employer, string updaterId, string role)
        {
            try
            {
                if (employer.Id != null)
                {
                    switch (role)
                    {
                        case "employer":
                            Employer existingEmployer = (await _employerRepository.GetByIdAsync(employer.Id));
                            existingEmployer.CompanyContact = employer.CompanyContact;
                            existingEmployer.PrimaryContact = employer.PrimaryContact;
                            existingEmployer.ProfilePhoto = employer.ProfilePhoto;
                            existingEmployer.ProfilePhotoUrl = employer.ProfilePhotoUrl;
                            existingEmployer.DisplayProfile = employer.DisplayProfile;
                            existingEmployer.UpdatedBy = updaterId;
                            existingEmployer.UpdatedOn = DateTime.Now;

                            var newSkills = new List<UserSkill>();
                            foreach (var item in employer.Skills)
                            {
                                var skill = existingEmployer.Skills.SingleOrDefault(x => x.Id == item.Id);
                                if (skill == null)
                                {
                                    skill = new UserSkill
                                    {
                                        Id = ObjectId.GenerateNewId().ToString(),
                                        IsDeleted = false
                                    };
                                }
                                UpdateSkillFromView(item, skill);
                                newSkills.Add(skill);
                            }
                            existingEmployer.Skills = newSkills;

                            await _employerRepository.Update(existingEmployer);
                            break;

                        case "recruiter":
                            Recruiter existingRecruiter = (await _recruiterRepository.GetByIdAsync(employer.Id));
                            existingRecruiter.CompanyContact = employer.CompanyContact;
                            existingRecruiter.PrimaryContact = employer.PrimaryContact;
                            existingRecruiter.ProfilePhoto = employer.ProfilePhoto;
                            existingRecruiter.ProfilePhotoUrl = employer.ProfilePhotoUrl;
                            existingRecruiter.DisplayProfile = employer.DisplayProfile;
                            existingRecruiter.UpdatedBy = updaterId;
                            existingRecruiter.UpdatedOn = DateTime.Now;

                            var newRSkills = new List<UserSkill>();
                            foreach (var item in employer.Skills)
                            {
                                var skill = existingRecruiter.Skills.SingleOrDefault(x => x.Id == item.Id);
                                if (skill == null)
                                {
                                    skill = new UserSkill
                                    {
                                        Id = ObjectId.GenerateNewId().ToString(),
                                        IsDeleted = false
                                    };
                                }
                                UpdateSkillFromView(item, skill);
                                newRSkills.Add(skill);
                            }
                            existingRecruiter.Skills = newRSkills;
                            await _recruiterRepository.Update(existingRecruiter);

                            break;
                    }
                    return true;
                }
                return false;
            }
            catch (MongoException e)
            {
                return false;
            }
        }

        public async Task<bool> UpdateEmployerPhoto(string employerId, IFormFile file)
        {
            var fileExtension = Path.GetExtension(file.FileName);
            List<string> acceptedExtensions = new List<string> { ".jpg", ".png", ".gif", ".jpeg" };

            if (fileExtension != null && !acceptedExtensions.Contains(fileExtension.ToLower()))
            {
                return false;
            }

            var profile = (await _employerRepository.Get(x => x.Id == employerId)).SingleOrDefault();

            if (profile == null)
            {
                return false;
            }

            var newFileName = await _fileService.SaveFile(file, FileType.ProfilePhoto);

            if (!string.IsNullOrWhiteSpace(newFileName))
            {
                var oldFileName = profile.ProfilePhoto;

                if (!string.IsNullOrWhiteSpace(oldFileName))
                {
                    await _fileService.DeleteFile(oldFileName, FileType.ProfilePhoto);
                }

                profile.ProfilePhoto = newFileName;
                profile.ProfilePhotoUrl = await _fileService.GetFileURL(newFileName, FileType.ProfilePhoto);

                await _employerRepository.Update(profile);
                return true;
            }

            return false;

        }

        public async Task<bool> AddEmployerVideo(string employerId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateTalentPhoto(string talentId, IFormFile file)
        {
            //Your code here;
            //throw new NotImplementedException();
            var fileExtension = Path.GetExtension(file.FileName);
            List<string> acceptedExtensions = new List<string> { ".jpg", ".png", ".gif", ".jpeg" };
            if (fileExtension != null && !acceptedExtensions.Contains(fileExtension)){
                return false;
            }
            var talentProfile = await _userRepository.GetByIdAsync(talentId);
            if (talentProfile == null) { 
                return false; 
            }
            var newFileName = await _fileService.SaveFile(file, FileType.ProfilePhoto);
            if (!string.IsNullOrWhiteSpace(newFileName))
            {
                var oldFileName = talentProfile.ProfilePhoto;
                if (!string.IsNullOrWhiteSpace(oldFileName))
                {
                    await _fileService.DeleteFile(oldFileName, FileType.ProfilePhoto);
                }
                talentProfile.ProfilePhoto = newFileName;
                talentProfile.ProfilePhotoUrl = await _fileService.GetFileURL(newFileName, FileType.ProfilePhoto);
                await _userRepository.Update(talentProfile);
                return true;
            }
            return false;
        }

        public async Task<bool> AddTalentVideo(string talentId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();

        }

        public async Task<bool> RemoveTalentVideo(string talentId, string videoName)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateTalentCV(string talentId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<string>> GetTalentSuggestionIds(string employerOrJobId, bool forJob, int position, int increment)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSnapshotViewModel>> GetTalentSnapshotList(string employerOrJobId, bool forJob, int position, int increment)
        {
            try
            {
                IQueryable<User> query = _userRepository.GetQueryable();
                query = query.Where(u => !u.IsDeleted);
                query = query.OrderByDescending(u => u.CreatedOn);
                query = query.Take(increment);
                IEnumerable<User> users = query.ToList();
                var talentSnapshots = users.Select(user =>
                {
                    var currentEmployment = "MVP Studio";
                    var level = "Internship";
                    var skills = user.Skills?.Select(skill => skill.Skill).ToList() ?? new List<string>();
                    return new TalentSnapshotViewModel
                    {
                        Id = user.Id,
                        Name = $"{user.FirstName} {user.LastName}",
                        PhotoId = user.ProfilePhotoUrl,
                        VideoUrl = user.VideoName,
                        CVUrl = user.CvName,
                        Summary = user.Summary,
                        Visa = user.VisaStatus,
                        CurrentEmployment = currentEmployment,
                        Level = level,
                        Skills = skills
                    };
                }).ToList();
                return talentSnapshots;
            }
            catch (Exception ex)
            {
                throw;
            }

            //Your code here;
            //throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSnapshotViewModel>> GetTalentSnapshotList(IEnumerable<string> ids)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        #region TalentMatching

        public async Task<IEnumerable<TalentSuggestionViewModel>> GetFullTalentList()
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public IEnumerable<TalentMatchingEmployerViewModel> GetEmployerList()
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentMatchingEmployerViewModel>> GetEmployerListByFilterAsync(SearchCompanyModel model)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSuggestionViewModel>> GetTalentListByFilterAsync(SearchTalentModel model)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSuggestion>> GetSuggestionList(string employerOrJobId, bool forJob, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> AddTalentSuggestions(AddTalentSuggestionList selectedTalents)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        #endregion

        #region Conversion Methods

        #region Update from View

        protected void UpdateSkillFromView(AddSkillViewModel model, UserSkill original)
        {
            original.ExperienceLevel = model.Level;
            original.Skill = model.Name;
        }

        #endregion

        #region Build Views from Model

        protected AddSkillViewModel ViewModelFromSkill(UserSkill skill)
        {
            return new AddSkillViewModel
            {
                Id = skill.Id,
                Level = skill.ExperienceLevel,
                Name = skill.Skill
            };
        }

        protected AddLanguageViewModel ViewModelFromLanguage(UserLanguage language)
        {
            return new AddLanguageViewModel
            {
                Id = language.Id,
                CurrentUserId = language.UserId,
                Name = language.Language,
                Level = language.LanguageLevel,
            };
        }
        protected AddEducationViewModel ViewModelFromEducation(UserEducation education)
        {
            return new AddEducationViewModel
            {
                Id = education.Id,
                Country = education.Country,
                InstituteName = education.InstituteName,
                Title = education.Title,
                Degree = education.Degree,
                YearOfGraduation = education.YearOfGraduation,
            };
        }
        protected AddCertificationViewModel ViewModelFromCertification(UserCertification certification)
        {
            return new AddCertificationViewModel
            {
                Id = certification.Id,
                CertificationName = certification.CertificationName,
                CertificationFrom = certification.CertificationFrom,
                CertificationYear = certification.CertificationYear,
            };
        }
        protected ExperienceViewModel ViewModelFromExperience(UserExperience experience)
        {
            return new ExperienceViewModel 
            {
                Id = experience.Id,
                Company = experience.Company,
                Position = experience.Position,
                Responsibilities = experience.Responsibilities,
                Start = experience.Start,
                End = experience.End,
            };
        }
        #endregion

        #endregion

        #region ManageClients

        public async Task<IEnumerable<ClientViewModel>> GetClientListAsync(string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<ClientViewModel> ConvertToClientsViewAsync(Client client, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }
         
        public async Task<int> GetTotalTalentsForClient(string clientId, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();

        }

        public async Task<Employer> GetEmployer(string employerId)
        {
            return await _employerRepository.GetByIdAsync(employerId);
        }
        #endregion

    }
}

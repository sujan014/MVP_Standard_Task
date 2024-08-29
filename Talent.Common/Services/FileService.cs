using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Talent.Common.Aws;
using Talent.Common.Contracts;

namespace Talent.Common.Services
{
    public class FileService : IFileService
    {
        private readonly IHostingEnvironment _environment;
        private readonly string _tempFolder;
        private IAwsService _awsService;
        // create new 
        private readonly string _bucketName;

        public FileService(IHostingEnvironment environment, 
            IAwsService awsService)
        {
            _environment = environment;
            _tempFolder = "images\\";
            _awsService = awsService;
            _bucketName = "sujan-mvp"; // your bucket name here
        }

        public async Task<string> GetFileURL(string id, FileType type)
        {
            //Your code here;
            //throw new NotImplementedException();

            // get aws bucket url here
            string fileUrl = await _awsService.GetStaticUrl(id, _bucketName);
            return fileUrl;

            // latest Commented
            //string path = "";

            //if (!string.IsNullOrWhiteSpace(id) && type == FileType.ProfilePhoto)
            //{
            //    path = _environment.WebRootPath + _tempFolder + id;   // Send saving location / URL
            //    if (File.Exists(path))
            //    {
            //        return path;
            //    }
            //    else
            //    {
            //        return "";
            //    }
            //}
            //return path;
        }

        public async Task<string> SaveFile(IFormFile file, FileType type)
        {
            //Your code here;
            //throw new NotImplementedException();


            // AWS Storage
            try
            {
                var uniqueFileName = ($"{DateTime.Now.Ticks}_{file.FileName}");
                using (MemoryStream memoryStream = new MemoryStream())
                {

                    await file.CopyToAsync(memoryStream);
                    memoryStream.Position = 0;
                    bool uploadSuccess = await _awsService.PutFileToS3(uniqueFileName, memoryStream, _bucketName, false);
                    if (!uploadSuccess)
                    {
                        return "";
                    }
                }
                return uniqueFileName;
            }
            catch
            {
                return "";
            }

            // LOCAL DISK STORAGE
            //string path = _environment.WebRootPath + _tempFolder;
            //var uniqueFileName = ($"{DateTime.Now.Ticks}_{file.FileName}");

            //if (file != null && path != "")
            //{
            //    path = path + uniqueFileName;                
            //    using (var fileStream = new FileStream(path, FileMode.Create))
            //    {
            //        await file.CopyToAsync(fileStream);
            //    }
            //}
            //return uniqueFileName;
        }

        public async Task<bool> DeleteFile(string id, FileType type)
        {
            //Your code here;
            //throw new NotImplementedException();

            // use aws s3
            try
            {
                var removeSuccess = await _awsService.RemoveFileFromS3(id, _bucketName);
                if (!removeSuccess)
                    return false;
            }
            catch
            {
                return false;
            }
            return true;

            //string filePath = _environment.WebRootPath + _tempFolder + id;
            //try
            //{
            //    if (File.Exists(filePath))
            //    {
            //        File.Delete(filePath);                    
            //    }
            //}
            //catch
            //{
            //    return false;
            //}
            //return true;
        }


        #region Document Save Methods

        private async Task<string> SaveFileGeneral(IFormFile file, string bucket, string folder, bool isPublic)
        {
            //Your code here;
            throw new NotImplementedException();
        }
        
        private async Task<bool> DeleteFileGeneral(string id, string bucket)
        {
            //Your code here;
            throw new NotImplementedException();
        }
        #endregion
    }
}

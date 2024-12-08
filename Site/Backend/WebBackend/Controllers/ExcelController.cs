using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using System.IO;
using System.Reflection.Metadata.Ecma335;

namespace WebBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExcelController : ControllerBase
    {
        [HttpPost("writeToExcel")]
        public IActionResult WriteToExcel([FromForm] IFormFile file)
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using (var stream = new MemoryStream())
            {
                file.CopyTo(stream);

                using (ExcelPackage package = new ExcelPackage())
                {
                    package.Load(stream);

                    ExcelWorksheet worksheet = package.Workbook.Worksheets.First();

                    int row = 15;

                    using (SqlConnection connection = new SqlConnection("Server=localhost;Database=TeachersDB;Trusted_Connection=True;TrustServerCertificate=true"))
                    {
                        connection.Open();

                        string sqlQuery = "SELECT * FROM InitialsTeachers";
                        SqlCommand cmd = new SqlCommand(sqlQuery, connection);
                        SqlDataReader reader = cmd.ExecuteReader();

                        while (reader.Read())
                        {
                            if (worksheet.Cells[row, 1].Value == null)
                            {
                                return Ok("Внимание! Количество преподавателей в базе данных не соответствует табелью, пожалуйста проверьте данные eщё раз или исправьте табель!");
                            }
                            worksheet.Cells[row, 3].Value = reader[1];
                            worksheet.Cells[row, 4].Value = reader[0];
                            row += 2;
                        }
                    }

                    string newFilePath = Path.Combine(Path.GetDirectoryName(file.FileName), "updated_" + Path.GetFileName(file.FileName));

                    using (var newFileStream = new FileStream(newFilePath, FileMode.Create))
                    {
                        package.SaveAs(newFileStream);//изменения будут сохраняться в новом файле Excel на сервере.
                    }

                    return Ok("Данные успешно записаны в новый Excel файл: " + newFilePath);
                }
            }
        }

        [HttpGet("writeToExcel")]
        public IActionResult WriteToExcel()
        {
            string fileName = "Test.xlsx";
            string filePath = $"..\\..\\..\\{fileName}";
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            //Подключение к файлу Excel
            using (ExcelPackage package = new ExcelPackage(new FileInfo(filePath)))
            {

                ExcelWorksheet worksheet = package.Workbook.Worksheets.First();

                // Находим свободную строку для записи новых данных
                int row = 15;
                int column = 3;

                // Подключение к базе данных SQL Server
                using (SqlConnection connection = new SqlConnection("Server=localhost;Database=TeachersDB;Trusted_Connection=True;TrustServerCertificate=true"))
                {
                    connection.Open();

                    // Запрос данных из таблицы
                    string sqlQuery = "SELECT * FROM InitialsTeachers";
                    SqlCommand cmd = new SqlCommand(sqlQuery, connection);
                    SqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        if (worksheet.Cells[row, 1].Value == null)
                        {
                            return Ok("Внимание! Количество преподавателей в базе данных не соответствует табелью, пожалуйста проверьте данные eщё раз или исправьте табель!");
                        }
                        worksheet.Cells[row, 3].Value = reader[1];
                        worksheet.Cells[row, 4].Value = reader[0];
                        row += 2;
                    }
                }

                string newFilePath = Path.Combine(Path.GetDirectoryName(filePath), "updated_" + Path.GetFileName(fileName));

                using (var newFileStream = new FileStream(newFilePath, FileMode.Create))
                {
                    package.SaveAs(newFileStream);//изменения будут сохраняться в новом файле Excel на сервере.
                }
            }

            return Ok("Данные успешно записаны в Excel.");
        }
    }
}

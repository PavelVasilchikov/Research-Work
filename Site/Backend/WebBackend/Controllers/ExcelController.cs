using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using System.Reflection.Metadata.Ecma335;

namespace WebBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExcelController : ControllerBase
    {
        [HttpGet("writeToExcel")]
        public IActionResult WriteToExcel()
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            //Подключение к файлу Excel
            using (ExcelPackage package = new ExcelPackage(new FileInfo("..\\..\\..\\Test.xlsx")))
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
                        worksheet.Cells[row, 3].Value = reader[1];
                        worksheet.Cells[row, 4].Value = reader[0];
                        row += 2;
                    }
                }

                package.Save();
            }

            return Ok("Данные успешно записаны в Excel.");
        }


    }
}

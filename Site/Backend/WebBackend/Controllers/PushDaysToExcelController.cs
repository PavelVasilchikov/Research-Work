using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using WebBackend.Models;

namespace WebBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DaysOfTheMonthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DaysOfTheMonthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public ActionResult<DaysOFTheMonth> CreateDays(DaysOfTheMonthDto daysDto) // DTO модель для передачи данных
        {
            try
            {
                // Преобразование массива дней в строку CSV
                string daysCsv = string.Join(",", daysDto.days);

                var days = new DaysOFTheMonth
                {
                    daysID = daysDto.daysID,
                    teachersID = daysDto.teachersID,
                    days = daysCsv
                };

                _context.DaysOFTheMonth.Add(days);
                _context.SaveChanges();

                return Ok(days);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DaysOFTheMonth>> GetDaysById(int id)
        {
            var daysOfTheMonth = await _context.DaysOFTheMonth.FindAsync(id);

            if (daysOfTheMonth == null)
            {
                return NotFound();
            }

            // Преобразование строки CSV обратно в массив дней
            string[] daysArray = daysOfTheMonth.days.Split(',');

            var daysDto = new DaysOfTheMonthDto
            {
                teachersID = daysOfTheMonth.teachersID,
                days = daysArray
            };

            return Ok(daysDto);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DaysOFTheMonth>>> GetDays()
        {
            return await _context.DaysOFTheMonth.ToListAsync();
        }

        [HttpPut("{id}")]
        public ActionResult UpdateDays(int id, DaysOfTheMonthDto updatedDaysDto)
        {
            var days = _context.DaysOFTheMonth.FirstOrDefault(d => d.daysID == id);

            if (days == null)
            {
                return NotFound();
            }

            // Обновляем данные модели
            days.teachersID = updatedDaysDto.teachersID;
            days.days = string.Join(",", updatedDaysDto.days);

            _context.SaveChanges();

            return NoContent(); // Возвращаем успешный статус без контента
        }
    }

    public class DaysOfTheMonthDto
    {
        public int daysID { get; set; }
        public int teachersID { get; set; }
        public string[]? days { get; set; }
    }
}


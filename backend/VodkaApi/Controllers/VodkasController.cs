using Microsoft.AspNetCore.Mvc;
using VodkaApi.Data;
using VodkaAPI.Models;

namespace VodkaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VodkasController : ControllerBase
    {
        private static List<Vodka> Vodkas = VodkaData.Vodkas;

        [HttpGet]
        public IActionResult GetAll([FromQuery] string? store = null, [FromQuery] string? sort = null, [FromQuery] double? size = null)
        {
            var result = Vodkas.AsQueryable();

            // Filtrowanie po sklepie
            if (!string.IsNullOrEmpty(store))
            {
                result = result.Where(v => v.Stores.Any(s => s.StoreName.ToLower() == store.ToLower()));
            }

            // Filtrowanie po pojemnoœci
            if (size.HasValue)
            {
                result = result.Where(v => v.BottleSize == size.Value);
            }

            // Sortowanie
            if (!string.IsNullOrEmpty(sort))
            {
                result = sort.ToLower() switch
                {
                    "name" => result.OrderBy(v => v.Name),
                    "size" => result.OrderBy(v => v.BottleSize),
                    "alcoholpercentage" => result.OrderBy(v => v.AlcoholPercentage),
                    "price" => result.OrderBy(v => v.Stores.Min(s => s.Price)),
                    _ => result
                };
            }

            return Ok(result);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var vodka = Vodkas.FirstOrDefault(v => v.Id == id);
            return vodka == null ? NotFound() : Ok(vodka);
        }

        // Dodaj now¹ wódkê
        [HttpPost]
        public IActionResult AddVodka([FromBody] Vodka vodka)
        {
            vodka.Id = Vodkas.Any() ? Vodkas.Max(v => v.Id) + 1 : 1;
            Vodkas.Add(vodka);
            return CreatedAtAction(nameof(GetById), new { id = vodka.Id }, vodka);
        }

        // Aktualizacja wódki
        [HttpPut("{id}")]
        public IActionResult UpdateVodka(int id, [FromBody] Vodka updatedVodka)
        {
            var vodka = Vodkas.FirstOrDefault(v => v.Id == id);
            if (vodka == null) return NotFound();

            vodka.Name = updatedVodka.Name;
            vodka.BottleSize = updatedVodka.BottleSize;
            vodka.AlcoholPercentage = updatedVodka.AlcoholPercentage;
            vodka.Stores = updatedVodka.Stores;

            return NoContent();
        }

        // Usuwanie wódki
        [HttpDelete("{id}")]
        public IActionResult DeleteVodka(int id)
        {
            var vodka = Vodkas.FirstOrDefault(v => v.Id == id);
            if (vodka == null) return NotFound();

            Vodkas.Remove(vodka);
            return NoContent();
        }
    }
}

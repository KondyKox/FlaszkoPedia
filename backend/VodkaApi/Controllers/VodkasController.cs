using Microsoft.AspNetCore.Mvc;
using VodkaAPI.Models;

namespace VodkaAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VodkasController : ControllerBase
    {
        private static List<Vodka> Vodkas = new List<Vodka>
        {
            new Vodka
            {
                Id = 1,
                Name = "Żubrówka Biała",
                AlcoholPercentage = 40.0,
                Stores = new List<Store>
                {
                    new Store { StoreName = "Biedronka", Price = 75.99m },
                    new Store { StoreName = "Lidl", Price = 79.5m },
                    new Store { StoreName = "Carrefour", Price = 78.0m },
                    new Store { StoreName = "Auchan", Price = 76.5m }
                }
            },
            new Vodka
            {
                Id = 2,
                Name = "Belvedere",
                AlcoholPercentage = 40.0,
                Stores = new List<Store>
                {
                    new Store { StoreName = "Biedronka", Price = 179.99m },
                    new Store { StoreName = "Lidl", Price = 185.0m },
                    new Store { StoreName = "Carrefour", Price = 183.5m },
                    new Store { StoreName = "Auchan", Price = 181.0m }
                }
            }
        };

        [HttpGet]
        public IActionResult GetAll([FromQuery] string? store = null, [FromQuery] string? sort = null)
        {
            var result = Vodkas.AsQueryable();

            // Filtrowanie po sklepie
            if (!string.IsNullOrEmpty(store))
            {
                result = result.Where(v => v.Stores.Any(s => s.StoreName.ToLower() == store.ToLower()));
            }

            // Sortowanie
            if (!string.IsNullOrEmpty(sort))
            {
                result = sort.ToLower() switch
                {
                    "name" => result.OrderBy(v => v.Name),
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

        [HttpPost]
        public IActionResult AddVodka([FromBody] Vodka vodka)
        {
            vodka.Id = Vodkas.Any() ? Vodkas.Max(v => v.Id) + 1 : 1;
            Vodkas.Add(vodka);
            return CreatedAtAction(nameof(GetById), new { id = vodka.Id }, vodka);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateVodka(int id, [FromBody] Vodka updatedVodka)
        {
            var vodka = Vodkas.FirstOrDefault(v => v.Id == id);
            if (vodka == null) return NotFound();

            vodka.Name = updatedVodka.Name;
            vodka.AlcoholPercentage = updatedVodka.AlcoholPercentage;
            vodka.Stores = updatedVodka.Stores;

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteVodka(int id)
        {
            var vodka = Vodkas.FirstOrDefault(v => v.Id == id);
            if (vodka == null) return NotFound();

            Vodkas.Remove(vodka);
            return NoContent();
        }

        [HttpGet("group-by-country")]
        public IActionResult GroupByCountry()
        {
            var grouped = Vodkas
                   .SelectMany(v => v.Stores.Select(s => new { s.StoreName, Vodka = v.Name }))
                   .GroupBy(x => x.StoreName)
                   .Select(g => new { StoreName = g.Key, Vodkas = g.Select(x => x.Vodka).ToList() });

            return Ok(grouped);
        }
    }
}

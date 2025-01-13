using VodkaAPI.Models;

namespace VodkaApi.Data
{
    public static class VodkaData
    {
        public static List<Vodka> Vodkas = new List<Vodka>
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
    }
}

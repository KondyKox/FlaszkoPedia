using VodkaAPI.Models;

namespace VodkaApi.Data
{
    public static class VodkaData
    {
        public static List<Vodka> Vodkas = new List<Vodka>
        {
            // Żubrówka
            new Vodka
            {
                Id = 1,
                Name = "Żubrówka",
                BottleSize = 0.5,
                AlcoholPercentage = 40.0,
                Stores = new List<Store>
                {
                    new Store { StoreName = "Biedronka", Price = 24.99m },
                    new Store { StoreName = "Lidl", Price = 25.99m },
                    new Store { StoreName = "Carrefour", Price = 25.49m },
                    new Store { StoreName = "Auchan", Price = 25.99m }
                }
            },
            new Vodka
            {
                Id = 2,
                Name = "Żubrówka",
                BottleSize = 0.7,
                AlcoholPercentage = 40.0,
                Stores = new List<Store>
                {
                    new Store { StoreName = "Biedronka", Price = 36.99m },
                    new Store { StoreName = "Lidl", Price = 37.99m },
                    new Store { StoreName = "Carrefour", Price = 37.49m },
                    new Store { StoreName = "Auchan", Price = 37.99m }
                }
            },
            new Vodka
            {
                Id = 3,
                Name = "Żubrówka",
                BottleSize = 1.0,
                AlcoholPercentage = 40.0,
                Stores = new List<Store>
                {
                    new Store { StoreName = "Biedronka", Price = 49.99m },
                    new Store { StoreName = "Lidl", Price = 50.99m },
                    new Store { StoreName = "Carrefour", Price = 50.49m },
                    new Store { StoreName = "Auchan", Price = 50.99m }
                }
            },
            // Stock
            new Vodka
            {
                Id = 4,
                Name = "Stock",
                BottleSize = 0.5,
                AlcoholPercentage = 40.0,
                Stores = new List<Store>
                {
                    new Store { StoreName = "Biedronka", Price = 26.99m },
                    new Store { StoreName = "Lidl", Price = 27.99m },
                    new Store { StoreName = "Carrefour", Price = 27.49m },
                    new Store { StoreName = "Auchan", Price = 27.99m }
                }
            },
            new Vodka
            {
                Id = 5,
                Name = "Stock",
                BottleSize = 0.7,
                AlcoholPercentage = 40.0,
                Stores = new List<Store>
                {
                    new Store { StoreName = "Biedronka", Price = 39.99m },
                    new Store { StoreName = "Lidl", Price = 40.99m },
                    new Store { StoreName = "Carrefour", Price = 40.49m },
                    new Store { StoreName = "Auchan", Price = 40.99m }
                }
            },
            new Vodka
            {
                Id = 6,
                Name = "Stock",
                BottleSize = 1.0,
                AlcoholPercentage = 40.0,
                Stores = new List<Store>
                {
                    new Store { StoreName = "Biedronka", Price = 53.99m },
                    new Store { StoreName = "Lidl", Price = 54.99m },
                    new Store { StoreName = "Carrefour", Price = 54.49m },
                    new Store { StoreName = "Auchan", Price = 54.99m }
                }
            },
            // Bocian
            new Vodka
            {
                Id = 7,
                Name = "Bocian",
                BottleSize = 0.5,
                AlcoholPercentage = 40.0,
                Stores = new List<Store>
                {
                    new Store { StoreName = "Biedronka", Price = 29.99m },
                    new Store { StoreName = "Lidl", Price = 30.99m },
                    new Store { StoreName = "Carrefour", Price = 30.49m },
                    new Store { StoreName = "Auchan", Price = 30.99m }
                }
            },
            new Vodka
            {
                Id = 8,
                Name = "Bocian",
                BottleSize = 0.7,
                AlcoholPercentage = 40.0,
                Stores = new List<Store>
                {
                    new Store { StoreName = "Biedronka", Price = 43.99m },
                    new Store { StoreName = "Lidl", Price = 44.99m },
                    new Store { StoreName = "Carrefour", Price = 44.49m },
                    new Store { StoreName = "Auchan", Price = 44.99m }
                }
            },
            new Vodka
            {
                Id = 9,
                Name = "Bocian",
                BottleSize = 1.0,
                AlcoholPercentage = 40.0,
                Stores = new List<Store>
                {
                    new Store { StoreName = "Biedronka", Price = 59.99m },
                    new Store { StoreName = "Lidl", Price = 60.99m },
                    new Store { StoreName = "Carrefour", Price = 60.49m },
                    new Store { StoreName = "Auchan", Price = 60.99m }
                }
            },
            // Finlandia
            new Vodka
            {
                Id = 10,
                Name = "Finlandia",
                BottleSize = 0.5,
                AlcoholPercentage = 40.0,
                Stores = new List<Store>
                {
                    new Store { StoreName = "Biedronka", Price = 32.99m },
                    new Store { StoreName = "Lidl", Price = 33.99m },
                    new Store { StoreName = "Carrefour", Price = 33.49m },
                    new Store { StoreName = "Auchan", Price = 33.99m }
                }
            },
            new Vodka
            {
                Id = 11,
                Name = "Finlandia",
                BottleSize = 0.7,
                AlcoholPercentage = 40.0,
                Stores = new List<Store>
                {
                    new Store { StoreName = "Biedronka", Price = 48.99m },
                    new Store { StoreName = "Lidl", Price = 49.99m },
                    new Store { StoreName = "Carrefour", Price = 49.49m },
                    new Store { StoreName = "Auchan", Price = 49.99m }
                }
            },
            new Vodka
            {
                Id = 12,
                Name = "Finlandia",
                BottleSize = 1.0,
                AlcoholPercentage = 40.0,
                Stores = new List<Store>
                {
                    new Store { StoreName = "Biedronka", Price = 65.99m },
                    new Store { StoreName = "Lidl", Price = 66.99m },
                    new Store { StoreName = "Carrefour", Price = 66.49m },
                    new Store { StoreName = "Auchan", Price = 66.99m }
                }
            },
            // Krupnik
            new Vodka
            {
                Id = 13,
                Name = "Krupnik",
                BottleSize = 0.5,
                AlcoholPercentage = 40.0,
                Stores = new List<Store>
                {
                    new Store { StoreName = "Biedronka", Price = 22.99m },
                    new Store { StoreName = "Lidl", Price = 23.99m },
                    new Store { StoreName = "Carrefour", Price = 23.49m },
                    new Store { StoreName = "Auchan", Price = 23.99m }
                }
            },
            new Vodka
            {
                Id = 14,
                Name = "Krupnik",
                BottleSize = 0.7,
                AlcoholPercentage = 40.0,
                Stores = new List<Store>
                {
                    new Store { StoreName = "Biedronka", Price = 34.99m },
                    new Store { StoreName = "Lidl", Price = 35.99m },
                    new Store { StoreName = "Carrefour", Price = 35.49m },
                    new Store { StoreName = "Auchan", Price = 35.99m }
                }
            },
            new Vodka
            {
                Id = 15,
                Name = "Krupnik",
                BottleSize = 1.0,
                AlcoholPercentage = 40.0,
                Stores = new List<Store>
                {
                    new Store { StoreName = "Biedronka", Price = 45.99m },
                    new Store { StoreName = "Lidl", Price = 46.99m },
                    new Store { StoreName = "Carrefour", Price = 46.49m },
                    new Store { StoreName = "Auchan", Price = 46.99m }
                }
            },
            // Żołądkowa Gorzka
            new Vodka
            {
                Id = 16,
                Name = "Żołądkowa Gorzka",
                BottleSize = 0.5,
                AlcoholPercentage = 36.0,
                Stores = new List<Store>
                {
                    new Store { StoreName = "Biedronka", Price = 28.99m },
                    new Store { StoreName = "Lidl", Price = 29.99m },
                    new Store { StoreName = "Carrefour", Price = 29.49m },
                    new Store { StoreName = "Auchan", Price = 29.99m }
                }
            },
            new Vodka
            {
                Id = 17,
                Name = "Żołądkowa Gorzka",
                BottleSize = 0.7,
                AlcoholPercentage = 36.0,
                Stores = new List<Store>
                {
                    new Store { StoreName = "Biedronka", Price = 42.99m },
                    new Store { StoreName = "Lidl", Price = 43.99m },
                    new Store { StoreName = "Carrefour", Price = 43.49m },
                    new Store { StoreName = "Auchan", Price = 43.99m }
                }
            },
            new Vodka
            {
                Id = 18,
                Name = "Żołądkowa Gorzka",
                BottleSize = 1.0,
                AlcoholPercentage = 36.0,
                Stores = new List<Store>
                {
                    new Store { StoreName = "Biedronka", Price = 57.99m },
                    new Store { StoreName = "Lidl", Price = 58.99m },
                    new Store { StoreName = "Carrefour", Price = 58.49m },
                    new Store { StoreName = "Auchan", Price = 58.99m }
                }
            },
            // Żołądkowa Gorzka z miętą
            new Vodka
            {
                Id = 19,
                Name = "Żołądkowa Gorzka z miętą",
                BottleSize = 0.5,
                AlcoholPercentage = 36.0,
                Stores = new List<Store>
                {
                    new Store { StoreName = "Biedronka", Price = 28.99m },
                    new Store { StoreName = "Lidl", Price = 29.99m },
                    new Store { StoreName = "Carrefour", Price = 29.49m },
                    new Store { StoreName = "Auchan", Price = 29.99m }
                }
            },
            new Vodka
            {
                Id = 20,
                Name = "Żołądkowa Gorzka z miętą",
                BottleSize = 0.7,
                AlcoholPercentage = 36.0,
                Stores = new List<Store>
                {
                    new Store { StoreName = "Biedronka", Price = 42.99m },
                    new Store { StoreName = "Lidl", Price = 43.99m },
                    new Store { StoreName = "Carrefour", Price = 43.49m },
                    new Store { StoreName = "Auchan", Price = 43.99m }
                }
            },
            new Vodka
            {
                Id = 21,
                Name = "Żołądkowa Gorzka z miętą",
                BottleSize = 1.0,
                AlcoholPercentage = 36.0,
                Stores = new List<Store>
                {
                    new Store { StoreName = "Biedronka", Price = 57.99m },
                    new Store { StoreName = "Lidl", Price = 58.99m },
                    new Store { StoreName = "Carrefour", Price = 58.49m },
                    new Store { StoreName = "Auchan", Price = 58.99m }
                }
            },
        };
    }
}


namespace VodkaAPI.Models
{
    public class Vodka
    {
        public int Id { get; set; }
        public required string Name { get; set; } // Nazwa wódki
        public double BottleSize { get; set; } // Pojemnoœæ
        public double AlcoholPercentage { get; set; } // Procenty
        public required List<Store> Stores { get; set; } // Lista sklepów
    }

    public class Store
    {
        public required string StoreName { get; set; } // Nazwa sklepu
        public required decimal Price { get; set; } // Cena w danym sklepie
    }
}

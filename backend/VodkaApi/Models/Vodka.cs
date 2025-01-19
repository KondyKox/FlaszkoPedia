namespace VodkaAPI.Models
{
    public class Vodka
    {
        public int Id { get; set; }
        public required string Name { get; set; } // Nazwa w�dki
        public double BottleSize { get; set; } // Pojemno��
        public double AlcoholPercentage { get; set; } // Procenty
        public required List<Store> Stores { get; set; } // Lista sklep�w
    }
}

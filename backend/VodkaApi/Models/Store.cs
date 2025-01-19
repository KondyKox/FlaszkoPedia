namespace VodkaAPI.Models
{
    public class Store
    {
        public required string StoreName { get; set; } // Nazwa sklepu
        public required decimal Price { get; set; } // Cena w danym sklepie
    }
}


namespace VodkaAPI.Models
{
    public class Vodka
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public double AlcoholPercentage { get; set; }
        public required List<Store> Stores { get; set; }
    }

    public class Store
    {
        public required string StoreName { get; set; }
        public required decimal Price { get; set; }
    }

    //public enum StoreNameEnum
    //{
    //    Biedronka,
    //    Lidl,
    //    Carrefour,
    //    Auchan
    //}
}

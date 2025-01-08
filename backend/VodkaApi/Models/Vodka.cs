
namespace VodkaAPI.Models
{
    public class Vodka
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double AlcoholPercentage { get; set; }
        public List<Store> Stores { get; set; }
    }

    public class Store
    {
        public string StoreName { get; set; }
        public decimal Price { get; set; }
    }

    //public enum StoreNameEnum
    //{
    //    Biedronka,
    //    Lidl,
    //    Carrefour,
    //    Auchan
    //}
}

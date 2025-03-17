namespace Backend.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        public string Category { get; set; }
        public int StockQuantity { get; set; }
        public string Manufacturer { get; set; }
        public ICollection<ProductCategory> ProductCategories { get; set; }
        public ICollection<CartProduct> CartProducts { get; set; }
        public int? SaleId { get; set; } = null; // Make sure SaleId is nullable
        public Sale? Sale { get; set; }          // Make Sale reference nullable
    }
}

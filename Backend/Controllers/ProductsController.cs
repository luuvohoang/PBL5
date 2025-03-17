using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;
using Backend.Models.DTOs;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDTO>>> GetProducts(string? category)
        {
            try
            {
                var query = _context.Products
                    .Include(p => p.Sale)  // Include Sale information
                    .AsQueryable();

                if (!string.IsNullOrEmpty(category))
                {
                    query = query.Where(p => p.Category == category.ToLower());
                }

                var products = await query.ToListAsync();

                var productDtos = products.Select(product => new ProductDTO
                {
                    Id = product.Id,
                    Name = product.Name,
                    Description = product.Description,
                    Price = product.Price,
                    ImageUrl = product.ImageUrl,
                    Category = product.Category,
                    StockQuantity = product.StockQuantity,
                    Manufacturer = product.Manufacturer,
                    Sale = product.Sale == null ? null : new SaleDTO
                    {
                        Id = product.Sale.Id,
                        Name = product.Sale.Name,
                        DiscountPercent = product.Sale.DiscountPercent,
                        StartDate = product.Sale.StartDate,
                        EndDate = product.Sale.EndDate,
                        IsActive = product.Sale.IsActive
                    }
                }).ToList();

                return Ok(productDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDTO>> GetProduct(int id)
        {
            try
            {
                var product = await _context.Products
                    .Include(p => p.Sale) // Include Sale information
                    .FirstOrDefaultAsync(p => p.Id == id);

                if (product == null)
                {
                    return NotFound($"Product with ID {id} not found");
                }

                var productDto = new ProductDTO
                {
                    Id = product.Id,
                    Name = product.Name,
                    Description = product.Description,
                    Price = product.Price,
                    ImageUrl = product.ImageUrl,
                    Category = product.Category,
                    StockQuantity = product.StockQuantity,
                    Manufacturer = product.Manufacturer,
                    Sale = product.Sale == null ? null : new SaleDTO
                    {
                        Id = product.Sale.Id,
                        Name = product.Sale.Name,
                        DiscountPercent = product.Sale.DiscountPercent,
                        StartDate = product.Sale.StartDate,
                        EndDate = product.Sale.EndDate,
                        IsActive = product.Sale.IsActive
                    }
                };

                return productDto;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("test-connection")]
        public async Task<ActionResult<string>> TestConnection()
        {
            try
            {
                // Thử đếm số lượng sản phẩm
                int productCount = await _context.Products.CountAsync();
                return Ok($"Kết nối thành công. Số lượng sản phẩm: {productCount}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi kết nối: {ex.Message}");
            }
        }
    }
}

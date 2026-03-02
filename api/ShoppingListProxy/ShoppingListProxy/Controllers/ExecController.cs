using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

[Route("api/[controller]")]
[ApiController]
public class ExecController : ControllerBase
{
    private readonly string myConnection = "Server=localhost;Database=ShoppingListDB;Trusted_Connection=True;TrustServerCertificate=True;";

    [HttpPost]
    public IActionResult Execute([FromBody] ExecRequest request)
    {
        var results = new List<Dictionary<string, object>>();

        using (var conn = new SqlConnection(myConnection))
        {
            var cmd = new SqlCommand(request.ProcedureName, conn) { CommandType = CommandType.StoredProcedure };

            if (request.Parameters != null)
            {
                foreach (var param in request.Parameters)
                {
                    object value = param.Value?.ToString() ?? (object)DBNull.Value;
                    cmd.Parameters.AddWithValue("@" + param.Key, value);
                }
            }

            conn.Open();
            using var reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                var row = new Dictionary<string, object>();
                for (int i = 0; i < reader.FieldCount; i++)
                {
                    row.Add(reader.GetName(i), reader.GetValue(i));
                }
                results.Add(row);
            }
        }
        return Ok(results);
    }
}

public class ExecRequest
{
    public string ProcedureName { get; set; }
    public Dictionary<string, object> Parameters { get; set; }
}
using System.Text.Json;

namespace projektportal_mcp_client;

public class KeycloakTokenService
{
    private readonly string _keycloakUrl;
    private readonly string _clientId;
    private readonly string _clientSecret;

    public KeycloakTokenService(string keycloakUrl, string clientId, string clientSecret)
    {
        _keycloakUrl = keycloakUrl;
        _clientId = clientId;
        _clientSecret = clientSecret;
    }

    public async Task<string> GetAccessTokenAsync()
    {
        using var httpClient = new HttpClient();

        var tokenEndpoint = $"{_keycloakUrl.TrimEnd('/')}/protocol/openid-connect/token";

        var formContent = new FormUrlEncodedContent(new Dictionary<string, string>
        {
            ["grant_type"] = "client_credentials",
            ["client_id"] = _clientId,
            ["client_secret"] = _clientSecret,
        });

        var response = await httpClient.PostAsync(tokenEndpoint, formContent);
        response.EnsureSuccessStatusCode();

        var json = await response.Content.ReadAsStringAsync();
        using var doc = JsonDocument.Parse(json);
        return doc.RootElement.GetProperty("access_token").GetString()
            ?? throw new InvalidOperationException("Keycloak response did not contain an access_token.");
    }
}

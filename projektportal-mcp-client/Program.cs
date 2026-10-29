using System.Collections.Generic;
using ModelContextProtocol.Client;
using ModelContextProtocol.Protocol;
using projektportal_mcp_client;

// --- Configuration from environment variables ---
var serverUrl = Environment.GetEnvironmentVariable("MCP_SERVER_URL")
    ?? "http://localhost:5000/mcp";
var keycloakUrl = Environment.GetEnvironmentVariable("KEYCLOAK_URL")
    ?? "https://projektportal_auth/realms/projectportal";
var clientId = Environment.GetEnvironmentVariable("KEYCLOAK_CLIENT_ID")
    ?? throw new InvalidOperationException("KEYCLOAK_CLIENT_ID environment variable is required.");
var clientSecret = Environment.GetEnvironmentVariable("KEYCLOAK_CLIENT_SECRET")
    ?? throw new InvalidOperationException("KEYCLOAK_CLIENT_SECRET environment variable is required.");

// --- Obtain Bearer token from Keycloak ---
Console.WriteLine("Fetching access token from Keycloak...");
var tokenService = new KeycloakTokenService(keycloakUrl, clientId, clientSecret);
var accessToken = await tokenService.GetAccessTokenAsync();
Console.WriteLine("Token obtained successfully.");

// --- Create HttpClient with Bearer token header ---
var httpClient = new HttpClient();
httpClient.DefaultRequestHeaders.Authorization =
    new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);

// --- Connect to the MCP server via SSE transport ---
Console.WriteLine($"Connecting to MCP server at {serverUrl} ...");
var transport = new SseClientTransport(
    new SseClientTransportOptions { Endpoint = new Uri(serverUrl) },
    httpClient);

await using var client = await McpClientFactory.CreateAsync(transport);
Console.WriteLine("Connected.");

// --- List all available tools ---
Console.WriteLine("\n=== Available Tools ===");
var tools = await client.ListToolsAsync();
foreach (var tool in tools)
{
    Console.WriteLine($"  [{tool.Name}] {tool.Description}");
}

// --- Sample call: mailbox_get_all ---
Console.WriteLine("\n=== Calling mailbox_get_all ===");
var result = await client.CallToolAsync(
    "mailbox_get_all",
    new Dictionary<string, object?>());

foreach (var content in result.Content)
{
    if (content.Type == "text")
        Console.WriteLine(content.Text);
}

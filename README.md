# Enkuuka y’Omwaka

The Enkuuka festival website is an ASP.NET Core Razor Pages application targeting .NET 9. Its pages are rendered by .NET; React and npm are not required to build or run the site.

## Run the website

Install the .NET 9 SDK, then run from this folder:

```powershell
dotnet restore .\Enkuuka.sln
dotnet run --project .\Enkuuka.Site\Enkuuka.Site.csproj
```

Open the local address printed by `dotnet run` (usually `https://localhost:7xxx` or `http://localhost:5xxx`).

## Project layout

- `Enkuuka.sln` — Visual Studio solution
- `Enkuuka.Site/Pages` — Razor Pages, page data and form handlers
- `Enkuuka.Site/wwwroot` — styles, browser interactions and festival images
- `legacy-react` — archived React source retained for reference

The website includes the home page, culture, clans, Masaza, entertainment, events, programme, trade fair, gallery, accommodation, invitation and contact pages. The contact form currently validates and displays a confirmation; connect an email provider before using it to deliver messages.

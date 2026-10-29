# Deploying Enkuuka to the Windows IIS server

The workflow at `.github/workflows/deploy-iis.yml` publishes the .NET site and copies it to the IIS folder shown in the server screenshot: `C:\inetpub\wwwroot\Enkuuka`.

## One-time server setup

1. In `AshrafGit256/enkuuka-site`, open **Settings → Actions → Runners → New self-hosted runner**. Select **Windows x64** and follow GitHub's generated download/configuration commands on the IIS server. Register the runner with the additional label `enkuuka-iis`, and configure it as a Windows service. Use the current runner release; `actions/setup-dotnet@v6` requires a recent runner.
2. Run the service under a dedicated deployment account, not an administrator account. Grant that account Modify permission on `C:\inetpub\wwwroot\Enkuuka`; keep the IIS application-pool identity read/execute-only. The runner needs outbound HTTPS access to GitHub; this workflow does not require opening an inbound deployment port.
3. Confirm IIS has the ASP.NET Core Hosting Bundle/ASP.NET Core Module installed and that the site's application pool is configured for ASP.NET Core hosting (typically **No Managed Code**).
4. In **Settings → Environments**, create an environment named `production`. Optionally add required reviewers and restrict deployments to `main`.
5. Commit the .NET project (`Enkuuka.Site/`), its assets, and this workflow to `main`. The project is currently untracked in the local Git worktree, so it must be included in the commit or the workflow will not find the project file on GitHub.

After setup, pushing to `main` starts deployment automatically. You can also run it from **Actions → Deploy Enkuuka to IIS → Run workflow**. The job is restricted to `main` and serialized so two deployments cannot copy over each other.

The deployment writes `app_offline.htm` while copying so IIS can release the running app files. It overlays the published output and deliberately does not mirror/delete the IIS directory; this preserves server-only files such as an `appsettings.json` that is not in the repository. Old files not in the new publish may remain, but the new `web.config` launches `Enkuuka.Site.exe`.

## Security and runtime notes

- This is a self-hosted runner: workflow code executes on the IIS server with the runner service account's permissions. Keep the runner dedicated to this repository, protect the `main` branch, and do not run pull-request workflows from forks on this runner. Use GitHub-hosted runners for PR checks.
- The local project currently targets .NET 9. This pipeline publishes it self-contained for `win-x64`, so it includes its .NET runtime, but IIS still needs the ASP.NET Core Module. .NET 9 support ends **November 10, 2026**; plan to move the project to .NET 10 LTS. See [Microsoft's .NET support policy](https://dotnet.microsoft.com/en-us/platform/support/policy).
- The runner service account must be able to read the repository and write to the IIS folder. Do not put the runner registration token in the repository or workflow; GitHub's setup screen issues a temporary token.

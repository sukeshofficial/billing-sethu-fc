$sourceCode = @"
using System;
using System.Diagnostics;
using System.IO;

class Program {
    static void Main() {
        string appDir = AppDomain.CurrentDomain.BaseDirectory;
        string indexFile = Path.Combine(appDir, "index.html");
        string urlFile = "file:///" + indexFile.Replace("\\", "/");
        
        string chromePath = "";
        string[] paths = {
            @"C:\Program Files\Google\Chrome\Application\chrome.exe",
            @"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
            Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData) + @"\Google\Chrome\Application\chrome.exe"
        };
        
        foreach (string path in paths) {
            if (File.Exists(path)) {
                chromePath = path;
                break;
            }
        }
        
        ProcessStartInfo startInfo = new ProcessStartInfo();
        if (!string.IsNullOrEmpty(chromePath)) {
            startInfo.FileName = chromePath;
            startInfo.Arguments = string.Format("--app=\"{0}\" --window-size=1200,900", urlFile);
        } else {
            startInfo.FileName = urlFile; // Default browser
            startInfo.UseShellExecute = true;
        }
        
        Process.Start(startInfo);
    }
}
"@

$csFile = Join-Path $PSScriptRoot "Program.cs"
Set-Content -Path $csFile -Value $sourceCode

$exePath = Join-Path $PSScriptRoot "SETHU FC BILLING.exe"
$icoPath = Join-Path $PSScriptRoot "assets\images\football_logo.ico"

$csc = "C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe"
if (-Not (Test-Path $csc)) {
    $csc = "C:\Windows\Microsoft.NET\Framework\v4.0.30319\csc.exe"
}

Write-Host "Compiling with csc.exe..."
& $csc /target:winexe /out:"$exePath" /win32icon:"$icoPath" "$csFile"

if (Test-Path $exePath) {
    Write-Host "Executable generated successfully at $exePath!" -ForegroundColor Green
    Remove-Item $csFile -Force
    
    # Clean up the old batch file to avoid confusion
    $batPath = Join-Path $PSScriptRoot "SETHU FC BILLING.bat"
    if (Test-Path $batPath) {
        Remove-Item $batPath -Force
        Write-Host "Cleaned up old .bat file." -ForegroundColor DarkGray
    }
} else {
    Write-Host "Failed to generate executable." -ForegroundColor Red
}
